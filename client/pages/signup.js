import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { SignUpOne, SignUpTwo } from "../PageComponents/SignUpPage";

const SignUp = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <SignUpOne />
      <SignUpTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default SignUp;
