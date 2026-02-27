// src/components/admin/quotation/tender/OnsiteUnmadeGround.js
import React from 'react';

const OnsiteUnmadeGround = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'excavationMainsTrenches', label: 'Onsite excavation of mains trenches' },
    { key: 'backfillMainsTrenches', label: 'Backfill of mains trenches' },
    { key: 'installationMains', label: 'Installation of mains' },
    { key: 'mainsTape', label: 'Provision and installation of mains tape' },
    { key: 'fineFillSand', label: 'Provision of the fine fill for mains (sand surround)' },
    { key: 'excavationServiceJoints', label: 'Excavation of service connections/joint bays' },
    { key: 'backfillServiceJoints', label: 'Backfilling of service connections/joint bays' },
    { key: 'sandServiceConnections', label: 'Provision of sand for service connections' },
    { key: 'beddingMaterials', label: 'Installation of bedding materials' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">ONSITE WORKS (UNMADE GROUND)</h3>

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
              const current = inclusions.onsiteUnmade?.[item.key] || {
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
                      name={`status-onsiteUnmade-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('onsiteUnmade', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-onsiteUnmade-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('onsiteUnmade', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-onsiteUnmade-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('onsiteUnmade', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('onsiteUnmade', item.key, e.target.value)}
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

export default OnsiteUnmadeGround;