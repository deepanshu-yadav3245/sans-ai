"use client"
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
const imageRef = useRef(null);

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

  return (
    <section className='w-full pt-36 md:pt-48 pb-10 relative overflow-hidden'>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className='space-y-8 text-center relative z-10'>
        <div className='space-y-8 mx-auto max-w-4xl'>
            <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title text-reveal'>
                Your AI Coach for
                <br />
                <span className="relative">
                  Professional Success
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
                </span>
            </h1>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl text-reveal stagger-1 leading-relaxed'>
                Advance your career with personalized AI-driven coaching, tailored 
                to your unique professional journey. Experience the future of learning.
            </p>
        </div>

        <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-reveal stagger-2'>
            <Link href='/dashboard'>
               <Button size="lg" className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift pulse-glow">
                Get Started
               </Button>
            </Link>

            <Link href='https://www.youtube.com/watch?v=UbXpRv5ApKA&t=145s'>
               <Button size="lg" className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift glass" variant="outline">
                Watch Demo
               </Button>
            </Link>
        </div>

        {/* Enhanced stats section */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-reveal stagger-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        <div className='hero-image-wrapper mt-12 md:mt-16'>
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
