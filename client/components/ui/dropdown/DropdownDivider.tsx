"use client"

import React, { FC } from 'react';

interface DropdownDividerProps {
  className?: string;
}

const DropdownDivider: FC<DropdownDividerProps> = ({ className = '' }) => {
  return (
    <div 
      className={`border-t border-gray-200 dark:border-gray-700 my-1 ${className}`}
      role="separator"
    />
  );
};

export default DropdownDivider;
