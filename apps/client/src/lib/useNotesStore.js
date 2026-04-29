import { create } from "zustand";

const useNotesStore = create((set, get) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  updateNoteTitle: (id, newTitle) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note,
      ),
    })),
  updateNoteContent: (id, newContent) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note,
      ),
    })),
  updateNoteCreatedDate: (id, newDate) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, created_at: newDate } : note,
      ),
    })),

  updateNoteUpdatedDate: (id, newDate) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, updated_at: newDate } : note,
      ),
    })),
  addNote: (newNote) =>
    set((state) => ({
      notes: [...state.notes, newNote],
    })),
  replaceNote: (id, newNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...newNote, id } : note,
      ),
    })),
  getNote: (id) => {
    const notes = get().notes;
    return notes.find((note) => note.id === id);
  },
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));

export default useNotesStore;
