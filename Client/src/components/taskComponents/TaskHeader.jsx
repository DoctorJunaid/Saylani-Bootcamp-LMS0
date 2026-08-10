import React from "react";
import { LuList, LuCalendar, LuPlus } from "react-icons/lu";
import Button from "../Button";

const TaskHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-lg">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Tasks & Assignments
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-xs">
          Manage curriculum updates and cohort tasks.
        </p>
      </div>

      <div className="flex items-center gap-md">
        {/* Toggle View */}
        <div className="flex items-center bg-[var(--color-surface-low)] rounded-md p-1 border border-[var(--color-border)]">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-sm)]">
            <LuList className="h-4 w-4" />
            List
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
            <LuCalendar className="h-4 w-4" />
            Timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
