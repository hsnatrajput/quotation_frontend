// src/components/public/CompanyIntro.js
import React from 'react';

const CompanyIntro = () => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden ">
      {/* Second background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20s] hover:scale-110"
        style={{
          backgroundImage: "url('/assets/background-intro.jpg')",
        }}
      />

      {/* Overlay – softer than hero, more approachable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/70"></div>

      {/* Content – left-aligned or centered depending on image mood */}
      <div className="relative z-10 h-full flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl lg:max-w-3xl xl:max-w-4xl text-left lg:text-left">
          {/* Small pre-title */}
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-medium tracking-wider uppercase mb-6 md:mb-8 opacity-90">
            Why Choose Us?
          </p>

          {/* Main headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 md:mb-12 drop-shadow-2xl">
            We Make Utilities <span className="text-blue-300">Simple Again</span>
          </h2>

          {/* Body text – professional, confident, slightly warm */}
          <div className="space-y-6 md:space-y-8 text-gray-100 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
            <p>
              In a world of complicated bills and endless hold music, we believe utilities should just <strong>work</strong>.
            </p>
            <p>
              No hidden fees. No confusing jargon. No “sorry, that’s not our department”.
            </p>
            <p className="font-medium text-white">
              Electricity, gas, water, smart metering, EV chargers, solar integration — we handle it all, with one point of contact and zero excuses.
            </p>
          </div>

          {/* Small closing line – light witty touch */}
          <p className="mt-10 md:mt-12 text-xl md:text-2xl text-gray-200 italic opacity-90">
            Because life’s too short for another 45-minute call about your meter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;