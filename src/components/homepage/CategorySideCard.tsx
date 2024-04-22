import { cn } from "@/lib/utils";

function CategorySideCard() {
  return (
    <span
      className={cn(
        "flex items-center py-3 px-1 bg-opacity-90 rounded-xl flex-grow min-w-[80px] max-w-[120px] justify-center bg-green-300"
      )}
    >
      <p className="text-sm">Technology</p>
    </span>
  );
}

export default CategorySideCard;
