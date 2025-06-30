import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useStateContext } from "../../context";
import AdvancedWalletConnect from "../../PageComponents/Components/AdvancedWalletConnect";

const Header: React.FC = () => {
  const { currentAccount, userBlance } = useStateContext();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-md transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center flex-1 max-w-[55%]">
              <div className="relative pr-8 mr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-9 after:bg-white/10">
                <Link className="block" href="/">
                  <div className="flex items-center space-x-3">
                    <Image src="/logo/logo-white.png" alt="Encrypia Deeds3" className="h-8 w-auto" width={32} height={32} />
                    <div className="flex flex-col">
                      <span className="text-white text-lg font-bold leading-none">Encrypia</span>
                      <span className="text-blue-400 text-xs font-medium leading-none">Deeds3</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="mainmenu-wrapper">
                <nav id="sideNav" className="hidden xl:block">
                  <ul className="flex items-center space-x-2">
                    <li className="relative group">
                      <Link href="/" className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors">Home</Link>
                    </li>
                    <li className="relative group">
                      <Link href="/about" className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors">About</Link>
                    </li>
                    <li className="relative group">
                      <Link href="/roadmap" className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors">Roadmap</Link>
                    </li>
                    <li className="relative group">
                      <a className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors cursor-pointer">Explore</a>
                      <ul className="absolute left-0 top-full min-w-[230px] bg-slate-800 border border-white/10 rounded-b-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <li>
                          <Link href="/active" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Activity
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/creator" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Creator
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/explor">
                            Explore
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="relative group">
                      <Link href="/contact" className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors">Contact</Link>
                    </li>
                    <li className="relative group">
                      <a className="block px-3 py-7 text-gray-300 font-medium hover:text-blue-400 transition-colors cursor-pointer">Other Pages</a>
                      <ul className="absolute left-0 top-full min-w-[230px] bg-slate-800 border border-white/10 rounded-b-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <li>
                          <Link href="/ranking" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Ranking
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/product" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Product
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/privacy">
                            Privacy
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/news">
                            News
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/fourm">
                            Fourm
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/connect">
                            Connect
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/collection">
                            Collection
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Blog
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/blogdetail" className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all group/item">
                            Blogdetail
                            <i className="feather-fast-forward opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/error">
                            404
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/forget">
                            Forget
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/login">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-black/30 rounded transition-all" href="/signup">
                            Signup
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <form className="relative" action="#">
                  <input
                    type="search"
                    placeholder="Search Here"
                    aria-label="Search"
                    className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button type="submit" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <i className="feather-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="block lg:hidden">
                <div className="p-2">
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">
                    <i className="feather-search"></i>
                  </button>
                </div>
                <form id="header-search-1" className="hidden absolute top-full left-0 w-full bg-slate-800 p-4">
                  <div className="flex items-center">
                    <button type="submit" className="text-gray-400 hover:text-blue-400 transition-colors mr-3">
                      <i className="feather-search"></i>
                    </button>
                    <input type="text" placeholder="Search ..." className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none" />
                  </div>
                </form>
              </div>

              {/* CONNECT WALLET */}
              {currentAccount ? null : (
                <div className="flex items-center">
                  <AdvancedWalletConnect onClose={() => { }} />
                </div>
              )}

              {/* NOTIFICATION */}
              <div className="relative">
                <Link href={`/active`} className="relative p-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="feather-bell text-xl"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-center leading-5">6</span>
                </Link>
              </div>

              {/* USER DROPDOWN */}
              {currentAccount ? (
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <Image src="/icons/boy-avater.png" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-blue-400 transition-colors" width={40} height={40} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-4 border-b border-white/10">
                        <h4 className="text-white font-semibold mb-1">
                          <Link href="/author" className="hover:text-blue-400 transition-colors">
                            {currentAccount.slice(0, 15)}...
                          </Link>
                        </h4>
                        <span className="text-gray-400 text-sm">
                          <Link href="#" className="hover:text-blue-400 transition-colors">Set Display Name</Link>
                        </span>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-3 mb-4">
                          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <a href="product-details.html">
                                <Image
                                  src="/portfolio/portfolio-07.jpg"
                                  alt="Nft Product Images"
                                  className="w-full h-full object-cover"
                                  width={64}
                                  height={64}
                                />
                              </a>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-white font-medium">
                                <Link className="hover:text-blue-400 transition-colors" href="/author">
                                  Balance
                                </Link>
                              </h6>
                              <span className="text-gray-400 text-sm">
                                {userBlance?.slice(0, 6)} MATIC
                              </span>
                            </div>
                          </li>
                          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Link href="/author">
                                <Image
                                  src="/portfolio/portfolio-01.jpg"
                                  alt="Nft Product Images"
                                  className="w-full h-full object-cover"
                                  width={64}
                                  height={64}
                                />
                              </Link>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-white font-medium">
                                <Link className="hover:text-blue-400 transition-colors" href="/author">
                                  Profile
                                </Link>
                              </h6>
                              <span className="text-gray-400 text-sm">Active One</span>
                            </div>
                          </li>
                          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Link href="/create">
                                <Image
                                  src="/portfolio/portfolio-04.jpg"
                                  alt="Nft Product Images"
                                  className="w-full h-full object-cover"
                                  width={64}
                                  height={64}
                                />
                              </Link>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-white font-medium">
                                <Link className="hover:text-blue-400 transition-colors" href="/create">
                                  Create
                                </Link>
                              </h6>
                              <span className="text-gray-400 text-sm">Property</span>
                            </div>
                          </li>
                        </ul>
                        <div className="mb-4">
                          <a className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-center block" href="/connect">
                            Add Your More Funds
                          </a>
                        </div>
                        <ul className="space-y-2">
                          <li>
                            <a href="/author" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-colors">My Profile</a>
                          </li>
                          <li>
                            <a href="/edit-profile" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-colors">Edit Profile</a>
                          </li>
                          <li>
                            <a href="/connect" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-colors">Manage funds</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* MOBILE MENU BUTTON */}
              <div className="xl:hidden">
                <div className="p-2">
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">
                    <i className="feather-menu text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="fixed inset-0 z-50 bg-slate-900 transform translate-x-full transition-transform duration-300 xl:hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center">
              <Link href="/">
                <img src="/logo/logo-white.png" alt="nft-logo" className="h-8 w-auto" />
              </Link>
            </div>
            <div>
              <button className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="feather-x text-xl"></i>
              </button>
            </div>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <a className="block text-gray-300 hover:text-blue-400 transition-colors font-medium" href="/">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="block text-gray-300 hover:text-blue-400 transition-colors font-medium">About</a>
              </li>
              <li>
                <a className="block text-gray-300 hover:text-blue-400 transition-colors font-medium" href="/explor">
                  Explore
                </a>
              </li>
              <li>
                <a className="block text-gray-300 hover:text-blue-400 transition-colors font-medium" href="/">
                  Pages
                </a>
              </li>
              <li>
                <a className="block text-gray-300 hover:text-blue-400 transition-colors font-medium" href="/blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors font-medium">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
