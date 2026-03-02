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
    <>
      <p className="text-stone-600 mb-8">This quotation has been prepared using the following drawing: <strong>{data.drawing || "—"}</strong></p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-6 text-left">Description</th>
              <th className="p-6 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-stone-50">
                <td className="p-6 font-medium border-r border-stone-100">{row.desc}</td>
                <td className="p-6 text-stone-700">{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuotationScopeTable;