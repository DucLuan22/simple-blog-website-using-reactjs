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

    try {
      const data = {
        google_id: response.data.user._json.sub,
        familyName: response.data.user._json.family_name,
        givenName: response.data.user._json.given_name,
        avatar_url: response.data.user._json.picture,
        locale: response.data.user._json.locale,
      };

      const user = await axios.get("http://localhost:5000/api/user/getUser", {
        params: {
          google_id: response.data.user._json.sub,
        },
      });

      if (user.data.success === false) {
        const insertUser = await axios.post(
          "http://localhost:5000/api/user/addUser",
          { ...data, authentication: response.data.success }
        );
      }

      setAuthenticated();
    } catch (error) {
      throw error;
    }
    return response.data;
  });
};

export default useAuthenticatedRequest;
