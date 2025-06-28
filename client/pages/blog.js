import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { BlogOne, BlogTwo } from "../PageComponents/BlogPage";

const Blog = () => {
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

export default Blog;
