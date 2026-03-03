// src/components/public/HeroSection.js
import React from 'react';

const WaveDivider = () => (
  <svg 
    className="w-full h-28 md:h-36 -mb-1" 
    viewBox="0 0 1440 120" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    preserveAspectRatio="none"
  >
    <path 
      d="M0 120L60 100C120 80 240 45 360 50C480 55 600 95 720 90C840 85 960 50 1080 40C1200 30 1320 55 1380 65L1440 80V120H0Z" 
      fill="#f8fafc" 
    />
    <path 
      d="M0 120L48 105C96 90 192 60 288 55C384 50 480 80 576 85C672 90 768 60 864 45C960 30 1056 40 1152 50C1248 60 1344 80 1392 85L1440 90V120H0Z" 
      // fill="#67E8F9" 
      fillOpacity="0.22" 
    />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[720px] w-full overflow-hidden bg-white">
      {/* Background image with soft light cinematic zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-[28s] ease-out"
        style={{ backgroundImage: "url('/assets/background-hero.png')" }}
      />

      {/* Very soft light overlay – premium airy feel */}
      <div className="absolute inset-0 from-white/75 via-cyan-50/60 to-white/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-12">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/90 backdrop-blur-xl border border-cyan-100 rounded-full text-cyan-700 text-sm font-medium tracking-[4px] uppercase mb-8 shadow-sm">
            ⚡ AIR UTILITIES • PREMIUM UTILITY SOLUTIONS
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6.5rem] font-black text-slate-900 leading-none tracking-[-0.04em]">
            Utilities <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">Done Right</span>
          </h1>

          <p className="mt-8 text-2xl md:text-3xl text-slate-700 font-light max-w-3xl mx-auto leading-tight">
            Premium connections. Crystal-clear pricing.<br className="hidden sm:block" /> Zero headaches.
          </p>
        </div>
      </div>

      {/* Elegant light wave divider */}
      {/* <div className="absolute bottom-0 left-0 w-full">
        <WaveDivider />
      </div> */}

      {/* Scroll prompt – light theme */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500 animate-bounce">
        <span className="text-xs tracking-[3px] font-medium">SCROLL FOR YOUR PROPOSAL</span>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-9-9m0 0L5 14" /></svg>
      </div>
    </section>
  );
};

export default HeroSection;