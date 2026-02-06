// src/components/public/CallToAction.js
import React, { useState } from 'react';

const CallToAction = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (!agreed) {
      alert('Please agree to the terms before accepting.');
      return;
    }
    alert('Thank you! Your proposal has been accepted. We will contact you shortly.');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

          <div className="p-8 md:p-12 lg:p-16 text-center">
            {/* Main headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Move Forward?
            </h2>

            {/* Supporting text */}
            <p className="text-xl md:text-2xl text-gray-700 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Accept this quotation today and let our team start delivering reliable, hassle-free utility solutions for your project.
            </p>

            {/* Checkbox + legal note */}
            <div className="flex items-start justify-center gap-4 mb-10 max-w-xl mx-auto">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1.5 h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="agree" className="text-base md:text-lg text-gray-700 cursor-pointer">
                I have read and agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </a>.
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Primary action – Accept */}
              <button
                onClick={handleAccept}
                disabled={!agreed}
                className={`px-12 py-5 text-xl md:text-2xl font-bold rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  agreed
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accept This Proposal
              </button>

              {/* Secondary action – Contact */}
              <a
                href="mailto:info@airutilities.co.uk?subject=Question%20about%20Quotation"
                className="px-12 py-5 text-xl md:text-2xl font-medium rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Ask a Question First
              </a>
            </div>

            {/* Small trust signals */}
            <div className="mt-10 text-base text-gray-600">
              <p>
                Questions? Call us directly on <strong>0330 058 0252</strong> or email{' '}
                <a href="mailto:info@airutilities.co.uk" className="text-blue-600 hover:underline">
                  info@airutilities.co.uk
                </a>
              </p>
              <p className="mt-3">
                We usually respond within 1 working hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;