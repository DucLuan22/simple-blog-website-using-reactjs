import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/post/getPost");
  return data;
};

const useFetchPosts = () => {
  return useQuery("posts", fetchPosts);
};

export default useFetchPosts;
