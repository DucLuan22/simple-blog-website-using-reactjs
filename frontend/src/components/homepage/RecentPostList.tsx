import { useState, useMemo } from "react";
import PostItem from "./PostItem";
import { Post } from "@/interface/Post";
import { PostSkeleton } from "./PostSkeleton";
import { PaginationControls } from "./PaginationControl";

interface PostListProps {
  isLoading: boolean;
  data?: Post[];
}

function RecentPostList({ isLoading, data }: PostListProps) {
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPosts = data?.length || 0;
  const totalPages = Math.ceil(totalPosts / rowsPerPage);

  const currentPosts = useMemo(() => {
    if (data) {
      const startIndex = currentPage * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, totalPosts);
      return data.slice(startIndex, endIndex);
    }
    return [];
  }, [currentPage, data]);

  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <p className="text-xl md:text-2xl font-bold">Recent Posts</p>
      <div className="space-y-10">
        {isLoading ? (
          <PostSkeleton rowsPerPage={rowsPerPage} />
        ) : (
          currentPosts.map((e) => (
            <PostItem
              title={e.title}
              post_id={e.post_id}
              createDate={e.createDate}
              content={e.content}
              key={e.post_id}
              thumbnail={e.thumbnail}
              category_name={e.category_name}
            />
          ))
        )}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        onNext={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
        }
      />
    </div>
  );
}

export default RecentPostList;
