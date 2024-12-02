import React from "react";
import SideBar from "../components/SideBar";
import TodosSection from "../components/TodosSection";
import NotesSection from "../components/NotesSection";

const LandingPage = () => {
  return (
    <div className="grid grid-cols-[18%_1fr_1fr] min-h-screen">
      <SideBar />

      <TodosSection />

      <NotesSection />
    </div>
  );
};

export default LandingPage;
