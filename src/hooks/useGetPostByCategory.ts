import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostsByCategoryId = async (
  category_id: string | undefined
): Promise<Post[]> => {
  const { data } = await axios.get<{ success: boolean; data: Post[] }>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/category/${category_id}`
  );

  return data.data;
};

const usePostsByCategoryId = (
  category_id: string | undefined
): UseQueryResult<Post[], Error> => {
  return useQuery(
    ["posts", category_id],
    () => fetchPostsByCategoryId(category_id),
    {
      enabled: !!category_id,
    }
  );
};

export default usePostsByCategoryId;
