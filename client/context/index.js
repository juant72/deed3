import React, { useEffect, useState, createContext, useContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const connect = useMetamask();

  const realState = "Deeds3";

  const { mutateAsync: ListProperty, isLoading } = useContractWrite(
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

  //Get property data
  const getPropertiesData = async () => {
    try {
      const properties = await contract.call("getAllProperties");

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.title,
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
      console.log("Error while loading data...", error);
    }
  };

  //UpdateProperty
  const { mutateAsync: updateProperty, isLoading: updatePropertyLoading } =
    useContractWrite(contract, "updateProperty");

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
  const { mutateAsync: updatePrice, isLoading: updatePriceLoading } =
    useContractWrite(contract, "updatePrice");

  const updatePriceFunction = async (form) => {
    const { productId, price } = form;
    try {
      const data = await updatePrice({
        args: [address, productId, price],
      });
      console.log("Price updated successfully", data);
    } catch (error) {
      console.log("Fail transaction...", error);
    }
  };

  //Buy property
  const { mutateAsync: buyProperty, isLoading: buyPropertyLoading } =
    useContractWrite(contract, "buyProperty");
  const buyPropertyFunction = async (form) => {
    const { productId, address } = form;
    try {
      const data = await buyProperty({ args: [productId, address] });
      console.log("Property buyed successfully...", data);
    } catch (error) {
      console.log("Error buying property..", error);
    }
  };

  const { mutateAsync: addReview, isLoading: addReviewLoading } =
    useContractWrite(contract, "addReview");

  const addReviewFunction = async (form) => {
    const { productId, rating, comment } = form;

    try {
      const data = await addReview({
        args: [productId, rating, comment, address],
      });

      console("Review added successfully.");
    } catch (error) {
      console.log("Error adding review.", error);
    }
  };

  const { mutateAsync: likeReview, isLoading: likeReviewLoading } =
    useContractWrite(contract, "likeReview");

  const likeReviewFunction = async (form) => {
    const { productId, reviewIndex } = form;
    try {
      const data = await likeReview({
        args: [productId, reviewIndex, address],
      });
      console.log("Like review successful", data);
    } catch (error) {
      console.log("Error liking review", error);
    }
  };

  //Gethighestproduct
  const {
    data,
    getHighestratedProduct,
    isLoading: getHighestratedProductLoading,
  } = useContractRead(contract, "getHighestratedProduct");

  //GetProduct reviews
  const getProductReviewsFunction = (productId) => {
    try {
      const { data: getProductReviews, isLoading: getProductReviewsLoading } =
        useContractRead(contract, "getProductReviews");
      console.log("Product reviews getting successfull");
      return getProductReviews, getProductReviewsLoading;
    } catch (error) {
      console.log("Error getting product reviews...", error);
    }
  };

  //getProperty
  const getPropertyFunction = (id) => {
    try {
      const { data: getProperty, isLoading: getPropertyLoading } =
        useContractRead(contract, "getProperty", [id]);
      return getProperty, getPropertyLoading;
    } catch (error) {
      console.log("Error getting property", error);
    }
  };

  //getUserProperties
  const getUserPropertiesFunction = () => {
    try {
      const { data: getUserProperties, isLoading: getUserPropertiesLoading } =
        useContractRead(contract, "getUserProperties", address);
      return getUserProperties, getUserPropertiesLoading;
    } catch (error) {
      console.log("Error getting user properties.", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        realState,
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        addReviewFunction,
        likeReviewFunction,
        getPropertiesData,
        getHighestratedProduct,
        getProductReviewsFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
