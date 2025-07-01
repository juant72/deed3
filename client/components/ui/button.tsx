import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// Utility function for class merging (simple version)
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Combine React button props with Framer Motion props, omitting conflicting keys
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'web3';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className,
    ...rest
  } = props;

  // Extraer props ARIA y HTML relevantes
  const { 'aria-label': ariaLabel, disabled, ...motionProps } = rest;

  // Lista de props a eliminar que no son compatibles con motion.button
  const incompatibleProps = [
    'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd',
    'onDrag', 'onDragStart', 'onDragEnd', 'onDragOver', 'onDragEnter', 'onDragLeave', 'onDrop', 'onDragExit',
    'onTouchStart', 'onTouchEnd', 'onTouchMove', 'onTouchCancel'
  ];

  // Eliminar las props incompatibles para evitar warnings y errores de tipo
  incompatibleProps.forEach(prop => {
    if (prop in motionProps) {
      delete (motionProps as any)[prop];
    }
  });


  return (
    <motion.button
      ref={ref}
      type={props.type || 'button'}
      className={cn(
        buttonVariants.base,
        buttonVariants.size[size],
        buttonVariants.variant[variant],
        className
      )}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading ? 'true' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      {...motionProps}
    >
      {loading ? (
        <span className="sr-only">Cargando...</span>
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
