// src/components/public/StaticPaymentTerms.js
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const StaticPaymentTerms = () => {
  const terms = [
    { percent: "50%", text: "on acceptance of quotation (deposit to secure materials and programme)" },
    { percent: "25%", text: "on commencement of works (mobilisation and initial site setup)" },
    { percent: "25%", text: "on practical completion and handover (final commissioning and certification)" }
  ];

  return (
    <section id="payment" className="relative py-20 md:py-28 bg-white overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033]">
              Payment Terms
            </h2>
            <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fair, and milestone-based structure.
            </p>
          </motion.div>

          {/* Payment Terms Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto"
          >
            <div className="p-8 md:p-12">
              <div className="space-y-10">
                {terms.map((term, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-6 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#c9df8a]/10 flex items-center justify-center text-3xl font-bold text-[#c9df8a]">
                      {term.percent}
                    </div>
                    <p className="text-lg md:text-xl text-gray-800">
                      {term.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <motion.p
                variants={itemVariants}
                className="mt-10 text-center text-lg text-gray-600 italic"
              >
                All payments are due within 7 days of invoice date. Late payments may incur interest at 8% above Bank of England base rate.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StaticPaymentTerms;