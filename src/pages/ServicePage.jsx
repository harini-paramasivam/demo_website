import { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Layers,
  FileCheck2,
  Users,
  BarChart3,
  Bot,
  BrainCircuit,
  Code,
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  Zap,
  Activity,
  Target,
  Award,
  BookOpen,
  Building2,
  FileCode,
  Palette,
  Sigma,
  Bookmark,
  ScanText,
  Video,
  Megaphone,
  Workflow,
  Rocket,
  Check,
} from 'lucide-react';
import { services } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { PageHero, CtaBand } from '../components/ui.jsx';

function getSubServiceMeta(id = '') {
  switch (id) {
    case 'epub-3':
      return {
        IconComp: BookOpen,
        color: 'blue',
        tag: 'EPUB Accessibility 1.1',
        standardBadge: 'WCAG 2.2 AA / AAA Verified',
        highlight: 'Modern Semantic E-Book Publishing'
      };
    case 'epub-2':
      return {
        IconComp: FileCode,
        color: 'cyan',
        tag: 'Backlist Modernization',
        standardBadge: 'EPUB 3 Upgrade & Conformance',
        highlight: 'Catalogue Remediation & DAISY QA'
      };
    case 'web':
      return {
        IconComp: Globe,
        color: 'emerald',
        tag: 'Web & Portal Compliance',
        standardBadge: 'WCAG 2.1 & 2.2 Level AA / AAA',
        highlight: 'Screen Reader & Keyboard Verification'
      };
    case 'pdf':
      return {
        IconComp: FileCheck2,
        color: 'rose',
        tag: 'Document Remediation',
        standardBadge: 'PDF/UA & ISO 14289-1 Standard',
        highlight: 'PAC & Matterhorn Conformance Verified'
      };
    case 'word':
      return {
        IconComp: ScanText,
        color: 'indigo',
        tag: 'Source Authoring Systems',
        standardBadge: 'Accessible Enterprise Templates',
        highlight: 'Structural Hierarchy & Heading Rules'
      };
    case 'powerpoint':
      return {
        IconComp: Palette,
        color: 'amber',
        tag: 'Presentation Deck QA',
        standardBadge: 'Magnification & Screen Reader Ready',
        highlight: 'Visual Structure, Contrast & Transcripts'
      };
    case 'excel':
      return {
        IconComp: BarChart3,
        color: 'purple',
        tag: 'Data Workbook Architecture',
        standardBadge: 'Accessible Spreadsheet Formatting',
        highlight: 'Semantic Cell Scopes & Formula Audit'
      };
    default:
      return {
        IconComp: ShieldCheck,
        color: 'blue',
        tag: 'Universal Accessibility',
        standardBadge: 'WCAG 2.2 AA Standard',
        highlight: 'Full Digital Conformance Audit'
      };
  }
}

function getOfferIcon(title = '', idx = 0) {
  const t = title.toLowerCase();
  if (t.includes('bi') || t.includes('dashboard') || t.includes('analytics') || t.includes('report')) {
    return { IconCmp: BarChart3, color: 'blue' };
  }
  if (t.includes('pipeline') || t.includes('etl') || t.includes('database') || t.includes('data')) {
    return { IconCmp: Cpu, color: 'indigo' };
  }
  if (t.includes('ai') || t.includes('model') || t.includes('predictive') || t.includes('forecast')) {
    return { IconCmp: BrainCircuit, color: 'purple' };
  }
  if (t.includes('automate') || t.includes('automation') || t.includes('bot')) {
    return { IconCmp: Bot, color: 'cyan' };
  }
  if (t.includes('clean') || t.includes('normalize') || t.includes('qa') || t.includes('audit')) {
    return { IconCmp: Sparkles, color: 'emerald' };
  }
  if (t.includes('conversion') || t.includes('roi') || t.includes('growth') || t.includes('telemetry')) {
    return { IconCmp: Zap, color: 'amber' };
  }
  if (t.includes('seo') || t.includes('marketing') || t.includes('campaign')) {
    return { IconCmp: Megaphone, color: 'rose' };
  }
  if (t.includes('epub') || t.includes('book') || t.includes('print')) {
    return { IconCmp: BookOpen, color: 'blue' };
  }
  if (t.includes('xml') || t.includes('schema') || t.includes('tag')) {
    return { IconCmp: FileCode, color: 'cyan' };
  }
  if (t.includes('accessib') || t.includes('screen reader') || t.includes('wcag')) {
    return { IconCmp: ShieldCheck, color: 'emerald' };
  }
  if (t.includes('typeset') || t.includes('design') || t.includes('layout')) {
    return { IconCmp: Palette, color: 'indigo' };
  }
  if (t.includes('math') || t.includes('equation') || t.includes('latex')) {
    return { IconCmp: Sigma, color: 'purple' };
  }
  if (t.includes('meta') || t.includes('index') || t.includes('taxonom')) {
    return { IconCmp: Bookmark, color: 'amber' };
  }
  if (t.includes('ocr') || t.includes('scan') || t.includes('digitiz')) {
    return { IconCmp: ScanText, color: 'emerald' };
  }
  if (t.includes('caption') || t.includes('transcription') || t.includes('audio') || t.includes('video')) {
    return { IconCmp: Video, color: 'rose' };
  }
  if (t.includes('web') || t.includes('software') || t.includes('app') || t.includes('dev')) {
    return { IconCmp: Code, color: 'indigo' };
  }

  // Fallback palette
  const fallbacks = [
    { IconCmp: Sparkles, color: 'cyan' },
    { IconCmp: Target, color: 'blue' },
    { IconCmp: Layers, color: 'indigo' },
    { IconCmp: Cpu, color: 'purple' },
    { IconCmp: Award, color: 'amber' },
    { IconCmp: CheckCircle2, color: 'emerald' },
    { IconCmp: Zap, color: 'rose' },
  ];
  return fallbacks[idx % fallbacks.length];
}

