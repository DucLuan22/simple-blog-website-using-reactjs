import { Category } from "@/interface/Category";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchPostsByCategoryId = async (
  category_id: string | undefined
): Promise<Category> => {
  const { data } = await axios.get<Category>(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/${category_id}`
  );

  return data;
};

const usePostsByCategoryId = (
  category_id: string | undefined
): UseQueryResult<Category, Error> => {
  return useQuery(
    ["posts", category_id],
    () => fetchPostsByCategoryId(category_id),
    {
      enabled: !!category_id,
    }
  );
};

export default usePostsByCategoryId;
