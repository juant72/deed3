import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

//INTERNAL IMPORT
import { Loader } from "../Components";
import { CreateThree } from ".";
import { useStateContext } from "../../context";
import { checkIfImage } from "../../utils";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "Commercial",
  "Country",
];

const CreateTwo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [diplayImg, setDiplayImg] = useState<string | null>(null);
  const [fileName, setFileName] = useState("Upload Image");

  const {
    currentAccount,
    // createPropertyFunction,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    loader,
    setLoader,
    notifySuccess,
    notifyError,
  } = useStateContext();

  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
  });

  // Temporary function until context is fixed
  const createPropertyFunction = async (data: any) => {
    console.log("Creating property:", data);
    // TODO: Implement actual property creation
  };

  const handleFormFieldChange = (fileName: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fileName]: e.target.value });
  };

  //NEW
  const handleSubmit = async () => {
    setIsLoading(true);

    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    console.log(
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress
    );

    if (images || propertyTitle || price || category || description) {
      await createPropertyFunction({
        ...form,
        price: ethers.parseEther(form.price),
      });
      setIsLoading(false);
    } else {
      console.log("provide detail");
    }
  };
  //
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
    <>
      <div className="creat-collection-area pt--80">
        <div className="container">
          <div className="row g-5 ">
            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              <div className="collection-single-wized banner">
                <label className="title required">Property image</label>

                <div className="create-collection-input logo-image">
                  <div className="logo-c-image logo">
                    <img
                      id="rbtinput1"
                      src={diplayImg || "/profile/profile-01.jpg"}
                      alt="Profile-NFT"
                    />
                    <label htmlFor="fatima" title="No File Choosen">
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
                    <img
                      id="rbtinput2"
                      src="/profile/cover-04.png"
                      alt="Profile-NFT"
                    />
                    <label htmlFor="nipa" title="No File Choosen">
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
                    <img
                      id="createfileImage"
                      src="/profile/cover-03.jpg"
                      alt="Profile-NFT"
                    />
                    <label htmlFor="createinputfile" title="No File Choosen">
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
                      <label htmlFor="name" className="title required">
                        Property Title
                      </label>
                      <div className="create-collection-input">
                        <input
                          id="name"
                          className="name"
                          type="text"
                          required
                          placeholder="propertyTitle"
                          onChange={(e) =>
                            handleFormFieldChange("propertyTitle", e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="collection-single-wized">
                      <label htmlFor="url" className="title">
                        Image
                      </label>
                      <div className="create-collection-input">
                        <input
                          id="url"
                          className="url"
                          type="text"
                          required
                          placeholder="images"
                          onChange={(e) => handleFormFieldChange("images", e)}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="collection-single-wized">
                      <label className="title">Category</label>
                      <div className="create-collection-input">
                        <div className="nice-select mb--30" tabIndex={0}>
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
                      <label htmlFor="description" className="title">
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
                      <label htmlFor="earning" className="title">
                        Price
                      </label>
                      <div className="create-collection-input">
                        <input
                          id="earning"
                          className="url"
                          type="number"
                          placeholder="price"
                          onChange={(e) => handleFormFieldChange("price", e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="collection-single-wized">
                      <label htmlFor="wallet" className="title">
                        Property Address
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
                          <label htmlFor="themeSwitch" className="theme-switch__label">
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
                        href="#"
                        className="btn btn-primary btn-large mr--30"
                        data-bs-toggle="modal"
                        data-bs-target="#collectionModal"
                      >
                        Preview
                      </a>
                      <a
                        onClick={() => handleSubmit()}
                        className="btn btn-primary-alta btn-large"
                      >
                        {isLoading ? <Loader /> : "Create"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateThree data={form} handleSubmit={handleSubmit} />
      {loader && <Loader />}
    </>
  );
};

export default CreateTwo;
