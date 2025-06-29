import React, { useEffect, useState, createContext, useContext, ReactNode, useMemo } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import {
  PINATA_API_KEY,
  PINATA_SECRECT_KEY,
  REAL_ESTATE_ABI,
  REAL_ESTATE_ADDRESS,
  handleNetworkSwitch,
  ACTIVE_NETWORK,
} from "./constants";

import { AppContextType, RealEstateProperty, Review } from "../types/global";

// Extended context type
interface ExtendedAppContextType extends AppContextType {
  address: string;
  accountBalance: string;
  userBlance: string;
  checkIfWalletConnected: () => Promise<string | null>;
  uploadToIPFS: (file: File) => Promise<string | null>;
  createRealEstate: (
    price: number,
    title: string,
    category: string,
    images: string,
    description: string,
    address: string,
    roomNumber: number,
    client: any
  ) => Promise<any>;
  getSinglePropertyFunction: (index: number) => Promise<RealEstateProperty | null>;
  getPropertyFunction: (index: number) => Promise<RealEstateProperty | null>;
  getProductReviewsFunction: (productId: string) => Promise<Review[]>;
  addReviewFunction: (review: any) => Promise<any>;
  getHighestRatedProduct: () => Promise<RealEstateProperty[]>;
  buyRealEstate: (index: number, price: number, client: any) => Promise<any>;
  updatePrice: (index: number, newPrice: number, client: any) => Promise<any>;
  updateRealEstate: (index: number, client: any) => Promise<any>;
  connectingWithSmartContract: (client: any) => Promise<ethers.Contract>;
  fetchData: () => Promise<void>;
  REAL_ESTATE_ADDRESS: string;
  REAL_ESTATE_ABI: any;
  PINATA_API_KEY: string;
  PINATA_SECRECT_KEY: string;
  loader: boolean;
  setLoader: (loading: boolean) => void;
  notifySuccess: (msg: string) => void;
  notifyError: (msg: string) => void;
}

// Create context
const StateContext = createContext<ExtendedAppContextType | null>(null);

//FETCH CONTRACT
const FETCH_CONTRACT = (PROVIDER: ethers.ContractRunner) => {
  if (!REAL_ESTATE_ADDRESS) {
    throw new Error("Contract address not configured");
  }
  return new ethers.Contract(REAL_ESTATE_ADDRESS, REAL_ESTATE_ABI, PROVIDER);
};

//CONNECTING WITH CONTRACT using Wagmi
const connectingWithSmartContract = async (client: any): Promise<ethers.Contract> => {
  try {
    if (!client) {
      throw new Error("No wallet client available");
    }

    // Create ethers provider from wagmi client
    const provider = new ethers.BrowserProvider(client);
    
    if (!provider) {
      throw new Error("No provider found");
    }

    const signer = await provider.getSigner();
    
    if (!signer) {
      throw new Error("No valid signer");
    }

    const contract = FETCH_CONTRACT(signer);    

    // Provider connected successfully
    return contract;
  } catch (error) {
    // Error connecting with Smart Contract
    throw error;
  }
};

//ACCOUNT BALANCE
const fetchAccountBalance = async (address: string): Promise<string | null> => {
  try {
    if (!address) return null;
    
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    }
    return null;
  } catch (error) {
    // Error fetching account balance
    return null;
  }
};

//CHECK IF WALLET CONNECTED - Enhanced to prevent unwanted prompts
const checkIfWalletConnected = async (): Promise<string | null> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      return null;
    }

    // Use eth_accounts instead of eth_requestAccounts to avoid prompts
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts && accounts.length > 0) {
      return accounts[0];
    } else {
      return null;
    }
  } catch (error: any) {
    // Silently handle errors to avoid extension noise
    return null;
  }
};

//CONNECT WALLET - Enhanced to prevent automatic triggering
const connectWallet = async (): Promise<string | undefined> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      // No ethereum provider available
      return undefined;
    }

    // Only request accounts when explicitly called (user action)
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    
    return undefined;
  } catch (error: any) {
    // Handle user rejection gracefully
    if (error?.code === 4001 || error?.message?.includes('User rejected')) {
      // User cancelled the connection request
      return undefined;
    }
    
    // For other errors, don't log to avoid extension noise
    return undefined;
  }
};

