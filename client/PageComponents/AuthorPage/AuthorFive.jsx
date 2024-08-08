import React from "react";

const AuthorFive = () => {
  return (
    <div
      className="rn-popup-modal report-modal-wrapper modal fade"
      id="reportModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        {/* <i data-feather="x"></i> */}
      </button>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content report-content-wrapper">
          <div className="modal-header report-modal-header">
            <h5 className="modal-title">Why are you reporting?</h5>
          </div>
          <div className="modal-body">
            <p>
              Describe why you think this item should be removed from
              marketplace
            </p>
            <div className="report-form-box">
              <h6 className="title">Message</h6>
              <textarea name="message" placeholder="Write issues"></textarea>
              <div className="report-button">
                <button type="button" className="btn btn-primary mr--10 w-auto">
                  Report
                </button>
                <button
                  type="button"
                  className="btn btn-primary-alta w-auto"
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

export default AuthorFive;
