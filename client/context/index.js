import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
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

// console.log("ABI:" + JSON.stringify(REAL_ESTATE_ABI,null,2));
const providerOptions = {
  injected: {
    display: {
      name: "MetaMask",
      description: "Connect with MetaMask",
    },
    package: true,
    options: {
      appName: "deeds3",
    },
  },
};

//CONNECTING WITH CONTRACT
const connectingWithSmartContract = async () => {
  try {
    // const web3modal = new Web3Modal();
    const web3modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      disableInjectedProvider: false,
    });

    const connection = await web3modal.connect();

    // Verify succesfull connection
    if (!connection) {
      throw new Error("No connection found");
    }
    const provider = new ethers.providers.Web3Provider(connection);

    // Verify valid provider 
    if (!provider) {
      throw new Error("No provider found");
    }

    const PROVIDER = provider.getSigner();
    //Verify valid signer
    if (!PROVIDER){
      throw new Error("No valid signer");
    }

    const contract = FETCH_CONTRACT(PROVIDER);    

    console.log("Provider: " + PROVIDER);

    return contract;
  } catch (error) {
    console.log("Error connectig with SC: ",error);
  }
};


const StateContext = createContext();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({ children }) => {
  const router = useRouter();
  //STATE VARIABLE
  const [currentAccount, setCurrentAccount] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [userBlance, setUserBlance] = useState();
  const [getHighestRatedProduct, setGetHighestRatedProduct] = useState();
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  //NOTIFICATION
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return notifyError("Install MetaMask");
      const network = await handleNetworkSwitch();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const convertBal = ethers.utils.formatEther(getBalance);
        setAccountBalance(convertBal);
        setUserBlance(convertBal);
      } else {
        console.log("NO ACCOUNT");
      }
      return accounts[0];
    } catch (error) {
      console.log("NO CONNACTION");
    }
  };

