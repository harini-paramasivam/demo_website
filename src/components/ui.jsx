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
  const { pathname } = useLocation();
  // Prevent duplicate 'Home' in breadcrumbs if caller passes 'Home' in crumbs array
  const displayCrumbs = crumbs.filter((c, idx) => !(idx === 0 && (c.toLowerCase() === 'home' || c === '/')));

  // Determine section theme for distinct visual graphic per page category
  let pageTheme = 'services';
  if (pathname.startsWith('/careers')) pageTheme = 'careers';
  else if (pathname.startsWith('/solutions')) pageTheme = 'solutions';
  else if (pathname.startsWith('/training')) pageTheme = 'training';
  else if (pathname.startsWith('/about')) pageTheme = 'about';
  else if (pathname.startsWith('/contact')) pageTheme = 'contact';
  else if (pathname.startsWith('/resources') || pathname.startsWith('/blog')) pageTheme = 'resources';

  return (
    <section className="phero phero--futuristic">
      {/* 1. Volumetric Multi-Spectrum Aurora Glow */}
      <div className="phero-backglow phero-backglow--cyan" aria-hidden="true" />
      <div className="phero-backglow phero-backglow--sapphire" aria-hidden="true" />
      <div className="phero-ambient-orb" aria-hidden="true" />

      {/* 2. Abstract Modern Fluid Graphic (Strictly NO text/letters, unique art per page category) */}
      <div className={`phero-art-stage phero-art-stage--${pageTheme}`} aria-hidden="true">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="phero-art-svg"
        >
          <defs>
            <filter id={`pheroGlow-${pageTheme}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id={`gradPrimary-${pageTheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {pageTheme === 'careers' && (
                <>
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.75" />
                </>
              )}
              {pageTheme === 'solutions' && (
                <>
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                </>
              )}
              {pageTheme === 'training' && (
                <>
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                </>
              )}
              {pageTheme === 'about' && (
                <>
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
                </>
              )}
              {pageTheme === 'contact' && (
                <>
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                </>
              )}
              {(pageTheme === 'services' || pageTheme === 'resources') && (
                <>
                  <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Page-Specific Pure Abstract Shapes */}
          {pageTheme === 'careers' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <circle cx="260" cy="250" r="140" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2.5" strokeDasharray="12 18" />
              <circle cx="260" cy="250" r="95" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" />
              <path d="M 120 360 C 180 200, 320 160, 420 120" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="3" strokeLinecap="round" />
              <path d="M 160 390 C 220 250, 340 210, 440 160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 10" strokeOpacity="0.7" />
              <circle cx="340" cy="180" r="16" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="260" cy="250" r="8" fill="#38bdf8" />
              <circle cx="420" cy="120" r="6" fill="#38bdf8" />
              <circle cx="120" cy="360" r="5" fill="#818cf8" />
            </g>
          )}

          {pageTheme === 'solutions' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <polygon points="260,110 370,175 370,305 260,370 150,305 150,175" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" fill="rgba(192, 132, 252, 0.05)" />
              <polygon points="260,160 335,205 335,290 260,335 185,290 185,205" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1.5" strokeDasharray="8 8" />
              <line x1="260" y1="110" x2="260" y2="370" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1.5" />
              <line x1="150" y1="175" x2="370" y2="305" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1.2" />
              <line x1="150" y1="305" x2="370" y2="175" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1.2" />
              <circle cx="260" cy="240" r="28" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="260" cy="240" r="10" fill="#c084fc" />
            </g>
          )}

          {pageTheme === 'training' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <circle cx="250" cy="250" r="135" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" strokeDasharray="14 10" />
              <circle cx="250" cy="250" r="85" stroke="#34d399" strokeWidth="2.5" />
              <path d="M 140 180 Q 250 110 360 180 T 360 320 Q 250 390 140 320 Z" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" fill="rgba(52, 211, 153, 0.04)" />
              <circle cx="250" cy="140" r="7" fill="#34d399" />
              <circle cx="340" cy="250" r="9" fill="#38bdf8" />
              <circle cx="250" cy="360" r="7" fill="#059669" />
              <circle cx="160" cy="250" r="9" fill="#38bdf8" />
              <circle cx="250" cy="250" r="18" fill="rgba(52, 211, 153, 0.25)" stroke="#34d399" strokeWidth="2" />
            </g>
          )}

          {pageTheme === 'about' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <ellipse cx="250" cy="250" rx="145" ry="85" transform="rotate(-25 250 250)" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" />
              <ellipse cx="250" cy="250" rx="145" ry="85" transform="rotate(35 250 250)" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" strokeDasharray="8 12" />
              <circle cx="250" cy="250" r="60" stroke="#60a5fa" strokeWidth="2.5" fill="rgba(96, 165, 250, 0.08)" />
              <circle cx="250" cy="250" r="14" fill="#38bdf8" />
              <circle cx="330" cy="180" r="6" fill="#818cf8" />
              <circle cx="170" cy="320" r="6" fill="#818cf8" />
            </g>
          )}

          {pageTheme === 'contact' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <circle cx="260" cy="250" r="150" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" />
              <circle cx="260" cy="250" r="110" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" strokeDasharray="10 12" />
              <circle cx="260" cy="250" r="70" stroke="#2dd4bf" strokeWidth="2.5" />
              <circle cx="260" cy="250" r="30" fill="rgba(45, 212, 191, 0.2)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="260" cy="250" r="10" fill="#2dd4bf" />
              <line x1="110" y1="250" x2="410" y2="250" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1" strokeDasharray="6 8" opacity="0.5" />
              <line x1="260" y1="100" x2="260" y2="400" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="1" strokeDasharray="6 8" opacity="0.5" />
            </g>
          )}

          {(pageTheme === 'services' || pageTheme === 'resources') && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              <path d="M 60 270 Q 160 130 260 250 T 460 230" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 60 230 Q 160 350 260 210 T 460 270" stroke={`url(#gradPrimary-${pageTheme})`} strokeWidth="2" strokeDasharray="10 12" fill="none" />
              <circle cx="260" cy="230" r="120" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" strokeDasharray="6 8" />
              <circle cx="260" cy="230" r="65" stroke="#00d2ff" strokeWidth="2" fill="rgba(0, 210, 255, 0.05)" />
              <circle cx="260" cy="230" r="16" fill="rgba(0, 210, 255, 0.3)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="260" cy="230" r="6" fill="#ffffff" />
              <circle cx="160" cy="180" r="8" fill="#38bdf8" />
              <circle cx="360" cy="280" r="8" fill="#2563eb" />
            </g>
          )}
        </svg>

        {/* Ambient Light Flares */}
        <div className={`phero-art-flare phero-art-flare--primary phero-art-flare--${pageTheme}`} />
        <div className={`phero-art-flare phero-art-flare--secondary phero-art-flare--${pageTheme}`} />
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
