import React from "react";

const NewsTwo: React.FC = () => {
  return (
    <div className="newsletter-area rn-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="newsletter-wrapper">
              <h2 className="title">Sign up for The Tide, Deeds3's newsletter!</h2>
              <p className="discription">
                Sign up to receive our monthly newsletter, featuring updates
                from the team, new decentralized applications and NFT projects,
                and trends we’re seeing in the space.
              </p>
              <input type="email" placeholder="Your Email Address..." />
              <a className="btn btn-primary mt--30" href="#">
                Subscribe
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="newsletter-right">
              <img src="/portfolio/portfolio-01.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTwo;
