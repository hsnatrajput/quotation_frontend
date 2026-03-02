// src/components/public/QuotationSummary.js
import React from 'react';

const QuotationSummary = ({ quotation }) => {
  const {
    projectTitle = 'Project Title',
    siteAddress  = 'Site Address',
    customerName = 'Customer Name',
    jobType      = [],
    subtotal     = 0,
    vatRate      = 20,
    vatAmount    = 0,
    totalAmount  = 0,
    validUntil   = 'N/A',
    items        = [],
  } = quotation || {};

  const fmt = (n) => Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2 });

  return (
    <div style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* Hero banner — warm orange gradient matching navigator */}
      <div style={{
        background: 'linear-gradient(135deg, #e8622a 0%, #c24e1e 100%)',
        borderRadius: '14px',
        padding: '28px 32px',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', right:'-30px', top:'-30px', width:'160px', height:'160px', borderRadius:'50%', background:'rgba(255,255,255,0.07)' }} />
        <div style={{ position:'absolute', right:'80px', bottom:'-50px', width:'110px', height:'110px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
        <h3 style={{
          color: '#fff', fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 800,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          margin: '0 0 12px', lineHeight: 1.2, position: 'relative',
        }}>
          {jobType.length > 0 ? jobType.join(' + ') : 'General'} Job – {projectTitle}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: '0 0 5px', position: 'relative' }}>
          Site: {siteAddress}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0, position: 'relative' }}>
          Prepared for: <strong style={{ color: '#fff', fontWeight: 700 }}>{customerName}</strong>
        </p>
      </div>

      {/* Items table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ede8e0' }}>
              <th style={{
                padding: '12px 0', textAlign: 'left', fontSize: '12px', fontWeight: 700,
                color: '#a09890', textTransform: 'uppercase', letterSpacing: '.08em',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}>Service</th>
              <th style={{
                padding: '12px 0', textAlign: 'right', fontSize: '12px', fontWeight: 700,
                color: '#a09890', textTransform: 'uppercase', letterSpacing: '.08em',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}>Amount (£)</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ padding: '24px 0', color: '#a09890', fontSize: '14px', textAlign: 'center' }}>
                  No items listed.
                </td>
              </tr>
            ) : items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f5f0ea' }}>
                <td style={{ padding: '15px 0', fontSize: '15px', color: '#44403c' }}>
                  {item.serviceName || item.name || 'Unnamed Service'}
                </td>
                <td style={{ padding: '15px 0', textAlign: 'right', fontSize: '15px', fontWeight: 600, color: '#1c1917' }}>
                  £{fmt(item.totalPrice || item.price || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ marginTop: '24px', borderTop: '2px solid #ede8e0', paddingTop: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: '15px', color: '#78716c' }}>
          <span>Subtotal</span>
          <span style={{ fontWeight: 600, color: '#1c1917' }}>£{fmt(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: '15px', color: '#78716c', borderTop: '1px solid #f5f0ea' }}>
          <span>VAT ({vatRate}%)</span>
          <span style={{ fontWeight: 600, color: '#1c1917' }}>£{fmt(vatAmount)}</span>
        </div>

        {/* Total highlight */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'linear-gradient(135deg, #fff3ee, #fff8f4)',
          border: '1.5px solid #f9c4ad',
          borderRadius: '12px', padding: '18px 22px', marginTop: '14px',
        }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#1c1917', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Total Amount
          </span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#e8622a', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            £{fmt(totalAmount)}
          </span>
        </div>

        <p style={{
          marginTop: '14px', textAlign: 'center', fontSize: '13px', color: '#a09890',
          background: '#f5f2ee', borderRadius: '8px', padding: '9px 14px',
        }}>
          Valid until <strong style={{ color: '#78716c' }}>{validUntil}</strong>. Prices exclude third-party fees unless stated.
        </p>
      </div>
    </div>
  );
};

export default QuotationSummary;