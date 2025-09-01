"use client"
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/lib/use-scroll-animation'

const HeroSection = () => {
const imageRef = useRef(null);
const [titleRef, isTitleVisible] = useScrollAnimation(0.1);
const [subtitleRef, isSubtitleVisible] = useScrollAnimation(0.2);
const [buttonsRef, isButtonsVisible] = useScrollAnimation(0.3);
const [statsRef, isStatsVisible] = useScrollAnimation(0.4);
const [imageContainerRef, isImageVisible] = useScrollAnimation(0.5);

// Particle system state
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [particles, setParticles] = useState([]);
const particleContainerRef = useRef(null);

// Magnetic effect state
const [magneticElements, setMagneticElements] = useState([]);

useEffect(() => {
  // Initialize particles
  const initialParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
  }));
  setParticles(initialParticles);

  // Mouse move handler for particles
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Particle animation
  const animateParticles = () => {
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        // Calculate distance from mouse
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Attract particles to mouse (magnetic effect)
        const attractionRadius = 150;
        const attractionStrength = 0.5;
        
        let newX = particle.x;
        let newY = particle.y;
        
        if (distance < attractionRadius) {
          const force = (attractionRadius - distance) / attractionRadius;
          newX += (dx / distance) * force * attractionStrength;
          newY += (dy / distance) * force * attractionStrength;
        }
        
        // Add some natural movement
        newX += Math.sin(Date.now() * 0.001 + particle.id) * 0.5;
        newY += Math.cos(Date.now() * 0.001 + particle.id) * 0.5;
        
        // Keep particles within bounds
        newX = Math.max(0, Math.min(window.innerWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight, newY));
        
        return {
          ...particle,
          x: newX,
          y: newY
        };
      })
    );
  };

  const particleInterval = setInterval(animateParticles, 50);
  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    clearInterval(particleInterval);
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, [mousePosition]);

useEffect(() =>{
  const imageElement = imageRef.current;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100;

    if (scrollPosition > scrollThreshold){
      imageElement.classList.add('scrolled');
    } else {
      imageElement.classList.remove('scrolled');
    }

  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };

}, []);

// Magnetic effect for buttons
const handleMagneticEffect = (e, element) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  const strength = 0.3;
  element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
};

const handleMagneticLeave = (element) => {
  element.style.transform = 'translate(0px, 0px)';
};

  return (
    <section className='w-full pt-36 md:pt-48 pb-10 relative overflow-hidden'>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Particle System */}
      <div 
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full transition-all duration-300 ease-out"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>
      
      <div className='space-y-8 text-center relative z-10'>
        <div className='space-y-8 mx-auto max-w-5xl'>
            <h1 
              ref={titleRef}
              className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-1000 opacity-100 translate-y-0 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
                <span className="block">Your AI Career Coach for</span>
                <span className="block">Professional Success</span>
            </h1>
            <p 
              ref={subtitleRef}
              className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl transition-all duration-1000 delay-200 ${
                isSubtitleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              } leading-relaxed`}
            >
                Advance your career with personalized AI-driven coaching, tailored 
                to your unique professional journey. Experience the future of learning.
            </p>
        </div>

        <div 
          ref={buttonsRef}
          className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-400 ${
            isButtonsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
            <Link href='/dashboard'>
               <Button 
                 size="lg" 
                 className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift pulse-glow magnetic-button"
                 onMouseMove={(e) => handleMagneticEffect(e, e.currentTarget)}
                 onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
               >
                Get Started
               </Button>
            </Link>

            <Link href='https://www.youtube.com/watch?v=UbXpRv5ApKA&t=145s'>
               <Button 
                 size="lg" 
                 className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift glass magnetic-button"
                 variant="outline"
                 onMouseMove={(e) => handleMagneticEffect(e, e.currentTarget)}
                 onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
               >
                Watch Demo
               </Button>
            </Link>
        </div>

        {/* Enhanced stats section */}
        <div 
          ref={statsRef}
          className={`flex flex-wrap justify-center items-center gap-8 mt-12 transition-all duration-1000 delay-600 ${
            isStatsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="text-center group magnetic-element">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">50+</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center group magnetic-element">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">1000+</div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center group magnetic-element">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        <div 
          ref={imageContainerRef}
          className={`hero-image-wrapper mt-12 md:mt-16 transition-all duration-1000 delay-800 ${
            isImageVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
            <div ref={imageRef} className='hero-image'>
               <div className="relative">
                 <Image
                    src={"/banner.jpeg"}
                    width={1280}
                    height={720}
                    alt='Banner Sansai'
                    className='rounded-2xl shadow-2xl border mx-auto transition-all duration-500 hover:scale-[1.02]'
                    priority
                  />
                  {/* Enhanced overlay effects */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
               </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
