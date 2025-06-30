import React, { useEffect, useState, useCallback } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import PropertyDetails from "../PageComponents/Components/PropertyDetails";
import MobileNavigation from "../components/layout/MobileNavigation";
import {
  DetailEight,
  DetailFive,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";
import Loader from "../PageComponents/Components/Loader/Loader";
import Layout from "../components/layout/Layout";

import { useStateContext } from "../context";

const Detail: React.FC = () => {
  const [property, setProperty] = useState<any>();
  const [parsedReviews, setParsedReviews] = useState<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [buyLoading, setBuyLoading] = useState<boolean>(false);

  const {
    currentAccount,
    addReviewFunction,
    getProductReviewsFunction,
    buyRealEstate,
    getPropertyFunction,
    getPropertiesData,
    updatePrice,
    loader,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  //GET PROPERTY DATA
  const fetchProperty = useCallback(async () => {
    const propertyIndex = parseInt(query.property as string);
    const data = await getPropertyFunction(propertyIndex);
    const dataReviews = await getProductReviewsFunction(query.property as string);
    const dataProperties = await getPropertiesData();
    setProperties(dataProperties);
    setProperty(data);
    setParsedReviews(dataReviews);
    setIsLoading(false);
  }, [query.property, getPropertyFunction, getProductReviewsFunction, getPropertiesData]);

  useEffect(() => {
    if (query) fetchProperty();
  }, [query, fetchProperty]);

  //ADD REVIEW
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    setCommentLoading(true);
    await addReviewFunction({
      ...review,
      productID: property.productID,
    });
    setCommentLoading(false);
  };

  //LIKE REVIEW - Funcionalidad removida por ahora
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: "",
  });
  const likeReviewCall = async (_property: any, _reviewIndex: number) => {
    // Función removida - likeReviewFunction no existe en el contexto
    // Like review functionality not implemented
  };

  //BUY PROPERTY
  const buyingProperty = async () => {
    setBuyLoading(true);
    await buyRealEstate(parseInt(property?.productID), property?.price, null);
    setBuyLoading(false);
  };

  //UPDATE PRICE
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    productID: property?.productID,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    await updatePrice(
      parseInt(property?.productID),
      parseFloat(updatePropertyPrice.price),
      null
    );
    setUpdatePriceLoading(false);
    window.location.reload();
  };
  //
  return (
    <Layout>
      <div className="template-color-1 nft-body-connect">
        <MobileNavigation />

        {/* Enhanced Property Details Section */}
        <div className="container mx-auto px-4 py-8">
          <PropertyDetails property={property} isDetailPage={true} />
        </div>

        <DetailOne />

        <DetailTwo
          property={property}
          parsedReviews={parsedReviews}
          setLikeReviews={setLikeReviews}
          likeReviews={likeReviews}
          likeReviewCall={likeReviewCall}
          buyingProperty={buyingProperty}
          address={currentAccount}
          isLoading={isLoading}
          buyLoading={buyLoading}
        />

        <DetailThree properties={properties} />
        <DetailFive />
        <DetailSix />
        <DetailSeven
          property={property}
          setUpdatePropertyPrice={setUpdatePropertyPrice}
          updatePropertyPrice={updatePropertyPrice}
          updatepropertyPrice={updatepropertyPrice}
          updatePriceLoading={updatePriceLoading}
        />
        <DetailEight
          createReview={createReview}
          handleFormFieldChange={handleFormFieldChange}
          commentLoading={commentLoading}
        />

        {loader && <Loader />}
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

export default Detail;


