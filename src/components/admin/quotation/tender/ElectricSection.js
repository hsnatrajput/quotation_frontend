// src/components/admin/quotation/tender/ElectricSection.js
import React from 'react';

const ElectricSection = ({ inclusions, onChange }) => {
  const items = [
    {
      key: 'ashpLoadAllowance',
      label: 'Provision of Air Source Heat Pump load within o/a POC load',
      comment: '',
    },
    {
      key: 'meterManagement',
      label: 'Management of meter installation on your behalf',
      comment: '',
    },
    {
      key: 'substationPlant',
      label: 'Substation plant',
      comment: '',
    },
    {
      key: 'substationEnclosure',
      label: 'Substation enclosure',
      comment: '',
    },
    {
      key: 'substationPlinth',
      label: 'Substation plinth construction',
      comment: '',
    },
    {
      key: 'earthingStudy',
      label: 'Substation earthing study',
      comment: '',
    },
    {
      key: 'tempElectricNewMains',
      label: 'Temp electric supply (on site off new mains)',
      comment: '',
    },
    {
      key: 'tempElectricExistingMains',
      label: 'Temp electric supply (off site off existing mains)',
      comment: '',
    },
    {
      key: 'tempKiosk',
      label: 'Temp kiosk/termination point – provision and install',
      comment: '',
    },
    {
      key: 'interimLV',
      label: 'Interim LV supply (pre-substation energisation supply)',
      comment: '',
    },
    {
      key: 'pumpingStation',
      label: 'Pumping station supply',
      comment: '',
    },
    {
      key: 'multiOccupancy',
      label: 'Multi occupancy supply install (MSDB, trunking and isolators)',
      comment: '',
    },
    {
      key: 'evChargingAllowance',
      label: 'EV Charging load allowance',
      comment: '',
    },
    {
      key: 'pvGenerationAllowance',
      label: 'PV/generation device, allowance included in DNO application',
      comment: '',
    },
    {
      key: 'electricMeterBox',
      label: 'Electric recessed meter box provision',
      comment: '',
    },
    {
      key: 'electricPlotDucting',
      label: 'Electric plot service ducting provision',
      comment: '',
    },
    {
      key: 'hockeySticksClips',
      label: 'Hockey sticks and clips provision',
      comment: '',
    },
    {
      key: 'plotServiceProvision',
      label: 'Plot service provision (often excluded by competitors)',
      comment: 'Please be aware that plot service provision is usually excluded by our competitors and amounts to over £150 of material per plot',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-blue-800">ELECTRIC</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold border-b border-r">Activity</th>
              <th className="p-4 text-left font-semibold border-b border-r">Comments</th>
              <th className="p-4 text-center font-semibold border-b border-r w-24">
                Included (By AU)
              </th>
              <th className="p-4 text-center font-semibold border-b border-r w-24">
                Excluded (By others)
              </th>
              <th className="p-4 text-center font-semibold border-b w-24">N/A</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-b hover:bg-gray-50">
                <td className="p-4 border-r">{item.label}</td>
                <td className="p-4 border-r text-gray-600 italic text-sm">
                  {item.comment || '—'}
                </td>
                <td className="p-4 text-center border-r">
                  <input
                    type="checkbox"
                    checked={inclusions.electric[item.key] || false}
                    onChange={(e) => onChange('electric', item.key, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                </td>
                <td className="p-4 text-center border-r">
                  <input type="checkbox" disabled className="h-5 w-5 opacity-50 cursor-not-allowed" />
                </td>
                <td className="p-4 text-center">
                  <input type="checkbox" disabled className="h-5 w-5 opacity-50 cursor-not-allowed" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectricSection;