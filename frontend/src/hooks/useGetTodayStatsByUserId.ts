import { useQuery } from "react-query";
import axios from "axios";

interface PostStats {
  post_id: number;
  title: string;
  thumbnail: string;
  total_comments: number;
  total_bookmarks: number;
  total_views: number;
  total_shares: number;
}

const fetchTodayStatsByUserId = async (
  user_id: number | undefined
): Promise<PostStats[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/stats/today-stats/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  console.log(response);
  return response.data.data;
};

export const useGetTodayStatsByUserId = (user_id: number | undefined) => {
  return useQuery<PostStats[], Error>(
    ["todayStats", user_id],
    () => fetchTodayStatsByUserId(user_id),
    {
      enabled: !!user_id, // Only run the query if user_id is defined
    }
  );
};
