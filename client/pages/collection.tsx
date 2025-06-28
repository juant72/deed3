import React from "react";

//INTERNAL IMPORT
import { Title, Collection } from "../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const CollectionPage: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Title title="Collection" />
      <Collection category="all" isLoading={false} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default CollectionPage;

