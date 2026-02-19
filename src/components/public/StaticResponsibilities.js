// src/components/public/StaticResponsibilities.js
import React from 'react';

const StaticResponsibilities = () => {
  return (
    <section id="responsibilities" className="py-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          RESPONSIBILITIES
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Customer Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Provide full site access and welfare facilities.</li>
              <li>Obtain all necessary permissions, wayleaves, and landowner consents.</li>
              <li>Ensure site is clear of obstructions and ready for works.</li>
              <li>Provide accurate as-built drawings and service records where applicable.</li>
              <li>Pay all invoices in accordance with agreed payment terms.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Air Utilities Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Carry out all contestable works as per the agreed scope.</li>
              <li>Coordinate with network operators for non-contestable elements.</li>
              <li>Provide as-laid records and commissioning certificates upon completion.</li>
              <li>Maintain public liability insurance and comply with all regulations.</li>
              <li>Complete works within agreed timescales subject to site conditions.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticResponsibilities;