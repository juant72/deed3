import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Home, 
  Bookmark, 
  TrendingUp,
  Settings,
  LogOut,
  Wallet
} from 'lucide-react';
import { useUIOptimizations } from '../../hooks/useUIOptimizations';

const MobileHeader = ({ user, notifications = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { shouldReduceMotion, vibrate } = useUIOptimizations();

  // Close menu on route change or outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleClickOutside);
    return () => document.removeEventListener('touchstart', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    vibrate([10, 5, 10]);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    vibrate([5]);
    setIsSearchOpen(!isSearchOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/', count: null },
    { icon: Search, label: 'Search', href: '/search', count: null },
    { icon: Bookmark, label: 'Favorites', href: '/favorites', count: 3 },
    { icon: TrendingUp, label: 'Portfolio', href: '/portfolio', count: null },
    { icon: Wallet, label: 'Wallet', href: '/wallet', count: null },
    { icon: Settings, label: 'Settings', href: '/settings', count: null },
  ];

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const menuVariants = {
    closed: { 
      x: "-100%", 
      opacity: 0,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const searchVariants = {
    closed: { height: 0, opacity: 0 },
    open: { 
      height: "auto", 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu Button */}
          <motion.button
            className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 touch-manipulation"
            onClick={toggleMenu}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </motion.button>

          {/* Center: Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D3</span>
            </div>
            <span className="text-white font-semibold text-lg">Deeds3</span>
          </motion.div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <motion.button
              className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 touch-manipulation"
              onClick={toggleSearch}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label="Open search"
            >
              <Search size={18} />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 touch-manipulation"
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label={`Notifications (${notifications} unread)`}
            >
              <Bell size={18} />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  animate={shouldReduceMotion ? {} : { scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {notifications > 9 ? '9+' : notifications}
                </motion.span>
              )}
            </motion.button>

            {/* Profile */}
            <motion.button
              className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 touch-manipulation"
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label="Profile menu"
            >
              <User size={18} />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="border-t border-white/10 px-4 py-3"
              variants={searchVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-menu fixed top-0 left-0 z-50 w-80 h-full bg-slate-900 border-r border-white/10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">D3</span>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">Encrypia Deeds3</h2>
                    <p className="text-gray-400 text-sm">Web3 Real Estate</p>
                  </div>
                </div>
                <motion.button
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800/50 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name || 'User'}</p>
                      <p className="text-gray-400 text-sm">{user.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Not connected'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Items */}
              <nav className="flex-1 py-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 transition-colors touch-manipulation"
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    initial={shouldReduceMotion ? {} : { x: -20, opacity: 0 }}
                    animate={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? {} : { delay: index * 0.05 }}
                    onClick={() => {
                      vibrate([5]);
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.count}
                      </span>
                    )}
                  </motion.a>
                ))}
              </nav>

              {/* Footer Actions */}
              <div className="border-t border-white/10 p-4">
                <motion.button
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors touch-manipulation"
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={() => {
                    vibrate([10]);
                    // Handle logout
                  }}
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(MobileHeader);
