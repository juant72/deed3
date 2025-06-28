const config = {
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

module.exports = config;
