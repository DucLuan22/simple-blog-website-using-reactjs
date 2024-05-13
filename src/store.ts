import { create } from "zustand";

type CounterStore = {
  isAuthenticated: boolean;
  setAuthenticated: () => void;
  setNotAuthenticated: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated() {
    set({ isAuthenticated: true });
  },
  setNotAuthenticated() {
    set({ isAuthenticated: false });
  },
}));
