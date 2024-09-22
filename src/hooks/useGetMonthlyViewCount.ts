import { useQuery } from "react-query";
import axios from "axios";

// Define the type for the response data
interface ViewCountData {
  month: string;
  total_views: number;
}

// Custom hook to get monthly view count
const useGetMonthlyViewCount = (user_id: number | undefined) => {
  return useQuery<ViewCountData[], Error>(
    ["monthlyViewCount", user_id],
    async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/posts/stats/yearly-view/${user_id}`
      );
      return response.data.data;
    },
    {
      // Optionally, you can specify configuration options here
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      refetchOnWindowFocus: true, // Refetch data when the window regains focus
      onError: (error: Error) => {
        console.error("Error fetching monthly view count:", error.message);
      },
    }
  );
};

export default useGetMonthlyViewCount;
