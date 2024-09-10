import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCounterStore } from "@/store";

const useAuthenticatedRequest = () => {
  const setAuthenticated = useCounterStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const setUsers = useCounterStore((state) => state.setUsers);

  const fetchAuthenticatedData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login/success`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200 || !response.data.user) {
        setNotAuthenticated();

        throw new Error("Authentication has failed!");
      }

      const userData = {
        google_id: response.data.user._json.sub,
        avatar_url: response.data.user._json.picture,
        locale: response.data.user._json.locale,
        familyName: response.data.user._json.family_name,
        givenName: response.data.user._json.given_name,
      };

      // Fetch user from the database
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`,
        {
          params: { google_id: userData.google_id },
        }
      );

      if (!userResponse.data.success) {
        // If user not found, create a new user
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/addUser`,
          {
            ...userData,
            authentication: response.data.success,
          }
        );
      }

      // Set user in state
      setUsers({
        id: userResponse.data.data?.id || userData.google_id,
        ...userData,
      });

      setAuthenticated();
      return { success: true };
    } catch (error) {
      setNotAuthenticated();
      throw error;
    }
  };

  const query = useQuery("authenticatedData", fetchAuthenticatedData, {
    enabled: false, // Prevent automatic execution
    onError: () => {
      setNotAuthenticated();
    },
  });

  useEffect(() => {
    query.refetch(); // Manually trigger the query on mount
  }, []); // Empty dependency array ensures this runs only once on mount

  return query;
};

export default useAuthenticatedRequest;
