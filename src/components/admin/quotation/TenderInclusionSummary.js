// src/components/admin/quotation/TenderInclusionSummary.js
import React from 'react';
import OffsiteWorks from '../quotation/tender/OffSiteWorks';
import OnsiteUnmadeGround from '../quotation/tender/OnsiteUnmadeGround';
import WaterSection from '../quotation/tender/WaterSection';
import ElectricSection from '../quotation/tender/ElectricSection';
import GasSection from '../quotation/tender/GasSection';
import GeneralSection from '../quotation/tender/GeneralSection';
import MiscellaneousSection from '../quotation/tender/MiscellaneousSection';

const TenderInclusionSummary = ({ formData, setFormData }) => {
  const handleInclusionChange = (group, key, checked) => {
    setFormData((prev) => ({
      ...prev,
      tenderInclusions: {
        ...prev.tenderInclusions,
        [group]: {
          ...prev.tenderInclusions[group],
          [key]: checked,
        },
      },
    }));
  };

  return (
    <div className="border-b pb-12">
      {/* <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
        TENDER INCLUSION SUMMARY
      </h2> */}

      <div className="space-y-16 px-4">
        <OffsiteWorks
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <OnsiteUnmadeGround
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <WaterSection
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <ElectricSection
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <GasSection
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <GeneralSection
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />

        <MiscellaneousSection
          inclusions={formData.tenderInclusions}
          onChange={handleInclusionChange}
        />
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center italic">
        Only selected items will be displayed in the public quotation view.
      </p>
    </div>
  );
};

export default TenderInclusionSummary;