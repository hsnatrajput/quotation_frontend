// src/pages/admin/QuotationEdit.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuotationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    jobType: [],                  // array for multi-select
    siteAddress: '',
    projectTitle: '',
    projectDescription: '',
    items: [{ name: '', price: 0 }],
    subtotal: 0,
    vatRate: 20,
    vatAmount: 0,
    totalAmount: 0,
    validUntil: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/quotations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;
        setFormData({
          customerName: data.customerName || '',
          customerEmail: data.customerEmail || '',
          customerPhone: data.customerPhone || '',
          jobType: data.jobType || [],           // array from DB
          siteAddress: data.siteAddress || '',
          projectTitle: data.projectTitle || '',
          projectDescription: data.projectDescription || '',
          items: data.items || [{ name: '', price: 0 }],
          subtotal: data.subtotal || 0,
          vatRate: data.vatRate || 20,
          vatAmount: data.vatAmount || 0,
          totalAmount: data.totalAmount || 0,
          validUntil: data.validUntil || '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quotation or unauthorized.');
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [id, navigate]);

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
    newItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: newItems }));

    // Recalculate totals
    const subtotal = newItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const vatAmount = subtotal * (formData.vatRate / 100);
    setFormData((prev) => ({
      ...prev,
      subtotal,
      vatAmount,
      totalAmount: subtotal + vatAmount,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: '', price: 0 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate jobType
    if (formData.jobType.length === 0) {
      setError('Please select at least one job type');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/quotations/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Quotation updated successfully!');
      navigate('/admin/quotations');
    } catch (err) {
      alert('Failed to update quotation.');
    }
  };

  if (loading) return <div className="p-10 text-center text-xl">Loading quotation...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-xl">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Edit Quotation
        </h1>

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
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="flex-1 p-3 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Price (£)"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  className="w-32 p-3 border rounded-lg"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            ))}
          </div>

          {/* Totals (read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
            <div>
              <label className="block text-gray-700 mb-1">Subtotal</label>
              <input
                value={formData.subtotal.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">VAT ({formData.vatRate}%)</label>
              <input
                value={formData.vatAmount.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold">Total</label>
              <input
                value={formData.totalAmount.toFixed(2)}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100 font-bold"
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-4 mt-12">
            <button
              type="button"
              onClick={() => navigate('/admin/quotations')}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationEdit;