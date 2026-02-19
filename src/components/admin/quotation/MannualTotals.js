// src/components/admin/quotation/ManualTotals.js
import React from 'react';

const ManualTotals = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Totals</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-8 rounded-xl">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Subtotal (£) *</label>
          <input
            type="number"
            name="subtotal"
            value={formData.subtotal}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            VAT Amount (£) * (VAT {formData.vatRate}%)
          </label>
          <input
            type="number"
            name="vatAmount"
            value={formData.vatAmount}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-bold text-xl">Total Amount (£) *</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 font-bold text-xl"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ManualTotals;