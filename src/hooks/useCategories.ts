import { useQuery } from "react-query";
import axios from "axios";
import { Category } from "@/interface/Category";

interface CategoryResponse {
  success: boolean;
  data: Category[] | [];
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<CategoryResponse>(
    "http://localhost:5000/api/category/getCategories"
  );
  if (data.success) {
    return data.data;
  } else {
    throw new Error("Failed to fetch categories");
  }
};

const useCategory = () => {
  return useQuery<Category[], Error>("categories", fetchCategories);
};

export default useCategory;
