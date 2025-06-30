import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/layout/Layout";

//INTERNAL IMPORT
import { BlogDetailOne, BlogDetailTwo } from "../PageComponents/BlogDetail";

const BlogDetail: React.FC = () => {
  return (
    <Layout>
      <BlogDetailOne />
      <BlogDetailTwo />
    </Layout>
  );
};

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default BlogDetail;


