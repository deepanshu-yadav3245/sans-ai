"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Advanced Hover Card Component
const HoverCard = ({ children, className, variant = "default", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/40";
      case "neon":
        return "bg-gray-900 border border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]";
      case "gradient":
        return "bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30";
      case "floating":
        return "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30";
      default:
        return "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20";
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group transition-all duration-500 rounded-2xl p-6",
        getVariantClasses(),
        isHovered && "scale-105",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Hover glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
          variant === "neon" && "bg-blue-500/20",
          variant === "gradient" && "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
          variant === "glass" && "bg-white/10",
          variant === "floating" && "bg-blue-500/10"
        )}
        style={{
          transform: `translate(${(mousePosition.x - 150) * 0.1}px, ${(mousePosition.y - 150) * 0.1}px)`
        }}
      />

      {/* Shine effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Interactive Button Component
const InteractiveButton = ({ children, className, variant = "default", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600";
      case "neon":
        return "bg-gray-900 border border-blue-500 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]";
      case "glass":
        return "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20";
      case "floating":
        return "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300 rounded-xl px-6 py-3 text-white font-medium",
        getVariantClasses(),
        isHovered && "scale-105",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Ripple effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`
        }}
      />

      {/* Shine effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
        }}
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Floating Action Button
const FloatingActionButton = ({ children, className, variant = "default", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600";
      case "neon":
        return "bg-gray-900 border border-blue-500 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]";
      case "glass":
        return "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <button
      className={cn(
        "relative w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center text-white shadow-2xl",
        getVariantClasses(),
        isHovered && "scale-110 shadow-3xl",
        isPressed && "scale-95",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {/* Pulse effect */}
      <div className={cn(
        "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
        isHovered && "opacity-100 animate-ping"
      )} style={{ background: 'inherit' }} />
      
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 blur-xl",
        isHovered && "opacity-100"
      )} style={{ background: 'inherit' }} />

      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Interactive Image Component
const InteractiveImage = ({ src, alt, className, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={imageRef}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-500",
        isHovered && "scale-105",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          isHovered && "scale-110"
        )}
        style={{
          transform: isHovered 
            ? `scale(1.1) translate(${(mousePosition.x - 200) * 0.02}px, ${(mousePosition.y - 200) * 0.02}px)`
            : 'scale(1)'
        }}
      />
      
      {/* Overlay effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500",
        isHovered && "opacity-100"
      )} />
      
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 blur-xl",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3) 0%, transparent 50%)`
        }}
      />
    </div>
  );
};

// Interactive Text Component
const InteractiveText = ({ children, className, variant = "default", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-pink-500";
      case "glow":
        return "text-blue-400 hover:text-blue-300 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]";
      case "underline":
        return "text-blue-600 hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";
      case "scale":
        return "text-gray-800 hover:text-blue-600 transition-all duration-300 hover:scale-110";
      default:
        return "text-gray-800 hover:text-blue-600";
    }
  };

  return (
    <span
      className={cn(
        "transition-all duration-300 cursor-pointer",
        getVariantClasses(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </span>
  );
};

export { HoverCard, InteractiveButton, FloatingActionButton, InteractiveImage, InteractiveText };
