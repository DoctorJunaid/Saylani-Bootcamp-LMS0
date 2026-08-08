import React from 'react';
import { Pencil, MoreHorizontal } from 'lucide-react';

const mockStudents = [
  { id: 1, rollNo: '123456', name: 'Ayesha Khan', initials: 'A', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Full Stack Development', batch: 'Batch-07', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: 67, tasksCount: '2/3', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 2, rollNo: '100235', name: 'Bilal Ahmed', initials: 'B', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Full Stack Development', batch: 'Batch-07', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 67, tasksCount: '2/3', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 3, rollNo: '100238', name: 'Fatima Noor', initials: 'F', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'UI/UX Design', batch: 'Batch-09', team: 'Team Gamma', teamBg: 'bg-[#dcfce7]', teamText: 'text-[#16a34a]', attendance: 100, tasksCount: '2/2', tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 4, rollNo: '100243', name: 'Hakim', initials: 'H', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'AI', batch: '4', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: null, tasksCount: 'No tasks', tasksPercentage: null, tasksTarget: null },
  { id: 5, rollNo: '100237', name: 'Hamza Sheikh', initials: 'H', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Data Science', batch: 'Batch-08', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 50, tasksCount: '1/2', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 6, rollNo: '100435', name: 'Junaid', initials: 'J', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Web', batch: '4', team: 'Team Gamma', teamBg: 'bg-[#dcfce7]', teamText: 'text-[#16a34a]', attendance: null, tasksCount: 'No tasks', tasksPercentage: null, tasksTarget: null },
  { id: 7, rollNo: '100236', name: 'Sana Malik', initials: 'S', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Data Science', batch: 'Batch-08', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 50, tasksCount: '2/4', tasksPercentage: 67, tasksTarget: '2/3' },
  { id: 8, rollNo: '544234', name: 'Sana Ullah', initials: 'S', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Web', batch: '3', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: null, tasksCount: null, tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 9, rollNo: '100239', name: 'Usman Tariq', initials: 'U', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'UI/UX Design', batch: 'Batch-09', team: 'Unassigned', teamBg: 'bg-[var(--color-surface-high)]', teamText: 'text-[var(--color-text-muted)]', attendance: null, tasksCount: null, tasksPercentage: 0, tasksTarget: '0/1' },
];

const ProgressBar = ({ percentage, colorClass }) => (
  <div className="w-full bg-[var(--color-surface-high)] rounded-full h-1 mt-1 overflow-hidden">
    <div 
      className={`h-1 rounded-full ${colorClass}`} 
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const StudentTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left whitespace-nowrap">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Roll No</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Course</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Batch</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Team</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Attendance</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider" colSpan="2">Tasks completed</th>
            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-surface-highest)] text-sm">
          {mockStudents.map((student) => (
            <tr key={student.id} className="hover:bg-[var(--color-surface-low)] transition-colors group">
              <td className="px-4 py-4 font-medium text-[var(--color-text-muted)] text-[13px]">{student.rollNo}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${student.avatarBg} ${student.avatarText}`}>
                    {student.initials}
                  </div>
                  <div className="font-semibold text-[var(--color-text)] cursor-pointer flex flex-col line-clamp-2 max-w-[150px] whitespace-normal leading-tight">
                    {student.name}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-xs text-[var(--color-text-muted)]">{student.course}</td>
              <td className="px-4 py-4 text-xs text-[var(--color-text-muted)]">{student.batch}</td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${student.teamBg} ${student.teamText}`}>
                  {student.team}
                </span>
              </td>
              
              {/* Attendance Column */}
              <td className="px-4 py-4 min-w-[120px]">
                {student.attendance !== null ? (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[var(--color-text)] font-bold text-xs">{student.attendance}%</span>
                      <span className="text-[var(--color-text-muted)] text-[10px] font-medium">{student.tasksCount}</span>
                    </div>
                    <ProgressBar percentage={student.attendance} colorClass={student.attendance === 100 ? "bg-[#16a34a]" : "bg-[#2563eb]"} />
                  </div>
                ) : (
                  <span className="text-[var(--color-text-muted)]">—</span>
                )}
              </td>
              
              {/* Tasks Progress (Combined in Image) */}
              <td className="px-4 py-4 min-w-[120px]" colSpan="2">
                {student.tasksPercentage !== null ? (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[var(--color-text)] font-bold text-xs">{student.tasksPercentage}%</span>
                      <span className="text-[var(--color-text-muted)] text-[10px] font-medium">{student.tasksTarget}</span>
                    </div>
                    <ProgressBar 
                      percentage={student.tasksPercentage} 
                      colorClass={student.tasksPercentage === 100 ? "bg-[#16a34a]" : (student.tasksPercentage > 0 ? "bg-[#d97706]" : "bg-[var(--color-surface-high)]")} 
                    />
                  </div>
                ) : (
                  <span className="text-[var(--color-text-muted)] text-xs">No tasks</span>
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 text-[var(--color-text-muted)]">
                  <button className="flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors text-xs font-medium">
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button className="hover:text-[var(--color-primary)] transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
