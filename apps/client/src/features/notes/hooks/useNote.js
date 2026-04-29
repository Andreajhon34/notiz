import { useEffect, useState } from "react";
import useNotesStore from "../../../lib/useNotesStore";
import privateApi from "../../../lib/axios/privateApi";

const useNote = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const replaceNote = useNotesStore((state) => state.replaceNote);

  useEffect(() => {
    const controller = new AbortController();

    const initNote = async () => {
      setData(null);
      setIsLoading(true);

      try {
        const res = await privateApi.get(`/notes/${id}`, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          const data = res.data["data"];
          setData(data);
          replaceNote(data.id, {
            id: data.id,
            title: data.title,
            updated_at: data.updated_at,
            created_at: data.created_at,
          });
        }
      } catch (err) {
        setData(null);
        console.error(err);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    initNote();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    isLoading,
    data,
  };
};

export default useNote;
