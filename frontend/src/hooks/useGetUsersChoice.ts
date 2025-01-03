import { useQuery } from "react-query";
import axios from "axios";
import { Category } from "@/interface/Category";

interface GetUserChoiceProps {
  post_id: string;
  category_name: string;
  title: string;
  givenName: string;
  familyName: string;
  createDate: string;
  thumbnail: string;
}

const fetchUsersChoice = async (): Promise<GetUserChoiceProps[]> => {
  const { data } = await axios.get<GetUserChoiceProps[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/home/get-users-choice-posts`
  );

  if (Array.isArray(data)) {
    return data;
  } else {
    throw new Error("Invalid category data received from server");
  }
};

const useGetUsersChoice = () => {
  return useQuery<GetUserChoiceProps[], Error>(
    "users-choice-posts",
    fetchUsersChoice,
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      initialData: [],
      onError: (error: Error) => {
        console.error("Failed to fetch categories:", error);
      },
    }
  );
};

export default useGetUsersChoice;
