import React, { useState, useEffect, useCallback } from "react";
import { GetServerSideProps } from "next";

///INTERNAL IMPORT
import {
  Header,
  ModernHero,
  TokenomicsSection,
  MobileNavigation,
  SearchAndFilters,
  Live,
  Service,
  Product,
  Collection,
  Footer,
  Copyright,
} from "../PageComponents/Components";

///INTERNAL IMPORT
import { useStateContext } from "../context";
import { RealEstateProperty } from "../types/global";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [searchFilters, setSearchFilters] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { getAllRealEstate } = useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    const data = await getAllRealEstate();

    setProperties(data);
    setIsLoading(false);
  }, [getAllRealEstate]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  //CATEGORIES
  const housing: RealEstateProperty[] = [];
  const rental: RealEstateProperty[] = [];
  const farmhouse: RealEstateProperty[] = [];
  const office: RealEstateProperty[] = [];
  const commercial: RealEstateProperty[] = [];
  const country: RealEstateProperty[] = [];

  if (!isLoading) {
    properties?.map((el: RealEstateProperty) => {
      if (el.category === "country") {
        country.push(el);
      } else if (el.category === "Commercial") {
        commercial.push(el);
      } else if (el.category === "Office") {
        office.push(el);
      } else if (el.category === "Farmhouse") {
        farmhouse.push(el);
      } else if (el.category === "Rental") {
        rental.push(el);
      } else if (el.category === "Housing") {
        housing.push(el);
      }
      return el;
    });
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (filters: any) => {
    setSearchFilters(filters);
  };

  // const creators = getTopCreators(properties);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <MobileNavigation />
      <ModernHero 
        marketData={{
          totalVolume: '$2.4B',
          avgROI: '12.5%',
          activeProperties: properties?.length || 0
        }} 
        propertyCount={properties?.length || 0} 
      />

      {/* Enhanced Search and Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <SearchAndFilters 
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      <Live properties={properties} />
      <Service />
      <Product properties={properties} />
      <TokenomicsSection />

      <Collection
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
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

export default Home;


