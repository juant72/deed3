import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";
const Collection: React.FC<{ category, isLoading }> = ({ category, isLoading }) => {
  return (
    <div className="rn-collection-area rn-section-gapTop">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row g-5">
            {category?.map((el, i) => (
              <div
                data-sal=""
                data-sal-delay="150"
                data-sal-duration="800"
                className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12"
              >
                <a
                  href={`/detail?property=${el.productID}`}
                  className="rn-collection-inner-one"
                >
                  <div className="collection-wrapper">
                    <div className="collection-big-thumbnail">
                      <img src={el.image} alt="Nft_Profile" />
                    </div>
                    <div className="collenction-small-thumbnail">
                      {[1, 2, 3].map((el, i) => (
                        <img
                          src={`/collection/collection-sm-0${i + 1}.jpg`}
                          alt="Nft_Profile"
                        />
                      ))}
                    </div>
                    <div className="collection-profile">
                      <img src={`/client/client-15.png`} alt="Nft_Profile" />
                    </div>
                    <div className="collection-deg">
                      <h6 className="title">{el.title}</h6>
                      <span className="items">{el.price} MATIC</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="row">
            <div
              className="col-lg-12"
              data-sal=""
              data-sal-delay="550"
              data-sal-duration="800"
            >
              <nav
                className="pagination-wrapper"
                aria-label="Page navigation example"
              >
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link active" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
