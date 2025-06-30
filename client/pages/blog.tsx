import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { BlogOne, BlogTwo } from "../PageComponents/BlogPage";
import Layout from "../components/layout/Layout";

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="template-color-1 nft-body-connect">
        <BlogOne />
        <BlogTwo />
      </div>
    </Layout>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Blog;


