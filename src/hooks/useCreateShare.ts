import { useMutation } from "react-query";
import axios from "axios";

interface ShareData {
  flatform: string;
  post_id: string;
}

const createShare = async (shareData: ShareData): Promise<any> => {
  const { data } = await axios.post<{ success: boolean; message: string }>(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/shares/create-share`,
    shareData
  );

  return data;
};

const useCreateShare = () => {
  return useMutation(createShare, {
    onSuccess: (data) => {
      if (data.success) {
        console.log("Share created successfully:", data.message);
      }
    },
    onError: (error: any) => {
      console.error("Error creating share:", error.message || error);
    },
  });
};

export default useCreateShare;
