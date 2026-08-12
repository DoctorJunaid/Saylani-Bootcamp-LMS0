import React, { useState, useEffect } from 'react';
import AttendanceToolbar from '../../components/attendanceComponents/AttendanceToolbar';
import AttendanceTable from '../../components/attendanceComponents/AttendanceTable';
import AttendancePagination from '../../components/attendanceComponents/AttendancePagination';
import TakeAttendanceModal from '../../components/attendanceComponents/TakeAttendanceModal';
import StudentRecordModal from '../../components/attendanceComponents/StudentRecordModal';

import toast from 'react-hot-toast';

const todayStr = new Date().toISOString().split('T')[0];
const mockAttendanceData = [
  { id: 1, rollNo: '100235', name: 'Bilal Ahmed', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 2, rollNo: '100236', name: 'Sana Malik', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 3, rollNo: '100237', name: 'Hamza Sheikh', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 4, rollNo: '100238', name: 'Fatima Noor', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 5, rollNo: '100239', name: 'Usman Tariq', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 6, rollNo: '100243', name: 'Hakim', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 7, rollNo: '100435', name: 'Junaid', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 8, rollNo: '100436', name: 'Ayesha Khan', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 9, rollNo: '100437', name: 'Ali Raza', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 10, rollNo: '100438', name: 'Zainab Abbas', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 11, rollNo: '100439', name: 'Omar Farooq', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 12, rollNo: '100440', name: 'Hira Mani', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 13, rollNo: '100441', name: 'Saad Tariq', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 14, rollNo: '100442', name: 'Khadija Shah', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
  { id: 15, rollNo: '100443', name: 'Musa Khan', date: todayStr, status: 'Not marked', note: null, checkInTime: null, checkOutTime: null },
];

const AttendanceList = () => {
  const [data, setData] = useState(mockAttendanceData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTakeAttendanceModalOpen, setIsTakeAttendanceModalOpen] = useState(false);
  const [selectedStudentForRecord, setSelectedStudentForRecord] = useState(null);
  const itemsPerPage = 10;

  // Reset to first page when searching or changing date
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate]);

  // Listen for 'Take Attendance' click from the DashboardLayout TopBar
  useEffect(() => {
    const handleOpenModal = () => setIsTakeAttendanceModalOpen(true);
    window.addEventListener('openTakeAttendance', handleOpenModal);
    return () => window.removeEventListener('openTakeAttendance', handleOpenModal);
  }, []);

  // Handle Status Update from single row (Local state only)
  const handleStatusChange = (id, newStatus) => {
    const time = newStatus === 'Present' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null;
    setData((prev) => 
      prev.map((student) => 
        student.id === id ? { ...student, status: newStatus, checkInTime: time } : student
      )
    );
    toast.success("Attendance updated");
  };

  // Handle bulk save from Take Attendance Modal (Local state only)
  const handleBulkSave = (updates) => {
    setData((prev) => {
      const updatedData = [...prev];
      updates.forEach(update => {
        const idx = updatedData.findIndex(s => s.id === update.id);
        if (idx !== -1) {
          updatedData[idx] = { 
            ...updatedData[idx], 
            status: update.status,
            checkInTime: update.checkInTime !== undefined ? update.checkInTime : updatedData[idx].checkInTime
          };
        }
      });
      return updatedData;
    });
    toast.success("Bulk attendance saved successfully");
  };

  // Filter Data
  const filteredData = data.filter((student) => 
    student.date === selectedDate && (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery)
    )
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Download CSV
  const handleDownloadCsv = () => {
    const headers = ['Roll No', 'Student Name', 'Date', 'Status', 'Check In', 'Check Out', 'Note'];
    
    // Helper to safely format CSV values that might contain commas
    const escapeCsvValue = (val) => {
      if (val == null) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filteredData.map(r => [
      escapeCsvValue(r.rollNo),
      escapeCsvValue(r.name),
      escapeCsvValue(r.date),
      escapeCsvValue(r.status),
      escapeCsvValue(r.checkInTime || ''),
      escapeCsvValue(r.checkOutTime || ''),
      escapeCsvValue(r.note || '')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)]">
      
      {/* Main Content Card */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-border)] px-[var(--spacing-md)] lg:px-[var(--spacing-lg)] pb-[var(--spacing-md)] lg:pb-[var(--spacing-lg)] pt-4 flex flex-col gap-2">
        
        {/* Toolbar */}
        <AttendanceToolbar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onDownloadCsv={handleDownloadCsv}
        />

        {/* Table Container */}
        <div className="border border-[var(--color-surface-highest)] rounded-[var(--radius-lg)] overflow-hidden">
          <AttendanceTable 
            attendanceData={paginatedData} 
            onStatusChange={handleStatusChange}
            onStudentClick={(student) => setSelectedStudentForRecord(student)}
          />
          
          <AttendancePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>

      {/* Take Attendance Modal */}
      {isTakeAttendanceModalOpen && (
        <TakeAttendanceModal 
          students={data} 
          onClose={() => setIsTakeAttendanceModalOpen(false)}
          onSave={handleBulkSave}
        />
      )}

      {/* Student Record Modal */}
      {selectedStudentForRecord && (
        <StudentRecordModal 
          student={selectedStudentForRecord} 
          onClose={() => setSelectedStudentForRecord(null)} 
        />
      )}
    </div>
  );
};

export default AttendanceList;
