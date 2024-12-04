import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TodoComponent = ({ content, id, completed, refresh, expanded }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (refresh) navigate(0);
  };

  const handleDelete = () => {
    fetch("http://localhost:8080/todo", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ID: parseInt(id) }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Todo deleted");
          if (refresh) navigate(0);
        } else {
          toast.error("Failed to delete todo");
        }
      })
      .catch((e) => console.log("Error deleting todo", e));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-4 w-5 h-5 accent-yellow-400"
          checked={isChecked}
          onChange={() => {
            handleCheckboxChange();
            fetch(`http://localhost:8080/todo/${id}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => console.log(res.status))
              .catch((e) => console.log("Failed to update todo", e));
          }}
        />
        <h3
          className={`text-xl font-semibold ${
            isChecked ? "line-through text-neutral-500" : "text-neutral-800"
          }`}
        >
          {content}
        </h3>
      </div>
      {expanded && (
        <button
          onClick={handleDelete}
          className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default TodoComponent;
