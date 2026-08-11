import StatusBadge from "./StatusBadge";
function ProgressBar({ value }) {
  return (
    <div className="w-full bg-[var(--color-surface-high)] rounded-full h-1.5 mt-1 overflow-hidden">
      <div 
        className="h-1.5 rounded-full bg-[var(--color-primary)] transition-all duration-500" 
        style={{ width: `${Math.min(Math.max(value || 0, 0), 100)}%` }}
      ></div>
    </div>
  );
}
/**
 * ProjectCard
 * ---------------------------------------------------------------
 * Ek single project ki full details — TeamDetails page ke
 * "Projects" section me list ke andar use hota hai.
 *
 * Props:
 *  - project: {
 *      id, title, description, deadline, status, progress
 *    }
 */

function formatDeadline(isoDate) {
  if (!isoDate) return "No deadline set";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ProjectCard({ project }) {
  const { title, description, deadline, status, progress } = project;

  return (
    <div className="bg-surface-low border border-border rounded-lg p-md">
      <div className="flex items-start justify-between gap-sm">
        <h4 className="text-base font-weight-semibold text-text">{title}</h4>
        <StatusBadge status={status} />
      </div>

      {description && (
        <p className="text-sm text-text-muted mt-xs">{description}</p>
      )}

      <p className="text-sm text-text-muted mt-sm">
        Deadline {formatDeadline(deadline)}
      </p>

      <div className="mt-md">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}