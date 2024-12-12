import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularCategories from "@/components/homepage/PopularCategories";
import PopularPost from "@/components/homepage/PopularPost";
import RandomPost from "@/components/homepage/RandomPost";
import RecentPostList from "@/components/homepage/RecentPostList";
import useFetchPosts from "@/hooks/useGetPosts";

export default function Homepage() {
  const { isLoading, data, error } = useFetchPosts();

  return (
    <div className="space-y-10 lg:space-y-14 mb-16 lg:mb-36 px-4 lg:px-0">
      <RandomPost />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-x-16 xl:gap-x-28">
        <div className="lg:basis-[70%] xl:basis-[65%]">
          <RecentPostList isLoading={isLoading} data={data} />
        </div>
        <div className="lg:basis-[30%] xl:basis-[35%] space-y-10">
          <PopularPost />
          <Categories />
          <EditorPick />
        </div>
      </div>
    </div>
  );
}
