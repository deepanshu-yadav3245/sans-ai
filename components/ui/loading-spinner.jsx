import React from 'react';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ 
  size = "default", 
  variant = "default", 
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const variantClasses = {
    default: "border-primary border-t-transparent",
    primary: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    accent: "border-accent border-t-transparent",
    white: "border-white border-t-transparent"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

// Pulse dots loading animation
export const LoadingDots = ({ className, ...props }) => (
  <div className={cn("flex space-x-1", className)} {...props}>
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

// Skeleton loading component
export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
    {...props}
  />
);

// Progress bar with animation
export const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className,
  showLabel = false,
  ...props 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
