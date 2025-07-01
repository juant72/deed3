import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
        {/* Stats Section */}
        <div className="border-b border-slate-700/50 bg-slate-800/50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$2.4B+</div>
                <div className="text-gray-400 text-sm">Total Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">15,847</div>
                <div className="text-gray-400 text-sm">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">98.7%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">45+</div>
                <div className="text-gray-400 text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <Link href="/" className="inline-block mb-6">
                    <span className="text-3xl font-bold leading-none">
                      <span className="text-blue-400">Encrypia</span>
                      <span className="text-white ml-2">Deeds3</span>
                    </span>
                  </Link>
                  <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                    The institutional-grade Web3 platform revolutionizing real estate through blockchain tokenization, fractional ownership, and DeFi integration.
                  </p>

                  {/* Security Badges */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2 bg-slate-800 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-300">SOC 2 Certified</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs text-gray-300">Audited</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.0962V13.0956Z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.757-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Section */}
            <div>
              <h6 className="text-white font-semibold mb-6 text-lg">Platform</h6>
              <ul className="space-y-3">
                <li><Link href="/marketplace" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Marketplace</Link></li>
                <li><Link href="/fractional" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Fractional Ownership</Link></li>
                <li><Link href="/tokenization" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Property Tokenization</Link></li>
                <li><Link href="/staking" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Staking & Rewards</Link></li>
                <li><Link href="/portfolio" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Portfolio Management</Link></li>
                <li><Link href="/analytics" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Analytics Dashboard</Link></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h6 className="text-white font-semibold mb-6 text-lg">Resources</h6>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Documentation</Link></li>
                <li><Link href="/whitepaper" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Whitepaper</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">API Reference</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Blog & Insights</Link></li>
                <li><Link href="/research" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Market Research</Link></li>
                <li><Link href="/tutorials" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Video Tutorials</Link></li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h6 className="text-white font-semibold mb-6 text-lg">Company</h6>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">About Us</Link></li>
                <li><Link href="/team" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Team</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Careers</Link></li>
                <li><Link href="/press" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Press Kit</Link></li>
                <li><Link href="/partnerships" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Partnerships</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h6 className="text-white font-semibold mb-6 text-lg">Stay Updated</h6>
              <p className="text-gray-400 text-sm mb-4">Get the latest market insights and platform updates.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 text-sm">
                  Subscribe
                </button>
                <p className="text-gray-500 text-xs">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 bg-slate-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2025 Encrypia Deeds3. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms of Service</Link>
                  <Link href="/security" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Security</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