function FaqAccordion({ items = [] }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="faq-list">
      {items.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-item__btn"
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span>{f.q}</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s ease',
                  flexShrink: 0,
                }}
              />
            </button>
            {isOpen && (
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const [activeSubTab, setActiveSubTab] = useState(0);
  const s = services.find((x) => x.slug === slug || (x.aliases && x.aliases.includes(slug)));

  if (!s) return <Navigate to="/not-found" replace />;

  const others = services.filter((x) => x.slug !== s.slug);

  const hasBenefitsOrImpact = !!(
    s.subServices ||
    s.whyVelvora ||
    s.benefits ||
    s.whyItMatters ||
    s.whoItsFor ||
    s.subjects ||
    s.whatParticipantsGet
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* HEADER: PAGE HERO (STRICTLY DARK THEME)                                   */}
      {/* ========================================================================= */}
      <PageHero
        eyebrow="Specialized Practice"
        title={s.title}
        crumbs={['Services', s.title]}
      >
        {s.overview}
      </PageHero>

      {/* ========================================================================= */}
      {/* SECTION 1: SERVICE OVERVIEW & CORE DELIVERABLES (LIGHT THEME)            */}
      {/* ========================================================================= */}
      <section className="section section--paper svc-section-overview">
        <div className="container svc-layout">
          <div className="svc-main">
            {/* HEADING & OVERVIEW */}
            <div className="svc-header svc-header--glass">
              <div className="svc-header__bg-art" aria-hidden="true" />

              {/* Sleek Top Pill with Icon & Specialization Tag */}
              <div className="svc-header__top-bar">
                <div className="svc-header__icon-pill">
                  <span className="svc-header__icon-bubble">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="svc-header__tag-text">{s.title} Enterprise Practice</span>
                </div>
                <div className="svc-header__badge-pill">
                  <Sparkles size={14} className="accent" aria-hidden="true" />
                  <span>Velvora Certified Standard</span>
                </div>
              </div>

              {/* Full-Width Commanding Title */}
              <h2 className="svc-header__title">{s.heading}</h2>

              {/* Rich Lead Description */}
              <p className="svc-header__lead">{s.overview}</p>

              {/* Verified Value Highlight Chips */}
              <div className="svc-header__features">
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>Industry Standards Compliant</span>
                </div>
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>Human-in-the-Loop QA</span>
                </div>
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>Multi-Format Scalability</span>
                </div>
              </div>
            </div>

            {/* STANDARDS WE WORK TO (if available) */}
            {s.standards && (
              <div className="callout-card" style={{ margin: '2rem 0' }}>
                <div className="svc-offer-card__head" style={{ marginBottom: '8px' }}>
                  <div className="svc-offer-card__icon svc-offer-card__icon--emerald" style={{ width: '36px', height: '36px' }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>Standards We Work To</h3>
                </div>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.65 }}>{s.standards}</p>
              </div>
            )}

            {/* WHAT WE OFFER - Cards with Icon parallel to Title */}
            {s.whatWeOffer && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 className="section-subtitle">What We Offer</h3>
                <div className="svc-offers-grid">
                  {s.whatWeOffer.map((item, idx) => {
                    const { IconCmp, color } = getOfferIcon(item.title || item.category, idx);
                    return item.category ? (
                      <div key={item.category} className="svc-offer-cat">
                        <div className="svc-offer-card__head">
                          <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                            <IconCmp size={20} />
                          </div>
                          <h4 className="svc-offer-card__title">{item.category}</h4>
                        </div>
                        <ul className="bullets">
                          {item.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div key={item.title || idx} className="svc-offer-card">
                        <div className="svc-offer-card__head">
                          <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                            <IconCmp size={20} />
                          </div>
                          <h4 className="svc-offer-card__title">{item.title}</h4>
                        </div>
                        <p className="svc-offer-card__desc">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR: ALL SERVICES DIRECTORY */}
          <aside className="svc-sidebar" aria-label="Other services">
            <div className="svc-sidebar__card">
              <h3>All Services</h3>
              <ul className="svc-sidebar__list">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/services/${o.slug}`}>
                      <Icon name={o.icon} size={18} />
                      <span>{o.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc-sidebar__cta netbg">
              <h4>Let&apos;s Talk About Your Project</h4>
              <p>Tell us what you need, and we will suggest the right approach and share a free, no-obligation quote.</p>
              <Link to="/contact" className="btn btn--orange">
                Request a Free Quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PRODUCTION & DELIVERY PROCESS (DARK THEME)                     */}
      {/* ========================================================================= */}
      {s.process && (
        <section className="section why-section-dark netbg svc-section-process">
          <div className="container">
            <div className="sec-head sec-head--dark text-center" style={{ marginBottom: '3rem' }}>
              <p className="eyebrow" style={{ color: '#38bdf8' }}>
                <Workflow size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Delivery Methodology
              </p>
              <h2 style={{ color: '#ffffff', marginBottom: '14px' }}>Our Production &amp; Delivery Process</h2>

              {/* Attractive Icon with the Disciplined Lifecycle Line */}
              <div className="svc-process-lead-pill">
                <span className="svc-process-lead-icon-bubble">
                  <Sparkles size={16} />
                </span>
                <span className="svc-process-lead-text">
                  A disciplined lifecycle combining automated tooling with human subject-matter expertise.
                </span>
              </div>
            </div>

            <ol className="svc-process-list">
              {s.process.map((p, idx) => {
                const cleanTitle = p.step.replace(/^\d+[\.\s\-]+/, '');
                const stepIcons = [Search, FileCode, Layers, ShieldCheck, Rocket, Cpu, CheckCircle2, Zap];
                const StepIcon = stepIcons[idx % stepIcons.length];
                return (
                  <li key={idx} className="svc-process-item">
                    <div className="svc-process-header">
                      <span className="step-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="step-icon-bubble">
                        <StepIcon size={18} />
                      </span>
                      <h4 className="svc-process-title">{cleanTitle}</h4>
                    </div>
                    <p className="svc-process-desc">{p.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: STRATEGIC VALUE, BENEFITS & SUB-SERVICES (LIGHT THEME)         */}
      {/* ========================================================================= */}
      {hasBenefitsOrImpact && (
        <section className="section section--paper svc-section-benefits">
          <div className="container">
            {/* SUB-SERVICES BREAKDOWN (Digital Accessibility: EPUB 3, EPUB 2, Web, PDF, Word, PPT, Excel) */}
            {s.subServices && (
              <div className="subservices-hub-wrapper" style={{ marginBottom: '4rem' }}>
                <div className="subservices-hub-header">
                  <div className="subservices-hub-badge">
                    <ShieldCheck size={16} />
                    <span>Universal Accessibility Engineering</span>
                  </div>
                  <h3 className="subservices-hub-title">Specialized Formats &amp; Compliance Suites</h3>
                  <p className="subservices-hub-desc">
                    From digital publishing (EPUB 3/2) to enterprise web portals, PDFs, and Microsoft Office architectures, we remediate and certify every format to strict WCAG 2.2 Level AA / AAA and PDF/UA standards.
                  </p>
                </div>

                {/* Format Navigation Pill Tabs Bar */}
                <div className="subservices-nav-bar" role="tablist" aria-label="Accessibility Formats">
                  {s.subServices.map((sub, idx) => {
                    const meta = getSubServiceMeta(sub.id);
                    const MetaIcon = meta.IconComp;
                    const isActive = activeSubTab === idx;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`subservices-tab-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveSubTab(idx)}
                      >
                        <span className={`subservices-tab-icon subservices-tab-icon--${meta.color}`}>
                          <MetaIcon size={16} />
                        </span>
                        <span className="subservices-tab-title">{sub.title.replace(' Accessibility', '')}</span>
                        {isActive && <span className="subservices-tab-dot" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>

                {/* Active Spotlight Showcase Card */}
                {(() => {
                  const activeSub = s.subServices[activeSubTab] || s.subServices[0];
                  const activeMeta = getSubServiceMeta(activeSub.id);
                  const ActiveIcon = activeMeta.IconComp;

                  return (
                    <div className="subservices-spotlight-card" id={activeSub.id}>
                      <div className="subservices-spotlight-glow" aria-hidden="true" />

                      {/* Header */}
                      <div className="subservices-spotlight-head">
                        <div className="subservices-spotlight-brand">
                          <div className={`subservices-spotlight-icon-bubble subservices-spotlight-icon-bubble--${activeMeta.color}`}>
                            <ActiveIcon size={26} />
                          </div>
                          <div>
                            <div className="subservices-spotlight-tags">
                              <span className="subservices-chip-tag">{activeMeta.tag}</span>
                              <span className="subservices-chip-standard">
                                <Sparkles size={13} />
                                {activeMeta.standardBadge}
                              </span>
                            </div>
                            <h4 className="subservices-spotlight-title">{activeSub.title}</h4>
                          </div>
                        </div>

                        <Link
                          to={`/contact?subject=${encodeURIComponent(activeSub.title + ' Remediation Project')}`}
                          className="btn btn--orange subservices-spotlight-cta"
                        >
                          <span>Discuss {activeSub.title.split(' ')[0]} Project</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>

                      {/* Overview Box */}
                      <div className="subservices-overview-box">
                        <p className="subservices-overview-text">{activeSub.overview}</p>
                        <div className="subservices-overview-feature">
                          <Zap size={15} />
                          <span>{activeMeta.highlight}</span>
                        </div>
                      </div>

                      {/* Deliverables Checklist Grid */}
                      <div className="subservices-deliverables-wrap">
                        <div className="subservices-deliverables-header">
                          <div className="subservices-deliverables-label">
                            <CheckCircle2 size={16} style={{ color: '#059669' }} />
                            <span>Core Audit Protocols &amp; Conformance Deliverables</span>
                          </div>
                          <span className="subservices-deliverables-count">
                            {activeSub.whatWeDo.length} Verified Deliverables
                          </span>
                        </div>

                        <div className="subservices-deliverables-grid">
                          {activeSub.whatWeDo.map((item, wIdx) => {
                            const parts = item.includes(':') ? item.split(':') : [null, item];
                            return (
                              <div key={wIdx} className="subservices-deliverable-pod">
                                <span className="subservices-check-badge">
                                  <Check size={13} />
                                </span>
                                <div className="subservices-deliverable-body">
                                  {parts[0] ? (
                                    <>
                                      <strong className="subservices-deliverable-lead">{parts[0].trim()}:</strong>{' '}
                                      <span>{parts.slice(1).join(':').trim()}</span>
                                    </>
                                  ) : (
                                    <span>{item}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Format Overview Matrix Grid (All 7 formats at a glance) */}
                <div className="subservices-matrix-wrap">
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#070e24', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                    Browse All 7 Accessibility Engineering Suites
                  </h4>
                  <div className="subservices-matrix-grid">
                    {s.subServices.map((sub, idx) => {
                      const meta = getSubServiceMeta(sub.id);
                      const MetaIcon = meta.IconComp;
                      const isSel = activeSubTab === idx;
                      return (
                        <div
                          key={sub.id}
                          className={`subservices-matrix-card ${isSel ? 'is-active' : ''}`}
                          onClick={() => {
                            setActiveSubTab(idx);
                            document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                        >
                          <div className="subservices-matrix-card__head">
                            <span className={`subservices-matrix-card__icon-wrap subservices-tab-icon--${meta.color}`}>
                              <MetaIcon size={18} />
                            </span>
                            <span className="subservices-matrix-card__badge">{meta.tag}</span>
                          </div>
                          <h5 className="subservices-matrix-card__title">{sub.title}</h5>
                          <p className="subservices-matrix-card__snippet">{sub.overview}</p>
                          <span className="subservices-matrix-card__action">
                            <span>{isSel ? 'Active Protocol' : 'Inspect Protocols'}</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2-COLUMN STRATEGIC BENEFITS & ADVANTAGES SHOWCASE */}
            <div className="svc-benefits-showcase-grid">
              {/* Left Column: Verified Benefits */}
              {s.benefits && (
                <div className="svc-benefit-card">
                  <div className="svc-benefit-card__head">
                    <span className="svc-benefit-card__icon-wrap svc-benefit-card__icon-wrap--emerald">
                      <CheckCircle2 size={20} />
                    </span>
                    <h3 className="svc-benefit-card__title">Verified Delivery Benefits</h3>
                  </div>
                  <ul className="svc-benefit-checklist">
                    {s.benefits.map((b, i) => (
                      <li key={i} className="svc-benefit-checkitem">
                        <span className="svc-check-circle">
                          <Check size={14} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Right Column: Why Velvora */}
              {s.whyVelvora && (
                <div className="svc-benefit-card">
                  <div className="svc-benefit-card__head">
                    <span className="svc-benefit-card__icon-wrap svc-benefit-card__icon-wrap--blue">
                      <ShieldCheck size={20} />
                    </span>
                    <h3 className="svc-benefit-card__title">The Velvora Advantage</h3>
                  </div>
                  <ul className="svc-benefit-checklist">
                    {s.whyVelvora.map((w, i) => (
                      <li key={i} className="svc-benefit-checkitem">
                        <span className="svc-check-circle svc-check-circle--blue">
                          <Check size={14} />
                        </span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* WHY IT MATTERS - Cards with Icon parallel to Title */}
            {s.whyItMatters && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Why It Matters</h3>
                <div className="svc-offers-grid">
                  {s.whyItMatters.map((m, idx) => {
                    const { IconCmp, color } = getOfferIcon(m.title, idx);
                    return (
                      <div key={m.title} className="svc-offer-card">
                        <div className="svc-offer-card__head">
                          <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                            <IconCmp size={20} />
                          </div>
                          <h4 className="svc-offer-card__title">{m.title}</h4>
                        </div>
                        <p className="svc-offer-card__desc">{m.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AUDIENCE & TARGET SECTOR MATRIX */}
            {(s.whoItsFor || s.subjects || s.whatParticipantsGet) && (
              <div className="svc-audience-ecosystem" style={{ marginTop: '3.75rem' }}>
                <div className="svc-audience-head">
                  <div className="subservices-hub-badge" style={{ marginBottom: '0.85rem' }}>
                    <Users size={15} />
                    <span>Target Sectors &amp; Deployment Scope</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, color: '#070e24', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
                    Who This Architecture Empowers
                  </h3>
                  <p style={{ color: '#475569', fontSize: '1rem', margin: 0, maxWidth: '720px' }}>
                    Engineered for high-volume content producers, academic presses, institutional libraries, regulatory bodies, and global enterprise teams.
                  </p>
                </div>

                <div className="svc-audience-showcase-grid">
                  {s.whoItsFor && (
                    <div className="svc-audience-card svc-audience-card--primary">
                      <div className="svc-audience-card__header">
                        <span className="svc-audience-card__icon-bubble">
                          <Building2 size={22} />
                        </span>
                        <div>
                          <span className="svc-audience-card__tag">Verified Stakeholders</span>
                          <h4 className="svc-audience-card__title">Primary Industry Sectors</h4>
                        </div>
                      </div>

                      {/* Split into rich badges/chips */}
                      <div className="svc-audience-pills-wrap">
                        {s.whoItsFor.split(/,\s*(?:and\s+)?|\s+and\s+/).filter(Boolean).map((aud, aIdx) => (
                          <div key={aIdx} className="svc-audience-pill">
                            <span className="svc-audience-pill__dot" />
                            <span className="svc-audience-pill__text">{aud.trim().replace(/\.$/, '')}</span>
                          </div>
                        ))}
                      </div>

                      <p className="svc-audience-card__summary">{s.whoItsFor}</p>
                    </div>
                  )}

                  {/* Enterprise Assurance Graphic Pod */}
                  <div className="svc-audience-card svc-audience-card--assurance">
                    <div className="svc-audience-card__header">
                      <span className="svc-audience-card__icon-bubble svc-audience-card__icon-bubble--cyan">
                        <ShieldCheck size={22} />
                      </span>
                      <div>
                        <span className="svc-audience-card__tag">Enterprise Delivery</span>
                        <h4 className="svc-audience-card__title">Production Guarantees</h4>
                      </div>
                    </div>

                    <div className="svc-assurance-list">
                      <div className="svc-assurance-item">
                        <CheckCircle2 size={16} className="svc-assurance-check" />
                        <div>
                          <strong>Zero-Disruption Migration</strong>
                          <span>Seamless onboarding without interrupting active editorial or business workflows.</span>
                        </div>
                      </div>
                      <div className="svc-assurance-item">
                        <CheckCircle2 size={16} className="svc-assurance-check" />
                        <div>
                          <strong>Guaranteed Standards SLA</strong>
                          <span>100% compliance certified against international accessibility and XML schema benchmarks.</span>
                        </div>
                      </div>
                      <div className="svc-assurance-item">
                        <CheckCircle2 size={16} className="svc-assurance-check" />
                        <div>
                          <strong>Dedicated Solutions Architect</strong>
                          <span>Direct technical consultation, sprint reporting, and continuous quality assurance.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional subjects or participant outcomes if present */}
                {(s.subjects || s.whatParticipantsGet) && (
                  <div className="svc-audience-secondary-grid" style={{ marginTop: '1.5rem' }}>
                    {s.subjects && (
                      <div className="svc-audience-card">
                        <div className="svc-audience-card__header">
                          <span className="svc-audience-card__icon-bubble svc-audience-card__icon-bubble--purple">
                            <BookOpen size={20} />
                          </span>
                          <div>
                            <span className="svc-audience-card__tag">Domain Coverage</span>
                            <h4 className="svc-audience-card__title">Subjects &amp; Disciplines Handled</h4>
                          </div>
                        </div>
                        <p className="svc-audience-card__summary">{s.subjects}</p>
                      </div>
                    )}

                    {s.whatParticipantsGet && (
                      <div className="svc-audience-card">
                        <div className="svc-audience-card__header">
                          <span className="svc-audience-card__icon-bubble svc-audience-card__icon-bubble--amber">
                            <Award size={20} />
                          </span>
                          <div>
                            <span className="svc-audience-card__tag">Deliverables</span>
                            <h4 className="svc-audience-card__title">What Participants Receive</h4>
                          </div>
                        </div>
                        <ul className="bullets" style={{ marginTop: '8px' }}>
                          {s.whatParticipantsGet.map((pg) => (
                            <li key={pg}>{pg}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: FAQS & PROJECT CONSULTATION (DARK THEME)                      */}
      {/* ========================================================================= */}
      <section className="section why-section-dark netbg svc-section-faqs">
        <div className="container">
          {s.faqs && (
            <div>
              <div className="sec-head sec-head--dark text-center" style={{ marginBottom: '3rem' }}>
                <p className="eyebrow" style={{ color: '#38bdf8' }}>
                  <HelpCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  Expert Answers
                </p>
                <h2 style={{ color: '#ffffff' }}>Frequently Asked Questions</h2>
                <p className="lead" style={{ marginInline: 'auto', maxWidth: '640px', color: '#cbd5e1' }}>
                  Clear, transparent answers to help you evaluate and launch your project with confidence.
                </p>
              </div>
              <FaqAccordion items={s.faqs} />
            </div>
          )}

          {/* Action / Consultation Banner */}
          <div className="svc-faqs-action-banner">
            <div>
              <span className="badge-eyebrow" style={{ color: '#38bdf8', marginBottom: '8px' }}>
                <Sparkles size={16} /> Enterprise Advisory
              </span>
              <h3 style={{ color: '#ffffff', fontSize: '1.45rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                Ready to Get Started with {s.title}?
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: '1rem', margin: 0, maxWidth: '600px' }}>
                Our solutions architects will analyze your content requirements and propose a tailored delivery roadmap within 24 hours.
              </p>
            </div>
            <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="btn btn--orange btn--lg" style={{ whiteSpace: 'nowrap' }}>
              {s.buttonText || 'Request a Quote'} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CLOSING CTA BAND (STRICTLY DARK THEME)                                    */}
      {/* ========================================================================= */}
      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
