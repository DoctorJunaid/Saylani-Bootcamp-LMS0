// import { useNavigate } from "react-router-dom";
// import StatusBadge from "./StatusBadge";
// function formatDeadline(isoDate) {
//   if (!isoDate) return "No deadline set";

//   const date = new Date(isoDate);
//   if (Number.isNaN(date.getTime())) return isoDate; // already-formatted fallback

//   return new Intl.DateTimeFormat("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   }).format(date);
// }

// export default function TeamCard({ team, onViewTeam }) {
//   const { id, _id, name, memberCount, members, status, project, projects } = team;
//   const teamId = _id || id;
//   const count = memberCount ?? (members?.length || 0);

//   // Grab the first project to show in the card, similar to the mock logic
//   const displayProject = project || (projects && projects.length > 0 ? projects[0] : null);

//   return (
//     <div className="bg-surface border border-border rounded-xl shadow-md p-lg flex flex-col justify-between">
//       <div>
//         {/* Header: Team name + status */}
//         <div className="flex items-start justify-between gap-sm">
//           <h3 className="ttext-base font-bold text-text ">{name}</h3>
//           <StatusBadge status={status} />
//         </div>

//         {/* Member count */}
//         <p className="text-sm text-text-muted mt-xs">
//           {count} {count === 1 ? "member" : "members"}
//         </p>

//         {/* Project info box */}
//         <div className="mt-md rounded-2xl border border-gray-200 bg-surface-low px-lg py-md">
//         <h3 className="text-[19px] font-medium text-text leading-5">
//           {displayProject?.title ?? "No Project Assigned"}
//         </h3>

//           <p className="mt-1 text-[15px] font-normal text-text-muted">
//           Deadline{" "}
//           {formatDeadline(
//             displayProject?.dueDate || displayProject?.deadline
//           )}
//         </p>
//       </div>
//       </div>

//       {/* Action */}
//       <button
//         type="button"
//         onClick={() => onViewTeam?.(teamId)}
//         className="inline-flex items-center gap-1 text-[#0284c7] font-semibold text-sm mt-4 self-start hover:underline transition-colors"
//       >
//         View team
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M5 12h14" />
//           <path d="m12 5 7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// }

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
  const { id, _id, name, memberCount, members, status, project, projects } = team;
  const teamId = _id || id;
  const count = memberCount ?? (members?.length || 0);

  // Grab the first project to show in the card, similar to the mock logic
  const displayProject = project || (projects && projects.length > 0 ? projects[0] : null);

  return (
    <div
      className="group bg-surface border border-border border-l-5 border-l-primary rounded-xl shadow-sm hover:shadow-md transition-all duration-normal p-lg flex flex-col justify-between h-full"
    >
      <div>
        {/* Header: Team name + status */}
        <div className="flex items-start justify-between gap-sm">
          <h3 className="text-1xl font-semibold font-weight-semibold text-text leading-snug">
            {name}
          </h3>
          <StatusBadge status={status} />
        </div>

        {/* Member count */}
        <div className="flex items-center gap-xs text-text-muted mt-xs">
          <UsersIcon />
          <p className="text-sm">
            {count} {count === 1 ? "member" : "members"}
          </p>
        </div>

        {/* Project info box */}
        <div className="bg-surface-low border border-border rounded-lg p-md mt-md">
          <p className="text-base font-weight-medium text-text truncate">
            {displayProject?.title ?? "No project assigned"}
          </p>
          <div className="flex items-center gap-xs text-text-muted mt-xs">
            <CalendarIcon />
            <p className="text-sm">
              Deadline {formatDeadline(displayProject?.dueDate || displayProject?.deadline)}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={() => onViewTeam?.(teamId)}
        className="inline-flex items-center gap-xs text-primary font-weight-medium text-sm mt-lg self-start hover:underline transition-colors duration-fast"
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