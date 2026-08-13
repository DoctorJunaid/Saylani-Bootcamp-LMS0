import { useState, useEffect } from 'react';
import AttendanceToolbar from '../../components/attendanceComponents/AttendanceToolbar';
import AttendanceTable from '../../components/attendanceComponents/AttendanceTable';
import AttendancePagination from '../../components/attendanceComponents/AttendancePagination';
import TakeAttendanceModal from '../../components/attendanceComponents/TakeAttendanceModal';
import StudentRecordModal from '../../components/attendanceComponents/StudentRecordModal';

import toast from 'react-hot-toast';

import { getStudents } from '../../api/student.api';
import { getAttendanceByDate, markAttendance } from '../../Services/attendance.services.js';

const todayStr = new Date().toISOString().split('T')[0];

const AttendanceList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTakeAttendanceModalOpen, setIsTakeAttendanceModalOpen] = useState(false);
  const [selectedStudentForRecord, setSelectedStudentForRecord] = useState(null);
  const itemsPerPage = 10;

  const loadAttendanceData = async (dateStr) => {
    setIsLoading(true);
    try {
      const [studentsRes, attendanceRes] = await Promise.all([
        getStudents(),
        getAttendanceByDate(dateStr).catch(() => ({ attendance: [] })),
      ]);

      const attendanceMap = new Map();
      (attendanceRes?.attendance || []).forEach((record) => {
        const studentId = record.student_id?._id || record.student_id;
        if (studentId) {
          attendanceMap.set(String(studentId), record);
        }
      });

      const mappedData = (studentsRes.students || []).map((student) => {
        const att = attendanceMap.get(String(student._id));
        return {
          id: student._id,
          rollNo: student.rollNumber,
          name: student.name,
          date: dateStr,
          status: att?.status || 'Not marked',
          note: att?.note || null,
          checkInTime: att?.checkInTime || null,
          checkOutTime: att?.checkOutTime || null,
        };
      });

      setData(mappedData);
    } catch (error) {
      console.error("Error loading attendance data:", error);
      toast.error("Failed to load attendance records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAttendanceData(selectedDate);
  }, [selectedDate]);

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

  // Handle Status Update from single row and persist to backend
  const handleStatusChange = async (id, newStatus) => {
    const time = newStatus === 'Present' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null;
    
    // Optimistic UI update
    setData((prev) => 
      prev.map((student) => 
        student.id === id ? { ...student, status: newStatus, checkInTime: time } : student
      )
    );

    try {
      await markAttendance({
        date: selectedDate,
        students: [
          {
            student_id: id,
            status: newStatus,
            checkInTime: time || '',
          },
        ],
      });
      toast.success("Attendance updated");
    } catch (error) {
      console.error("Failed to update attendance on server:", error);
      toast.error(error.response?.data?.message || "Failed to persist attendance change");
      // Re-fetch to synchronize with server state
      loadAttendanceData(selectedDate);
    }
  };

  // Handle bulk save from Take Attendance Modal and persist to backend
  const handleBulkSave = async (updates) => {
    try {
      const payloadStudents = updates.map((u) => ({
        student_id: u.id,
        status: u.status || 'Not marked',
        checkInTime: u.checkInTime || '',
        checkOutTime: u.checkOutTime || '',
        note: u.note || '',
      }));

      await markAttendance({
        date: selectedDate,
        students: payloadStudents,
      });

      toast.success("Attendance saved successfully");
      loadAttendanceData(selectedDate);
    } catch (error) {
      console.error("Failed to save bulk attendance:", error);
      toast.error(error.response?.data?.message || "Failed to save attendance");
    }
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
        <div className="border border-[var(--color-surface-highest)] rounded-[var(--radius-lg)] overflow-visible min-h-[300px]">
          {isLoading ? (
            <div className="h-[300px] flex justify-center items-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
            </div>
          ) : (
            <>
              <AttendanceTable 
                attendanceData={paginatedData} 
                onStatusChange={handleStatusChange}
                onStudentClick={(student) => setSelectedStudentForRecord(student)}
              />
              
              {filteredData.length > 0 && (
                <AttendancePagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredData.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
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
