import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { contentState, titleState } from "../store/inputAtom";
import SideBar from "../components/SideBar";

const Note = () => {
  const [params] = useSearchParams();
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);
  const [isEditing, setIsEditing] = useState(false);

  const ID = params.get("id");

  const { isLoading, error, isError } = useQuery({
    queryKey: ["viewNote", ID],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/note?id=${ID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch!");
      }

      const { note } = await response.json();

      setTitle(note.Title);
      setContent(note.Content);

      return note;
    },
  });

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <span className="text-neutral-700 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <span className="text-red-500 text-lg font-semibold">
          Error: {error.message}
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[18%_1fr] min-h-screen">
      <SideBar />
      <div className="flex flex-col p-10 bg-gray-200 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neutral-800">
            {isEditing ? "Edit Note" : "Note Details"}
          </h2>
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "View" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div className="w-full h-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-6 rounded-md text-4xl font-semibold text-neutral-800 mb-4 focus:outline-none"
              placeholder="Enter title..."
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[calc(100vh-200px)] p-6 rounded-md text-lg text-neutral-700 resize-none focus:outline-none"
              placeholder="Write your note..."
            />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h3>
            <p className="text-lg text-neutral-700">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
