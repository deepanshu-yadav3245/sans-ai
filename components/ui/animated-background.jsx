"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AnimatedBackground = ({ 
  className, 
  variant = "particles",
  speed = "normal",
  ...props 
}) => {
  const canvasRef = useRef(null);
  
  const speedMultiplier = {
    slow: 0.5,
    normal: 1,
    fast: 2
  }[speed];

  useEffect(() => {
    if (variant !== "particles" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 0.5 * speedMultiplier;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(var(--primary), ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(var(--primary), ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant, speedMultiplier]);

  if (variant === "particles") {
    return (
      <canvas
        ref={canvasRef}
        className={cn(
          "fixed inset-0 pointer-events-none z-0 opacity-30",
          className
        )}
        {...props}
      />
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "fixed inset-0 pointer-events-none z-0",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-primary/3 to-accent/5 animate-pulse delay-1000" />
      </div>
    );
  }

  if (variant === "geometric") {
    return (
      <div
        className={cn(
          "fixed inset-0 pointer-events-none z-0 overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>
    );
  }

  return null;
};

export default AnimatedBackground;
