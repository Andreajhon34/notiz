import { useEffect, useState } from "react";
import authApi from "../lib/axios/authApi";
import { useAuthStore } from "../lib/useAuthStore";
import LoadingPage from "../pages/LoadingPage";

const refreshService = async (signal) => {
  const res = await authApi.post("/refresh", undefined, {
    signal,
  });
  return res.data;
};

export default function AuthProvider({ children }) {
  const setToken = useAuthStore((state) => state.setToken);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const initAuth = async () => {
      try {
        const { data } = await refreshService(controller.signal);
        if (isMounted) {
          setToken(data.accessToken);
        }
      } catch {
        if (isMounted) setToken(null);
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [setToken]);

  if (isInitializing) return <LoadingPage />;
  return children;
}
