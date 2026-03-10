// src/components/admin/quotation/TenderInclusionSummary.js
import React from 'react';
import OffsiteWorks from '../quotation/tender/OffSiteWorks';
import OnsiteUnmadeGround from '../quotation/tender/OnsiteUnmadeGround';
import WaterSection from '../quotation/tender/WaterSection';
import ElectricSection from '../quotation/tender/ElectricSection';
import GasSection from '../quotation/tender/GasSection';
import GeneralSection from '../quotation/tender/GeneralSection';
import MiscellaneousSection from '../quotation/tender/MiscellaneousSection';

const TenderInclusionSummary = ({ inclusions, onChange, onCommentChange }) => {
  return (
    <div className="border-b pb-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
        TENDER INCLUSION SUMMARY
      </h2>

      <div className="space-y-16 px-4">
        <OffsiteWorks
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <OnsiteUnmadeGround
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <WaterSection
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <ElectricSection
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <GasSection
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <GeneralSection
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />

        <MiscellaneousSection
          inclusions={inclusions}
          onChange={onChange}
          onCommentChange={onCommentChange}
        />
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center italic">
        Only selected items (with status and comments) will be displayed in the public quotation view.
      </p>
    </div>
  );
};

export default TenderInclusionSummary;