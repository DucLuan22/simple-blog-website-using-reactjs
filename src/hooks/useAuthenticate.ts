import { useQuery } from "react-query";
import axios from "axios";

const useAuthenticatedRequest = () => {
  return useQuery("authenticatedData", async () => {
    const response = await axios.get(
      "http://localhost:5000/auth/login/success",
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Authentication has failed!");
    }
    return response.data;
  });
};

export default useAuthenticatedRequest;
