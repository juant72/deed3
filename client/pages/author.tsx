import React, { useEffect, useState, useCallback } from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import {
  AuthorFive,
  AuthorFour,
  AuthorOne,
  AuthorThree,
  AuthorTwo,
} from "../PageComponents/AuthorPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

import { useStateContext } from "../context";

interface RealEstateProperty {
  id: string;
  title: string;
  category: string;
  price: string;
  location: string;
  images: string[];
  owner: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Author: React.FC = () => {
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [author, setAuthor] = useState<RealEstateProperty[]>([]);

  const { currentAccount, getUserPropertiesFunction, getPropertiesData } =
    useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    const data = await getPropertiesData();
    const dataAuthor = await getUserPropertiesFunction(currentAccount || "");
    setAuthor(dataAuthor);
    setProperties(data);
  }, [getPropertiesData, getUserPropertiesFunction, currentAccount]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <AuthorOne />
      <AuthorTwo address={currentAccount} author={author} />
      <AuthorThree properties={properties} author={author} />
      <AuthorFour />
      <AuthorFive />
      <Footer />
      <Copyright />
    </div>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Author;


