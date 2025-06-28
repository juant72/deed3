import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { CreatorOne } from "../PageComponents/CreatorPage";
import { useStateContext } from "../context";
import { getTopCreators } from "../utils";

import {
  Header,
  Footer,
  Copyright,
} from "../PageComponents/Components";

const Creator = () => {
  const [properties, setProperties] = useState([]);

  const { getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    const data = await getPropertiesData();
    setProperties(data);
  };

  useEffect(() => {
    fetchProperty();
  });

  const creators = getTopCreators(properties);
  console.log(creators);
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreatorOne creators={creators} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Creator;
