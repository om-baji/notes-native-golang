import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type Note = {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  content: string;
  email: string;
};

export function useNote() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const setNote = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    setIsPending(true);
    try {
      const response = await axiosInstance.post("/notes", {
        title,
        content,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsPending(false);
    }
  };

  const getNotes = useCallback(async () => {
    setIsPending(true);
    try {
      const response = await axiosInstance.get("/notes");

      const fetchNotes = response.data.notes;
      setNotes(fetchNotes);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsPending(true);
    }
  }, []);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return { isPending, error, notes, setNote };
}
