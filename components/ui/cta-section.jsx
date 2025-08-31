"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = ({ className, ...props }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className={cn("w-full py-20 relative overflow-hidden", className)} {...props}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have already accelerated their growth with AI-powered coaching. 
              Start your journey today and unlock your full potential.
            </p>
          </div>

          {/* CTA Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email Subscription */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Stay Updated</h3>
              <p className="text-gray-400 text-center mb-6">
                Get the latest insights and career tips delivered to your inbox
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe Now</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center text-green-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <p>Successfully subscribed!</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Phone className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Get in Touch</h3>
              <p className="text-gray-400 text-center mb-6">
                Have questions? Our team is here to help you succeed
              </p>
              <div className="space-y-3 text-center">
                <p className="text-white">📞 +1 (555) 123-4567</p>
                <p className="text-white">📧 support@aicareercoach.com</p>
                <p className="text-white">🌍 Available 24/7</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <MapPin className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Global Reach</h3>
              <p className="text-gray-400 text-center mb-6">
                Serving professionals worldwide with AI-powered career guidance
              </p>
              <div className="space-y-3 text-center">
                <p className="text-white">🌍 50+ Countries</p>
                <p className="text-white">👥 100,000+ Users</p>
                <p className="text-white">⭐ 4.9/5 Rating</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey Today</h3>
                <p className="text-gray-300 mb-4">
                  Join the future of career development with AI-powered coaching
                </p>
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
