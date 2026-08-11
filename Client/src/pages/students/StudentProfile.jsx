import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, AlertTriangle } from 'lucide-react';
import StudentProfileHeader from '../../components/studentComponents/StudentProfileHeader';
import StudentProfileInfoCard from '../../components/studentComponents/StudentProfileInfoCard';
import StudentRecentPerformance from '../../components/studentComponents/StudentRecentPerformance';
import StudentTeamsProjects from '../../components/studentComponents/StudentTeamsProjects';

const StudentProfile = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const studentName = "Elara Vance"; // Using the mock name from the UI

  const handleDelete = () => {
    // In a real app, you would make an API call here.
    // For now, just navigate back to the students list.
    navigate('/students');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)] flex flex-col">
      
      {/* Page Header (Breadcrumbs + Actions) */}
      <StudentProfileHeader />

      {/* Main Container for the Profile Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col w-full">
        
        {/* Top Info Card */}
        <StudentProfileInfoCard />
        
        {/* Bottom Row: Performance & Teams */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-8">
          <StudentRecentPerformance />
          <StudentTeamsProjects />
        </div>

        {/* Delete Student Action */}
        <div className="flex justify-center sm:justify-end border-t border-[var(--color-surface-highest)] pt-6 mt-auto">
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Trash2 className="h-4 w-4" />
            Delete Student
          </button>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] w-1/3 overflow-hidden p-6 text-center transform transition-all scale-100">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">Delete Student</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Are you sure you want to delete <span className="font-semibold text-[var(--color-text)]">{studentName}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-high)] text-[var(--color-text)] text-sm font-semibold rounded-lg transition-colors border border-[var(--color-border)]"
              >
                No, Keep
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentProfile;
