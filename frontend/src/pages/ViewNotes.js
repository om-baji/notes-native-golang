import React from "react";
import NotesSection from "../components/NotesSection";
import SideBar from "../components/SideBar";

const ViewNotes = () => {
  return (
    <div className="grid grid-cols-[18%_1fr] min-h-screen">
      <SideBar />
      <NotesSection expanded={true}/>
    </div>
  );
};

export default ViewNotes;
