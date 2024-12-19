import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface EditPostPayload {
  post_id: string;
  title?: string;
  thumbnail?: string;
  content?: string;
  category_id: number;
}

interface EditPostResponse {
  success: boolean;
  message: string;
}

const editPost = async (
  payload: EditPostPayload
): Promise<EditPostResponse> => {
  const { post_id, ...data } = payload;
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/edit-post/${post_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });
};
