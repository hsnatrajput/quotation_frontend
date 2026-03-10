// src/components/public/AcceptanceModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AcceptanceModal = ({ isOpen, onClose, quotation }) => {
  const [formData, setFormData] = useState({
    name: '',
    signature: '',
    positionHeld: '',
    contactNumbers: '',
    email: '',
    anticipatedStartDate: '',
    siteContact: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        proposalId: quotation.proposalId,
        quotationRef: quotation.quotationRef,
        ...formData,
      };

      const response = await axios.post('http://localhost:5000/api/acceptances', payload);

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error(response.data.message || 'Failed to submit');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit acceptance');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#fdfaf5] to-[#fff8f0] rounded-3xl shadow-2xl p-12 max-w-2xl w-full mx-6 text-center border border-[#5c4033]/10"
        >
          <div className="text-7xl mb-8">🎉</div>
          <h2 className="text-4xl font-serif font-bold text-[#5c4033] mb-6">
            Thank You!
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Your acceptance has been successfully submitted.<br />
            Our team will contact you shortly to proceed.
          </p>
          <button
            onClick={onClose}
            className="px-12 py-5 bg-[#5c4033] text-white rounded-xl hover:bg-[#4a3728] transition-all text-lg font-medium shadow-md"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-gradient-to-br from-[#fdfaf5] to-[#fff8f0] rounded-3xl shadow-2xl p-10 md:p-14 max-w-4xl w-full mx-6 border border-[#5c4033]/10 overflow-hidden"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5c4033] mb-3 text-center">
          Accept This Quotation
        </h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          Please provide your details to confirm acceptance.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Signature</label>
            <input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="Type your name as signature"
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Position Held</label>
            <input
              type="text"
              name="positionHeld"
              value={formData.positionHeld}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="e.g. Director / Project Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Contact Numbers</label>
            <input
              type="text"
              name="contactNumbers"
              value={formData.contactNumbers}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="e.g. 07444 437081"
            />
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="your.email@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Anticipated Start Date</label>
            <input
              type="date"
              name="anticipatedStartDate"
              value={formData.anticipatedStartDate}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all text-gray-700"
            />
          </div>

          {/* Row 4 - Full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#5c4033] mb-2">Site Contact</label>
            <input
              type="text"
              name="siteContact"
              value={formData.siteContact}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-[#5c4033]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c4033]/40 bg-white/80 backdrop-blur-sm transition-all"
              placeholder="Site contact person / number"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-6 mt-10">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-4 border-2 border-[#5c4033]/50 text-[#5c4033] rounded-xl hover:bg-[#5c4033]/10 transition-all text-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-12 py-4 rounded-xl text-white font-medium text-lg transition-all shadow-md ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5c4033] hover:bg-[#4a3728]'
              }`}
            >
              {loading ? 'Submitting...' : 'Confirm Acceptance'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AcceptanceModal;