import { useQuery } from "react-query";
import axios from "axios";

interface ViewCountData {
  month: string;
  total_views: number;
}

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
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      onError: (error: Error) => {
        console.error("Error fetching monthly view count:", error.message);
      },
    }
  );
};

export default useGetMonthlyViewCount;
