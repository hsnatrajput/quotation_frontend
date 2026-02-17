// src/components/public/CustomerGreeting.js
import React from 'react';

const CustomerGreeting = ({ customerName, siteAddress }) => {
  const name = customerName || 'Valued Customer';
  const address = siteAddress || 'your project location';

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-sm">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
            Dear {name},
          </h3>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-8">
            Thank you for choosing Air Utilities to support your project at <span className="font-medium text-gray-900">{address}</span>.
          </p>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-8">
            We truly appreciate the trust you have placed in us. Our team is committed to delivering reliable, high-quality utility solutions with complete transparency and professionalism.
          </p>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-700">
            Below is your detailed quotation summary. Every item is clearly listed with pricing and explanations so you can make a confident decision. 
            Should you have any questions or require adjustments, please do not hesitate to contact us.
          </p>

          <p className="mt-10 text-lg text-gray-600 italic">
            We look forward to working with you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerGreeting;