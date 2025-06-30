import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { CreatorOne } from "../PageComponents/CreatorPage";
import { useStateContext } from "../context";
import { getTopCreators } from "../utils";
import Layout from "../components/layout/Layout";

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

const Creator: React.FC = () => {
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);

  const { getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    const data = await getPropertiesData();
    setProperties(data);
  };

  useEffect(() => {
    fetchProperty();
  });

  return (
    <Layout>
      <div className="template-color-1 nft-body-connect">
        <CreatorOne creators={getTopCreators(properties)} />
      </div>
    </Layout>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Creator;


