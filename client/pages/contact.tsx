import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import {
  ContactFour,
  ContactOne,
  ContactThree,
  ContactTwo,
} from "../PageComponents/ContactPage";
import { Header, Footer, Copyright } from "../components/layout";

const Contact: React.FC = () => {
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

// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Contact;



