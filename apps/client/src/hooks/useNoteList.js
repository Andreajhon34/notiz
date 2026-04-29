import { useEffect, useState } from "react";
import useNotesStore from "../lib/useNotesStore";
import privateApi from "../lib/axios/privateApi";

const useNoteList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const setNotes = useNotesStore((state) => state.setNotes);

  useEffect(() => {
    const controller = new AbortController();

    const initNote = async () => {
      setIsLoading(true);
      setData(true);

      try {
        const res = await privateApi.get("/notes", {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          const data = res.data["data"];
          setData(res.data["data"]);
          setNotes(
            data.map(({ id, title, updated_at, created_at }) => ({
              id,
              title,
              updated_at,
              created_at,
            })),
          );
        }
      } catch (err) {
        console.error(err);
        setData({});
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
  }, []);

  return {
    isLoading,
    data,
  };
};

export default useNoteList;
