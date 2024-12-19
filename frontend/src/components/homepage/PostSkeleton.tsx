import { Skeleton } from "../ui/skeleton";

interface PostSkeletonProps {
  rowsPerPage: number;
}

export function PostSkeleton({ rowsPerPage }: PostSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsPerPage }).map((_, index) => (
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
      ))}
    </>
  );
}
