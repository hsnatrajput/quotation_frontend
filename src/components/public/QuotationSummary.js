// src/components/public/QuotationSummary.js
import React from 'react';

const QuotationSummary = ({ quotation }) => {
  const {
    projectTitle = "Project Title",
    siteAddress = "Site Address",
    customerName = "Customer Name",
    jobType = [],  // array
    subtotal = 0,
    vatRate = 20,
    vatAmount = 0,
    totalAmount = 0,
    validUntil = "N/A",
    items = [],
  } = quotation || {};

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Quotation Summary
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed breakdown for your project — clear, transparent, and ready to proceed.
          </p>
        </div>

        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header – updated with jobType and siteAddress */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-10 md:px-12 md:py-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {jobType.length > 0 ? jobType.join(' + ') : 'General'} Job – {projectTitle}
            </h3>
            <p className="text-lg md:text-xl opacity-90 mb-2">
              Site Address: {siteAddress}
            </p>
            <p className="text-base md:text-lg opacity-90">
              Prepared for: <span className="font-medium">{customerName}</span>
            </p>
          </div>

          {/* Items table */}
          <div className="px-6 md:px-10 pt-10 pb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-lg font-semibold text-gray-800">Service</th>
                    <th className="py-4 px-4 text-lg font-semibold text-gray-800 text-right">Amount (£)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-5 px-4 text-gray-800 text-base md:text-lg">
                        {item.serviceName || item.name || 'Unnamed Service'}
                      </td>
                      <td className="py-5 px-4 text-right text-gray-900 font-medium text-base md:text-lg">
                        {Number(item.totalPrice || item.price || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pricing summary */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200">
              <div className="flex justify-between items-center py-4 text-lg md:text-xl">
                <span className="text-gray-700 font-medium">Subtotal</span>
                <span className="text-gray-900 font-semibold">
                  £{Number(subtotal).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 text-lg md:text-xl border-t border-gray-100">
                <span className="text-gray-700 font-medium">VAT ({vatRate}%)</span>
                <span className="text-gray-900 font-semibold">
                  £{Number(vatAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-6 text-2xl md:text-3xl font-bold mt-4 bg-gray-50 px-6 rounded-xl">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-700">
                  £{Number(totalAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <p className="mt-8 text-center text-gray-600 text-base md:text-lg">
                This quotation is valid until <strong>{validUntil}</strong>.
                Prices exclude any third-party fees or unforeseen site conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationSummary;