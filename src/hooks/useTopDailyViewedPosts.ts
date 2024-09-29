import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

const fetchTopDailyViewedPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/stats/top-daily-posts`
  );
  return data.data;
};

export const useTopDailyViewedPosts = () => {
  return useQuery<Post[], Error>(
    "topDailyViewedPosts",
    fetchTopDailyViewedPosts
  );
};
