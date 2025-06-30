import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../components/layout";
import {
  FourmFour,
  FourmOne,
  FourmThree,
  FourmTwo,
} from "../PageComponents/FourmPage";

const Forum: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <FourmOne />
      <FourmTwo />
      <FourmThree />
      <FourmFour />
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

export default Forum;



