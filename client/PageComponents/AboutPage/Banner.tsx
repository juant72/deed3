import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="rn-about-banner-area rn-section-gapTop">
      <div className="container mb--30">
        <div className="row">
          <div className="col-12">
            <h2
              className="title about-title-m"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="150"
            >
              Direct Teams. <br />
              For Your Dadicated Dreams
            </h2>
          </div>
        </div>
      </div>
      <div className="container-fluid about-fluidimg ">
        <div className="row">
          <div className="img-wrapper">
            <div className="bg_image--22 bg_image"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="h--100">
              <div className="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
                <div className="inner">
                  <h2
                    className="title"
                    data-sal="slide-up"
                    data-sal-duration="800"
                    data-sal-delay="150"
                  >
                    Why We Do This
                  </h2>
                  <p
                    className="about-disc"
                    data-sal="slide-up"
                    data-sal-duration="800"
                    data-sal-delay="150"
                  >
                    NFTs are virtual tokens that represent ownership of
                    something inherently distinct and scarce, whether it be a
                    physical or digital item, such as artwork, a soundtrack, a
                    collectible, an in-game item or real estate. Unlike regular
                    cryptocurrencies like bitcoin or fiat money like the U.S.
                  </p>
                  <a
                    href="blog.html"
                    className="btn btn-primary-alta btn-large sal-animate mt--20"
                    data-sal="slide-up"
                    data-sal-duration="800"
                    data-sal-delay="150"
                  >
                    See Our Blog
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="rn-about-card transparent-bg">
              <div className="inner">
                <h3
                  className="title"
                  data-sal="slide-up"
                  data-sal-duration="800"
                  data-sal-delay="150"
                >
                  Helping You <br />
                  Grow In Every Stage.
                </h3>
                <p
                  className="about-disc mb--0"
                  data-sal="slide-up"
                  data-sal-duration="800"
                  data-sal-delay="150"
                >
                  NFTs are virtual tokens that represent ownership of something
                  inherently distinct and scarce, whether it be a physical or
                  digital item, such as artwork, a soundtrack, a collectible, an
                  in-game item or real estate. Unlike regular cryptocurrencies
                  like bitcoin or fiat money like the U.S.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
