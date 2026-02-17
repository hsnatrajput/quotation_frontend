// src/components/public/AirSourceHeatPumps.js
import React from 'react';

const AirSourceHeatPumps = ({ data }) => {
  if (!data) return null;

  return (
    <section id="heat-pumps" className="py-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Air Source Heat Pumps</h2>
        <p className="text-center text-gray-600 mb-8">
          This tender does not include for the electric load provision to supply capacity for air source heat pumps.
        </p>

        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">No. of plots with air source heat pump</label>
              <p className="text-lg mt-1">{data.numPlots || '—'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Plot numbers</label>
              <p className="text-lg mt-1">{data.plotNumbers || '—'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Data sheet provided</label>
              <p className="text-lg mt-1">{data.dataSheet ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Pump Model</label>
              <p className="text-lg mt-1">{data.pumpModel || '—'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">ASHP load allowance per plot</label>
              <p className="text-lg mt-1">{data.loadAllowance || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirSourceHeatPumps;