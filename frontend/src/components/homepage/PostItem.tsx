import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { getTextFromParagraphString } from "@/lib/utils";

interface RecentPostProps {
  post_id: string;
  category_name: string;
  createDate: Date;
  title: string;
  thumbnail: string;
  content: string;
}

const PostItem: React.FC<RecentPostProps> = React.memo(
  ({ post_id, category_name, createDate, title, thumbnail, content }) => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="w-full md:basis-1/2 overflow-hidden">
          <img
            src={thumbnail || "/placeholder.jpg"}
            alt={title || "Post Thumbnail"}
            className="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <div className="space-y-3 md:space-y-4 lg:space-y-7 md:basis-1/2">
          <div className="text-gray-400 text-sm">
            {format(createDate, "dd-MM-yyyy")} -{" "}
            <span className="text-pink-800">
              {category_name?.toUpperCase() || "CATEGORY"}
            </span>
          </div>
          <h2 className="text-lg xl:text-xl font-semibold line-clamp-2">
            {title || "Untitled Post"}
          </h2>
          <p className="line-clamp-2">
            {getTextFromParagraphString(content) || "No content available."}
          </p>
          <Button
            aria-label="Read More"
            variant="outline"
            onClick={() => navigate(`/posts/${post_id}`)}
          >
            Read More
          </Button>
        </div>
      </div>
    );
  }
);

export default PostItem;
