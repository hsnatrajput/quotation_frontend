// src/components/admin/quotation/LegalDocumentation.js
import React from 'react';

const LegalDocumentation = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      legalDocumentation: {
        ...prev.legalDocumentation,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Legal Documentation</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Customer contact for general queries
          </label>
          <input
            value={formData.legalDocumentation.customerContact || ''}
            onChange={(e) => handleChange('customerContact', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Landowner Details</label>
          <input
            value={formData.legalDocumentation.landownerDetails || ''}
            onChange={(e) => handleChange('landownerDetails', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Solicitors acting for landowner
          </label>
          <input
            value={formData.legalDocumentation.solicitorsActing || ''}
            onChange={(e) => handleChange('solicitorsActing', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentation;