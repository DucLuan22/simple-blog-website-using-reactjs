import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

// Function to delete a post
const deletePosts = async ({
  user_id,
  post_id,
}: {
  user_id: number;
  post_id: string;
}) => {
  const { data } = await axios.post("http://localhost:5000/api/posts/delete", {
    user_id,
    post_id,
  });
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
