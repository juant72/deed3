import React from "react";

const Copyright = () => {
  return (
    <>
      <div className="bg-slate-950 py-5 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <span className="text-gray-400 text-sm">©2024 Powered by Encrypia, Inc. All rights reserved.</span>
                <ul className="flex items-center space-x-4">
                  <li>
                    <a href="terms-condition.html" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="feather-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="feather-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="feather-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse cursor effects */}
      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>

      {/* Back to top progress */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl">
          <i className="feather-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default Copyright;
