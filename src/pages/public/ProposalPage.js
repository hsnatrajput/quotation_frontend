// src/pages/public/ProposalPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import TestimonialsSection from '../../components/public/TestimonialsSection';
import CustomerGreeting from '../../components/public/CustomerGreeting';
import QuotationSummary from '../../components/public/QuotationSummary';
import CallToAction from '../../components/public/CallToAction';
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
  const [currentStep, setCurrentStep] = useState(0);
  const [showScrollWarning, setShowScrollWarning] = useState(false);

  // NEW: Page background that matches current section
  const [pageBgColor, setPageBgColor] = useState('#f8fafc');

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

  // NEW: Sync page background with current visible section
  useEffect(() => {
    const updatePageBackground = () => {
      // Get the currently rendered section
      const currentSection = document.querySelector('main > section') || 
                             document.querySelector('main > div') ||
                             document.querySelector('main > *');

      if (currentSection) {
        const computedStyle = window.getComputedStyle(currentSection);
        let bg = computedStyle.backgroundColor;

        // Handle transparent backgrounds
        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          setPageBgColor('#f8fafc'); // fallback light background
        } else {
          setPageBgColor(bg);
        }
      }
    };

    // Run after render + small delay for DOM to update
    const timer = setTimeout(updatePageBackground, 50);

    return () => clearTimeout(timer);
  }, [currentStep]);

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

  const steps = [
    { id: 'greeting', component: <CustomerGreeting customerName={quotation.customerName} siteAddress={quotation.siteAddress} /> },
    { id: 'summary', component: <QuotationSummary quotation={quotation} /> },
    { id: 'scope', condition: quotation.scopeTable && Object.values(quotation.scopeTable).some(v => v), component: <QuotationScopeTable data={quotation.scopeTable} /> },
    { id: 'tender', condition: quotation.tenderInclusions, component: <TenderInclusionSummary data={quotation.tenderInclusions} jobTypes={quotation.jobType || []} /> },
    { id: 'heatpumps', condition: quotation.airSourceHeatPumps && quotation.airSourceHeatPumps.numPlots, component: <AirSourceHeatPumps data={quotation.airSourceHeatPumps} /> },
    { id: 'noncontested', condition: quotation.nonContestableCharges && Object.values(quotation.nonContestableCharges).some(v => v), component: <NonContestableCharges data={quotation.nonContestableCharges} /> },
   { id: 'delivery', component: <DeliveryStandards /> },
    { id: 'poc', condition: quotation.pocDocumentation && Object.values(quotation.pocDocumentation).some(v => v), component: <PocDocumentationPublic data={quotation.pocDocumentation} /> },
    { id: 'assumptions', component: <StaticConstructionAssumptions /> },
    { id: 'responsibilities', component: <StaticResponsibilities /> },
    { id: 'payment', component: <StaticPaymentTerms /> },
    { id: 'cta', component: <CallToAction onAccept={() => setShowModal(true)} /> },
  ];

  const visibleSteps = steps.filter(step => step.condition === undefined || step.condition);
  const totalSteps = visibleSteps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const hasScrolledToBottom = () => {
    const section = document.querySelector('main > *:last-child');
    if (!section) return true;
    const sectionBottom = section.offsetTop + section.offsetHeight;
    const scrollBottom = window.scrollY + window.innerHeight;
    return scrollBottom >= sectionBottom - 150;
  };

  const goToNext = () => {
    if (isLast) return;

    if (!hasScrolledToBottom()) {
      setShowScrollWarning(true);
      setTimeout(() => setShowScrollWarning(false), 4200);
      return;
    }

    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrev = () => {
    if (!isFirst) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalSteps <= 7) {
      for (let i = 0; i < totalSteps; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentStep > 3) pages.push('...');
      const start = Math.max(1, currentStep - 1);
      const end = Math.min(totalSteps - 2, currentStep + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentStep < totalSteps - 4) pages.push('...');
      pages.push(totalSteps - 1);
    }
    return pages;
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: pageBgColor }}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-6 left-6 z-50 p-4 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl md:hidden border border-slate-200"
      >
        ☰
      </button>

      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main 
        className="flex-grow"
        style={{ backgroundColor: pageBgColor }}
      >
        {visibleSteps[currentStep]?.component}

        {totalSteps > 1 && (
          <NavBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            isFirst={isFirst}
            isLast={isLast}
            goToPrev={goToPrev}
            goToNext={goToNext}
            getPageNumbers={getPageNumbers}
            setCurrentStep={setCurrentStep}
          />
        )}
      </main>

      {/* Scroll warning toast */}
      {showScrollWarning && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[70] bg-red-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl text-sm flex items-center gap-3">
          Please scroll down to view complete content
          <span className="text-lg">↓</span>
        </div>
      )}

      <AcceptanceModal isOpen={showModal} onClose={() => setShowModal(false)} quotation={quotation} />
    </div>
  );
};

