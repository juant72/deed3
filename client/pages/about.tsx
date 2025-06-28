import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  Banner,
  Action,
  Blog,
  Quote,
  Statistick,
} from "../PageComponents/AboutPage";

const About: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Banner />
      <Action />
      <Blog />
      <Quote />
      <Statistick />
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

export default About;
