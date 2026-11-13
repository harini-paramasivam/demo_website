import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  FileCode, 
  Layers, 
  Sigma, 
  Tags, 
  ScanText, 
  Video, 
  FileCheck2, 
  ShieldCheck,
  GraduationCap, 
  Bot, 
  BarChart3, 
  Code, 
  Cpu, 
  Search, 
  Share2, 
  Target, 
  FileText, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';

const serviceGroups = [
  {
    id: 'group-1',
    themeClass: 'service-group-block--publishing',
    groupNum: 'Group 01',
    tagline: 'Scholarly Editorial Architecture & Schema',
    title: 'Publishing and XML',
    desc: 'Structured, future-ready workflows and multi-format delivery for academic books, journals, and global publications.',
    icon: BookOpen,
    specs: [
      'JATS 1.3 & BITS 2.1 Validated',
      'EPUB 3.3 Multi-Format Delivery',
      'Automated Schematron QA',
    ],
    items: [
      {
        title: 'ePublishing Services',
        desc: 'Conversion, formatting, and multi-format delivery in EPUB 2/3, accessible PDF, and digital web formats.',
        to: '/services/epublishing',
        icon: BookOpen,
        badge: 'EPUB 2 & 3 · Reflowable & Fixed',
      },
      {
        title: 'XML Services',
        desc: 'Structured XML creation, schema conversion, DTD normalization, and multichannel automated workflows.',
        to: '/services/xml',
        icon: FileCode,
        badge: 'JATS · BITS · DITA · TEI',
      },
    ],
  },
  {
    id: 'group-2',
    themeClass: 'service-group-block--content',
    groupNum: 'Group 02',
    tagline: 'High-Volume Production Lab & Composition',
    title: 'Content Services',
    desc: 'End-to-end editorial composition, mathematical typesetting, metadata tagging, digitization, and multimedia accessibility.',
    icon: Layers,
    specs: [
      'InDesign Page Layout Precision',
      'LaTeX & MathML STEM Equations',
      'Dublin Core & Schema.org Taxonomy',
      'Searchable OCR Archival Digitization',
      'Timed-Text WCAG 1.2 Captions',
    ],
    items: [
      {
        title: 'Typesetting and Design',
        desc: 'Professional page layout for books, journals, and reports with zero-error composition.',
        to: '/services/typesetting-and-design',
        icon: Layers,
        badge: 'InDesign · Page Layout · Print',
      },
      {
        title: 'Math and Equation Typesetting',
        desc: 'Accurate LaTeX and MathML formatting for high-complexity STEM monographs and journals.',
        to: '/services/math-and-equation-typesetting',
        icon: Sigma,
        badge: 'LaTeX · MathML · STEM Formulas',
      },
      {
        title: 'Metadata, Indexing and Taxonomy',
        desc: 'Semantic indexes, metadata schema, and subject tagging that maximize global discoverability.',
        to: '/services/metadata-indexing-and-taxonomy',
        icon: Tags,
        badge: 'Taxonomy · Schema.org · Discovery',
      },
      {
        title: 'OCR and Digitization',
        desc: 'Turn print books, journals, and legacy archives into crystal-clear, searchable digital content.',
        to: '/services/ocr-and-digitization',
        icon: ScanText,
        badge: 'Searchable PDF · Text Capture',
      },
      {
        title: 'Captioning, Transcription and Audio Description',
        desc: 'Accurate closed captions, transcripts, and synchronized audio description for multimedia.',
        to: '/services/captioning-transcription-and-audio-description',
        icon: Video,
        badge: 'Timed Text · WCAG 1.2 Video',
      },
    ],
  },
  {
    id: 'group-3',
    themeClass: 'service-group-block--accessibility',
    groupNum: 'Group 03',
    tagline: 'Universal Inclusion & Regulatory Conformance',
    liveBadge: '100% WCAG 2.2 AA Verified',
    title: 'Digital Accessibility',
    desc: 'Universal digital inclusion conforming strictly to WCAG 2.2 AA/AAA, PDF/UA (ISO 14289), Section 508, ADA Title III, and the European Accessibility Act (EAA).',
    icon: ShieldCheck,
    specs: [
      '100% WCAG 2.2 AA/AAA Guarantee',
      'PDF/UA (ISO 14289) Tagged Documents',
      'Assistive Tech Verified (NVDA, JAWS, VoiceOver)',
      'Court-Defensible VPAT 2.4 & ACR Reports',
    ],
    items: [
      {
        title: 'EPUB 3 Accessibility Remediation',
        desc: 'Semantic HTML5 structure, ARIA landmarks, MathML, and navigation document compliance for global e-books.',
        to: '/services/digital-accessibility#epub-3',
        icon: BookOpen,
        badge: 'EPUB 3.3 · EPUB Accessibility 1.1',
      },
      {
        title: 'PDF/UA & Document Remediation',
        desc: 'ISO 14289 and Section 508 accessible tagged PDFs, Word, Excel, and PowerPoint documents with logical reading order.',
        to: '/services/digital-accessibility#pdf',
        icon: FileText,
        badge: 'PDF/UA · Section 508 · PAC Verified',
      },
      {
        title: 'Web & Mobile App WCAG Audits',
        desc: 'Thorough manual and automated auditing conforming strictly to WCAG 2.1 & 2.2 Level A, AA, and AAA standards.',
        to: '/services/digital-accessibility#web-audits',
        icon: FileCheck2,
        badge: 'WCAG 2.2 Level AA / AAA',
      },
      {
        title: 'VPAT & Conformance Reports (ACR)',
        desc: 'Defensible compliance documentation prepared by certified IAAP specialists for enterprise and public procurement.',
        to: '/services/digital-accessibility#vpat',
        icon: ShieldCheck,
        badge: 'VPAT 2.4 · EAA 2025 · ADA Title III',
      },
    ],
  },
  {
    id: 'group-4',
    themeClass: 'service-group-block--it',
    groupNum: 'Group 04',
    tagline: 'Intelligent Neural Systems & IT Engineering',
    title: 'IT Services',
    desc: 'Intelligent automation, business telemetry dashboards, modern accessible web applications, and custom enterprise software.',
    icon: Cpu,
    specs: [
      'Enterprise Cloud & API Microservices',
      'Human-in-the-Loop AI Automation',
      'Real-Time Power BI Telemetry Dashboards',
    ],
    items: [
      {
        title: 'AI and Automation Services',
        desc: 'Practical AI pipelines, document parsing, and automated workflows with human-in-the-loop QA.',
        to: '/services/ai-automation',
        icon: Bot,
        badge: 'NLP · AI QA · Automated Flow',
      },
      {
        title: 'Business Intelligence and Data Analytics',
        desc: 'Telemetry dashboards and predictive analytics that transform raw data into executive decisions.',
        to: '/services/data-analytics',
        icon: BarChart3,
        badge: 'Executive Dashboards · ETL Pipelines',
      },
      {
        title: 'Website Development',
        desc: 'Modern, high-performance, and strictly accessible web applications tailored to your enterprise brand.',
        to: '/services/software-development',
        icon: Code,
        badge: 'Full-Stack · Accessible Web App',
      },
      {
        title: 'Software Development',
        desc: 'Custom enterprise applications, robust microservices, and secure cloud API integrations.',
        to: '/services/software-development',
        icon: Cpu,
        badge: 'Custom Architecture · Cloud APIs',
      },
    ],
  },
  {
    id: 'group-5',
    themeClass: 'service-group-block--marketing',
    groupNum: 'Group 05',
    tagline: 'Performance Growth Engine & ROI Telemetry',
    title: 'Digital Marketing',
    desc: 'Measurable audience expansion, authentic social campaigns, high-intent performance advertising, and executive ROI telemetry.',
    icon: TrendingUp,
    specs: [
      'High-Intent Technical SEO',
      'Targeted Multi-Channel PPC Campaigns',
      'Executive ROI & Attribution Telemetry',
    ],
    items: [
      {
        title: 'Technical SEO Optimization',
        desc: 'Structured schema metadata, search keyword architecture, and accessibility-compliant organic search rankings.',
        to: '/services/digital-marketing',
        icon: Search,
        badge: 'Technical SEO · Rich Snippets',
      },
      {
        title: 'Social Media Marketing',
        desc: 'Strategic B2B and consumer campaigns across LinkedIn, Twitter/X, Facebook, and Instagram.',
        to: '/services/digital-marketing',
        icon: Share2,
        badge: 'LinkedIn · Meta · X Channels',
      },
      {
        title: 'Paid Advertising Campaigns',
        desc: 'Targeted Google Ads, paid social ads, and programmatic display to drive qualified inbound conversions.',
        to: '/services/digital-marketing',
        icon: Target,
        badge: 'Google Ads · Targeted PPC',
      },
      {
        title: 'Content Marketing & Editorial',
        desc: 'Thought leadership articles, technical whitepapers, newsletters, and engaging brand narratives.',
        to: '/services/digital-marketing',
        icon: FileText,
        badge: 'Articles · Thought Leadership',
      },
      {
        title: 'Analytics & Attribution Reporting',
        desc: 'Custom telemetry dashboards and conversion tracking to measure exact ROI and campaign refinement.',
        to: '/services/digital-marketing',
        icon: TrendingUp,
        badge: 'Conversion Telemetry · Attribution',
      },
    ],
  },
];

