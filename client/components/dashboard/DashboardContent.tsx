import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const DashboardContent: React.FC = () => {
    const { user } = useAuth();
    const { effectiveTheme, updateTheme } = useTheme();
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Toggle fullscreen mode
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable fullscreen: ${e.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
            <header className="bg-white dark:bg-slate-900 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deed3 Dashboard</h1>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => updateTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800"
                            aria-label={effectiveTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {effectiveTheme === 'dark' ? (
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800"
                            aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
                        >
                            {isFullscreen ? (
                                <svg className="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                                </svg>
                            )}
                        </button>

                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {user?.name || 'Invitado'}
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Dashboard userId={user?.id} className="mb-8" />

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Panel de Control Rápido</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Este panel de propiedades incluye todas las mejoras de accesibilidad, personalización y visualización de datos
                        desarrolladas durante el Sprint 2.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Accesibilidad</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Navegación completa por teclado, etiquetas ARIA y alto contraste en todos los componentes.
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Personalización</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Exportación de datos, modo oscuro/claro y opción para reorganizar widgets.
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Visualización</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Gráficos interactivos con tooltips y filtrado avanzado de datos.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardContent;
