import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: () => void;
  setNotAuthenticated: () => void;
}

export const useCounterStore = create<AuthState>((set) => ({
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  ),
  setAuthenticated: () => {
    localStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },
  setNotAuthenticated: () => {
    localStorage.setItem("isAuthenticated", "false");
    set({ isAuthenticated: false });
  },
}));
