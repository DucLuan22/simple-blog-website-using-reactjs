import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import useFetchPosts from "@/hooks/useGetPosts";
import { Post } from "@/interface/Post";
import PostItem from "./PostItem";
interface SimplifiedPost {
  title: string;
  post_id: string;
  createDate: Date;
  content: string;
  key: string;
  thumbnail: string;
  category: { category_name: string };
}

interface PostListProps {
  isLoading: boolean;
  data?: Post[];
}

function RecentPostList({ isLoading, data }: PostListProps) {
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPosts = data?.length || 0;
  const totalPages = Math.ceil(totalPosts / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalPosts);

  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <p className="text-xl md:text-2xl font-bold">Recent Posts</p>
      <div className="space-y-10">
        {isLoading
          ? Array.from({ length: rowsPerPage }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 md:items-center"
              >
                <Skeleton className="w-full h-40 md:w-48 lg:w-60 xl:w-[500px] rounded-lg object-cover" />
                <div className="flex flex-col space-y-3 md:space-y-4 lg:space-y-7 w-full">
                  <Skeleton className="h-4 w-1/3 md:w-1/4 lg:w-1/5 bg-gray-200" />
                  <Skeleton className="h-6 w-3/4 md:w-2/3 lg:w-3/5 bg-gray-200" />
                  <Skeleton className="h-4 w-full md:w-4/5 bg-gray-200" />
                  <Skeleton className="h-10 w-24 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))
          : data
              ?.slice(startIndex, endIndex)
              .map((e) => (
                <PostItem
                  title={e.title}
                  post_id={e.post_id}
                  createDate={e.createDate}
                  content={e.content}
                  key={e.post_id}
                  thumbnail={e.thumbnail}
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
