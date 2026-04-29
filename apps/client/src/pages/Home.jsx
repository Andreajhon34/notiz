import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import useCreateNote from "../hooks/useCreateNode";
import { useAuthStore } from "../lib/useAuthStore";
import useNotesStore from "../lib/useNotesStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const notes = useNotesStore((state) => state.notes);
  const { isLoading, handleCreateNote } = useCreateNote();

  return (
    <div className="flex flex-1 flex-col p-10 gap-10">
      <div className="flex flex-1 flex-col justify-center container mx-auto px-4">
        <section className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight mx-auto text-center">
            👋 Hi, {user?.username}
          </h1>
          <p className="text-muted-foreground mx-auto">
            Ready to capture some ideas today?
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <h1 className="col-span-3">Your recent notes:</h1>
          {notes.length > 0 ? (
            notes.slice(0, 6).map((note) => (
              <Link
                to={`/notes/${note.id}`}
                key={note.id}
                className="block no-underline"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg truncate">
                      {note.title || "Untitled"}
                    </CardTitle>
                    <CardDescription>
                      Last edited {new Date(note.updated_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 border-2 border-dashed rounded-xl p-20 flex flex-col items-center justify-center gap-4">
              <p className="text-muted-foreground text-sm">
                No recent notes found.
              </p>
              <Button
                variant="outline"
                onClick={handleCreateNote}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create your first note"
                )}
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
