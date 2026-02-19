// src/components/admin/quotation/JobAndSiteDetails.js
import React from 'react';

const JobAndSiteDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobTypeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, jobType: selected }));
  };

  return (
    <div className="border-b pb-8">
      {/* <h2 className="text-2xl font-bold mb-6">Job & Site Details</h2> */}
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

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Project Title</label>
          <input
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Project Description</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default JobAndSiteDetails;