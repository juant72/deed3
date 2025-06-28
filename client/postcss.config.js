const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      // Suprimir warnings de propiedades obsoletas como color-adjust
      overrideBrowserslist: ['> 1%', 'last 2 versions'],
      ignoreUnknownVersions: true,
      cascade: false,
      remove: false, // No remover prefijos automáticamente
      // Configuración para suprimir warnings específicos
      browsers: ['> 1%', 'last 2 versions'],
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
  },
};

module.exports = config;
