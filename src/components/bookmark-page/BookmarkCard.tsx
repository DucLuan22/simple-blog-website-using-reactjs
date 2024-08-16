import { Post } from "@/interface/Post";
import { Eye } from "lucide-react";
import React from "react";

function BookmarkCard({
  thumbnail,
  post_id,
  views,
  title,
  content,
  category_id,
  category_name,
  createDate,
  updateDate,
  user_id,
}: Post) {
  return (
    <div
      className="w-[350px] h-[250px] border rounded-lg overflow-hidden shadow-lg flex flex-col"
      key={post_id}
    >
      <div className="h-2/3">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="text-sm text-gray-600 flex justify-between">
          <div className="flex gap-1 items-center">
            <span className="font-medium">{views}</span>
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <span>by Me</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
