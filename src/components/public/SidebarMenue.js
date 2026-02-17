// src/components/public/SidebarMenu.js
import React from 'react';

const SidebarMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform translate-x-0 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-3xl font-bold text-gray-800">
            ×
          </button>
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Quotation Sections</h2>
          <ul className="space-y-4 text-lg">
            <li><a href="#summary" className="block hover:text-blue-600" onClick={onClose}>Quotation Summary</a></li>
            <li><a href="#scope" className="block hover:text-blue-600" onClick={onClose}>Scope of Works</a></li>
            <li><a href="#tender" className="block hover:text-blue-600" onClick={onClose}>Tender Inclusion Summary</a></li>
            <li><a href="#heat-pumps" className="block hover:text-blue-600" onClick={onClose}>Air Source Heat Pumps</a></li>
            <li><a href="#non-contestable" className="block hover:text-blue-600" onClick={onClose}>Non-Contestable Charges</a></li>
            <li><a href="#delivery" className="block hover:text-blue-600" onClick={onClose}>Delivery Standards</a></li>
            <li><a href="#assumptions" className="block hover:text-blue-600" onClick={onClose}>Construction Assumptions</a></li>
            <li><a href="#payment" className="block hover:text-blue-600" onClick={onClose}>Payment Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;