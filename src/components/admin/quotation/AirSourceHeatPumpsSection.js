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
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Air Source Heat Pumps</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            No. of plots with air source heat pump
          </label>
          <input
            value={formData.airSourceHeatPumps.numPlots || ''}
            onChange={(e) => handleChange('numPlots', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Plot numbers</label>
          <input
            value={formData.airSourceHeatPumps.plotNumbers || ''}
            onChange={(e) => handleChange('plotNumbers', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Data sheet provided</label>
          <input
            type="checkbox"
            checked={formData.airSourceHeatPumps.dataSheetProvided || false}
            onChange={(e) => handleCheckboxChange('dataSheetProvided', e.target.checked)}
            className="h-5 w-5 text-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Pump Model</label>
          <input
            value={formData.airSourceHeatPumps.pumpModel || ''}
            onChange={(e) => handleChange('pumpModel', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ASHP load allowance per plot
          </label>
          <input
            value={formData.airSourceHeatPumps.ashpLoadAllowancePerPlot || ''}
            onChange={(e) => handleChange('ashpLoadAllowancePerPlot', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AirSourceHeatPumpsSection;