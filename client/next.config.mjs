/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disabled to avoid WalletConnect double init
  // Optimizaciones de rendimiento
  experimental: {
    optimizePackageImports: ['ethers', 'wagmi'],
  },
  // Configuración para evitar SSG en páginas con hooks de Wagmi
  trailingSlash: false,
  poweredByHeader: false,
  // Deshabilitar ISR y SSG para evitar errores con hooks de Wagmi
  generateBuildId: async () => {
    return 'wagmi-client-build';
  },
  // Configuración para suprimir warnings específicos
  onDemandEntries: {
    // Evitar warnings de webpack cache
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    // Configuraciones para desarrollo
    if (dev && !isServer) {
      // Configurar logging para reducir warnings
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Suprimir warnings de serialización de cache
      config.cache = {
        type: 'filesystem',
        compression: 'gzip',
        buildDependencies: {
          config: [import.meta.url],
        },
        // Configurar cache para evitar warnings de serialización
        store: 'pack',
        version: '1.0.0',
      };
      
      // Configurar stats para ocultar warnings específicos
      config.stats = {
        warningsFilter: [
          /autoprefixer/,
          /color-adjust/,
          /print-color-adjust/,
          /Failed to parse source map/,
          /Critical dependency/,
          /webpack.cache.PackFileCacheStrategy/,
          /No serializer registered for Warning/,
          /Can't resolve 'pino-pretty'/,
          /Module not found.*pino-pretty/,
        ],
      };
      
      // Optimizar CSS y JS para evitar warnings
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
      
      // Filtrar warnings específicos de CSS
      config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          plugin.options = plugin.options || {};
          plugin.options.ignoreOrder = true;
        }
      });
    }
    
    return config;
  },
};

export default nextConfig;
