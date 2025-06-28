/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disabled to avoid WalletConnect double init
  // Suprimir warnings específicos
  onDemandEntries: {
    // Evitar warnings de webpack cache
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    // Suprimir warnings específicos en desarrollo
    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Filtrar warnings específicos de CSS
      const originalEmit = config.infrastructureLogging?.level;
      config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          plugin.options.ignoreOrder = true;
        }
      });
    }
    
    return config;
  },
};

export default nextConfig;
