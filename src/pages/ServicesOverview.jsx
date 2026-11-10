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
  CheckCircle2
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';

const serviceGroups = [
  {
    id: 'group-1',
    groupNum: 'Group 01',
    title: 'Publishing and XML',
    desc: 'Structured, future-ready workflows and multi-format delivery for academic books, journals, and publications.',
    icon: BookOpen,
    items: [
      {
        title: 'ePublishing Services',
        desc: 'Conversion, formatting, and multi-format delivery in EPUB, PDF, and web formats.',
        to: '/services/epublishing',
        icon: BookOpen,
        badge: 'EPUB 2 & 3 · PDF · Web',
      },
      {
        title: 'XML Services',
        desc: 'Structured XML creation, conversion, and workflows.',
        to: '/services/xml',
        icon: FileCode,
        badge: 'JATS · BITS · DITA · TEI',
      },
    ],
  },
  {
    id: 'group-2',
    groupNum: 'Group 02',
    title: 'Content Services',
    desc: 'End-to-end editorial composition, mathematical typesetting, metadata tagging, digitization, and multimedia accessibility.',
    icon: Layers,
    items: [
      {
        title: 'Typesetting and Design',
        desc: 'Professional page layout for books, journals, and reports.',
        to: '/services/typesetting-and-design',
        icon: Layers,
        badge: 'InDesign · Page Layout · Print',
      },
      {
        title: 'Math and Equation Typesetting',
        desc: 'Accurate LaTeX and MathML for STEM content.',
        to: '/services/math-and-equation-typesetting',
        icon: Sigma,
        badge: 'LaTeX · MathML · STEM',
      },
      {
        title: 'Metadata, Indexing and Taxonomy',
        desc: 'Indexes, metadata, and subject tagging that improve discoverability.',
        to: '/services/metadata-indexing-and-taxonomy',
        icon: Tags,
        badge: 'Taxonomy · Schema · SEO Tags',
      },
      {
        title: 'OCR and Digitization',
        desc: 'Turn print books, journals, and archives into searchable digital content.',
        to: '/services/ocr-and-digitization',
        icon: ScanText,
        badge: 'Searchable PDF · Text Capture',
      },
      {
        title: 'Captioning, Transcription and Audio Description',
        desc: 'Accurate captions, transcripts, and audio description.',
        to: '/services/captioning-transcription-and-audio-description',
        icon: Video,
        badge: 'Timed Text · WCAG Video',
      },
    ],
  },
  {
    id: 'group-3',
    groupNum: 'Group 03',
    title: 'Digital Accessibility',
    desc: 'Universal digital inclusion conforming to WCAG 2.2 AA/AAA, PDF/UA, Section 508, and the European Accessibility Act.',
    icon: FileCheck2,
    items: [
      {
        title: 'Digital Accessibility Services',
        desc: 'EPUB 2 and 3, web, PDF, Word, PowerPoint, and Excel.',
        to: '/services/digital-accessibility',
        icon: FileCheck2,
        badge: 'WCAG 2.2 · PDF/UA · Section 508',
      },
      {
        title: 'Accessibility Training and Consulting',
        desc: 'Workshops and expert advice to build skills inside your team.',
        to: '/services/accessibility-training-and-consulting',
        icon: GraduationCap,
        badge: 'Workshops · CPACC · Consulting',
      },
    ],
  },
  {
    id: 'group-4',
    groupNum: 'Group 04',
    title: 'IT Services',
    desc: 'Intelligent automation, business telemetry dashboards, modern accessible websites, and custom software systems.',
    icon: Cpu,
    items: [
      {
        title: 'AI and Automation',
        desc: 'Practical AI and workflow automation with human quality checks.',
        to: '/services/ai-automation',
        icon: Bot,
        badge: 'NLP · AI QA · Automated Flow',
      },
      {
        title: 'Business Intelligence and Data Analytics',
        desc: 'Dashboards and analytics that turn data into decisions.',
        to: '/services/data-analytics',
        icon: BarChart3,
        badge: 'Executive Dashboards · ETL',
      },
      {
        title: 'Website Development',
        desc: 'Modern, responsive, and accessible websites tailored to your brand.',
        to: '/services/software-development',
        icon: Code,
        badge: 'Full-Stack · Accessible Web',
      },
      {
        title: 'Software Development',
        desc: 'Custom applications that solve real business challenges.',
        to: '/services/software-development',
        icon: Cpu,
        badge: 'Custom Apps · Cloud APIs',
      },
    ],
  },
  {
    id: 'group-5',
    groupNum: 'Group 05',
    title: 'Digital Marketing',
    desc: 'Measurable audience growth, authentic social campaigns, performance advertising, and executive ROI telemetry.',
    icon: TrendingUp,
    items: [
      {
        title: 'SEO Optimization',
        desc: 'Structured metadata, keyword research, and accessibility-friendly SEO.',
        to: '/services/digital-marketing',
        icon: Search,
        badge: 'Technical SEO · Rich Snippets',
      },
      {
        title: 'Social Media Marketing',
        desc: 'Campaigns across LinkedIn, Twitter/X, Facebook, and Instagram.',
        to: '/services/digital-marketing',
        icon: Share2,
        badge: 'LinkedIn · X · Meta Channels',
      },
      {
        title: 'Paid Advertising Campaigns',
        desc: 'Targeted PPC and display ads to boost reach.',
        to: '/services/digital-marketing',
        icon: Target,
        badge: 'Google Ads · Targeted PPC',
      },
      {
        title: 'Content Marketing',
        desc: 'Blogs, newsletters, and thought leadership pieces.',
        to: '/services/digital-marketing',
        icon: FileText,
        badge: 'Articles · Thought Leadership',
      },
      {
        title: 'Analytics & Reporting',
        desc: 'Dashboards and insights to measure ROI and refine strategy.',
        to: '/services/digital-marketing',
        icon: TrendingUp,
        badge: 'Conversion Telemetry · ROI',
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
      <section id="services-catalog" className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="services-groups-wrapper">
            {serviceGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.id} className="service-group-block">
                  <div className="service-group-block__header">
                    <div className="service-group-block__meta">
                      <span className="service-group-block__badge">
                        <GroupIcon size={16} />
                        <span>{group.groupNum}</span>
                      </span>
                      <h3 className="service-group-block__title">{group.title}</h3>
                    </div>
                    <p className="service-group-block__desc">{group.desc}</p>
                  </div>

                  <div className="service-group-block__grid">
                    {group.items.map((svc) => {
                      const SvcIcon = svc.icon;
                      return (
                        <article key={svc.title} className="service-overview-card">
                          <div className="service-overview-card__top">
                            <span className="service-overview-card__icon-wrap">
                              <SvcIcon size={22} />
                            </span>
                            <span className="service-overview-card__tag">{svc.badge}</span>
                          </div>

                          <h4 className="service-overview-card__title">{svc.title}</h4>
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

          {/* Centered CTA Section Button */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/contact" className="btn btn--orange btn--lg" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              <span>Discuss Your Project</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA BAND */}
      <CtaBand
        title="Ready to Combine Services for Your Next Project?"
        text="Whether you need XML structuring, accessible EPUBs, custom software, or marketing campaigns, our team will provide a transparent proposal within one business day."
        primaryBtnText="Discuss Your Project"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore Our Services"
        secondaryBtnTo="/services#services-catalog"
        secondaryBtnOnClick={(e) => {
          e.preventDefault();
          document.getElementById('services-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </>
  );
}
