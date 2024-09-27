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
      return response.data.data; // Ensure the API response structure is correct
    },
    {
      // Optionally, you can specify configuration options here
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      refetchOnWindowFocus: true, // Refetch data when the window regains focus
      onError: (error: Error) => {
        console.error("Error fetching view stats:", error.message);
      },
      enabled: !!user_id, // Only run query if user_id is defined
    }
  );
};

export default useGetViewStats;
