import { useQuery } from "react-query";
import axios from "axios";
import { Comment } from "@/interface/Comment";

const fetchCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/comment/post/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  if (response.status == 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch comments");
  }
};

const useComments = (postId: string) => {
  return useQuery<Comment[], Error>(
    ["comments", postId],
    () => fetchCommentsByPostId(postId),
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};

export default useComments;
