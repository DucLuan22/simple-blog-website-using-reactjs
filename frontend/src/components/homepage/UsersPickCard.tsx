import { format } from "date-fns";
import { useMemo } from "react";

interface UsersPickCardProps {
  category: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}

function UsersPickCard({
  category,
  title,
  author,
  date,
  imageUrl,
}: UsersPickCardProps) {
  const formattedDate = useMemo(
    () => format(new Date(date), "dd.MM.yyyy"),
    [date]
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="w-12 md:w-16 lg:w-20 aspect-square rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
        <img
          src={imageUrl || "/default-thumbnail.jpg"}
          className="w-full h-full object-cover"
          alt={`${title} thumbnail`}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col space-y-1 w-full">
        <span className="bg-orange-400 py-1 px-3 rounded-3xl font-semibold text-xs sm:text-sm self-start">
          {category}
        </span>

        <h2 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 sm:line-clamp-1">
          {title}
        </h2>

        <div className="flex justify-start lg:justify-between text-xs space-x-1">
          <span className="truncate">{author}</span>
          <span> - </span>
          <span className="text-gray-400 flex-shrink-0">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default UsersPickCard;
