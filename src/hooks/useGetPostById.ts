import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostById = async (post_id: string | undefined): Promise<Post> => {
  const { data } = await axios.get<{ success: boolean; data: Post }>(
    `http://localhost:5000/api/posts/${post_id}`
  );
  return data.data;
};

const usePostById = (
  post_id: string | undefined
): UseQueryResult<Post, Error> => {
  return useQuery(["post", post_id], () => fetchPostById(post_id), {
    enabled: !!post_id,
  });
};

export default usePostById;
