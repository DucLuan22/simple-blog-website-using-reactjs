import { Category } from "@/interface/Category";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

function CategorySideCard({ category_id, category_name }: Category) {
  return (
    <Link
      to={`/category/${category_id}`}
      key={category_id}
      className={cn(
        "flex items-center py-3 px-1 bg-opacity-90 rounded-xl flex-grow min-w-[80px] max-w-[120px] justify-center bg-green-300"
      )}
    >
      <p className="text-sm">{category_name}</p>
    </Link>
  );
}

export default CategorySideCard;
