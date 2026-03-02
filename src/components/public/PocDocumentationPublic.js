// src/components/public/PocDocumentationPublic.js
import React from 'react';

const PocDocumentationPublic = ({ data, inViewer = false }) => {
  if (!data) return null;

  const inner = (
    <>
      <p className="text-center text-gray-600 mb-8">Full details of offsite and POC works</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-center">Document reference</th>
              <th className="p-4 text-center">Expiry date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-4">Water POC</td><td className="p-4 text-center">{data.waterPocRef || '—'}</td><td className="p-4 text-center">{data.waterPocExpiry || '—'}</td></tr>
            <tr className="border-b"><td className="p-4">Mains electric POC</td><td className="p-4 text-center">{data.mainsElectricPocRef || '—'}</td><td className="p-4 text-center">{data.mainsElectricPocExpiry || '—'}</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );

  if (inViewer) return inner;

  return (
    <section id="poc-docs" className="py-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">POINT OF CONNECTION DOCUMENTATION</h2>
        {inner}
      </div>
    </section>
  );
};

export default PocDocumentationPublic;