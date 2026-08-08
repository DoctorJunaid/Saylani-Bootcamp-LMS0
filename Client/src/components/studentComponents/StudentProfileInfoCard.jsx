import React from 'react';

const StudentProfileInfoCard = () => {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-6">
      
      {/* Left Column: Personal Info */}
      <div className="flex-[1.5] flex flex-col sm:flex-row gap-6">
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-lg bg-[var(--color-surface-high)] border border-[var(--color-border)] flex items-center justify-center shrink-0 overflow-hidden">
          {/* Placeholder image resembling the design */}
          <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-[var(--color-text)] tracking-tight">Elara Vance</h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#dcfce7] text-[#16a34a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
              Active
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">Software Engineering Immersive • Cohort 42</p>
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mb-1">Email Address</p>
              <p className="text-xs text-[var(--color-text)] font-semibold">elara.vance@student.edu</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mb-1">Phone Number</p>
              <p className="text-xs text-[var(--color-text)] font-semibold">+1 (555) 019-2834</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mb-1">Roll Number</p>
              <p className="text-xs text-[var(--color-text)] font-semibold">SEI-42-089</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mb-1">Enrollment Date</p>
              <p className="text-xs text-[var(--color-text)] font-semibold">Aug 15, 2023</p>
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
            <div className="flex justify-between text-[11px] font-semibold mb-2">
              <span className="text-[var(--color-text-muted)]">Course Completion</span>
              <span className="text-[#2563eb]">68%</span>
            </div>
            <div className="w-full bg-[var(--color-surface-high)] rounded-full h-2">
              <div className="bg-[#2563eb] h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          
          {/* Progress 2 */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold mb-2">
              <span className="text-[var(--color-text-muted)]">Attendance Rate</span>
              <span className="text-[#16a34a]">92%</span>
            </div>
            <div className="w-full bg-[var(--color-surface-high)] rounded-full h-2">
              <div className="bg-[#16a34a] h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          {/* Current Module */}
          <div className="pt-1">
            <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mb-1">Current Module</p>
            <p className="text-xs text-[var(--color-text)] font-semibold">Advanced React Patterns</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentProfileInfoCard;
