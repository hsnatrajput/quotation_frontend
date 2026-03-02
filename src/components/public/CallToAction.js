// src/components/public/CallToAction.js
import React, { useState } from 'react';

const CallToAction = ({ onAccept, allReviewed = false }) => {
  const [agreed, setAgreed] = useState(false);
  const canAccept = agreed && allReviewed;

  const handleAccept = () => {
    if (!canAccept) return;
    if (onAccept) onAccept();
  };

  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(160deg, #fff8f4 0%, #fff 50%, #f8f7f4 100%)',
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        .cta-card { background:#fff; border-radius:24px; overflow:hidden; border:1px solid #e8e3dc; box-shadow:0 8px 40px rgba(0,0,0,0.08); }
        .cta-accept:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(232,98,42,0.4) !important; }
        .cta-accept:disabled { opacity:0.45; cursor:not-allowed; }
        .cta-ask:hover { background:#fff8f4 !important; transform:translateY(-1px); }
        .cta-label { display:inline-flex; align-items:flex-start; gap:12px; cursor:pointer; text-align:left;
          background:#fdf8f5; border-radius:12px; padding:14px 18px;
          border:1px solid #f0e4da; max-width:480px; }
        .cta-label:hover { background:#fdf2eb; }
      `}</style>

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="cta-card">

          {/* Top accent */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #e8622a, #f0955f)' }} />

          <div style={{ padding: 'clamp(32px,5vw,60px)', textAlign: 'center' }}>

            {/* Icon */}
            <div style={{
              width: '68px', height: '68px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #fff2ec, #fde8d8)',
              border: '1px solid #f5cbb8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 24px',
            }}>🤝</div>

            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(26px,4vw,40px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#2d2520',
              marginBottom: '14px',
            }}>
              Ready to Move Forward?
            </h2>

            <p style={{
              color: '#7a6e68', fontSize: 'clamp(14px,2vw,17px)',
              lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 32px',
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}>
              Accept this quotation today and let our team start delivering reliable,
              hassle-free utility solutions for your project.
            </p>

            {/* Lock notice when not all reviewed */}
            {!allReviewed && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff8f0', border: '1px solid #f5d0b8',
                borderRadius: '10px', padding: '10px 18px', marginBottom: '24px',
              }}>
                <span style={{ fontSize: '16px' }}>🔒</span>
                <span style={{ color: '#c2693a', fontSize: '13px', fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Review all sections above to unlock this form
                </span>
              </div>
            )}

            {/* Checkbox */}
            <label className="cta-label" style={{ margin: '0 auto 28px', display: 'flex' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                disabled={!allReviewed}
                style={{ marginTop: '2px', width: '18px', height: '18px', accentColor: '#e8622a', cursor: allReviewed ? 'pointer' : 'not-allowed', flexShrink: 0 }}
              />
              <span style={{ color: '#7a6e68', fontSize: '14px', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                I have read and agree to the{' '}
                <a href="#" style={{ color: '#e8622a', textDecoration: 'none', fontWeight: 600 }}>Terms & Conditions</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#e8622a', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>.
              </span>
            </label>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '28px' }}>
              <button
                className="cta-accept"
                onClick={handleAccept}
                disabled={!canAccept}
                style={{
                  padding: '15px 36px', borderRadius: '12px', border: 'none',
                  background: canAccept ? 'linear-gradient(135deg, #e8622a, #f0955f)' : '#e8e3dc',
                  color: canAccept ? '#fff' : '#b5a99f',
                  fontSize: '16px', fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  cursor: canAccept ? 'pointer' : 'not-allowed',
                  transition: 'all 0.25s ease',
                  boxShadow: canAccept ? '0 4px 18px rgba(232,98,42,0.3)' : 'none',
                  minWidth: '200px',
                }}
              >
                {allReviewed ? '✓ Accept This Proposal' : '🔒 Locked'}
              </button>

              <a
                href="mailto:info@airutilities.co.uk?subject=Question%20about%20Quotation"
                className="cta-ask"
                style={{
                  padding: '15px 28px', borderRadius: '12px',
                  border: '1px solid #e0d9d2',
                  color: '#7a6e68', fontSize: '15px', fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  textDecoration: 'none',
                  transition: 'all 0.2s ease', display: 'inline-flex',
                  alignItems: 'center', gap: '8px', background: '#fff',
                }}
              >
                ✉ Ask a Question
              </a>
            </div>

            {/* Trust signals */}
            <div style={{
              borderTop: '1px solid #f0ebe4', paddingTop: '20px',
              display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',
            }}>
              {[
                { icon: '📞', text: '0330 058 0252' },
                { icon: '✉', text: 'info@airutilities.co.uk' },
                { icon: '⚡', text: 'Responds within 1 hour' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  color: '#b5a99f', fontSize: '13px', fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;