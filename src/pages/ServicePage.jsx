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
  const [openIdx, setOpenIdx] = useState(0); // 1st Q&A opened by default!

  return (
    <div className="faq-list">
      {items.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={f.q || idx} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
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

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={s.title}
        crumbs={['Services', s.title]}
      >
        {s.overview}
      </PageHero>

      <section className="section">
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
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} className="accent" aria-hidden="true" />
                  Standards We Work To
                </h3>
                <p>{s.standards}</p>
              </div>
            )}

            {/* WHAT WE OFFER - Categorized or Card list */}
            {s.whatWeOffer && (
              <div style={{ marginTop: '3rem' }}>
                <h3 className="section-subtitle">What We Offer</h3>
                <div className="svc-offers-grid">
                  {s.whatWeOffer.map((item, idx) => {
                    const { IconCmp, color } = getOfferIcon(item.title || item.category, idx);
                    return item.category ? (
                      <div key={item.category} className="svc-offer-cat">
                        <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                          <IconCmp size={22} />
                        </div>
                        <h4>{item.category}</h4>
                        <ul className="bullets">
                          {item.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div key={item.title || idx} className="svc-offer-card">
                        <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                          <IconCmp size={22} />
                        </div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-SERVICES (Digital Accessibility: EPUB 3, EPUB 2, Web, PDF, Word, PPT, Excel) */}
            {s.subServices && (
              <div style={{ marginTop: '3.5rem' }}>
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

            {/* TRAINING PROGRAMS (for Training & Consulting) */}
            {s.trainingPrograms && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Training Programs</h3>
                <div className="svc-offers-grid">
                  {s.trainingPrograms.map((tp, idx) => {
                    const { IconCmp, color } = getOfferIcon(tp.name, idx);
                    return (
                      <div key={tp.name} className="svc-offer-card">
                        <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                          <IconCmp size={22} />
                        </div>
                        <h4>{tp.name}</h4>
                        <p>{tp.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {s.trainingFormats && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <h4>Training Formats</h4>
                    <ul className="bullets">
                      {s.trainingFormats.map((tf) => (
                        <li key={tf}>{tf}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {s.consultingServices && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <h4>Consulting Services</h4>
                    <div className="svc-offers-grid" style={{ marginTop: '1rem' }}>
                      {s.consultingServices.map((cs, idx) => {
                        const { IconCmp, color } = getOfferIcon(cs.title, idx);
                        return (
                          <div key={cs.title} className="svc-offer-card">
                            <div className={`svc-offer-card__icon svc-offer-card__icon--${color}`}>
                              <IconCmp size={22} />
                            </div>
                            <h5>{cs.title}</h5>
                            <p>{cs.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROCESS */}
            {s.process && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Our Process</h3>
                <ol className="svc-process-list">
                  {s.process.map((p, idx) => {
                    const cleanTitle = p.step.replace(/^\d+[\.\s\-]+/, '');
                    return (
                      <li key={idx} className="svc-process-item">
                        <div className="svc-process-header">
                          <span className="step-num">{String(idx + 1).padStart(2, '0')}</span>
                          <h4 className="svc-process-title">{cleanTitle}</h4>
                        </div>
                        <p className="svc-process-desc">{p.desc}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {/* WHY VELVORA / BENEFITS / WHY IT MATTERS */}
            {s.whyVelvora && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Why Velvora</h3>
                <ul className="bullets">
                  {s.whyVelvora.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {s.benefits && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Benefits</h3>
                <ul className="bullets">
                  {s.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {s.whyItMatters && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Why It Matters</h3>
                <div className="svc-offers-grid">
                  {s.whyItMatters.map((m) => (
                    <div key={m.title} className="svc-offer-card">
                      <h4>{m.title}</h4>
                      <p>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHO IT'S FOR / SUBJECTS */}
            {s.whoItsFor && (
              <div className="callout-card" style={{ marginTop: '2.5rem' }}>
                <h4>Who It&apos;s For</h4>
                <p>{s.whoItsFor}</p>
              </div>
            )}

            {s.subjects && (
              <div className="callout-card" style={{ marginTop: '2.5rem' }}>
                <h4>Subjects We Handle</h4>
                <p>{s.subjects}</p>
              </div>
            )}

            {s.whatParticipantsGet && (
              <div style={{ marginTop: '2.5rem' }}>
                <h4>What Participants Get</h4>
                <ul className="bullets">
                  {s.whatParticipantsGet.map((pg) => (
                    <li key={pg}>{pg}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQS */}
            {s.faqs && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={22} className="accent" aria-hidden="true" />
                  Frequently Asked Questions
                </h3>
                <FaqAccordion items={s.faqs} />
              </div>
            )}

            {/* ACTION BUTTON */}
            <div style={{ marginTop: '3rem' }}>
              <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="btn btn--orange btn--lg">
                {s.buttonText || 'Request a Quote'} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
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

      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
