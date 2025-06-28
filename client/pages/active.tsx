import React, { useEffect, useState, useCallback } from "react";

//INTERNAL IMPORT
import { Activity } from "../PageComponents/ActivityPage";
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

const Active: React.FC = () => {
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>();

  const { getPropertiesData, totalReviewsFunction, getHighestRatedProduct } =
    useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    const data = await getPropertiesData();
    // Note: totalReviewsFunction requires a propertyId, using first property's ID or default
    const reviewsLength = data.length > 0 && data[0]?.id ? await totalReviewsFunction(data[0].id) : 0;
    setTotalReviews(reviewsLength);
    setProperties(data);
  }, [getPropertiesData, totalReviewsFunction]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

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
