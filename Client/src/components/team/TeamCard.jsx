import ProgressBar from "./ProgressBar";
const TeamCard = ({ title, sprint, progress, status, members }) => {

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

      {/* Title */}
      <h3 className="text-[var(--text-lg)] leading-[25px] font-[var(--font-weight-semibold)] text-[var(--color-text)]">
        {title}
      </h3>

     
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

        {/* Status */}
        <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
          {status}
        </span>

      </div>

    </div>
  );
};

export default TeamCard;