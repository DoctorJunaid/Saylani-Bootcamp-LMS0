export default function ProjectTableSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Project", "Team", "Status", "Deadline", "Actions"].map((item) => (
              <th
                key={item}
                className="text-left px-lg py-md text-xs font-semibold text-text-muted uppercase"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(6)].map((_, index) => (
            <tr key={index} className="border-b border-border animate-pulse">
              <td className="px-lg py-md">
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-100 rounded mt-2"></div>
              </td>

              <td className="px-lg py-md">
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </td>

              <td className="px-lg py-md">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </td>

              <td className="px-lg py-md">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </td>

              <td className="px-lg py-md">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}