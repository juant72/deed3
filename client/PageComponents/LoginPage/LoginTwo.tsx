import React from "react";

const LoginTwo: React.FC = () => {
  return (
    <div className="login-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5">
          <div className=" offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
            <div className="form-wrapper-one">
              <h4>Login</h4>
              <form>
                <div className="mb-5">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input type="email" id="exampleInputEmail1" />
                </div>
                <div className="mb-5">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input type="password" id="exampleInputPassword1" />
                </div>
                <div className="mb-5 rn-check-box">
                  <input
                    type="checkbox"
                    className="rn-check-box-input"
                    id="exampleCheck1"
                  />
                  <label className="rn-check-box-label" htmlFor="exampleCheck1">
                    Remember me leter
                  </label>
                </div>
                <button type="submit" className="btn btn-primary mr--15">
                  Log In
                </button>
                <a href="sign-up.html" className="btn btn-primary-alta">
                  Sign Up
                </a>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="social-share-media form-wrapper-one">
              <h6>Another way to log in</h6>
              <p>
                {" "}
                Lorem ipsum dolor sit, amet sectetur adipisicing elit.cumque.
              </p>
              <button className="another-login login-facebook">
                {" "}
                <img
                  className="small-image"
                  src="assets/images/icons/google.png"
                  alt=""
                />{" "}
                <span>Log in with Google</span>
              </button>
              <button className="another-login login-facebook">
                {" "}
                <img
                  className="small-image"
                  src="assets/images/icons/facebook.png"
                  alt=""
                />{" "}
                <span>Log in with Facebook</span>
              </button>
              <button className="another-login login-twitter">
                {" "}
                <img
                  className="small-image"
                  src="assets/images/icons/tweeter.png"
                  alt=""
                />{" "}
                <span>Log in with Twitter</span>
              </button>
              <button className="another-login login-linkedin">
                {" "}
                <img
                  className="small-image"
                  src="assets/images/icons/linkedin.png"
                  alt=""
                />{" "}
                <span>Log in with linkedin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTwo;
