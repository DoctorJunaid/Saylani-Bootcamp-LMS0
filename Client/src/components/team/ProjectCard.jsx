// import StatusBadge from "./StatusBadge";
// function ProgressBar({ value }) {
//   return (
//     <div className="w-full bg-[var(--color-surface-high)] rounded-full h-1.5 mt-1 overflow-hidden">
//       <div 
//         className="h-1.5 rounded-full bg-[var(--color-primary)] transition-all duration-500" 
//         style={{ width: `${Math.min(Math.max(value || 0, 0), 100)}%` }}
//       ></div>
//     </div>
//   );
// }

// function formatDeadline(isoDate) {
//   if (!isoDate) return "No deadline set";

//   const date = new Date(isoDate);
//   if (Number.isNaN(date.getTime())) return isoDate;

//   return new Intl.DateTimeFormat("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   }).format(date);
// }

// export default function ProjectCard({ project, onRefresh }) {
//   const { title, description, deadline, status, progress } = project;

//   return (
//     <div className="bg-surface-low border border-border rounded-lg p-md">
//       <div className="flex items-start justify-between gap-sm">
//         <h4 className="text-base font-weight-semibold text-text">{title}</h4>
//         <StatusBadge status={status} />
//       </div>

//       {description && (
//         <p className="text-sm text-text-muted mt-xs">{description}</p>
//       )}

//       <p className="text-sm text-text-muted mt-sm">
//         Deadline {formatDeadline(deadline)}
//       </p>

//       <div className="mt-md">
//         <ProgressBar value={progress} />
//       </div>
//     </div>
//   );
// }










import StatusBadge from "../../components/team/StatusBadge";

function formatDeadline(isoDate) {
  if (!isoDate) return "No deadline set";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-CA").format(date); // "2026-08-18" style, jaisa image me tha
}

function EyeIcon() {
  return (
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PencilIcon() {
  return (
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
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
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
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

/**
 * ProjectCard
 * ---------------------------------------------------------------
 * Ab yeh ek asli table row (`<tr>`) hai — isko `<table><tbody>`
 * ke andar use karna hai (neeche ProjectsPage.jsx me example hai).
 *
 * Data props same hain, kuch nahi badla:
 *   project = { title, description, deadline, status, progress }
 *   onRefresh — jaisa tha waisa hi accept hota hai
 *
 * `teamName` ek naya OPTIONAL prop hai — sirf "TEAM" column
 * dikhane ke liye (image me yeh column tha). Agar aap pass nahi
 * karenge to "—" dikhega, jaisa image ki pehli row me tha.
 *
 * `onView` / `onEdit` / `onDelete` — UI-only action buttons hain,
 * koi backend call yahan invent nahi ki gayi. Apne existing
 * update/delete handlers inhe pass kar dein.
 */
export default function ProjectCard({
  project,
  teamName,
  onRefresh,
  onView,
  onEdit,
  onDelete,
}) {
  const { title, description, deadline, status } = project;

  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-surface-low transition-colors duration-fast">
      <td className="py-md pl-lg pr-md align-top ">
        <p className="text-sm font-bold text-text">{title}</p>
        {description && (
          <p className="text-xs text-text-muted mt-xs">{description}</p>
        )}
      </td>

      <td className="py-md pr-md align-top text-sm text-text-muted">
        {teamName ?? project.team?.name ?? project.teamName ?? "—"}
      </td>

      <td className="py-md pr-md align-top">
        <StatusBadge status={status} />
      </td>

      <td className="py-md pr-md align-top text-sm text-text-muted">
        {formatDeadline(deadline)}
      </td>

      <td className="py-md pr-lg align-top">
        <div className="flex items-center gap-md">
          <button
            type="button"
            onClick={() => onView?.(project)}
            aria-label="View project"
            className="text-text-muted hover:opacity-70 transition-opacity duration-fast"
          >
            <EyeIcon />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(project)}
            aria-label="Edit project"
            className="text-primary hover:opacity-70 transition-opacity duration-fast"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(project)}
            aria-label="Delete project"
            className="text-error hover:opacity-70 transition-opacity duration-fast"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}