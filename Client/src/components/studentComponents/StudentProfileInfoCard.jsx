import React from 'react';

const generateAvatarProps = (name) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
  const colors = [
    { bg: 'bg-[#e0f2fe]', text: 'text-[#0284c7]' }, // blue
    { bg: 'bg-[#dcfce7]', text: 'text-[#16a34a]' }, // green
    { bg: 'bg-[#fef3c7]', text: 'text-[#d97706]' }, // yellow
    { bg: 'bg-[#fee2e2]', text: 'text-[#ef4444]' }, // red
    { bg: 'bg-[#f3e8ff]', text: 'text-[#9333ea]' }  // purple
  ];
  const charCode = initials.charCodeAt(0) || 0;
  return { initials, ...colors[charCode % colors.length] };
};

const StudentProfileInfoCard = ({ student }) => {
  if (!student) return null;
  const { initials, bg, text } = generateAvatarProps(student.name);

  // Format date
  const enrollmentDate = new Date(student.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-6">
      
      {/* Left Column: Personal Info */}
      <div className="flex-[1.5] flex flex-col sm:flex-row gap-6">
        
        {/* Avatar */}
        <div className={`w-24 h-24 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${bg} ${text} text-3xl font-bold`}>
          {initials}
        </div>
        
        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text)] tracking-tight">{student.name}</h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-[#dcfce7] text-[#16a34a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
              Active
            </span>
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-1">Course</p>
              <p className="text-sm text-[var(--color-text)] font-semibold">{student.course}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-1">Batch</p>
              <p className="text-sm text-[var(--color-text)] font-semibold">{student.batch}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-1">Roll Number</p>
              <p className="text-sm text-[var(--color-text)] font-semibold">{student.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-1">Enrollment Date</p>
              <p className="text-sm text-[var(--color-text)] font-semibold">{enrollmentDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-[var(--color-surface-highest)]"></div>
      <div className="lg:hidden h-px w-full bg-[var(--color-surface-highest)]"></div>

      {/* Right Column: Academic Progress */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-[var(--color-text)] tracking-tight mb-6">Academic Progress</h3>
        
        <div className="space-y-6">
          {/* Progress 1 */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-muted)]">Tasks Completed</span>
              <span className="text-[#2563eb]">0%</span>
            </div>
            <div className="w-full bg-[var(--color-surface-high)] rounded-full h-2">
              <div className="bg-[#2563eb] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          {/* Progress 2 */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-muted)]">Attendance Rate</span>
              <span className="text-[#16a34a]">0%</span>
            </div>
            <div className="w-full bg-[var(--color-surface-high)] rounded-full h-2">
              <div className="bg-[#16a34a] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Current Module */}
          <div className="pt-1">
            <p className="text-xs text-[var(--color-text-muted)] font-semibold mb-1">Assigned Team</p>
            <p className="text-sm text-[var(--color-text)] font-semibold">{student.team_id ? student.team_id.name : 'Unassigned'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentProfileInfoCard;
