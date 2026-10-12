import { Link } from 'react-router-dom';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { nav, company } from '../data/site.js';

const group = (label) => nav.find((n) => n.label === label).items;

export default function Footer() {
  const cols = [
    ['Company', group('About Us')],
    ['Services', group('Services')],
    ['Resources', [...group('Resources'), { label: 'Blog', to: '/blog' }]],
  ];
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/logo.png" alt="Velvora Solutions" width="735" height="679" />
          <p>{company.description}</p>
          <div className="social">
            <a href={company.linkedinCompany} target="_blank" rel="noreferrer" aria-label="Velvora Solutions on LinkedIn (opens in new tab)"><Linkedin size={18} /></a>
            <a href={`mailto:${company.email}`} aria-label={`Email ${company.email}`}><Mail size={18} /></a>
          </div>
        </div>
        {cols.map(([title, items]) => (
          <nav key={title} aria-label={`Footer – ${title}`}>
            <h2 className="footer__h">{title}</h2>
            <ul>{items.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}</ul>
          </nav>
        ))}
        <div className="footer__talk">
          <h2 className="footer__h">Start a conversation</h2>
          <p>Tell us about your documents, workflows or digital requirements.</p>
          <Link to="/contact" className="btn btn--orange">Get in touch <ArrowRight size={18} aria-hidden="true" /></Link>
          <a className="footer__mail" href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} Velvora Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}
