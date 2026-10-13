import { Link } from 'react-router-dom';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
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
    { label: 'XML', to: '/services/xml' },
    { label: 'EPUB Accessibility', to: '/services/digital-accessibility#epub-3' },
    { label: 'Web Accessibility', to: '/services/digital-accessibility#web' },
    { label: 'PDF Accessibility', to: '/services/digital-accessibility#pdf' },
    { label: 'Word, PPT and Excel Accessibility', to: '/services/digital-accessibility#word' },
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

        <div className="footer__talk">
          <h2 className="footer__h">Start a conversation</h2>
          <p>Tell us about your project and our team will respond within one business day.</p>
          <Link to="/contact" className="btn btn--orange">
            Get in touch <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a className="footer__mail" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
      </div>

      <div className="container footer__legal">
        <p>© 2026 Velvora Solutions. All rights reserved.</p>
        <div className="footer__legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link to="/accessibility-statement">Accessibility Statement</Link>
        </div>
      </div>
    </footer>
  );
}
