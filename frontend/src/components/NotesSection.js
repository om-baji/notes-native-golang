import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilState } from "recoil";
import { noteState } from "../store/NotesAtom";
import NoteComponent from "./NoteComponent";

const NotesSection = () => {
  const [notes, setNotes] = useRecoilState(noteState);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/notes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to retrieve notes");
      }
  
      const data = await response.json();
      // console.log(data.notes[0]);
      setNotes(data.notes)
      return data;
    },
    throwOnError : (err) => {
      console.error(err)
    }
  });

  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-neutral-700 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500 text-lg font-semibold">
          Error: {error.message}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 bg-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-neutral-800">Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div
            key={note.ID}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <NoteComponent title={note.Title} content={note.Content} id={note.ID}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
