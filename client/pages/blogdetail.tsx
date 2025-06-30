import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { BlogDetailOne, BlogDetailTwo } from "../PageComponents/BlogDetail";
import { Header, Footer, Copyright } from "../components/layout";

const BlogDetail: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <BlogDetailOne />
      <BlogDetailTwo />
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

export default BlogDetail;


