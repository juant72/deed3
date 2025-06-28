import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  EditProfileOne,
  EditProfileTwo,
} from "../PageComponents/EditProfilepage";

const EditProfile = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <EditProfileOne />
      <EditProfileTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default EditProfile;
