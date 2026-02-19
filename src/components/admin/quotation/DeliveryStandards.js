// src/components/admin/quotation/DeliveryStandards.js
import React from 'react';

const DeliveryStandards = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      deliveryStandards: {
        ...prev.deliveryStandards,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">DELIVERY STANDARDS</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Service Call off (via call off sheet)
          </label>
          <input
            value={formData.deliveryStandards.serviceCallOff || ''}
            onChange={(e) => handleChange('serviceCallOff', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Mains call off (via call off sheet)
          </label>
          <input
            value={formData.deliveryStandards.mainsCallOff || ''}
            onChange={(e) => handleChange('mainsCallOff', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Mobilisation & Design Approval
          </label>
          <input
            value={formData.deliveryStandards.mobilisationDesignApproval || ''}
            onChange={(e) => handleChange('mobilisationDesignApproval', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Draft Duct Layouts</label>
          <input
            value={formData.deliveryStandards.draftDuctLayouts || ''}
            onChange={(e) => handleChange('draftDuctLayouts', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryStandards;