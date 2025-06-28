import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { RankingOne, RankingTwo } from "../PageComponents/RankingPage";

const Ranking: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <RankingOne />
      <RankingTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Ranking;

