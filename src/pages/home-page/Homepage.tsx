import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularCategories from "@/components/homepage/PopularCategories";
import PopularPost from "@/components/homepage/PopularPost";

import RandomPost from "@/components/homepage/RandomPost";
import RecentPostList from "@/components/homepage/RecentPostList";

function Homepage() {
  return (
    <div className="space-y-14">
      <h1 className="text-2xl md:text-3xl lg:text-5xl tracking-wide">
        <span className="font-bold"> Hey, Luan here!</span> This is my page,
        where I shared my stories and ideas.
      </h1>

      <RandomPost />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row md:gap-10 ">
        <RecentPostList />
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
