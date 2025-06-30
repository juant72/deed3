import React from "react";

const Quote: React.FC = () => {
  return (
    <div className="rn-about-Quote-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5 d-flex align-items-center">
          <div className="col-lg-6">
            <div className="rn-about-title-wrapper">
              <h3
                className="title"
                data-sal="slide-up"
                data-sal-duration="800"
                data-sal-delay="150"
              >
                Create, Sell well & Collect your Wonderful NFTs at Nuron Very
                Fast
              </h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="rn-about-wrapper"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="150"
            >
              <p>
                The NFTs is a one-trick pony that climbed the ladders of success
                in recent years. The growth of NFTs is tremendous, and according
                to Pymnts.com, the total sales volume of NFTs has nearly crossed
                $2.5 billion in the last six months of . Surprisingly, the total
                sales volume of NFTs was $13.7 million in 2020. On comparing
                both the values,
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
