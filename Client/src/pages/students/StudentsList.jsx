import React, { useState, useEffect } from 'react';
import StudentToolbar from '../../components/studentComponents/StudentToolbar';
import StudentTable from '../../components/studentComponents/StudentTable';
import StudentPagination from '../../components/studentComponents/StudentPagination';
import AddStudentModal from '../../components/studentComponents/AddStudentModal';

const mockStudents = [
  { id: 1, rollNo: '123456', name: 'Ayesha Khan', initials: 'A', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Full Stack Development', batch: 'Batch-07', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: 67, tasksCount: '2/3', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 2, rollNo: '100235', name: 'Bilal Ahmed', initials: 'B', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Full Stack Development', batch: 'Batch-07', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 67, tasksCount: '2/3', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 3, rollNo: '100238', name: 'Fatima Noor', initials: 'F', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'UI/UX Design', batch: 'Batch-09', team: 'Team Gamma', teamBg: 'bg-[#dcfce7]', teamText: 'text-[#16a34a]', attendance: 100, tasksCount: '2/2', tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 4, rollNo: '100243', name: 'Hakim', initials: 'H', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'AI', batch: '4', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: null, tasksCount: 'No tasks', tasksPercentage: null, tasksTarget: null },
  { id: 5, rollNo: '100237', name: 'Hamza Sheikh', initials: 'H', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Data Science', batch: 'Batch-08', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 50, tasksCount: '1/2', tasksPercentage: 0, tasksTarget: '0/1' },
  { id: 6, rollNo: '100435', name: 'Junaid', initials: 'J', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Web', batch: '4', team: 'Team Gamma', teamBg: 'bg-[#dcfce7]', teamText: 'text-[#16a34a]', attendance: null, tasksCount: 'No tasks', tasksPercentage: null, tasksTarget: null },
  { id: 7, rollNo: '100236', name: 'Sana Malik', initials: 'S', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Data Science', batch: 'Batch-08', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 50, tasksCount: '2/4', tasksPercentage: 67, tasksTarget: '2/3' },
  { id: 8, rollNo: '544234', name: 'Sana Ullah', initials: 'S', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Web', batch: '3', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: null, tasksCount: null, tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 9, rollNo: '100239', name: 'Usman Tariq', initials: 'U', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'UI/UX Design', batch: 'Batch-09', team: 'Unassigned', teamBg: 'bg-[var(--color-surface-high)]', teamText: 'text-[var(--color-text-muted)]', attendance: null, tasksCount: null, tasksPercentage: 0, tasksTarget: '0/1' },
  // Adding more dummy data to demonstrate pagination
  { id: 10, rollNo: '100240', name: 'Zaid Ali', initials: 'Z', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Full Stack Development', batch: 'Batch-07', team: 'Team Alpha', teamBg: 'bg-[#e0f2fe]', teamText: 'text-[#0284c7]', attendance: 80, tasksCount: '3/3', tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 11, rollNo: '100241', name: 'Nida Fazal', initials: 'N', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'Data Science', batch: 'Batch-08', team: 'Team Beta', teamBg: 'bg-[#fef3c7]', teamText: 'text-[#d97706]', attendance: 90, tasksCount: '4/4', tasksPercentage: 100, tasksTarget: '1/1' },
  { id: 12, rollNo: '100242', name: 'Omer Khawam', initials: 'O', avatarBg: 'bg-[#e0f2fe]', avatarText: 'text-[#0284c7]', course: 'AI', batch: '4', team: 'Team Gamma', teamBg: 'bg-[#dcfce7]', teamText: 'text-[#16a34a]', attendance: 100, tasksCount: '2/2', tasksPercentage: 100, tasksTarget: '1/1' },
];

const StudentsList = () => {
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter state (in the future)
  const filteredData = mockStudents; // Placeholder for actual filtering logic
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        
        <StudentTable students={paginatedData} />
        
        <StudentPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

      </div>

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <AddStudentModal onClose={() => setIsAddStudentModalOpen(false)} />
      )}
    </div>
  );
};

export default StudentsList;
