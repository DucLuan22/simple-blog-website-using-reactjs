import { useQuery } from "react-query";
import axios from "axios";
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

interface AddUserResponse {
  success: boolean;
}

const useAuthenticatedRequest = () => {
  const setAuthenticated = useCounterStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const setUsers = useCounterStore((state) => state.setUsers);

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
        throw new Error("Authentication failed!");
      }

      const userData: UserData = {
        google_id: response.data.user._json.sub,
        avatar_url: response.data.user._json.picture,
        locale: response.data.user._json.locale,
        familyName: response.data.user._json.family_name,
        givenName: response.data.user._json.given_name,
      };

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

  const { isLoading, error, data } = useQuery(
    "authenticatedData",
    fetchAuthenticatedData,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,

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

  return {
    isLoading,
    error,
    data,
  };
};

export default useAuthenticatedRequest;
