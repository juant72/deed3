import type { Config } from 'tailwindcss';
import { designTokens } from './styles/design-tokens';

const config: Config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './PageComponents/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },

        // Import design tokens
        colors: designTokens.colors,
        fontFamily: designTokens.typography.fontFamily,
        fontSize: designTokens.typography.fontSize,
        fontWeight: designTokens.typography.fontWeight,
        spacing: designTokens.spacing,
        borderRadius: designTokens.borderRadius,
        boxShadow: designTokens.boxShadow,
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "spin-slow": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
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
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin-slow": "spin-slow 3s linear infinite",
                "fade-in": "fade-in 0.3s ease-in-out",
                "fade-out": "fade-out 0.3s ease-in-out",
                "scale-in": "scale-in 0.3s ease-in-out",
                "scale-out": "scale-out 0.3s ease-in-out",
                "slide-in": "slide-in 0.3s ease-in-out",
                "slide-out": "slide-out 0.3s ease-in-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
    ],
};

export default config;
