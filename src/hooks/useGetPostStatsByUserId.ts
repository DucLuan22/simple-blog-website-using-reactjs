import { useQuery } from "react-query";
import axios from "axios";

interface PostStatsData {
  post_id: number;
  title: string;
  thumbnail: string;
  created_date: string;
  updated_date: string;
  category_name: string;
  total_views: number;
  daily_views: number;
  monthly_views: number;
  yearly_views: number;
  total_comments: number;
  daily_comments: number;
  monthly_comments: number;
  yearly_comments: number;
}

const useGetPostStatsByUserId = (user_id: number | undefined) => {
  return useQuery<PostStatsData[], Error>(
    ["postStats", user_id],
    async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/posts/stats/get-posts-stats/${user_id}`
      );
      return response.data.data;
    },
    {
      enabled: !!user_id, // Only fetch if user_id is provided
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: true,
      onError: (error: Error) => {
        console.error("Error fetching post statistics:", error.message);
      },
    }
  );
};

export default useGetPostStatsByUserId;
