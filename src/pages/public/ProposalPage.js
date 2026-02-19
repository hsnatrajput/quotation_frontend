// src/pages/public/ProposalPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../../components/public/HeroSection';
import CompanyIntro from '../../components/public/CompanyIntro';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import CustomerGreeting from '../../components/public/CustomerGreeting';
import QuotationSummary from '../../components/public/QuotationSummary';
import CallToAction from '../../components/public/CallToAction';
import FooterPublic from '../../components/public/FooterPublic';
import SidebarMenu from '../../components/public/SidebarMenue';
import AcceptanceModal from '../../components/public/AcceptanceModal';
import QuotationScopeTable from '../../components/public/QuotationScopeTable';
import TenderInclusionSummary from '../../components/public/TenderInclusionSummary';
import AirSourceHeatPumps from '../../components/public/AirSourceHeatPumps';
import NonContestableCharges from '../../components/public/NonContestableCharges';
import DeliveryStandards from '../../components/public/DeliveryStandards';
import PocDocumentationPublic from '../../components/public/PocDocumentationPublic';
import StaticConstructionAssumptions from '../../components/public/StaticConstructionAssumptions';
import StaticResponsibilities from '../../components/public/StaticResponsibilities';
import StaticPaymentTerms from '../../components/public/StaticPaymentTerms';

const ProposalPage = () => {
  const { proposalId } = useParams();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proposal/${proposalId}`);

        if (!response.data.success) {
          throw new Error(response.data.message || 'Quotation not found');
        }

        setQuotation(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quotation. The link may be invalid or expired.');
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [proposalId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error || !quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Quotation Not Found</h1>
          <p className="text-xl text-gray-700 mb-8">{error}</p>
          <a href="mailto:info@airutilities.co.uk" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden"
      >
        ☰
      </button>

      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-grow">
        <HeroSection />
        <CompanyIntro />
        <TestimonialsSection />

        <CustomerGreeting 
          customerName={quotation.customerName}
          siteAddress={quotation.siteAddress}
        />

        <QuotationSummary quotation={quotation} />

        {/* Dynamic sections – show if data exists and is not empty */}
        {quotation.scopeTable && Object.values(quotation.scopeTable).some(v => v) && (
          <QuotationScopeTable data={quotation.scopeTable} />
        )}

        {quotation.tenderInclusions && Object.keys(quotation.tenderInclusions).length > 0 && (
          <TenderInclusionSummary 
            data={quotation.tenderInclusions} 
            jobTypes={quotation.jobType || []} 
          />
        )}

        {quotation.airSourceHeatPumps && quotation.airSourceHeatPumps.numPlots && (
          <AirSourceHeatPumps data={quotation.airSourceHeatPumps} />
        )}

        {quotation.nonContestableCharges && Object.values(quotation.nonContestableCharges).some(v => v) && (
          <NonContestableCharges data={quotation.nonContestableCharges} />
        )}

        {quotation.deliveryStandards && Object.values(quotation.deliveryStandards).some(v => v) && (
          <DeliveryStandards data={quotation.deliveryStandards} />
        )}

        {quotation.pocDocumentation && Object.values(quotation.pocDocumentation).some(v => v) && (
          <PocDocumentationPublic data={quotation.pocDocumentation} />
        )}

        {/* Always show static sections */}
        <StaticConstructionAssumptions />
        <StaticResponsibilities />
        <StaticPaymentTerms />

        <CallToAction onAccept={() => setShowModal(true)} />
      </main>

      <FooterPublic />

      <AcceptanceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        quotation={quotation}
      />
    </div>
  );
};

export default ProposalPage;