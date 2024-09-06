import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostsByUserId = async (
  user_id: number | undefined
): Promise<Post[]> => {
  const { data } = await axios.get<{ success: boolean; data: Post[] }>(
    `http://localhost:5000/api/posts/users/${user_id}`
  );

  return data.data;
};

const usePostsByUserId = (
  user_id: number | undefined
): UseQueryResult<Post[], Error> => {
  return useQuery(["posts", user_id], () => fetchPostsByUserId(user_id), {
    enabled: !!user_id,
  });
};

export default usePostsByUserId;
