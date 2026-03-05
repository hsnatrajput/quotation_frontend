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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-2xl text-slate-400">Loading your premium proposal...</div>;

  if (error || !quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
        <div className="text-center max-w-lg">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Quotation Not Found</h1>
          <p className="text-xl text-slate-600 mb-10">{error}</p>
          <a href="mailto:info@airutilities.co.uk" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl transition-all hover:scale-105">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-50 overflow-hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-6 left-6 z-50 p-4 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl md:hidden border border-slate-200"
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

        {/* Dynamic sections */}
        {quotation.scopeTable && Object.values(quotation.scopeTable).some(v => v) && (
          <QuotationScopeTable data={quotation.scopeTable} />
        )}

        {/* Updated: show TenderInclusionSummary whenever tenderInclusions exists (even if partially filled) */}
        {quotation.tenderInclusions && (
          <TenderInclusionSummary data={quotation.tenderInclusions} jobTypes={quotation.jobType || []} />
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

        <StaticConstructionAssumptions />
        <StaticResponsibilities />
        <StaticPaymentTerms />

        <CallToAction onAccept={() => setShowModal(true)} />
      </main>

      <FooterPublic />
      <AcceptanceModal isOpen={showModal} onClose={() => setShowModal(false)} quotation={quotation} />
    </div>
  );
};

export default ProposalPage;