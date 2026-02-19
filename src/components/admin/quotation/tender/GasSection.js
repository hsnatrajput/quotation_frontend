// src/components/admin/quotation/tender/GasSection.js
import React from 'react';

const GasSection = ({ inclusions, onChange }) => {
  const items = [
    { key: 'gasMeterBoxesWallMounted', label: 'Gas meter boxes (WALL MOUNTED)', comment: '' },
    { key: 'gasServicePipe', label: 'Gas service pipe', comment: '' },
    { key: 'gasMainPipe', label: 'Gas main pipe', comment: '' },
    { key: 'gasMetersSmartDumb', label: 'Gas meters (smart or dumb)', comment: '' },
    { key: 'gasTapeOnsite', label: 'Gas marker tape for on-site pipes (mains only)', comment: '' },
    { key: 'gasTapeOffsite', label: 'Gas marker tape for off-site pipes (mains only)', comment: '' },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 text-blue-800">GAS</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold border">Activity</th>
              <th className="p-4 text-left font-semibold border">Comments</th>
              <th className="p-4 text-center font-semibold border w-24">Included (By AU)</th>
              <th className="p-4 text-center font-semibold border w-24">Excluded (By others)</th>
              <th className="p-4 text-center font-semibold border w-24">N/A</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.key} className="border-b hover:bg-gray-50">
                <td className="p-4 border-r">{item.label}</td>
                <td className="p-4 border-r text-gray-600 italic">{item.comment}</td>
                <td className="p-4 text-center border-r">
                  <input
                    type="checkbox"
                    checked={inclusions.gas[item.key]}
                    onChange={e => onChange('gas', item.key, e.target.checked)}
                    className="h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="p-4 text-center border-r">
                  <input type="checkbox" disabled className="h-5 w-5" />
                </td>
                <td className="p-4 text-center">
                  <input type="checkbox" disabled className="h-5 w-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GasSection;