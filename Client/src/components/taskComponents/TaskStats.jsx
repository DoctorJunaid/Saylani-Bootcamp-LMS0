import React from "react";
import {
  LuClipboardList,
  LuCircleAlert,
  LuMessageCircleMore,
  LuCircleCheck,
  LuArrowUp,
} from "react-icons/lu";

const StatCard = ({
  title,
  value,
  icon,
  badge,
  badgeColor = "text-[var(--color-success)]",
}) => {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-md flex flex-col gap-2 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wider uppercase">
          {title}
        </span>
        <div className="text-[var(--color-text-muted)]">{icon}</div>
      </div>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-3xl font-bold text-[var(--color-text)]">
          {value}
        </span>
        {badge && (
          <span
            className={`text-sm font-semibold flex items-center mb-1 ${badgeColor}`}
          >
            <LuArrowUp className="h-3 w-3 mr-0.5" />
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

const TaskStats = ({ totalTasks = 0, inProgress = 0, completed = 0 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        icon={<LuClipboardList className="h-5 w-5" />}
      />
      <StatCard
        title="In Progress"
        value={inProgress}
        icon={
          <LuMessageCircleMore className="h-5 w-5 text-[var(--color-warning)]" />
        }
      />
      <StatCard
        title="Completed"
        value={completed}
        icon={<LuCircleCheck className="h-5 w-5 text-[var(--color-success)]" />}
      />
    </div>
  );
};

export default TaskStats;
