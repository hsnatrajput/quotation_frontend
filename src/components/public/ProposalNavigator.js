// src/components/public/ProposalNavigator.js
import React, { useState, useEffect, useRef } from 'react';

const ProposalNavigator = ({ steps = [], onAllReviewed }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reviewed, setReviewed]       = useState({});
  const [animating, setAnimating]     = useState(false);
  const [direction, setDirection]     = useState('forward');
  const contentRef = useRef(null);
  const tabBarRef  = useRef(null);

  const totalSteps    = steps.length;
  const reviewedCount = Object.keys(reviewed).length;
  const allReviewed   = totalSteps > 0 && reviewedCount === totalSteps;
  const pct           = totalSteps > 0 ? Math.round((reviewedCount / totalSteps) * 100) : 0;

  useEffect(() => {
    if (allReviewed && onAllReviewed) onAllReviewed();
  }, [allReviewed, onAllReviewed]);

  if (!steps || steps.length === 0) return null;

  const safeStep          = Math.min(currentStep, totalSteps - 1);
  const isCurrentReviewed = !!reviewed[safeStep];

  const goTo = (index, dir = 'forward') => {
    if (animating || index === safeStep) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setAnimating(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      // scroll active tab into view
      if (tabBarRef.current) {
        const activeBtn = tabBarRef.current.querySelector('.pnav-tab.active');
        if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 260);
  };

  const goNext       = () => { if (safeStep < totalSteps - 1) goTo(safeStep + 1, 'forward'); };
  const goPrev       = () => { if (safeStep > 0) goTo(safeStep - 1, 'back'); };
  const markReviewed = () => setReviewed(prev => ({ ...prev, [safeStep]: true }));

  const slideStyle = {
    transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1), opacity 0.26s ease',
    transform: animating
      ? (direction === 'forward' ? 'translateX(24px)' : 'translateX(-24px)')
      : 'translateX(0)',
    opacity: animating ? 0 : 1,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..60,400;12..60,500;12..60,600;12..60,700;12..60,800&family=Lato:wght@300;400;700&display=swap');

        /* ── root ── */
        .pnav-root {
          background: #f5f2ee;
          padding: 56px 0 72px;
          font-family: 'Lato', sans-serif;
        }
        .pnav-inner { max-width: 1100px; margin: 0 auto; padding: 0 28px; }

        /* ── intro ── */
        .pnav-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff3ee; border: 1px solid #f9c4ad;
          border-radius: 999px; padding: 5px 16px; margin-bottom: 14px;
        }
        .pnav-pill-dot  { width:7px; height:7px; border-radius:50%; background:#e8622a; display:inline-block; }
        .pnav-pill-text { color:#c24e1e; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; font-family:'Bricolage Grotesque',sans-serif; }
        .pnav-heading   { font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(26px,3vw,38px); font-weight:800; color:#1c1917; margin:0 0 6px; line-height:1.15; }
        .pnav-subtext   { color:#78716c; font-size:15px; margin:0 0 28px; }

        /* ── card ── */
        .pnav-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e7e2da;
          box-shadow: 0 4px 28px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        /* ── TAB BAR (top row) ── */
        .pnav-tabbar-wrap {
          background: #fdfaf7;
          border-bottom: 1px solid #ede8e0;
          padding: 0 28px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pnav-tabbar-wrap::-webkit-scrollbar { display: none; }

        .pnav-tabbar {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0;
          min-width: max-content;
        }

        .pnav-tab {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 16px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all .18s ease;
          white-space: nowrap;
          font-family: 'Lato', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #a09890;
          position: relative;
          flex-shrink: 0;
        }
        .pnav-tab:hover  { color: #44403c; background: rgba(232,98,42,0.04); }
        .pnav-tab.active { color: #e8622a; border-bottom-color: #e8622a; font-weight: 700; }
        .pnav-tab.done   { color: #16a34a; }
        .pnav-tab.done.active { color: #e8622a; border-bottom-color: #e8622a; }

        .pnav-tab-num {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          background: #ede8e0; color: #a09890;
          transition: all .18s ease;
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .pnav-tab.active .pnav-tab-num { background: #e8622a; color: #fff; box-shadow: 0 2px 8px rgba(232,98,42,.35); }
        .pnav-tab.done   .pnav-tab-num { background: #22c55e; color: #fff; }
        .pnav-tab.done.active .pnav-tab-num { background: #e8622a; color: #fff; }

        /* ── progress bar under tabs ── */
        .pnav-prog-bar {
          height: 3px;
          background: #ede8e0;
          overflow: hidden;
        }
        .pnav-prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #e8622a, #f5a070);
          transition: width .5s cubic-bezier(.4,0,.2,1);
        }

        /* ── content head ── */
        .pnav-content-head {
          padding: 24px 32px 20px;
          border-bottom: 1px solid #f5f0ea;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          background: linear-gradient(to bottom, #fffbf8, #fff);
        }
        .pnav-head-left { display: flex; align-items: center; gap: 14px; }
        .pnav-badge {
          width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, #e8622a, #f5a070);
          color: #fff; font-size: 20px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(232,98,42,.3);
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .pnav-head-sub {
          font-size: 11px; font-weight: 700; letter-spacing: .09em;
          text-transform: uppercase; color: #c2a898; margin: 0 0 3px;
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .pnav-head-title {
          font-size: 20px; font-weight: 800; color: #1c1917; margin: 0;
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .pnav-reviewed-chip {
          display: flex; align-items: center; gap: 6px;
          background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 999px; padding: 6px 14px;
          font-size: 13px; font-weight: 700; color: #16a34a;
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        /* ── content scroll ── */
        .pnav-scroll {
          min-height: 300px;
          max-height: 660px;
          overflow-y: auto;
          padding: 32px 32px;
        }
        .pnav-scroll::-webkit-scrollbar { width: 5px; }
        .pnav-scroll::-webkit-scrollbar-track { background: #faf7f4; }
        .pnav-scroll::-webkit-scrollbar-thumb { background: #e8c4ad; border-radius: 3px; }

        /* ── footer ── */
        .pnav-footer {
          padding: 18px 32px;
          border-top: 1px solid #f0ebe4;
          background: #fdfaf8;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .pnav-footer-center { display: flex; align-items: center; gap: 12px; }
        .pnav-progress-label { font-size: 13px; color: #a09890; font-family: 'Lato', sans-serif; }
        .pnav-progress-label strong { color: #e8622a; }

        /* ── footer buttons ── */
        .pnav-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 11px 22px; border-radius: 10px;
          font-size: 14px; font-weight: 700;
          font-family: 'Bricolage Grotesque', sans-serif;
          cursor: pointer; transition: all .18s ease;
        }
        .pnav-btn-prev {
          border: 1.5px solid #e0d9d2; background: #fff; color: #78716c;
        }
        .pnav-btn-prev:hover:not(:disabled) { background: #f7f3ef; border-color: #c8bfb5; color: #292524; }
        .pnav-btn-prev:disabled { opacity: .3; cursor: not-allowed; }
        .pnav-btn-next {
          border: none;
          background: linear-gradient(135deg, #e8622a, #f5a070);
          color: #fff;
          box-shadow: 0 3px 12px rgba(232,98,42,.28);
        }
        .pnav-btn-next:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(232,98,42,.4); }
        .pnav-btn-next:disabled { background: #e7e2da; color: #b5a99f; box-shadow: none; cursor: not-allowed; }
        .pnav-btn-mark {
          border: 2px solid #e8622a; background: #fff; color: #e8622a;
        }
        .pnav-btn-mark:hover { background: #e8622a; color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(232,98,42,.28); }

        .pnav-status { display: flex; align-items: center; gap: 9px; }
        .pnav-status-text { font-size: 14px; font-weight: 700; color: #16a34a; font-family: 'Bricolage Grotesque', sans-serif; }
        .pnav-tag { font-size: 12px; font-weight: 600; padding: 3px 11px; border-radius: 999px; font-family: 'Bricolage Grotesque', sans-serif; }
        .pnav-tag-remaining { background: #f5f0ea; color: #a09890; }
        .pnav-tag-done { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; }

        /* ── all done banner ── */
        .pnav-done-banner {
          margin-top: 18px; padding: 18px 24px;
          background: linear-gradient(135deg,#f0fdf4,#f5fef8);
          border: 1px solid #bbf7d0; border-radius: 14px;
          display: flex; align-items: center; gap: 14px;
        }
        .pnav-done-icon { width:44px; height:44px; border-radius:12px; background:#22c55e; color:#fff; font-size:20px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .pnav-done-title { margin:0 0 2px; font-weight:700; font-size:15px; color:#15803d; font-family:'Bricolage Grotesque',sans-serif; }
        .pnav-done-sub   { margin:0; font-size:13px; color:#5aab84; }
      `}</style>

      <div className="pnav-root">
        <div className="pnav-inner">

          {/* Intro */}
          <div className="pnav-pill">
            <span className="pnav-pill-dot" />
            <span className="pnav-pill-text">Proposal Details</span>
          </div>
          <h2 className="pnav-heading">Review Your Quotation</h2>
          <p className="pnav-subtext">Work through each section and mark it as reviewed before accepting.</p>

          {/* Card */}
          <div className="pnav-card">

            {/* ── TAB BAR ── */}
            <div className="pnav-tabbar-wrap" ref={tabBarRef}>
              <div className="pnav-tabbar">
                {steps.map((step, i) => {
                  const isActive = i === safeStep;
                  const isDone   = !!reviewed[i];
                  return (
                    <button
                      key={i}
                      className={`pnav-tab${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                      onClick={() => goTo(i, i > safeStep ? 'forward' : 'back')}
                    >
                      <span className="pnav-tab-num">{isDone ? '✓' : i + 1}</span>
                      {step.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress bar */}
            <div className="pnav-prog-bar">
              <div className="pnav-prog-fill" style={{ width: `${pct}%` }} />
            </div>

            {/* Content header */}
            <div className="pnav-content-head">
              <div className="pnav-head-left">
                <div className="pnav-badge">{safeStep + 1}</div>
                <div>
                  <p className="pnav-head-sub">Section {safeStep + 1} of {totalSteps}</p>
                  <h3 className="pnav-head-title">{steps[safeStep].label}</h3>
                </div>
              </div>
              {isCurrentReviewed && (
                <div className="pnav-reviewed-chip">✓ Reviewed</div>
              )}
            </div>

            {/* Scrollable content */}
            <div ref={contentRef} className="pnav-scroll" style={slideStyle}>
              {steps[safeStep].component}
            </div>

            {/* Footer */}
            <div className="pnav-footer">
              <button className="pnav-btn pnav-btn-prev" onClick={goPrev} disabled={safeStep === 0}>
                ← Previous
              </button>

              <div className="pnav-footer-center">
                {!isCurrentReviewed ? (
                  <button className="pnav-btn pnav-btn-mark" onClick={markReviewed}>
                    ✓ Mark as Reviewed
                  </button>
                ) : (
                  <div className="pnav-status">
                    <span className="pnav-status-text">✓ Reviewed</span>
                    {!allReviewed
                      ? <span className="pnav-tag pnav-tag-remaining">{totalSteps - reviewedCount} left</span>
                      : <span className="pnav-tag pnav-tag-done">🎉 All done!</span>
                    }
                  </div>
                )}
                <span className="pnav-progress-label">
                  <strong>{pct}%</strong> complete
                </span>
              </div>

              <button className="pnav-btn pnav-btn-next" onClick={goNext} disabled={safeStep === totalSteps - 1}>
                Next →
              </button>
            </div>
          </div>

          {/* All done banner */}
          {allReviewed && (
            <div className="pnav-done-banner">
              <div className="pnav-done-icon">🎉</div>
              <div>
                <p className="pnav-done-title">All sections reviewed!</p>
                <p className="pnav-done-sub">Scroll down to review and accept this proposal.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ProposalNavigator;