import { cn } from "@/lib/utils";

interface CategoryCardProps {
  backgroundColor: string;
}
function CategoryCard({ backgroundColor }: CategoryCardProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 p-4 bg-opacity-90 rounded-xl flex-grow min-w-[100px] max-w-[200px] justify-center",
        backgroundColor
      )}
    >
      <div className="rounded-[100%] border-[1px] border-black w-[40px] overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
          alt="Technology"
        />
      </div>
      <p className="font-semibold">Technology</p>
    </span>
  );
}

export default CategoryCard;
