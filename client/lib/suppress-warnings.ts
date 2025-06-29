/**
 * PostCSS plugin to suppress specific warnings
 */
interface HelperResult {
  warn: (text: string, opts?: any) => void;
}

interface Helpers {
  result: HelperResult;
}

interface PostCSSPlugin {
  postcssPlugin: string;
  OnceExit: (root: any, helpers: Helpers) => void;
}

const suppressWarnings = (): PostCSSPlugin => {
  return {
    postcssPlugin: 'suppress-warnings',
    OnceExit(root: any, helpers: Helpers) {
      // Suprimir warnings específicos
      const originalWarn = helpers.result.warn;
      helpers.result.warn = function(text: string, opts: any = {}) {
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

(suppressWarnings as any).postcss = true;

export default suppressWarnings;
