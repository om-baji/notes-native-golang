import React from "react";
import { Link } from "react-router-dom";

const App = () => {
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
        src="https://i0.wp.com/engineeringexpectations.com/wp-content/uploads/2020/10/notebook-and-pen.jpg?fit=768%2C512&ssl=1" />
      </div>
    </div>
  );
};

export default App;
