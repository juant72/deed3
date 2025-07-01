"use client"

import React, { useEffect, useRef } from 'react';

export interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  destructive?: boolean;
  active?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
  className = '',
  destructive = false,
  active = false,
}) => {
  const itemRef = useRef<HTMLButtonElement>(null);
  
  // Focus this item if it's active
  useEffect(() => {
    if (active && itemRef.current) {
      itemRef.current.focus();
    }
  }, [active]);
  
  const baseClasses = "flex w-full items-center px-4 py-2 text-sm";
  const enabledClasses = destructive
    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700";
  const disabledClasses = "text-gray-400 dark:text-gray-500 cursor-not-allowed";
  const activeClasses = active ? "bg-gray-100 dark:bg-slate-700" : "";
  
  return (
    <button
      ref={itemRef}
      type="button"
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${activeClasses} ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
    </button>
  );
};

export default DropdownItem;
