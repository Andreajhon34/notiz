import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../src/components/ui/skeleton";
import useNote from "../hooks/useNote";
import { cn } from "../../../src/lib/utils";
import { NoteEditor } from "../components/NoteEditor";

export default function NotePage() {
  const { id } = useParams();
  const { isLoading, data } = useNote(id);

  return (
    <div className={cn("flex-1 flex flex-col px-35 pt-35")}>
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
