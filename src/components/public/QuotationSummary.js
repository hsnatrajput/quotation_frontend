// src/components/public/QuotationSummary.js
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          className="space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            {/* <p className="uppercase tracking-widest text-[#c9df8a] font-medium text-sm mb-3">
              Transparent & Professional
            </p> */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
              Your Quotation Summary
            </h2>
            <p className="mt-5 text-xl text-gray-600 max-w-2xl mx-auto">
              Clear, concise, and ready for your review.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-600 text-white px-8 py-12 md:px-12 md:py-16">
              <h3 className="text-3xl md:text-4xl font-serif font-bold">
                {jobType.length > 0 ? jobType.join(' + ') : 'Project'} — {projectTitle}
              </h3>
              <p className="mt-3 text-lg opacity-90">{siteAddress}</p>
              <p className="text-base opacity-80 mt-1">Prepared for {customerName}</p>
            </div>

            {/* Table */}
            <div className="p-8 md:p-12">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-5 text-left text-lg font-semibold text-gray-800">Service / Description</th>
                    <th className="py-5 text-right text-lg font-semibold text-gray-800">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <motion.tr
                      key={i}
                      variants={itemVariants}
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-6 text-base md:text-lg text-gray-800">
                        {item.serviceName || item.name}
                      </td>
                      <td className="py-6 text-right text-lg md:text-xl font-semibold text-gray-600">
                        £{Number(item.totalPrice || item.price).toLocaleString('en-GB')}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <motion.div
                variants={itemVariants}
                className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-10"
              >
                <div className="flex justify-between text-lg text-gray-700 py-3">
                  <span>Subtotal</span>
                  <span className="font-medium">£{Number(subtotal).toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700 py-3 border-t border-gray-200">
                  <span>VAT ({vatRate}%)</span>
                  <span className="font-medium">£{Number(vatAmount).toLocaleString('en-GB')}</span>
                </div>

                <div className="mt-8 flex justify-between items-end border-t-4 border-[#c9df8a] pt-8">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">Total Due</span>
                  <span className="text-5xl md:text-6xl font-black text-[#c9df8a]">
                    £{Number(totalAmount).toLocaleString('en-GB')}
                  </span>
                </div>
              </motion.div>

              {/* Validity */}
              {/* <motion.p
                variants={itemVariants}
                className="text-center mt-10 text-gray-600 text-lg"
              >
                This quotation is valid until <strong className="text-gray-900 font-medium">{validUntil}</strong>
              </motion.p> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuotationSummary;