const ProgressBar = ({ progress, color }) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div
        className={`h-2 rounded-full ${
          color === "green" ? "bg-[#16A34A]" : "bg-[#004AC6]"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;