import TeamCard from "./TeamCard";

const TeamColumn = ({ title, count, teams }) => {

  const getColor = () => {
    if (title === "IN PROGRESS") return "#004AC6";
    if (title === "UNDER REVIEW") return "#16A34A";
    return "#9CA3AF"; // NOT STARTED
  };

  return (
    <div className="-[952px] h-[323px] bg-[#F8FAFC] flex flex-col"> 

      {/* 🔥 Header with Dot */}
      <div className="flex items-center gap-2 mb-4">
        
        {/* Dot */}
        <span
          className="w-[8px] h-[8px] rounded-full"
          style={{ backgroundColor: getColor() }}
        ></span>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-700">
          {title}
        </h2>

        {/* Count */}
        <span className="text-xs text-gray-400">
          ({count})
        </span>

      </div>

      {/* Cards */}
      <div className="space-y-4">
        {teams.map((team, index) => (
          <TeamCard key={index} {...team} />
        ))}
      </div>

    </div>  
  );
};

export default TeamColumn;