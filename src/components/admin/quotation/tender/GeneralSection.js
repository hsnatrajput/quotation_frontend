// src/components/admin/quotation/tender/GeneralSection.js
import React from 'react';

const GeneralSection = ({ inclusions, onChange }) => {
  const items = [
    {
      key: 'tempWaterCompound',
      label: 'Temporary water supply (compound/sales etc)',
      comment: '',
    },
    {
      key: 'tempElectricCompound',
      label: 'Temporary electric supply (1ph or 3ph, compound /sales etc)',
      comment: '',
    },
    {
      key: 'onsiteMainsExcavation',
      label: 'Onsite mains excavation (including provisions)',
      comment: '',
    },
    {
      key: 'onsiteServiceBays',
      label: 'Onsite service connection bays',
      comment: '',
    },
    {
      key: 'layOnsiteMains',
      label: 'Lay only onsite mains, including sand and tape',
      comment: '',
    },
    {
      key: 'siteEntranceDiversions',
      label: 'Site entrance diversions',
      comment: '',
    },
    {
      key: 'trafficManagementCosts',
      label: 'Traffic management costs',
      comment: '',
    },
    {
      key: 'streetworksNotices',
      label: 'Streetworks notices for all off site works',
      comment: '',
    },
    {
      key: 'utilityInfraDesign',
      label: 'Utility infrastructure design',
      comment: '',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">GENERAL</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold border-b border-r">Activity</th>
              <th className="p-4 text-left font-semibold border-b border-r">Comments</th>
              <th className="p-4 text-center font-semibold border-b border-r w-24">
                Included (By AU)
              </th>
              <th className="p-4 text-center font-semibold border-b border-r w-24">
                Excluded (By others)
              </th>
              <th className="p-4 text-center font-semibold border-b w-24">N/A</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-b hover:bg-gray-50">
                <td className="p-4 border-r">{item.label}</td>
                <td className="p-4 border-r text-gray-600 italic text-sm">
                  {item.comment || '—'}
                </td>
                <td className="p-4 text-center border-r">
                  <input
                    type="checkbox"
                    checked={inclusions.general[item.key] || false}
                    onChange={(e) => onChange('general', item.key, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                </td>
                <td className="p-4 text-center border-r">
                  <input type="checkbox" disabled className="h-5 w-5 opacity-50 cursor-not-allowed" />
                </td>
                <td className="p-4 text-center">
                  <input type="checkbox" disabled className="h-5 w-5 opacity-50 cursor-not-allowed" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralSection;