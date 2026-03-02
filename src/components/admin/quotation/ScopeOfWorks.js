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
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 mb-10">
      {/* Premium Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
          📋
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">Scope of Works</h2>
          <p className="text-slate-500 text-lg -mt-1">Define the project foundation</p>
        </div>
      </div>

      <p className="text-slate-600 text-xl mb-10 max-w-2xl">
        This quotation has been prepared using the following drawing:
      </p>

      {/* Clean modern form grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        
        {/* Drawing Reference - Full width */}
        <div className="md:col-span-2">
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Drawing Reference</label>
          <input
            value={formData.scopeTable.drawing || ''}
            onChange={(e) => handleScopeChange('drawing', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="Enter drawing reference (e.g. DWG-2025-001)"
          />
        </div>

        {/* All other fields */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Total Plots</label>
          <input
            value={formData.scopeTable.totalPlots || ''}
            onChange={(e) => handleScopeChange('totalPlots', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 24"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Future Phase Allowance</label>
          <input
            value={formData.scopeTable.futurePhaseAllowance || ''}
            onChange={(e) => handleScopeChange('futurePhaseAllowance', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 10 plots"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Total Load Allowance</label>
          <input
            value={formData.scopeTable.totalLoadAllowance || ''}
            onChange={(e) => handleScopeChange('totalLoadAllowance', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 450 kVA"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Heating Type</label>
          <input
            value={formData.scopeTable.heatingType || ''}
            onChange={(e) => handleScopeChange('heatingType', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. Air Source Heat Pump"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Plot Connections</label>
          <input
            value={formData.scopeTable.plotConnections || ''}
            onChange={(e) => handleScopeChange('plotConnections', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 1 per plot"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Meters</label>
          <input
            value={formData.scopeTable.meters || ''}
            onChange={(e) => handleScopeChange('meters', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. Smart Meter - 1 phase"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Electric Connection Voltage</label>
          <input
            value={formData.scopeTable.electricVoltage || ''}
            onChange={(e) => handleScopeChange('electricVoltage', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 400V 3-Phase"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Water Main Type</label>
          <input
            value={formData.scopeTable.waterMainType || ''}
            onChange={(e) => handleScopeChange('waterMainType', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. PE 90mm"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Water / Waste Water Sustainability</label>
          <input
            value={formData.scopeTable.waterSustainability || ''}
            onChange={(e) => handleScopeChange('waterSustainability', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. Rainwater harvesting ready"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-slate-700 font-semibold mb-3 text-lg">Mains Connections / Piece Up (Commissioning Visits)</label>
          <input
            value={formData.scopeTable.mainsConnections || ''}
            onChange={(e) => handleScopeChange('mainsConnections', e.target.value)}
            className="w-full p-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white transition-all text-slate-900 placeholder-slate-400 text-lg shadow-sm"
            placeholder="e.g. 4 commissioning visits included"
          />
        </div>

      </div>
    </div>
  );
};

export default ScopeOfWorks;