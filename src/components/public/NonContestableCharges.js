// src/components/public/NonContestableCharges.js
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

const NonContestableCharges = ({ data }) => {
  if (!data) return null;

  const charges = [
    { desc: "Electric POC cost", value: data.electricPOC || "—" },
    { desc: "Water POC – incumbent connection charges", value: data.waterPOC || "—" },
    { desc: "Water infrastructure fees", value: data.waterInfra || "—" },
    // Add more rows dynamically if you have more fields later
  ];

  return (
    <section id="non-contestable" className="relative py-20 md:py-28 bg-transparent overflow-hidden">
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
              Included Network Charges
            </p> */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033]">
              Non-Contestable Network Charges
            </h2>
            <p className="mt-5 text-xl text-gray-700 max-w-3xl mx-auto">
              These charges are included in our tender offer and paid directly by Air Utilities to the network operator.
            </p>
          </motion.div>

          {/* Table Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-6 px-8 text-left text-lg font-semibold">Description</th>
                  <th className="py-6 px-8 text-right text-lg font-semibold">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {charges.map((charge, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-6 px-8 text-base md:text-lg font-medium text-gray-800 border-r border-gray-200">
                      {charge.desc}
                    </td>
                    <td className="py-6 px-8 text-right text-base md:text-lg font-semibold text-gray-900">
                      {charge.value === "—" ? "—" : `£${Number(charge.value).toLocaleString('en-GB')}`}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NonContestableCharges;