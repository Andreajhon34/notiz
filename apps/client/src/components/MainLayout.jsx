import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { useAuthStore } from "../lib/useAuthStore";

const AuthButtons = () => {
  const token = useAuthStore((state) => state.token);

  if (token) return null;

  return (
    <div className="flex flex-none justify-end w-full">
      <div className="flex gap-4 px-7 py-3">
        <Button size="lg" variant="secondary" asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
        <Button size="lg" asChild>
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
};

export default function MainLayout() {
  return (
    <div className="bg-background min-h-screen w-full flex flex-col">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <AuthButtons />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
