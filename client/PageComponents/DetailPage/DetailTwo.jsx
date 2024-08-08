import React from "react";
import Countdown from "react-countdown";
import { Loader } from "../../PageComponents/Components";
const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviews,
  likeReviewCall,
  buyingProperty,
  address,
  isLoading,
  buyLoading,
}) => {
  const timeComment = new Date(new Date() - Math.random() * 1e12);

  return (
    <div className="product-details-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="product-tab-wrapper rbt-sticky-top-adjust">
              <div className="pd-tab-inner">
                <div
                  className="nav rn-pd-nav rn-pd-rt-content nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <span className="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-01.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <span className="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <span className="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                </div>

                <div className="tab-content rn-pd-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="rn-pd-thumbnail">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <img src={property?.image} alt="Nft_Profile" />
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div className="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <div className="pd-title-area">
                <h4 className="title">{property?.title?.slice(0, 25)}..</h4>
                <div className="pd-react-area">
                  <div className="heart-count">
                    <span>{parsedReviews?.length}</span>
                  </div>
                  <div className="count">
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
                        {property?.owner.toLowerCase() == address && (
                          <button
                            type="button"
                            className="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Update Price
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="title-name">
                #{property?.productID} Portal , Info bellow
              </h6>
              <div className="catagory-collection">
                <div className="catagory">
                  <span>
                    Catagory <span className="color-body">10% royalties</span>
                  </span>
                  <div className="top-seller-inner-one">
                    <div className="top-seller-wrapper">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/client/client-1.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div className="top-seller-content">
                        <a href="#">
                          <h6 className="name">Only 10% Own</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collection">
                  <span>Collections</span>
                  <div className="top-seller-inner-one">
                    <div className="top-seller-wrapper">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/client/client-2.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div className="top-seller-content">
                        <a href="#">
                          <h6 className="name">{property?.category}</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rn-bid-details">
                <div className="tab-wrapper-one">
                  <nav className="tab-button-one">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="false"
                      >
                        Comments
                      </button>
                      <button
                        className="nav-link active"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        Details
                      </button>
                      <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Users interest
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content rn-bid-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      {parsedReviews?.map((review, i) => (
                        <div
                          onClick={(e) =>
                            likeReviewCall(property, review.reviewIndex)
                          }
                          key={i + 1}
                          className="top-seller-inner-one"
                        >
                          <div className="top-seller-wrapper">
                            <div className="thumbnail">
                              <a href="#">
                                <img
                                  src={`/client/client-${i + 1}.png`}
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div className="top-seller-content">
                              <span>{review?.reviewer.slice(0, 35)}... </span>
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
                                <span className="number">
                                  <strong>{review?.likes} </strong> (
                                  {i + 1 + 0.5} hours ago)
                                </span>
                              </div>
                              <span className="count-number">
                                {review?.comment.slice(0, 70)}
                                {review?.comment.length >= 93 ? "..." : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div className="rn-pd-bd-wrapper">
                        <div className="top-seller-inner-one">
                          <h6 className="name-title">Owner</h6>
                          <div className="top-seller-wrapper">
                            <div className="thumbnail">
                              <a href="#">
                                <img
                                  src="/client/client-1.png"
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div className="top-seller-content">
                              <a href="#">
                                <h6 className="name">
                                  {property?.owner?.slice(0, 20)}..
                                </h6>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="rn-pd-sm-property-wrapper">
                          <div className="pd-property-inner">
                            <h6 className="pd-property-title"> Title</h6>
                            <span className="color-white value">
                              {property?.title}
                            </span>
                          </div>
                          <div className="pd-property-inner">
                            <h6 className="pd-property-title"> Description</h6>

                            <span className="color-white value">
                              {property?.description}
                            </span>
                          </div>
                          <div className="pd-property-inner">
                            <h6 className="pd-property-title"> Address</h6>

                            <span className="color-white value">
                              {property?.address}
                            </span>
                          </div>
                          <div className="pd-property-inner">
                            <h6 className="pd-property-title">
                              {" "}
                              Price 18 Decimal Points: {property?.price} Matic
                            </h6>
                          </div>
                          <div className="pd-property-inner">
                            <h6 className="pd-property-title">
                              {" "}
                              Property ID: {property?.productID}
                            </h6>
                          </div>
                        </div>

                        <div className="rn-pd-sm-property-wrapper">
                          <h6 className="pd-property-title">Catagory</h6>
                          <div className="catagory-wrapper">
                            <div className="pd-property-inner">
                              <span className="color-body type">TYPE</span>
                              <span className="color-white value ">
                                {property?.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      {parsedReviews?.map((interest, i) => (
                        <div key={i + 1} className="top-seller-inner-one">
                          <div className="top-seller-wrapper">
                            <div className="thumbnail">
                              <a href="#">
                                <img
                                  src={`/client/client-${i + 1}.png`}
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div className="top-seller-content">
                              <span className="count-number">
                                {interest?.reviewer.slice(0, 40)}...
                              </span>
                              <span>{i + 1} hours ago</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="place-bet-area">
                  <div className="rn-bet-create">
                    <div className="bid-list winning-bid">
                      <h6 className="title">Recent Comment</h6>
                      {parsedReviews
                        ?.reverse()
                        .map((recentReview, i) => (
                          <div className="top-seller-inner-one">
                            <div className="top-seller-wrapper">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="/client/client-7.png"
                                    alt="Nft_Profile"
                                  />
                                </a>
                              </div>
                              <div className="top-seller-content">
                                <span className="heighest-bid">
                                  {recentReview?.reviewer.slice(0, 20)}...
                                </span>
                                <span className="count-number">
                                  {" "}
                                  {recentReview?.comment.length >= 50
                                    ? `${recentReview?.comment.slice(0, 60)}...`
                                    : recentReview?.comment}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                        .slice(0, 1)}
                    </div>
                    <div className="bid-list left-bid">
                      <h6 className="title">Property Stats</h6>
                      <div className=" mt--15" data-date="2025-12-09">
                        <div className="countdown-container days">
                          <span className="countdown-value">Price: </span>
                          <span className="countdown-heading">
                            {property?.price} MATIC
                          </span>
                        </div>
                        <div className="countdown-container hours">
                          <span className="countdown-value">Comments: </span>
                          <span className="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                        <div className="countdown-container minutes">
                          <span className="countdown-value"> Interest: </span>
                          <span className="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                        <div className="countdown-container seconds">
                          Time Left: <Countdown date={Date.now() + 23455000} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => buyingProperty()}
                    type="button"
                    className="btn btn-primary-alta mt--30"
                  >
                    {buyLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {address?.toLowerCase() == property?.owner.toLowerCase()
                          ? "You can't buy your owned Property"
                          : `${property?.price} MATIC Buy Property`}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-alta mt--30"
                    data-bs-toggle="modal"
                    data-bs-target="#placebidModal"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTwo;
