import dynamic from 'next/dynamic';
import React from 'react';

// Cargar el componente del dashboard dinámicamente sin SSR
const DashboardContent = dynamic(() => import('../components/dashboard/DashboardContent'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
            </div>
        </div>
    )
});

const DashboardPage: React.FC = () => {
    return <DashboardContent />;
};

export default DashboardPage;


