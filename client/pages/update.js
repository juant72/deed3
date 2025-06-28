import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

//INTERNAL IMPORT
import { CreateOne } from "../PageComponents/CreatePage";
import {
  Header,
  Footer,
  Copyright,
  Loader,
  GlobalLoder,
} from "../PageComponents/Components";
import { useStateContext } from "../context";
import { checkIfImage } from "../utils";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "commercial",
  "country",
];

const Update = () => {
  const router = useRouter();
  const { query } = router;

  ///STATE VARIABLE
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [file, setFile] = useState(null);
  const [diplayImg, setDiplayImg] = useState(null);
  const [fileName, setFileName] = useState("Upload Image");
  const {
    address,
    contract,
    updatePropertyFunction,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    setLoader,
    notifyError,
    notifySuccess,
    loader,
  } = useStateContext();

  const [form, setForm] = useState({
    productId: "",
    propertyTitle: "",
    description: "",
    category: "",
    images: "",
    propertyAddress: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await updatePropertyFunction({
      ...form,
      productId: query.property * 1,
    });
    setIsLoading(false);
  };

  const uploadToPinata = async () => {
    setLoader(true);
    setFileName("Image Uploading...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setForm({ ...form, images: ImgHash });
        notifySuccess("Successfully uploaded");
        setFileName("Image Uploaded");
        setLoader(false);
        return ImgHash;
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata, Check API Key");
      }
    }
  };

  const retrieveFile = (event) => {
    const data = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(event.target.files[0]);

      if (event.target.files && event.target.files[0]) {
        setDiplayImg(URL.createObjectURL(event.target.files[0]));
      }
    };

    event.preventDefault();
  };

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Update Property" />
      <div className="creat-collection-area pt--80">
        <div className="container">
          <div className="row g-5 ">
            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              <div className="collection-single-wized banner">
                <label className="title required">Logo image</label>

                <div className="create-collection-input logo-image">
                  <div className="logo-c-image logo">
                    <Image
                      id="rbtinput1"
                      src={diplayImg || "/profile/profile-01.jpg"}
                      alt="Profile-NFT"
                      width={200}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <label for="fatima" title="No File Choosen">
                      <span className="text-center color-white">
                        <i className="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div className="button-area">
                    <div className="brows-file-wrapper">
                      <input
                        name="fatima"
                        id="fatima"
                        type="file"
                        onChange={retrieveFile}
                      />
                    </div>
                  </div>
                </div>
                {file && (
                  <a
                    onClick={() => uploadToPinata()}
                    className="btn btn-primary-alta btn-large"
                  >
                    {fileName}
                  </a>
                )}
              </div>

              <div className="collection-single-wized banner">
                <label className="title">Cover Image</label>
                <div className="create-collection-input feature-image">
                  <div className="logo-c-image feature">
                    <Image
                      id="rbtinput2"
                      src="/profile/cover-04.png"
                      alt="Profile-NFT"
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <label for="nipa" title="No File Choosen">
                      <span className="text-center color-white">
                        <i className="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div className="button-area">
                    <div className="brows-file-wrapper">
                      <input name="nipa" id="nipa" type="file" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="collection-single-wized banner">
                <label className="title">Featured image</label>
                <div className="create-collection-input feature-image">
                  <div className="logo-c-image feature">
                    <Image
                      id="createfileImage"
                      src="/profile/cover-03.jpg"
                      alt="Profile-NFT"
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <label for="createinputfile" title="No File Choosen">
                      <span className="text-center color-white">
                        <i className="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div className="button-area">
                    <div className="brows-file-wrapper">
                      <input
                        name="createinputfile"
                        id="createinputfile"
                        type="file"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="create-collection-form-wrapper">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="collection-single-wized">
                      <label for="name" className="title required">
                        Property Title
                      </label>
                      <div className="create-collection-input">
                        <input
                          id="name"
                          className="name"
                          type="text"
                          placeholder="propertyTitle"
                          onChange={(e) =>
                            handleFormFieldChange("propertyTitle", e)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="collection-single-wized">
                      <label className="title">Category</label>
                      <div className="create-collection-input">
                        <div className="nice-select mb--30" tabindex="0">
                          <span className="current">Add Category</span>
                          <ul className="list">
                            {categories.map((el, i) => (
                              <li
                                key={i + 1}
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    category: el,
                                  })
                                }
                                data-value="Housing"
                                className="option"
                              >
                                {el}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="collection-single-wized">
                      <label for="description" className="title">
                        Description
                      </label>
                      <div className="create-collection-input">
                        <textarea
                          id="description"
                          className="text-area"
                          placeholder="description"
                          onChange={(e) =>
                            handleFormFieldChange("description", e)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="collection-single-wized">
                      <label for="wallet" className="title">
                        Property address
                      </label>
                      <div className="create-collection-input">
                        <input
                          id="wallet"
                          className="url"
                          type="text"
                          placeholder="propertyAddress"
                          onChange={(e) =>
                            handleFormFieldChange("propertyAddress", e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="nuron-information mb--30">
                      <div className="single-notice-setting">
                        <div className="input">
                          <input
                            type="checkbox"
                            id="themeSwitch"
                            name="theme-switch"
                            className="theme-switch__input"
                          />
                          <label for="themeSwitch" className="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div className="content-text">
                          <p>Explicit & sensitive content</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="button-wrapper">
                      <a
                        onClick={() => handleSubmit()}
                        className="btn btn-primary-alta btn-large"
                      >
                        {isLoading ? <Loader /> : "Update"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default Update;

