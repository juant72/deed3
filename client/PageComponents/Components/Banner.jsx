import React from "react";
import Link from "next/link";

const Banner = () => {
  const category=[
    {
      name: "Housing",
      link:"/housing",
      worth: 4264.2383,
    },
    {
      name: "Office",
      link:"/office",
      worth: 4264.2383,
    },
    {
      name: "Farmhouse",
      link:"/farmhouse",
      worth: 1264.2383,
    },
    {
      name: "Rental",
      link:"/rental",
      worth: 9264.2383,
    },
    {
      name: "Commercial",
      link:"/comercial",
      worth: 4264.2383,
    },
    {
      name: "Country",
      link:"/country",
      worth: 4264.2383,
    },
  ];
  
  return (
    <div className="banner-three slider-style-3 pt--70">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="wrapper">
              <div className="slider">
                <div className="slider-thumbnail thumbnail-overlay">
                  <a href="product-details.html">
                    <img className="w-100"
                      src="/portfolio/portfolio-11.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <div className="read-wrapper">
                    <h5>
                      <a href="product-details.html">@encrypia</a>
                    </h5>
                    <span>Join Membership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col lg-7">
            <div className="row g-4">
              {category.map((el,i) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                      <div className="slide-small-wrapper">
                        <Link 
                          href={{
                            pathname: `/category${el.link}`,
                            query: {name: `${el.name}`},
                          }}
                        >
                          <img 
                            className="w-100"
                            src={`/portfolio/portfolio-${i+12}.jpg`}
                            alt="NFT_Profile"
                          />
                        </Link>
                      </div>
                      <div className="read-wrapper">
                        <h5 className="title">
                          <a href="#">{el.name}</a>
                        </h5>
                        <span>{el.worth} MATIC</span>
                      </div>
                    </div>
                  )
                ) 
              }
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Banner;
