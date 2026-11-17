import React, { useState } from 'react';
import { 
  Search, 
  FileCode, 
  Layers, 
  ShieldCheck, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Cpu,
  BookOpen
} from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'Analyze',
    tag: 'Source Audit & Scoping',
    icon: Search,
    color: '#38bdf8',
    summary: 'We review your source files, asset hierarchy, requirements, and target retail platforms.',
    deliverables: ['Manuscript & Asset Audit', 'Semantic Structure Scoping', 'Multi-Retailer Specifications']
  },
  {
    num: '02',
    title: 'Plan',
    tag: 'Specifications & Rules',
    icon: FileCode,
    color: '#818cf8',
    summary: 'We agree on conversion specifications, custom CSS style rules, accessibility tags, and timelines.',
    deliverables: ['House Style Guide Matching', 'Custom CSS Architecture', 'Accessibility Compliance Plan']
  },
  {
    num: '03',
    title: 'Produce',
    tag: 'EPUB 3 / KPF Conversion',
    icon: Layers,
    color: '#00f2fe',
    summary: 'Our specialist compositors convert, format, and structure your content with semantic precision.',
    deliverables: ['Reflowable / Fixed-Layout EPUB 3', 'Clean HTML5 & MathML', 'Amazon KPF / MOBI Build']
  },
  {
    num: '04',
    title: 'Validate',
    tag: 'EPUBCheck & Device QA',
    icon: ShieldCheck,
    color: '#10b981',
    summary: 'Automated EPUBCheck validation, physical Kindle/iPad cross-device QA, and screen reader tests.',
    deliverables: ['Zero-Error EPUBCheck', 'Physical Device Verification', 'Screen Reader Auditing']
  },
  {
    num: '05',
    title: 'Deliver',
    tag: 'Certified Retail Release',
    icon: Rocket,
    color: '#f59e0b',
    summary: 'Final publication-ready files delivered strictly on time with embedded ONIX metadata and QA reports.',
    deliverables: ['Retail-Ready Distribution Files', 'Embedded ONIX 3.0 Metadata', 'Comprehensive QA Audit Report']
  }
];

