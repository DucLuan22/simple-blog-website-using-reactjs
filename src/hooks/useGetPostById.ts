import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostById = async (post_id: string | undefined): Promise<Post> => {
  const { data } = await axios.get<{ success: boolean; data: Post }>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`
  );
  return data.data;
};

const usePostById = (
  post_id: string | undefined
): UseQueryResult<Post, Error> => {
  return useQuery(["post", post_id], () => fetchPostById(post_id), {
    enabled: !!post_id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export default usePostById;
