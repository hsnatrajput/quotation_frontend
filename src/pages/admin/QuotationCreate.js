// src/pages/admin/QuotationCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuotationCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    quotationRef: '',
    quotationDate: new Date().toISOString().split('T')[0],
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

    // SCOPE OF WORKS
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

    // TENDER INCLUSION SUMMARY - grouped by category
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

    // Air Source Heat Pumps
    airSourceHeatPumps: {
      numPlots: '',
      plotNumbers: '',
      dataSheetProvided: false,
      pumpModel: '',
      ashpLoadAllowancePerPlot: '',
    },

    // NON-CONTESTABLE NETWORK CHARGES
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

    // DELIVERY STANDARDS
    deliveryStandards: {
      serviceCallOff: '',
      mainsCallOff: '',
      mobilisationDesignApproval: '',
      draftDuctLayouts: '',
    },

    // CONSTRUCTION ASSUMPTIONS
    constructionAssumptions: {
      siteSpecific: '',
      generalTerms: '',
    },

    // Responsibilities
    responsibilities: {
      customer: '',
      au: '',
    },

    // Legal Documentation
    legalDocumentation: {
      customerContact: '',
      landownerDetails: '',
      solicitorsActing: '',
    },

    // Payment Terms
    paymentTerms: '50% on acceptance, 25% on commencement, 25% on completion',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Accordion state
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
    assumptions: false,
    responsibilities: false,
    legal: false,
    payment: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobTypeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, jobType: selected }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'unitPrice' ? Number(value) || 0 : value;
    newItems[index].totalPrice = (newItems[index].quantity || 1) * (newItems[index].unitPrice || 0);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { serviceName: '', unitPrice: 0, quantity: 1, totalPrice: 0 }],
    }));
  };

  const handleInclusionChange = (group, key, checked) => {
    setFormData(prev => ({
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

  const handleScopeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      scopeTable: {
        ...prev.scopeTable,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.jobType.length === 0) {
      setError('Please select at least one job type');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No token found');

      const payload = {
        ...formData,
        items: formData.items.map(item => ({
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

      await axios.post('http://localhost:5000/api/quotations', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('New quotation created successfully!');
      navigate('/admin/quotations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quotation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Create New Quotation
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* 1. Basic Information */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('basic')}>
              Basic Information {openSections.basic ? '▲' : '▼'}
            </h2>
            {openSections.basic && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quotation Reference # *</label>
                  <input name="quotationRef" value={formData.quotationRef} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quotation Date *</label>
                  <input type="date" name="quotationDate" value={formData.quotationDate} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer Name *</label>
                  <input name="customerName" value={formData.customerName} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer Email *</label>
                  <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer Phone</label>
                  <input name="customerPhone" value={formData.customerPhone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer Address</label>
                  <input name="customerAddress" value={formData.customerAddress} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Development Address *</label>
                  <input name="developmentAddress" value={formData.developmentAddress} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Scope</label>
                  <input name="scope" value={formData.scope} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quotation Type</label>
                  <input name="quotationType" value={formData.quotationType} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* 2. Job Type & Site Details */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('details')}>
              Job & Site Details {openSections.details ? '▲' : '▼'}
            </h2>
            {openSections.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Job Type(s) *</label>
                  <select multiple value={formData.jobType} onChange={handleJobTypeChange} className="w-full p-3 border rounded-lg h-32" required>
                    <option value="Electric">Electric</option>
                    <option value="Gas">Gas</option>
                    <option value="Water">Water</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Site Address *</label>
                  <input name="siteAddress" value={formData.siteAddress} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Project Title</label>
                  <input name="projectTitle" value={formData.projectTitle} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Project Description</label>
                  <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} className="w-full p-3 border rounded-lg h-32" />
                </div>
              </div>
            )}
          </div>

          {/* 3. Services / Items */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('items')}>
              Services / Items {openSections.items ? '▲' : '▼'}
            </h2>
            {openSections.items && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Services / Items</h3>
                  <button type="button" onClick={addItem} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                    + Add Item
                  </button>
                </div>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 mb-6 border-b pb-4">
                    <input placeholder="Service name" value={item.serviceName || ''} onChange={(e) => handleItemChange(index, 'serviceName', e.target.value)} className="flex-1 p-3 border rounded-lg" required />
                    <input type="number" placeholder="Unit Price (£)" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} className="w-32 p-3 border rounded-lg" min="0" step="0.01" required />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Manual Totals */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('totals')}>
              Totals {openSections.totals ? '▲' : '▼'}
            </h2>
            {openSections.totals && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Subtotal (£) *</label>
                  <input type="number" name="subtotal" value={formData.subtotal} onChange={handleChange} className="w-full p-3 border rounded-lg" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    VAT Amount (£) * (VAT {formData.vatRate}%)
                  </label>
                  <input type="number" name="vatAmount" value={formData.vatAmount} onChange={handleChange} className="w-full p-3 border rounded-lg" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Total Amount (£) *</label>
                  <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="w-full p-3 border rounded-lg font-bold text-xl" min="0" step="0.01" required />
                </div>
              </div>
            )}
          </div>

          {/* 5. SCOPE OF WORKS */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('scope')}>
              SCOPE OF WORKS {openSections.scope ? '▲' : '▼'}
            </h2>
            {openSections.scope && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">This quotation has been prepared using the following drawing:</label>
                  <input value={formData.scopeTable.drawing} onChange={(e) => handleScopeChange('drawing', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Total Plots</label>
                  <input value={formData.scopeTable.totalPlots} onChange={(e) => handleScopeChange('totalPlots', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Future Phase allowance</label>
                  <input value={formData.scopeTable.futurePhaseAllowance} onChange={(e) => handleScopeChange('futurePhaseAllowance', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Total Load allowance</label>
                  <input value={formData.scopeTable.totalLoadAllowance} onChange={(e) => handleScopeChange('totalLoadAllowance', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Heating type</label>
                  <input value={formData.scopeTable.heatingType} onChange={(e) => handleScopeChange('heatingType', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Plot connections</label>
                  <input value={formData.scopeTable.plotConnections} onChange={(e) => handleScopeChange('plotConnections', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Meters</label>
                  <input value={formData.scopeTable.meters} onChange={(e) => handleScopeChange('meters', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Electric connection voltage</label>
                  <input value={formData.scopeTable.electricVoltage} onChange={(e) => handleScopeChange('electricVoltage', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Water main type</label>
                  <input value={formData.scopeTable.waterMainType} onChange={(e) => handleScopeChange('waterMainType', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Water/Waste water sustainability</label>
                  <input value={formData.scopeTable.waterSustainability} onChange={(e) => handleScopeChange('waterSustainability', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Mains connections/Piece up (commissioning visits)</label>
                  <input value={formData.scopeTable.mainsConnections} onChange={(e) => handleScopeChange('mainsConnections', e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* 6. TENDER INCLUSION SUMMARY - grouped by utility */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('tender')}>
              TENDER INCLUSION SUMMARY {openSections.tender ? '▲' : '▼'}
            </h2>
            {openSections.tender && (
              <div className="space-y-10">
                {/* OFFSITE WORKS */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">OFFSITE WORKS</h3>
                  {[
                    { key: 'pocWorks', label: 'Point of connection works including non-contestable costs' },
                    { key: 'excavationMains', label: 'Offsite excavation, mains installation and reinstatement (all-inclusive as standard)' },
                    { key: 'trafficManagement', label: 'Traffic Management' },
                    { key: 'councilNoticeFees', label: 'Council notice fees' },
                    { key: 'reinforcementWorks', label: 'Reinforcement works' },
                    { key: 'diversionWorks', label: 'Diversion works' },
                    { key: 'wayleavesHeadsOfTerms', label: '3rd party wayleaves/heads of terms (known or unknown)' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.offsite[item.key]}
                        onChange={(e) => handleInclusionChange('offsite', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* ONSITE WORKS (UNMADE GROUND) */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">ONSITE WORKS (UNMADE GROUND)</h3>
                  {[
                    { key: 'excavationMainsTrenches', label: 'Onsite excavation of mains trenches' },
                    { key: 'backfillMainsTrenches', label: 'Backfill of mains trenches' },
                    { key: 'installationMains', label: 'Installation of mains' },
                    { key: 'mainsTape', label: 'Provision and installation of mains tape' },
                    { key: 'fineFillSand', label: 'Provision of the fine fill for mains (sand surround)' },
                    { key: 'excavationServiceJoints', label: 'Excavation of service connections/joint bays' },
                    { key: 'backfillServiceJoints', label: 'Backfilling of service connections/joint bays' },
                    { key: 'sandServiceConnections', label: 'Provision of sand for service connections' },
                    { key: 'beddingMaterials', label: 'Installation of bedding materials' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.onsiteUnmade[item.key]}
                        onChange={(e) => handleInclusionChange('onsiteUnmade', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* WATER */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">WATER</h3>
                  {[
                    { key: 'metersProvision', label: 'Provision and installation of meters' },
                    { key: 'tempWaterNewMains', label: 'Temporary water connections (on site off new mains)' },
                    { key: 'tempWaterExistingMains', label: 'Temporary water connection (off site off existing mains)' },
                    { key: 'waterInfraCharges', label: 'Water infrastructure charges (2025-2026 rate per plot)' },
                    { key: 'waterConnectionCharges', label: 'Water connection charges – connection to the offsite main' },
                    { key: 'boundaryWaterBox', label: 'Boundary water box provision' },
                    { key: 'fireServiceHydrant', label: 'Fire service hydrant' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.water[item.key]}
                        onChange={(e) => handleInclusionChange('water', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* ELECTRIC */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">ELECTRIC</h3>
                  {[
                    { key: 'ashpLoadAllowance', label: 'Provision of Air Source Heat Pump load within o/a POC load' },
                    { key: 'meterManagement', label: 'Management of meter installation on your behalf' },
                    { key: 'substationPlant', label: 'Substation plant' },
                    { key: 'substationEnclosure', label: 'Substation enclosure' },
                    { key: 'substationPlinth', label: 'Substation plinth construction' },
                    { key: 'earthingStudy', label: 'Substation earthing study' },
                    { key: 'tempElectricNewMains', label: 'Temp electric supply (on site off new mains)' },
                    { key: 'tempElectricExistingMains', label: 'Temp electric supply (off site off existing mains)' },
                    { key: 'tempKiosk', label: 'Temp kiosk/termination point – provision and install' },
                    { key: 'interimLV', label: 'Interim LV supply (pre-substation energisation supply)' },
                    { key: 'pumpingStation', label: 'Pumping station supply' },
                    { key: 'multiOccupancy', label: 'Multi occupancy supply install (MSDB, trunking and isolators)' },
                    { key: 'evChargingAllowance', label: 'EV Charging load allowance' },
                    { key: 'pvGenerationAllowance', label: 'PV/generation device, allowance included in DNO application' },
                    { key: 'electricMeterBox', label: 'Electric recessed meter box provision' },
                    { key: 'electricPlotDucting', label: 'Electric plot service ducting provision' },
                    { key: 'hockeySticks', label: 'Hockey sticks and clips provision' },
                    { key: 'plotServiceProvision', label: 'Plot service provision (often excluded by competitors)' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.electric[item.key]}
                        onChange={(e) => handleInclusionChange('electric', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* GAS – now fully visible */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">GAS</h3>
                  {[
                    { key: 'gasMeterBoxesWallMounted', label: 'Gas meter boxes (WALL MOUNTED)' },
                    { key: 'gasServicePipe', label: 'Gas service pipe' },
                    { key: 'gasMainPipe', label: 'Gas main pipe' },
                    { key: 'gasMetersSmartDumb', label: 'Gas meters (smart or dumb)' },
                    { key: 'gasTapeOnsite', label: 'Gas marker tape for on-site pipes (mains only)' },
                    { key: 'gasTapeOffsite', label: 'Gas marker tape for off-site pipes (mains only)' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.gas[item.key]}
                        onChange={(e) => handleInclusionChange('gas', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* GENERAL – now fully visible */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">GENERAL</h3>
                  {[
                    { key: 'tempWaterCompound', label: 'Temporary water supply (compound/sales etc)' },
                    { key: 'tempElectricCompound', label: 'Temporary electric supply (1ph or 3ph, compound /sales etc)' },
                    { key: 'onsiteMainsExcavation', label: 'Onsite mains excavation (including provisions)' },
                    { key: 'onsiteServiceBays', label: 'Onsite service connection bays' },
                    { key: 'layOnsiteMains', label: 'Lay only onsite mains, including sand and tape' },
                    { key: 'siteEntranceDiversions', label: 'Site entrance diversions' },
                    { key: 'trafficManagementCosts', label: 'Traffic management costs' },
                    { key: 'streetworksNotices', label: 'Streetworks notices for all off site works' },
                    { key: 'utilityInfraDesign', label: 'Utility infrastructure design' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={formData.tenderInclusions.general[item.key]}
                        onChange={(e) => handleInclusionChange('general', item.key, e.target.checked)}
                        className="h-5 w-5 text-blue-600 mr-3"
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* MISCELLANEOUS – added after GENERAL */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">MISCELLANEOUS</h3>
                  {[
                    {
                      key: 'mpanNumbers',
                      label: 'Request and forwarding of MPAN numbers (electric)',
                      comment: 'Electric meter management is often excluded by others',
                    },
                    {
                      key: 'onsiteDuctingPlan',
                      label: 'Onsite ducting plan available after acceptance – inclusive of drainage consideration. Offered on request',
                      comment: '',
                    },
                    {
                      key: 'testingCommissioning',
                      label: 'Testing and commissioning of all installed equipment',
                      comment: '',
                    },
                    {
                      key: 'asLaidRecords',
                      label: 'As laid records for installed networks – constantly updated',
                      comment: '',
                    },
                  ].map(item => (
                    <div key={item.key} className="flex flex-col mb-4">
                      <div className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          checked={formData.tenderInclusions.miscellaneous[item.key]}
                          onChange={(e) => handleInclusionChange('miscellaneous', item.key, e.target.checked)}
                          className="h-5 w-5 text-blue-600 mr-3"
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.comment && (
                        <p className="text-sm text-gray-600 pl-8">{item.comment}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Streetlighting, Telecomms, Gas, General, Miscellaneous similarly */}
              </div>
            )}
          </div>

          {/* 7. Air Source Heat Pumps */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('heatPumps')}>
              Air Source Heat Pumps {openSections.heatPumps ? '▲' : '▼'}
            </h2>
            {openSections.heatPumps && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">No. of plots with air source heat pump</label>
                  <input value={formData.airSourceHeatPumps.numPlots} onChange={(e) => setFormData(prev => ({ ...prev, airSourceHeatPumps: { ...prev.airSourceHeatPumps, numPlots: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Plot numbers</label>
                  <input value={formData.airSourceHeatPumps.plotNumbers} onChange={(e) => setFormData(prev => ({ ...prev, airSourceHeatPumps: { ...prev.airSourceHeatPumps, plotNumbers: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Data sheet provided</label>
                  <input type="checkbox" checked={formData.airSourceHeatPumps.dataSheet} onChange={(e) => setFormData(prev => ({ ...prev, airSourceHeatPumps: { ...prev.airSourceHeatPumps, dataSheet: e.target.checked } }))} className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pump Model</label>
                  <input value={formData.airSourceHeatPumps.pumpModel} onChange={(e) => setFormData(prev => ({ ...prev, airSourceHeatPumps: { ...prev.airSourceHeatPumps, pumpModel: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">ASHP load allowance per plot</label>
                  <input value={formData.airSourceHeatPumps.loadAllowance} onChange={(e) => setFormData(prev => ({ ...prev, airSourceHeatPumps: { ...prev.airSourceHeatPumps, loadAllowance: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
              </div>
            )}
          </div>

          

          {/* 8. NON-CONTESTABLE NETWORK CHARGES */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('nonContestable')}>
              NON-CONTESTABLE NETWORK CHARGES {openSections.nonContestable ? '▲' : '▼'}
            </h2>
            {openSections.nonContestable && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Electric POC cost</label>
                  <input value={formData.nonContestableCharges.electricPOC} onChange={(e) => setFormData(prev => ({ ...prev, nonContestableCharges: { ...prev.nonContestableCharges, electricPOC: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Water POC – incumbent connection charges</label>
                  <input value={formData.nonContestableCharges.waterPOC} onChange={(e) => setFormData(prev => ({ ...prev, nonContestableCharges: { ...prev.nonContestableCharges, waterPOC: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Water infrastructure fees</label>
                  <input value={formData.nonContestableCharges.waterInfra} onChange={(e) => setFormData(prev => ({ ...prev, nonContestableCharges: { ...prev.nonContestableCharges, waterInfra: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                {/* Add remaining fields similarly */}
              </div>
            )}
          </div>

          {/* 9. DELIVERY STANDARDS */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('delivery')}>
              DELIVERY STANDARDS {openSections.delivery ? '▲' : '▼'}
            </h2>
            {openSections.delivery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Call off (via call off sheet)</label>
                  <input value={formData.deliveryStandards.serviceCallOff} onChange={(e) => setFormData(prev => ({ ...prev, deliveryStandards: { ...prev.deliveryStandards, serviceCallOff: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                {/* Add other delivery fields */}
              </div>
            )}
          </div>

          {/* 10. CONSTRUCTION ASSUMPTIONS */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('assumptions')}>
              CONSTRUCTION ASSUMPTIONS {openSections.assumptions ? '▲' : '▼'}
            </h2>
            {openSections.assumptions && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Site specific assumptions</label>
                  <textarea value={formData.constructionAssumptions.siteSpecific} onChange={(e) => setFormData(prev => ({ ...prev, constructionAssumptions: { ...prev.constructionAssumptions, siteSpecific: e.target.value } }))} className="w-full p-3 border rounded-lg h-32" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">General terms and conditions</label>
                  <textarea value={formData.constructionAssumptions.generalTerms} onChange={(e) => setFormData(prev => ({ ...prev, constructionAssumptions: { ...prev.constructionAssumptions, generalTerms: e.target.value } }))} className="w-full p-3 border rounded-lg h-32" />
                </div>
              </div>
            )}
          </div>

          {/* 11. Responsibilities */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('responsibilities')}>
              Responsibilities {openSections.responsibilities ? '▲' : '▼'}
            </h2>
            {openSections.responsibilities && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer Responsibilities</label>
                  <textarea value={formData.responsibilities.customer} onChange={(e) => setFormData(prev => ({ ...prev, responsibilities: { ...prev.responsibilities, customer: e.target.value } }))} className="w-full p-3 border rounded-lg h-32" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">AU Responsibilities</label>
                  <textarea value={formData.responsibilities.au} onChange={(e) => setFormData(prev => ({ ...prev, responsibilities: { ...prev.responsibilities, au: e.target.value } }))} className="w-full p-3 border rounded-lg h-32" />
                </div>
              </div>
            )}
          </div>

          {/* 12. Legal Documentation */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('legal')}>
              Legal Documentation {openSections.legal ? '▲' : '▼'}
            </h2>
            {openSections.legal && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Customer contact for general queries</label>
                  <input value={formData.legalDocumentation.customerContact} onChange={(e) => setFormData(prev => ({ ...prev, legalDocumentation: { ...prev.legalDocumentation, customerContact: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Landowner Details</label>
                  <input value={formData.legalDocumentation.landownerDetails} onChange={(e) => setFormData(prev => ({ ...prev, legalDocumentation: { ...prev.legalDocumentation, landownerDetails: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Solicitors acting for landowner</label>
                  <input value={formData.legalDocumentation.solicitors} onChange={(e) => setFormData(prev => ({ ...prev, legalDocumentation: { ...prev.legalDocumentation, solicitors: e.target.value } }))} className="w-full p-3 border rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* 13. Payment Terms */}
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('payment')}>
              Payment Terms {openSections.payment ? '▲' : '▼'}
            </h2>
            {openSections.payment && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Terms</label>
                <textarea value={formData.paymentTerms} onChange={handleChange} name="paymentTerms" className="w-full p-3 border rounded-lg h-32" />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-12">
            <button type="button" onClick={() => navigate('/admin/quotations')} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-10 py-3 rounded-lg text-white font-medium transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {loading ? 'Creating...' : 'Create Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationCreate;