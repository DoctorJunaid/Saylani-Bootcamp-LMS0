import React from 'react';

const Avatar = ({ initials, className = '' }) => {
  // We can add logic here to generate random background colors based on initials if needed,
  // but for now we'll stick to a clean gray background.
  return (
    <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border border-gray-200 ${className}`}>
      <span className="text-xs font-medium text-gray-600">{initials}</span>
    </div>
  );
};

export default Avatar;
