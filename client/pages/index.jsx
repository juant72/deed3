import React, { useState, useEffect, useCallback } from "react";

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

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilters, setSearchFilters] = useState(null);

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
  const housing = [];
  const rental = [];
  const farmhouse = [];
  const office = [];
  const commercial = [];
  const country = [];

  if (!isLoading) {
    properties?.map((el) => {
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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (filters) => {
    setSearchFilters(filters);
  };

  // const creators = getTopCreators(properties);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <MobileNavigation />
      <ModernHero marketData={{}} propertyCount={properties?.length || 0} />

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
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;


