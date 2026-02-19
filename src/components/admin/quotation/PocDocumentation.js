// src/components/admin/quotation/PocDocumentation.js
import React from 'react';

const PocDocumentation = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      pocDocumentation: {
        ...prev.pocDocumentation,
        [field]: value,
      },
    }));
  };

  return (
    <div className="border-b pb-10">
      {/* <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">
        POINT OF CONNECTION DOCUMENTATION
      </h2> */}

      <p className="text-gray-700 mb-8 text-center">
        Full details of offsite and POC works are in the below table
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-5 text-left font-semibold border-b border-r">Document</th>
              <th className="p-5 text-center font-semibold border-b border-r">Document reference</th>
              <th className="p-5 text-center font-semibold border-b">Expiry date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-5 border-r font-medium">Water POC</td>
              <td className="p-5 text-center border-r">
                <input
                  value={formData.pocDocumentation?.waterPocRef || ''}
                  onChange={(e) => handleChange('waterPocRef', e.target.value)}
                  className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                  placeholder="xxxx"
                />
              </td>
              <td className="p-5 text-center">
                <input
                  value={formData.pocDocumentation?.waterPocExpiry || ''}
                  onChange={(e) => handleChange('waterPocExpiry', e.target.value)}
                  className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                  placeholder="xxxx"
                />
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-5 border-r font-medium">Mains electric POC</td>
              <td className="p-5 text-center border-r">
                <input
                  value={formData.pocDocumentation?.mainsElectricPocRef || ''}
                  onChange={(e) => handleChange('mainsElectricPocRef', e.target.value)}
                  className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                  placeholder="xxxx"
                />
              </td>
              <td className="p-5 text-center">
                <input
                  value={formData.pocDocumentation?.mainsElectricPocExpiry || ''}
                  onChange={(e) => handleChange('mainsElectricPocExpiry', e.target.value)}
                  className="w-full p-3 border rounded-lg text-center focus:ring-2 focus:ring-blue-500"
                  placeholder="xxxx"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PocDocumentation;