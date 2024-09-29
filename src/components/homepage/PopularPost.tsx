import { useTopDailyViewedPosts } from "@/hooks/useTopDailyViewedPosts";
import PopularPostCard from "./PopularPostCard";
import { Skeleton } from "../ui/skeleton";

function PopularPost() {
  const { data: posts, isLoading } = useTopDailyViewedPosts();
  return (
    <div className="mt-14 lg:mt-0">
      <div className="space-y-10">
        <div>
          <p>What's hot</p>
          <h1 className="text-lg md:text-xl font-bold">Most popular</h1>
        </div>
        {isLoading ? (
          <>
            <PopularPostSkeleton />
            <PopularPostSkeleton />
            <PopularPostSkeleton />
            <PopularPostSkeleton />
            <PopularPostSkeleton />
          </>
        ) : (
          // Render actual data once loaded
          posts?.map((post) => (
            <PopularPostCard
              post_id={post.post_id}
              category_name={post.category_name}
              createDate={post.createDate}
              thumbnail={post.thumbnail}
              title={post.title}
              familyName={post.familyName}
              givenName={post.givenName}
            />
          ))
        )}
      </div>
    </div>
  );
}

function PopularPostSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-24 bg-orange-400 rounded-3xl" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default PopularPost;
