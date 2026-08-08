import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Plus } from 'lucide-react';

function CustomSelect({ label, defaultOption, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 w-full sm:w-auto px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors duration-[var(--duration-fast)] ${
          open
            ? 'border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text)]'
            : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-outline)] hover:text-[var(--color-text)]'
        }`}
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-[var(--duration-fast)] ${
            open ? 'rotate-180 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full sm:min-w-[180px] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] py-1 max-h-60 overflow-auto"
        >
          {[defaultOption, ...options].map((opt) => {
            const isSelected = opt === selected;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-2 px-4 py-2 text-sm cursor-pointer transition-colors duration-[var(--duration-fast)] ${
                  isSelected
                    ? 'bg-[var(--color-primary-container)]/15 text-[var(--color-on-primary-container)] font-medium'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-low)] hover:text-[var(--color-text)]'
                }`}
              >
                {opt}
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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

      {/* Right side: Add Student Button */}
      <div className="w-full xl:flex-1 flex justify-end">
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-sm font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Student
        </button>
      </div>

    </div>
  );
};

export default StudentToolbar;