// NavBar Component (unchanged - already good)
const NavBar = ({ currentStep, totalSteps, isFirst, isLast, goToPrev, goToNext, getPageNumbers, setCurrentStep }) => {
  const [bgColor, setBgColor] = useState('transparent');
  const [isLightOrTransparent, setIsLightOrTransparent] = useState(true);
  const [textClass, setTextClass] = useState('text-gray-900');

  useEffect(() => {
    const timer = setTimeout(() => {
      const section = document.querySelector('main section:last-of-type') ||
                      document.querySelector('main > *:last-child');

      if (section) {
        const style = window.getComputedStyle(section);
        let bg = style.backgroundColor;

        const isTransparent = (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent');

        if (isTransparent) {
          setBgColor('transparent');
        } else {
          setBgColor(bg);
        }

        let brightness = 220;
        const rgbMatch = bg.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3 && !isTransparent) {
          brightness = (parseInt(rgbMatch[0]) * 299 + parseInt(rgbMatch[1]) * 587 + parseInt(rgbMatch[2]) * 114) / 1000;
        }

        const isLightLike = isTransparent || brightness > 160;
        setIsLightOrTransparent(isLightLike);
        setTextClass(isLightLike ? 'text-gray-900' : 'text-white');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const selectedBg = isLightOrTransparent ? 'bg-gray-900/10' : 'bg-white/20';
  const selectedRing = isLightOrTransparent ? 'ring-gray-900/40' : 'ring-white/50';
  const hoverBg = isLightOrTransparent ? 'hover:bg-gray-900/5' : 'hover:bg-white/10';

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[60] shadow-sm transition-all duration-300
        ${bgColor === 'transparent' ? 'bg-transparent backdrop-blur-md' : ''}
      `}
      style={{
        backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
        borderColor: isLightOrTransparent ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)',
      }}
    >
      <div className="lg:px-14 py-5 flex items-center justify-between">
        
        {/* Previous */}
        <button
          onClick={goToPrev}
          disabled={isFirst}
          className={`
            flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-medium text-base transition
            ${isFirst ? 'opacity-40 cursor-not-allowed' : ''}
            ${textClass} ${hoverBg} active:opacity-80
          `}
        >
          ← Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-2 sm:gap-4">
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span
                key={idx}
                className={`px-4 text-xl font-light ${textClass} opacity-70`}
              >
                …
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentStep(page)}
                className={`
                  min-w-[2.5rem] h-10 flex items-center justify-center 
                  text-base font-semibold rounded-xl transition-all duration-200
                  ${textClass}
                  ${page === currentStep
                    ? `${selectedBg} border border-current/20 ${selectedRing} ring-2 ring-offset-1 ring-offset-current/5 scale-105 shadow-sm`
                    : `${hoverBg} active:scale-95`}
                `}
              >
                {page + 1}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={goToNext}
          disabled={isLast}
          className={`
            flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-medium text-base transition
            ${isLast ? 'opacity-40 cursor-not-allowed' : ''}
            ${textClass} ${hoverBg} active:opacity-80
          `}
        >
          Next →
        </button>

      </div>
    </div>
  );
};

export default ProposalPage;