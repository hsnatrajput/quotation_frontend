// src/components/public/StaticConstructionAssumptions.js
import React from 'react';

const StaticConstructionAssumptions = () => {
  return (
    <section id="assumptions" className="py-12 bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          SECTION 2 – CONSTRUCTION ASSUMPTIONS
        </h2>
        <p className="text-center text-gray-600 mb-8">
          The tender price is based upon the following assumptions
        </p>

        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-3">Site Specific Assumptions</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All works are based on unmade ground conditions unless otherwise stated.</li>
              <li>No unforeseen ground conditions (rock, contaminated soil, etc.) are assumed.</li>
              <li>Access to site is available 24/7 during agreed working hours.</li>
              <li>All statutory notices and permissions are the responsibility of the client.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">General Terms and Conditions</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Prices are valid for 30 days from the date of this quotation.</li>
              <li>Payment terms: 50% on acceptance, 25% on commencement, 25% on completion.</li>
              <li>All works carried out in accordance with current regulations and standards.</li>
              <li>Any variations or additional works will be subject to separate quotation.</li>
              <li>Force majeure clauses apply.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticConstructionAssumptions;