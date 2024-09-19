import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCounterStore } from "@/store";

interface UserData {
  google_id: string;
  avatar_url: string;
  locale: string;
  familyName: string;
  givenName: string;
}

interface AuthResponse {
  user: {
    _json: {
      sub: string;
      picture: string;
      locale: string;
      family_name: string;
      given_name: string;
    };
  };
  success: boolean;
}

interface UserFetchResponse {
  success: boolean;
  data?: {
    id: number;
  };
}

// Define the type for the API response when adding a user
interface AddUserResponse {
  success: boolean;
}

const useAuthenticatedRequest = () => {
  const setAuthenticated = useCounterStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const setUsers = useCounterStore((state) => state.setUsers);

  // Define the fetchAuthenticatedData function
  const fetchAuthenticatedData = async () => {
    try {
      const response = await axios.get<AuthResponse>(
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

      const userData: UserData = {
        google_id: response.data.user._json.sub,
        avatar_url: response.data.user._json.picture,
        locale: response.data.user._json.locale,
        familyName: response.data.user._json.family_name,
        givenName: response.data.user._json.given_name,
      };

      // Fetch user from the database
      const userResponse = await axios.get<UserFetchResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`,
        {
          params: { google_id: userData.google_id },
        }
      );

      if (!userResponse.data.success) {
        // If user not found, create a new user
        await axios.post<AddUserResponse>(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/addUser`,
          {
            ...userData,
            authentication: response.data.success,
          }
        );
      }

      // Set user in state
      setUsers({
        id: userResponse.data.data?.id,
        ...userData,
      });

      return { success: true };
    } catch (error) {
      setNotAuthenticated();
      throw error;
    }
  };

  // Use the query with the fetchAuthenticatedData function
  const { refetch, isLoading, error, data } = useQuery(
    "authenticatedData",
    fetchAuthenticatedData,
    {
      enabled: false, // Prevent automatic execution
      onSuccess: (data) => {
        if (data.success) {
          setAuthenticated();
        }
      },
      onError: () => {
        setNotAuthenticated();
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};

export default useAuthenticatedRequest;
