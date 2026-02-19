// src/components/admin/quotation/tender/MiscellaneousSection.js
import React from 'react';

const MiscellaneousSection = ({ inclusions, onChange }) => {
  const items = [
    {
      key: 'mpanNumbers',
      label: 'Request and forwarding of MPAN numbers (electric)',
      comment: 'Electric meter management is often excluded by others',
    },
    {
      key: 'onsiteDuctingPlan',
      label: 'Onsite ducting plan available after acceptance – inclusive of drainage consideration. Offered on request',
      comment: '',
    },
    {
      key: 'testingCommissioning',
      label: 'Testing and commissioning of all installed equipment',
      comment: '',
    },
    {
      key: 'asLaidRecords',
      label: 'As laid records for installed networks – constantly updated',
      comment: '',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">MISCELLANEOUS</h3>

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
                    checked={inclusions.miscellaneous[item.key] || false}
                    onChange={(e) => onChange('miscellaneous', item.key, e.target.checked)}
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

export default MiscellaneousSection;