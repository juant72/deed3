"use client"

import React, { FC } from 'react';

interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownLabel: FC<DropdownLabelProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 ${className}`}
      role="presentation"
    >
      {children}
    </div>
  );
};

export default DropdownLabel;
