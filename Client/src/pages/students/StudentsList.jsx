import React from 'react';
import StudentToolbar from '../../components/studentComponents/StudentToolbar';
import StudentTable from '../../components/studentComponents/StudentTable';
import StudentPagination from '../../components/studentComponents/StudentPagination';

const StudentsList = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)]">
      
      {/* Main Content Card */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-border)] p-[var(--spacing-md)] lg:p-[var(--spacing-lg)] flex flex-col gap-4">
        
        <StudentToolbar />
        
        <StudentTable />
        
        <StudentPagination />

      </div>
    </div>
  );
};

export default StudentsList;
