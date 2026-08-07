import React from 'react';
import { LuChevronDown } from 'react-icons/lu';

const Select = ({ options, className = '', ...props }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none border shadow-sm bg-white"
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <LuChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Select;
