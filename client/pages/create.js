import React from "react";

//INTERNAL IMPORT
import {
  CreateOne,
  CreateThree,
  CreateTwo,
} from "../PageComponents/CreatePage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const Create = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Create Property" />
      <CreateTwo />
      {/* <CreateThree /> */}
      <Footer />
      <Copyright />
    </div>
  );
};

export default Create;
