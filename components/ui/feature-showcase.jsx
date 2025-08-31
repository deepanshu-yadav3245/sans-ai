"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const FeatureShowcase = ({ features, className, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "group relative cursor-pointer transition-all duration-500",
              activeIndex === index ? "scale-105" : "scale-100"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {/* 3D Card Effect */}
            <div className="relative transform-style-preserve-3d transition-all duration-500 group-hover:rotate-y-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full transform transition-all duration-500 hover:shadow-2xl hover:border-white/40">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Floating particles around icon */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-600" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping delay-900" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Interactive Button */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </div>

            {/* Connection Lines */}
            {index < features.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-blue-400/50 to-purple-400/50 transform -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>

      {/* Feature Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              activeIndex === index 
                ? "bg-gradient-to-r from-blue-400 to-purple-400 scale-125" 
                : "bg-gray-400/50 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureShowcase;
