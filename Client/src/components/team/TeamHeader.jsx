const TeamHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="font-geist text-[28px] leading-[36px] font-semibold text-gray-900">Teams & Projects</h1>
        <p className="text-gray-500 text-sm">
          Manage active sprint cohorts and final capstone deliverables.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="h-10 flex items-center gap-2 px-4 bg-[#FAF8FF] border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#F3F0FF] transition">Filter</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + Create Team
        </button>
      </div>
    </div>
  );
};

export default TeamHeader;