import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { ConnectOne, ConnectTwo } from "../PageComponents/ConnectPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const Connect: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <ConnectOne />
      <ConnectTwo />
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

export default Connect;



