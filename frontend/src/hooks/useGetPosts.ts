import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/`
  );

  if (response.status == 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch posts");
  }
};

const useFetchPosts = () => {
  return useQuery<Post[], Error>("posts", fetchPosts, {
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useFetchPosts;
