"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Advanced Hover Card Component
 * 
 * A highly interactive card component with multiple visual effects and variants.
 * Features mouse tracking, glow effects, shine animations, and accessibility support.
 * 
 * @param {React.ReactNode} children - Content to display inside the card
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Visual variant: "default" | "glass" | "neon" | "gradient" | "floating"
 * @param {boolean} disabled - Disable hover effects and interactions
 * @param {string} ariaLabel - Accessibility label for screen readers
 * @param {object} ...props - Additional HTML div attributes
 * 
 * @example
 * <HoverCard variant="glass" ariaLabel="Feature card">
 *   <h3>Amazing Feature</h3>
 *   <p>This card has beautiful hover effects!</p>
 * </HoverCard>
 */
const HoverCard = ({ 
  children, 
  className, 
  variant = "default", 
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || disabled || prefersReducedMotion) return;
    
    // Cancel previous animation frame for performance
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    });
  }, [disabled, prefersReducedMotion]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized variant classes for performance
  const variantClasses = useMemo(() => {
    if (disabled) return "bg-gray-100 border border-gray-200 cursor-not-allowed";
    
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
  }, [variant, disabled]);

  // Accessibility handlers
  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsHovered(true);
    }
  }, [disabled]);

  const handleKeyUp = useCallback((e) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      setIsHovered(false);
    }
  }, [disabled]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group transition-all duration-500 rounded-2xl p-6",
        variantClasses,
        isHovered && !disabled && !prefersReducedMotion && "scale-105",
        disabled && "pointer-events-none",
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {/* Hover glow effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
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
          aria-hidden="true"
        />
      )}

      {/* Shine effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * Interactive Button Component
 * 
 * A button component with advanced hover effects including ripple and shine animations.
 * Supports multiple variants and includes full accessibility features.
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Visual variant: "default" | "gradient" | "neon" | "glass" | "floating"
 * @param {boolean} disabled - Disable button interactions
 * @param {string} ariaLabel - Accessibility label for screen readers
 * @param {object} ...props - Additional HTML button attributes
 * 
 * @example
 * <InteractiveButton variant="gradient" ariaLabel="Submit form">
 *   Submit
 * </InteractiveButton>
 */
const InteractiveButton = ({ 
  children, 
  className, 
  variant = "default", 
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const buttonRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || disabled || prefersReducedMotion) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    });
  }, [disabled, prefersReducedMotion]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized variant classes
  const variantClasses = useMemo(() => {
    if (disabled) return "bg-gray-400 cursor-not-allowed";
    
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
  }, [variant, disabled]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300 rounded-xl px-6 py-3 text-white font-medium",
        variantClasses,
        isHovered && !disabled && !prefersReducedMotion && "scale-105",
        disabled && "pointer-events-none",
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Ripple effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Shine effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`
          }}
          aria-hidden="true"
        />
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * Floating Action Button Component
 * 
 * A circular floating button with pulse and glow effects.
 * Includes press states and accessibility features.
 * 
 * @param {React.ReactNode} children - Button content (usually an icon)
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Visual variant: "default" | "gradient" | "neon" | "glass"
 * @param {boolean} disabled - Disable button interactions
 * @param {string} ariaLabel - Accessibility label for screen readers
 * @param {object} ...props - Additional HTML button attributes
 * 
 * @example
 * <FloatingActionButton variant="neon" ariaLabel="Add new item">
 *   <PlusIcon />
 * </FloatingActionButton>
 */
const FloatingActionButton = ({ 
  children, 
  className, 
  variant = "default", 
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoized variant classes
  const variantClasses = useMemo(() => {
    if (disabled) return "bg-gray-400 cursor-not-allowed";
    
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
  }, [variant, disabled]);

  return (
    <button
      className={cn(
        "relative w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center text-white shadow-2xl",
        variantClasses,
        isHovered && !disabled && !prefersReducedMotion && "scale-110 shadow-3xl",
        isPressed && !disabled && !prefersReducedMotion && "scale-95",
        disabled && "pointer-events-none",
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Pulse effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
          isHovered && !disabled && "opacity-100 animate-ping"
        )} style={{ background: 'inherit' }} aria-hidden="true" />
      )}
      
      {/* Glow effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 blur-xl",
          isHovered && !disabled && "opacity-100"
        )} style={{ background: 'inherit' }} aria-hidden="true" />
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * Interactive Image Component
 * 
 * An image component with parallax zoom effects and overlay animations.
 * Includes loading states and accessibility features.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disable hover effects
 * @param {string} ariaLabel - Additional accessibility label
 * @param {object} ...props - Additional HTML div attributes
 * 
 * @example
 * <InteractiveImage 
 *   src="/hero-image.jpg" 
 *   alt="Hero section background"
 *   ariaLabel="Click to view larger image"
 * />
 */
const InteractiveImage = ({ 
  src, 
  alt, 
  className, 
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const imageRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || disabled || prefersReducedMotion) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    });
  }, [disabled, prefersReducedMotion]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Image load handlers
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <div
      ref={imageRef}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-500",
        isHovered && !disabled && !prefersReducedMotion && "scale-105",
        disabled && "pointer-events-none",
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      role="img"
      aria-label={ariaLabel || alt}
      {...props}
    >
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image failed to load</div>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          isHovered && !disabled && !prefersReducedMotion && "scale-110",
          !imageLoaded && "opacity-0"
        )}
        style={{
          transform: isHovered && !disabled && !prefersReducedMotion
            ? `scale(1.1) translate(${(mousePosition.x - 200) * 0.02}px, ${(mousePosition.y - 200) * 0.02}px)`
            : 'scale(1)'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      
      {/* Overlay effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500",
          isHovered && !disabled && "opacity-100"
        )} aria-hidden="true" />
      )}
      
      {/* Glow effect - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 blur-xl",
            isHovered && !disabled && "opacity-100"
          )}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3) 0%, transparent 50%)`
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/**
 * Interactive Text Component
 * 
 * A text component with various hover effects including gradient, glow, and underline animations.
 * Includes accessibility features and reduced motion support.
 * 
 * @param {React.ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Visual variant: "default" | "gradient" | "glow" | "underline" | "scale"
 * @param {boolean} disabled - Disable hover effects
 * @param {string} ariaLabel - Accessibility label for screen readers
 * @param {object} ...props - Additional HTML span attributes
 * 
 * @example
 * <InteractiveText variant="gradient" ariaLabel="Click to learn more">
 *   Learn More
 * </InteractiveText>
 */
const InteractiveText = ({ 
  children, 
  className, 
  variant = "default", 
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoized variant classes
  const variantClasses = useMemo(() => {
    if (disabled) return "text-gray-400 cursor-not-allowed";
    
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
  }, [variant, disabled]);

  return (
    <span
      className={cn(
        "transition-all duration-300 cursor-pointer",
        variantClasses,
        disabled && "pointer-events-none",
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </span>
  );
};

export { HoverCard, InteractiveButton, FloatingActionButton, InteractiveImage, InteractiveText };
