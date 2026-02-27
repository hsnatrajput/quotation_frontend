// src/components/admin/quotation/tender/ElectricSection.js
import React from 'react';

const ElectricSection = ({ inclusions, onChange, onCommentChange }) => {
  const items = [
    { key: 'ashpLoadAllowance', label: 'Provision of Air Source Heat Pump load within o/a POC load' },
    { key: 'meterManagement', label: 'Management of meter installation on your behalf' },
    { key: 'substationPlant', label: 'Substation plant' },
    { key: 'substationEnclosure', label: 'Substation enclosure' },
    { key: 'substationPlinth', label: 'Substation plinth construction' },
    { key: 'earthingStudy', label: 'Substation earthing study' },
    { key: 'tempElectricNewMains', label: 'Temp electric supply (on site off new mains)' },
    { key: 'tempElectricExistingMains', label: 'Temp electric supply (off site off existing mains)' },
    { key: 'tempKiosk', label: 'Temp kiosk/termination point – provision and install' },
    { key: 'interimLV', label: 'Interim LV supply (pre-substation energisation supply)' },
    { key: 'pumpingStation', label: 'Pumping station supply' },
    { key: 'multiOccupancy', label: 'Multi occupancy supply install (MSDB, trunking and isolators)' },
    { key: 'evChargingAllowance', label: 'EV Charging load allowance' },
    { key: 'pvGenerationAllowance', label: 'PV/generation device, allowance included in DNO application' },
    { key: 'electricMeterBox', label: 'Electric recessed meter box provision' },
    { key: 'electricPlotDucting', label: 'Electric plot service ducting provision' },
    { key: 'hockeySticksClips', label: 'Hockey sticks and clips provision' },
    { key: 'plotServiceProvision', label: 'Plot service provision (often excluded by competitors)' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">ELECTRIC</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold border-b border-r">Activity</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">Included (By AU)</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">Excluded (By others)</th>
              <th className="p-4 text-center font-semibold border-b border-r w-32">N/A</th>
              <th className="p-4 text-left font-semibold border-b">Comment (optional)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const current = inclusions.electric?.[item.key] || {
                included: false,
                excluded: false,
                na: false,
                comment: '',
              };

              return (
                <tr key={item.key} className="border-b hover:bg-gray-50">
                  <td className="p-4 border-r font-medium">{item.label}</td>

                  {/* Included */}
                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-${item.key}`}
                      checked={current.included}
                      onChange={() => onChange('electric', item.key, 'included')}
                      className="h-5 w-5 text-blue-600"
                    />
                  </td>

                  {/* Excluded */}
                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-${item.key}`}
                      checked={current.excluded}
                      onChange={() => onChange('electric', item.key, 'excluded')}
                      className="h-5 w-5 text-red-600"
                    />
                  </td>

                  {/* N/A */}
                  <td className="p-4 text-center border-r">
                    <input
                      type="radio"
                      name={`status-${item.key}`}
                      checked={current.na}
                      onChange={() => onChange('electric', item.key, 'na')}
                      className="h-5 w-5 text-gray-600"
                    />
                  </td>

                  {/* Comment */}
                  <td className="p-4">
                    <textarea
                      value={current.comment}
                      onChange={(e) => onCommentChange('electric', item.key, e.target.value)}
                      className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Add optional comment..."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectricSection;