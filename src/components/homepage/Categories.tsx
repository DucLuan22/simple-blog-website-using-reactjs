import CategorySideCard from "./CategorySideCard";

function Categories() {
  return (
    <div className="">
      <div className="space-y-10">
        <div>
          <p>Discover by topic</p>
          <h1 className="text-lg md:text-xl font-bold">Categories</h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <CategorySideCard />
            <CategorySideCard />
            <CategorySideCard />
            <CategorySideCard />
            <CategorySideCard />
            <CategorySideCard />
            <CategorySideCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
