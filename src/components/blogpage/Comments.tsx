import { ThumbsUp } from "lucide-react";
import React from "react";

function Comment() {
  return (
    <div className="space-y-3 mx-5">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-x-3">
          <span className="rounded-full border-[1px] border-black w-8 h-8 overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
              alt="Author"
              className="w-full h-full"
            />
          </span>
          <p className="font-semibold">Test</p>
        </span>
        <span className="text-gray-400 text-sm">11 minutes</span>
      </div>

      <div className="text-sm tracking-wider leading-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
        laboriosam, possimus illo fuga deserunt vel, sint blanditiis id
        temporibus nostrum similique vitae aperiam ipsam, perferendis laborum
        fugiat atque molestias. Architecto!
      </div>

      <div>
        <div className="flex gap-2 items">
          <ThumbsUp className="w-5 h-5" />
          <p className="">1</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
