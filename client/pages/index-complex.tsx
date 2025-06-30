import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✅ Next.js está funcionando
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sin errores de hidratación - overlay restaurada
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          jQuery completamente eliminado - React moderno funcionando
        </div>
      </div>
    </div>
  );
};

export default Home;
