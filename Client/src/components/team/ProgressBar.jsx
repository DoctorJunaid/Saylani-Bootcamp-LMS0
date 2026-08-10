const ProgressBar = ({ progress, color }) => {
  const getColor = () => {
      if (color === "success") return "#16a34a";
      return "#2563eb";
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