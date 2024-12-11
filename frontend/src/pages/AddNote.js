import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import api from "../config";

const AddNote = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch(`${api}/notes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Added succesfully!!");
      navigate("/notes")
      
    } catch (error) {
      toast.error("Something went wrong!");
      console.warn(error);
    }
  };

  return (
    <div className="grid grid-cols-[18%_1fr] min-h-screen">
      <SideBar />
      <div>

          <h2 className="text-3xl font-bold text-neutral-800 p-8">AddNote</h2>


        <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mb-4 text-xl font-semibold text-neutral-800 border rounded-md shadow-sm focus:outline-none border-none "
            placeholder="Enter title..."
          />
          <textarea
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
      </div>
    </div>
  );
};

export default AddNote;
