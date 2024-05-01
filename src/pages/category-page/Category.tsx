import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularPost from "@/components/homepage/PopularPost";
import RecentPostList from "@/components/homepage/RecentPostList";
import { useParams } from "react-router-dom";

function Category() {
  const { categoryId } = useParams();
  return (
    <div className="space-y-14">
      <h1 className="text-2xl p-2 capitalize md:text-3xl lg:text-5xl tracking-wide w-full text-center bg-foreground text-primary-foreground font-semibold">
        {categoryId}
      </h1>

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

export default Category;
