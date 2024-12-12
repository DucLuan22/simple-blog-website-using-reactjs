import useCategory from "@/hooks/useCategories";
import CategorySideCard from "./CategorySideCard";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCategory();

  if (isLoading) return null;

  return (
    <div className="">
      <div className="space-y-10">
        <div>
          <p>Discover by topic</p>
          <p className="text-lg md:text-xl font-bold">Categories</p>
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
