import React from "react";

const ContactThree: React.FC = () => {
  return (
    <div className="login-area message-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-6"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <div className="connect-thumbnail">
              <div className="left-image">
                <img src="/contact/contact1.png" alt="Nft_Profile" />
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-sal="slide-up"
            data-sal-delay="200"
            data-sal-duration="800"
          >
            <div className="form-wrapper-one registration-area">
              <h3 className="mb--30">Contact Us</h3>
              <form
                className="rwt-dynamic-form"
                id="contact-form"
                method="POST"
                action="mail.php"
              >
                <div className="mb-5">
                  <label for="contact-name" className="form-label">
                    Your Name
                  </label>
                  <input name="contact-name" id="contact-name" type="text" />
                </div>
                <div className="mb-5">
                  <label for="contact-email" className="form-label">
                    Email
                  </label>
                  <input id="contact-email" name="contact-email" type="email" />
                </div>
                <div className="mb-5">
                  <label for="subject" className="form-label">
                    Subject
                  </label>
                  <input id="subject" name="subject" type="text" />
                </div>
                <div className="mb-5">
                  <label for="contact-message" className="form-label">
                    Write Message
                  </label>
                  <textarea
                    name="contact-message"
                    id="contact-message"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-5 rn-check-box">
                  <input
                    id="condition"
                    type="checkbox"
                    className="rn-check-box-input"
                  />
                  <label for="condition" className="rn-check-box-label">
                    Allow to all tearms & condition
                  </label>
                </div>
                <button name="submit" type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactThree;
