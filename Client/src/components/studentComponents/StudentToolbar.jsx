import React from 'react';
import { Search } from 'lucide-react';
import CustomSelect from '../CustomSelect';

const StudentToolbar = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-4 w-full">

      {/* Left side: Search Bar */}
      <div className="relative w-full xl:flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[var(--color-text-muted)]" />
        </div>
        <input
          type="text"
          placeholder="Search by roll number, name, email, course or batch"
          className="block w-full pl-10 pr-3 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] placeholder-[var(--color-text-muted)] text-[var(--color-text)] transition-colors"
        />
      </div>

      {/* Middle side: Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full xl:w-auto shrink-0">
        <CustomSelect
          label="Course"
          defaultOption="All courses"
          options={['Web & App Dev', 'Data Science', 'UI/UX Design']}
        />
        <CustomSelect
          label="Batch"
          defaultOption="All batches"
          options={['Batch-07', 'Batch-08', 'Batch-09']}
        />
        <CustomSelect
          label="Team"
          defaultOption="All teams"
          options={['Team Alpha', 'Team Beta', 'Team Gamma', 'Unassigned']}
        />
      </div>

    </div>
  );
};

export default StudentToolbar;