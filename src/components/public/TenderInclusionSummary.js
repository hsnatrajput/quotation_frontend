// src/components/public/TenderInclusionSummary.js
import React from 'react';

const TenderInclusionSummary = ({ data, jobTypes = [] }) => {
  if (!data) return null;

  const selectedActivities = [];

  // Loop through all groups and their items
  Object.entries(data).forEach(([groupName, group]) => {
    if (group && typeof group === 'object') {
      Object.entries(group).forEach(([activityKey, value]) => {
        if (value && typeof value === 'object') {
          const { included = false, excluded = false, na = false, comment = '' } = value;

          if (included || excluded || na) {
            let statusLabel = '';
            let statusColor = '';

            if (included) {
              statusLabel = 'Included (By AU)';
              statusColor = 'bg-green-100 text-green-800 border-green-300';
            } else if (excluded) {
              statusLabel = 'Excluded (By others)';
              statusColor = 'bg-red-100 text-red-800 border-red-300';
            } else if (na) {
              statusLabel = 'N/A';
              statusColor = 'bg-gray-100 text-gray-800 border-gray-300';
            }

            // Removed isRelevant filter -- always include if selected
            selectedActivities.push({
              group: groupName,
              key: activityKey,
              label: activityKey
                .replace(/([A-Z])/g, ' $1') // camelCase → spaces
                .replace(/^./, str => str.toUpperCase())
                .trim(),
              status: statusLabel,
              statusColor,
              comment: comment.trim() || '—',
            });
          }
        }
      });
    }
  });

  // Fallback UI if no activities are selected
  if (selectedActivities.length === 0) return (
    <section id="tender-inclusions" className="py-16 bg-white border-t border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Tender Inclusion Summary
        </h2>
        <p className="text-xl text-gray-600">
          No tender inclusions specified for this quotation.
        </p>
      </div>
    </section>
  );

  return (
    <section id="tender-inclusions" className="py-16 bg-white border-t border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-900">
          Tender Inclusion Summary
        </h2>

        <p className="text-center text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
          Summary of what is included, excluded, or not applicable in your project quotation.
        </p>

        <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
          <table className="w-full border-collapse bg-white min-w-[900px]">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-6 text-left text-lg font-semibold">Activity</th>
                <th className="p-6 text-center text-lg font-semibold w-56">Status</th>
                <th className="p-6 text-left text-lg font-semibold">Comment</th>
              </tr>
            </thead>
            <tbody>
              {selectedActivities.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-blue-50 transition-colors">
                  <td className="p-6 font-medium text-gray-900 border-r">{item.label}</td>
                  <td className="p-6 text-center border-r">
                    <span className={`inline-block px-6 py-2 rounded-full text-base font-semibold border ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-6 text-gray-700">
                    {item.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TenderInclusionSummary;