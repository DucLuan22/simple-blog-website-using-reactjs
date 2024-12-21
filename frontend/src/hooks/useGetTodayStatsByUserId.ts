import { useQuery } from "react-query";
import axios from "axios";

interface PostStats {
  post_id: number;
  title: string;
  thumbnail: string;
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

const fetchTodayStatsByUserId = async (
  user_id: number | undefined
): Promise<PostStats[]> => {
  if (!user_id) throw new Error("User ID is required");

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/stats/today-stats/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return response.data.data;
};

export const useGetTodayStatsByUserId = (user_id: number | undefined) => {
  return useQuery<PostStats[], Error>(
    ["todayStats", user_id],
    () => fetchTodayStatsByUserId(user_id),
    {
      enabled: !!user_id,
      retry: 1, // Retry once on failure
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    }
  );
};
