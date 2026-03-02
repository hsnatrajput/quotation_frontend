// src/pages/public/ProposalPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Always-visible sections (unchanged)
import HeroSection from '../../components/public/HeroSection';
import CompanyIntro from '../../components/public/CompanyIntro';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import CustomerGreeting from '../../components/public/CustomerGreeting';
import CallToAction from '../../components/public/CallToAction';
import FooterPublic from '../../components/public/FooterPublic';
import AcceptanceModal from '../../components/public/AcceptanceModal';

// Stepper sections
import ProposalNavigator from '../../components/public/ProposalNavigator';
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

/* ─────────────────────────────────────────────
   Loading screen
───────────────────────────────────────────── */
const LoadingScreen = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#0f172a', fontFamily: "'Sora', sans-serif",
  }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap');`}</style>
    <div style={{
      width: '48px', height: '48px', borderRadius: '50%',
      border: '3px solid #1e293b', borderTopColor: '#f97316',
      animation: 'spin 0.8s linear infinite', marginBottom: '20px',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <p style={{ color: '#64748b', fontSize: '15px' }}>Loading your proposal...</p>
  </div>
);

/* ─────────────────────────────────────────────
   Error screen
───────────────────────────────────────────── */
const ErrorScreen = ({ message }) => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', padding: '32px',
    background: '#0f172a', fontFamily: "'Sora', sans-serif",
  }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap');`}</style>
    <div style={{
      textAlign: 'center', maxWidth: '480px',
      background: '#1e293b', borderRadius: '24px', padding: '48px 40px',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', margin: '0 auto 24px',
      }}>⚠</div>
      <h1 style={{ color: '#f1f5f9', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
        Proposal Not Found
      </h1>
      <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
        {message}
      </p>
      <a
        href="mailto:info@airutilities.co.uk"
        style={{
          display: 'inline-block', padding: '14px 28px',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          color: '#fff', borderRadius: '12px', textDecoration: 'none',
          fontWeight: 700, fontSize: '14px',
          boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
        }}
      >
        Contact Support
      </a>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main ProposalPage
───────────────────────────────────────────── */
const ProposalPage = () => {
  const { proposalId } = useParams();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allReviewed, setAllReviewed] = useState(false);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proposal/${proposalId}`);
        if (!response.data.success) throw new Error(response.data.message || 'Quotation not found');
        setQuotation(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quotation. The link may be invalid or expired.');
        setLoading(false);
      }
    };
    fetchQuotation();
  }, [proposalId]);

  if (loading) return <LoadingScreen />;
  if (error || !quotation) return <ErrorScreen message={error} />;
  // Extra safety — should never reach here without quotation but keeps hooks order stable
  if (!quotation) return null;

  /* ── Build steps dynamically based on available data ── */
  const steps = [
    // Always show quotation summary first
    {
      label: 'Quotation Summary',
      component: <QuotationSummary quotation={quotation} />,
    },

    // Dynamic sections — only include if data exists
    ...(quotation.scopeTable && Object.values(quotation.scopeTable).some(v => v)
      ? [{ label: 'Scope of Works', component: <QuotationScopeTable data={quotation.scopeTable} /> }]
      : []),

    ...(quotation.tenderInclusions && Object.keys(quotation.tenderInclusions).length > 0
      ? [{
          label: 'Tender Inclusions',
          component: <TenderInclusionSummary data={quotation.tenderInclusions} jobTypes={quotation.jobType || []} />,
        }]
      : []),

    ...(quotation.airSourceHeatPumps && quotation.airSourceHeatPumps.numPlots
      ? [{ label: 'Air Source Heat Pumps', component: <AirSourceHeatPumps data={quotation.airSourceHeatPumps} /> }]
      : []),

    ...(quotation.nonContestableCharges && Object.values(quotation.nonContestableCharges).some(v => v)
      ? [{ label: 'Non-Contestable Charges', component: <NonContestableCharges data={quotation.nonContestableCharges} /> }]
      : []),

    ...(quotation.deliveryStandards && Object.values(quotation.deliveryStandards).some(v => v)
      ? [{ label: 'Delivery Standards', component: <DeliveryStandards data={quotation.deliveryStandards} /> }]
      : []),

    ...(quotation.pocDocumentation && Object.values(quotation.pocDocumentation).some(v => v)
      ? [{ label: 'POC Documentation', component: <PocDocumentationPublic data={quotation.pocDocumentation} /> }]
      : []),

    // Always include static sections
    { label: 'Construction Assumptions', component: <StaticConstructionAssumptions /> },
    { label: 'Responsibilities',          component: <StaticResponsibilities /> },
    { label: 'Payment Terms',             component: <StaticPaymentTerms /> },
  ];

  return (
    <div style={{ background: '#f8f7f4', minHeight: '100vh' }}>

      {/* ── Always-visible top sections (unchanged) ── */}
      <HeroSection />
      <CompanyIntro />
      <TestimonialsSection />
      <CustomerGreeting
        customerName={quotation.customerName}
        siteAddress={quotation.siteAddress}
      />

      {/* ── Stepper Navigator ── */}
      <ProposalNavigator
        steps={steps}
        onAllReviewed={() => setAllReviewed(true)}
      />

      {/* ── Divider ── */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

      {/* ── Call To Action — locked until all reviewed ── */}
      <div style={{ position: 'relative' }}>
        {/* Overlay when not all reviewed */}
        {!allReviewed && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'rgba(15,23,42,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '12px',
          }}>
            <div style={{
              background: '#1e293b', borderRadius: '20px', padding: '32px 40px',
              border: '1px solid rgba(249,115,22,0.25)',
              textAlign: 'center', maxWidth: '400px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔒</div>
              <h3 style={{
                color: '#f1f5f9', fontFamily: "'Sora',sans-serif",
                fontSize: '18px', fontWeight: 700, margin: '0 0 8px',
              }}>
                Review All Sections First
              </h3>
              <p style={{
                color: '#64748b', fontFamily: "'DM Sans',sans-serif",
                fontSize: '14px', lineHeight: 1.6, margin: 0,
              }}>
                Please review and mark all proposal sections as read to unlock the acceptance form.
              </p>
            </div>
          </div>
        )}
        <CallToAction onAccept={() => setShowModal(true)} allReviewed={allReviewed} />
      </div>

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