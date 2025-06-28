// Global types for Deeds3 project

export interface RealEstateProperty {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  owner: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  address: string;
  name?: string;
  email?: string;
  avatar?: string;
  isConnected: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Creator {
  id: string;
  address: string;
  name: string;
  totalSales: number;
  avatar?: string;
}

export interface AppContextType {
  currentAccount: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getAllRealEstate: () => Promise<RealEstateProperty[]>;
  getPropertiesData: () => Promise<RealEstateProperty[]>;
  getUserPropertiesFunction: (address: string) => Promise<RealEstateProperty[]>;
  totalReviewsFunction: (propertyId: string) => Promise<number>;
  totalRatingFunction: (propertyId: string) => Promise<number>;
  isLoading: boolean;
  error: string | null;
}

export interface WagmiConfigType {
  chains: any[];
  transports: Record<string, any>;
}

// Ethereum provider interface
interface EthereumProvider {
  request: (args: { method: string; params?: any[] | Record<string, any> }) => Promise<any>;
  on: (event: string, callback: (data: any) => void) => void;
  removeListener: (event: string, callback: (data: any) => void) => void;
  isMetaMask?: boolean;
}

// Window extensions for legacy scripts and Ethereum
declare global {
  interface Window {
    jQuery: any;
    $: any;
    Cookies: any;
    VanillaTilt: any;
    ethereum?: EthereumProvider;
  }
}

export {};
