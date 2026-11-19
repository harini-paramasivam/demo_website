import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  BookOpen, 
  RefreshCw, 
  Layers, 
  Sparkles, 
  Compass, 
  Check, 
  Target,
  Cpu,
  FileCheck2,
  Award,
  Globe2,
  Binary,
  Zap,
  TrendingUp
} from 'lucide-react';
import { PageHero } from '../components/ui.jsx';

const values = [
  {
    title: 'Quality',
    tagline: 'Zero-Defect Delivery Engine',
    desc: 'We check our work twice with automated Schematron validators and multi-tier human-in-the-loop QA so you never have to worry about production errors.',
    badge: '99.98% SLA Accuracy',
    icon: CheckCircle2,
    themeClass: 'why-val-card--quality',
    highlights: ['Schematron QA validation', 'Double-pass human review', 'Strict audit trails'],
  },
  {
    title: 'Inclusion',
    tagline: 'Universal Design for Every Human',
    desc: 'Accessibility is not an afterthought or an add-on for us. It is our founding standard, verified directly with native assistive screen reader technology.',
    badge: 'WCAG 2.2 AAA & PDF/UA',
    icon: HeartHandshake,
    themeClass: 'why-val-card--inclusion',
    highlights: ['Screen reader native testing', 'Universal cognitive UX', 'Assistive tech certified'],
  },
  {
    title: 'Integrity',
    tagline: 'Radical Transparency & Accountability',
    desc: 'We say what we do and do what we say. Transparent timelines, clear pricing, and court-defensible compliance reports you can stake your enterprise reputation on.',
    badge: 'Court-Defensible VPATs',
    icon: ShieldCheck,
    themeClass: 'why-val-card--integrity',
    highlights: ['Defensible ACR documentation', 'Ironclad NDAs & IP security', 'Clear fixed deliverables'],
  },
  {
    title: 'Collaboration',
    tagline: 'An Extension of Your Internal Team',
    desc: 'We operate as an agile extension of your team, adopting your workflows, delivery tools, and communication channels seamlessly.',
    badge: 'Dedicated Squad Model',
    icon: Layers,
    themeClass: 'why-val-card--collaboration',
    highlights: ['Direct engineer communication', 'Agile sprint sync', 'Scalable capacity'],
  },
  {
    title: 'Continuous Learning',
    tagline: 'Pioneering Standards & Frontier AI',
    desc: 'Standards and technology evolve constantly. We invest in continuous R&D, IAAP credentials, and ethical AI tools to keep clients ahead.',
    badge: 'R&D & AI Lab',
    icon: RefreshCw,
    themeClass: 'why-val-card--learning',
    highlights: ['Weekly standards review', 'IAAP WAS credentials', 'Ethical AI lab'],
  },
];

const accreditations = [
  { name: 'W3C Conformance', desc: 'WCAG 2.1 & 2.2 AA Conformance', icon: Globe2 },
  { name: 'IAAP Specialists', desc: 'Certified Accessibility Professionals', icon: Award },
  { name: 'ISO 14289-1', desc: 'PDF/UA Document Compliance', icon: FileCheck2 },
  { name: 'Section 508 & ADA', desc: 'Court-Defensible VPAT 2.4 Reports', icon: ShieldCheck },
  { name: 'EAA 2025 Ready', desc: 'European Accessibility Act Directive', icon: Zap },
  { name: 'NISO JATS & BITS', desc: 'Journal & Book DTD Schema Validation', icon: Binary },
];

