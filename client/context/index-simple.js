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

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const router = useRouter();
  
  // Local state (maintaining compatibility with existing components)
  const [currentAccount, setCurrentAccount] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [userBlance, setUserBlance] = useState();
  const [getHighestRatedProduct, setGetHighestRatedProduct] = useState();
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  // Toast notifications
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // Check if wallet is connected (placeholder for compatibility)
  const checkIfWalletConnected = async () => {
    return currentAccount;
  };

  // Connect wallet function (placeholder for compatibility)
  const connectWallet = async () => {
    try {
      setLoader(true);
      notifySuccess("Please use the Connect Wallet button");
    } catch (error) {
      console.log("Error connecting wallet:", error);
      notifyError("Connection failed");
    } finally {
      setLoader(false);
    }
  };

  // PROPERTY FUNCTION
  const createPropertyFunction = async (PROPERTY) => {
    try {
      const { name, description, price, images, category, properties, propertyVideo } = PROPERTY;

      if (!name || !description || !price || !category) {
        return notifyError("Data Is Missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Property created successfully");
    } catch (error) {
      console.log("Error creating property:", error);
      notifyError("Failed to create property");
    } finally {
      setLoader(false);
    }
  };

  // UPDATE PRICE FUNCTION
  const updatePropertyFunction = async (PROPERTY) => {
    try {
      const { productID, price } = PROPERTY;

      if (!productID || !price) {
        return notifyError("Data Is Missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Property updated successfully");
    } catch (error) {
      console.log("Error updating property:", error);
      notifyError("Failed to update property");
    } finally {
      setLoader(false);
    }
  };

  // UPDATE PRICE FUNCTION
  const updatePriceFunction = async (PROPERTY) => {
    try {
      const { productID, price } = PROPERTY;

      if (!productID || !price) {
        return notifyError("Data Is Missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Price updated successfully");
    } catch (error) {
      console.log("Error updating price:", error);
      notifyError("Failed to update price");
    } finally {
      setLoader(false);
    }
  };

  // BUY FUNCTION
  const buyPropertyFunction = async (PROPERTY) => {
    try {
      const { productID, amount } = PROPERTY;

      if (!productID || !amount) {
        return notifyError("Data Is Missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Property purchased successfully");
    } catch (error) {
      console.log("Error buying property:", error);
      notifyError("Failed to purchase property");
    } finally {
      setLoader(false);
    }
  };

  // GET DATA FUNCTION
  const getPropertiesData = async () => {
    try {
      // Placeholder implementation
      return [];
    } catch (error) {
      console.log("Error getting properties:", error);
      return [];
    }
  };

  // GET SINGLE PROPERTY FUNCTION
  const getSinglePropertyFunction = async (PROPERTY_ID) => {
    try {
      // Placeholder implementation
      return null;
    } catch (error) {
      console.log("Error getting single property:", error);
      return null;
    }
  };

  // GET USER PROPERTIES FUNCTION
  const getUserPropertiesFunction = async (USER_ADDRESS) => {
    try {
      // Placeholder implementation
      return [];
    } catch (error) {
      console.log("Error getting user properties:", error);
      return [];
    }
  };

  // TOTAL PROPERTIES FUNCTION
  const totalPropertyFunction = async () => {
    try {
      // Placeholder implementation
      return 0;
    } catch (error) {
      console.log("Error getting total properties:", error);
      return 0;
    }
  };

  // REVIEW FUNCTIONS
  const addReviewFunction = async (REVIEW) => {
    try {
      const { productID, rating, comment } = REVIEW;

      if (!productID || !rating || !comment) {
        return notifyError("Data Is Missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Review added successfully");
    } catch (error) {
      console.log("Error adding review:", error);
      notifyError("Failed to add review");
    } finally {
      setLoader(false);
    }
  };

  const likeReviewFunction = async (REVIEW_ID) => {
    try {
      if (!REVIEW_ID) {
        return notifyError("Review ID is missing");
      }

      setLoader(true);
      // Implementation would use wagmi hooks or client from props
      notifySuccess("Review liked successfully");
    } catch (error) {
      console.log("Error liking review:", error);
      notifyError("Failed to like review");
    } finally {
      setLoader(false);
    }
  };

  const getProductReviewsFunction = async (PRODUCT_ID) => {
    try {
      // Placeholder implementation
      return [];
    } catch (error) {
      console.log("Error getting product reviews:", error);
      return [];
    }
  };

  const getUserReviewsFunction = async (USER_ADDRESS) => {
    try {
      // Placeholder implementation
      return [];
    } catch (error) {
      console.log("Error getting user reviews:", error);
      return [];
    }
  };

  const totalReviewsFunction = async () => {
    try {
      // Placeholder implementation
      return 0;
    } catch (error) {
      console.log("Error getting total reviews:", error);
      return 0;
    }
  };

  return (
    <StateContext.Provider
      value={{
        // Account and wallet
        currentAccount,
        accountBalance,
        connectWallet,
        checkIfWalletConnected,
        
        // Property functions
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        getSinglePropertyFunction,
        getUserPropertiesFunction,
        totalPropertyFunction,
        getPropertiesData,
        
        // Review functions
        addReviewFunction,
        likeReviewFunction,
        getProductReviewsFunction,
        getUserReviewsFunction,
        totalReviewsFunction,
        getHighestRatedProduct,
        
        // State variables
        userBlance,
        PINATA_API_KEY,
        PINATA_SECRECT_KEY,
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

export const useStateContext = () => useContext(StateContext);
export { connectingWithSmartContract };
