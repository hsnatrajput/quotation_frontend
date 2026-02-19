// src/components/admin/quotation/ServicesItems.js
import React from 'react';

const ServicesItems = ({ formData, setFormData }) => {
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'unitPrice' ? Number(value) || 0 : value;
    newItems[index].totalPrice = (newItems[index].quantity || 1) * (newItems[index].unitPrice || 0);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
    }));
  };

  return (
    <div className="border-b pb-8">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-2xl font-bold">Services / Items</h2> */}
        <button
          type="button"
          onClick={addItem}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          + Add Item
        </button>
      </div>

      {formData.items.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 mb-6 border-b pb-4">
          <input
            placeholder="Service name"
            value={item.serviceName || ''}
            onChange={(e) => handleItemChange(index, 'serviceName', e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Unit Price (£)"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
            className="w-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesItems;