// src/components/public/QuotationScopeTable.js
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const QuotationScopeTable = ({ data }) => {
  if (!data) return null;

  const rows = [
    { desc: "Total Plots", detail: data.totalPlots || "—" },
    { desc: "Future Phase allowance", detail: data.futurePhaseAllowance || "—" },
    { desc: "Total Load allowance", detail: data.totalLoadAllowance || "—" },
    { desc: "Heating type", detail: data.heatingType || "—" },
    { desc: "Plot connections", detail: data.plotConnections || "—" },
    { desc: "Meters", detail: data.meters || "—" },
    { desc: "Electric connection voltage", detail: data.electricVoltage || "—" },
    { desc: "Water main type", detail: data.waterMainType || "—" },
    { desc: "Water/Waste water sustainability", detail: data.waterSustainability || "—" },
    { desc: "Mains connections/Piece up (commissioning visits)", detail: data.mainsConnections || "—" },
  ];

  return (
    <section id="scope" className="relative py-20 md:py-28 bg-[#fdfaf5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left - Table & Text (more space) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              {/* <p className="uppercase tracking-widest text-[#c9df8a] font-medium text-sm mb-3">
                Project Details
              </p> */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033]">
                Scope of Works
              </h2>
              <p className="mt-5 text-xl text-gray-700">
                Prepared based on drawing: <strong className="text-gray-900">{data.drawing || "—"}</strong>
              </p>
            </motion.div>

            {/* Table */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="py-6 px-8 text-left text-lg font-semibold">Description</th>
                    <th className="py-6 px-8 text-left text-lg font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <motion.tr
                      key={index}
                      variants={itemVariants}
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-6 px-8 text-base md:text-lg font-medium text-gray-800 border-r border-gray-200">
                        {row.desc}
                      </td>
                      <td className="py-6 px-8 text-base md:text-lg text-gray-700">
                        {row.detail}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Right - Circular Image */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden shadow-2xl border-8 border-white ring-2 ring-gray-200">
              <img
                src="/assets/scope.webp"
                alt="Project Scope"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuotationScopeTable;