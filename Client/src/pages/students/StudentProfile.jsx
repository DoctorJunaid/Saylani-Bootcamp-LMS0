import React from 'react';
import StudentProfileHeader from '../../components/studentComponents/StudentProfileHeader';
import StudentProfileInfoCard from '../../components/studentComponents/StudentProfileInfoCard';
import StudentRecentPerformance from '../../components/studentComponents/StudentRecentPerformance';
import StudentTeamsProjects from '../../components/studentComponents/StudentTeamsProjects';

const StudentProfile = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)] flex flex-col">
      
      {/* Page Header (Breadcrumbs + Actions) */}
      <StudentProfileHeader />

      {/* Main Container for the Profile Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col w-full">
        
        {/* Top Info Card */}
        <StudentProfileInfoCard />
        
        {/* Bottom Row: Performance & Teams */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <StudentRecentPerformance />
          <StudentTeamsProjects />
        </div>

      </div>

    </div>
  );
};

export default StudentProfile;
