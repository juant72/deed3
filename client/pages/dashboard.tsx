"use client"

import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Dashboard</h1>
      
      <Dashboard userId={user?.id} />
    </div>
  );
};

export default DashboardPage;
