import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  TrendingUp, 
  User, 
  Bell, 
  Settings,
  LogOut,
  Wallet,
  Activity,
  Map,
  Heart,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useStateContext } from '../../context';

const MobileNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const { currentAccount } = useStateContext();

  const mainTabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'search', label: 'Search', icon: Search, href: '/explor' },
    { id: 'create', label: 'Create', icon: Plus, href: '/create' },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp, href: '/author' },
    { id: 'profile', label: 'Profile', icon: User, href: '/edit-profile' }
  ];

  const menuItems = [
    { label: 'Dashboard', icon: Activity, href: '/author' },
    { label: 'My Properties', icon: Home, href: '/portfolio' },
    { label: 'Favorites', icon: Heart, href: '/favorites' },
    { label: 'Map View', icon: Map, href: '/map' },
    { label: 'Notifications', icon: Bell, href: '/notifications', badge: notifications },
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Help & Support', icon: User, href: '/support' }
  ];

  useEffect(() => {
    // Determine active tab based on current route
    const path = window.location.pathname;
    const tab = mainTabs.find(t => t.href === path);
    if (tab) {
      setActiveTab(tab.id);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-white/10 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Link key={tab.id} href={tab.href}>
                <motion.button
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-gray-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium">{tab.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 lg:hidden bg-slate-800/90 backdrop-blur-sm p-3 rounded-full text-white shadow-lg"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-slate-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* User Profile Section */}
                {currentAccount && (
                  <div className="mb-8">
                    <div className="flex items-center space-x-4 p-4 bg-slate-800 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                        </h3>
                        <p className="text-gray-400 text-sm">Connected Wallet</p>
                      </div>
                      <Wallet className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                )}

                {/* Menu Items */}
                <nav className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.label} href={item.href}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          onClick={toggleMenu}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                {currentAccount && (
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <button className="flex items-center space-x-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Disconnect Wallet</span>
                    </button>
                  </div>
                )}

                {/* App Info */}
                <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                  <p className="text-gray-500 text-sm">Deeds3 v2.1.0</p>
                  <p className="text-gray-600 text-xs mt-1">Web3 Real Estate Platform</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for bottom navigation */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default MobileNavigation;
