import axios from "axios";

export const uploadPost = async ({
  title,
  content,
  category_id,
  thumbnail,
  user_id,
}: {
  title: string;
  content: string;
  category_id: number;
  thumbnail: string;
  user_id: number;
}) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/upload`,
    {
      title,
      content,
      category_id,
      thumbnail,
      user_id,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
