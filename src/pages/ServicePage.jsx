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
            {/* SUB-SERVICES (Digital Accessibility: EPUB 3, EPUB 2, Web, PDF, Word, PPT, Excel) */}
            {s.subServices && (
              <div style={{ marginBottom: '3.5rem' }}>
                <h3 className="section-subtitle">Our Accessibility Services</h3>
                <div className="subservices-list">
                  {s.subServices.map((sub) => (
                    <div key={sub.id} id={sub.id} className="subservice-block">
                      <div className="subservice-header">
                        <h4>{sub.title}</h4>
                        <p className="lead">{sub.overview}</p>
                      </div>
                      <h5>What We Do</h5>
                      <ul className="bullets">
                        {sub.whatWeDo.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
            <div className="svc-audience-matrix-wrap" style={{ marginTop: '3rem' }}>
              {s.whoItsFor && (
                <div className="svc-audience-box">
                  <div className="svc-offer-card__head" style={{ marginBottom: '8px' }}>
                    <div className="svc-offer-card__icon svc-offer-card__icon--indigo" style={{ width: '36px', height: '36px' }}>
                      <Users size={18} />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Who It&apos;s For</h4>
                  </div>
                  <p style={{ margin: 0, color: '#334155', fontSize: '1rem', lineHeight: 1.65 }}>{s.whoItsFor}</p>
                </div>
              )}

              {s.subjects && (
                <div className="svc-audience-box">
                  <div className="svc-offer-card__head" style={{ marginBottom: '8px' }}>
                    <div className="svc-offer-card__icon svc-offer-card__icon--purple" style={{ width: '36px', height: '36px' }}>
                      <BookOpen size={18} />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Subjects We Handle</h4>
                  </div>
                  <p style={{ margin: 0, color: '#334155', fontSize: '1rem', lineHeight: 1.65 }}>{s.subjects}</p>
                </div>
              )}

              {s.whatParticipantsGet && (
                <div className="svc-audience-box">
                  <div className="svc-offer-card__head" style={{ marginBottom: '8px' }}>
                    <div className="svc-offer-card__icon svc-offer-card__icon--amber" style={{ width: '36px', height: '36px' }}>
                      <Award size={18} />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>What Participants Get</h4>
                  </div>
                  <ul className="bullets" style={{ marginTop: '6px' }}>
                    {s.whatParticipantsGet.map((pg) => (
                      <li key={pg}>{pg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
              <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0, maxWidth: '600px' }}>
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
