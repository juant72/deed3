import React from "react";

const ForgetTwo = () => {
  return (
    <div className="forget-password-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5">
          <div className="offset-lg-4 col-lg-4">
            <div className="form-wrapper-one">
              <div className="logo-thumbnail logo-custom-css mb--50">
                <a className="logo-light" href="index.html">
                  <img src="/logo/logo-white.png" alt="nft-logo" />
                </a>
                <a className="logo-dark" href="index.html">
                  <img src="/logo/logo-dark.png" alt="nft-logo" />
                </a>
              </div>

              <div className="mb-5">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-5">
                <input
                  type="checkbox"
                  className="rn-check-box-input"
                  id="exampleCheck1"
                />
                <label className="rn-check-box-label" for="exampleCheck1">
                  I agree to the{" "}
                  <a href="privacy-policy.html">privacy policy</a>{" "}
                </label>
              </div>

              <div className="mb-5">
                <button className="btn btn-large btn-primary">Send</button>
              </div>

              <span className="mt--20 notice">
                Note: We will send a password to your email
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetTwo;
