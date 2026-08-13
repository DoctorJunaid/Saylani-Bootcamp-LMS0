import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
function formatDeadline(isoDate) {
  if (!isoDate) return "No deadline set";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate; // already-formatted fallback

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function TeamCard({ team, onViewTeam }) {
  const { id, _id, name, memberCount, members, status, project, projects } = team;
  const teamId = _id || id;
  const count = memberCount ?? (members?.length || 0);

  // Grab the first project to show in the card, similar to the mock logic
  const displayProject = project || (projects && projects.length > 0 ? projects[0] : null);

  return (
    <div className="bg-surface border border-border rounded-xl shadow-md p-lg flex flex-col justify-between">
      <div>
        {/* Header: Team name + status */}
        <div className="flex items-start justify-between gap-sm">
          <h3 className="text-xl font-weight-semibold text-text">{name}</h3>
          <StatusBadge status={status} />
        </div>

        {/* Member count */}
        <p className="text-sm text-text-muted mt-xs">
          {count} {count === 1 ? "member" : "members"}
        </p>

        {/* Project info box */}
        <div className="bg-surface-low border border-border rounded-lg p-md mt-md">
          <p className="text-base font-weight-medium text-text">
            {displayProject?.title ?? "No project assigned"}
          </p>
          <p className="text-sm text-text-muted mt-xs">
            Deadline {formatDeadline(displayProject?.dueDate || displayProject?.deadline)}
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={() => onViewTeam?.(teamId)}
        className="inline-flex items-center gap-1 text-[#0284c7] font-semibold text-sm mt-4 self-start hover:underline transition-colors"
      >
        View team
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}