export default function ServicesOverview() {
  useEffect(() => {
    document.title = 'Complete Content, Technology, and Marketing Services | Velvora Solutions';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Services Overview"
        title="Complete Content, Technology, and Marketing Services Under One Roof"
        crumbs={['Home', 'Services']}
      >
        From the first page layout to the final accessible file, and from manual workflows to automated insight and digital promotion, Velvora supports every stage of your content life cycle. Combine services in one project or choose only what you need.
      </PageHero>

      {/* OVERVIEW INTRODUCTION */}
      <section className="section section--paper">
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', marginInline: 'auto' }}>
          <span className="badge-eyebrow" style={{ justifyContent: 'center' }}>
            <Sparkles size={16} /> End-to-End Capabilities
          </span>
          <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>
            Complete Content, Technology, and Marketing Services Under One Roof
          </h2>
          <p className="lead" style={{ marginInline: 'auto', color: '#475569' }}>
            From the first page layout to the final accessible file, and from manual workflows to automated insight and digital promotion, Velvora supports every stage of your content life cycle. Combine services in one project or choose only what you need.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn--orange btn--lg">
              <span>Discuss Your Project</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 SERVICE GROUPS */}
      <section id="services-catalog" className="section why-section-dark netbg" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <div className="services-groups-wrapper">
            {serviceGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.id} className={`service-group-block ${group.themeClass}`}>
                  <div className="service-group-block__header">
                    <div className="service-group-block__top-strip">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span className="service-group-block__badge">
                          <GroupIcon size={16} />
                          <span>{group.groupNum}</span>
                        </span>
                        <span className="service-group-block__tagline">{group.tagline}</span>
                      </div>
                      {group.liveBadge && (
                        <span className="service-group-block__live-badge">
                          <span className="service-group-block__pulse-dot" />
                          <span>{group.liveBadge}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="service-group-block__title">{group.title}</h3>
                    <p className="service-group-block__desc">{group.desc}</p>

                    {group.specs && (
                      <div className="service-group-block__specs">
                        {group.specs.map((spec, sIdx) => (
                          <span key={sIdx} className="service-group-block__spec-chip">
                            <CheckCircle2 size={13} />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`service-group-block__grid ${group.items.length === 5 ? 'service-group-block__grid--5' : ''} ${group.items.length === 4 ? 'service-group-block__grid--4' : ''}`}>
                    {group.items.map((svc) => {
                      const SvcIcon = svc.icon;
                      return (
                        <article key={svc.title} className="service-overview-card">
                          <div className="service-overview-card__head">
                            <span className="service-overview-card__icon-wrap">
                              <SvcIcon size={22} />
                            </span>
                            <div className="service-overview-card__head-content">
                              <span className="service-overview-card__tag">{svc.badge}</span>
                              <h4 className="service-overview-card__title">{svc.title}</h4>
                            </div>
                          </div>
                          <p className="service-overview-card__desc">{svc.desc}</p>

                          <div className="service-overview-card__action">
                            <Link to={svc.to} className="service-overview-card__link">
                              <span>Learn More</span>
                              <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered CTA Section Button & Dedicated Training Pathway */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/contact" className="btn btn--orange btn--lg" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              <span>Discuss Your Project</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>

          {/* Dedicated Training & Internship Banner */}
          <div style={{
            marginTop: '3.5rem',
            background: 'linear-gradient(135deg, rgba(8, 20, 50, 0.85) 0%, rgba(13, 30, 76, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '16px',
            padding: '2rem 2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                <GraduationCap size={16} />
                <span>Velvora Academy & Skill Lab</span>
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                Looking for Professional Training or Student Internships?
              </h4>
              <p style={{ color: '#e2e8f0', fontSize: '0.96rem', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
                We provide hands-on training across ePublishing, AI/ML, Generative AI, Data Analytics, Accessibility, and Software Development with 100% live client project exposure.
              </p>
            </div>
            <Link to="/training" className="btn btn--orange" style={{ whiteSpace: 'nowrap' }}>
              <span>Explore Training & Internships</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA BAND (STRICTLY LIGHT THEME) */}
      <CtaBand
        title="Ready to Combine Services for Your Next Project?"
        text="Whether you need XML structuring, accessible EPUBs, custom software, or marketing campaigns, our team will provide a transparent proposal within one business day."
        primaryBtnText="Discuss Your Project"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore Industry Solutions"
        secondaryBtnTo="/solutions"
        theme="light"
      />
    </>
  );
}
