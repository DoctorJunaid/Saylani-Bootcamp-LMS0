import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

/**
 * TeamCard
 * ---------------------------------------------------------------
 * Ek single team ka card — jaisa screenshot me tha.
 *
 * Backend contract (expected shape of `team` prop):
 * {
 *   id: string,
 *   name: string,              // "Team Alpha"
 *   memberCount: number,       // 0
 *   status: "not_started" | "in_progress" | "completed",
 *   project: {
 *     title: string,           // "E-Commerce Platform"
 *     deadline: string         // ISO date string, e.g. "2026-09-15"
 *   }
 * }
 *
 * `onViewTeam` callback ko team.id ke saath call kiya jata hai —
 * isko aap router push, modal open, ya API call se hook kar sakte hain.
 */

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
  const { id, name, memberCount, status, project } = team;

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
          {memberCount} {memberCount === 1 ? "member" : "members"}
        </p>

        {/* Project info box */}
        <div className="bg-surface-low border border-border rounded-lg p-md mt-md">
          <p className="text-base font-weight-medium text-text">
            {project?.title ?? "No project assigned"}
          </p>
          <p className="text-sm text-text-muted mt-xs">
            Deadline {formatDeadline(project?.deadline)}
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={() => onViewTeam?.(id)}
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