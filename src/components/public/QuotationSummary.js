// src/components/public/QuotationSummary.js
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

const QuotationSummary = ({ quotation }) => {
  const {
    projectTitle = "Project Title",
    siteAddress = "Site Address",
    customerName = "Customer Name",
    jobType = [],  
    subtotal = 0,
    vatRate = 20,
    vatAmount = 0,
    totalAmount = 0,
    validUntil = "N/A",
    items = [],
  } = quotation || {};
  
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-zinc-50 to-cyan-50/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-cyan-600 font-medium text-sm mb-3">CLEAR & TRANSPARENT</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">Your Quotation</h2>
          <p className="mt-4 text-2xl text-slate-600 max-w-lg mx-auto">
            Everything you need to know — beautifully presented.
          </p>
        </div>

        {/* Main premium card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          {/* Vibrant light-theme header */}
          <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white px-12 py-16">
            <h3 className="text-4xl font-bold">
              {jobType.length > 0 ? jobType.join(' + ') : 'Project'} — {projectTitle}
            </h3>
            <p className="mt-4 text-xl opacity-90">{siteAddress}</p>
            <p className="text-lg opacity-80">Prepared for {customerName}</p>
          </div>

          {/* Table area */}
          <div className="px-12 py-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-6 text-left text-xl font-semibold text-slate-700">Service</th>
                  <th className="py-6 text-right text-xl font-semibold text-slate-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr 
                    key={i} 
                    className="border-b hover:bg-cyan-50/70 transition-all duration-200 group"
                  >
                    <td className="py-7 text-lg text-slate-800">{item.serviceName || item.name}</td>
                    <td className="py-7 text-right text-2xl font-semibold text-slate-900">
                      £{Number(item.totalPrice || item.price).toLocaleString('en-GB')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals box – soft light gradient */}
            <div className="mt-14 bg-gradient-to-br from-zinc-50 to-white border border-slate-100 rounded-3xl p-12 shadow-inner">
              <div className="flex justify-between text-2xl py-4 text-slate-700">
                <span>Subtotal</span>
                <span className="font-medium">£{Number(subtotal).toLocaleString('en-GB')}</span>
              </div>
              <div className="flex justify-between text-2xl py-4 border-t border-slate-200 text-slate-700">
                <span>VAT (20%)</span>
                <span className="font-medium">£{Number(vatAmount).toLocaleString('en-GB')}</span>
              </div>

              <div className="mt-10 flex justify-between items-end border-t-4 border-cyan-400 pt-10">
                <span className="text-4xl font-bold text-slate-900">Total Due</span>
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                  £{Number(totalAmount).toLocaleString('en-GB')}
                </span>
              </div>
            </div>

            <p className="text-center mt-12 text-slate-500 text-lg">
              This quotation is valid until <strong className="text-slate-700 font-medium">{validUntil}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Elegant light wave */}
      <WaveDivider />
    </section>
  );
};

export default QuotationSummary;