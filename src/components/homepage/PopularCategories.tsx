import CategoryCard from "./CategoryCard";

function PopularCategories() {
  return (
    <div className="space-y-6">
      <p className="text-xl md:text-2xl font-bold">Popular Categories</p>
      <div className="flex flex-wrap gap-4">
        <CategoryCard backgroundColor="bg-green-300" />
      </div>
    </div>
  );
}

export default PopularCategories;
