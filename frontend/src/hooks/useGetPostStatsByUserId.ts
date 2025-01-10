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
  total_shares: number;
  daily_shares: number;
  monthly_shares: number;
  yearly_shares: number;
  total_bookmarks: number;
  daily_bookmarks: number;
  monthly_bookmarks: number;
  yearly_bookmarks: number;
}

const useGetPostStatsByUserId = (user_id: number | undefined) => {
  return useQuery<PostStatsData[], Error>(
    ["postStats", user_id],
    async () => {
      if (!user_id) {
        throw new Error("User ID is undefined.");
      }
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/stats/get-posts-stats/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    },
    {
      enabled: Boolean(user_id),
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 3,
      onError: (error: Error) => {
        console.error("Error fetching post statistics:", error.message);
      },
    }
  );
};

export default useGetPostStatsByUserId;
