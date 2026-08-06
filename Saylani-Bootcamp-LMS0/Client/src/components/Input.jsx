import React from 'react';
import { LuSearch } from 'react-icons/lu';

const Input = ({ icon, className = '', ...props }) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">{icon}</span>
        </div>
      )}
      <input
        className={`block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
          icon ? 'pl-10' : 'pl-3'
        } pr-3 py-2 border shadow-sm`}
        {...props}
      />
    </div>
  );
};

export default Input;
