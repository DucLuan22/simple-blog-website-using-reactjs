import { Eye, ThumbsUp } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import usePostsByUserId from "@/hooks/getPostByUserId";
import { useCounterStore } from "@/store";
import { format } from "date-fns";

function PostStats() {
  const user = useCounterStore((state) => state.user);
  const { data, isLoading } = usePostsByUserId(user?.id);

  console.log(data);
  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold text-gray-800">Popular Posts</p>
        <Select>
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-md shadow-sm text-gray-600">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-md">
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {data?.map((post) => (
          <div
            key={post.post_id}
            className="flex flex-col md:flex-row md:items-center justify-between border-b-[1px] border-opacity-60 last:border-b-0 py-5"
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0 gap-x-5">
              {/* Avatar Image */}
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-14 h-14 object-cover rounded-xl"
                loading="lazy" // Lazy load images
                width="56" // Specify width
                height="56" // Specify height
              />
              <div>
                <p className="font-medium text-gray-800">{post.title}</p>
                <p className="text-sm text-gray-500">
                  {format(post.createDate, "dd-MM-yyyy")}
                </p>
                <div className="flex flex-wrap space-x-2 mt-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-500">
                    {post.category_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-4 md:space-x-6 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostStats;
