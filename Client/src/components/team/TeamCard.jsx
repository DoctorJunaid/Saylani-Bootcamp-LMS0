import { useNavigate } from "react-router-dom";

const TeamCard = ({
  id,
  teamName,
  title,
  sprint,
  deadline,
  progress,
  status,
  members,
  projects,
  completedProjects,
  totalProjects,
}) => {
  const navigate = useNavigate();
  const memberCount = Array.isArray(members)
    ? members.length
    : typeof members === "number"
    ? members
    : 0;

  const getStatusStyles = () => {
    if (status === "Completed") {
      return "bg-[#e3f6ed] text-[#27ab6e] border border-[#c6eedb]";
    }
    if (status === "In Progress") {
      return "bg-[#e0f2fe] text-[var(--color-primary)] border border-[#bae6fd]";
    }
    if (status === "Under Review") {
      return "bg-[#fef3c7] text-[var(--color-warning)] border border-[#fde68a]";
    }
    return "bg-[#e8eef3] text-[#758494] border border-[#d0dbe5]";
  };

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-[var(--spacing-md)] flex flex-col justify-between gap-[var(--spacing-sm)] shadow-sm">
      {/* Top Header: Team Name & Status Pill */}
      <div>
        <div className="flex items-center justify-between gap-[var(--spacing-xs)]">
          <h3 className="text-[var(--text-lg)] font-[var(--font-weight-bold)] text-[var(--color-text)]">
            {teamName || "Team Alpha"}
          </h3>
          {status && (
            <span
              className={`px-[var(--spacing-sm)] py-[2px] rounded-[var(--radius-full)] text-[var(--text-xs)] font-[var(--font-weight-medium)] ${getStatusStyles()}`}
            >
              {status}
            </span>
          )}
        </div>
        {/* Subheader: Member Count */}
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[2px]">
          {memberCount} members
        </p>
      </div>

      {/* Middle Box: Project Title & Deadline */}
      <div className="bg-[var(--color-surface-low)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[var(--spacing-md)] my-[var(--spacing-xs)]">
        <h4 className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h4>
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[2px]">
          Deadline {deadline}
        </p>
      </div>

      {/* Bottom Action: View team link */}
      <div>
        <button
          onClick={() =>
            navigate(`/team/${id}`, {
              state: {
                team: {
                  id,
                  teamName,
                  title,
                  sprint,
                  deadline,
                  progress,
                  status,
                  members,
                  projects,
                  completedProjects,
                  totalProjects,
                },
              },
            })
          }
          className="flex items-center gap-[var(--spacing-xs)] text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-primary)] hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent p-0"
        >
          <span>View team</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TeamCard;