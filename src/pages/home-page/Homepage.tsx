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
      <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl tracking-wide">
        <span className="font-bold">Hey, Luan here!</span> This is my page,
        where I share my stories and ideas.
      </h1>
      <RandomPost />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-28">
        <div className="">
          <RecentPostList data={data} error={error} isLoading={isLoading} />
        </div>
        <div className="space-y-10 ">
          <PopularPost />
          <Categories />
          <EditorPick />
        </div>
      </div>
    </div>
  );
}
