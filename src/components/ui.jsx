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
  return (
    <section className="phero phero--futuristic">
      {/* 1. Volumetric Multi-Spectrum Aurora Glow directly behind the typography (Letter ku pinadi) */}
      <div className="phero-backglow phero-backglow--cyan" aria-hidden="true" />
      <div className="phero-backglow phero-backglow--violet" aria-hidden="true" />
      <div className="phero-backglow phero-backglow--sapphire" aria-hidden="true" />

      {/* 2. Innovative 3D Cybernetic Geometric Grid & Topographic Wave Lines (Transparent SVG Behind Letters) */}
      <div className="phero-cyber-graphic" aria-hidden="true">
        <svg
          viewBox="0 0 1440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="phero-cyber-svg"
        >
          <defs>
            <linearGradient id="pheroLineCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#00d2ff" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#818cf8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="pheroLineViolet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="pheroHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.15" />
            </linearGradient>

            <filter id="pheroGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Perspective 3D Isometric Wave Lines sweeping across the canvas (Subtle & soft) */}
          <g filter="url(#pheroGlow)" opacity="0.32">
            <path
              d="M -50 280 C 220 220, 480 320, 820 240 C 1120 170, 1320 250, 1500 210"
              stroke="url(#pheroLineCyan)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <path
              d="M -50 320 C 240 260, 510 360, 860 280 C 1150 210, 1350 290, 1500 250"
              stroke="url(#pheroLineViolet)"
              strokeWidth="1.2"
            />
            <path
              d="M -50 360 C 260 300, 540 400, 900 320 C 1180 250, 1380 330, 1500 290"
              stroke="url(#pheroLineCyan)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <path
              d="M -50 240 C 200 180, 450 280, 780 200 C 1080 130, 1280 210, 1500 170"
              stroke="url(#pheroLineViolet)"
              strokeWidth="1"
              strokeDasharray="6 12"
            />
          </g>

          {/* 3D Isometric Geometric Nodes and Telemetry directly behind the letters (Soft & dull) */}
          <g opacity="0.25" filter="url(#pheroGlow)">
            {/* Hexagonal cyber telemetry ring */}
            <polygon
              points="980,120 1060,75 1140,120 1140,210 1060,255 980,210"
              stroke="url(#pheroHexGrad)"
              strokeWidth="1.2"
              fill="rgba(0, 210, 255, 0.02)"
            />
            <polygon
              points="1010,135 1060,105 1110,135 1110,195 1060,225 1010,195"
              stroke="url(#pheroLineCyan)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />

            {/* Holographic Radar / Telemetry Compass behind right-center */}
            <circle cx="1060" cy="165" r="95" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="1060" cy="165" r="140" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" strokeDasharray="2 8" />
            <line x1="1060" y1="20" x2="1060" y2="310" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
            <line x1="915" y1="165" x2="1205" y2="165" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />

            {/* Glowing isometric light nodes right behind the text */}
            <circle cx="280" cy="180" r="2.5" fill="#00d2ff" opacity="0.4" />
            <circle cx="480" cy="140" r="2" fill="#a855f7" opacity="0.4" />
            <circle cx="720" cy="220" r="2.5" fill="#38bdf8" opacity="0.4" />
            <circle cx="180" cy="260" r="2" fill="#00d2ff" opacity="0.4" />
            <circle cx="360" cy="290" r="2.5" fill="#60a5fa" opacity="0.4" />
          </g>

          {/* Isometric Perspective Grid Floor Ray Lines */}
          <g opacity="0.12" stroke="url(#pheroLineCyan)" strokeWidth="1">
            <line x1="100" y1="440" x2="350" y2="240" />
            <line x1="300" y1="440" x2="500" y2="240" />
            <line x1="500" y1="440" x2="650" y2="240" />
            <line x1="700" y1="440" x2="800" y2="240" />
            <line x1="900" y1="440" x2="950" y2="240" />
            <line x1="1100" y1="440" x2="1100" y2="240" />
            <line x1="1300" y1="440" x2="1250" y2="240" />
          </g>
        </svg>
      </div>

      {/* 3. Floating Holographic Prismatic Diamond Plane (Transparent 3D Graphic behind letters) */}
      <div className="phero-prism-plane" aria-hidden="true" />
      <div className="phero-cyber-orbit-ring" aria-hidden="true" />

      {/* 4. Text Content Layer (Crisp, High-Contrast typography directly in front) */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
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
