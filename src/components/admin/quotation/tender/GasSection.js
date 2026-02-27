// src/components/admin/quotation/tender/GasSection.js
import React from 'react';

const GasSection = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'gasMeterBoxesWallMounted', label: 'Gas meter boxes (WALL MOUNTED)' },
    { key: 'gasServicePipe', label: 'Gas service pipe' },
    { key: 'gasMainPipe', label: 'Gas main pipe' },
    { key: 'gasMetersSmartDumb', label: 'Gas meters (smart or dumb)' },
    { key: 'gasTapeOnsite', label: 'Gas marker tape for on-site pipes (mains only)' },
    { key: 'gasTapeOffsite', label: 'Gas marker tape for off-site pipes (mains only)' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">GAS</h3>

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
              const current = inclusions.gas?.[item.key] || {
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
                      name={`status-gas-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('gas', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-gas-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('gas', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-gas-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('gas', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('gas', item.key, e.target.value)}
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

export default GasSection;