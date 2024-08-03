import useFetchPosts from "@/hooks/useGetPosts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Post from "./Post";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface PostListProps {
  isLoading: boolean;
  error: Error | null;
  data: Post[] | undefined;
}

function RecentPostList({ data, error, isLoading }: PostListProps) {
  const rowsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(0);

  const totalPosts = data?.length || 0;
  const totalPages = Math.ceil(totalPosts / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalPosts);

  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <h1 className="text-xl md:text-2xl font-bold">Recent Posts</h1>
      <div className="space-y-10">
        {isLoading
          ? Array.from({ length: rowsPerPage }).map((_, index) => (
              <Skeleton key={index} className="w-full h-full" />
            ))
          : data
              ?.slice(startIndex, endIndex)
              .map((e) => (
                <Post
                  title={e.title}
                  post_id={e.post_id}
                  createDate={e.createDate}
                  category_id={e.category_id}
                  views={e.views}
                  content={e.content}
                  user_id={e.user_id}
                  key={e.post_id}
                  thumbnail={e.thumbnail}
                  updateDate={e.updateDate}
                  category_name={e.category_name}
                />
              ))}
      </div>
      <Pagination>
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={cn(
                "border-[1px] cursor-pointer border-foreground pointer-events-auto",
                currentPage === 0 ? "pointer-events-none opacity-50" : undefined
              )}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={cn(
                "border-[1px] cursor-pointer border-foreground pointer-events-auto",
                currentPage >= totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : undefined
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default RecentPostList;
