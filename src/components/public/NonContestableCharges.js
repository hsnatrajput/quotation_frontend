// src/components/public/NonContestableCharges.js
import React from 'react';

const NonContestableCharges = ({ data }) => {
  if (!data) return null;

  return (
    <section id="non-contestable" className="py-12 bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">NON-CONTESTABLE NETWORK CHARGES</h2>
        <p className="text-center text-gray-600 mb-8">
          The below charges are included in our tender offer. These are paid by Air Utilities directly to the network operator.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-5 text-left">Description of non-contestable charges</th>
                <th className="p-5 text-right">Total Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-5">Electric POC cost</td>
                <td className="p-5 text-right">£{data.electricPOC || '—'}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-5">Water POC – incumbent connection charges</td>
                <td className="p-5 text-right">£{data.waterPOC || '—'}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-5">Water infrastructure fees</td>
                <td className="p-5 text-right">£{data.waterInfra || '—'}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default NonContestableCharges;