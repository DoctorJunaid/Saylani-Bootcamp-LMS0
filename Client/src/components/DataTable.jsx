import React from 'react';
import { LuEye, LuPenLine } from 'react-icons/lu';
import Avatar from './Avatar';

const DataTable = ({ data, className = '' }) => {
  return (
    <div className={`overflow-x-auto ring-1 ring-gray-300 sm:rounded-lg ${className}`}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">
              Roll Number
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Student Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Batch
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((student) => (
            <tr key={student.rollNumber} className="hover:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {student.rollNumber}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                <div className="flex items-center gap-3">
                  <Avatar initials={student.initials} />
                  <span className="font-medium">{student.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {student.course}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {student.batch}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {student.team}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors">
                    <LuEye className="h-4 w-4" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <LuPenLine className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
