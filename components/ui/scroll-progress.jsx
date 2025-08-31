"use client";

import React from 'react';
import { useScrollProgress } from '@/lib/use-scroll-animation';
import { cn } from '@/lib/utils';

const ScrollProgress = ({ 
  className, 
  variant = "bar",
  position = "top",
  showPercentage = false,
  ...props 
}) => {
  const scrollProgress = useScrollProgress();

  if (variant === "bar") {
    return (
      <div
        className={cn(
          "fixed z-50 transition-all duration-300",
          position === "top" && "top-0 left-0 right-0",
          position === "left" && "left-0 top-0 bottom-0",
          position === "right" && "right-0 top-0 bottom-0",
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            "bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out",
            position === "top" && "h-1",
            position === "left" && "w-1",
            position === "right" && "w-1"
          )}
          style={{
            [position === "top" ? "width" : "height"]: `${scrollProgress}%`
          }}
        />
        {showPercentage && (
          <div className={cn(
            "absolute text-xs text-primary font-medium bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg",
            position === "top" && "top-2 right-4",
            position === "left" && "left-2 top-4",
            position === "right" && "right-2 top-4"
          )}>
            {Math.round(scrollProgress)}%
          </div>
        )}
      </div>
    );
  }

  if (variant === "circle") {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
      <div
        className={cn(
          "fixed z-50 transition-all duration-300",
          position === "top" && "top-4 right-4",
          position === "left" && "left-4 top-4",
          position === "right" && "right-4 top-4",
          className
        )}
        {...props}
      >
        <svg
          className="w-12 h-12 transform -rotate-90"
          viewBox="0 0 48 48"
        >
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-300 ease-out"
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
            {Math.round(scrollProgress)}%
          </div>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    const totalDots = 5;
    const activeDots = Math.ceil((scrollProgress / 100) * totalDots);

    return (
      <div
        className={cn(
          "fixed z-50 flex flex-col space-y-2 transition-all duration-300",
          position === "top" && "top-4 right-4",
          position === "left" && "left-4 top-4",
          position === "right" && "right-4 top-4",
          className
        )}
        {...props}
      >
        {Array.from({ length: totalDots }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i < activeDots 
                ? "bg-primary scale-125" 
                : "bg-muted/30 scale-100"
            )}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default ScrollProgress;
