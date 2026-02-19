// src/components/admin/quotation/Responsibilities.js
import React from 'react';

const Responsibilities = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: {
        ...prev.responsibilities,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Responsibilities</h2> */}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Customer Responsibilities</label>
          <textarea
            value={formData.responsibilities.customer || ''}
            onChange={(e) => handleChange('customer', e.target.value)}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">AU Responsibilities</label>
          <textarea
            value={formData.responsibilities.au || ''}
            onChange={(e) => handleChange('au', e.target.value)}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Responsibilities;