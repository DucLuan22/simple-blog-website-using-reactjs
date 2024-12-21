import { Category } from "@/interface/Category";
import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

interface PostsByCategoryResponse {
  posts: Post[] | [];
}

const fetchPostsByCategoryId = async (
  category_id: number | undefined
): Promise<PostsByCategoryResponse> => {
  if (!category_id) throw new Error("Category ID is required");

  const { data } = await axios.get<PostsByCategoryResponse>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/category/${category_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return data;
};

const usePostsByCategoryId = (
  category_id: number | undefined
): UseQueryResult<PostsByCategoryResponse, Error> => {
  return useQuery(
    ["posts", category_id],
    () => fetchPostsByCategoryId(category_id),
    {
      enabled: !!category_id,
    }
  );
};

export default usePostsByCategoryId;
