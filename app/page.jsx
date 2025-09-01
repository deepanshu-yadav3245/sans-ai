import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { Card, CardContent, } from "@/components/ui/card"; 
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { Image } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; 
import AnimatedBackground from "@/components/ui/animated-background";
import ScrollProgress from "@/components/ui/scroll-progress";
import FloatingElements from "@/components/ui/floating-elements";
import StatsCounter from "@/components/ui/stats-counter";
import FeatureShowcase from "@/components/ui/feature-showcase";
import TestimonialsCarousel from "@/components/ui/testimonials-carousel";
import CTASection from "@/components/ui/cta-section";
import AIChatBot from "@/components/ui/ai-chat-bot";
import { NotificationProvider } from "@/components/ui/notification-system";
import InteractiveBackground from "@/components/ui/interactive-background";
import { HoverCard, InteractiveButton, FloatingActionButton, InteractiveImage, InteractiveText } from "@/components/ui/advanced-hover-effects";

export default function Home() {
  // Enhanced testimonials with ratings
  const enhancedTestimonials = testimonial.map(t => ({
    ...t,
    rating: 5 // All testimonials get 5 stars
  }));

  return(
   <NotificationProvider>
    <div className="relative">
       <div className="grid-background"></div>
       
       {/* Interactive Background Effects */}
       <InteractiveBackground variant="particles" />
       
       <AnimatedBackground variant="geometric" speed="slow" />
       <FloatingElements />
       <ScrollProgress variant="bar" position="top" showPercentage={false} />
       
       {/* AI Chat Bot */}
       <AIChatBot />
       
        <HeroSection />

        {/* Advanced Features Demo Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative">
           <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-reveal">
                  Advanced <span className="text-primary">Interactive Features</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-reveal stagger-1">
                  Experience cutting-edge interactions with our advanced hover effects and interactive components
                </p>
              </div>
              
              {/* Interactive Cards Demo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <HoverCard variant="glass">
                  <h3 className="text-xl font-bold text-white mb-3">Glass Morphism</h3>
                  <p className="text-gray-300">Beautiful glass effect with backdrop blur and transparency</p>
                </HoverCard>
                
                <HoverCard variant="neon">
                  <h3 className="text-xl font-bold text-white mb-3">Neon Glow</h3>
                  <p className="text-gray-300">Cyberpunk-style neon borders with glowing effects</p>
                </HoverCard>
                
                <HoverCard variant="gradient">
                  <h3 className="text-xl font-bold text-white mb-3">Gradient Magic</h3>
                  <p className="text-gray-300">Smooth gradient transitions with dynamic color shifts</p>
                </HoverCard>
                
                <HoverCard variant="floating">
                  <h3 className="text-xl font-bold text-white mb-3">Floating Effect</h3>
                  <p className="text-gray-300">Lightweight floating cards with subtle animations</p>
                </HoverCard>
                
                <HoverCard variant="default">
                  <h3 className="text-xl font-bold text-white mb-3">Classic Style</h3>
                  <p className="text-gray-300">Timeless design with modern hover interactions</p>
                </HoverCard>
                
                <HoverCard variant="glass">
                  <h3 className="text-xl font-bold text-white mb-3">Interactive Demo</h3>
                  <p className="text-gray-300">Move your mouse to see dynamic effects in action</p>
                </HoverCard>
              </div>
              
              {/* Interactive Buttons Demo */}
              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Interactive Buttons
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <InteractiveButton variant="gradient">Gradient Button</InteractiveButton>
                  <InteractiveButton variant="neon">Neon Button</InteractiveButton>
                  <InteractiveButton variant="glass">Glass Button</InteractiveButton>
                  <InteractiveButton variant="floating">Floating Button</InteractiveButton>
                </div>
              </div>
              
              {/* Interactive Text Demo */}
              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Interactive Text Effects
                </h3>
                <div className="flex flex-wrap justify-center gap-8 text-2xl">
                  <InteractiveText variant="gradient">Gradient Text</InteractiveText>
                  <InteractiveText variant="glow">Glow Effect</InteractiveText>
                  <InteractiveText variant="underline">Underline</InteractiveText>
                  <InteractiveText variant="scale">Scale Effect</InteractiveText>
                </div>
              </div>
           </div>
        </section>

        {/* Enhanced Features Section with Interactive Showcase */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative">
           {/* Background decoration */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
           
           <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-reveal">
                  Powerful Features for Your 
                  <span className="text-primary"> Career Growth</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-reveal stagger-1">
                  Discover the tools and insights that will accelerate your professional journey
                </p>
              </div>
              
              {/* Interactive Feature Showcase */}
              <FeatureShowcase features={features} />
           </div>
        </section>

        {/* Enhanced Stats Section with Animated Counters */}
        <section className="w-full py-16 md:py-24 bg-muted/30 relative">
           {/* Background decoration */}
           <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
           
           <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <StatsCounter 
                  endValue={50} 
                  suffix="+" 
                  icon="🏭" 
                  label="Industries Covered" 
                />
                <StatsCounter 
                  endValue={1000} 
                  suffix="+" 
                  icon="❓" 
                  label="Interview Questions" 
                />
                <StatsCounter 
                  endValue={95} 
                  suffix="%" 
                  icon="📈" 
                  label="Success Rate" 
                />
                <StatsCounter 
                  endValue={24} 
                  suffix="/7" 
                  icon="🤖" 
                  label="AI Support" 
                />
              </div>
           </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative">
           {/* Background decoration */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
           
           <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-6 text-reveal">
                 How It <span className="text-primary">Works</span>
               </h2>
              <p className="text-xl text-muted-foreground text-reveal stagger-1">
                Four simple steps to accelerate your career growth with AI-powered guidance
              </p>
            </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-6 text-reveal stagger-1">
                     <div className="relative">
                       <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg hover-lift">
                         <div className="text-primary text-2xl">
                           {item.icon}
                         </div>
                       </div>
                       <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                         {index + 1}
                       </div>
                     </div>
                     <h3 className="font-bold text-xl">{item.title}</h3>
                     <p className="text-muted-foreground leading-relaxed max-w-xs">{item.description}</p>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* Enhanced Testimonials Section with Carousel */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 relative">
           {/* Background decoration */}
           <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-accent/5" />
           
           <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-reveal">
                  What Our <span className="text-primary">Users Say</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-reveal stagger-1">
                  Real stories from professionals who transformed their careers
                </p>
              </div>
              
              {/* Interactive Testimonials Carousel */}
              <TestimonialsCarousel testimonials={enhancedTestimonials} />
           </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative">
           {/* Background decoration */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
           
           <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-6 text-reveal">
                 Frequently Asked <span className="text-primary">Questions</span>
               </h2>
              <p className="text-xl text-muted-foreground text-reveal stagger-1">
                Find answers to common questions about our platform and services
              </p>
            </div>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-4">      
                {faqs.map((faq, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="glass border-0 shadow-lg rounded-lg overflow-hidden text-reveal stagger-1">
                   <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:text-primary transition-colors">
                     {faq.question}
                   </AccordionTrigger>
                   <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                   </AccordionContent>
                 </AccordionItem> 
                ))}
                </Accordion>
             </div>
           </div>
        </section>

        {/* New Advanced CTA Section */}
        <CTASection />

        {/* Enhanced Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 relative">
           <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-reveal">
                  Ready to Transform Your <span className="text-primary">Career?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 text-reveal stagger-1">
                  Join thousands of professionals who have already accelerated their growth with AI-powered coaching
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button size="lg" className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift pulse-glow">
                    Start Your Journey
                  </Button>
                  <Button size="lg" className="px-10 py-6 text-lg font-semibold btn-enhanced hover-lift glass" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
           </div>
        </section>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 left-6 z-50 space-y-4">
          <FloatingActionButton variant="gradient">
            <span className="text-2xl">🚀</span>
          </FloatingActionButton>
          <FloatingActionButton variant="neon">
            <span className="text-2xl">💬</span>
          </FloatingActionButton>
          <FloatingActionButton variant="glass">
            <span className="text-2xl">⭐</span>
          </FloatingActionButton>
        </div>
    </div>
   </NotificationProvider>
  )
}
