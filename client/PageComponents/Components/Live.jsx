import React from "react";

const Live = ({ properties }) => {
  console.log(properties);
  return (
    <div className="rn-live-bidding-area rn-section-gapTop">
      <div className="container">
        <div className="row mb--30">
          <div className="col-lg-12">
            <div className="section-title">
              <h3
                className="tittle mb--00 live-bidding-title"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                Live Bidding
              </h3>
            </div>
          </div>
        </div>

        <div className="row g-5">
          {properties.map((property, i) => (
            <div
              className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800">
              <div
                className="product-style-one"
                data-sal="slide-up"
                data-sal-duration="800"
                data-sal-delay="150">
                <div
                  className="card-thumbnail">
                  <a href={`/detail?property=${property.productId}`}>
                    <img src={property.image} alt={property.title} />
                  </a>
                </div>
                <div className="product-share-wrapper">
                  <div className="profile-share">
                    {
                      properties.reviewers.map((el, i) => (
                        <a
                          className="avatar"
                          data-tooltip={`${el.slice(0, 15)}...`}>
                          <img src={`/client/client-${i + 1}.png`} alt="Nft_profile" />
                        </a>
                      ))}
                    
                    {
                      property.reviewers.length!== 0 && (
                        <a class="more-author-text" href="#">
                          Interested Users
                        </a>
                      )}
                  </div>
                  <a ref="product-details.html">
                    <span class="product-name">
                      { property.title.length >= 25 
                        ? `${property.title.slice(0,22)}...` 
                        : property.title}
                    </span>
                  </a>
                  <span className="latest-bid">Highest bid 1/20</span>
                  <div class="bid-react-area">
                    <div className="last-bid">0.244wETH</div>
                    <div className="react-area">
                      <svg
                        viewBox="0 0 17 16"
                        fill="none"
                        width="16"
                        height="16"
                        className="sc-bdoxRM sc-hKFxyN kBykQy"
                      >

                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))

          }

        </div>
      </div>

    </div>
  )
};

export default Live;
