import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export const Eyebrow = ({ children, dark }) => (
  <p className={`eyebrow${dark ? ' eyebrow--dark' : ''}`}>{children}</p>
);

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
  <Link to={to} className="tlink">
    {children}
    <ArrowRight size={16} aria-hidden="true" />
  </Link>
);

export function PageHero({ eyebrow, title, children, crumbs = [] }) {
  // Prevent duplicate 'Home' in breadcrumbs if caller passes 'Home' in crumbs array
  const displayCrumbs = crumbs.filter((c, idx) => !(idx === 0 && (c.toLowerCase() === 'home' || c === '/')));

  return (
    <section className="phero phero--futuristic">
      {/* 1. Volumetric Multi-Spectrum Aurora Glow */}
      <div className="phero-backglow phero-backglow--cyan" aria-hidden="true" />
      <div className="phero-backglow phero-backglow--sapphire" aria-hidden="true" />
      <div className="phero-ambient-orb" aria-hidden="true" />

      {/* 2. Unique 3D Cyber Hologram Visual Stage (Positioned exclusively on the right side - zero interference with letters) */}
      <div className="phero-visual-stage" aria-hidden="true">
        {/* Holographic Concentric Energy Gyro Rings */}
        <div className="phero-holo-ring phero-holo-ring--outer" />
        <div className="phero-holo-ring phero-holo-ring--mid" />
        <div className="phero-holo-ring phero-holo-ring--inner" />

        {/* 3D Holographic Core with Crystalline Nodes */}
        <div className="phero-holo-core">
          <div className="phero-holo-core__diamond" />
          <div className="phero-holo-core__pulse-orb" />
          <div className="phero-holo-core__axes" />
        </div>

        {/* Floating Futuristic HUD Telemetry Badges */}
        <div className="phero-hud-badge phero-hud-badge--top">
          <span className="phero-hud-badge__dot phero-hud-badge__dot--cyan" />
          <span>ISO 14289 & WCAG 2.2</span>
        </div>
        <div className="phero-hud-badge phero-hud-badge--right">
          <span className="phero-hud-badge__dot phero-hud-badge__dot--sapphire" />
          <span>XML & Structured Core</span>
        </div>
        <div className="phero-hud-badge phero-hud-badge--bottom">
          <span className="phero-hud-badge__dot phero-hud-badge__dot--violet" />
          <span>Enterprise SLAs 99.9%</span>
        </div>

        {/* Dynamic Micro-Particle Stardust Nodes */}
        <div className="phero-stardust phero-stardust--1" />
        <div className="phero-stardust phero-stardust--2" />
        <div className="phero-stardust phero-stardust--3" />
        <div className="phero-stardust phero-stardust--4" />
      </div>

      {/* 3. Text Content Layer (Crisp, High-Contrast typography directly in front) */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/">Home</Link>
          {displayCrumbs.map((c) => (
            <span key={c}> / {c}</span>
          ))}
        </nav>
        {eyebrow && (
          <p className="pill">
            <i />
            {eyebrow}
          </p>
        )}
        <h1 className="phero-title-glow">{title}</h1>
        {children && <p className="lead lead--dark phero-lead-glow">{children}</p>}
      </div>
    </section>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="empty">
      <Info size={22} aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
        {action}
      </div>
    </div>
  );
}

export const Notice = ({ children }) => (
  <p className="notice">
    <Info size={18} aria-hidden="true" />
    <span>{children}</span>
  </p>
);

export function CtaBand({
  title = 'Ready to Make Your Content Accessible and Future-Ready?',
  text = 'Tell us about your project and our team will respond within one business day.',
  primaryBtnText = 'Get in Touch',
  primaryBtnTo = '/contact',
  primaryBtnOnClick,
  secondaryBtnText = 'Explore Our Services',
  secondaryBtnTo = '/services',
  secondaryBtnOnClick,
}) {
  const { pathname } = useLocation();

  const handleSecondaryClick = (e) => {
    if (secondaryBtnOnClick) {
      secondaryBtnOnClick(e);
      return;
    }
    // If the user is already on the target page (e.g., clicking 'Explore Our Services' while on /services)
    if (secondaryBtnTo === pathname || (secondaryBtnTo.startsWith('/services') && pathname === '/services')) {
      e.preventDefault();
      const catalog = document.getElementById('services-catalog') || document.getElementById('services-glance') || document.getElementById('main');
      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="cta netbg">
      <div className="container cta__in">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          {primaryBtnOnClick ? (
            <button type="button" onClick={primaryBtnOnClick} className="btn btn--orange">
              {primaryBtnText} <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <Link to={primaryBtnTo} className="btn btn--orange">
              {primaryBtnText} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
          {secondaryBtnTo && (
            <Link
              to={secondaryBtnTo}
              className="btn btn--outline"
              onClick={handleSecondaryClick}
            >
              {secondaryBtnText} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
