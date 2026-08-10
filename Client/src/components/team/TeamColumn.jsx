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