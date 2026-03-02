// src/components/admin/quotation/AirSourceHeatPumpsSection.js
import React from 'react';

const AirSourceHeatPumpsSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      airSourceHeatPumps: {
        ...prev.airSourceHeatPumps,
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      airSourceHeatPumps: {
        ...prev.airSourceHeatPumps,
        [field]: checked,
      },
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 mb-10">
      {/* Premium Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
          ❄️
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">Air Source Heat Pumps</h2>
          <p className="text-slate-500 text-lg -mt-1">Additional technical specifications</p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        
        {/* No. of plots */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">
            No. of plots with air source heat pump
          </label>
          <input
            value={formData.airSourceHeatPumps?.numPlots || ''}
            onChange={(e) => handleChange('numPlots', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 12"
          />
        </div>

        {/* Plot numbers */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Plot numbers</label>
          <input
            value={formData.airSourceHeatPumps?.plotNumbers || ''}
            onChange={(e) => handleChange('plotNumbers', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 1, 3, 5-8"
          />
        </div>

        {/* Data sheet provided – Nice checkbox */}
        <div className="md:col-span-2 flex items-start gap-4 pt-2">
          <input
            type="checkbox"
            checked={formData.airSourceHeatPumps?.dataSheetProvided || false}
            onChange={(e) => handleCheckboxChange('dataSheetProvided', e.target.checked)}
            className="mt-1.5 h-6 w-6 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2 cursor-pointer"
          />
          <div>
            <label className="block text-slate-700 font-semibold text-lg cursor-pointer select-none">
              Data sheet provided
            </label>
            <p className="text-sm text-slate-500">Manufacturer data sheet has been supplied</p>
          </div>
        </div>

        {/* Pump Model */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Pump Model</label>
          <input
            value={formData.airSourceHeatPumps?.pumpModel || ''}
            onChange={(e) => handleChange('pumpModel', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. Daikin Altherma 3"
          />
        </div>

        {/* ASHP load allowance per plot */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">
            ASHP load allowance per plot
          </label>
          <input
            value={formData.airSourceHeatPumps?.ashpLoadAllowancePerPlot || ''}
            onChange={(e) => handleChange('ashpLoadAllowancePerPlot', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 3.5 kW"
          />
        </div>

      </div>
    </div>
  );
};

export default AirSourceHeatPumpsSection;