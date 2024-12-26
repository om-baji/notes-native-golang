import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../config";

const SideBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todoInput, setTodoInput] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setIsDropdownOpen(false);
    option === "Notes" ? navigate("/addNote") : toggleDialog();
  };

  const handleAddTodo = async () => {
    const response = await fetch(`${api}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: todoInput }),
    });

    if (!response.ok) {
      toast.error("Something went wrong!");
    } else {
      toast.success("Todo added");
      toggleDialog();
      navigate(0);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="w-full text-end top-4 left-4 z-50 bg-yellow-400 shadow-md text-neutral-900 p-3 rounded md:hidden"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64`}
      >
        <div className="flex flex-col justify-between items-center py-8 px-4 h-full">
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

          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Add Todo</h2>
                <input
                  type="text"
                  placeholder="Enter todo..."
                  onChange={(e) => setTodoInput(e.target.value)}
                  className="bg-inherit p-2 border border-gray-600 rounded mb-4 w-full"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleAddTodo}
                    className="text-black bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 transition-all"
                  >
                    + Todo
                  </button>
                  <button
                    onClick={toggleDialog}
                    className="ml-2 text-gray-300 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="relative w-full">
            {isDropdownOpen && (
              <div className="absolute left-0 bottom-full w-full mb-2 bg-neutral-800 rounded-lg shadow-lg">
                <button
                  onClick={() => handleOptionClick("Todos")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-yellow-500 transition-all"
                >
                  Todos
                </button>
                <button
                  onClick={() => handleOptionClick("Notes")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-yellow-500 transition-all"
                >
                  Notes
                </button>
              </div>
            )}
            <button
              onClick={toggleDropdown}
              className="w-full bg-yellow-400 text-neutral-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all"
            >
              + Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
