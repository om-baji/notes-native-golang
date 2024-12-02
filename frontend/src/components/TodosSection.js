import React from "react";
import TodoComponent from "./TodoComponent";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { todoState } from "../store/TodoAtom";

const TodosSection = () => {
  const [todos, setTodos] = useRecoilState(todoState);

  const {isLoading,isError,error} = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/todos", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve notes");
      }

      const data = await response.json();
  
      setTodos(data.todos);
      return data;
    },
    throwOnError: (err) => {
      console.error(err);
    },
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
    <div className="flex flex-col p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-neutral-800">Todos</h2>
      <div className="grid grid-cols-1 gap-6">
        {(todos.length !== 0) && todos.map((todo) => {
          return (
            <div key={todo.ID}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow">
              <TodoComponent content={todo.Content} id={todo.ID} completed={todo.Completed}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodosSection;
