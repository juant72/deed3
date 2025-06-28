/**
 * PostCSS plugin to suppress specific warnings
 */
const suppressWarnings = () => {
  return {
    postcssPlugin: 'suppress-warnings',
    OnceExit(root, helpers) {
      // Suprimir warnings específicos
      const originalWarn = helpers.result.warn;
      helpers.result.warn = function(text, opts = {}) {
        // Filtrar warnings de color-adjust y otros deprecated
        if (
          text.includes('color-adjust') ||
          text.includes('print-color-adjust') ||
          text.includes('autoprefixer:') ||
          text.includes('deprecated')
        ) {
          return; // No mostrar estos warnings
        }
        return originalWarn.call(this, text, opts);
      };
    }
  };
};

suppressWarnings.postcss = true;

module.exports = suppressWarnings;
