import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ModernHero = React.memo(({ marketData, propertyCount }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Memoize static data to prevent re-renders
  const heroSlides = useMemo(() => [
    {
      title: "Encrypia Deeds3",
      subtitle: "Next-Generation Real Estate Tokenization",
      description: "The institutional-grade platform for Web3 real estate investment and tokenization",
      cta: "Start Investing",
      image: "/portfolio/hero-tokenize.jpg",
      stats: { label: "Properties Tokenized", value: "2,847" }
    },
    {
      title: "Fractional Ownership",
      subtitle: "Own Premium Real Estate from $100",
      description: "Invest in high-value properties through fractionalized tokens on Encrypia",
      cta: "Browse Assets",
      image: "/portfolio/hero-fractional.jpg",
      stats: { label: "Total Value Locked", value: "$124.8M" }
    },
    {
      title: "Global Marketplace",
      subtitle: "Trade Property Tokens 24/7",
      description: "Institutional-grade liquidity for real estate investments worldwide",
      cta: "Explore Market",
      image: "/portfolio/hero-marketplace.jpg",
      stats: { label: "Daily Volume", value: "$2.4M" }
    }
  ], []);

  const marketStats = useMemo(() => [
    { label: "Market Cap", value: "$1.2B", change: "+12.4%" },
    { label: "Properties", value: propertyCount?.toString() || "15,847", change: "+247" },
    { label: "Active Investors", value: "89,234", change: "+5.7%" },
    { label: "Avg ROI", value: "18.6%", change: "+2.1%" }
  ], [propertyCount]);

  // Memoize slide change function
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </motion.div>
              
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-lg leading-relaxed"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/create" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></span>
                <span className="relative">{heroSlides[currentSlide].cta}</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 hover:text-white transition-all duration-300">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {marketStats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xs text-emerald-400">{stat.change}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Property Showcase */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8">
                <motion.img
                  key={currentSlide}
                  src={heroSlides[currentSlide].image}
                  alt="Featured Property"
                  className="w-full h-80 object-cover rounded-2xl"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Property Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">Featured Property</div>
                      <div className="text-gray-300 text-sm">Modern Villa • Miami, FL</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">$2.4M</div>
                      <div className="text-gray-400 text-sm">100 Tokens</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-white">
                  <div className="text-2xl font-bold">{heroSlides[currentSlide].stats.value}</div>
                  <div className="text-sm opacity-90">{heroSlides[currentSlide].stats.label}</div>
                </div>
              </motion.div>

              {/* Blockchain Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-emerald-600 rounded-xl p-4 shadow-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2 text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span className="font-semibold">Blockchain Verified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-blue-400 w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
});

ModernHero.displayName = 'ModernHero';

export default ModernHero;
