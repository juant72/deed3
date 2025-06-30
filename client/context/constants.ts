import realEstate from "./RealEstate.json";

// Contract configuration
export const REAL_ESTATE_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
export const REAL_ESTATE_ABI = realEstate.abi;

// PINATA KEYS
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
export const PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";

// Network interface
interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// Network configurations
const networks: Record<string, NetworkConfig> = {
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-amoy-bor-rpc.publicnode.com"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://basescan.org/"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
};

// Active network - can be changed based on environment
export const ACTIVE_NETWORK = networks.polygon_amoy;

// Network switching utility
export const handleNetworkSwitch = async (networkName: keyof typeof networks): Promise<void> => {
  const networkInfo = networks[networkName];
  if (!networkInfo) {
    throw new Error(`Unknown network: ${networkName}`);
  }

  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkInfo.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkInfo],
          });
        } catch (addError) {
          console.log("Error adding network: ", addError);
          throw addError;
        }
      } else {
        console.log("Error switching network: ", error);
        throw error;
      }
    }
  } else {
    throw new Error("MetaMask is not installed");
  }
};

// Export types
export type { NetworkConfig };
export { networks };
