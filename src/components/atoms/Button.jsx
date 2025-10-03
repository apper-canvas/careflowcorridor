import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = "primary",
  size = "md",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:brightness-110 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger: "bg-error text-white hover:brightness-110",
    success: "bg-success text-white hover:brightness-110"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;