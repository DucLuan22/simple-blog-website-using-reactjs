import Categories from "@/components/homepage/Categories";

import PopularCategories from "@/components/homepage/PopularCategories";
import PopularPost from "@/components/homepage/PopularPost";
import RandomPost from "@/components/homepage/RandomPost";
import RecentPostList from "@/components/homepage/RecentPostList";
import UsersPick from "@/components/homepage/UsersPick";
import useFetchPosts from "@/hooks/useGetPosts";

export default function Homepage() {
  const { isLoading, data, error } = useFetchPosts();

  return (
    <div className="space-y-10 lg:space-y-14 mb-16 lg:mb-36 px-4 lg:px-0">
      <RandomPost data={data} isLoading={isLoading} />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-x-16 xl:gap-x-28">
        <div className="lg:basis-[70%] xl:basis-[80%]">
          <RecentPostList isLoading={isLoading} data={data} />
        </div>
        <div className=" space-y-10">
          <PopularPost />
          <Categories />
          <UsersPick />
        </div>
      </div>
    </div>
  );
}
