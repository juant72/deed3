import React from "react";
import Link from "next/link";

import {useStateContext} from "../../context";

const Header = () => {
  //Contract Data
  const {userBalance, disconnect, address,contract, connect}=useStateContext();



  return (
    <>
      <header className="rn-header header-default header--sticky">
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <div className="logo-thumbnail logo-custom-css">
                <a className="logo-light" href="/">
                  <img src="/logo/logo-white.png" alt="nft-logo" />
                </a>
                <a className="logo-dark" href="/">
                  <img src="/logo/logo-dark.png" alt="nft-logo"/>
                </a>
                <div className="mainmenu-wrapper">
                  <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                    <ul className="mainmenu">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="about">About</a>
                      </li>
                      <li>
                        <a href="explore">Explore</a>
                        <ul className="submenu">
                          <li>
                            <a href="/collection">
                            Collection<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/active">
                            Activity<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/author">
                            Author<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/connect">
                            Connect<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/create">
                            Create<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/detail">
                            Detail<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/product">
                            Product<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/blog">
                            Blog<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>  
                            <a href="/contact">
                            Contact<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>  
                            <a className="live-expo" href="/explore">
                            Explore<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>  
                            <a className="live-expo" href="/forget">
                            Forget<i className="feather-fast-forward"></i>
                            </a>
                          </li>
                          <li>
                            <Link
                              className="live-expo"
                              href="explore-live-three.html"
                              >
                                Live With Place Bid
                              </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="">Pages</Link>
                        <ul className="submenu">
                          <li>
                            <a href="/fourm">
                            Fourm<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/login">
                            Login<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/news">
                            News<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/privacy">
                            Privacy<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/ranking">
                            Ranking<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/signup">
                            SignUp<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/upcoming">
                            Upcoming<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/edit-profile">
                            Edit Profile<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                          <li>
                            <a href="/404">
                            404<i className="feather-fast-foward"></i>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link className="down" href="/blog">
                        Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="header-right">
                <div className="setting-option d-none d-lg-block">
                  <form className="search-form-wrapper" action="#">
                    <input
                      type="search"
                      placeholder="Search Here"
                      aria-label="Search"
                    />
                    <div className="search-icon">
                      <button>
                        <i className="feather-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="settting-option rn-icon-list d-block d-lg-none">
                  <div className="icon-box search-mobile-icon">
                    <button>
                      <i className="feather-search"></i>
                    </button>
                  </div>
                  <form
                    id="header-search-1"
                    action="#"
                    method="GET"
                    className="large-mobile-blog-search">
                      <div className="rn-search-mobile form-group">
                        <button type="submit" className="search-button">
                          <i className="feather-search"></i>
                        </button>
                        <input type="text" placeholder="Search..."/>
                      </div>
                  </form>
                </div>

                {/* //Connect Wallet */}

                {
                  address ? (
                    ""
                  ):(
                  <div
                    className="setting-option header-btn rbt-site-header"
                    id="rbt-site-header">
                      <div className="icon-box">
                        <button
                          onClick={()=>connect()}
                          className="btn btn-primary-alta btn-small"
                          href="connect.html">
                            Wallet connect
                          </button>
                      </div>
                  </div>
                  )                  
                }

                {/* END CONNECT WALLET */}



                <div className="setting-option rn-icon-list notification-badge">
                  <div className="icon-box">
                    <a href="activity.html">
                      <i className="feather-bell"></i>
                      <span className="badge">6</span>
                    </a>
                  </div>
                </div>

                {
                  address ? (
                    <div >
                    <div className="setting-option rn-icon-list user-account">
                      <div className="icon-box">
                        <a href="author.html">
                          <img src="/icons/boy-avater.png" alt="Images" />
                        </a>
                        <div className="rn-dropdown">
                          <div className="rn-inner-top">
                            <h4 className="title">
                              <a href="product-details.html">
                                {address.slice(0,15)}
                              </a>
                            </h4>
                            <span>
                              <a href="#">Set Display Name</a>
                            </span>
                          </div>
                          <div className="rn-product-inner">
                            <ul className="product-list">
                              <li className="single-product-list">
                                <div className="thumbnail">
                                  <a href="product-details.html">
                                    <img 
                                      src="/portfolio/portfolio-07.jpg"
                                      alt="Nft Product Images"
                                    />
                                  </a>
                                </div>
                                <div className="content">
                                  <h6 className="title">
                                    <a href="product-details.html">Balance</a>
                                  </h6>
                                  {/* <span className="price">{userBalance?.slice(0,6)}</span>*/}
                                  <span className="price">{userBalance ? userBalance.toString().slice(0, 6) : '0.0000'}</span>
                                </div>                              
                                <div className="button"></div>
                              </li>
                            </ul>
                          </div>
                          <div className="add-fund-button mt--20 pb--20">
                            <a className="btn btn-primary-alta w-100" href="/connect">
                            Add your more funds
                            </a>
                          </div>
                          <ul className="list-inner">
                            <li>
                              <a href="/author">My profile</a>
                            </li>
                            <li>
                              <a href="/edit-profile">Edit Proffile</a>
                            </li>
                            <li>
                              <a href="/connect">Manage funds</a>
                            </li>
                            <li>
                              <a href="#" onClick={()=>{disconnect()}}>Disconnect</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  ):(
                    ""
                  )
                }

               

                <div className="setting-option mobile-menu-bar d-block d-xl-none">
                  <div className="hamberger">
                    <button className="hamberger-button">
                      <i className="feather-menu"></i>
                    </button>
                  </div>
                </div>

                <div id="my_switcher" className="my_switcher setting-option">
                  <ul>
                    <li>
                      {/* <a href="javascript: void(0);" */}
                      <a href="#" onClick={(e)=>{e.preventDefault();}}
                      data-theme="light"
                      className="setColor light">
                        <img className="sun-image" src="/icons/sun-01.svg"
                        alt="Sun images" />
                      </a>
                    </li>
                    <li>
                      {/* <a href="javascript: void(0);" */}
                      <a href="#" onClick={(e)=>{e.preventDefault();}}
                      data-theme="dark"
                      className="setColor dark">
                        <img
                          className="Victor Image"
                          src="/icons/vector.svg"
                          alt="Vector Images"/>
                      </a>
                    </li>
                    <li>
                      <a className="nav-link its new" href="/blog">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                  </ul>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo logo-custom-css">
              <a className="logo-light" href="index.html">
                <img src="/logo/logo-white.png" alt="nft-logo" />
              </a>
              <a className="logo-dark" href="index.html">
                <img src="/logo/logo-dark.png" alt="nft-logo" />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="feather-x"></i>
              </button>
            </div>
          </div>
        </div>
        <nav>
          <ul className="mainmenu">
            <li>
              <a className="nav-a its_new" href="/">
                Home
              </a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a className="nav-a its_new" href="/explor">
                Explore
              </a>
            </li>
            <li>
              <a className="nav-a its_new" href="/">
                Pages
              </a>
            </li>
            <li>
              <a className="nav-a its_new" href="/blog">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>


      </div>

  
  </>
  );
};

export default Header;
