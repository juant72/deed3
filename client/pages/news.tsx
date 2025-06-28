import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { NewsOne, NewsThree, NewsTwo } from "../PageComponents/NewsPage";

const News: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <NewsOne />
      <NewsTwo />
      <NewsThree />
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

export default News;



