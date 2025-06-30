import React from "react";
import PropertyList from "../../components/property/PropertyList";

const ExplorTwo: React.FC = () => {
  return (
    <div className="rn-product-area rn-section-gapTop masonary-wrapper-activation">
      <div className="container">
        <div className="row mb--30 align-items-center">
          <div className="col-lg-4">
            <div className="section-title">
              <h3 className="title mb--0">Explore Product</h3>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end mt_md--30 mt_sm--30">
              <button data-filter="*" className="is-checked">
                <span className="filter-text">All Items</span>
              </button>
              <button data-filter=".cat--1">
                <span className="filter-text">Art</span>
              </button>
              <button data-filter=".cat--2">
                <span className="filter-text">Music</span>
              </button>
              <button data-filter=".cat--3">
                <span className="filter-text">Vedio</span>
              </button>
              <button data-filter=".cat--4">
                <span className="filter-text">Collectionable</span>
              </button>
              <button data-filter=".cat--5">
                <span className="filter-text">Highest</span>
              </button>
              <button data-filter=".cat--6">
                <span className="filter-text">Lowest</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="grid-metro5 mesonry-list">
            <div className="resizer"></div>

            <div className="grid-metro-item cat--1 cat--3">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-01.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="Takur">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="Nuron" data-tooltip="Tamim">
                      <img src="/client/client-2.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="Tamin" data-tooltip="Sower">
                      <img src="/client/client-3.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      36+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Preatent</span>
                </a>
                <span className="latest-bid">Highest bid 1/20</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.244wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">322</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat-3 cat--4">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-02.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip="Mr.Jone-lee"
                    >
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip=":Mr.Jone-ee"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      32+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Diamond Dog</span>
                </a>
                <span className="latest-bid">Highest bid 5/11</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.892wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">420</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--5 cat--6">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-03.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip="Mr.Jone-lee"
                    >
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip=":Mr.Jone-ee"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      6+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">OrBid6</span>
                </a>
                <span className="latest-bid">Highest bid 2/31</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.2128wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--1 cat--2">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-04.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip="Mr.Jone-lee"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      className="avatar"
                      data-tooltip=":Mr.Jone-ee"
                    >
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      3+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Morgan11</span>
                </a>
                <span className="latest-bid">Highest bid 3/16</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.265wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">20</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--1 cat--2">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-05.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee Tus">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="M lee">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Favis">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      9+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">mAtal8</span>
                </a>
                <span className="latest-bid">Highest bid 6/50</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.244wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">205</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--1 cat--2">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee Tus">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="M lee">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Favis">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      36+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Platonum</span>
                </a>
                <span className="latest-bid">Highest bid 1/10</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.450wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">65</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--5 cat--4">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-07.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee Tus">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="M lee">
                      <img src="/client/client-6.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Favis">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      15+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">PlatOrgan</span>
                </a>
                <span className="latest-bid">Highest bid 2/22</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.311wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">56</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--5 cat--6">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-08.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee Tus">
                      <img src="/client/client-3.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="M lee">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Favis">
                      <img src="/client/client-4.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      11+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Orgajis</span>
                </a>
                <span className="latest-bid">Highest bid 2/10</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.244wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">89</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat--1 cat--3">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-01.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="lee Tus">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="M lee">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Favis">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      10+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Preatent</span>
                </a>
                <span className="latest-bid">Highest bid 1/20</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.244wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">322</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-metro-item cat-3 cat--4">
              <div className="product-style-one no-overlay">
                <div className="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-02.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    <a href="author.html" className="avatar" data-tooltip="Tumis">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip="Warner">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" className="avatar" data-tooltip=":Fagars">
                      <img src="/client/client-6.png" alt="Nft_Profile" />
                    </a>
                    <a className="more-author-text" href="#">
                      25+ Place Bit.
                    </a>
                  </div>
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
                        className="btn-setting-text share-text"
                        data-bs-toggle="modal"
                        data-bs-target="#shareModal"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        className="btn-setting-text report-text"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <a href="product-details.html">
                  <span className="product-name">Diamond Dog</span>
                </a>
                <span className="latest-bid">Highest bid 5/11</span>
                <div className="bid-react-area">
                  <div className="last-bid">0.892wETH</div>
                  <div className="react-area">
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      className="sc-bdnxRM sc-hKFxyN kBvkOu"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <span className="number">420</span>
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

export default PropertyList;
