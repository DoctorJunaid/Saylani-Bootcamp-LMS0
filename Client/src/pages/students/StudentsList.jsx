import React, { useState, useEffect } from 'react';
import StudentToolbar from '../../components/studentComponents/StudentToolbar';
import StudentTable from '../../components/studentComponents/StudentTable';
import StudentPagination from '../../components/studentComponents/StudentPagination';
import AddStudentModal from '../../components/studentComponents/AddStudentModal';

const StudentsList = () => {
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  // Listen for 'Add Student' click from the DashboardLayout TopBar
  useEffect(() => {
    const handleOpenModal = () => setIsAddStudentModalOpen(true);
    window.addEventListener('openAddStudent', handleOpenModal);
    return () => window.removeEventListener('openAddStudent', handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)]">
      
      {/* Main Content Card */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-border)] p-[var(--spacing-md)] lg:p-[var(--spacing-lg)] flex flex-col gap-4">
        
        <StudentToolbar />
        
        <StudentTable />
        
        <StudentPagination />

      </div>

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <AddStudentModal onClose={() => setIsAddStudentModalOpen(false)} />
      )}
    </div>
  );
};

export default StudentsList;
