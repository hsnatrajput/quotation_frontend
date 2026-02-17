// src/components/public/DeliveryStandards.js
import React from 'react';

const DeliveryStandards = ({ data }) => {
  if (!data) return null;

  return (
    <section id="delivery" className="py-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">DELIVERY STANDARDS</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Timescale</th>
                <th className="p-4 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Service Call off (via call off sheet)</td>
                <td className="p-4 border-b">{data.serviceCallOff || '—'}</td>
                <td className="p-4 border-b">{data.serviceCallOffComment || '—'}</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Mains call off (via call off sheet)</td>
                <td className="p-4 border-b">{data.mainsCallOff || '—'}</td>
                <td className="p-4 border-b">{data.mainsCallOffComment || '—'}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DeliveryStandards;