import { Category } from "@/interface/Category";
import { cn, getRandomBgColor } from "@/lib/utils";
import { Link } from "react-router-dom";

function CategoryCard({ category_id, category_name }: Category) {
  return (
    <Link
      to={`/category/${category_id}`}
      key={category_id}
      className={cn(
        "flex items-center gap-2 p-4 bg-opacity-90 rounded-xl flex-grow min-w-[100px] max-w-[200px] justify-center cursor-pointer",
        getRandomBgColor()
      )}
    >
      <p className="font-semibold text-white">{category_name}</p>
    </Link>
  );
}

export default CategoryCard;
