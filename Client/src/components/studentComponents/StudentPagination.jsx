import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StudentPagination = () => {
  return (
    <div className="flex items-center justify-between py-4 w-full border-t border-[var(--color-surface-highest)]">
      <div className="text-[11px] font-medium text-[var(--color-text-muted)]">
        Showing 1-5 of 124 students
      </div>
      <div className="flex items-center gap-1.5">
        <button className="flex items-center justify-center h-6 w-6 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-md transition-colors opacity-50 cursor-not-allowed" disabled>
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button className="flex items-center justify-center h-6 w-6 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-md transition-colors">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default StudentPagination;
