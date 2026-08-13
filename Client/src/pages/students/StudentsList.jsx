import React, { useState, useEffect } from 'react';
import StudentToolbar from '../../components/studentComponents/StudentToolbar';
import StudentTable from '../../components/studentComponents/StudentTable';
import StudentPagination from '../../components/studentComponents/StudentPagination';
import AddStudentModal from '../../components/studentComponents/AddStudentModal';
import { getStudents } from '../../api/student.api';
import toast from 'react-hot-toast';

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

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [selectedCourse, setSelectedCourse] = useState('All courses');
  const [selectedBatch, setSelectedBatch] = useState('All batches');
  const [selectedTeam, setSelectedTeam] = useState('All teams');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchStudentsData = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents(searchQuery);
      
      // Map backend data to frontend format
      const formattedData = data.students.map(student => {
        const { initials, bg, text } = generateAvatarProps(student.name);
        
        return {
          id: student._id,
          rollNo: student.rollNumber,
          name: student.name,
          initials,
          avatarBg: bg,
          avatarText: text,
          course: student.course,
          batch: student.batch,
          team: student.team_id ? student.team_id.name : 'Unassigned',
          teamBg: student.team_id ? 'bg-[#e0f2fe]' : 'bg-[var(--color-surface-high)]',
          teamText: student.team_id ? 'text-[#0284c7]' : 'text-[var(--color-text-muted)]',
          attendance: null, // Placeholder until attendance stats API is linked
          tasksCount: null, // Placeholder
          tasksPercentage: null,
          tasksTarget: null
        };
      });
      
      setStudents(formattedData);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, [searchQuery]); // Re-fetch when search changes

  // Reset to first page on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCourse, selectedBatch, selectedTeam]);

  // Listen for 'Add Student' click from the DashboardLayout TopBar
  useEffect(() => {
    const handleOpenModal = () => setIsAddStudentModalOpen(true);
    window.addEventListener('openAddStudent', handleOpenModal);
    return () => window.removeEventListener('openAddStudent', handleOpenModal);
  }, []);

  // Generate dynamic filter options from the fetched students
  const courseOptions = [...new Set(students.map(s => s.course))].filter(Boolean);
  const batchOptions = [...new Set(students.map(s => s.batch))].filter(Boolean);
  const teamOptions = [...new Set(students.map(s => s.team))].filter(Boolean);

  // Apply frontend filters
  const filteredStudents = students.filter(student => {
    const matchCourse = selectedCourse === 'All courses' || student.course === selectedCourse;
    const matchBatch = selectedBatch === 'All batches' || student.batch === selectedBatch;
    const matchTeam = selectedTeam === 'All teams' || student.team === selectedTeam;
    return matchCourse && matchBatch && matchTeam;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)]">
      
      {/* Main Content Card */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-border)] p-[var(--spacing-md)] lg:p-[var(--spacing-lg)] flex flex-col gap-4">
        
        <StudentToolbar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          courseOptions={courseOptions}
          selectedBatch={selectedBatch}
          onBatchChange={setSelectedBatch}
          batchOptions={batchOptions}
          selectedTeam={selectedTeam}
          onTeamChange={setSelectedTeam}
          teamOptions={teamOptions}
        />
        
        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : (
          <StudentTable students={paginatedData} onRefresh={fetchStudentsData} />
        )}
        
        {!isLoading && filteredStudents.length > 0 && (
          <StudentPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <AddStudentModal 
          onClose={() => setIsAddStudentModalOpen(false)} 
          onSuccess={() => {
            setIsAddStudentModalOpen(false);
            fetchStudentsData(); // Refresh list after adding
          }}
        />
      )}
    </div>
  );
};

export default StudentsList;
