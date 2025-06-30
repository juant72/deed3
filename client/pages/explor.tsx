import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  ExplorFour,
  ExplorOne,
  ExplorThree,
  ExplorTwo,
} from "../PageComponents/ExplorePage";

const Explor: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <ExplorOne />
      <ExplorTwo />
      <ExplorThree />
      <ExplorFour />
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

export default Explor;



