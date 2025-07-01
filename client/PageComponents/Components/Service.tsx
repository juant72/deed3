import React, { useState, useEffect } from "react";

const Service: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      step: "01",
      title: "Connect Wallet",
      subtitle: "Institutional Security",
      description: "Connect your crypto wallet with enterprise-grade security protocols. Support for MetaMask, WalletConnect, and Coinbase Wallet.",
      icon: "🔐",
      iconBg: "from-purple-500 to-indigo-600",
      features: ["Multi-sig Support", "Hardware Wallet", "2FA Protection"],
      cta: "Connect Now",
      stats: "50,000+ Connected"
    },
    {
      step: "02",
      title: "Create Portfolio",
      subtitle: "Curated Collections",
      description: "Build sophisticated real estate portfolios with advanced analytics, risk assessment, and diversification tools powered by AI.",
      icon: "🏢",
      iconBg: "from-blue-500 to-cyan-600",
      features: ["AI Analytics", "Risk Assessment", "Auto-Diversify"],
      cta: "Start Building",
      stats: "15,847 Properties"
    },
    {
      step: "03",
      title: "Tokenize Assets",
      subtitle: "Fractional Ownership",
      description: "Transform real estate into liquid digital assets with fractional ownership, instant global access, and regulatory compliance.",
      icon: "💎",
      iconBg: "from-emerald-500 to-teal-600",
      features: ["Instant Liquidity", "Global Access", "SEC Compliant"],
      cta: "Tokenize Now",
      stats: "$2.4B+ Tokenized"
    },
    {
      step: "04",
      title: "Trade & Earn",
      subtitle: "Global Marketplace",
      description: "Access institutional-grade trading with advanced order types, market making, and yield generation through DeFi integration.",
      icon: "🚀",
      iconBg: "from-orange-500 to-red-600",
      features: ["Advanced Trading", "DeFi Yields", "Instant Settlement"],
      cta: "Start Trading",
      stats: "98.7% Success Rate"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-blue-400 font-medium text-sm">WORLD-CLASS PLATFORM</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Create & Trade
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Property NFTs
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The institutional-grade platform for real estate tokenization, powered by advanced blockchain technology and trusted by global investors.
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center items-center space-x-8 mt-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$2.4B+</div>
              <div className="text-gray-400 text-sm">Total Volume</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">15,847</div>
              <div className="text-gray-400 text-sm">Properties</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">50K+</div>
              <div className="text-gray-400 text-sm">Investors</div>
            </div>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={`
                relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full
                transition-all duration-500 group-hover:border-blue-400/50 group-hover:bg-slate-800/60
                ${activeStep === index ? 'border-blue-400/70 bg-slate-800/70 scale-105 shadow-2xl shadow-blue-500/25' : ''}
              `}>

                {/* Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500
                  bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent
                  ${activeStep === index ? 'opacity-100' : 'group-hover:opacity-50'}
                `}></div>

                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                    transition-all duration-300
                    ${activeStep === index
                      ? 'bg-blue-500 border-blue-400 text-white scale-110'
                      : 'bg-slate-800 border-slate-600 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-400'
                    }
                  `}>
                    {service.step}
                  </div>
                </div>

                <div className="relative z-10 pt-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                    <div className={`
                      w-full h-full bg-gradient-to-r ${service.iconBg} rounded-2xl flex items-center justify-center
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                      ${activeStep === index ? 'scale-110 rotate-6 shadow-lg' : ''}
                    `}>
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <div className="mb-2">
                      <span className="text-gray-400 text-sm font-medium">{service.subtitle}</span>
                    </div>
                    <h3 className={`
                      text-2xl font-bold mb-4 transition-colors duration-300
                      ${activeStep === index ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}
                    `}>
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="text-center mb-6">
                      <div className="text-blue-400 font-semibold text-sm">{service.stats}</div>
                    </div>

                    {/* CTA Button */}
                    <button className={`
                      group/btn relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300
                      ${activeStep === index
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white'
                      }
                    `}>
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>{service.cta}</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Real Estate?</h3>
            <p className="text-gray-300 mb-6">Join thousands of investors already using Encrypia Deeds3 to build wealth through tokenized real estate.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/25">
                Get Started Today
              </button>
              <button className="border border-slate-600 hover:border-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
