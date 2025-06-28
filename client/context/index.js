import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  PINATA_API_KEY,
  PINATA_SECRECT_KEY,
  REAL_ESTATE_ABI,
  REAL_ESTATE_ADDRESS,
  handleNetworkSwitch,
  ACTIVE_NETWORK,
} from "./constants";

// Create context
const StateContext = createContext();

//FETCH CONTRACT
const FETCH_CONTRACT = (PROVIDER) =>
  new ethers.Contract(REAL_ESTATE_ADDRESS, REAL_ESTATE_ABI, PROVIDER);

//CONNECTING WITH CONTRACT using Wagmi
const connectingWithSmartContract = async (client) => {
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

    console.log("Provider connected successfully");
    return contract;
  } catch (error) {
    console.log("Error connecting with Smart Contract: ", error);
    throw error;
  }
};

//ACCOUNT BALANCE
const fetchAccountBalance = async (address) => {
  try {
    if (!address) return null;
    
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    }
    return null;
  } catch (error) {
    console.log("Error fetching account balance: ", error);
    return null;
  }
};

//CHECK IF WALLET CONNECTED
const checkIfWalletConnected = async () => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("Please Install MetaMask");
      return null;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      return accounts[0];
    } else {
      console.log("No account found");
      return null;
    }
  } catch (error) {
    console.log("Error checking wallet connection:", error);
    return null;
  }
};

//CONNECT WALLET
const connectWallet = async () => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log("Please Install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log("Error connecting wallet:", error);
  }
};

//UPLOAD TO IPFS
const uploadToIPFS = async (file) => {
  try {
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
    console.log("IPFS Response:", responseData);

    const ImgHash = `ipfs://${responseData.IpfsHash}`;
    return ImgHash;
  } catch (error) {
    console.log("Error uploading to IPFS:", error);
    return null;
  }
};

//CREATE REAL ESTATE
const createRealEstate = async (
  price,
  title,
  category,
  images,
  description,
  address,
  roomNumber,
  client
) => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(price.toString(), "ether");

    const transaction = await contract.createRealEstate(
      propertyPrice,
      title,
      category,
      images,
      description,
      address,
      roomNumber
    );

    await transaction.wait();
    console.log("Real Estate created successfully");
    toast.success("Property created successfully!");
    
    return transaction;
  } catch (error) {
    console.log("Error creating real estate:", error);
    toast.error("Failed to create property");
    throw error;
  }
};

//GET ALL REAL ESTATE
const getAllRealEstate = async () => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      return [];
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = FETCH_CONTRACT(provider);

    const properties = await contract.getAllRealEstate();
    
    const parsedProperties = properties.map((property, i) => ({
      price: ethers.formatEther(property.price.toString()),
      title: property.title,
      category: property.category,
      images: property.images,
      description: property.description,
      address: property.propertyAddress,
      roomNumber: property.roomNumber.toString(),
      owner: property.owner,
      seller: property.seller,
      sold: property.sold,
      index: i,
    }));

    return parsedProperties;
  } catch (error) {
    console.log("Error fetching properties:", error);
    return [];
  }
};

//BUY REAL ESTATE
const buyRealEstate = async (index, price, client) => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(price.toString(), "ether");

    const transaction = await contract.buyRealEstate(index, {
      value: propertyPrice,
    });

    await transaction.wait();
    console.log("Property purchased successfully");
    toast.success("Property purchased successfully!");
    
    return transaction;
  } catch (error) {
    console.log("Error purchasing property:", error);
    toast.error("Failed to purchase property");
    throw error;
  }
};

//UPDATE REAL ESTATE PRICE
const updatePrice = async (index, newPrice, client) => {
  try {
    const contract = await connectingWithSmartContract(client);
    
    const propertyPrice = ethers.parseUnits(newPrice.toString(), "ether");

    const transaction = await contract.updatePrice(index, propertyPrice);

    await transaction.wait();
    console.log("Price updated successfully");
    toast.success("Price updated successfully!");
    
    return transaction;
  } catch (error) {
    console.log("Error updating price:", error);
    toast.error("Failed to update price");
    throw error;
  }
};

//UPDATE REAL ESTATE STATUS
const updateRealEstate = async (index, client) => {
  try {
    const contract = await connectingWithSmartContract(client);

    const transaction = await contract.updateRealEstate(index);

    await transaction.wait();
    console.log("Property status updated successfully");
    toast.success("Property status updated successfully!");
    
    return transaction;
  } catch (error) {
    console.log("Error updating property status:", error);
    toast.error("Failed to update property status");
    throw error;
  }
};

//STATE CONTEXT PROVIDER
export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // Toast notifications
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //CHECK WALLET CONNECTION
  const fetchData = async () => {
    try {
      //CHECK NETWORK
      await handleNetworkSwitch();

      //GET ACCOUNT
      const account = await checkIfWalletConnected();
      setAddress(account || "");

      //GET BALANCE
      if (account) {
        const balance = await fetchAccountBalance(account);
        setAccountBalance(balance || "");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //CONNECT WALLET FUNCTION
  const connectWalletFunction = async () => {
    try {
      const account = await connectWallet();
      setAddress(account || "");
      
      if (account) {
        const balance = await fetchAccountBalance(account);
        setAccountBalance(balance || "");
      }
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        // Account state
        address,
        accountBalance,
        currentAccount: address,
        userBlance: accountBalance,
        
        // Functions
        connectWallet: connectWalletFunction,
        checkIfWalletConnected,
        uploadToIPFS,
        createRealEstate,
        getAllRealEstate,
        buyRealEstate,
        updatePrice,
        updateRealEstate,
        connectingWithSmartContract,
        fetchData,
        
        // Contract info
        REAL_ESTATE_ADDRESS,
        REAL_ESTATE_ABI,
        
        // IPFS config
        PINATA_API_KEY,
        PINATA_SECRECT_KEY,
        
        // UI state
        loader,
        setLoader,
        notifySuccess,
        notifyError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within StateContextProvider');
  }
  return context;
};
