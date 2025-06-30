import React from "react";

const TopSeller: React.FC<{ creators }> = ({ creators }) => {
  const mockSellers = [
    { name: "Alex Johnson", amount: "$1,500,000" },
    { name: "Maria Garcia", amount: "$2,500,000" },
    { name: "David Chen", amount: "$3,500,000" },
    { name: "Sarah Wilson", amount: "$4,500,000" },
    { name: "Mike Rodriguez", amount: "$5,500,000" },
    { name: "Emma Thompson", amount: "$6,500,000" },
    { name: "James Brown", amount: "$7,500,000" }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Top Property Sellers
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {creators.map((seller, i) => (
            <div key={i} className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105 text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-blue-400 transition-colors">
                    <a href="author.html">
                      <img
                        src={`/client/client-${i + 1}.png`}
                        alt="Seller Profile"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="feather-check text-white text-xs"></i>
                  </div>
                </div>
                <div>
                  <a href="author.html">
                    <h6 className="text-white font-semibold mb-2 hover:text-blue-400 transition-colors">
                      {seller.owner.slice(0, 10)}..
                    </h6>
                  </a>
                  <span className="text-green-400 font-medium">{seller.total} MATIC</span>
                </div>
              </div>
            </div>
          ))}
          
          {mockSellers.map((seller, i) => (
            <div key={`mock-${i}`} className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105 text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-blue-400 transition-colors">
                    <a href="author.html">
                      <img
                        src={`/client/client-${(i % 7) + 1}.png`}
                        alt="Seller Profile"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="feather-check text-white text-xs"></i>
                  </div>
                </div>
                <div>
                  <a href="author.html">
                    <h6 className="text-white font-semibold mb-2 hover:text-blue-400 transition-colors">
                      {seller.name}
                    </h6>
                  </a>
                  <span className="text-green-400 font-medium">{seller.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
