"use client"

import React from 'react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel } from '../components/ui/dropdown';
import { AlertProvider, useAlerts } from '../components/ui/alerts/AlertProvider';
import { Button } from '../components/ui/button';

// Demo component to showcase the new UI components
const UIComponentsDemo = () => {
  return (
    <AlertProvider>
      <DemoContent />
    </AlertProvider>
  );
};

// Inner content using the alerts hook (must be inside AlertProvider)
const DemoContent = () => {
  const { addAlert } = useAlerts();
  
  // Show example alerts
  const showSuccessAlert = () => {
    addAlert({
      type: 'success',
      title: 'Success',
      message: 'Your changes have been saved successfully.',
    });
  };
  
  const showErrorAlert = () => {
    addAlert({
      type: 'error',
      title: 'Error',
      message: 'There was a problem processing your request.',
      duration: 0, // No auto-close
    });
  };
  
  const showWarningAlert = () => {
    addAlert({
      type: 'warning',
      message: 'Your session will expire in 5 minutes.',
    });
  };
  
  const showInfoAlert = () => {
    addAlert({
      type: 'info',
      message: 'New feature available! Check out the dashboard.',
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">UI Components</h1>
      
      {/* Alerts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Alerts & Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button onClick={showSuccessAlert}>Show Success Alert</Button>
          <Button onClick={showErrorAlert}>Show Error Alert</Button>
          <Button onClick={showWarningAlert}>Show Warning Alert</Button>
          <Button onClick={showInfoAlert}>Show Info Alert</Button>
        </div>
      </section>
      
      {/* Dropdowns Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Dropdowns & Menus</h2>
        <div className="flex flex-wrap gap-6">
          {/* User dropdown */}
          <Dropdown 
            trigger={
              <Button variant="outline" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                User Menu
              </Button>
            }
            align="right"
            width={240}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
            </div>
            <DropdownItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              }
              onClick={() => addAlert({ type: 'info', message: 'Profile clicked' })}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              }
              onClick={() => addAlert({ type: 'info', message: 'Settings clicked' })}
            >
              Settings
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              }
              destructive
              onClick={() => addAlert({ type: 'warning', message: 'You logged out' })}
            >
              Log out
            </DropdownItem>
          </Dropdown>
          
          {/* Filter dropdown */}
          <Dropdown 
            trigger={
              <Button variant="outline">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Filter
              </Button>
            }
          >
            <DropdownLabel>Filter Options</DropdownLabel>
            <DropdownItem active>All Properties</DropdownItem>
            <DropdownItem>For Sale</DropdownItem>
            <DropdownItem>For Rent</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Price: Low to High</DropdownItem>
            <DropdownItem>Price: High to Low</DropdownItem>
            <DropdownItem disabled>Most Recent (Premium)</DropdownItem>
          </Dropdown>
        </div>
      </section>
    </div>
  );
};

export default UIComponentsDemo;
