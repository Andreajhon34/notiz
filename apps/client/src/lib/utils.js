import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateUniqueTitle = (notes, title) => {
  const baseTitle = title.replace(/-\d+$/, "").trim();

  let counter = 1;
  let newTitle = `${baseTitle}-${counter}`;

  while (notes.some((note) => note.title === newTitle)) {
    counter++;
    newTitle = `${baseTitle}-${counter}`;
  }

  return newTitle;
};
