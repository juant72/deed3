import React from "react";
import Link from "next/link";

const ServerError: React.FC = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <div className="rn-not-found-area rn-section-gapTop">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="rn-not-found-wrapper">
                <h2 className="large-title">500</h2>
                <h3 className="title">Server Error!</h3>
                <p>Something went wrong on our end.</p>
                <Link href="/" className="btn btn-primary btn-large">
                  Go Back To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
