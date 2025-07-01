"use client"

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number | string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  width = 'auto',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  // Calculate dropdown position styles
  const dropdownStyles = {
    width: typeof width === 'number' ? `${width}px` : width,
    [align === 'left' ? 'left' : 'right']: 0,
  };
  
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger element */}
      <div
        onClick={toggleDropdown}
        className="cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {trigger}
      </div>
      
      {/* Dropdown content */}
      <div
        className={`absolute mt-2 z-50 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 transition-all origin-top-right ${
          isOpen
            ? 'transform opacity-100 scale-100'
            : 'transform opacity-0 scale-95 pointer-events-none'
        }`}
        style={dropdownStyles}
        aria-hidden={!isOpen}
        role="menu"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
