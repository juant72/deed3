"use client"

import React from 'react';

interface RecentActivityProps {
  userId?: string;
}

// Dummy activity data for demonstration
const dummyActivities = [
  {
    id: 'act1',
    type: 'Property View',
    description: 'Someone viewed your Modern Apartment listing',
    date: '2025-06-30T10:25:00',
    property: 'Modern Apartment in Downtown'
  },
  {
    id: 'act2',
    type: 'New Offer',
    description: 'You received a new offer for Luxury Villa',
    date: '2025-06-29T16:42:00',
    property: 'Luxury Villa with Pool'
  },
  {
    id: 'act3',
    type: 'Message',
    description: 'John Smith sent you a message about Commercial Office Space',
    date: '2025-06-29T09:18:00',
    property: 'Commercial Office Space'
  },
  {
    id: 'act4',
    type: 'Property Like',
    description: 'Your Modern Apartment listing received a new like',
    date: '2025-06-28T14:32:00',
    property: 'Modern Apartment in Downtown'
  },
  {
    id: 'act5',
    type: 'Document Update',
    description: 'Deed verification document was updated',
    date: '2025-06-27T11:05:00',
    property: 'Luxury Villa with Pool'
  }
];

// Helper to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const RecentActivity: React.FC<RecentActivityProps> = ({ userId }) => {
  // In a real app, we'd fetch user activities with userId
  // Here we're using the dummy data
  const activities = dummyActivities;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activity</h1>
      
      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Activity items */}
        <div className="space-y-8 relative">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="relative flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10 mr-4">
                  {activity.type === 'Property View' && (
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                  {activity.type === 'New Offer' && (
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {activity.type === 'Message' && (
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  )}
                  {activity.type === 'Property Like' && (
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  )}
                  {activity.type === 'Document Update' && (
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{activity.type}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.date)}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{activity.description}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Related to: </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">{activity.property}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
