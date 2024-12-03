import React from "react";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NoteComponent = ({ title, content, id, expanded }) => {
  const handleDelete = async (ev) => {
    ev.stopPropagation();
    try {
      const response = await fetch("http://localhost:8080/notes", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: id }),
      });

      if (!response.ok) throw new Error("Something went wrong~");

     
      toast.success("Deleted successfully!");
      navigate("/notes", { replace : "true"});
    } catch (error) {
      toast.error("Something went wrong!!");
      console.warn(error);
    }
  };

  const navigate = useNavigate();
  if (!expanded) {
    return (
      <div onClick={() => navigate(`/note?id=${id}`)}>
        <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{content}</p>
      </div>
    );
  }

  return (
    <div onClick={() => navigate(`/note?id=${id}`)}>
      <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{content}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteComponent;
