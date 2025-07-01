import type { Config } from 'postcss';

const config: Config = {
    plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {
            // Configuración optimizada para evitar warnings
            overrideBrowserslist: ['> 1%', 'last 2 versions'],
            ignoreUnknownVersions: true,
            cascade: false,
            remove: false,
        },
    },
};

export default config;
