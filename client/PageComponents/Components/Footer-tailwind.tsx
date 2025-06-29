import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-slate-900 py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <div className="mb-6">
                  <a href="index.html">
                    <img src="/logo/logo-white.png" alt="nft-logo" className="h-8 w-auto" />
                  </a>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Transform your real estate into digital assets with Deeds3: Your gateway to NFT property
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h6 className="text-white font-semibold mb-4">Get The Latest Deeds3 Updates</h6>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 bg-slate-800 border border-white/10 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                    aria-label="Email address"
                  />
                  <button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-r-lg font-medium transition-all duration-200"
                    type="button"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-3">Email is safe. We don't spam.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div>
              <h6 className="text-white font-semibold mb-6">Deeds3</h6>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Protocol Explore</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">System Token</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Optimize Time</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Visual Checking</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Fadeup System</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Activity Log</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">System Auto Since</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div>
              <h6 className="text-white font-semibold mb-6">Information</h6>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Market Explore</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Ready Token</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Main Option</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Product Checking</a>
                </li>
                <li>
                  <a href="blog.html" className="text-gray-400 hover:text-blue-400 transition-colors">Blog Grid</a>
                </li>
                <li>
                  <a href="about.html" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Fix Bug</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div>
              <h6 className="text-white font-semibold mb-6">Recent Sold Out</h6>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-01.jpg"
                        alt="Product Images"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="flex-1">
                    <h6 className="text-white font-medium mb-1">
                      <a href="product-details.html" className="hover:text-blue-400 transition-colors">#21 The Wonder</a>
                    </h6>
                    <p className="text-gray-400 text-sm">Highest bid 1/20</p>
                    <span className="text-blue-400 font-medium">0.244wETH</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Product Images"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="flex-1">
                    <h6 className="text-white font-medium mb-1">
                      <a href="product-details.html" className="hover:text-blue-400 transition-colors">Diamond Dog</a>
                    </h6>
                    <p className="text-gray-400 text-sm">Highest bid 1/20</p>
                    <span className="text-blue-400 font-medium">0.022wETH</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Product Images"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="flex-1">
                    <h6 className="text-white font-medium mb-1">
                      <a href="product-details.html" className="hover:text-blue-400 transition-colors">Morgan11</a>
                    </h6>
                    <p className="text-gray-400 text-sm">Highest bid 1/20</p>
                    <span className="text-blue-400 font-medium">0.892wETH</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
