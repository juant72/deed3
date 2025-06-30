import React from "react";

const Loader: React.FC = () => (
    <div className="flex items-center justify-center min-h-[120px] w-full" role="status" aria-label="Cargando...">
        <span className="sr-only">Cargando...</span>
        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
    </div>
);

export default Loader;
