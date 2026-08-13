import React from 'react';

const performanceData = [
  { id: 1, task: 'State Management Sprint', date: 'Oct 12, 2023', status: 'Completed', statusColor: 'text-[#16a34a] bg-[#dcfce7]' },
  { id: 2, task: 'API Integration Project', date: 'Oct 05, 2023', status: 'In Progress', statusColor: 'text-[#d97706] bg-[#fef3c7]' },
  { id: 3, task: 'Midterm Assessment', date: 'Sep 28, 2023', status: 'Completed', statusColor: 'text-[#16a34a] bg-[#dcfce7]' },
];

const StudentRecentPerformance = () => {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-6 flex-1 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[var(--color-text)] tracking-tight">Recent Performance</h3>
        <button className="text-xs font-semibold text-[#2563eb] hover:underline">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[var(--color-surface-highest)]">
              <th className="pb-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider w-1/2">Task / Assignment</th>
              <th className="pb-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider w-1/4">Date</th>
              <th className="pb-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider w-1/4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-surface-highest)] text-sm">
            {performanceData.map((item) => (
              <tr key={item.id}>
                <td className="py-4 font-semibold text-[var(--color-text)]">{item.task}</td>
                <td className="py-4 font-medium text-[var(--color-text-muted)]">{item.date}</td>
                <td className="py-4 text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default StudentRecentPerformance;
