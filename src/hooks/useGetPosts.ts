import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@/interface/Post";

interface PostResponse {
  success: boolean;
  data: Post[] | [];
}
const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<PostResponse>(
    "http://localhost:5000/api/posts/getPost"
  );

  if (data.success) {
    return data.data;
  } else {
    throw new Error("Failed to fetch categories");
  }
};

const useFetchPosts = () => {
  return useQuery<Post[], Error>("posts", fetchPosts);
};

export default useFetchPosts;
