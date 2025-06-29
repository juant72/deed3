import React from "react";
import Link from "next/link";

const Live = ({ properties }) => {
  return (
    <div className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              New Properties
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {properties
            ?.map((property, i) => (
              <div key={i} className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="relative">
                    <a href={`/detail?property=${property.productID}`} className="block">
                      <img 
                        src={property.image} 
                        alt="NFT_portfolio" 
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </a>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        New
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-3 -space-x-2">
                      {property.reviewers.map((el, i) => (
                        <div key={i} className="relative group/avatar">
                          <img
                            src={`/client/client-${i + 1}.png`}
                            alt="Nft_Profile"
                            className="w-8 h-8 rounded-full border-2 border-slate-800 hover:border-blue-400 transition-colors"
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {el.slice(0, 15)}...
                          </div>
                        </div>
                      ))}
                      {property.reviewers.length !== 0 && (
                        <span className="text-gray-400 text-sm ml-3 pl-2">
                          Interested Users
                        </span>
                      )}
                    </div>
                    
                    <a href="#" className="block mb-2">
                      <h4 className="text-white font-semibold text-lg hover:text-blue-400 transition-colors line-clamp-2">
                        {property.title.length >= 25
                          ? `${property.title.slice(0, 22)}...`
                          : property.title}
                      </h4>
                    </a>
                    
                    <div className="text-gray-400 text-sm mb-3">
                      Category: <span className="text-blue-400">{property.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-white font-bold text-lg">
                        {property.price} MATIC
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <svg
                          viewBox="0 0 17 16"
                          fill="none"
                          width="16"
                          height="16"
                          className="text-red-400"
                        >
                          <path
                            d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="text-sm">{property.reviewers.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default Live;
