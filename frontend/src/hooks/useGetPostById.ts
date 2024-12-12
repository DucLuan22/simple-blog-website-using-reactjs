import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostById = async (post_id: string | undefined): Promise<Post> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`
  );
  if (!data) {
    throw new Error("Failed to fetch post");
  }
  return data;
};

const usePostById = (
  post_id: string | undefined
): UseQueryResult<Post, Error> => {
  return useQuery(["post", post_id], () => fetchPostById(post_id), {
    enabled: !!post_id,
    cacheTime: 30 * 60 * 1000,
  });
};

export default usePostById;
