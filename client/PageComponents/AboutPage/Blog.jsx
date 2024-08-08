import React from "react";

const Blog = () => {
  return (
    <div className="rn-blog-area rn-section-gapTop">
      <div className="container">
        <div className="row mb--50 align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h3
              className="title mb--0"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              Our Recent Blog
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
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-12"
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay="150"
          >
            <div
              className="rn-blog"
              data-toggle="modal"
              data-target="#exampleModalCenters"
            >
              <div className="inner">
                <div className="thumbnail">
                  <a href="blog-details.html">
                    <img
                      src="/blog/blog-02.jpg"
                      alt="Personal Portfolio Images"
                    />
                  </a>
                </div>
                <div className="content">
                  <div className="category-info">
                    <div className="category-list">
                      <a href="blog-details.html">Development</a>
                    </div>
                    <div className="meta">
                      <span>
                        {/* <i className="feather-clock"></i>  */}2 hour read
                      </span>
                    </div>
                  </div>
                  <h4 className="title">
                    <a href="blog-details.html">
                      The services provide for design{" "}
                      {/* <i className="feather-arrow-up-right"></i> */}
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-lg-4 col-md-6 col-12"
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay="200"
          >
            <div
              className="rn-blog"
              data-toggle="modal"
              data-target="#exampleModalCenters"
            >
              <div className="inner">
                <div className="thumbnail">
                  <a href="blog-details.html">
                    <img
                      src="/blog/blog-03.jpg"
                      alt="Personal Portfolio Images"
                    />
                  </a>
                </div>
                <div className="content">
                  <div className="category-info">
                    <div className="category-list">
                      <a href="blog-details.html">Design</a>
                    </div>
                    <div className="meta">
                      <span>5 min read</span>
                    </div>
                  </div>
                  <h4 className="title">
                    <a href="blog-details.html">
                      More important feature for designer
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-lg-4 col-md-6 col-12"
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay="250"
          >
            <div
              className="rn-blog"
              data-toggle="modal"
              data-target="#exampleModalCenters"
            >
              <div className="inner">
                <div className="thumbnail">
                  <a href="blog-details.html">
                    <img
                      src="/blog/blog-04.jpg"
                      alt="Personal Portfolio Images"
                    />
                  </a>
                </div>
                <div className="content">
                  <div className="category-info">
                    <div className="category-list">
                      <a href="blog-details.html">Marketing</a>
                    </div>
                    <div className="meta">
                      <span>10 min read</span>
                    </div>
                  </div>
                  <h4 className="title">
                    <a href="blog-details.html">
                      Inavalide purpose classes & motivation.
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-lg-4 col-md-6 col-12"
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay="300"
          >
            <div
              className="rn-blog"
              data-toggle="modal"
              data-target="#exampleModalCenters"
            >
              <div className="inner">
                <div className="thumbnail">
                  <a href="blog-details.html">
                    <img
                      src="/blog/blog-05.jpg"
                      alt="Personal Portfolio Images"
                    />
                  </a>
                </div>
                <div className="content">
                  <div className="category-info">
                    <div className="category-list">
                      <a href="blog-details.html">NFT's</a>
                    </div>
                    <div className="meta">
                      <span>1 min read</span>
                    </div>
                  </div>
                  <h4 className="title">
                    <a href="blog-details.html">
                      Canada is a great fact for NFT's
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
