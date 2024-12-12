import type { Comment as CommentType } from "@/interface/Comment";
import { EllipsisVertical, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useCounterStore } from "@/store";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function timeDifference(createdAt: Date) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  return formatDistanceToNow(createdDate, { addSuffix: true });
}

interface CommentProps {
  comment_id: number;
  user_id: number;
  post_id: string;
  content: string;
  createdAt: Date;
  givenName: string;
  familyName: string;
  likes: number;
  dislikes: number;
  post_user_id: number;
}

function Comment({
  content,
  comment_id,
  user_id,
  likes,
  createdAt,
  familyName,
  givenName,
  post_id,
  dislikes,
  post_user_id,
}: CommentProps) {
  const queryClient = useQueryClient();
  const [currentLike, setCurrentLike] = useState(likes);
  const [currentDislike, setCurrentDislike] = useState(dislikes);
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);
  const user = useCounterStore((state) => state.user);

  const navigate = useNavigate();

  const likeMutation = useMutation(
    async () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/like`,
        { user_id: user?.id, comment_id: comment_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response;
    },
    {
      onSuccess: (data) => {
        if (data?.status == 200) {
          setCurrentLike((prev) =>
            data.data.includes("liked") ? prev + 1 : prev - 1
          );
          queryClient.invalidateQueries(["comments", post_id]);
        }
      },
    }
  );

  const dislikeMutation = useMutation(
    async () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/dislike`,
        { user_id: user?.id, comment_id: comment_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        if (data?.status == 200) {
          setCurrentDislike((prev) =>
            data.data.includes("disliked") ? prev + 1 : prev - 1
          );
        }
      },
    }
  );

  const deleteMutation = useMutation(
    async () => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: {
            user_id: user?.id,
            comment_id: comment_id,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", post_id]);
      },
    }
  );

  const handleLikeButton = async () => {
    try {
      await likeMutation.mutateAsync();
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  };

  const handleDislikeButton = async () => {
    try {
      await dislikeMutation.mutateAsync();
    } catch (error) {
      console.error("Error disliking/undisliking comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting comment:", error);
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

          {post_user_id === user_id && (
            <span className="bg-secondary p-1 text-sm font-semibold rounded-lg">
              Author
            </span>
          )}
        </span>

        <span className="gap-2 flex items-center">
          <span className="text-gray-400 text-sm">
            {timeDifference(createdAt)}
          </span>
          {user?.id === user_id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onSelect={handleDeleteComment}>
                  Remove
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </span>
      </div>
      <div className="text-sm tracking-wider leading-6">{content}</div>
      {user?.id !== user_id && (
        <div className="flex gap-3">
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

          <div className="flex gap-1 items-center cursor-pointer">
            <Button
              size={"sm"}
              variant={"ghost"}
              className="p-1 h-7"
              onClick={handleDislikeButton}
            >
              <ThumbsDown className="w-4 h-4 hover:text-black" />
            </Button>
            <p className="">{currentDislike}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
