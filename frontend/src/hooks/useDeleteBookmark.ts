import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const deleteBookmark = async ({
  user_id,
  post_id,
}: {
  user_id: number;
  post_id: string;
}) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/bookmark/delete`,
    {
      data: { user_id, post_id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return data;
};

const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookmark");
    },
    onError: (error) => {
      console.error("Error deleting bookmark:", error);
    },
  });
};

export { useDeleteBookmark };
