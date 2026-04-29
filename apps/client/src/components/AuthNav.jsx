import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function AuthNav() {
  const navigate = useNavigate();
  return (
    <header className="sticky flex-none w-full border-b border-foreground/10">
      <div className="container mx-auto flex flex-1 justify-start items-center py-2">
        <Button variant="plain" size="icon-lg" onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </Button>
      </div>
    </header>
  );
}
