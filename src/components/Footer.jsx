import { Link } from 'react-router-dom';
import { 
  Mail, 
  Linkedin, 
  Instagram,
  Facebook,
  Youtube,
  ArrowRight, 
  MapPin,
  BookOpen,
  Code2,
  Sparkles,
  Globe,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Layers,
  Scale,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { company } from '../data/site.js';

export default function Footer() {
  const serviceLinks = [
    { 
      label: 'ePublishing', 
      tag: 'EPUB 3 · Reflow & Fixed',
      to: '/services/epublishing', 
      icon: BookOpen,
      dotColor: '#38bdf8'
    },
    { 
      label: 'XML Conversion', 
      tag: 'JATS 1.3 · BITS · DITA',
      to: '/services/xml', 
      icon: Code2,
      dotColor: '#00f2fe'
    },
    { 
      label: 'EPUB Accessibility', 
      tag: 'DAISY Ace · MathML',
      to: '/services/digital-accessibility#epub-3', 
      icon: Sparkles,
      dotColor: '#10b981'
    },
    { 
      label: 'Web Accessibility', 
      tag: 'WCAG 2.2 · Screen Readers',
      to: '/services/digital-accessibility#web', 
      icon: Globe,
      dotColor: '#38bdf8'
    },
    { 
      label: 'PDF Remediation', 
      tag: 'PDF/UA · Tag Tree QA',
      to: '/services/digital-accessibility#pdf', 
      icon: FileText,
      dotColor: '#f97316'
    },
    { 
      label: 'Office Accessibility', 
      tag: 'Word · PPT · Excel',
      to: '/services/digital-accessibility#word', 
      icon: FileSpreadsheet,
      dotColor: '#a855f7'
    },
  ];

  const standardsLinks = [
    { 
      label: 'WCAG 2.2 AA / AAA', 
      badge: 'W3C Recommendation',
      to: '/services/digital-accessibility', 
      icon: CheckCircle2,
      dotColor: '#10b981'
    },
    { 
      label: 'PDF/UA (ISO 14289)', 
      badge: 'ISO Universal Access',
      to: '/services/digital-accessibility#pdf', 
      icon: Award,
      dotColor: '#38bdf8'
    },
    { 
      label: 'JATS & BITS XML', 
      badge: 'NLM / PubMed Central',
      to: '/services/xml', 
      icon: Layers,
      dotColor: '#00f2fe'
    },
    { 
      label: 'EPUB Accessibility 1.1', 
      badge: 'EAA Compliant',
      to: '/services/digital-accessibility#epub-3', 
      icon: Sparkles,
      dotColor: '#10b981'
    },
    { 
      label: 'Section 508 & ADA', 
      badge: 'Federal Mandates',
      to: '/services/digital-accessibility', 
      icon: Scale,
      dotColor: '#fbbf24'
    },
    { 
      label: 'Enterprise NDA & Security', 
      badge: 'InfoSec Guaranteed',
      to: '/privacy-policy', 
      icon: ShieldCheck,
      dotColor: '#38bdf8'
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Brand Col */}
        <div className="footer__brand">
          <img src="/logo.png" alt="Velvora Solutions" width="910" height="305" />
          <p className="footer__tagline">{company.aboutLine}</p>
          <p className="footer__desc">{company.description}</p>
          <div className="social">
            <a
              href={company.linkedinCompany}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-btn--linkedin"
              aria-label="Velvora Solutions on LinkedIn (opens in new tab)"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-btn--instagram"
              aria-label="Velvora Solutions on Instagram (opens in new tab)"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={company.facebook}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-btn--facebook"
              aria-label="Velvora Solutions on Facebook (opens in new tab)"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={company.youtube}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-btn--youtube"
              aria-label="Velvora Solutions on YouTube (opens in new tab)"
              title="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a 
              href={`mailto:${company.email}`} 
              className="social-btn social-btn--mail"
              aria-label={`Email ${company.email}`}
              title="Email Us"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* 6 Services - Rich Interactive Pills */}
        <nav aria-label="Footer – Services" className="footer__col-services">
          <div className="footer__h-wrap">
            <h2 className="footer__h">Services</h2>
            <span className="footer__count-badge">6 Specializations</span>
          </div>
          <div className="footer__pills-list">
            {serviceLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <Link key={item.label} to={item.to} className="footer-spec-pill">
                  <span className="footer-pill-icon-wrap" style={{ borderColor: `${item.dotColor}35`, color: item.dotColor }}>
                    <IconComp size={15} />
                  </span>
                  <div className="footer-pill-text">
                    <span className="footer-pill-title">{item.label}</span>
                    <span className="footer-pill-tag">{item.tag}</span>
                  </div>
                  <ArrowUpRight size={13} className="footer-pill-arrow" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* 6 Standards & QA - Rich Verified Compliance Pods */}
        <nav aria-label="Footer – Standards & QA" className="footer__col-standards">
          <div className="footer__h-wrap">
            <h2 className="footer__h">Standards & QA</h2>
            <span className="footer__count-badge footer__count-badge--emerald">6 Verified Frameworks</span>
          </div>
          <div className="footer__pills-list">
            {standardsLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <Link key={item.label} to={item.to} className="footer-spec-pill footer-spec-pill--standard">
                  <span className="footer-pill-icon-wrap" style={{ borderColor: `${item.dotColor}35`, color: item.dotColor }}>
                    <IconComp size={15} />
                  </span>
                  <div className="footer-pill-text">
                    <span className="footer-pill-title">{item.label}</span>
                    <span className="footer-pill-tag footer-pill-tag--badge">
                      <span className="footer-pill-live-dot" style={{ backgroundColor: item.dotColor }} />
                      {item.badge}
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="footer-pill-arrow" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Start a conversation */}
        <div className="footer__talk">
          <h2 className="footer__h">Start a conversation</h2>
          <p className="footer__talk-lead">
            Tell us about your project or training goal and our team will respond within one business day.
          </p>
          <Link to="/contact" className="btn btn--orange footer__cta-btn">
            Get in touch <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <div className="footer__contact-info">
            <a href={`mailto:${company.email}`} className="footer__contact-link">
              <Mail size={16} />
              <span>{company.email}</span>
            </a>
            <span className="footer__contact-text">
              <MapPin size={16} />
              <span><strong>Main Office:</strong> {company.mainOffice || 'Indhira Nagar, Cuddalore'}</span>
            </span>
            <span className="footer__contact-text">
              <MapPin size={16} />
              <span><strong>Branch Office:</strong> {company.branchOffice || 'Porur, Chennai'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} Velvora Solutions. All rights reserved.</p>
        <div className="footer__legal-links">
          <Link to="/accessibility-statement">Accessibility Statement</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
