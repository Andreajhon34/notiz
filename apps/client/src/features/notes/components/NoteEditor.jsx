import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useShallow } from "zustand/shallow";
import privateApi from "../../../lib/axios/privateApi";
import useNotesStore from "../../../lib/useNotesStore";
import { useTheme } from "../../../components/themeProvider";

const Editor = ({ editor, onChange, onBlur, onKeyDown, onKeyUp }) => {
  const { theme } = useTheme();

  return (
    <BlockNoteView
      onBlur={onBlur}
      editor={editor}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      theme={theme}
      shadCNComponents={{}}
      className="w-full [&_.bn-editor]:px-0!"
    />
  );
};

export const NoteEditor = ({ initialContent, initialTitle, id }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const [showEditor, setShowEditor] = useState(() => {
    if (!initialContent) return false;
    try {
      const parsed = JSON.parse(initialContent);
      return parsed.length > 0 && parsed.some((b) => b.content?.length > 0);
    } catch {
      return false;
    }
  });

  const handleContentChange = () => {
    const jsonDocument = JSON.stringify(editor.document);
    setContent(jsonDocument);

    debouncedAutosave(initialTitle, jsonDocument);
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  const { updateNoteTitle, updateNoteUpdatedDate } = useNotesStore(
    useShallow((state) => ({
      updateNoteTitle: state.updateNoteTitle,
      updateNoteUpdatedDate: state.updateNoteUpdatedDate,
    })),
  );

  const debouncedAutosave = useDebouncedCallback(
    async (newTitle, newContent) => {
      try {
        const res = await privateApi.put(`/notes/${id}`, {
          title: newTitle,
          content: newContent,
        });
        const { id: noteId, updated_at } = res.data["data"];
        updateNoteUpdatedDate(noteId, updated_at);
      } catch {}
    },
    1000,
  );

  const titleRef = useRef(null);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNoteTitle(id, newTitle);
    debouncedAutosave(newTitle, content);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      setShowEditor(true);

      setTimeout(() => {
        editor.focus();
      }, 0);
    }
  };

  // const handleEditorBlur = () => {
  //   if (
  //     editor.document.length === 1 &&
  //     editor.document[0].content.length === 0
  //   ) {
  //     setShowEditor(false);
  //   }
  // };

  const handleKeyDown = (e) => {
    const pos = editor.getTextCursorPosition();
    if (!pos) return;

    const firstBlock = editor.document[0];
    const isFirstBlock = pos.block.id === firstBlock?.id;
    const isAtStartOfBlock = pos.prevChar === undefined;
    const isBlockEmpty = firstBlock.content.length === 0;

    if (isFirstBlock) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setShowEditor(false);
        setTimeout(() => titleRef.current?.focus(), 0);
        return;
      }

      if (e.key === "Backspace" && isAtStartOfBlock && isBlockEmpty) {
        e.preventDefault();
        setShowEditor(false);
        setTimeout(() => titleRef.current?.focus(), 0);
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Backspace") {
      const firstBlock = editor.document[0];

      if (editor.document.length === 1 && firstBlock?.content.length === 0) {
        setShowEditor(false);
        setTimeout(() => titleRef.current?.focus(), 0);
      }
    }
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="titleArea" className="sr-only">
          Title
        </FieldLabel>
        <Textarea
          ref={titleRef}
          id="titleArea"
          value={title}
          placeholder="New Page"
          onChange={handleTitleChange}
          className="font-semibold text-5xl"
          onKeyDown={handleTitleKeyDown}
        />
      </Field>
      {showEditor && (
        <Editor
          // onBlur={handleEditorBlur}
          editor={editor}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      )}
    </>
  );
};
