// src/components/admin/quotation/tender/WaterSection.js
import React from 'react';

const WaterSection = ({ inclusions, onChange }) => {
  const items = [
    {
      key: 'metersProvision',
      label: 'Provision and installation of meters',
      comment: '',
    },
    {
      key: 'tempWaterNewMains',
      label: 'Temporary water connections (on site off new mains)',
      comment: '',
    },
    {
      key: 'tempWaterExistingMains',
      label: 'Temporary water connection (off site off existing mains)',
      comment: '',
    },
    {
      key: 'waterInfraCharges',
      label: 'Water infrastructure charges (2025-2026 rate per plot)',
      comment: '',
    },
    {
      key: 'waterConnectionCharges',
      label: 'Water connection charges – connection to the offsite main',
      comment: '',
    },
    {
      key: 'boundaryWaterBox',
      label: 'Boundary water box provision',
      comment: '',
    },
    {
      key: 'fireServiceHydrant',
      label: 'Fire service hydrant',
      comment: '',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">WATER</h3>

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
                    checked={inclusions.water[item.key] || false}
                    onChange={(e) => onChange('water', item.key, e.target.checked)}
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

export default WaterSection;