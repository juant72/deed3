import React from "react";

const DetailFive = () => {
  return (
    <div
      className="rn-popup-modal share-modal-wrapper modal fade"
      id="shareModal"
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
        <div className="modal-content share-wrapper">
          <div className="modal-header share-area">
            <h5 className="modal-title">Share this NFT</h5>
          </div>
          <div className="modal-body">
            <ul className="social-share-default">
              <li>
                <a href="#">
                  <span className="icon">
                    {/* <i data-feather="facebook"></i> */}
                  </span>
                  <span className="text">facebook</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    {/* <i data-feather="twitter"></i> */}
                  </span>
                  <span className="text">twitter</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    {/* <i data-feather="linkedin"></i> */}
                  </span>
                  <span className="text">linkedin</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    {/* <i data-feather="instagram"></i> */}
                  </span>
                  <span className="text">instagram</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    {/* <i data-feather="youtube"></i> */}
                  </span>
                  <span className="text">youtube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailFive;
