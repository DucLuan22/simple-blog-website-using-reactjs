import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

const fetchTopDailyViewedPosts = async (): Promise<Post[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/stats/daily`
  );
  return response.data;
};

export const useTopDailyViewedPosts = () => {
  return useQuery<Post[], Error>(
    "topDailyViewedPosts",
    fetchTopDailyViewedPosts,
    {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};
