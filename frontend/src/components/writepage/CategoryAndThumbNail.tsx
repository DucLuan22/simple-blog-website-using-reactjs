import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Category } from "@/interface/Category";

interface CategoryAndThumbnailProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CategoryAndThumbnail({
  categories,
  selectedCategory,
  onCategoryChange,
  onThumbnailChange,
}: CategoryAndThumbnailProps) {
  return (
    <div className="flex gap-3">
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.category_id}
              value={category.category_id.toString()}
            >
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-[250px]">
        <Input
          type="file"
          accept="image/jpeg, image/png"
          onChange={onThumbnailChange}
        />
      </div>
    </div>
  );
}

export default CategoryAndThumbnail;
