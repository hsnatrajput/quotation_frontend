// src/pages/admin/QuotationCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuotationCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    jobType: [],                  // multi-select array
    siteAddress: '',
    projectTitle: '',
    projectDescription: '',
    items: [{ serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
    subtotal: 0,
    vatRate: 20,
    vatAmount: 0,
    totalAmount: 0,
    validUntil: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobTypeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prev) => ({ ...prev, jobType: selected }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'unitPrice' ? Number(value) || 0 : value;

    // Auto-calculate totalPrice for this item
    newItems[index].totalPrice = (newItems[index].quantity || 1) * (newItems[index].unitPrice || 0);

    setFormData((prev) => ({ ...prev, items: newItems }));

    // Recalculate overall totals
    const subtotal = newItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const vatAmount = subtotal * (formData.vatRate / 100);
    const totalAmount = subtotal + vatAmount;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      vatAmount,
      totalAmount,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (formData.jobType.length === 0) {
      setError('Please select at least one job type');
      return;
    }
    if (formData.items.length === 0 || formData.items.some(item => !item.serviceName || item.unitPrice <= 0)) {
      setError('Please add at least one valid item with name and unit price > 0');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      // Prepare clean payload matching backend schema
      const payload = {
        ...formData,
        items: formData.items.map(item => ({
          serviceName: item.serviceName,
          unitPrice: Number(item.unitPrice),
          quantity: Number(item.quantity) || 1,
          totalPrice: Number(item.totalPrice),
        })),
        subtotal: Number(formData.subtotal),
        vatAmount: Number(formData.vatAmount),
        totalAmount: Number(formData.totalAmount),
      };

      await axios.post('http://localhost:5000/api/quotations', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('New quotation created successfully!');
      navigate('/admin/quotations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quotation. Check required fields.');
      console.error('Create error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Create New Quotation
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Customer Name *</label>
              <input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Customer Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Job Type (multi-select) + Site Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Job Type(s) *</label>
              <select
                multiple
                value={formData.jobType}
                onChange={handleJobTypeChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white h-32"
                required
              >
                <option value="Electric">Electric</option>
                <option value="Gas">Gas</option>
                <option value="Water">Water</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Site Address *</label>
              <input
                name="siteAddress"
                value={formData.siteAddress}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Full site/job location address"
                required
              />
            </div>
          </div>

          {/* Project Title & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Project Title</label>
              <input
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Customer Phone</label>
              <input
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Services / Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
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
                  className="flex-1 p-3 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Unit Price (£)"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  className="w-32 p-3 border rounded-lg"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            ))}
          </div>

          {/* Auto-calculated totals – read-only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
            <div>
              <label className="block text-gray-700 mb-1">Subtotal</label>
              <input
                value={formData.subtotal.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">VAT ({formData.vatRate}%)</label>
              <input
                value={formData.vatAmount.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold">Total</label>
              <input
                value={formData.totalAmount.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100 text-blue-700 font-bold text-xl"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-12">
            <button
              type="button"
              onClick={() => navigate('/admin/quotations')}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.jobType.length === 0}
              className={`px-10 py-3 rounded-lg text-white font-medium transition ${
                loading || formData.jobType.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Creating...' : 'Create Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationCreate;