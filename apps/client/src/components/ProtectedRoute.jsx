import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/useAuthStore";

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
