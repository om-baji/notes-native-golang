import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-neutral-900 text-white py-8 px-4">
      <div className="w-full text-center space-y-6">
        <h1 className="text-3xl font-extrabold">Notes Native</h1>
        <nav className="flex flex-col space-y-4">
          <a
            href="/home"
            className="text-base font-medium hover:text-yellow-400 transition-all"
          >
            Dashboard
          </a>
          <a
            href="/todos"
            className="text-base font-medium hover:text-yellow-400 transition-all"
          >
            Todos
          </a>
          <a
            href="/notes"
            className="text-base font-medium hover:text-yellow-400 transition-all"
          >
            Notes
          </a>
        </nav>
      </div>
      <button className="w-full bg-yellow-400 text-neutral-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all">
        + Add Item
      </button>
    </div>
  );
};

export default SideBar;
