import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../components/layout";
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

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Ranking;



