// src/components/public/AirSourceHeatPumps.js
import React from 'react';

const AirSourceHeatPumps = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-stone-50 p-10 rounded-2xl">
      <p className="text-stone-600 mb-8 text-center">This tender does not include for the electric load provision to supply capacity for air source heat pumps.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
        <div><span className="font-medium text-stone-500">No. of plots with air source heat pump</span><p className="mt-1 text-lg">{data.numPlots || '—'}</p></div>
        <div><span className="font-medium text-stone-500">Plot numbers</span><p className="mt-1 text-lg">{data.plotNumbers || '—'}</p></div>
        <div><span className="font-medium text-stone-500">Data sheet provided</span><p className="mt-1 text-lg">{data.dataSheet ? 'Yes' : 'No'}</p></div>
        <div><span className="font-medium text-stone-500">Pump Model</span><p className="mt-1 text-lg">{data.pumpModel || '—'}</p></div>
        <div><span className="font-medium text-stone-500">ASHP load allowance per plot</span><p className="mt-1 text-lg">{data.loadAllowance || '—'}</p></div>
      </div>
    </div>
  );
};

export default AirSourceHeatPumps;