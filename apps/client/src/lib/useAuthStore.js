import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token: token }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-profile",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export { useAuthStore };
