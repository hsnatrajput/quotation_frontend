// src/pages/admin/QuotationEdit.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicInformation from '../../components/admin/quotation/BasicInformation';
import JobAndSiteDetails from '../../components/admin/quotation/JobAndSiteDetails';
import ServicesItems from '../../components/admin/quotation/ServiceItems';
import ManualTotals from '../../components/admin/quotation/MannualTotals';
import ScopeOfWorks from '../../components/admin/quotation/ScopeOfWorks';
import TenderInclusionSummary from '../../components/admin/quotation/TenderInclusionSummary';
import AirSourceHeatPumpsSection from '../../components/admin/quotation/AirSourceHeatPumpsSection';
import NonContestableCharges from '../../components/admin/quotation/NonContestableCharges';
// import DeliveryStandards from '../../components/admin/quotation/DeliveryStandards';
import PocDocumentation from '../../components/admin/quotation/PocDocumentation';
// import ConstructionAssumptions from '../../components/admin/quotation/ConstructionAssumptions';
// import Responsibilities from '../../components/admin/quotation/Responsibilities';
import LegalDocumentation from '../../components/admin/quotation/LegalDocumentation';
// import PaymentTermsSection from '../../components/admin/quotation/PaymentTermsSection';

const QuotationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    quotationRef: '',
    quotationDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    developmentAddress: '',
    scope: '',
    quotationType: 'Standard',
    jobType: [],
    siteAddress: '',
    projectTitle: '',
    projectDescription: '',
    items: [{ serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
    subtotal: '',
    vatRate: 20,
    vatAmount: '',
    totalAmount: '',
    validUntil: '',

    scopeTable: {
      drawing: '',
      totalPlots: '',
      futurePhaseAllowance: '',
      totalLoadAllowance: '',
      heatingType: '',
      plotConnections: '',
      meters: '',
      electricConnectionVoltage: '',
      waterMainType: '',
      waterWasteSustainability: '',
      mainsConnectionsCommissioning: '',
    },

    tenderInclusions: {
      offsite: {
        pocWorks: false,
        offsiteExcavationMains: false,
        trafficManagement: false,
        councilNoticeFees: false,
        reinforcementWorks: false,
        diversionWorks: false,
        wayleavesHeadsOfTerms: false,
      },
      onsiteUnmade: {
        excavationMainsTrenches: false,
        backfillMainsTrenches: false,
        installationMains: false,
        mainsTape: false,
        fineFillSand: false,
        excavationServiceJoints: false,
        backfillServiceJoints: false,
        sandServiceConnections: false,
        beddingMaterials: false,
      },
      water: {
        metersProvision: false,
        tempWaterNewMains: false,
        tempWaterExistingMains: false,
        waterInfraCharges: false,
        waterConnectionCharges: false,
        boundaryWaterBox: false,
        fireServiceHydrant: false,
      },
      electric: {
        ashpLoadAllowance: false,
        meterInstallationManagement: false,
        substationPlant: false,
        substationEnclosure: false,
        substationPlinth: false,
        earthingStudy: false,
        tempElectricNewMains: false,
        tempElectricExistingMains: false,
        tempKioskTermination: false,
        interimLVSupply: false,
        pumpingStationSupply: false,
        multiOccupancySupply: false,
        evChargingAllowance: false,
        pvGenerationAllowance: false,
        electricMeterBox: false,
        electricPlotDucting: false,
        hockeySticksClips: false,
        plotServiceProvision: false,
      },
      streetlighting: {
        connectionsOnly: false,
      },
      telecommsFibre: {
        btFibreDuctBox: false,
        ifnlFibreNetwork: false,
      },
      gas: {
        gasMeterBoxesWallMounted: false,
        gasServicePipe: false,
        gasMainPipe: false,
        gasMetersSmartDumb: false,
        gasTapeOnsite: false,
        gasTapeOffsite: false,
      },
      general: {
        tempWaterCompound: false,
        tempElectricCompound: false,
        onsiteMainsExcavation: false,
        onsiteServiceBays: false,
        layOnsiteMains: false,
        siteEntranceDiversions: false,
        trafficManagementCosts: false,
        streetworksNotices: false,
        utilityInfraDesign: false,
      },
      miscellaneous: {
        mpanNumbers: false,
        onsiteDuctingPlan: false,
        testingCommissioning: false,
        asLaidRecords: false,
      },
    },

    airSourceHeatPumps: {
      numPlots: '',
      plotNumbers: '',
      dataSheetProvided: false,
      pumpModel: '',
      ashpLoadAllowancePerPlot: '',
    },

    nonContestableCharges: {
      electricPOC: '',
      waterPOCIncumbent: '',
      waterInfraFees: '',
      wasteWaterInfraFees: '',
      environmentalComponent: '',
      meterAdminCharges: '',
      uuApprovalFee: '',
      councilCharges: '',
    },

    // deliveryStandards: {
    //   serviceCallOff: '',
    //   mainsCallOff: '',
    //   mobilisationDesignApproval: '',
    //   draftDuctLayouts: '',
    // },

    pocDocumentation: {
      waterPocRef: '',
      waterPocExpiry: '',
      mainsElectricPocRef: '',
      mainsElectricPocExpiry: '',
    },

    constructionAssumptions: {
      siteSpecific: '',
      generalTerms: '',
    },

    // responsibilities: {
    //   customer: '',
    //   au: '',
    // },

    legalDocumentation: {
      customerContact: '',
      landownerDetails: '',
      solicitorsActing: '',
    },

    // paymentTerms: '50% on acceptance, 25% on commencement, 25% on completion',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Accordion state - same as Create
  const [openSections, setOpenSections] = useState({
    basic: true,
    details: true,
    items: true,
    totals: true,
    scope: false,
    tender: false,
    heatPumps: false,
    nonContestable: false,
    delivery: false,
    pocDocumentation: false,
    assumptions: false,
    responsibilities: false,
    legal: false,
    payment: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch quotation data
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/quotations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;

        // Populate formData with all fields from DB
        setFormData({
          quotationRef: data.quotationRef || '',
          quotationDate: data.quotationDate ? new Date(data.quotationDate).toISOString().split('T')[0] : '',
          customerName: data.customerName || '',
          customerEmail: data.customerEmail || '',
          customerPhone: data.customerPhone || '',
          customerAddress: data.customerAddress || '',
          developmentAddress: data.developmentAddress || '',
          scope: data.scope || '',
          quotationType: data.quotationType || 'Standard',
          jobType: data.jobType || [],
          siteAddress: data.siteAddress || '',
          projectTitle: data.projectTitle || '',
          projectDescription: data.projectDescription || '',
          items: data.items?.map(item => ({
            serviceName: item.serviceName || '',
            unitPrice: item.unitPrice || 0,
            quantity: item.quantity || 1,
            totalPrice: item.totalPrice || 0,
          })) || [{ serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
          subtotal: data.subtotal || '',
          vatRate: data.vatRate || 20,
          vatAmount: data.vatAmount || '',
          totalAmount: data.totalAmount || '',
          validUntil: data.validUntil ? new Date(data.validUntil).toISOString().split('T')[0] : '',

          scopeTable: data.scopeTable || {
            drawing: '',
            totalPlots: '',
            futurePhaseAllowance: '',
            totalLoadAllowance: '',
            heatingType: '',
            plotConnections: '',
            meters: '',
            electricConnectionVoltage: '',
            waterMainType: '',
            waterWasteSustainability: '',
            mainsConnectionsCommissioning: '',
          },

          tenderInclusions: data.tenderInclusions || {
            offsite: {
              pocWorks: false,
              offsiteExcavationMains: false,
              trafficManagement: false,
              councilNoticeFees: false,
              reinforcementWorks: false,
              diversionWorks: false,
              wayleavesHeadsOfTerms: false,
            },
            // ... (all other groups default to false)
            // (copy-paste the full structure from QuotationCreate.js if needed)
          },

          airSourceHeatPumps: data.airSourceHeatPumps || {
            numPlots: '',
            plotNumbers: '',
            dataSheetProvided: false,
            pumpModel: '',
            ashpLoadAllowancePerPlot: '',
          },

          nonContestableCharges: data.nonContestableCharges || {
            electricPOC: '',
            waterPOCIncumbent: '',
            waterInfraFees: '',
            wasteWaterInfraFees: '',
            environmentalComponent: '',
            meterAdminCharges: '',
            uuApprovalFee: '',
            councilCharges: '',
          },

          // deliveryStandards: data.deliveryStandards || {
          //   serviceCallOff: '',
          //   mainsCallOff: '',
          //   mobilisationDesignApproval: '',
          //   draftDuctLayouts: '',
          // },

          pocDocumentation: data.pocDocumentation || {
            waterPocRef: '',
            waterPocExpiry: '',
            mainsElectricPocRef: '',
            mainsElectricPocExpiry: '',
          },

          // constructionAssumptions: data.constructionAssumptions || {
          //   siteSpecific: '',
          //   generalTerms: '',
          // },

          // responsibilities: data.responsibilities || {
          //   customer: '',
          //   au: '',
          // },

          legalDocumentation: data.legalDocumentation || {
            customerContact: '',
            landownerDetails: '',
            solicitorsActing: '',
          },

          // paymentTerms: data.paymentTerms || '50% on acceptance, 25% on commencement, 25% on completion',
        });

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quotation or unauthorized.');
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.jobType.length === 0) {
      setError('Please select at least one job type');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const payload = {
        ...formData,
        items: formData.items.map((item) => ({
          serviceName: item.serviceName,
          unitPrice: Number(item.unitPrice),
          quantity: Number(item.quantity) || 1,
          totalPrice: Number(item.totalPrice),
        })),
        subtotal: Number(formData.subtotal),
        vatAmount: Number(formData.vatAmount),
        totalAmount: Number(formData.totalAmount),
        vatRate: Number(formData.vatRate),
      };

      await axios.put(`http://localhost:5000/api/quotations/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Quotation updated successfully!');
      navigate('/admin/quotations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quotation');
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center text-xl">Loading quotation...</div>;
  if (error) return <div className="p-10 text-center text-red-600 text-xl">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Edit Quotation
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* 1. Basic Information */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('basic')}
            >
              Basic Information {openSections.basic ? '▲' : '▼'}
            </h2>
            {openSections.basic && (
              <BasicInformation formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 2. Job & Site Details */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('details')}
            >
              Job & Site Details {openSections.details ? '▲' : '▼'}
            </h2>
            {openSections.details && (
              <JobAndSiteDetails formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 3. Services / Items */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('items')}
            >
              Services / Items {openSections.items ? '▲' : '▼'}
            </h2>
            {openSections.items && (
              <ServicesItems formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 4. Manual Totals */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('totals')}
            >
              Totals {openSections.totals ? '▲' : '▼'}
            </h2>
            {openSections.totals && (
              <ManualTotals formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 5. Scope of Works */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('scope')}
            >
              SCOPE OF WORKS {openSections.scope ? '▲' : '▼'}
            </h2>
            {openSections.scope && (
              <ScopeOfWorks formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 6. Tender Inclusion Summary */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('tender')}
            >
              TENDER INCLUSION SUMMARY {openSections.tender ? '▲' : '▼'}
            </h2>
            {openSections.tender && (
              <TenderInclusionSummary formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 7. Air Source Heat Pumps */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('heatPumps')}
            >
              Air Source Heat Pumps {openSections.heatPumps ? '▲' : '▼'}
            </h2>
            {openSections.heatPumps && (
              <AirSourceHeatPumpsSection formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 8. Non-Contestable Network Charges */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('nonContestable')}
            >
              NON-CONTESTABLE NETWORK CHARGES {openSections.nonContestable ? '▲' : '▼'}
            </h2>
            {openSections.nonContestable && (
              <NonContestableCharges formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 9. Delivery Standards */}
          {/* <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('delivery')}
            >
              DELIVERY STANDARDS {openSections.delivery ? '▲' : '▼'}
            </h2>
            {openSections.delivery && (
              <DeliveryStandards formData={formData} setFormData={setFormData} />
            )}
          </div> */}

          {/* Point of Connection Documentation */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('pocDocumentation')}
            >
              POINT OF CONNECTION DOCUMENTATION {openSections.pocDocumentation ? '▲' : '▼'}
            </h2>
            {openSections.pocDocumentation && (
              <PocDocumentation formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 10. Construction Assumptions */}
          {/* <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('assumptions')}
            >
              CONSTRUCTION ASSUMPTIONS {openSections.assumptions ? '▲' : '▼'}
            </h2>
            {openSections.assumptions && (
              <ConstructionAssumptions formData={formData} setFormData={setFormData} />
            )}
          </div> */}

          {/* 11. Responsibilities */}
          {/* <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('responsibilities')}
            >
              Responsibilities {openSections.responsibilities ? '▲' : '▼'}
            </h2>
            {openSections.responsibilities && (
              <Responsibilities formData={formData} setFormData={setFormData} />
            )}
          </div> */}

          {/* 12. Legal Documentation */}
          <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('legal')}
            >
              Legal Documentation {openSections.legal ? '▲' : '▼'}
            </h2>
            {openSections.legal && (
              <LegalDocumentation formData={formData} setFormData={setFormData} />
            )}
          </div>

          {/* 13. Payment Terms */}
          {/* <div className="border-b pb-8">
            <h2
              className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection('payment')}
            >
              Payment Terms {openSections.payment ? '▲' : '▼'}
            </h2>
            {openSections.payment && (
              <PaymentTermsSection formData={formData} setFormData={setFormData} />
            )}
          </div> */}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 mt-12">
            <button
              type="button"
              onClick={() => navigate('/admin/quotations')}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 rounded-lg text-white font-medium transition ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationEdit;