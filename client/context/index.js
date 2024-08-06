import React, { useEffect, useState, createContext, useContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
  useDisconnect,
  useSigner,
  useConnect,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  // const connect = useMetamask();
  const connect = useConnect();

  //Fontend
  const disconnect = useDisconnect();
  const signer = useSigner();

  //State vars
  const [ userBalance, setUserBalance ] = useState(0);

  const { mutateAsync: ListProperty } = useContractWrite(
    contract,
    "ListProperty"
  );

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
      const data = await ListProperty({
        args: [
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  

  //UpdateProperty
  const { mutateAsync: updateProperty } = useContractWrite(
    contract,
    "updateProperty"
  );

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
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          propertyAddress,
          description,
        ],
      });
      console.log("Property updated succesfully...", data);
    } catch (error) {
      console.log("Error while updating property..." + error);
    }
  };

  //UpdatePrice
  const { mutateAsync: updatePrice } = useContractWrite(
    contract,
    "updatePrice"
  );

  const updatePriceFunction = async (form) => {
    const { productID, price } = form;
    try {
      const data = await updatePrice({
        args: [address, productID, ethers.utils.parseEther(price)],
      });
      console.log("Price updated successfully", data);
    } catch (error) {
      console.log("Fail transaction...", error);
    }
  };

  //Buy property
  const { mutateAsync: buyProperty } = useContractWrite(
    contract,
    "buyProperty"
  );
  const buyPropertyFunction = async (buying) => {
    const { productID, amount } = buying;
    try {
      const data = await buyProperty({
        args: [productID, address],
        value: ethers.utils.parseEther(amount),
      });
      console.log("Property buyed successfully...", data);
    } catch (error) {
      console.log("Error buying property..", error);
    }
  };

  const { mutateAsync: addReview } = useContractWrite(contract, "addReview");
  const addReviewFunction = async (form) => {
    const { productID, rating, comment } = form;
    try {
      const data = await addReview({
        args: [productID, rating, comment, address],
      });
      console("Review added successfully.");
    } catch (error) {
      console.log("Error adding review.", error);
    }
  };

  const { mutateAsync: likeReview } = useContractWrite(contract, "likeReview");
  const likeReviewFunction = async (form) => {
    const { productID, reviewIndex } = form;
    try {
      const data = await likeReview({
        args: [productID, reviewIndex, address],
      });
      console.log("Like review successful", data);
    } catch (error) {
      console.log("Error liking review", error);
    }
  };

  //GETS
  //Get property data
  const getPropertiesData = async () => {
    try {
      const properties = await contract.call("getAllProperties");

      //Get use balance
      const balance=await signer?.getBalance();
      const userBalance=address ? ethers.utils.formatEther(balance?.toString()) : "";
      setUserBalance(userBalance);

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productId.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));
      return parsedProperties;
    } catch (error) {
      console.log("Error while loading Properties data...", error);
    }
  };

  //Gethighestproduct
  const {
    data,
    getHighestratedProduct,
  } = useContractRead(contract, "getHighestratedProduct");

  //GetProduct reviews
  const getProductReviewsFunction =async (productId) => {
    try {
        const getProductReviews=await contract.call("getProductReviews",[productId]);
        const parsedReviews=getProductReviews?.map((review, i) =>({
            reviewer: review.reviewer,
            likes: review.likes.toNumber(),
            comment:review.comment,
            rating: review.rating,
            productID: review.productId.toNumber(),
        }));        
        return parsedReviews;
    } catch (error) {
      console.log("Error getting product reviews...", error);
    }
  };

  //getProperty
  const getPropertyFunction =async (id) => {
    const productID=id*1;

    try {
        const propertyItem=await contract.call("getProperty",[productID]);
        const property = {
            productID: propertyItem?.[0].toNumber(),
            owner: propertyItem?.[1],
            title: propertyItem?.[3],
            category: propertyItem?.[4],
            description:propertyItem?.[7],
            price:  ethers.utils.formatEther( propertyItem?.[2].toString()) ,
            address: propertyItem?.[6],
            images:propertyItem?.[5],
        };
        return property;
    } catch (error) {
      console.log("Error getting property", error);
    }
  };

  //getUserProperties
  const getUserPropertiesFunction = async() => {
    try {
        const properties = await contract.call("getUserProperties",[address]);
        const parsedProperties=properties.map((property,i)=>({
            owner: property.owner,
            title: property.propertyTitle,
            description: property.description,
            category: property.category,
            price: ethers.utils.formatEther(property.price.toString()),
            productID: property.productId.toNumber(),
            reviewers: property.reviewers,
            reviews: property.reviews,
            images: properties.images,
            address: properties.propertyAddress,
        }));
        return parsedProperties;
    } catch (error) {
      console.log("Error getting user properties.", error);
    }
  };

  //GetUserReviews.
  const getUserReviewsFunction = () => {
    try {
      const { data: getUserReviews} =
        useContractRead(contract, "getUserReviews", address);
      return getUserReviews;
    } catch (error) {
      console.log("Error getting user reviews.", error);
    }
  };

  //total property
  const totalPropertyFunction = async() => {
    try {
      const totalProperty = await contract.call("propertyIndex")
      return totalProperty.toNumber();
    } catch (error) {
      console.log("Error getting total property", error);
    }
  };

  //total review
  const totalReviewsFunction = async () => {
    try {
      const totalReviews=await contract.call("reviewsCounter");
      return totalReviews.toNumber();
    } catch (error) {
      console.log("Error getting total reviews.", error);
    }
  };

  //data with events
  const { data: event } = useContractEvents(contract, "PropertyListed");

  //get all events
  const { data: allEvents } = useContractEvents(contract);

  //set default
  const { data: eventWithoutListener } = useContractEvents(
    contract,
    undefined,
    {
      subscribe: false,
    }
  );

  //console.log(event);
  //console.log(allEvents);
  //console.log(eventWithoutListener);

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        //Review
        addReviewFunction,
        likeReviewFunction,
        getProductReviewsFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        getUserReviewsFunction,
        totalPropertyFunction,
        totalReviewsFunction,
        getHighestratedProduct,
        //Contract data
        getPropertiesData,
        userBalance,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
