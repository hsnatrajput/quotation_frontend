// src/components/public/PaymentTerms.js
import React from 'react';

const PaymentTerms = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Terms & Conditions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Straightforward, fair, and fully transparent — we believe in clear expectations from day one.
          </p>
        </div>

        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Payment schedule */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Payment Schedule
            </h3>

            <div className="space-y-8">
              {/* Milestone 1 */}
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    50% Deposit on Acceptance
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Payable immediately upon your written acceptance of this quotation. This secures your place in our schedule and covers initial materials & planning.
                  </p>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Remaining 50% on Completion & Certification
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Due within 7 days of project handover, full testing, commissioning, and issuance of all relevant certification (e.g., NICEIC, Gas Safe, etc.).
                  </p>
                </div>
              </div>

              {/* Milestone 3 – optional */}
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Any Additional Works (if required)
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Quoted separately at agreed hourly rates or fixed price — never invoiced without your prior written approval.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important notes & exclusions */}
          <div className="p-8 md:p-12 bg-gray-50">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Important Notes
            </h3>

            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mt-1">
                  ✓
                </span>
                <span>All prices are exclusive of VAT unless stated otherwise.</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mt-1">
                  ✓
                </span>
                <span>Payment is due within 7 days of invoice date. Late payments may incur interest at 8% above Bank of England base rate.</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl mt-1">
                  !
                </span>
                <span>
                  <strong>Exclusions:</strong> Council permits, wayleaves, third-party connection fees, unforeseen ground conditions, or additional works not listed in this quotation.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mt-1">
                  ✓
                </span>
                <span>Any changes to scope will be documented via a written variation and agreed before proceeding.</span>
              </li>
            </ul>
          </div>

          {/* Hourly rates table – optional but professional */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Standard Hourly Rates (for additional works)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-lg font-semibold text-gray-800">Role</th>
                    <th className="py-4 px-4 text-lg font-semibold text-gray-800 text-right">Rate (£/hour)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-5 px-4 text-gray-800 text-base md:text-lg">Senior Engineer</td>
                    <td className="py-5 px-4 text-right text-gray-900 font-medium text-base md:text-lg">£95</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-5 px-4 text-gray-800 text-base md:text-lg">Qualified Technician</td>
                    <td className="py-5 px-4 text-right text-gray-900 font-medium text-base md:text-lg">£75</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-5 px-4 text-gray-800 text-base md:text-lg">Apprentice / Assistant</td>
                    <td className="py-5 px-4 text-right text-gray-900 font-medium text-base md:text-lg">£45</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-gray-600 text-base md:text-lg italic">
              Hourly rates apply only to additional works outside the agreed scope. All extra work requires your prior written approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentTerms;