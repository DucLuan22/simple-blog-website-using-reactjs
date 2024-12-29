import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

const fetchSearchedPosts = async (keywords: string): Promise<Post[]> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/search/${keywords}`
  );
  if (!data) {
    throw new Error("Failed to search posts");
  }
  return data;
};

const useSearchedPosts = (keywords: string): UseQueryResult<Post[], Error> => {
  return useQuery(
    ["searchedPosts", keywords],
    () => fetchSearchedPosts(keywords),
    {
      enabled: !!keywords && keywords.trim().length > 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export default useSearchedPosts;
