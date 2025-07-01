import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";

///INTERNAL IMPORT
import {
    ModernHero,
    TokenomicsSection,
} from "../PageComponents/Components";

import ProfessionalSearchAndFilters from "../components/ui/search/ProfessionalSearchAndFilters";
import Service from "../PageComponents/Components/Service";
import Product from "../PageComponents/Components/Product";
import Collection from "../PageComponents/Components/Collection";

import { Header, Footer, Copyright, MobileNavigation } from "../components/layout";

import LiveFixed from "../PageComponents/Components/LiveFixed";

///INTERNAL IMPORT
import { useStateContext } from "../context";
import { RealEstateProperty } from "../types/global";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<RealEstateProperty[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchFilters, setSearchFilters] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const handleFiltersChange = useCallback((filters: any) => {
        setSearchFilters(filters);
    }, []);

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
                <ProfessionalSearchAndFilters
                    onSearchChange={handleSearchChange}
                    onFiltersChange={handleFiltersChange}
                    isLoading={isLoading}
                    resultCount={properties.length}
                />
            </div>

            <Service />
            <Product properties={properties} />
            <Collection
                housing={housing?.length}
                rental={rental?.length}
                farmhouse={farmhouse?.length}
                office={office?.length}
            />

            <TokenomicsSection />

            <LiveFixed properties={properties} />
            <Footer />
            <Copyright />
        </div>
    );
};

export default Home;
