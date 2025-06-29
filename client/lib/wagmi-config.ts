import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// Get the correct base URL for the current environment
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://deeds3.vercel.app';
};

if (!projectId || projectId === 'demo') {
  console.warn('Using demo WalletConnect Project ID. Please get your project ID from https://cloud.walletconnect.com');
}

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    metaMask(),
    // Only include WalletConnect if we have a valid project ID
    ...(projectId && projectId !== 'demo' ? [
      walletConnect({ 
        projectId,
        metadata: {
          name: "Deeds3 - Real Estate NFT",
          description: "Decentralized Real Estate Platform",
          url: getBaseUrl(),
          icons: [`${getBaseUrl()}/logo.png`]
        }
      })
    ] : []),
    coinbaseWallet({
      appName: "Deeds3",
      appLogoUrl: `${getBaseUrl()}/logo.png`
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  // Disable automatic reconnection to prevent unwanted wallet prompts
  ssr: false,
  multiInjectedProviderDiscovery: false,
});
