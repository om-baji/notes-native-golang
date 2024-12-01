import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useRecoilState } from "recoil";
import { emailState, passwordState } from "../store/inputAtom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center gap-4 items-center h-screen bg-neutral-100">
        <span>Welcome back!</span>

        <input
          placeholder="someone@abc.com"
          className="p-2 rounded-md w-[50%]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="******"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md w-[50%]"
        />

        <button
          onClick={onSubmit}
          className="p-2 rounded-md w-[50%] bg-neutral-900 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {isError && (
          <span className="text-red-500">Error: {error.message}</span>
        )}

        {/* <span>
          <Link>
            New to notesnative?{" "}
            <span className="bg-black underline">Register</span>
          </Link>
        </span> */}
      </div>

      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <div className="text-center text-white p-6 max-w-lg">
          <div className="text-3xl font-bold mb-4 text-white">Notes Native</div>
          <p className="text-lg text-gray-300 leading-relaxed">
            "Your go-to app for managing notes and to-dos, keeping everything
            organized and accessible in one place. Simplify your workflow
            today."
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
