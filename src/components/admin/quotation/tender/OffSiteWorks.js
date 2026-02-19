// src/components/admin/quotation/tender/OffsiteWorks.js
import React from 'react';

const OffsiteWorks = ({ inclusions, onChange }) => {
  const items = [
    { key: 'pocWorks', label: 'Point of connection works including non-contestable costs', comment: '' },
    { key: 'excavationMains', label: 'Offsite excavation, mains installation and reinstatement (all-inclusive as standard)', comment: '' },
    { key: 'trafficManagement', label: 'Traffic Management', comment: '' },
    { key: 'councilNoticeFees', label: 'Council notice fees', comment: '' },
    { key: 'reinforcementWorks', label: 'Reinforcement works', comment: '' },
    { key: 'diversionWorks', label: 'Diversion works', comment: '' },
    { key: 'wayleavesHeadsOfTerms', label: "3rd party wayleaves/heads of terms (known or unknown)", comment: '' },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 text-blue-800">OFFSITE WORKS</h3>
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
                    checked={inclusions.offsite[item.key]}
                    onChange={e => onChange('offsite', item.key, e.target.checked)}
                    className="h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="p-4 text-center border-r">
                  <input
                    type="checkbox"
                    checked={!inclusions.offsite[item.key] && inclusions.offsite[item.key] !== undefined}
                    onChange={() => {}} // excluded logic if needed
                    disabled
                    className="h-5 w-5"
                  />
                </td>
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={false} // N/A logic if needed
                    onChange={() => {}}
                    disabled
                    className="h-5 w-5"
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

export default OffsiteWorks;