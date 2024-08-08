import React from "react";

const ForgetOne = () => {
  return (
    <div className="rn-breadcrumb-inner ptb--30">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <h5 className="title text-center text-md-start">Forget Password?</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <ul className="breadcrumb-list">
              <li className="item">
                <a href="index.html">Home</a>
              </li>
              <li className="separator">
                <i className="feather-chevron-right"></i>
              </li>
              <li className="item current">Forget Password?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetOne;
