// src/components/admin/quotation/tender/GeneralSection.js
import React from 'react';

const GeneralSection = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'tempWaterCompound', label: 'Temporary water supply (compound/sales etc)' },
    { key: 'tempElectricCompound', label: 'Temporary electric supply (1ph or 3ph, compound /sales etc)' },
    { key: 'onsiteMainsExcavation', label: 'Onsite mains excavation (including provisions)' },
    { key: 'onsiteServiceBays', label: 'Onsite service connection bays' },
    { key: 'layOnsiteMains', label: 'Lay only onsite mains, including sand and tape' },
    { key: 'siteEntranceDiversions', label: 'Site entrance diversions' },
    { key: 'trafficManagementCosts', label: 'Traffic management costs' },
    { key: 'streetworksNotices', label: 'Streetworks notices for all off site works' },
    { key: 'utilityInfraDesign', label: 'Utility infrastructure design' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">GENERAL</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold border-b border-r">Activity</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">Included (By AU)</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">Excluded (By others)</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">N/A</th>
              <th className="p-4 text-left font-semibold border-b">Comment (optional)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const current = inclusions.general?.[item.key] || {
                included: false,
                excluded: false,
                na: false,
                comment: '',
              };

              return (
                <tr key={item.key} className="border-b hover:bg-gray-50">
                  <td className="p-4 border-r font-medium">{item.label}</td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-general-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('general', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-general-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('general', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-general-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('general', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('general', item.key, e.target.value)}
                      className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Add optional comment..."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralSection;