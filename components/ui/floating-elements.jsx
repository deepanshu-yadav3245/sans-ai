"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const FloatingElements = ({ className, ...props }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const elements = container.querySelectorAll('.floating-element');
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const moveX = (x - rect.width / 2) * speed;
        const moveY = (y - rect.height / 2) * speed;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className)} {...props}>
      {/* Floating geometric shapes */}
      <div className="floating-element absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm animate-pulse" />
      <div className="floating-element absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-sm animate-pulse delay-1000" />
      <div className="floating-element absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-sm animate-pulse delay-2000" />
      <div className="floating-element absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-sm animate-pulse delay-1500" />
      
      {/* Floating lines */}
      <div className="floating-element absolute top-1/4 left-10 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      <div className="floating-element absolute bottom-1/4 right-10 w-24 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      
      {/* Floating dots */}
      <div className="floating-element absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" />
      <div className="floating-element absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce delay-500" />
    </div>
  );
};

export default FloatingElements;
