import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularCategories from "@/components/homepage/PopularCategories";
import PopularPost from "@/components/homepage/PopularPost";

import RandomPost from "@/components/homepage/RandomPost";
import RecentPostList from "@/components/homepage/RecentPostList";
import useFetchPosts from "@/hooks/useGetPosts";

function Homepage() {
  const { isLoading, data, error } = useFetchPosts();
  console.log(import.meta.env.BACKEND_URL);
  return (
    <div className="space-y-14 mb-36">
      <h1 className="text-2xl md:text-3xl lg:text-5xl tracking-wide">
        <span className="font-bold"> Hey, Luan here!</span> This is my page,
        where I shared my stories and ideas.
      </h1>
      <RandomPost />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row md:gap-10 lg:gap-28">
        <RecentPostList data={data} error={error} isLoading={isLoading} />
        <div className="space-y-10">
          <PopularPost />
          <Categories />
          <EditorPick />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
