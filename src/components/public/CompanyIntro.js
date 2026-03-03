// src/components/public/CompanyIntro.js
import React from 'react';

const WaveDivider = () => (
  <svg 
    className="w-full h-28 md:h-36" 
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
      fill="#67E8F9" 
      fillOpacity="0.22" 
    />
  </svg>
);

const CompanyIntro = () => {
  return (
    <section className="relative min-h-[85vh] bg-white overflow-hidden pt-20">
      {/* Background image with soft light overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s]"
        style={{ backgroundImage: "url('/assets/background-intro.jpg')" }}
      />
      <div className="absolute inset-0  from-white/85 via-cyan-50/70 to-white/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[4px] text-cyan-600 font-medium text-lg mb-6">Why the best choose us</p>
          
          <h2 className="text-6xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">
            Utilities made <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">simple again</span>.
          </h2>

          <div className="mt-12 space-y-8 text-xl text-slate-700 leading-relaxed">
            <p>In a world of complicated bills and endless hold music, we believe utilities should just work.</p>
            <p className="font-medium text-slate-900">One point of contact. Zero surprises. Full transparency.</p>
          </div>
        </div>
      </div>

      {/* Light wave divider */}
      {/* <WaveDivider /> */}
    </section>
  );
};

export default CompanyIntro;