import { Eye, ThumbsUp } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Post {
  id: number;
  title: string;
  date: string;
  tags: string[];
  views: number;
  likes: number;
}

const posts: Post[] = [
  {
    id: 1,
    title: "CSS Performance",
    date: "18 October 2020",
    tags: ["Frontend", "Development"],
    views: 190174,
    likes: 213456,
  },
  {
    id: 2,
    title: "UI Design Color",
    date: "11 June 2020",
    tags: ["UI Design"],
    views: 90174,
    likes: 202629,
  },
  {
    id: 3,
    title: "React Hooks",
    date: "21 September 2020",
    tags: ["React", "JavaScript"],
    views: 24424,
    likes: 147285,
  },
];

function PostStats() {
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
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row md:items-center justify-between border-b-[1px] border-opacity-60 last:border-b-0 py-5"
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0 gap-x-5 lg:gap-x-7 xl:gap-x-10 ">
              {/* Avatar with Initials */}
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl ">
                <span className="text-blue-600 font-semibold">
                  {post.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.title}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
                <div className="flex flex-wrap space-x-2 mt-1">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        tag === "Frontend"
                          ? "bg-red-100 text-red-500"
                          : tag === "Development"
                          ? "bg-blue-100 text-blue-500"
                          : tag === "UI Design"
                          ? "bg-red-100 text-red-500"
                          : "bg-blue-100 text-blue-500"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
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
                <span>{post.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostStats;
