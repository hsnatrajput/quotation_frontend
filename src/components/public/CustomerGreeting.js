// src/components/public/CustomerGreeting.js
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
      fill="#67E8F9" 
      fillOpacity="0.22" 
    />
  </svg>
);

const CustomerGreeting = ({ customerName, siteAddress }) => {
  const name = customerName || 'Valued Customer';
  const address = siteAddress || 'your project location';

  return (
    <section className="relative bg-gradient-to-br from-zinc-50 via-white to-cyan-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left - Text (now 5 columns for balance) */}
          <div className="lg:col-span-5 space-y-8">
            {/* <div className="inline-flex items-center gap-3 px-7 py-3 bg-white rounded-3xl shadow-sm border border-cyan-100">
              <span className="text-cyan-500 text-2xl">✉️</span>
              <span className="uppercase tracking-[2px] text-sm font-semibold text-slate-700">Your Personal Proposal</span>
            </div> */}

            <h3 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-none">
              Dear <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">{name}</span>,
            </h3>

            <div className="text-2xl text-slate-700 leading-relaxed space-y-6 max-w-2xl">
              <p>
                Thank you for choosing <span className="font-semibold text-slate-900">Air Utilities</span> to power your project at{' '}
                <span className="font-medium text-cyan-700">{address}</span>.
              </p>
              <p>
                We truly appreciate the trust you have placed in us. Our team is committed to delivering reliable, high-quality utility solutions with complete transparency and professionalism.
              </p>
              <p>
                Below is your detailed quotation summary. Every item is clearly listed with pricing and explanations so you can make a confident decision.
              </p>
            </div>

            <p className="text-xl text-slate-600 italic pt-4">
              We look forward to working with you.
            </p>
          </div>

          {/* Right - BIGGER & FULL image (7 columns + taller aspect) */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white ring-1 ring-cyan-100/70 bg-white">
              <img
                src="/assets/greeting.jpg"
                alt="Air Utilities Project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Luxury floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl shadow-2xl p-7 max-w-[260px] border border-cyan-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-4xl shadow-inner">
                  ⚡
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Ready to Connect</p>
                  <p className="text-cyan-600 text-sm">Your project starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Light wave */}
      {/* <WaveDivider /> */}
    </section>
  );
};

export default CustomerGreeting;