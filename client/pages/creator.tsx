import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { CreatorOne } from "../PageComponents/CreatorPage";
import { useStateContext } from "../context";
import { getTopCreators } from "../utils";

import {
  Header,
  Footer,
  Copyright,
} from "../PageComponents/Components";

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
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreatorOne
        creators={getTopCreators(properties)}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Creator;
