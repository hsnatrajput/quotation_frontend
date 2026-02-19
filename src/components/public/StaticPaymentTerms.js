// src/components/public/StaticPaymentTerms.js
import React from 'react';

const StaticPaymentTerms = () => {
  return (
    <section id="payment" className="py-12 bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          PAYMENT TERMS
        </h2>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-3">50%</span>
              <span>on acceptance of quotation (deposit to secure materials and programme)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-3">25%</span>
              <span>on commencement of works (mobilisation and initial site setup)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-3">25%</span>
              <span>on practical completion and handover (final commissioning and certification)</span>
            </li>
          </ul>

          <p className="mt-8 text-gray-600 italic text-center">
            All payments are due within 7 days of invoice date. Late payments may incur interest at 8% above Bank of England base rate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StaticPaymentTerms;