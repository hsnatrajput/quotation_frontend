// src/components/admin/quotation/tender/MiscellaneousSection.js
import React from 'react';

const MiscellaneousSection = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'mpanNumbers', label: 'Request and forwarding of MPAN numbers (electric)' },
    { key: 'onsiteDuctingPlan', label: 'Onsite ducting plan available after acceptance – inclusive of drainage consideration. Offered on request' },
    { key: 'testingCommissioning', label: 'Testing and commissioning of all installed equipment' },
    { key: 'asLaidRecords', label: 'As laid records for installed networks – constantly updated' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">MISCELLANEOUS</h3>

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
              const current = inclusions.miscellaneous?.[item.key] || {
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
                      name={`status-miscellaneous-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('miscellaneous', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-miscellaneous-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('miscellaneous', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-miscellaneous-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('miscellaneous', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('miscellaneous', item.key, e.target.value)}
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

export default MiscellaneousSection;
