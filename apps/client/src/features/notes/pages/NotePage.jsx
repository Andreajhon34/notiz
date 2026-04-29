import { Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/ui/skeleton";
import { cn } from "../../../lib/utils";
import { NoteEditor } from "../components/NoteEditor";
import useNote from "../hooks/useNote";

export default function NotePage() {
  const { id } = useParams();
  const { isLoading, data } = useNote(id);

  return (
    <div
      className={cn("flex-1 flex flex-col px-35 pt-35", isLoading && "gap-5")}
    >
      {isLoading ? (
        <>
          <Skeleton className="w-full h-13" />
          <Skeleton className="w-full h-100" />
        </>
      ) : data ? (
        <NoteEditor
          key={id}
          initialContent={data?.content}
          initialTitle={data?.title}
          id={id}
        />
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
}
