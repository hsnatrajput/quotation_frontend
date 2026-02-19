// src/components/admin/quotation/ConstructionAssumptions.js
import React from 'react';

const ConstructionAssumptions = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      constructionAssumptions: {
        ...prev.constructionAssumptions,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">CONSTRUCTION ASSUMPTIONS</h2> */}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Site specific assumptions</label>
          <textarea
            value={formData.constructionAssumptions.siteSpecific || ''}
            onChange={(e) => handleChange('siteSpecific', e.target.value)}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            General terms and conditions
          </label>
          <textarea
            value={formData.constructionAssumptions.generalTerms || ''}
            onChange={(e) => handleChange('generalTerms', e.target.value)}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ConstructionAssumptions;