//UPLOAD TO IPFS
const uploadToIPFS = async (file: File): Promise<string | null> => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRECT_KEY) {
      throw new Error("PINATA API keys not configured");
    }

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: "File",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRECT_KEY,
        },
        body: formData,
      }
    );

    const responseData = await response.json();
    // Debug log removed

    const ImgHash = `ipfs://${responseData.IpfsHash}`;
    return ImgHash;
  } catch (error) {
    // Debug log removed
    return null;
  }
};

//CREATE REAL ESTATE
const createRealEstate = async (
  price: number,
  title: string,
  category: string,
  images: string,
  description: string,
  address: string,
  roomNumber: number,
  client: any
): Promise<any> => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(price.toString(), "ether");

    const transaction = await (contract as any).createRealEstate(
      propertyPrice,
      title,
      category,
      images,
      description,
      address,
      roomNumber
    );

    await transaction.wait();
    // Debug log removed
    toast.success("Property created successfully!");
    
    return transaction;
  } catch (error) {
    // Debug log removed
    toast.error("Failed to create property");
    throw error;
  }
};

//GET ALL REAL ESTATE
const getAllRealEstate = async (): Promise<RealEstateProperty[]> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      return [];
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = FETCH_CONTRACT(provider);

    const properties = await (contract as any).getAllRealEstate();
    
    const parsedProperties: RealEstateProperty[] = properties.map((property: any, i: number) => ({
      id: i.toString(),
      price: ethers.formatEther(property.price.toString()),
      title: property.title,
      category: property.category,
      images: property.images.split(","),
      description: property.description,
      location: property.propertyAddress,
      owner: property.owner,
      isActive: !property.sold,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return parsedProperties;
  } catch (error) {
    // Debug log removed
    return [];
  }
};

//BUY REAL ESTATE
const buyRealEstate = async (index: number, price: number, client: any): Promise<any> => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(price.toString(), "ether");

    const transaction = await (contract as any).buyRealEstate(index, {
      value: propertyPrice,
    });

    await transaction.wait();
    // Debug log removed
    toast.success("Property purchased successfully!");
    
    return transaction;
  } catch (error) {
    // Debug log removed
    toast.error("Failed to purchase property");
    throw error;
  }
};

//UPDATE REAL ESTATE PRICE
const updatePrice = async (index: number, newPrice: number, client: any): Promise<any> => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(newPrice.toString(), "ether");

    const transaction = await (contract as any).updatePrice(index, propertyPrice);

    await transaction.wait();
    // Debug log removed
    toast.success("Price updated successfully!");
    
    return transaction;
  } catch (error) {
    // Debug log removed
    toast.error("Failed to update price");
    throw error;
  }
};

//UPDATE REAL ESTATE STATUS
const updateRealEstate = async (index: number, client: any): Promise<any> => {
  try {
    const contract = await connectingWithSmartContract(client);

    const transaction = await (contract as any).updateRealEstate(index);

    await transaction.wait();
    // Debug log removed
    toast.success("Property status updated successfully!");
    
    return transaction;
  } catch (error) {
    // Debug log removed
    toast.error("Failed to update property status");
    throw error;
  }
};

//TOTAL REVIEWS FUNCTION (placeholder)
const totalReviewsFunction = async (propertyId: string): Promise<number> => {
  try {
    // This would normally fetch from the contract
    // For now returning 0 to prevent errors
    return 0;
  } catch (error) {
    // Debug log removed
    return 0;
  }
};

//TOTAL RATING FUNCTION (placeholder)
const totalRatingFunction = async (propertyId: string): Promise<number> => {
  try {
    // This would normally fetch and calculate average rating
    // For now returning 0 to prevent errors
    return 0;
  } catch (error) {
    // Debug log removed
    return 0;
  }
};

//GET HIGHEST RATED PRODUCT (placeholder)
const getHighestRatedProduct = async (): Promise<RealEstateProperty[]> => {
  try {
    // This would normally fetch and sort by rating
    // For now returning empty array to prevent errors
    return [];
  } catch (error) {
    // Debug log removed
    return [];
  }
};

//GET SINGLE PROPERTY
const getSinglePropertyFunction = async (index: number): Promise<RealEstateProperty | null> => {
  try {
    const allProperties = await getAllRealEstate();
    return allProperties[index] || null;
  } catch (error) {
    // Debug log removed
    return null;
  }
};

