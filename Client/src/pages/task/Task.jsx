import React from "react";
import TaskHeader from "../../components/taskComponents/TaskHeader";
import TaskStats from "../../components/taskComponents/TaskStats";
import TaskTable from "../../components/taskComponents/TaskTable";

const Task = () => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <TaskHeader />

      {/* Stats Cards */}
      <TaskStats />

      {/* Task List / Table Section (Inside reference bounding box) */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-sm)]">
        <TaskTable />
      </div>
    </div>
  );
};

export default Task;

