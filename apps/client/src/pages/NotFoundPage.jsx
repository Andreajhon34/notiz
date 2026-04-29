import { FileX2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6">
      <div className="rounded-full bg-muted p-4">
        <FileX2 className="w-10 h-10 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-sm">
          This note doesn't exist or may have been deleted. Check the URL or go
          back to your notes.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button asChild>
          <Link to="/home">Go to my notes</Link>
        </Button>
      </div>
    </div>
  );
}
