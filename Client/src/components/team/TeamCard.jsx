import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
const TeamCard = ({id, teamName, title, sprint, deadline, progress, status, members }) => {
const navigate = useNavigate();
const isInProgress = status === "In Progress";
const isReview = status === "Under Review";
const isNotStarted = status === "Not Started";

  return (
    <div
  className={`w-full h-auto p-[var(--spacing-md)] flex flex-col gap-[var(--spacing-sm)] 
  bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]
  ${isInProgress ? "border-l-[4px] border-l-[var(--color-primary)]" : ""}`}
    >

      {/* Sprint Tag */}
      <span className="bg-[var(--color-surface-low)] text-[var(--color-text-muted)] 
        text-[11px] leading-[14px] font-[var(--font-weight-semibold)] 
        px-[var(--spacing-xs)] py-[2px] rounded-[var(--radius-md)] 
        flex items-center justify-center w-fit">
        {sprint}
      </span>

         <p className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-muted)]">
            {teamName}
        </p>
      {/* Title */}
      <div className="bg-[var(--color-surface-low)] 
            border border-[var(--color-border)] 
            rounded-[var(--radius-lg)] 
            px-[var(--spacing-md)] py-[var(--spacing-sm)]">

          {/* Title */}
        <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[var(--color-text)]">
  {title}
</h3>

          {/* Deadline */}
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[2px]">
            Deadline {deadline}
          </p>

      </div>

     
      <div className={`${isNotStarted ? "invisible" : ""} mt-[var(--spacing-sm)]`}>
      <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[2px]">
        Progress
      </p>

      <ProgressBar
        progress={progress}
        color={isReview ? "success" : "primary"}
      />
    </div>


      {/* Bottom Section */}
      <div className="mt-[var(--spacing-md)] flex justify-between items-center">
        
        {/* Avatars */}
        <div className="flex -space-x-2">
          {members?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="user"
              className="w-6 h-6 rounded-full border-2 border-[var(--color-surface)]"
            />
          ))}
        </div>

       
        <button
         onClick={() => navigate(`/team/${id}`, { state: { team: { id, teamName, title, sprint, deadline, progress, status, members } } })}
         className="
          text-[var(--text-xs)] 
          font-[var(--font-weight-medium)]
          text-[var(--color-primary)] 
          border border-[var(--color-primary)]
          px-[var(--spacing-sm)] py-[2px]
          rounded-[var(--radius-md)]
          transition-all duration-[var(--duration-fast)]
          hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)]
        ">
          View Team
        </button>

      </div>

    </div>
  );
};

export default TeamCard;