export default function CompanyOverview() {
  useEffect(() => {
    document.title = 'About Velvora Solutions | Company Overview';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Velvora Solutions"
        crumbs={['Home', 'About Us', 'Company Overview']}
      >
        Transforming content and data into structured, accessible, and digital-ready assets for organizations worldwide.
      </PageHero>

      {/* WHO WE ARE & MISSION / VISION WITH HIGH-TECH GRAPHIC ECOSYSTEM */}
      <section className="section">
        <div className="container">
          <div className="split split--top" style={{ alignItems: 'center', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div className="prose">
              <span className="badge-eyebrow">
                <Sparkles size={16} /> Content &amp; Technology Services
              </span>
              <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>Who We Are</h2>
              <p className="lead" style={{ color: '#334155', lineHeight: 1.75 }}>
                Velvora Solutions is a content and technology services company that helps publishers, educational institutions, government bodies, and enterprises transform their content and data into structured, accessible, and digital-ready assets. We specialize in ePublishing, XML, digital accessibility, AI automation, software development, data analytics, and digital marketing. Every project we deliver reflects technical depth, process discipline, and genuine care for quality.
              </p>

              <div style={{ marginTop: '2.5rem' }}>
                <span className="badge-eyebrow">
                  <Compass size={16} /> The Velvora Advantage
                </span>
                <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>What Sets Us Apart</h2>
                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.75 }}>
                  We combine publishing know-how with accessibility and technology expertise. Many vendors do only one of these. At Velvora, the same team understands how a book is built, how a screen reader reads it, and how automation or marketing can amplify it—so the files, systems, and campaigns we deliver work in the real world, not just in a checker.
                </p>
              </div>

              {/* MISSION & VISION CALLOUT CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '2rem' }}>
                <div className="company-callout-card" style={{ borderLeftColor: '#0284c7' }}>
                  <div className="company-callout-card__badge" style={{ color: '#0284c7' }}>
                    <Target size={18} className="company-callout-card__icon" />
                    <span>Core Purpose</span>
                  </div>
                  <h3 className="company-callout-card__title">Our Mission</h3>
                  <p className="company-callout-card__text">
                    To make content accessible, discoverable, and usable for every reader, regardless of ability, device, or platform.
                  </p>
                </div>

                <div className="company-callout-card" style={{ borderLeftColor: '#f59e0b' }}>
                  <div className="company-callout-card__badge" style={{ color: '#f59e0b' }}>
                    <Compass size={18} className="company-callout-card__icon" style={{ color: '#f59e0b' }} />
                    <span>Future Horizon</span>
                  </div>
                  <h3 className="company-callout-card__title">Our Vision</h3>
                  <p className="company-callout-card__text">
                    To be the most trusted partner for publishers and organizations building inclusive digital content and smarter workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* HIGH-TECH 3D SVG ARCHITECTURE ECOSYSTEM GRAPHIC */}
            <div className="company-ecosystem-visual" aria-hidden="true">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8' }}>
                  ⚡ Velvora Operational Topology
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '999px', color: '#e0f2fe' }}>
                  Live Verified Pipeline
                </span>
              </div>

              <svg viewBox="0 0 520 370" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-ecosystem-svg">
                <defs>
                  <linearGradient id="ecoPulseCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="ecoPulseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="ecoPulseEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="ecoPulsePurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="ecoGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Perspective Orbit Rings */}
                <ellipse cx="260" cy="185" rx="200" ry="110" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="4 6" />
                <ellipse cx="260" cy="185" rx="140" ry="75" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.2" strokeDasharray="3 5" />

                {/* Cyber Connecting Vectors */}
                <line x1="260" y1="185" x2="84" y2="77" stroke="url(#ecoPulseCyan)" strokeWidth="2" strokeDasharray="4 4" filter="url(#ecoGlow)" />
                <line x1="260" y1="185" x2="436" y2="77" stroke="url(#ecoPulseEmerald)" strokeWidth="2" strokeDasharray="4 4" filter="url(#ecoGlow)" />
                <line x1="260" y1="185" x2="84" y2="293" stroke="url(#ecoPulseGold)" strokeWidth="2" strokeDasharray="4 4" filter="url(#ecoGlow)" />
                <line x1="260" y1="185" x2="436" y2="293" stroke="url(#ecoPulsePurple)" strokeWidth="2" strokeDasharray="4 4" filter="url(#ecoGlow)" />

                {/* Central Hub: Velvora Neural Core */}
                <g filter="url(#ecoGlow)">
                  <circle cx="260" cy="185" r="48" fill="rgba(6, 14, 34, 0.96)" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="260" cy="185" r="42" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="260" cy="158" r="3.5" fill="#38bdf8" />
                </g>
                <text x="260" y="181" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800" letterSpacing="0.06em">VELVORA</text>
                <text x="260" y="197" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="700" letterSpacing="0.05em">NEURAL CORE</text>

                {/* Satellite Node 1: Publishing & XML (Top Left) */}
                <g filter="url(#ecoGlow)">
                  <rect x="16" y="40" width="136" height="74" rx="13" fill="rgba(8, 16, 38, 0.94)" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="33" cy="59" r="7" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="1.4" />
                </g>
                <text x="47" y="63" fill="#ffffff" fontSize="10" fontWeight="800">Publishing &amp; XML</text>
                <text x="25" y="85" fill="#38bdf8" fontSize="8.5" fontWeight="700">JATS 1.3 · EPUB 3.3</text>
                <text x="25" y="100" fill="#94a3b8" fontSize="8" fontWeight="500">Automated Schematron</text>

                {/* Satellite Node 2: Accessibility Labs (Top Right) */}
                <g filter="url(#ecoGlow)">
                  <rect x="368" y="40" width="136" height="74" rx="13" fill="rgba(8, 16, 38, 0.94)" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="385" cy="59" r="7" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.4" />
                </g>
                <text x="399" y="63" fill="#ffffff" fontSize="10" fontWeight="800">Accessibility</text>
                <text x="377" y="85" fill="#34d399" fontSize="8.5" fontWeight="700">WCAG 2.2 AA / AAA</text>
                <text x="377" y="100" fill="#94a3b8" fontSize="8" fontWeight="500">PDF/UA · VPAT 2.4</text>

                {/* Satellite Node 3: Enterprise AI (Bottom Left) */}
                <g filter="url(#ecoGlow)">
                  <rect x="16" y="256" width="136" height="74" rx="13" fill="rgba(8, 16, 38, 0.94)" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="33" cy="275" r="7" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.4" />
                </g>
                <text x="47" y="279" fill="#ffffff" fontSize="10" fontWeight="800">AI Automation</text>
                <text x="25" y="301" fill="#fbbf24" fontSize="8.5" fontWeight="700">Human-in-the-Loop</text>
                <text x="25" y="316" fill="#94a3b8" fontSize="8" fontWeight="500">Document Parsing</text>

                {/* Satellite Node 4: Cloud Platforms (Bottom Right) */}
                <g filter="url(#ecoGlow)">
                  <rect x="368" y="256" width="136" height="74" rx="13" fill="rgba(8, 16, 38, 0.94)" stroke="#c084fc" strokeWidth="1.5" />
                  <circle cx="385" cy="275" r="7" fill="rgba(192, 132, 252, 0.25)" stroke="#c084fc" strokeWidth="1.4" />
                </g>
                <text x="399" y="279" fill="#ffffff" fontSize="10" fontWeight="800">Software &amp; Web</text>
                <text x="377" y="301" fill="#c084fc" fontSize="8.5" fontWeight="700">Enterprise APIs</text>
                <text x="377" y="316" fill="#94a3b8" fontSize="8" fontWeight="500">Accessible Web Apps</text>
              </svg>

              {/* FLOATING TELEMETRY SPEC CHIPS */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.2rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 650, padding: '4px 10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#e2e8f0' }}>
                  ✓ 99.98% SLA Accuracy
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 650, padding: '4px 10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#e2e8f0' }}>
                  ✓ 100% WCAG 2.2 Conformance
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 650, padding: '4px 10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#e2e8f0' }}>
                  ✓ Court-Defensible VPATs
                </span>
              </div>
            </div>
          </div>

          {/* GLOBAL ACCREDITATIONS & STANDARDS STRIP */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="badge-eyebrow accreditation-head-badge">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Regulatory &amp; Technical Conformance</span>
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', margin: '0.3rem 0 0 0' }}>
                Standards We Engineer To
              </h3>
            </div>

            <div className="accreditation-strip">
              {accreditations.map((acc) => {
                const AccIcon = acc.icon;
                return (
                  <div key={acc.name} className="accreditation-pill">
                    <span className="accreditation-pill__icon">
                      <AccIcon size={18} />
                    </span>
                    <div className="accreditation-pill__body">
                      <div className="accreditation-pill__title">{acc.name}</div>
                      <div className="accreditation-pill__desc">{acc.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES (HIGH-TECH GLASSMORPHIC CARDS WITH DEDICATED DOMAIN THEMES - NEVER PLAIN) */}
      <section className="section why-section-dark netbg">
        <div className="container">
          <div className="sec-head sec-head--dark">
            <p className="eyebrow">Guiding Principles</p>
            <h2>Our Values</h2>
            <p className="lead">How we think, work, and collaborate with our clients every single day.</p>
          </div>

          <ul className="why">
            {values.map((v) => {
              const IconCmp = v.icon;
              return (
                <li key={v.title} className={`why__card ${v.themeClass}`}>
                  <div>
                    <div className="why-val-card__top">
                      <div className="why-val-card__head-row">
                        <span className="why__icon">
                          <IconCmp size={22} aria-hidden="true" />
                        </span>
                        <div className="why-val-card__head-text">
                          <div className="why-val-card__title-row">
                            <h3 className="why-val-card__title">{v.title}</h3>
                            <span className="why-val-card__pill">
                              {v.badge}
                            </span>
                          </div>
                          <div className="why-val-card__tagline" style={{ color: v.color }}>
                            {v.tagline}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p>{v.desc}</p>
                  </div>

                  {v.highlights && (
                    <div className="why-val-card__highlights">
                      {v.highlights.map((h, i) => (
                        <span key={i} className="why-val-card__chip">
                          <Check size={13} style={{ color: v.color }} />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
