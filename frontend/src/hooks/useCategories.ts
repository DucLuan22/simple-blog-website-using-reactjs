import { useQuery } from "react-query";
import axios from "axios";
import { Category } from "@/interface/Category";

const fetchCategories = async (): Promise<Category[]> => {
  console.log("useCategory hook called");
  const { data } = await axios.get<Category[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/category`
  );

  if (Array.isArray(data)) {
    return data;
  } else {
    throw new Error("Invalid category data received from server");
  }
};

const useCategory = () => {
  return useQuery<Category[], Error>("categories", fetchCategories, {
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialData: [],
    onError: (error: Error) => {
      console.error("Failed to fetch categories:", error);
    },
  });
};

export default useCategory;
