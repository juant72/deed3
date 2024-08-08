import React from "react";
import Link from "next/link";

const Collection = ({ housing, rental, farmhouse, office }) => {
  const topCollection = [
    {
      name: "Housing",
      link: "/housing",
      item: housing,
    },
    {
      name: "Office",
      link: "/office",
      item: office,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      item: farmhouse,
    },
    {
      name: "Rental",
      link: "/rental",
      item: rental,
    },
  ];
  return (
    <div className="rn-collection-area rn-section-gapTop">
      <div className="container">
        <div className="row mb--50 align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h3
              className="title mb--0"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              Top Collection
            </h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
            <div
              className="view-more-btn text-start text-sm-end"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <a className="btn-transparent" href="#">
                VIEW ALL
              </a>
            </div>
          </div>
        </div>

        <div className="row g-5">
          {topCollection.map((collection, i) => (
            <div
              key={i + 1}
              data-sal="slide-up"
              data-sal-delay="150"
              data-sal-duration="800"
              className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12"
            >
              <Link
                href={{
                  pathname: `/category${collection.link}`,
                  query: { name: `${collection.name}` },
                }}
                className="rn-collection-inner-one"
              >
                <div className="collection-wrapper">
                  <div className="collection-big-thumbnail">
                    <img
                      src={`/portfolio/portfolio-${i + 15}.jpg`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div className="collenction-small-thumbnail">
                    <img
                      src={`/portfolio/portfolio-${i + 16}.jpg`}
                      alt="Nft_Profile"
                    />
                    <img
                      src={`/portfolio/portfolio-${i + 17}.jpg`}
                      alt="Nft_Profile"
                    />
                    <img
                      src={`/portfolio/portfolio-${i + 11}.jpg`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div className="collection-profile">
                    <img
                      src={`/client/client-${i + 1}.png`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div className="collection-deg">
                    <h6 className="title">{collection.name}</h6>
                    <span className="items">{collection.item} Items</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
