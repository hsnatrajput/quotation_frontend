// src/components/public/HeroSection.js  (or extract Header separately later)
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60); // trigger after ~60px scroll – feels natural
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header – always present, transparent → solid on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-600/95 backdrop-blur-md shadow-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo / Brand name – always here, top-left aligned */}
          <div className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Air Utilities
          </div>

          {/* Placeholder for future nav – keep empty/minimal for now */}
          {/* <nav className="hidden md:flex items-center gap-10 text-white/90 font-medium">
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#clients">Clients</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav> */}
        </div>
      </header>

      {/* Full-screen Hero with background image */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/background2.jpeg')",
          }}
        />

        {/* Subtle dark overlay – keeps text crisp + cinematic mood (adjust opacity if needed) */}
        <div className="absolute inset-0 bg-black/30" />

        {/* No extra content here – logo is now handled by the header above */}
      </section>

      {/* Rest of your page content goes here – e.g. other sections */}
      {/* <main className="relative z-10 bg-white"> ... </main> */}
    </>
  );
};

export default HeroSection;