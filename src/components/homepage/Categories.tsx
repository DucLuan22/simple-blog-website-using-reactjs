import useCategory from "@/hooks/useCategories";
import CategorySideCard from "./CategorySideCard";

function Categories() {
  const { data, isLoading, isError } = useCategory();

  if (isLoading) return null;

  return (
    <div className="">
      <div className="space-y-10">
        <div>
          <p>Discover by topic</p>
          <h1 className="text-lg md:text-xl font-bold">Categories</h1>
          <div className="mt-8 flex flex-wrap gap-4">
            {data?.map((e) => (
              <CategorySideCard
                category_id={e.category_id}
                category_name={e.category_name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
