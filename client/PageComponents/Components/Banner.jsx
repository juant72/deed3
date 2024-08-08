import React from "react";
import Link from "next/link";

const Banner = () => {
  const category = [
    {
      name: "Housing",
      link: "/housing",
      worth: 535.566,
    },
    {
      name: "Office",
      link: "/office",
      worth: 6435.66,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      worth: 12445.566,
    },
    {
      name: "Rental",
      link: "/rental",
      worth: 34535.566,
    },
    {
      name: "Commercial",
      link: "/commercial",
      worth: 553435.566,
    },
    {
      name: "Country",
      link: "/country",
      worth: 1234535,
    },
  ];
  return (
    <div className="banner-three slider-style-3 pt--70">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="wrapper">
              <div className="slider ">
                <div className="slider-thumbnail thumbnail-overlay">
                  <a>
                    <img
                      className="w-100"
                      src="/portfolio/portfolio-11.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <div className="read-wrapper">
                    <h5>
                      <a>@encrypia</a>
                    </h5>
                    <span>Join Membership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              {category.map((el, i) => (
                <div key={i + 1} className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="slide-small-wrapper">
                    <div className="thumbnail thumbnail-overlay">
                      <Link
                        href={{
                          pathname: `/category${el.link}`,
                          query: { name: `${el.name}` },
                        }}
                      >
                        <img
                          className="w-100"
                          src={`/portfolio/portfolio-${i + 12}.jpg`}
                          alt="Nft_Profile"
                        />
                      </Link>
                    </div>
                    <div className="read-wrapper">
                      <h5 className="title">
                        <Link href="#">{el.name}</Link>
                      </h5>
                      <span>{el.worth} MATIC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
