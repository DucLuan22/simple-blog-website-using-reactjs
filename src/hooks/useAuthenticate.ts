import { useQuery } from "react-query";
import axios from "axios";
import { useCounterStore } from "@/store";

const useAuthenticatedRequest = () => {
  const setAuthenticated = useCounterStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
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
      setNotAuthenticated();
      throw new Error("Authentication has failed!");
    }
    setAuthenticated();
    return response.data;
  });
};

export default useAuthenticatedRequest;
