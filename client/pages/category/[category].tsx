import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

///INTERNAL IMPORT
import { Title, Collection } from "../../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../../PageComponents/Components";

//INTERNAL IMPORT
import { useStateContext } from "../../context";

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

const Category: React.FC = () => {
  const router = useRouter();

  const { query } = router;

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
      <Title 
        title={`Category: ${query.category || 'All'}`}
      />
      <Collection 
        category={properties} 
        isLoading={isLoading}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Category;
