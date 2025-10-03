import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className,
  type = "text",
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-2.5 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "transition-all duration-200",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-error focus:ring-error/20 focus:border-error",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;