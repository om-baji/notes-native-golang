import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type Todo = {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  content: string;
  completed: boolean;
  email: string;
};

export function useTodo() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const toggle = async (id: number) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/todo/${id}`);
      if (!response.data.success) throw new Error(response.data.message);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const setTodo = async (content: string) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/todos", {
        content,
      });
      if (!response.data.success) throw new Error(response.data.message);
      setTodos((prev) => [...prev, response.data.data]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const getTodos = useCallback(async () => {
    setIsPending(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/todos");
      if (!response.data.success) throw new Error(response.data.message);
      const fetchTodos = response.data.todos
      setTodos(fetchTodos);

      const filtered = todos.filter((todo) => todo.completed === false);
      const completed = todos.filter((todo) => todo.completed === true);
      setPendingTodos(filtered);
      setCompletedTodos(completed);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return {
    toggle,
    setTodo,
    getTodos,
    todos,
    isPending,
    error,
    pendingTodos,
    completedTodos,
  };
}
