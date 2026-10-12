import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export const Eyebrow = ({ children, dark }) => <p className={`eyebrow${dark ? ' eyebrow--dark' : ''}`}>{children}</p>;

export function SectionHead({ eyebrow, title, children, dark }) {
  return (
    <div className={`sec-head reveal${dark ? ' sec-head--dark' : ''}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </div>
  );
}

export const TextLink = ({ to, children }) => (
  <Link to={to} className="tlink">{children}<ArrowRight size={16} aria-hidden="true" /></Link>
);

export function PageHero({ eyebrow, title, children, crumbs = [] }) {
  return (
    <section className="phero netbg">
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c) => <span key={c}> / {c}</span>)}
        </nav>
        {eyebrow && <p className="pill"><i />{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <p className="lead lead--dark">{children}</p>}
      </div>
    </section>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="empty">
      <Info size={22} aria-hidden="true" />
      <div><h3>{title}</h3><p>{children}</p>{action}</div>
    </div>
  );
}

export const Notice = ({ children }) => (
  <p className="notice"><Info size={18} aria-hidden="true" /><span>{children}</span></p>
);

export function CtaBand({ title = 'Make your PDFs accessible', text = 'Professional PDF accessibility services with AI-assisted workflows and manual quality assurance.' }) {
  return (
    <section className="cta netbg">
      <div className="container cta__in">
        <div><h2>{title}</h2><p>{text}</p></div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--orange">Get in Touch <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link to="/services" className="btn btn--outline">Explore Services <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
