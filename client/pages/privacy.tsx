import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { PrivacyOne, PrivacyTwo } from "../PageComponents/PrivacyPage";

const Privacy: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <PrivacyOne />
      <PrivacyTwo />
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

export default Privacy;



