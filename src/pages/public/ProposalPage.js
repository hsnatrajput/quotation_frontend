// src/pages/public/ProposalPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HeroSection from '../../components/public/HeroSection';
import CompanyIntro from '../../components/public/CompanyIntro';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import CustomerGreeting from '../../components/public/CustomerGreeting';
import QuotationSummary from '../../components/public/QuotationSummary';
import PaymentTerms from '../../components/public/PaymentTerms';
import CallToAction from '../../components/public/CallToAction';
import FooterPublic from '../../components/public/FooterPublic';

const ProposalPage = () => {
  const { proposalId } = useParams();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proposal/${proposalId}`);

        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to load quotation');
        }

        setQuotation(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load quotation. The link may be invalid or expired.');
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [proposalId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Loading your quotation...</p>
        </div>
      </div>
    );
  }

  if (error || !quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-lg px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quotation Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">{error || "The link may be invalid or expired. Please contact us for assistance."}</p>
          <a
            href="mailto:info@airutilities.co.uk"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <HeroSection />
        <CompanyIntro />
        <TestimonialsSection />
        <CustomerGreeting 
          customerName={quotation.customerName}
          siteAddress={quotation.siteAddress}
        />
        <QuotationSummary quotation={quotation} />
        <PaymentTerms />
        <CallToAction />
      </main>
      <FooterPublic />
    </div>
  );
};

export default ProposalPage;