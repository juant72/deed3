import React from "react";

const Copyright = () => {
  return (
    <>
      <div className="copy-right-one ptb--20 bg-color--1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="copyright-left">
                <span>©2024 Powered by Encrypia, Inc. All rights reserved.</span>
                <ul className="privacy">
                  <li>
                    <a href="terms-condition.html">Terms</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="copyright-right"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>

      <div className="rn-progress-parent">
        <svg
          className="rn-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </>
  );
};

export default Copyright;
