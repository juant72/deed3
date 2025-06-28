import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { UpcomingOne, UpcomingTwo } from "../PageComponents/UpcomingPage";

const Upcoming: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <UpcomingOne />
      <UpcomingTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Upcoming;

