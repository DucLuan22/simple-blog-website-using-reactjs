import { Category } from "@/interface/Category";
import { cn, getRandomBgColor } from "@/lib/utils";

function CategoryCard({ category_id, category_name }: Category) {
  return (
    <span
      key={category_id}
      className={cn(
        "flex items-center gap-2 p-4 bg-opacity-90 rounded-xl flex-grow min-w-[100px] max-w-[200px] justify-center",
        getRandomBgColor()
      )}
    >
      <p className="font-semibold text-white">{category_name}</p>
    </span>
  );
}

export default CategoryCard;
