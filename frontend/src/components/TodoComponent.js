import React, { useState } from "react";

const TodoComponent = ({ content, id , completed}) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="mr-4 w-5 h-5 accent-yellow-400"
        checked={isChecked}
        onChange={() => {
            handleCheckboxChange()
            fetch(`http://localhost:8080/todo/${id}`,{
                method : "PUT",
                credentials : "include",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => console.log(res.status))
                .catch((e) => console.log("Failed to update todo",e))
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
  );
};

export default TodoComponent;
