import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostsByUserId = async (
  user_id: number | undefined
): Promise<Post[]> => {
  const { data } = await axios.get<{ success: boolean; data: Post[] }>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/user/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
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
