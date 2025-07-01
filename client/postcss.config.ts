// Configuración PostCSS para Tailwind CSS v4
// Esta configuración es compatible con Next.js 15 y Tailwind CSS v4

/** @type {import('postcss').Config} */
const config = {
    plugins: {
        // Plugin oficial de Tailwind CSS v4 para PostCSS
        "@tailwindcss/postcss": {},
    },
};

export default config;
