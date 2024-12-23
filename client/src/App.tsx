import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen bg-neutral-900 px-8">
        <h1 className="text-white text-5xl font-extrabold mb-6 tracking-tight">
          Notes Native
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-md mb-8">
          A minimalistic and performant note-taking application built using Golang,
          designed to be fast, scalable, and developer-friendly.
        </p>
        <Link
          to={"/signup"}
          className="text-neutral-900 bg-zinc-400 hover:bg-blue-500 font-medium py-2 px-6 rounded-lg text-lg transition-all duration-200"
        >
          Get Started →
        </Link>
      </div>

      <div className="hidden md:block bg-zinc-100">
        <img alt="Loading"
          src="https://plus.unsplash.com/premium_photo-1683543124524-cbc52e793a02?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};

export default App;
