import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import Layout from "../components/layout/Layout";
import {
  Banner,
  Action,
  Blog,
  Quote,
  Statistick,
} from "../PageComponents/AboutPage";

const About: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <Action />
      <Blog />
      <Quote />
      <Statistick />
    </Layout>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default About;
