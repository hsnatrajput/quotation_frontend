// src/components/admin/quotation/tender/WaterSection.js
import React from 'react';

const WaterSection = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'metersProvision', label: 'Provision and installation of meters' },
    { key: 'tempWaterNewMains', label: 'Temporary water connections (on site off new mains)' },
    { key: 'tempWaterExistingMains', label: 'Temporary water connection (off site off existing mains)' },
    { key: 'waterInfraCharges', label: 'Water infrastructure charges (2025-2026 rate per plot)' },
    { key: 'waterConnectionCharges', label: 'Water connection charges – connection to the offsite main' },
    { key: 'boundaryWaterBox', label: 'Boundary water box provision' },
    { key: 'fireServiceHydrant', label: 'Fire service hydrant' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">WATER</h3>

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
              const current = inclusions.water?.[item.key] || {
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
                      name={`status-water-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('water', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-water-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('water', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-water-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('water', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('water', item.key, e.target.value)}
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

export default WaterSection;