import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState, nameState, passwordState } from "../store/inputAtom";
import { SignUpSchema } from "../utils/models";

const SignupPage = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [name, setName] = useRecoilState(nameState);

  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async () => {
      const { success} = SignUpSchema.safeParse({ name,email, password });
  
      if (!success) {
        throw new Error("Invalid Inputs");
      }

      const response = await fetch(`${api}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      return response.json();
    },
    onSuccess: () => {
      // console.log("Login successful:", data);
      navigate("/home");
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
        <span>Create your account to get started!</span>

        <input
          placeholder="someone"
          className="p-2 rounded-md w-[50%]"
          onChange={(e) => setName(e.target.value)}
        />

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
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        {isError && (
          <span className="text-red-500">Error: {error.message}</span>
        )}

        <Link to={"/signin"} className="text-sm">
          <span className="text-gray-500">Already have an acccount?</span>{" "}
          <u>Login</u>
        </Link>
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

export default SignupPage;
