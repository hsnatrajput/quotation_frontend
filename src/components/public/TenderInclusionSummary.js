// src/components/public/TenderInclusionSummary.js
import React from 'react';

const groupTitles = {
  offsite: 'OFFSITE WORKS',
  onsiteUnmade: 'ONSITE WORKS (UNMADE GROUND)',
  water: 'WATER',
  electric: 'ELECTRIC',
  gas: 'GAS',
  general: 'GENERAL',
  miscellaneous: 'MISCELLANEOUS',
  streetlighting: 'STREET LIGHTING',
  telecommsFibre: 'TELECOMMS & FIBRE',
};

const TenderInclusionSummary = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <section className="py-16 bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5c4033] mb-6">
            Tender Inclusion Summary
          </h2>
          <p className="text-xl text-gray-600">
            No inclusions selected for this quotation.
          </p>
        </div>
      </section>
    );
  }

  // Only include groups with at least one selected (included/excluded/na) item
  const groupsToShow = Object.entries(data).filter(([_, group]) => {
    if (!group || typeof group !== 'object') return false;
    return Object.values(group).some(item =>
      typeof item === 'object' && (item.included || item.excluded || item.na)
    );
  });

  if (groupsToShow.length === 0) {
    return (
      <section className="py-16 bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5c4033] mb-6">
            Tender Inclusion Summary
          </h2>
          <p className="text-xl text-gray-600">
            No inclusions selected for this quotation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5c4033] text-center mb-16">
          Tender Inclusion Summary
        </h2>

        <div className="space-y-16">
          {groupsToShow.map(([groupKey, groupItems]) => {
            const title = groupTitles[groupKey] || groupKey.replace(/([A-Z])/g, ' $1').toUpperCase();

            const rows = Object.entries(groupItems)
              .filter(([_, item]) => typeof item === 'object' && (item.included || item.excluded || item.na))
              .map(([key, item]) => {
                let status = '';
                let color = '';

                if (item.included) {
                  status = 'Included (By AU)';
                  color = 'bg-green-100 text-green-800 border-green-300';
                } else if (item.excluded) {
                  status = 'Excluded (By others)';
                  color = 'bg-red-100 text-red-800 border-red-300';
                } else if (item.na) {
                  status = 'N/A';
                  color = 'bg-gray-100 text-gray-800 border-gray-300';
                }

                const fullComment = item.comment?.trim() || '—';
                // Truncate to ~10 words + ellipsis
                const shortComment = fullComment.split(' ').slice(0, 10).join(' ') + (fullComment.split(' ').length > 10 ? '...' : '');

                return {
                  activity: key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, c => c.toUpperCase())
                    .trim(),
                  status,
                  color,
                  shortComment,
                  fullComment,
                };
              });

            return (
              <div key={groupKey} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-600 text-white px-8 py-6 font-bold text-xl">
                  {title}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-6 text-left font-semibold border-b border-r">Activity</th>
                        <th className="p-6 text-center font-semibold border-b border-r w-56">Status</th>
                        <th className="p-6 text-left font-semibold border-b">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-6 font-medium text-gray-900 border-r">{row.activity}</td>
                          <td className="p-6 text-center border-r">
                            <span className={`inline-block px-8 py-2 rounded-full text-sm font-semibold border ${row.color}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="p-6 text-gray-700 max-w-xs">
                            <span title={row.fullComment} className="cursor-help">
                              {row.shortComment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TenderInclusionSummary;