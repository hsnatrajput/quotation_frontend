// src/components/public/HeroSection.js
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header – fixed, transparent → solid on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-600/95 backdrop-blur-md shadow-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"> {/* ← reduced left/right padding */}
          {/* Logo – shifted more left */}
          <div className="flex items-center -ml-2 sm:-ml-4 lg:-ml-6"> {/* ← negative margin to push left */}
            <img
              src="/assets/AirUtility_Logo.png"
              alt="Air Utilities Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Placeholder for future nav (keep minimal/empty for now) */}
          {/* <nav className="hidden md:flex items-center gap-10 text-white/90 font-medium">
            <a href="#about">About</a>
            ...
          </nav> */}
        </div>
      </header>

      {/* Full-screen Hero with background image */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/background2.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>
    </>
  );
};

export default HeroSection;