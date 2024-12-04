import React from "react";
import SideBar from "../components/SideBar";
import TodosSection from "../components/TodosSection";

const Todo = () => {
  return (
    <div className="grid grid-cols-[18%_1fr_1fr] min-h-screen">
      <SideBar />

      <TodosSection completed={false} refresh={true} expanded={true}/>
        
      <TodosSection completed={true} refresh={true} expanded={true}/>
    </div>
  );
};

export default Todo;