export default function EpublishingProductionWheel() {
  const [activeIdx, setActiveIdx] = useState(2); // Default to '03 Produce' at start

  const activeStage = stages[activeIdx];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="epub-wheel-container">
      {/* DESKTOP CIRCULAR ORBITAL SHOWCASE */}
      <div className="epub-wheel-desktop" aria-hidden="false">
        {/* SVG Orbital Track & Connection Flow Lines */}
        <svg className="epub-wheel-svg" viewBox="0 0 680 540" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Ambient Core Backdrop */}
          <circle cx="340" cy="270" r="160" fill="url(#centerCoreGlow)" />

          {/* Main Orbital Track Rings */}
          <circle cx="340" cy="270" r="215" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="340" cy="270" r="145" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="3 6" />

          {/* Vector Flow Connector Polygon linking the 5 Nodes sequentially */}
          {/* Node 1: (180, 100), Node 2: (500, 100), Node 3: (565, 330), Node 4: (340, 480), Node 5: (115, 330) */}
          <path
            d="M 180 100 L 500 100 L 565 330 L 340 480 L 115 330 Z"
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.55"
          />

          {/* Radial Rays from Center Hub to each Node */}
          <line x1="340" y1="270" x2="180" y2="100" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="270" x2="500" y2="100" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="270" x2="565" y2="330" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="270" x2="340" y2="480" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="270" x2="115" y2="330" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
        </svg>

        {/* 1. CENTRAL PRODUCTION CORE HUB */}
        <div className="epub-wheel-center-hub" role="region" aria-label="Velvora Production Hub">
          <div className="center-hub-pulse-ring" aria-hidden="true" />
          <div className="center-hub-inner">
            <span className="center-hub-icon-wrap">
              <Cpu size={24} className="accent" />
            </span>
            <span className="center-hub-title">PRODUCTION</span>
            <span className="center-hub-sub">ePublishing Core</span>
            <span className="center-hub-badge">5-Stage Continuous Cycle</span>
          </div>
        </div>

        {/* 2. FIVE ORBITING NODES (Calculated 5-point layout) */}
        {stages.map((stage, idx) => {
          const NodeIcon = stage.icon;
          const isActive = activeIdx === idx;
          return (
            <div
              key={stage.num}
              className={`epub-wheel-node epub-wheel-node--${idx + 1} ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Stage ${stage.num}: ${stage.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx(idx);
              }}
            >
              <div className="node-badge-row">
                <span className="node-num-pill">{stage.num}</span>
                <span className="node-icon-bubble">
                  <NodeIcon size={16} />
                </span>
              </div>
              <h4 className="node-title">{stage.title}</h4>
              <span className="node-tag">{stage.tag}</span>
            </div>
          );
        })}
      </div>

      {/* 3. ACTIVE STAGE INSPECTOR BAR (Full Rich Details with Zero Empty Void) */}
      <div className="epub-stage-detail-panel">
        <div className="detail-panel-left">
          <div className="detail-panel-badge-row">
            <span className="detail-panel-num">{activeStage.num}</span>
            <span className="detail-panel-icon">
              <ActiveIcon size={20} />
            </span>
            <div>
              <span className="detail-panel-eyebrow">Active Stage Protocol</span>
              <h3 className="detail-panel-title">{activeStage.title}</h3>
            </div>
          </div>
          <p className="detail-panel-desc">{activeStage.summary}</p>
        </div>

        <div className="detail-panel-right">
          <span className="detail-deliverables-heading">Stage Deliverables:</span>
          <div className="detail-deliverables-pills">
            {activeStage.deliverables.map((item, i) => (
              <span key={i} className="detail-pill">
                <CheckCircle2 size={13} className="pill-check" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. QUICK STAGE SELECTOR TABS (1-Click Switcher for All Viewports) */}
      <div className="epub-stage-selector-bar" role="tablist" aria-label="ePublishing Stages">
        {stages.map((stage, idx) => {
          const TabIcon = stage.icon;
          const isActive = activeIdx === idx;
          return (
            <button
              key={stage.num}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`epub-stage-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-num">{stage.num}</span>
              <TabIcon size={14} className="tab-icon" />
              <span className="tab-title">{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* 5. MOBILE RESPONSIVE INTERCONNECTED VERTICAL PIPELINE (For Small Screens) */}
      <div className="epub-wheel-mobile">
        <div className="mobile-hub-banner">
          <div className="mobile-hub-img-circle">
            <img
              src="/hero-epublishing.jpg"
              alt="Velvora ePublishing Production Core"
              className="mobile-hub-img"
            />
            <span className="mobile-hub-img-glow" aria-hidden="true" />
          </div>
          <div className="mobile-hub-text-wrap">
            <h4 className="mobile-hub-title">PRODUCTION CORE</h4>
            <span className="mobile-hub-subtitle">Disciplined 5-Stage Lifecycle</span>
          </div>
        </div>

        <ol className="mobile-stage-list">
          {stages.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isActive = activeIdx === idx;
            return (
              <li
                key={stage.num}
                className={`mobile-stage-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="mobile-stage-spine" aria-hidden="true">
                  <span className="spine-dot">{stage.num}</span>
                  {idx < stages.length - 1 && <span className="spine-line" />}
                </div>
                <div className="mobile-stage-content">
                  <div className="mobile-stage-header">
                    <span className="mobile-stage-icon">
                      <StageIcon size={15} />
                    </span>
                    <h4 className="mobile-stage-title">{stage.title}</h4>
                    <span className="mobile-stage-tag">{stage.tag}</span>
                  </div>
                  <p className="mobile-stage-desc">{stage.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
