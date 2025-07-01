/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './PageComponents/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            // Configuraciones personalizadas aquí
            colors: {
                // Colores personalizados si los necesitas
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "fade-in": "fade-in 0.3s ease-in-out",
                "fade-out": "fade-out 0.3s ease-in-out",
                "scale-in": "scale-in 0.3s ease-in-out",
                "scale-out": "scale-out 0.3s ease-in-out",
                "slide-in": "slide-in 0.3s ease-in-out",
                "slide-out": "slide-out 0.3s ease-in-out",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "scale-out": {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "100%": { transform: "scale(0.9)", opacity: "0" },
                },
                "slide-in": {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "slide-out": {
                    "0%": { transform: "translateY(0)", opacity: "1" },
                    "100%": { transform: "translateY(10px)", opacity: "0" },
                },
            },
        },
    },
}
