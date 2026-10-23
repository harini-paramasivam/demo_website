import { Link } from 'react-router-dom';
import { Mail, Linkedin, ArrowRight, Phone, Clock, MapPin } from 'lucide-react';
import { company } from '../data/site.js';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about/company-overview' },
    { label: 'Services', to: '/services' },
    { label: 'Resources', to: '/resources/news-events' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const serviceLinks = [
    { label: 'ePublishing', to: '/services/epublishing' },
    { label: 'XML Conversion', to: '/services/xml' },
    { label: 'EPUB Accessibility', to: '/services/digital-accessibility#epub-3' },
    { label: 'Web Accessibility', to: '/services/digital-accessibility#web' },
    { label: 'PDF Remediation', to: '/services/digital-accessibility#pdf' },
    { label: 'Office Accessibility', to: '/services/digital-accessibility#word' },
  ];

  const standardsLinks = [
    { label: 'WCAG 2.2 AA / AAA', to: '/services/digital-accessibility' },
    { label: 'PDF/UA (ISO 14289)', to: '/services/digital-accessibility#pdf' },
    { label: 'JATS & BITS XML', to: '/services/xml' },
    { label: 'EPUB Accessibility 1.1', to: '/services/digital-accessibility#epub-3' },
    { label: 'Section 508 & ADA', to: '/services/digital-accessibility' },
    { label: 'Enterprise NDA & Security', to: '/privacy-policy' },
  ];

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/logo.png" alt="Velvora Solutions" width="735" height="679" />
          <p className="footer__tagline">{company.aboutLine}</p>
          <p className="footer__desc">{company.description}</p>
          <div className="social">
            <a
              href={company.linkedinCompany}
              target="_blank"
              rel="noreferrer"
              aria-label="Velvora Solutions on LinkedIn (opens in new tab)"
            >
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${company.email}`} aria-label={`Email ${company.email}`}>
              <Mail size={18} />
            </a>
            <a href={`tel:${company.phone.replace(/\s+/g, '')}`} aria-label={`Call ${company.phone}`}>
              <Phone size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer – Quick Links">
          <h2 className="footer__h">Quick Links</h2>
          <ul>
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer – Services">
          <h2 className="footer__h">Services</h2>
          <ul>
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer – Standards & QA">
          <h2 className="footer__h">Standards & QA</h2>
          <ul>
            {standardsLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__talk">
          <h2 className="footer__h">Start a conversation</h2>
          <p className="footer__talk-lead">
            Tell us about your project and our team will respond within one business day.
          </p>
          <Link to="/contact" className="btn btn--orange footer__cta-btn">
            Get in touch <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <div className="footer__contact-info">
            <a className="footer__contact-link" href={`mailto:${company.email}`}>
              <Mail size={15} aria-hidden="true" />
              <span>{company.email}</span>
            </a>
            <a className="footer__contact-link" href={`tel:${company.phone.replace(/\s+/g, '')}`}>
              <Phone size={15} aria-hidden="true" />
              <span>{company.phone}</span>
            </a>
            <div className="footer__contact-text">
              <Clock size={15} aria-hidden="true" />
              <span>{company.hours}</span>
            </div>
            <div className="footer__contact-text">
              <MapPin size={15} aria-hidden="true" />
              <span>Cuddalore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__legal-wrap">
        <div className="container footer__legal">
          <p>© 2026 Velvora Solutions. All rights reserved.</p>
          <div className="footer__legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link to="/accessibility-statement">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
