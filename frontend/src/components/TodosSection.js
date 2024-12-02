import React from "react";

const TodosSection = () => {
  return (
    <div className="flex flex-col p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-neutral-800">Todos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <h3 className="text-xl font-semibold text-neutral-800">
            Todo Item 1
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Complete the project proposal by Monday.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <h3 className="text-xl font-semibold text-neutral-800">
            Todo Item 2
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Prepare for the team presentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodosSection;
