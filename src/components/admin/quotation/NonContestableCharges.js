// src/components/admin/quotation/NonContestableCharges.js
import React from 'react';

const NonContestableCharges = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      nonContestableCharges: {
        ...prev.nonContestableCharges,
        [field]: value,
      },
    }));
  };

  const charges = [
    { key: 'electricPOC', label: 'Electric POC cost' },
    { key: 'waterPOCIncumbent', label: 'Water POC – incumbent connection charges' },
    { key: 'waterInfraFees', label: 'Water infrastructure fees' },
    { key: 'wasteWaterInfraFees', label: 'Waste water infrastructure fees' },
    { key: 'environmentalComponent', label: 'Environmental component' },
    { key: 'meterAdminCharges', label: 'Meter administration charges' },
    { key: 'uuApprovalFee', label: 'United Utilities approval fee' },
    { key: 'councilCharges', label: 'Council charges' },
  ];

  return (
    <div className="border-b pb-10">
      {/* <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">
        NON-CONTESTABLE NETWORK CHARGES
      </h2> */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-5 text-left font-semibold border-b border-r">
                Description
              </th>
              <th className="p-5 text-center font-semibold border-b w-40">
                Value (£)
              </th>
            </tr>
          </thead>
          <tbody>
            {charges.map((item) => (
              <tr key={item.key} className="border-b hover:bg-gray-50">
                <td className="p-5 border-r font-medium text-gray-800">
                  {item.label}
                </td>
                <td className="p-5 text-center">
                  <input
                    type="number"
                    value={formData.nonContestableCharges[item.key] || ''}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 mt-6 italic text-center">
        These are pass-through costs applicable to all ICPs and should align with network operator charges.
      </p>
    </div>
  );
};

export default NonContestableCharges;