useEffect(() => {
  checkIfWalletConnected();
}, []);


  //---CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return notifyError("Install MetaMask");
      const network = await handleNetworkSwitch();
      setLoader(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setLoader(false);
      notifySuccess("Wallet connected successfully");
      setCount(count + 1);
    } catch (error) {
      notifyError("Install MetaMask");
      console.log(error);
    }
  };


  // //Frontend
  // const disconnect = useDisconnect();
  // const signer = useSigner();

  // //State vars
  // const [ userBalance, setUserBalance ] = useState(0);

  
  //CREATE PROPERTY
  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    try {
      setLoader(true);
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();

      const transaction = await contract.listProperty(
        address,
        price,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
      console.log("contract call successs", transaction);
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  

  //UpdateProperty
  const updatePropertyFunction = async (form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,
      images,
      propertyAddress,
    } = form;

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();
      const transaction = await contract.updateProperty(
        address,
        productId,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //UpdatePrice
  const updatePriceFunction = async (form) => {
    const { productID, price } = form;
    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();
      const transaction = await contract.updatePrice(
        address,
        productID,
        ethers.utils.parseEther(price)
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      console.info("contract call successs", transaction);
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //Buy property
  const buyPropertyFunction = async (buying) => {
    const { productID, amount } = buying;
    const money = ethers.utils.parseEther(amount);

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();

      const transaction = await contract.buyProperty(productID, address, {
        value: money.toString(),
      });
      await transaction.wait();
      console.info("contract call successs", transaction);
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //ADD REVIEW
  const addReviewFunction = async (from) => {
    const { productID, rating, comment } = from;

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();

      const transaction = await contract.addReview(
        productID,
        rating,
        comment,
        address
      );
      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      window.location.reload();
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //LIKE REVIEW
  const likeReviewFunction = async (productID, reviewIndex) => {
    try {
      const contract = await connectingWithSmartContract();
      const address = await checkIfWalletConnected();
      const transaction = await contract.likeReview(
        productID,
        reviewIndex,
        address
      );
      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      window.location.reload();
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //GETS
  //Get property data
  const getPropertiesData = async () => {
    const address = await checkIfWalletConnected();
    try {
      if (address) {
        const contract = await connectingWithSmartContract();

        const properties = await contract?.getAllProperties();
        console.log("Properties from contract: "+ properties);
        
        const parsedProperties = properties?.map((property, i) => ({
          owner: property.owner,
          title: property.propertyTitle,
          description: property.description,
          category: property.category,
          price: ethers.utils.formatEther(property.price.toString()),
          productID: property.productId.toNumber(),
          reviewers: property.reviewers,
          reviews: property.reviews,
          image: property.images,
          address: property.propertyAddress,
        }));
        console.log(parsedProperties);
        return parsedProperties;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Gethighestproduct
  const getHighestRatedProductFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const totalReviews = await contract.getHighestRatedProduct();

        setGetHighestRatedProduct(totalReviews.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getProductReviews()
  const getProductReviewsFunction = async (productId) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const getProductReviews = await contract.getProductReviews(
          Number(productId)
        );

        const parsedReviews = getProductReviews?.map((review, i) => ({
          reviewer: review.reviewer,
          likes: review.likes.toNumber(),
          comment: review.comment,
          rating: review.rating,
          productID: review.productId.toNumber(),
          reviewIndex: review.reviewIndex.toNumber(),
        }));
        return parsedReviews;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getProperty
  const getPropertyFunction = async (id) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const propertyItem = await contract.getProperty(Number(id));

        const property = {
          productID: propertyItem?.[0].toNumber(),
          owner: propertyItem?.[1],
          title: propertyItem?.[3],
          category: propertyItem?.[4],
          description: propertyItem?.[7],
          price: ethers.utils.formatEther(propertyItem?.[2].toString()),
          address: propertyItem?.[6],
          image: propertyItem?.[5],
        };

        return property;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getUserProperties
  const getUserPropertiesFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const properties = await contract.getUserProperties(address);

        const parsedProperties = properties.map((property, i) => ({
          owner: property.owner,
          title: property.propertyTitle,
          description: property.description,
          category: property.category,
          price: ethers.utils.formatEther(property.price.toString()),
          productID: property.productID.toNumber(),
          reviewers: property.reviewers,
          reviews: property.reviews,
          image: property.images,
          address: property.propertyAddress,
        }));

        return parsedProperties;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GetUserReviews.
  const getUserReviewsFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const getUserReviews = await contract.getUserReviews(address);

        const parsedUserReviews = getUserReviews.map((property, i) => ({
          comment: property.comment,
          likes: property.likes.toNumber(),
          productId: property.productId.toNumber(),
          rating: property.rating,
          reviewIndex: property.reviewIndex.toNumber(),
          reviewer: property.reviewer,
        }));

        return parsedUserReviews;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //total property
  const totalPropertyFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const totalProperty = await contract.propertyIndex();

        return totalProperty.toNumber();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //total review
  const totalReviewsFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const totalReviews = await contract.reviewsCounter();

        return totalReviews.toNumber();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHighestRatedProductFunction();
    getUserReviewsFunction();
    totalPropertyFunction();
    totalReviewsFunction();
  }, [currentAccount]);

  //data with events
  // const { data: event } = useContractEvents(contract, "PropertyListed");

  // //get all events
  // const { data: allEvents } = useContractEvents(contract);

  // //set default
  // const { data: eventWithoutListener } = useContractEvents(
  //   contract,
  //   undefined,
  //   {
  //     subscribe: false,
  //   }
  // );

  //console.log(event);
  //console.log(allEvents);
  //console.log(eventWithoutListener);

  return (
    <StateContext.Provider
    value={{
      //CONTRACT
      connectWallet,
      currentAccount,
      accountBalance,
      //PROPERTY
      createPropertyFunction,
      updatePropertyFunction,
      updatePriceFunction,
      buyPropertyFunction,
      getPropertyFunction,
      getUserPropertiesFunction,
      totalPropertyFunction,
      getPropertiesData,
      //REVIEW
      addReviewFunction,
      likeReviewFunction,
      getProductReviewsFunction,
      getUserReviewsFunction,
      totalReviewsFunction,
      getHighestRatedProduct,
      //STATE VARIABLE
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
