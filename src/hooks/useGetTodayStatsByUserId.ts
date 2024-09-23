import { useQuery } from "react-query";
import axios from "axios";

interface PostStats {
  post_id: number;
  title: string;
  thumbnail: string;
  total_comments: number;
  total_bookmarks: number;
  total_views: number;
}

const fetchTodayStatsByUserId = async (
  user_id: number | undefined
): Promise<PostStats[]> => {
  const response = await axios.get(
    `http://localhost:5000/api/posts/stats/daily-notification/${user_id}`
  );
  return response.data.data; // Adjust this if your API response structure differs
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
