import React from "react";

//INTERNAL IMPORT
import {
  ContactFour,
  ContactOne,
  ContactThree,
  ContactTwo,
} from "../PageComponents/ContactPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const Contact = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <ContactOne />
      <ContactTwo />
      <ContactThree />
      <ContactFour />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Contact;
