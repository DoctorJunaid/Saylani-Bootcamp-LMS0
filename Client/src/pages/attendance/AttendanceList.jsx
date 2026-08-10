import React, { useState, useEffect } from 'react';
import AttendanceToolbar from '../../components/attendanceComponents/AttendanceToolbar';
import AttendanceTable from '../../components/attendanceComponents/AttendanceTable';
import AttendancePagination from '../../components/attendanceComponents/AttendancePagination';

// Generate mock data for demonstration
const mockAttendanceData = [
  { id: 1, rollNo: '100235', name: 'Bilal Ahmed', date: 'Aug 10, 2026', status: 'Leave', note: null },
  { id: 2, rollNo: '100236', name: 'Sana Malik', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 3, rollNo: '100237', name: 'Hamza Sheikh', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 4, rollNo: '100238', name: 'Fatima Noor', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 5, rollNo: '100239', name: 'Usman Tariq', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 6, rollNo: '100243', name: 'Hakim', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 7, rollNo: '100435', name: 'Junaid', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 8, rollNo: '100436', name: 'Ayesha Khan', date: 'Aug 10, 2026', status: 'Present', note: null },
  { id: 9, rollNo: '100437', name: 'Ali Raza', date: 'Aug 10, 2026', status: 'Present', note: null },
  { id: 10, rollNo: '100438', name: 'Zainab Abbas', date: 'Aug 10, 2026', status: 'Absent', note: 'Uninformed' },
  { id: 11, rollNo: '100439', name: 'Omar Farooq', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 12, rollNo: '100440', name: 'Hira Mani', date: 'Aug 10, 2026', status: 'Leave', note: 'Sick Leave' },
  { id: 13, rollNo: '100441', name: 'Saad Tariq', date: 'Aug 10, 2026', status: 'Present', note: null },
  { id: 14, rollNo: '100442', name: 'Khadija Shah', date: 'Aug 10, 2026', status: 'Not marked', note: null },
  { id: 15, rollNo: '100443', name: 'Musa Khan', date: 'Aug 10, 2026', status: 'Present', note: null },
];

const AttendanceList = () => {
  const [data, setData] = useState(mockAttendanceData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle Status Update
  const handleStatusChange = (id, newStatus) => {
    setData((prev) => 
      prev.map((student) => 
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Filter Data
  const filteredData = data.filter((student) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Download CSV
  const handleDownloadCsv = () => {
    const headers = ['Roll No', 'Student Name', 'Date', 'Status', 'Note'];
    
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
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-border)] p-[var(--spacing-md)] lg:p-[var(--spacing-lg)] flex flex-col gap-4">
        
        {/* Toolbar */}
        <AttendanceToolbar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onDownloadCsv={handleDownloadCsv}
        />

        {/* Table Container */}
        <div className="border border-[var(--color-surface-highest)] rounded-[var(--radius-lg)] overflow-hidden">
          <AttendanceTable 
            attendanceData={paginatedData} 
            onStatusChange={handleStatusChange}
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
    </div>
  );
};

export default AttendanceList;
