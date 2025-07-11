import React, { useState, useEffect, useCallback } from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Title, Collection } from "../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../components/layout";
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

const CollectionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);

  const { getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  }, [getPropertiesData]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Title title="Collection" />
      <Collection
        category={properties}
        isLoading={isLoading}
      />
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

export default CollectionPage;



