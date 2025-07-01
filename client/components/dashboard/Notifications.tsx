"use client"

import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'offer' | 'message' | 'alert' | 'info';
  message: string;
  time: string;
  read: boolean;
  details?: string;
}

interface NotificationsProps {
  limit?: number;
}

// Dummy notifications data
const dummyNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'offer',
    message: 'New offer on Luxury Villa',
    time: '10m ago',
    read: false,
    details: 'You received a new offer of $1,150,000 for your Luxury Villa property.'
  },
  {
    id: 'notif2',
    type: 'message',
    message: 'Emily responded to your inquiry',
    time: '1h ago',
    read: false,
    details: 'Emily: "Thanks for your interest in the property. I\'m available for a showing this weekend."'
  },
  {
    id: 'notif3',
    type: 'alert',
    message: 'Your listing is trending!',
    time: '3h ago',
    read: true,
    details: 'Your Modern Apartment listing is getting 200% more views than similar properties in the area.'
  },
  {
    id: 'notif4',
    type: 'info',
    message: 'Price changed in your area',
    time: '1d ago',
    read: true,
    details: 'Property values in your neighborhood have increased by 5% in the last month.'
  }
];

const Notifications: React.FC<NotificationsProps> = ({ limit = 3 }) => {
  // In a real app, we'd fetch user notifications
  // Here we're using the dummy data with state for interactions
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  
  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, limit);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Handle marking notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Handle deleting a notification
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  // Handle expanding/collapsing notification details
  const toggleDetails = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
        </span>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <button 
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={markAllAsRead}
              aria-label="Mark all notifications as read"
            >
              Mark all read
            </button>
          )}
          <button 
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => setShowAllNotifications(!showAllNotifications)}
            aria-expanded={showAllNotifications}
          >
            {showAllNotifications ? 'Show less' : 'View all'}
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700" aria-live="polite">
        {displayedNotifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No new notifications
          </div>
        ) : (
          displayedNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`py-2 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''} 
                           ${expandedNotification === notification.id ? 'shadow-sm' : ''}`}
            >
              <div 
                className="flex items-start cursor-pointer" 
                onClick={() => {
                  markAsRead(notification.id);
                  toggleDetails(notification.id);
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedNotification === notification.id}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    markAsRead(notification.id);
                    toggleDetails(notification.id);
                  }
                }}
              >
                <div className="mr-3 mt-1">
                  {notification.type === 'offer' && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </span>
                  )}
                  {notification.type === 'message' && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </span>
                  )}
                  {notification.type === 'alert' && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                      <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </span>
                  )}
                  {notification.type === 'info' && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <span className="ml-2 flex-shrink-0 h-2 w-2 bg-blue-600 rounded-full" aria-label="Unread"></span>
                )}
              </div>
              
              {/* Expanded notification details */}
              {expandedNotification === notification.id && notification.details && (
                <div className="mt-2 pl-11 text-sm text-gray-600 dark:text-gray-300">
                  <p className="mb-2">{notification.details}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button 
                      className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      aria-label={`Delete notification about ${notification.message}`}
                    >
                      Delete
                    </button>
                    <button 
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDetails(notification.id);
                      }}
                      aria-label="Close details"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Clear all button */}
      {displayedNotifications.length > 0 && (
        <div className="pt-2 flex justify-center">
          <button 
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setNotifications([])}
            aria-label="Clear all notifications"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
