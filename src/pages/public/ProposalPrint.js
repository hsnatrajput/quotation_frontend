// src/pages/public/ProposalPrint.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomerGreeting from '../../components/public/CustomerGreeting';
import QuotationSummary from '../../components/public/QuotationSummary';
import QuotationScopeTable from '../../components/public/QuotationScopeTable';
import TenderInclusionSummary from '../../components/public/TenderInclusionSummary';
import AirSourceHeatPumps from '../../components/public/AirSourceHeatPumps';
import NonContestableCharges from '../../components/public/NonContestableCharges';
import DeliveryStandards from '../../components/public/DeliveryStandards';
import PocDocumentationPublic from '../../components/public/PocDocumentationPublic';
import StaticConstructionAssumptions from '../../components/public/StaticConstructionAssumptions';
import StaticResponsibilities from '../../components/public/StaticResponsibilities';
import StaticPaymentTerms from '../../components/public/StaticPaymentTerms';

const ProposalPrint = () => {
  const { proposalId } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proposal/${proposalId}`);
        if (response.data.success) {
          setQuotation(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load quotation for print");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [proposalId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Preparing quotation for PDF...</div>;
  }

  if (!quotation) {
    return <div className="min-h-screen flex items-center justify-center text-2xl text-red-600">Quotation not found</div>;
  }

  // All visible sections in order (same logic as ProposalPage)
  const sections = [
    <CustomerGreeting key="greeting" customerName={quotation.customerName} siteAddress={quotation.siteAddress} />,
    <QuotationSummary key="summary" quotation={quotation} />,
    quotation.scopeTable && Object.values(quotation.scopeTable).some(v => v) && 
      <QuotationScopeTable key="scope" data={quotation.scopeTable} />,
    quotation.tenderInclusions && 
      <TenderInclusionSummary key="tender" data={quotation.tenderInclusions} jobTypes={quotation.jobType || []} />,
    quotation.airSourceHeatPumps?.numPlots && 
      <AirSourceHeatPumps key="heatpumps" data={quotation.airSourceHeatPumps} />,
    quotation.nonContestableCharges && Object.values(quotation.nonContestableCharges).some(v => v) && 
      <NonContestableCharges key="noncontested" data={quotation.nonContestableCharges} />,
    <DeliveryStandards key="delivery" />,
    quotation.pocDocumentation && Object.values(quotation.pocDocumentation).some(v => v) && 
      <PocDocumentationPublic key="poc" data={quotation.pocDocumentation} />,
    <StaticConstructionAssumptions key="assumptions" />,
    <StaticResponsibilities key="responsibilities" />,
    <StaticPaymentTerms key="payment" />,
  ].filter(Boolean);

  return (
    <div className="bg-white min-h-screen print-container">
      {sections.map((section, index) => (
        <div key={index} className="print-section">
          {section}
        </div>
      ))}

      {/* Footer for PDF */}
      <div className="text-center py-16 border-t mt-20 text-gray-500 text-sm">
        Air Utilities • 143 Hamilton Road, Manchester, M13 0PL, United Kingdom<br />
        Proposal ID: {quotation.proposalId} | Generated on {new Date().toLocaleDateString('en-GB')}
      </div>
    </div>
  );
};

export default ProposalPrint;