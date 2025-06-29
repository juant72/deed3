import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  Home, 
  Search, 
  TrendingUp, 
  User,
  Plus
} from 'lucide-react';
import { useUIOptimizations } from '../../hooks/useUIOptimizations';

const BottomNavigation: React.FC<{ notifications = 0 }> = ({ notifications = 0 }) => {
  const router = useRouter();
  const { shouldReduceMotion, vibrate } = useUIOptimizations();

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'Home', 
      href: '/', 
      isActive: router.pathname === '/' 
    },
    { 
      id: 'search', 
      icon: Search, 
      label: 'Search', 
      href: '/search', 
      isActive: router.pathname === '/search' 
    },
    { 
      id: 'create', 
      icon: Plus, 
      label: 'Create', 
      href: '/create', 
      isActive: router.pathname === '/create',
      isSpecial: true 
    },
    { 
      id: 'portfolio', 
      icon: TrendingUp, 
      label: 'Portfolio', 
      href: '/portfolio', 
      isActive: router.pathname === '/portfolio' 
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Profile', 
      href: '/profile', 
      isActive: router.pathname === '/profile' 
    }
  ];

  const handleNavigation = (href, _id) => {
    vibrate([5, 2, 5]);
    router.push(href);
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-white/10 pb-safe"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 touch-manipulation
              ${item.isSpecial 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                : item.isActive 
                  ? 'bg-slate-800 text-blue-400' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
              }
              ${item.isSpecial ? 'scale-110 -mt-2' : ''}
            `}
            onClick={() => handleNavigation(item.href, item.id)}
            variants={itemVariants}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label={`Navigate to ${item.label}`}
          >
            {/* Icon */}
            <motion.div
              className="relative"
              animate={shouldReduceMotion ? {} : (item.isActive ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : {})}
              transition={{ duration: 0.4 }}
            >
              <item.icon size={item.isSpecial ? 24 : 20} strokeWidth={item.isActive ? 2.5 : 2} />
              
              {/* Notification Badge */}
              {item.id === 'profile' && notifications > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  animate={shouldReduceMotion ? {} : { scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {notifications > 9 ? '9+' : notifications}
                </motion.span>
              )}
            </motion.div>

            {/* Label */}
            <span className={`
              text-xs font-medium mt-1 transition-all duration-200
              ${item.isSpecial ? 'text-white' : item.isActive ? 'text-blue-400' : 'text-gray-500'}
            `}>
              {item.label}
            </span>

            {/* Active Indicator */}
            {item.isActive && !item.isSpecial && (
              <motion.div
                className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full"
                initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
                animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30 
                }}
              />
            )}

            {/* Ripple Effect on Touch */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-white/10"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={shouldReduceMotion ? {} : { 
                scale: 1.5, 
                opacity: [0, 0.3, 0] 
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Safe area spacing for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  );
};

export default React.memo(BottomNavigation);
