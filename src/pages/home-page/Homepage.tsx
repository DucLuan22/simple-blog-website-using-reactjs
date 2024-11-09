import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularCategories from "@/components/homepage/PopularCategories";
import PopularPost from "@/components/homepage/PopularPost";
import RandomPost from "@/components/homepage/RandomPost";
import RecentPostList from "@/components/homepage/RecentPostList";

export default function Homepage() {
  return (
    <div className="space-y-10 lg:space-y-14 mb-16 lg:mb-36 px-4 lg:px-0">
      <RandomPost />
      <PopularCategories />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-28">
        <div className="">
          <RecentPostList />
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
