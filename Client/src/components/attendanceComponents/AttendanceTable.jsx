import React from 'react';
import CustomSelect from '../CustomSelect';

const StatusBadge = ({ status }) => {
  let badgeStyle = '';
  switch (status) {
    case 'Present':
      badgeStyle = 'bg-[#dcfce7] text-[#16a34a]';
      break;
    case 'Leave':
      badgeStyle = 'bg-[#ffedd5] text-[#ea580c]';
      break;
    case 'Absent':
      badgeStyle = 'bg-[#fee2e2] text-[#ef4444]';
      break;
    case 'Not marked':
    default:
      badgeStyle = 'bg-[var(--color-surface-high)] text-[var(--color-text-muted)]';
      break;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle}`}>
      {status}
    </span>
  );
};

const AttendanceTable = ({ attendanceData, onStatusChange }) => {
  return (
    <div className="overflow-x-auto overflow-y-visible">
      <table className="w-full text-left whitespace-nowrap">
        <thead>
          <tr className="border-b border-[var(--color-surface-highest)]">
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Roll No</th>
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Student</th>
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Date</th>
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Note</th>
            <th className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-right">Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-surface-highest)] text-sm">
          {attendanceData.map((record) => (
            <tr key={record.id} className="hover:bg-[var(--color-surface-low)] transition-colors group">
              
              {/* Roll No */}
              <td className="px-4 py-4 font-semibold text-[var(--color-text-muted)] text-[13px]">{record.rollNo}</td>
              
              {/* Student */}
              <td className="px-4 py-4">
                <span className="font-semibold text-[#0284c7] cursor-pointer hover:underline">
                  {record.name}
                </span>
              </td>
              
              {/* Date */}
              <td className="px-4 py-4 text-xs font-medium text-[var(--color-text-muted)]">{record.date}</td>
              
              {/* Status */}
              <td className="px-4 py-4">
                <StatusBadge status={record.status} />
              </td>
              
              {/* Note */}
              <td className="px-4 py-4 text-xs font-medium text-[var(--color-text-muted)]">
                {record.note || '—'}
              </td>
              
              {/* Change (Dropdown) */}
              <td className="px-4 py-2 text-right">
                <div className="flex justify-end">
                  <CustomSelect
                    label="Status"
                    value={record.status === 'Not marked' ? 'Set' : record.status}
                    options={['Present', 'Leave', 'Absent']}
                    onChange={(val) => onStatusChange(record.id, val)}
                    className="w-[120px]"
                  />
                </div>
              </td>

            </tr>
          ))}
          
          {attendanceData.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-12 text-center text-[var(--color-text-muted)]">
                No attendance records found.
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
