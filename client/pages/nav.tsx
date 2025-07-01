import React from 'react';
import Link from 'next/link';

const NavigationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🎯 Component Navigation
                    </h1>
                    <p className="text-gray-600">Choose which search component to view:</p>
                </div>

                <div className="space-y-6">
                    <Link href="/search-example">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <h2 className="text-2xl font-bold mb-2">🚀 NEW Professional Component</h2>
                            <p className="text-blue-100">TypeScript • Modern UI • Advanced Features</p>
                            <p className="text-sm text-blue-200 mt-2">URL: /search-example</p>
                        </div>
                    </Link>

                    <Link href="/search-demo">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <h2 className="text-2xl font-bold mb-2">🎨 Complete Demo with Integration</h2>
                            <p className="text-purple-100">Full example with mock data and search logic</p>
                            <p className="text-sm text-purple-200 mt-2">URL: /search-demo</p>
                        </div>
                    </Link>

                    <Link href="/">
                        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <h2 className="text-2xl font-bold mb-2">🏠 Original Home Page</h2>
                            <p className="text-gray-200">With the original search component</p>
                            <p className="text-sm text-gray-300 mt-2">URL: /</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
                        <p className="font-semibold">💡 Tip:</p>
                        <p className="text-sm">Si ves el mismo componente, asegúrate de estar en la URL correcta.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationPage;
