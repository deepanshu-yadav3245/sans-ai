"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground = ({ className, variant = "particles", ...props }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          this.vx += (dx / distance) * force * 0.02;
          this.vy += (dy / distance) * force * 0.02;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (this.life / this.maxLife);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove dead particles and add new ones
        if (particle.life <= 0) {
          particles[index] = new Particle();
        }
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (150 - distance) / 150 * 0.3;
            ctx.strokeStyle = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Draw mouse trail
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = 'hsl(250, 70%, 60%)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant]);

  if (variant === "particles") {
    return (
      <div ref={containerRef} className={cn("fixed inset-0 pointer-events-none z-0", className)} {...props}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
    );
  }

  if (variant === "waves") {
    return (
      <div ref={containerRef} className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className)} {...props}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-500/5 to-transparent animate-pulse delay-1000" />
          
          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/20 to-transparent animate-pulse delay-500" />
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-bounce delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-bounce delay-2000" />
        </div>
      </div>
    );
  }

  if (variant === "matrix") {
    return (
      <div ref={containerRef} className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className)} {...props}>
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black/50" />
        
        {/* Matrix rain effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"
              style={{
                left: `${(i * 5) + Math.random() * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating code elements */}
        <div className="absolute inset-0 text-green-400 text-xs opacity-30">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '01' : '10'}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default InteractiveBackground;
