import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import {
  CreateOne,
  CreateTwo,
} from "../PageComponents/CreatePage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const Create: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Create Property" />
      <CreateTwo />
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

export default Create;


