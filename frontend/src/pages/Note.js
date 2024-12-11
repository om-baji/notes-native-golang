import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import api from "../config";

const Note = () => {
  const [params] = useSearchParams();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const ID = params.get("id");

  const { isLoading, error, isError } = useQuery({
    queryKey: ["viewNote", ID],
    queryFn: async () => {
      const response = await fetch(`${api}/note?id=${ID}`, {
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

  const handleSave = async () => {
    try {
      const res = await fetch(`${api}/notes`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, ID: parseInt(ID) }),
      });

      if (!res.ok) throw new Error("Failed to save changes!");

      toast.success("Changes Saved!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <span className="text-neutral-700 text-lg font-semibold">
          Loading...
        </span>
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
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 mb-4 text-xl font-semibold text-neutral-800 border rounded-md shadow-sm focus:outline-none border-none "
                placeholder="Enter title..."
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[60vh] p-4 text-lg text-neutral-700 border rounded-md shadow-sm resize-none focus:outline-none border-none "
                placeholder="Write your note..."
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                {title}
              </h3>
              <p className="text-lg text-neutral-700">{content}</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default Note;
