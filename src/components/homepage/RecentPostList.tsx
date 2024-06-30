import useFetchPosts from "@/hooks/useGetPosts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Post from "./Post";

function RecentPostList() {
  const { isLoading, data, error } = useFetchPosts();

  if (isLoading) return <div></div>;
  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <h1 className="text-xl md:text-2xl font-bold">Recent Posts</h1>
      <div className="space-y-10">
        {data?.map((e) => (
          <Post title={e.title} id={e.post_id} />
        ))}
      </div>
      <Pagination>
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious className="border-[1px] border-foreground" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="border-[1px] border-foreground" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default RecentPostList;
