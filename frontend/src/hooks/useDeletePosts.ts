import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

// Function to delete a post
const deletePosts = async ({
  user_id,
  post_id,
}: {
  user_id: number | undefined;
  post_id: string;
}) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/delete`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: { user_id, post_id },
    }
  );
  return data;
};

const useDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePosts, {
    onSuccess: (_, variables) => {
      // Invalidate posts by user ID after deletion
      queryClient.invalidateQueries(["posts", variables.user_id]);
    },
  });
};

export { useDeletePosts };
