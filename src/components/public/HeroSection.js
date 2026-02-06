import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[680px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[18s] hover:scale-110"
        style={{
          backgroundImage: "url('/assets/background-hero.png')",
        }}
      />

      {/* Stronger overlay – more premium cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-black/75"></div>

      {/* Main content – very centered, breathing layout */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-24">
        {/* Top subtle pre-headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-medium tracking-widest uppercase mb-4 md:mb-6 opacity-90 animate-fade-in-up">
          Electric • Gas • Water 
        </p>

        {/* Hero headline – huge, confident, slightly premium */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none tracking-tight drop-shadow-3xl animate-fade-in-up animation-delay-200">
          Utilities <span className="text-blue-300">Done Right</span>
        </h1>

        {/* Strong subheadline – warm, confident, tiny clever touch */}
        <p className="mt-8 md:mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-100 font-light max-w-5xl mx-auto leading-tight drop-shadow-2xl animate-fade-in-up animation-delay-400">
          We connect homes and businesses to the essentials —<br className="hidden sm:block" />
          <span className="font-medium text-white">
            reliably, transparently, and without the usual headaches.
          </span>
        </p>

        {/* Very small underline sentence – human touch */}
        <p className="mt-10 text-lg md:text-xl text-gray-200 max-w-4xl mx-auto opacity-90 font-light italic">
          Because boring bills shouldn’t come with boring service.
        </p>
      </div>

      {/* Gentle scroll prompt */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white/70 animate-bounce-slow">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;