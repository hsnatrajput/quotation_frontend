// src/components/admin/quotation/ScopeOfWorks.js
import React from 'react';

const ScopeOfWorks = ({ formData, setFormData }) => {
  const handleScopeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      scopeTable: {
        ...prev.scopeTable,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">SCOPE OF WORKS</h2> */}
      <p className="text-gray-600 mb-6">
        This quotation has been prepared using the following drawing:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <input
            value={formData.scopeTable.drawing}
            onChange={(e) => handleScopeChange('drawing', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter drawing reference"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Total Plots</label>
          <input
            value={formData.scopeTable.totalPlots}
            onChange={(e) => handleScopeChange('totalPlots', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Future Phase allowance</label>
          <input
            value={formData.scopeTable.futurePhaseAllowance}
            onChange={(e) => handleScopeChange('futurePhaseAllowance', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Total Load allowance</label>
          <input
            value={formData.scopeTable.totalLoadAllowance}
            onChange={(e) => handleScopeChange('totalLoadAllowance', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Heating type</label>
          <input
            value={formData.scopeTable.heatingType}
            onChange={(e) => handleScopeChange('heatingType', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Plot connections</label>
          <input
            value={formData.scopeTable.plotConnections}
            onChange={(e) => handleScopeChange('plotConnections', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Meters</label>
          <input
            value={formData.scopeTable.meters}
            onChange={(e) => handleScopeChange('meters', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Electric connection voltage</label>
          <input
            value={formData.scopeTable.electricVoltage}
            onChange={(e) => handleScopeChange('electricVoltage', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Water main type</label>
          <input
            value={formData.scopeTable.waterMainType}
            onChange={(e) => handleScopeChange('waterMainType', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Water/Waste water sustainability</label>
          <input
            value={formData.scopeTable.waterSustainability}
            onChange={(e) => handleScopeChange('waterSustainability', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Mains connections/Piece up (commissioning visits)</label>
          <input
            value={formData.scopeTable.mainsConnections}
            onChange={(e) => handleScopeChange('mainsConnections', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ScopeOfWorks;