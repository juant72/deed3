import React from "react";

const CreateThree = ({ data, handleSubmit }) => {
  return (
    <div
      className="rn-popup-modal upload-modal-wrapper modal fade"
      id="collectionModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content share-wrapper">
          <div className="modal-body">
            <a href="product-details.html" className="rn-collection-inner-one">
              <div className="collection-wrapper">
                <div className="collection-big-thumbnail">
                  <img src={data.images} alt="Nft_Profile" />
                </div>
                <div className="collenction-small-thumbnail">
                  <img
                    src="/collection/collection-sm-01.jpg"
                    alt="Nft_Profile"
                  />
                  <img
                    src="/collection/collection-sm-02.jpg"
                    alt="Nft_Profile"
                  />
                  <img
                    src="/collection/collection-sm-03.jpg"
                    alt="Nft_Profile"
                  />
                </div>
                <div className="collection-profile">
                  <img src="/client/client-15.png" alt="Nft_Profile" />
                </div>
                <div className="collection-deg">
                  <h6 className="title">{data.propertyTitle}</h6>
                  <span className="items">{data.price} MATIC</span>
                </div>
                <div className="col-lg-12"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThree;
