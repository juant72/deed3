"use client"

import React, { useState } from 'react';
import PropertySummary from './PropertySummary';
import RecentActivity from './RecentActivity';
import Statistics from './Statistics';
import Notifications from './Notifications';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';

export interface DashboardProps {
  userId?: string;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId, className = '' }) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'activity' | 'stats'>('properties');

  return (
    <div className={`w-full bg-white dark:bg-slate-900 shadow-md rounded-xl ${className}`}>
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
