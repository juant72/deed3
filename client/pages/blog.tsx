import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { BlogOne, BlogTwo } from "../PageComponents/BlogPage";

const Blog: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <BlogOne />
      <BlogTwo />
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

export default Blog;


