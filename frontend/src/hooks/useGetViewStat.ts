import { useQuery } from "react-query";
import axios from "axios";

// Define the type for the response data
interface ViewCountData {
  date: string;
  total_views: number;
}

// Define the structure for the expected API response
interface ViewStatsResponse {
  monthlyViews: ViewCountData[];
  yearlyViews: ViewCountData[];
}

// Custom hook to get yearly and monthly view counts
const useGetViewStats = (user_id: number | undefined) => {
  return useQuery<ViewStatsResponse, Error>(
    ["viewStat", user_id],
    async () => {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/posts/stats/get-views/${user_id}`
      );
      return response.data.data;
    },
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      onError: (error: Error) => {
        console.error("Error fetching view stats:", error.message);
      },
      enabled: !!user_id,
    }
  );
};

export default useGetViewStats;
