import React from "react";

const Statistick: React.FC = () => {
  return (
    <div className="rn-statistick-area rn-section-gapTop">
      <div className="container">
        <div className="row mb--30">
          <div className="col-12 text-center">
            <h3>Deeds3 Statistics</h3>
          </div>
        </div>
        <div className="row g-5">
          <div className="offset-lg-2 col-lg-4 col-md-6">
            <div className="single-counter-up text-center">
              <h3 className="counter">
                <span data-count="309">40</span>
              </h3>
              <div className="botton-title">Deeds3 All NFT's</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-counter-up text-center">
              <h3 className="counter">
                <span data-count="508">200</span>
              </h3>
              <div className="botton-title">All Creators</div>
            </div>
          </div>
          <div className="offset-lg-2 col-lg-4 col-md-6">
            <div className="single-counter-up text-center">
              <h3 className="counter">
                <span data-count="1032">700</span>
              </h3>
              <div className="botton-title">Deeds3 Earning</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-counter-up text-center">
              <h3 className="counter">
                <span data-count="650">1000</span>
              </h3>
              <div className="botton-title">Level One Seller</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistick;


