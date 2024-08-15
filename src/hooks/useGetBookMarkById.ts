import { Post } from "@/interface/Post";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

const fetchBookmarkById = async (
  user_id: number | undefined
): Promise<Post> => {
  const { data } = await axios.get<{ success: boolean; data: Post }>(
    `http://localhost:5000/api/posts/bookmark/${user_id}`
  );
  return data.data;
};

const useBookmarkById = (
  user_id: number | undefined
): UseQueryResult<Post[], Error> => {
  return useQuery(["post", user_id], () => fetchBookmarkById(user_id), {
    enabled: !!user_id,
  });
};

export default useBookmarkById;
