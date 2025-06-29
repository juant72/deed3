import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

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
          url: "https://deeds3.vercel.app",
          icons: ["https://deeds3.vercel.app/logo.png"]
        }
      })
    ] : []),
    coinbaseWallet({
      appName: "Deeds3",
      appLogoUrl: "https://deeds3.vercel.app/logo.png"
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
