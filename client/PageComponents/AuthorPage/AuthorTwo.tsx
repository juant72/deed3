import React from "react";

const AuthorTwo: React.FC<{ address, author }> = ({ address, author }) => {
  return (
    <div className="rn-author-area mb--30 mt_dec--120">
      <div className="container">
        <div className="row padding-tb-50 align-items-center d-flex">
          <div className="col-lg-12">
            <div className="author-wrapper">
              <div className="author-inner">
                <div className="user-thumbnail">
                  <img src="/profile/profile-01.jpg" alt="" />
                </div>
                <div className="rn-author-info-content">
                  <h4 className="title">{address?.slice(0, 20)}...</h4>
                  <a href="#" className="social-follw">
                    {/* <i data-feather="twitter"></i> */}
                    <span className="user-name">it0bsession</span>
                  </a>
                  <div className="follow-area">
                    <div className="follow followers">
                      <span>
                        186k{" "}
                        <a href="#" className="color-body">
                          followers
                        </a>
                      </span>
                    </div>
                    <div className="follow following">
                      <span>
                        {author?.length}{" "}
                        <a href="#" className="color-body">
                          Owned Property
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="author-button-area">
                    <span className="btn at-follw follow-button">Follow</span>
                    <span
                      className="btn at-follw share-button"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    ></span>
                    <div className="count at-follw">
                      <div className="share-btn share-btn-activation dropdown">
                        <button
                          className="icon"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <svg
                            viewBox="0 0 14 4"
                            fill="none"
                            width="16"
                            height="16"
                            className="sc-bdnxRM sc-hKFxyN hOiKLt"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>

                        <div className="share-btn-setting dropdown-menu dropdown-menu-end">
                          <button
                            type="button"
                            className="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Report
                          </button>
                          <button
                            type="button"
                            className="btn-setting-text report-text"
                          >
                            Claim Owenership
                          </button>
                        </div>
                      </div>
                    </div>
                    <a
                      href="edit-profile.html"
                      className="btn at-follw follow-button edit-btn"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTwo;
