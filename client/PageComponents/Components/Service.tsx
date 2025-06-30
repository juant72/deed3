import React from "react";

const Service: React.FC = () => {
  const services = [
    {
      step: "Step-01",
      title: "Set up your wallet",
      description: "Connect your crypto wallet to start buying and selling properties as NFTs on our platform.",
      icon: "/icons/shape-7.png",
      color: "from-purple-600 to-purple-700"
    },
    {
      step: "Step-02", 
      title: "Create your collection",
      description: "Build your real estate portfolio by creating collections of properties and assets.",
      icon: "/icons/shape-1.png",
      color: "from-blue-600 to-blue-700"
    },
    {
      step: "Step-03",
      title: "Add your Properties",
      description: "Upload and tokenize your real estate properties to turn them into tradeable NFTs.",
      icon: "/icons/shape-5.png", 
      color: "from-green-600 to-green-700"
    },
    {
      step: "Step-04",
      title: "Sell Your Properties",
      description: "List and sell your property NFTs on our marketplace to investors worldwide.",
      icon: "/icons/shape-6.png",
      color: "from-orange-600 to-orange-700"
    }
  ];

  return (
    <div className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create and sell your Property NFTs
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto">
                    <div className={`w-full h-full bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
                      <img src={service.icon} alt="Service Icon" className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      {service.step}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-white font-semibold text-xl mb-4 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <button className="inline-flex items-center justify-center w-10 h-10 bg-slate-700 hover:bg-blue-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 group-hover:transform group-hover:translate-x-1">
                      <i className="feather-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
