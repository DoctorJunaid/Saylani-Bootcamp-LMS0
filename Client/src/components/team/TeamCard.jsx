import ProgressBar from "./ProgressBar";

const TeamCard = ({ title, sprint, progress, status, members }) => {
  
  const isInProgress = status === "In Progress";
  const isReview = status === "Under Review";
  const isNotStarted = status === "Not Started";

  return (<>
 
    
    <div
      className={`w-[320px] h-[187px] p-4 gap-2 flex flex-col bg-white border border-gray-200 rounded-xl 
      ${isInProgress ? "border-l-4 border-l-blue-500" : ""}`}
    >
      {/* Sprint Tag */}
      <span className="bg-[#F3F3FE] text-gray-500 font-geist text-[11px] leading-[14px] font-semibold px-2 py-1 rounded-md flex items-center justify-center w-fit">
        {sprint}
      </span>

      {/* Title */}
      <h3 className="font-[Geist] text-[20px] leading-[25px] font-semibold text-gray-900 tracking-normal">{title}</h3>

      {/* Progress (Conditional) */}
      {!isNotStarted && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Progress</p>

          <ProgressBar
            progress={progress}
            color={isReview ? "green" : "blue"}
          />
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-4 flex justify-between items-center">
        
        {/* Avatars */}
        <div className="flex -space-x-2">
          {members?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="user"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>

        {/* Status */}
        <span className="text-xs text-gray-400">{status}</span>
      </div>
    
    </div>
   </>);
};

export default TeamCard;