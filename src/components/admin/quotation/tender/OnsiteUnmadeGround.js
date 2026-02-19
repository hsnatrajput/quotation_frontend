// src/components/admin/quotation/tender/OnsiteUnmadeGround.js
import React from 'react';

const OnsiteUnmadeGround = ({ inclusions, onChange }) => {
  const items = [
    {
      key: 'excavationMainsTrenches',
      label: 'Onsite excavation of mains trenches',
      comment: '',
    },
    {
      key: 'backfillMainsTrenches',
      label: 'Backfill of mains trenches',
      comment: '',
    },
    {
      key: 'installationMains',
      label: 'Installation of mains',
      comment: '',
    },
    {
      key: 'mainsTape',
      label: 'Provision and installation of mains tape',
      comment: '',
    },
    {
      key: 'fineFillSand',
      label: 'Provision of the fine fill for mains (sand surround)',
      comment: '',
    },
    {
      key: 'excavationServiceJoints',
      label: 'Excavation of service connections/joint bays',
      comment: '',
    },
    {
      key: 'backfillServiceJoints',
      label: 'Backfilling of service connections/joint bays',
      comment: '',
    },
    {
      key: 'sandServiceConnections',
      label: 'Provision of sand for service connections',
      comment: '',
    },
    {
      key: 'beddingMaterials',
      label: 'Installation of bedding materials',
      comment: '',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">
        ONSITE WORKS (UNMADE GROUND)
      </h3>

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
                    checked={inclusions.onsiteUnmade[item.key] || false}
                    onChange={(e) => onChange('onsiteUnmade', item.key, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                </td>
                <td className="p-4 text-center border-r">
                  <input
                    type="checkbox"
                    disabled
                    className="h-5 w-5 opacity-50 cursor-not-allowed"
                  />
                </td>
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    disabled
                    className="h-5 w-5 opacity-50 cursor-not-allowed"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnsiteUnmadeGround;