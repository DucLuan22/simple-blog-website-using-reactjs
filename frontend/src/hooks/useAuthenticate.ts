import { useQuery } from "react-query";
import axios from "axios";
import { useCounterStore } from "@/store";
import { jwtDecode } from "jwt-decode";

interface UserData {
  id: number;
  google_id: string;
  avatar_url: string;
  locale: string;
  familyName: string;
  givenName: string;
  email: string;
}

interface DecodedToken {
  exp: number;
}

const useAuthenticatedRequest = () => {
  const { setAuthenticated, setNotAuthenticated, setUsers } = useCounterStore(
    (state) => ({
      setAuthenticated: state.setAuthenticated,
      setNotAuthenticated: state.setNotAuthenticated,
      setUsers: state.setUsers,
    })
  );

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      return exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  };

  const getStoredToken = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !isTokenExpired(storedToken)) {
      return storedToken;
    }
    return null;
  };

  const ensureAccessToken = async (): Promise<string> => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenFromUrl) {
      localStorage.setItem("accessToken", tokenFromUrl);
      window.history.replaceState(
        {},
        document.title,
        window.location.origin + window.location.pathname
      );
      return tokenFromUrl;
    }

    const storedToken = getStoredToken();
    if (!storedToken) {
      return refreshAccessToken();
    }

    return storedToken;
  };

  const refreshAccessToken = async (): Promise<string> => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const newAccessToken = data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      localStorage.removeItem("accessToken");
      setNotAuthenticated();
      throw new Error("Failed to refresh access token");
    }
  };

  const fetchAuthenticatedData = async () => {
    try {
      const accessToken = await ensureAccessToken();
      const { data } = await axios.get<UserData>(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!data) throw new Error("User not authenticated");
      setUsers(data);
      setAuthenticated();
      return { success: true, user: data };
    } catch (error) {
      console.error("Failed to fetch authenticated data:", error);
      setNotAuthenticated();
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(
    "authenticatedData",
    fetchAuthenticatedData,
    {
      staleTime: 300000, // 5 minutes in milliseconds
      cacheTime: 600000, // 10 minutes in milliseconds
      refetchOnWindowFocus: false,
      retry: false,
      onError: () => setNotAuthenticated(),
    }
  );

  return { isLoading, error, data };
};

export default useAuthenticatedRequest;
