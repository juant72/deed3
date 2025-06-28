import React from "react";

//INTERNAL IMPORT
import { BlogDetailOne, BlogDetailTwo } from "../PageComponents/BlogDetail";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const BlogDetail = () => {
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

export default BlogDetail;