//GET PROPERTY FUNCTION (alias for getSinglePropertyFunction)
const getPropertyFunction = getSinglePropertyFunction;

//REVIEW FUNCTIONS (placeholders to prevent errors)
const getProductReviewsFunction = async (productId: string): Promise<Review[]> => {
  try {
    // Placeholder - would fetch reviews for specific property
    return [];
  } catch (error) {
    // Debug log removed
    return [];
  }
};

const addReviewFunction = async (review: any): Promise<any> => {
  try {
    // Debug log removed
    toast.success("Review functionality will be implemented soon!");
    return null;
  } catch (error) {
    // Debug log removed
    toast.error("Failed to add review");
    return null;
  }
};

interface StateContextProviderProps {
  children: ReactNode;
}

//STATE CONTEXT PROVIDER
export const StateContextProvider: React.FC<StateContextProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  // Toast notifications
  const notifySuccess = (msg: string) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg: string) => toast.error(msg, { duration: 2000 });

  //GET USER PROPERTIES (moved inside component to access address state)
  const getUserPropertiesFunction = async (userAddress?: string): Promise<RealEstateProperty[]> => {
    try {
      const allProperties = await getAllRealEstate();
      const currentAddress = userAddress || address;
      
      if (!currentAddress) return [];
      
      // Filter properties owned by the user
      const userProperties = allProperties.filter(
        property => property.owner?.toLowerCase() === currentAddress.toLowerCase()
      );
      
      return userProperties;
    } catch (error) {
      // Debug log removed
      return [];
    }
  };

  //CHECK WALLET CONNECTION
  const fetchData = async (): Promise<void> => {
    try {
      // No need to pass parameters to handleNetworkSwitch
      // await handleNetworkSwitch("polygon_amoy");

      //GET ACCOUNT
      const account = await checkIfWalletConnected();
      setAddress(account || "");

      //GET BALANCE
      if (account) {
        const balance = await fetchAccountBalance(account);
        setAccountBalance(balance || "");
      }
    } catch (error) {
      // Debug log removed
    }
  };

  useEffect(() => {
    // Only fetch data if explicitly requested, avoid auto-connection
    // fetchData();
  }, []);

  //CONNECT WALLET FUNCTION - Enhanced with better error handling
  const connectWalletFunction = async (): Promise<void> => {
    try {
      // Only proceed if user explicitly requests connection
      const account = await connectWallet();
      
      if (account) {
        setAddress(account);
        
        // Fetch balance only after successful connection
        const balance = await fetchAccountBalance(account);
        setAccountBalance(balance || "");
      }
    } catch (error: any) {
      // Handle errors gracefully without logging extension noise
      if (error?.code !== 4001 && !error?.message?.includes('User rejected')) {
        // Only show errors that aren't user rejections or extension issues
        console.error('Wallet connection error:', error);
      }
    }
  };

  const disconnectWallet = (): void => {
    setAddress("");
    setAccountBalance("");
  };

  const contextValue: ExtendedAppContextType = useMemo(() => ({
    // Account state
    address,
    accountBalance,
    currentAccount: address,
    userBlance: accountBalance,
    
    // Functions
    connectWallet: connectWalletFunction,
    disconnectWallet,
    checkIfWalletConnected,
    uploadToIPFS,
    createRealEstate,
    getAllRealEstate,
    getPropertiesData: getAllRealEstate, // Alias for backwards compatibility
    getUserPropertiesFunction,
    getSinglePropertyFunction,
    getPropertyFunction,
    getProductReviewsFunction,
    addReviewFunction,
    totalReviewsFunction,
    totalRatingFunction,
    getHighestRatedProduct,
    buyRealEstate,
    updatePrice,
    updateRealEstate,
    connectingWithSmartContract,
    fetchData,
    
    // Contract info
    REAL_ESTATE_ADDRESS: REAL_ESTATE_ADDRESS || "",
    REAL_ESTATE_ABI,
    
    // IPFS config
    PINATA_API_KEY: PINATA_API_KEY || "",
    PINATA_SECRECT_KEY: PINATA_SECRECT_KEY || "",
    
    // UI state
    isLoading: loader,
    error: null,
    loader,
    setLoader,
    notifySuccess,
    notifyError,
  }), [address, accountBalance, loader]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): ExtendedAppContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within StateContextProvider');
  }
  return context;
};

