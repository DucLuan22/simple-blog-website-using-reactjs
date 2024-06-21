import { create } from "zustand";

interface User {
  id: string;
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
    set({ isAuthenticated: false });
  },
  setUsers: (user: User) => {
    set({ user });
  },
}));
