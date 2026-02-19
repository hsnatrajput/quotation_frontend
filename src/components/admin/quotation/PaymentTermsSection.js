// src/components/admin/quotation/PaymentTermsSection.js
import React from 'react';

const PaymentTermsSection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Payment Terms</h2> */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Payment Terms</label>
        <textarea
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default PaymentTermsSection;