import { useQuery } from "react-query";
import axios from "axios";
import { Comment } from "@/interface/Comment";

const fetchCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get<{ success: boolean; data: Comment[] }>(
    `http://localhost:5000/api/comments/getPostComments/${postId}`
  );
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch comments");
  }
};

const useComments = (postId: string) => {
  return useQuery<Comment[], Error>(["comments", postId], () =>
    fetchCommentsByPostId(postId)
  );
};

export default useComments;
