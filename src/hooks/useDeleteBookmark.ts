import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

// Function to delete a bookmark
const deleteBookmark = async ({
  user_id,
  post_id,
}: {
  user_id: number;
  post_id: string;
}) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/bookmark/delete`,
    {
      user_id,
      post_id,
    }
  );
  return data;
};

const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    },
  });
};

export { useDeleteBookmark };
