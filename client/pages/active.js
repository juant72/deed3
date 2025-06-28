import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { Activity } from "../PageComponents/ActivityPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { useStateContext } from "../context";
const Active = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [totalReviews, setTotalReviews] = useState();

  const { getPropertiesData, totalReviewsFunction, getHighestRatedProduct } =
    useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    const reviewsLength = await totalReviewsFunction();
    setTotalReviews(reviewsLength);
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Activity
        properties={properties}
        totalReviews={totalReviews}
        popular={getHighestRatedProduct}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Active;
