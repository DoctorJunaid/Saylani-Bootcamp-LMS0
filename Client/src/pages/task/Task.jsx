import React from "react";
import TaskHeader from "../../components/taskComponents/TaskHeader";
// import TaskStats from "../../components/taskComponents/TaskStats";

const Task = () => {
  return (
    <div className="flex flex-col gap-lg bg-[var(--color-background)] min-h-screen p-md sm:p-lg">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-lg shadow-[var(--shadow-sm)] ring-4 ring-yellow-400">
        <h1>Tasks & Assignments</h1>
        <TaskHeader />
        {/* <TaskStats /> */}
      </div>
    </div>
  );
};

export default Task;
