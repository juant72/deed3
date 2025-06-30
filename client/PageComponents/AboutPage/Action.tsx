import React from "react";

const Action: React.FC = () => {
  return (
    <div className="rn-callto-action rn-section-gapTop">
      <div className="container-fluid about-fluidimg-cta">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="bg_image--6 bg_image bg-image-border"
              data-black-overlay="7"
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="call-to-action-wrapper">
                    <h3
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      Discover rare digital art <br /> and collect NFTs
                    </h3>
                    <p
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      The NFTs is a one-trick pony that climbed the recent
                      years. The growth of NFTs is tremendous, and according to
                      Pymnts.com, the total sales volume{" "}
                    </p>
                    <div
                      className="callto-action-btn-wrapper"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      <a href="create.html" className="btn btn-primary btn-large">
                        Create
                      </a>
                      <a
                        href="contact.html"
                        className="btn btn-primary-alta btn-large"
                      >
                        Contact Us
                      </a>
                    </div>
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

export default Action;
