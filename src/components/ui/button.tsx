import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    children, 
    icon, 
    loading = false,
    fullWidth = false,
    disabled,
    asChild = false,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg";
    
    const variants = {
      primary: "bg-purple-mid text-white hover:bg-primary-700 focus:ring-purple-mid shadow-soft hover:shadow-medium",
      secondary: "bg-white text-purple-mid border border-purple-mid hover:bg-purple-mid hover:text-white focus:ring-purple-mid",
      accent: "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-soft hover:shadow-medium",
      outline: "bg-transparent text-purple-mid border-2 border-purple-mid hover:bg-purple-mid hover:text-white focus:ring-purple-mid",
      ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    const widthClass = fullWidth ? "w-full" : "";

    const Component = asChild ? React.Fragment : motion.button;
    const componentProps = asChild ? {} : {
      ref,
      className: cn(
        baseClasses,
        variants[variant],
        sizes[size],
        widthClass,
        className
      ),
      disabled: disabled || loading,
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      ...props
    };

    const content = (
      <>
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
      </>
    );

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(
          baseClasses,
          variants[variant],
          sizes[size],
          widthClass,
          className
        ),
        ...props
      }, content);
    }

    return (
      <Component {...componentProps}>
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button }; 