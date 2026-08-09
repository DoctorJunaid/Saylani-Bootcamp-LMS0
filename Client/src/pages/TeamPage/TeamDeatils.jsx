import { useLocation, useNavigate } from "react-router-dom";


const TeamDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const team = location.state?.team;

  if (!team)
    return (
      <div className="p-[var(--spacing-xl)] text-[var(--color-text)]">
        <p>Team not found</p>
      </div>
    );

  const statusColor =
    team.status === "In Progress"
      ? "var(--color-primary)"
      : team.status === "Under Review"
      ? "var(--color-success)"
      : "var(--color-text-muted)";

  return (
    <div className="p-[var(--spacing-xl)] bg-[var(--color-background)] min-h-screen">

      {/* Header */}
      <h2 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-[var(--color-text)] mb-[var(--spacing-lg)]">
        {team.teamName}
      </h2>

      <div className="grid grid-cols-2 gap-[var(--spacing-lg)]">

        {/* Team Members */}
        <div className="bg-[var(--color-surface)] p-[var(--spacing-md)] rounded-[var(--radius-xl)] border border-[var(--color-border)]">
          <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] mb-[var(--spacing-md)]">
            Team Members
          </h3>

          {team.members?.map((m, i) => {
            const isStringMember = typeof m === "string";
            const avatarSrc = isStringMember ? m : m.img;
            const memberName = isStringMember ? `Member ${i + 1}` : m.name;

            return (
              <div key={i} className="flex items-center justify-between mb-[var(--spacing-sm)] bg-[var(--color-surface-low)] p-[var(--spacing-sm)] rounded-[var(--radius-md)]">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <img
                    src={avatarSrc}
                    alt={memberName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{memberName}</span>
                </div>

                <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                  ID-{100000 + i}
                </span>
              </div>
            );
          })}
        </div>

        {/* Project Info */}
        <div className="bg-[var(--color-surface)] p-[var(--spacing-md)] rounded-[var(--radius-xl)] border border-[var(--color-border)]">
          <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] mb-[var(--spacing-sm)]">
            Assigned Project
          </h3>

          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)]">
            {team.project || team.title}
          </h2>

          <p className="text-[var(--color-text-muted)] mt-[var(--spacing-xs)]">
            {team.description || "No project description available."}
          </p>

          <div className="mt-[var(--spacing-md)] flex items-center gap-[var(--spacing-sm)]">
            <span>Deadline:</span>
            <span>{team.deadline}</span>
            <span className="px-[var(--spacing-sm)] py-[2px] rounded-[var(--radius-md)] bg-[var(--color-surface-low)]">
              {team.status}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeamDetails;