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

function RecentPostList() {
  const { isLoading, data, error } = useFetchPosts();
  const rowsPerpage = 8;

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerpage);

  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <h1 className="text-xl md:text-2xl font-bold">Recent Posts</h1>
      <div className="space-y-10">
        {data
          ?.slice(startIndex, endIndex)
          .map((e) =>
            isLoading ? (
              <Skeleton className="flex md:flex-row flex-col md:justify-start items-start md:items-center gap-5"></Skeleton>
            ) : (
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
            )
          )}
      </div>
      <Pagination>
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setStartIndex(startIndex - rowsPerpage);
                setEndIndex(endIndex - rowsPerpage);
              }}
              className={cn(
                "border-[1px] cursor-pointer border-foreground pointer-events-auto",
                startIndex === 0 ? "pointer-events-none opacity-50 " : undefined
              )}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setStartIndex(startIndex + rowsPerpage);
                setEndIndex(endIndex + rowsPerpage);
              }}
              className={cn(
                "border-[1px] cursor-pointer border-foreground pointer-events-auto",
                startIndex === data?.length
                  ? "pointer-events-none opacity-50 "
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
