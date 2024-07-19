import type { Comment } from "@/interface/Comment";
import { ThumbsUp } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { formatDistanceToNow, format } from "date-fns";

function timeDifference(createdAt: Date) {
  const now = new Date();
  const createdDate = new Date(createdAt);

  return formatDistanceToNow(createdDate, { addSuffix: true });
}

function Comment({
  content,
  id,
  post_id,
  user_id,
  likes,
  createdAt,
  familyName,
  givenName,
}: Comment) {
  // Calculate the time difference
  const timeAgo = timeDifference(createdAt);

  return (
    <div className="space-y-3 border-[1px] px-2 py-3 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-x-3">
          <span className="rounded-full border-[1px] border-black w-8 h-8 overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
              alt="Author"
              className="w-full h-full"
            />
          </span>
          <p className="font-semibold">{familyName + " " + givenName}</p>
        </span>
        <span className="text-gray-400 text-sm">{timeAgo}</span>
      </div>

      <div className="text-sm tracking-wider leading-6">{content}</div>

      <div>
        <div className="flex gap-1 items-center cursor-pointer">
          <Button size={"sm"} variant={"ghost"} className="p-1 h-7">
            <ThumbsUp className="w-4 h-4 hover:text-black" />
          </Button>
          <p className="">{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
