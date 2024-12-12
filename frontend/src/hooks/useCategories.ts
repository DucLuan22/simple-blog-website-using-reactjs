import { useQuery } from "react-query";
import axios from "axios";
import { Category } from "@/interface/Category";

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/category`
  );

  if (data) {
    return data;
  } else {
    throw new Error("Failed to fetch categories");
  }
};

const useCategory = () => {
  return useQuery<Category[], Error>("categories", fetchCategories, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useCategory;
