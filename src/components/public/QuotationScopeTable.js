// src/components/public/QuotationScopeTable.js
import React from 'react';

const QuotationScopeTable = ({ data }) => {
  if (!data) return null;

  const rows = [
    { desc: "Total Plots", detail: data.totalPlots || "—" },
    { desc: "Future Phase allowance", detail: data.futurePhaseAllowance || "—" },
    { desc: "Total Load allowance", detail: data.totalLoadAllowance || "—" },
    { desc: "Heating type", detail: data.heatingType || "—" },
    { desc: "Plot connections", detail: data.plotConnections || "—" },
    { desc: "Meters", detail: data.meters || "—" },
    { desc: "Electric connection voltage", detail: data.electricVoltage || "—" },
    { desc: "Water main type", detail: data.waterMainType || "—" },
    { desc: "Water/Waste water sustainability", detail: data.waterSustainability || "—" },
    { desc: "Mains connections/Piece up (commissioning visits)", detail: data.mainsConnections || "—" },
  ];

  return (
    <section id="scope" className="py-16 bg-white border-t border-b">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">SCOPE OF WORKS</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          This quotation has been prepared using the following drawing: {data.drawing || "—"}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-5 text-left font-semibold">Description</th>
                <th className="p-5 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-5 font-medium text-gray-800 border-r">{row.desc}</td>
                  <td className="p-5 text-gray-700">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default QuotationScopeTable;