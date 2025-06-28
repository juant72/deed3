import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  FourmFour,
  FourmOne,
  FourmThree,
  FourmTwo,
} from "../PageComponents/FourmPage";

const Forum = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <FourmOne />
      <FourmTwo />
      <FourmThree />
      <FourmFour />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Forum;
