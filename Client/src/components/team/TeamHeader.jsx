const TeamHeader = () => {
  return (
    <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
      
      {/* Left Content */}
      <div>
        <h1 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-[var(--color-text)] leading-[36px]">
          Teams & Projects
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--spacing-xs)]">
          Manage active sprint cohorts and final capstone deliverables.
        </p>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-[var(--spacing-sm)]">
        
        {/* Filter Button */}
        <button className="h-10 flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] bg-[var(--color-surface-low)] border border-[var(--color-border)] rounded-[var(--radius-lg)] text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-muted)] transition duration-[var(--duration-fast)] hover:bg-[var(--color-surface-container)]">
          Filter
        </button>

        {/* Create Team Button */}
        <button className="h-10 flex items-center justify-center px-[var(--spacing-md)] bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-lg)] text-[var(--text-sm)] font-[var(--font-weight-medium)] transition duration-[var(--duration-fast)] hover:opacity-90">
          + Create Team
        </button>

      </div>
    </div>
  );
};

export default TeamHeader;