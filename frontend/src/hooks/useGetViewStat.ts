import { useQuery } from "react-query";
import axios from "axios";

interface ViewCountData {
  date: string;
  total_views: number;
}

interface ViewStatsResponse {
  monthlyViews: ViewCountData[];
  yearlyViews: ViewCountData[];
}

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
        }/api/stats/get-views-stats/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.chart_data;
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
