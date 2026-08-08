import TeamCard from "./TeamCard";
const TeamColumn = ({ title, count, teams }) => {


const getColor = () => {
  if (title === "IN PROGRESS") return "var(--color-primary)";
  if (title === "UNDER REVIEW") return "var(--color-success)";
  return "var(--color-text-muted)"; // NOT STARTED
};

  return (
    <div>

      {/* 🔥 Header with Dot */}
      <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
        
        {/* Dot */}
        <span
          className="w-[8px] h-[8px] rounded-full"
          style={{ backgroundColor: getColor() }}
        ></span>

        {/* Title */}
        <h2 className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
          {title}
        </h2>

        {/* Count */}
        <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
          ({count})
        </span>

      </div>

      {/* Cards */}
      <div className="flex flex-col gap-[var(--spacing-md)]">
        {teams?.map((team, index) => (
          <TeamCard key={index} {...team} />
        ))}
      </div>

    </div>
  );
};

export default TeamColumn;