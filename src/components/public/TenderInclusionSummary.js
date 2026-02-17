// src/components/public/TenderInclusionSummary.js
import React from 'react';

const TenderInclusionSummary = ({ data, jobTypes }) => {
  if (!data) return null;

  // Filter sections based on selected jobTypes
  const relevantSections = Object.keys(data).filter(section => 
    jobTypes.some(type => section.toLowerCase().includes(type.toLowerCase()))
  );

  return (
    <section id="tender" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">TENDER INCLUSION SUMMARY</h2>
        <p className="text-center mb-8 text-gray-600">Selected inclusions for your project</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Activity</th>
                <th className="p-4 text-left">Comments</th>
                <th className="p-4 text-center">Included (By AU)</th>
                <th className="p-4 text-center">Excluded (By others)</th>
                <th className="p-4 text-center">N/A</th>
              </tr>
            </thead>
            <tbody>
              {relevantSections.map(section => (
                data[section].map((row, idx) => (
                  <tr key={`${section}-${idx}`} className="border-b">
                    <td className="p-4">{row.activity}</td>
                    <td className="p-4">{row.comments}</td>
                    <td className="p-4 text-center">{row.included ? '✔' : ''}</td>
                    <td className="p-4 text-center">{row.excluded ? '✔' : ''}</td>
                    <td className="p-4 text-center">{row.na ? '✔' : ''}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TenderInclusionSummary;