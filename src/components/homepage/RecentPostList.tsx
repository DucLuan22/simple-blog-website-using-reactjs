import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Post from "./Post";

function RecentPostList() {
  return (
    <div className="space-y-10 basis-full lg:basis-4/5">
      <h1 className="text-xl md:text-2xl font-bold">Recent Posts</h1>
      <div className="space-y-10">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
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
