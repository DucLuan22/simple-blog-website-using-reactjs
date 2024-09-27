import { useQuery } from "react-query";
import axios from "axios";

// Define the type for the response data
interface ViewCountData {
  month: string;
  total_views: number;
}

// Custom hook to get yearly view count
const useGetYearlyViewCount = (user_id: number) => {
  return useQuery<ViewCountData[], Error>(
    ["yearlyViewCount", user_id],
    async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/posts/stats/yearly-view/${user_id}`
      );
      return response.data.data;
    },
    {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: (error: Error) => {
        console.error("Error fetching yearly view count:", error.message);
      },
    }
  );
};

export default useGetYearlyViewCount;
