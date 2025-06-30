import React from "react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center space-y-6">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-2xl font-bold leading-none">Encrypia</span>
                            <span className="text-blue-400 text-sm font-medium leading-none">Deeds3</span>
                        </div>
                    </div>
                </div>

                {/* Mensaje de estado */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        🚀 Sistema Iniciando
                    </h1>
                    <p className="text-xl text-gray-300">
                        Plataforma de Real Estate descentralizada
                    </p>
                    <div className="text-green-400 font-mono text-sm">
                        ✅ Fase 1: Base mínima cargada exitosamente
                    </div>
                </div>

                {/* Indicador de carga */}
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>

                {/* Estado del sistema */}
                <div className="bg-black/20 rounded-lg p-4 max-w-md mx-auto">
                    <h3 className="text-white font-semibold mb-2">Estado del Sistema:</h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Next.js:</span>
                            <span className="text-green-400">✅ Funcionando</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">React:</span>
                            <span className="text-green-400">✅ Funcionando</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Tailwind:</span>
                            <span className="text-green-400">✅ Funcionando</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Web3:</span>
                            <span className="text-yellow-400">⏳ Pendiente</span>
                        </div>
                    </div>
                </div>

                {/* Siguiente paso */}
                <div className="text-gray-400 text-sm">
                    Próximo: Agregar layout básico y navegación
                </div>
            </div>
        </div>
    );
}
