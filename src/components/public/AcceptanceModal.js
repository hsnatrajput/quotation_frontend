// src/components/public/AcceptanceModal.js
import React from 'react';

const AcceptanceModal = ({ isOpen, onClose, quotation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Acceptance Form</h2>
          <button onClick={onClose} className="text-3xl font-bold text-gray-600 hover:text-gray-900">×</button>
        </div>

        <div className="space-y-4 mb-8 text-lg">
          <p><strong>Our Quotation Reference:</strong> {quotation.proposalId}</p>
          <p><strong>Quotation Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Development Address:</strong> {quotation.siteAddress}</p>
          <p><strong>Scope:</strong> {quotation.jobType?.join(' + ') || 'General'}</p>
          <p><strong>Customer Name:</strong> {quotation.customerName}</p>
          <p><strong>Customer Address:</strong> [Add if available]</p>
          <p className="text-xl font-bold mt-6">
            Payment Total: £{quotation.totalAmount?.toLocaleString() || '0.00'} Inc {quotation.vatRate}% VAT
          </p>
        </div>

        <p className="mb-6 text-gray-700">
          I/We accept the Utility Infrastructure Quotation referenced above, and hereby agree to the terms and conditions.
        </p>

        <div className="space-y-4 mb-8">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Signature (type name)" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Position Held" className="w-full p-3 border rounded-lg" />
          <input type="tel" placeholder="Contact Numbers" className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="date" placeholder="Anticipated start date" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Site contact" className="w-full p-3 border rounded-lg" />
        </div>

        <p className="text-sm text-gray-600 mb-6 italic">
          We advise that you do not complete any preparatory work on site until AU have provided approved design drawings, site construction pack and developer guidance document and a site pre-start meeting has taken place.
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Accept & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceModal;