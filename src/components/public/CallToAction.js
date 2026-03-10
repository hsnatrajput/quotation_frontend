// src/components/public/CallToAction.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ctaVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const CallToAction = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="relative py-20 md:py-28 bg-[#fdfaf5] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ctaVariants}
        >
          <div className="p-10 md:p-14 lg:p-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#5c4033] mb-8">
              Ready to Move Forward?
            </h2>

            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-12 max-w-3xl mx-auto">
              Accept this quotation today and let our team start delivering reliable, hassle-free utility solutions for your project.
            </p>

            <div className="flex items-start justify-center gap-4 mb-12 max-w-xl mx-auto">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1.5 h-6 w-6 rounded border-gray-300 text-[#c9df8a] focus:ring-[#c9df8a] cursor-pointer"
              />
              <label htmlFor="agree" className="text-lg text-gray-700 cursor-pointer">
                I have read and agree to the{' '}
                <a href="#" className="text-[#c9df8a] hover:underline font-medium">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#c9df8a] hover:underline font-medium">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <button
                onClick={onAccept}
                disabled={!agreed}
                className={`px-12 py-5 text-xl md:text-2xl font-bold rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#c9df8a]/30 ${
                  agreed
                    ? 'bg-[#c9df8a] hover:bg-[#b8d078] text-gray-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accept This Proposal
              </button>

              <a
                href="mailto:info@airutilities.co.uk?subject=Question%20about%20Quotation"
                className="px-12 py-5 text-xl md:text-2xl font-medium rounded-xl border-2 border-[#c9df8a] text-[#c9df8a] hover:bg-[#c9df8a]/10 transition-all duration-300"
              >
                Ask a Question First
              </a>
            </div>

            <div className="text-base text-gray-600">
              <p>
                Questions? Call us directly on <strong className="text-gray-900">0330 058 0252</strong> or email{' '}
                <a href="mailto:info@airutilities.co.uk" className="text-[#c9df8a] hover:underline">
                  info@airutilities.co.uk
                </a>
              </p>
              <p className="mt-3">
                We usually respond within 1 working hour.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;