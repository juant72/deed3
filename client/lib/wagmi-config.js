import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.warn('WalletConnect Project ID not found. Some features may not work.');
}

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId: projectId || 'demo-project-id',
      metadata: {
        name: "Deeds3 - Real Estate NFT",
        description: "Decentralized Real Estate Platform",
        url: "https://deeds3.vercel.app",
        icons: ["https://deeds3.vercel.app/logo.png"]
      }
    }),
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
});
