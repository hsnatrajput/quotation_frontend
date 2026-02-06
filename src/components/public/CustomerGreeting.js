// src/components/public/CustomerGreeting.js
import React from 'react';

const CustomerGreeting = ({ customerName, siteAddress }) => {
  // Fallbacks in case data is missing
  const name = customerName || 'Valued Customer';
  const address = siteAddress || 'your specified location';

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-blue-50/50 rounded-2xl p-8 md:p-12 border border-blue-100 shadow-sm">
          {/* Greeting line */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Dear {name},
          </h3>

          {/* First paragraph */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Thank you for choosing Air Utilities to support your project at {address}. 
            We truly appreciate the trust you have placed in us and are excited to deliver reliable, high-quality utility solutions tailored exactly to your needs.
          </p>

          {/* Second paragraph */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Below you will find a clear and transparent summary of the quotation we discussed. 
            Everything is itemized, priced and explained so you can make an informed decision with confidence. 
            If anything needs clarification or adjustment — we're here to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerGreeting;