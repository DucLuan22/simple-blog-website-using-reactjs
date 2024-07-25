// Comment.tsx
import type { Comment as CommentType } from "@/interface/Comment";
import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useCounterStore } from "@/store";
import { useNavigate } from "react-router-dom";

function timeDifference(createdAt: Date) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  return formatDistanceToNow(createdDate, { addSuffix: true });
}

function Comment({
  content,
  comment_id,
  user_id,
  likes,
  createdAt,
  familyName,
  givenName,
}: CommentType) {
  const queryClient = useQueryClient();
  const [currentLike, setCurrentLike] = useState(likes);
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const mutation = useMutation(
    async () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/comments/like",
        { user_id: user_id, comment_id: comment_id }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          // Update the currentLike state with the correct likes count
          setCurrentLike((prev) =>
            data.message.includes("liked") ? prev + 1 : prev - 1
          );
          queryClient.invalidateQueries(["comments", comment_id]);
        }
      },
    }
  );

  const handleLikeButton = async () => {
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  };

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
        <span className="text-gray-400 text-sm">
          {timeDifference(createdAt)}
        </span>
      </div>
      <div className="text-sm tracking-wider leading-6">{content}</div>
      <div>
        <div className="flex gap-1 items-center cursor-pointer">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="p-1 h-7"
            onClick={handleLikeButton}
          >
            <ThumbsUp className="w-4 h-4 hover:text-black" />
          </Button>
          <p className="">{currentLike}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
