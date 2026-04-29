import { Outlet } from "react-router-dom";
import AuthNav from "./AuthNav";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <AuthNav />
      <main className="flex-1 flex flex-col items-center relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/5" />

          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl dark:bg-secondary/5" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
