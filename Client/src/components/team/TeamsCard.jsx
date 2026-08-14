import StatusBadge from "./StatusBadge";
import {
  deriveTeamStatusFromProjects,
  getTeamProjects,
} from "./deriveTeamStatus";

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

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function TeamCard({ team, onViewTeam }) {
  const { id, _id, name, memberCount, members } = team;
  const teamId = _id || id;
  const count = memberCount ?? (members?.length || 0);
  const teamProjects = getTeamProjects(team);
  const derivedStatus = deriveTeamStatusFromProjects(teamProjects);
  const displayProject = teamProjects[0] ?? null;

  return (
    <div className="group flex h-full min-w-[260px] flex-col justify-between overflow-hidden rounded-xl border border-border border-l-[5px] border-l-primary bg-surface p-5 shadow-sm transition-all duration-normal hover:shadow-md">
      <div className="min-w-0">
        {/* Header: name + status on one line */}
        <div className="flex items-center justify-between gap-3 min-w-0">
          <h3 className="min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-text">
            {name}
          </h3>
          <StatusBadge status={derivedStatus} />
        </div>

        {/* Member count */}
        <div className="mt-2 flex items-center gap-1.5 text-text-muted min-w-0">
          <UsersIcon />
          <p className="truncate text-sm whitespace-nowrap">
            {count} {count === 1 ? "member" : "members"}
          </p>
        </div>

        {/* Project + deadline — single-line each */}
        <div className="mt-4 min-w-0 rounded-lg border border-border bg-surface-low px-4 py-3">
          <p
            className="truncate text-base font-medium text-text whitespace-nowrap"
            title={displayProject?.title ?? "No project assigned"}
          >
            {displayProject?.title ?? "No project assigned"}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-text-muted min-w-0">
            <CalendarIcon />
            <p
              className="truncate text-sm whitespace-nowrap"
              title={`Deadline ${formatDeadline(displayProject?.dueDate || displayProject?.deadline)}`}
            >
              Deadline{" "}
              {formatDeadline(
                displayProject?.dueDate || displayProject?.deadline,
              )}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewTeam?.(teamId)}
        className="mt-5 inline-flex cursor-pointer items-center gap-1 self-start text-sm font-medium text-primary transition-colors duration-fast hover:underline"
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
          className="transition-transform duration-fast group-hover:translate-x-0.5"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
