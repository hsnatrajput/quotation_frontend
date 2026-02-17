// src/components/public/ConstructionAssumptions.js
import React from 'react';

const ConstructionAssumptions = ({ data }) => {
  if (!data) return null;

  return (
    <section id="assumptions" className="py-12 bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">SECTION 2 – CONSTRUCTION ASSUMPTIONS</h2>
        <p className="text-center text-gray-600 mb-8">
          The tender price is based upon the following assumptions
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Site specific</h3>
            <p className="text-gray-700">{data.siteSpecific || 'No specific assumptions provided.'}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">General terms and conditions</h3>
            <p className="text-gray-700">{data.generalTerms || 'No general terms provided.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionAssumptions;