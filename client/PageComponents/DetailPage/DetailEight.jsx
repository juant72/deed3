import React from "react";
import { Loader } from "../Components";
const DetailEight = ({
  createReview,
  handleFormFieldChange,
  commentLoading,
}) => {
  return (
    <div
      className="rn-popup-modal placebid-modal-wrapper modal fade"
      id="placebidModal"
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
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Give Review</h3>
          </div>
          <div className="modal-body">
            <p>Kindly Provide your review for a better user Experience</p>
            <div className="placebid-form-box">
              <h5 className="title">Your Comment</h5>
              <div className="bid-content">
                <div className="bid-content-top">
                  <div className="bid-content-left">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      onChange={(e) => handleFormFieldChange("comment", e)}
                    ></textarea>
                  </div>
                </div>

                <div className="bid-content-mid">
                  <span>
                    Your feed back will help user of the property to provide
                    better service
                  </span>
                </div>
              </div>
              <div className="bit-continue-button">
                <button
                  onClick={() => createReview()}
                  className="btn btn-primary w-100"
                >
                  {commentLoading ? <Loader /> : "Add Review"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary-alta mt--10"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEight;
