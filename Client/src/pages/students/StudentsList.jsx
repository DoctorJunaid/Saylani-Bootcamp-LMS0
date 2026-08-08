import React from 'react';
import { LuSearch, LuPlus, LuFilter } from 'react-icons/lu';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import SideNavBar from '../../components/sideNavbar';

// Dummy data based on the provided Figma design
const MOCK_STUDENTS = [
  { rollNumber: '#102341', initials: 'AK', name: 'Ali Khan', course: 'Web & App Dev', batch: 'Batch 01', team: 'Team 01' },
  { rollNumber: '#102342', initials: 'SA', name: 'Sara Ahmed', course: 'Data Science', batch: 'Batch 02', team: 'Team 04' },
  { rollNumber: '#102343', initials: 'JD', name: 'John Doe', course: 'UI/UX Design', batch: 'Batch 01', team: 'Team 02' },
  { rollNumber: '#102344', initials: 'MG', name: 'Maria Garcia', course: 'Web & App Dev', batch: 'Batch 01', team: 'Team 03' },
];

const courseOptions = [
  { value: 'all', label: 'All Courses' },
  { value: 'web', label: 'Web & App Dev' },
  { value: 'data', label: 'Data Science' },
  { value: 'uiux', label: 'UI/UX Design' },
];

const StudentsList = () => {
  return (
    <>
    <SideNavBar/>
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all enrolled bootcamp participants.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <LuPlus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <Input 
            icon={<LuSearch className="h-4 w-4" />} 
            placeholder="Search by Roll Number or Name..." 
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select 
            options={courseOptions} 
            className="w-full sm:w-48"
          />
          <Button variant="secondary" className="gap-2 shrink-0">
            <LuFilter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable data={MOCK_STUDENTS} />
        <Pagination />
      </div>
    </div>
    <h1>test the student page</h1>
    </>
  );
};

export default StudentsList;
