import React from 'react';
import { motion } from 'framer-motion';

// Utility function for class merging (simple version)
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Button prop types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'web3';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  asChild?: boolean;
}

// Button variants using design tokens
const buttonVariants = {
  // Base styles
  base: "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  
  // Size variants
  size: {
    sm: "px-3 py-2 text-sm h-9 rounded-md",
    md: "px-4 py-2 text-base h-10 rounded-lg", 
    lg: "px-6 py-3 text-lg h-12 rounded-xl",
    xl: "px-8 py-4 text-xl h-14 rounded-2xl"
  },
  
  // Style variants using design tokens
  variant: {
    // Primary - Encrypia brand
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 shadow-md hover:shadow-lg",
    
    // Secondary - Deeds3 brand  
    secondary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400 shadow-md hover:shadow-lg",
    
    // Accent - Success/Action
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-md hover:shadow-lg",
    
    // Ghost - Subtle
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
    
    // Outline
    outline: "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-400",
    
    // Destructive
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md hover:shadow-lg",
    
    // Web3 Special - Gradient
    web3: "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600 focus:ring-blue-400 shadow-md hover:shadow-lg"
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children, 
  className, 
  disabled,
  asChild = false,
  ...props 
}, ref) => {
    
    const buttonClasses = cn(
      buttonVariants.base,
      buttonVariants.size[size],
      buttonVariants.variant[variant],
      loading && "cursor-wait",
      className
    );

    if (asChild) {
      return (
        <motion.span 
          className={buttonClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.span>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
