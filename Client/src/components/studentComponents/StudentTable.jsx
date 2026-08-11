import React, { useState } from 'react';
import { Pencil ,Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditStudentModal from './EditStudentModal';


const ProgressBar = ({ percentage, colorClass }) => (
  <div className="w-full bg-[var(--color-surface-high)] rounded-full h-1 mt-1 overflow-hidden">
    <div 
      className={`h-1 rounded-full ${colorClass}`} 
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const StudentTable = ({ students = [] }) => {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <div className="overflow-x-auto relative">
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
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-[var(--color-surface-low)] transition-colors group">
              <td className="px-4 py-4 font-medium text-[var(--color-text-muted)] text-[13px]">{student.rollNo}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${student.avatarBg} ${student.avatarText}`}>
                    {student.initials}
                  </div>
                  <Link to={`/students/${student.id}`} className="font-semibold text-[#0284c7] cursor-pointer hover:underline flex flex-col line-clamp-2 max-w-[150px] whitespace-normal leading-tight">
                    {student.name}
                  </Link>
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
                <div className="flex items-center justify-end gap-4 text-[var(--color-text-muted)]">
                  <button 
                    onClick={() => setEditingStudent(student)}
                    className="flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors text-xs font-medium"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <Link to={`/students/${student.id}`} className="hover:text-[var(--color-primary)] transition-colors">
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="8" className="px-4 py-12 text-center text-[var(--color-text-muted)]">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingStudent && (
        <EditStudentModal 
          student={editingStudent} 
          onClose={() => setEditingStudent(null)} 
        />
      )}
    </div>
  );
};

export default StudentTable;
