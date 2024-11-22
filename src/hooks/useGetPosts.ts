import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

interface PostResponse {
  success: boolean;
  data: Post[] | [];
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<PostResponse>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/getPost`
  );

  if (data.success) {
    return data.data;
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
