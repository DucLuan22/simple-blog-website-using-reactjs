import useCategory from "@/hooks/useCategories";
import CategoryCard from "./CategoryCard";

function PopularCategories() {
  const { data, isLoading, isError } = useCategory();

  if (isLoading) return null;

  return (
    <div className="space-y-6">
      <p className="text-xl md:text-2xl font-bold">Popular Categories</p>
      <div className="flex flex-wrap gap-4">
        {data?.map((e) => (
          <CategoryCard
            category_id={e.category_id}
            category_name={e.category_name}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
