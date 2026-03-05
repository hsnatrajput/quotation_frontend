// src/components/public/StaticResponsibilities.js
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

const StaticResponsibilities = () => {
  const customerResponsibilities = [
    "Provide full site access and welfare facilities.",
    "Obtain all necessary permissions, wayleaves, and landowner consents.",
    "Ensure site is clear of obstructions and ready for works.",
    "Provide accurate as-built drawings and service records where applicable.",
    "Pay all invoices in accordance with agreed payment terms."
  ];

  const airUtilitiesResponsibilities = [
    "Carry out all contestable works as per the agreed scope.",
    "Coordinate with network operators for non-contestable elements.",
    "Provide as-laid records and commissioning certificates upon completion.",
    "Maintain public liability insurance and comply with all regulations.",
    "Complete works within agreed timescales subject to site conditions."
  ];

  return (
    <section id="responsibilities" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033]">
              Responsibilities
            </h2>
            <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
              Clear division of duties to ensure smooth project delivery.
            </p>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Customer Responsibilities */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">
                Customer Responsibilities
              </h3>
              <ul className="space-y-5 text-lg text-gray-700">
                {customerResponsibilities.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { delay: 0.3 + i * 0.1 } }
                    }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-[#c9df8a] text-2xl leading-none mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Air Utilities Responsibilities */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">
                Air Utilities Responsibilities
              </h3>
              <ul className="space-y-5 text-lg text-gray-700">
                {airUtilitiesResponsibilities.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { delay: 0.3 + i * 0.1 } }
                    }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-[#c9df8a] text-2xl leading-none mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StaticResponsibilities;