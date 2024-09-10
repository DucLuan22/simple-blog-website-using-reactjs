import { create } from "zustand";

interface User {
  id: number;
  google_id: string;
  avatar_url: string;
  locale: string;
  familyName: string;
  givenName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: () => void;
  setNotAuthenticated: () => void;
  setUsers: (user: User) => void;
}

// Define an empty default user object
const emptyUser: User = {
  id: 0,
  google_id: "",
  avatar_url: "",
  locale: "",
  familyName: "",
  givenName: "",
};

export const useCounterStore = create<AuthState>((set) => ({
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  ),
  user: null,
  setAuthenticated: () => {
    localStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },
  setNotAuthenticated: () => {
    localStorage.setItem("isAuthenticated", "false");
    set({ isAuthenticated: false, user: emptyUser }); // Reset user to empty object
  },
  setUsers: (user: User) => {
    set({ user });
  },
}));
