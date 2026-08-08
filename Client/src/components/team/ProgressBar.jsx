const ProgressBar = ({ progress, color }) => {
  const getColor = () => {
      if (color === "success") return "var(--color-success)";
      return "var(--color-primary)";
    };

  return (
    <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
      
        <div
          className="h-full rounded-full transition-all duration-[var(--duration-normal)]"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        ></div>

      </div>
    );
  };

export default ProgressBar;