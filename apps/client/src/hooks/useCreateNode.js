import useNotesStore from "../lib/useNotesStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import privateApi from "../lib/axios/privateApi";
import { useNavigate } from "react-router-dom";
import { generateUniqueTitle } from "../lib/utils";
import { toast } from "sonner";

export default function useCreateNote() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { notes, addNote } = useNotesStore(
    useShallow((state) => ({
      notes: state.notes,
      addNote: state.addNote,
    })),
  );

  const handleCreateNote = async () => {
    setIsLoading(true);
    try {
      const newTitle = generateUniqueTitle(notes, "untitled");
      const res = await privateApi.post("/notes", {
        title: newTitle,
        content: "",
      });

      const { id, title, updated_at, created_at } = res.data["data"];
      addNote({ id, title, updated_at, created_at });
      navigate(`/notes/${id}`);
    } catch {
      toast.error("Failed to create note", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleCreateNote,
  };
}
