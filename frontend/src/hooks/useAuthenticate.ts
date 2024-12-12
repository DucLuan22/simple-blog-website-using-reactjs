import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useCounterStore } from "@/store";

interface UserData {
  id: number;
  google_id: string;
  avatar_url: string;
  locale: string;
  familyName: string;
  givenName: string;
  email: string;
}

const useAuthenticatedRequest = () => {
  const setAuthenticated = useCounterStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const setUsers = useCounterStore((state) => state.setUsers);

  const ensureAccessToken = async (): Promise<string> => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("accessToken", urlToken);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      return urlToken;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setNotAuthenticated();
        throw new Error("No access token or refresh token found");
      }

      try {
        // Attempt to refresh the access token
        const tokenResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = tokenResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        return newAccessToken;
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setNotAuthenticated();
        throw new Error("Failed to refresh access token");
      }
    }

    return accessToken;
  };

  const fetchAuthenticatedData = async () => {
    try {
      const accessToken = await ensureAccessToken();

      // Fetch user info using the access token
      const response = await axios.get<UserData>(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data) throw new Error("User not authenticated!");

      // Update Zustand state with user info
      setUsers(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      // Handle errors by checking for token expiration or invalid token
      setNotAuthenticated();
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(
    "authenticatedData",
    fetchAuthenticatedData,
    {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch when window is focused
      onSuccess: (data) => {
        if (data.success) setAuthenticated();
      },
      onError: () => {
        setNotAuthenticated();
      },
    }
  );

  return { isLoading, error, data };
};

export default useAuthenticatedRequest;
