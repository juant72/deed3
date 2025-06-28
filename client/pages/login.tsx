import React from "react";
import { GetServerSideProps } from "next";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { LoginOne, LoginTwo } from "../PageComponents/LoginPage";

const Login: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <LoginOne />
      <LoginTwo />
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

export default Login;


