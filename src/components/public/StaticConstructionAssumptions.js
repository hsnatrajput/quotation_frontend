// src/components/public/StaticConstructionAssumptions.js
import React from 'react';
import { motion } from 'framer-motion';

const leftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const rightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut", delay: 0.2 } }
};

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.15, duration: 0.6 }
  })
};

const StaticConstructionAssumptions = () => {
  const siteAssumptions = [
    "All works are based on unmade ground conditions unless otherwise stated.",
    "No unforeseen ground conditions (rock, contaminated soil, etc.) are assumed.",
    "Access to site is available 24/7 during agreed working hours.",
    "All statutory notices and permissions are the responsibility of the client."
  ];

  const generalTerms = [
    "Prices are valid for 30 days from the date of this quotation.",
    "Payment terms: 50% on acceptance, 25% on commencement, 25% on completion.",
    "All works carried out in accordance with current regulations and standards.",
    "Any variations or additional works will be subject to separate quotation.",
    "Force majeure clauses apply."
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left - Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={leftVariants}
          >
            <div className="text-center lg:text-left">
              {/* <p className="uppercase tracking-widest text-[#c9df8a] font-medium text-sm mb-3">
                Important Notes
              </p> */}
              <h2 className="
                text-4xl md:text-5xl lg:text-5xl xl:text-6xl 
                font-serif font-bold text-[#F28C28] 
                whitespace-nowrap
              ">
                Construction Assumptions
              </h2>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                The tender price is based upon the following key assumptions.
              </p>
            </div>

            {/* Site Specific */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">
                Site Specific Assumptions
              </h3>
              <ul className="space-y-5 text-lg text-gray-200">
                {siteAssumptions.map((item, i) => (
                  <motion.li 
                    key={i} 
                    custom={i}
                    variants={listVariants}
                    className="flex items-start gap-4"
                  >
                    <span className="text-[#c9df8a] text-3xl leading-none mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* General Terms */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">
                General Terms & Conditions
              </h3>
              <ul className="space-y-5 text-lg text-gray-200">
                {generalTerms.map((item, i) => (
                  <motion.li 
                    key={i} 
                    custom={i}
                    variants={listVariants}
                    className="flex items-start gap-4"
                  >
                    <span className="text-[#c9df8a] text-3xl leading-none mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - Full Rectangular Image (no curve, no thick border, no zoom) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rightVariants}
          >
            <div className="w-full max-w-[480px] lg:max-w-full aspect-[4/3] overflow-hidden shadow-2xl border border-gray-700 rounded-xl">
              <img
                src="/assets/c-assumptions.jpg"
                alt="Construction Assumptions"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StaticConstructionAssumptions;