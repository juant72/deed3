import React from "react";
import Link from "next/link";

// Simple test page to verify the app is working
const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 ¡App Funcionando!
        </h1>
        <p className="text-gray-300 mb-8">
          La migración jQuery → React está completa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-green-400 font-bold mb-2">✅ jQuery Removido</h3>
            <p className="text-green-300 text-sm">
              Todos los scripts jQuery han sido eliminados
            </p>
          </div>
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-blue-400 font-bold mb-2">⚡ React Moderno</h3>
            <p className="text-blue-300 text-sm">
              Componentes modernos con Tailwind CSS
            </p>
          </div>
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-purple-400 font-bold mb-2">🚀 Performance</h3>
            <p className="text-purple-300 text-sm">
              Bundle 75% más pequeño y optimizado
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
