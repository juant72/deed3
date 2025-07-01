import React from 'react';

export default function TestTailwind() {
    return (
        <div className="p-8 bg-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Test Tailwind CSS v4</h1>
            <p className="text-lg">Si ves este texto en azul con padding, ¡Tailwind funciona!</p>
            <div className="flex space-x-4 mt-4">
                <div className="bg-red-500 p-4 rounded">Caja Roja</div>
                <div className="bg-green-500 p-4 rounded">Caja Verde</div>
                <div className="bg-yellow-500 p-4 rounded text-black">Caja Amarilla</div>
            </div>
        </div>
    );
}
