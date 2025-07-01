"use client"

import React, { useState } from 'react';
import PropertySummary from './PropertySummary';
import RecentActivity from './RecentActivity';
import Statistics from './Statistics';
import Notifications from './Notifications';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface DashboardProps {
  userId?: string;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId, className = '' }) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'activity' | 'stats' | 'settings'>('properties');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [customizationMode, setCustomizationMode] = useState(false);
  
  // Función para exportar datos
  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    // En una implementación real, esto llamaría a una API para generar y descargar el archivo
    console.log(`Exporting dashboard in ${format} format`);
    alert(`Dashboard data would be exported as ${format} (Función simulada)`);
    setShowExportOptions(false);
  };

  return (
    <div className={`w-full bg-white dark:bg-slate-900 shadow-md rounded-xl ${className}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={() => setShowExportOptions(!showExportOptions)}
              aria-haspopup="true"
              aria-expanded={showExportOptions}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export
            </Button>
            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700" 
                    role="menuitem"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700" 
                    role="menuitem"
                    onClick={() => handleExport('csv')}
                  >
                    Export as CSV
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700" 
                    role="menuitem"
                    onClick={() => handleExport('excel')}
                  >
                    Export as Excel
                  </button>
                </div>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={() => setCustomizationMode(!customizationMode)}
            aria-pressed={customizationMode}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {customizationMode ? 'Save Layout' : 'Customize'}
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 p-4 border-r border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Dashboard</h2>
          
          <nav className="flex flex-col space-y-1" aria-label="Dashboard Navigation">
            <Button 
              variant={activeTab === 'properties' ? 'default' : 'ghost'} 
              className="justify-start"
              onClick={() => setActiveTab('properties')}
              aria-current={activeTab === 'properties' ? 'page' : undefined}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Properties
            </Button>
            <Button 
              variant={activeTab === 'activity' ? 'default' : 'ghost'}
              className="justify-start"
              onClick={() => setActiveTab('activity')}
              aria-current={activeTab === 'activity' ? 'page' : undefined}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Recent Activity
            </Button>
            <Button 
              variant={activeTab === 'stats' ? 'default' : 'ghost'}
              className="justify-start"
              onClick={() => setActiveTab('stats')}
              aria-current={activeTab === 'stats' ? 'page' : undefined}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Statistics
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              className="justify-start"
              onClick={() => setActiveTab('settings')}
              aria-current={activeTab === 'settings' ? 'page' : undefined}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Settings
            </Button>
          </nav>
          
          <div className="mt-8">
            <h3 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">Notifications</h3>
            <Notifications />
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 p-6">
          {activeTab === 'properties' && (
            <PropertySummary userId={userId} />
          )}
          
          {activeTab === 'activity' && (
            <RecentActivity userId={userId} />
          )}
          
          {activeTab === 'stats' && (
            <Statistics userId={userId} />
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard Settings</h1>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Personalization</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default View</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white">
                      <option value="properties">Properties</option>
                      <option value="activity">Recent Activity</option>
                      <option value="stats">Statistics</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Refresh Interval</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white">
                      <option value="30">Every 30 seconds</option>
                      <option value="60">Every minute</option>
                      <option value="300">Every 5 minutes</option>
                      <option value="600">Every 10 minutes</option>
                      <option value="3600">Every hour</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="show-notifications" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700"
                      defaultChecked
                    />
                    <label htmlFor="show-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Show desktop notifications
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chart Style</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input 
                          id="chart-style-bar" 
                          name="chart-style" 
                          type="radio" 
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                          defaultChecked
                        />
                        <label htmlFor="chart-style-bar" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Bar
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="chart-style-line" 
                          name="chart-style" 
                          type="radio" 
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                        <label htmlFor="chart-style-line" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Line
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="chart-style-area" 
                          name="chart-style" 
                          type="radio" 
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                        <label htmlFor="chart-style-area" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Area
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {customizationMode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard Customization</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Drag and drop widgets to rearrange your dashboard layout.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setCustomizationMode(false)} className="mr-2">
                    Cancel
                  </Button>
                  <Button onClick={() => setCustomizationMode(false)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
