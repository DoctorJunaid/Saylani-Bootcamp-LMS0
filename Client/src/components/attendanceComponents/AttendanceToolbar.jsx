import React from 'react';
import { Search, Download, ClipboardCheck } from 'lucide-react';
import CustomSelect from '../CustomSelect';

const AttendanceToolbar = ({ searchQuery, onSearchChange, onDownloadCsv, onTakeAttendanceClick }) => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-4 w-full">
      
      {/* Left side: Heading */}
      <div className="w-full xl:w-auto shrink-0">
        <h2 className="text-xl font-bold text-[var(--color-text)] tracking-tight">Attendance Records</h2>
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-full xl:flex-1 mx-0 xl:mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[var(--color-text-muted)]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or roll number..."
          className="block w-full pl-10 pr-3 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] placeholder-[var(--color-text-muted)] text-[var(--color-text)] transition-colors"
        />
      </div>
      
      {/* Right side: Filters & Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto shrink-0 justify-end">
        
        {/* Dropdown */}
        <CustomSelect 
          label="Filter"
          defaultOption="Daily"
          options={['Weekly', 'Monthly']}
        />

        {/* Download CSV Button */}
        <button 
          onClick={onDownloadCsv}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-sm font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>

      </div>

    </div>
  );
};

export default AttendanceToolbar;
