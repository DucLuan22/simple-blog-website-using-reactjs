import { useQuery } from "react-query";
import axios from "axios";

// Define the type for the response data
interface ViewCountData {
  month: string;
  total_views: number;
}

// Custom hook to get monthly view count
const useGetViewsCount = (user_id: number | undefined) => {
  return useQuery<ViewCountData[], Error>(
    ["monthlyViewCount", user_id],
    async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/posts/stats/get-views/${user_id}`
      );
      return response.data.data;
    },
    {
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      refetchOnWindowFocus: true, // Refetch data when the window regains focus
      onError: (error: Error) => {
        console.error("Error fetching monthly view count:", error.message);
      },
    }
  );
};

export default useGetViewsCount;
