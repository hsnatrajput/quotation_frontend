// src/components/public/AirSourceHeatPumps.js
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AirSourceHeatPumps = ({ data }) => {
  if (!data) return null;

  const details = [
    { label: "No. of plots with air source heat pump", value: data.numPlots || "—" },
    { label: "Plot numbers", value: data.plotNumbers || "—" },
    { label: "Data sheet provided", value: data.dataSheet ? "Yes" : "No" },
    { label: "Pump Model", value: data.pumpModel || "—" },
    { label: "ASHP load allowance per plot", value: data.loadAllowance || "—" },
  ];

  return (
    <section id="heat-pumps" className="relative py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            {/* <p className="uppercase tracking-widest text-[#c9df8a] font-medium text-sm mb-3">
              Additional Considerations
            </p> */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033]">
              Air Source Heat Pumps
            </h2>
            <p className="mt-5 text-xl text-gray-700 max-w-3xl mx-auto">
              This tender does not include electric load provision for air source heat pumps.
            </p>
          </motion.div>

          {/* Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {details.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <label className="block text-base md:text-lg font-medium text-gray-700">
                      {item.label}
                    </label>
                    <p className="text-lg md:text-xl text-gray-900 font-semibold">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AirSourceHeatPumps;