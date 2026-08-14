import { Search, Download } from 'lucide-react';
import CustomSelect from '../CustomSelect';

const AttendanceToolbar = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  onDownloadCsv,
  viewMode = 'Daily',
  onViewModeChange,
  rangeLabel = '',
}) => {
  return (
    <div className="flex flex-col gap-1.5 pb-2 pt-1 w-full -mt-1">
      
      {/* Top Row: Heading */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
        <h2 className="text-xl font-bold text-[var(--color-text)] tracking-tight leading-none">Attendance Records</h2>
        {rangeLabel ? (
          <p className="text-xs font-medium text-[var(--color-text-muted)]">
            {viewMode}: {rangeLabel}
          </p>
        ) : null}
      </div>

      {/* Bottom Row: Date, Search, and Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 w-full mt-1">
        
        {/* Date Filter */}
        <div className="shrink-0 w-full lg:w-auto">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full lg:w-auto text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>

        {/* Center: Search Bar */}
        <div className="relative w-full lg:flex-1 mx-0 lg:mx-4">
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
        
        {/* Daily / Weekly / Monthly */}
        <CustomSelect 
          label="View period"
          value={viewMode}
          onChange={onViewModeChange}
          options={['Daily', 'Weekly', 'Monthly']}
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
    </div>
  );
};

export default AttendanceToolbar;
