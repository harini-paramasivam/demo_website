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

      {/* 2. Rich 3D Volumetric Isometric & Prismatic Showcase Art (Strictly NO text/letters, customized per category) */}
      <div className={`phero-art-stage phero-art-stage--${pageTheme}`} aria-hidden="true">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="phero-art-svg"
        >
          <defs>
            {/* Master Volumetric Bloom Filters */}
            <filter id={`pheroGlow-${pageTheme}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`pheroCoreGlow-${pageTheme}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" result="intenseGlow" />
              <feMerge>
                <feMergeNode in="intenseGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear & Radial Gradients */}
            <linearGradient id="glowGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="glowGradViolet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="glowGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="glowGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>

            {/* 3D Glass Facet Shading Gradients */}
            <linearGradient id="glassTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="glassLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="glassRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0c1e4a" stopOpacity="0.8" />
            </linearGradient>

            {/* Solutions 3D Facets (Violet & Cyan) */}
            <linearGradient id="solTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="solLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="solRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.85" />
            </linearGradient>

            {/* Radial Core Glows */}
            <radialGradient id="quantumOrbCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="quantumOrbPurple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#e879f9" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="quantumOrbEmerald" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#34d399" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#059669" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="quantumOrbGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. SOLUTIONS: 3D Isometric Modular Architecture with Layered Glass Platforms & Quantum Core */}
          {pageTheme === 'solutions' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Volumetric Backdrop Glow */}
              <circle cx="250" cy="250" r="130" fill="url(#quantumOrbPurple)" opacity="0.35" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* Lower Tier: Large Isometric Foundation Slab */}
              <polygon points="250,310 390,380 250,450 110,380" fill="url(#solTop)" stroke="#38bdf8" strokeWidth="1.8" />
              <polygon points="110,380 250,450 250,468 110,398" fill="url(#solLeft)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
              <polygon points="250,450 390,380 390,398 250,468" fill="url(#solRight)" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="1" />

              {/* Connecting Vertical Energy Pillars */}
              <line x1="160" y1="355" x2="160" y2="245" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.75" />
              <line x1="340" y1="355" x2="340" y2="245" stroke="#c084fc" strokeWidth="2" strokeDasharray="6 4" opacity="0.75" />
              <line x1="250" y1="410" x2="250" y2="295" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />

              {/* Mid Tier: Floating Angled Glass Server Block */}
              <polygon points="250,195 365,255 250,315 135,255" fill="url(#solTop)" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="135,255 250,315 250,350 135,290" fill="url(#solLeft)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.2" />
              <polygon points="250,315 365,255 365,290 250,350" fill="url(#solRight)" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="1.2" />

              {/* Glowing Quantum Core Sphere suspended in center */}
              <circle cx="250" cy="235" r="38" fill="url(#quantumOrbCyan)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="250" cy="235" r="16" fill="#ffffff" />

              {/* Top Tier: Floating Precision Crystal Diamond */}
              <polygon points="250,95 305,128 250,160 195,128" fill="url(#solTop)" stroke="#c084fc" strokeWidth="2" />
              <polygon points="195,128 250,160 250,185 195,153" fill="url(#solLeft)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.2" />
              <polygon points="250,160 305,128 305,153 250,185" fill="url(#solRight)" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="1.2" />

              {/* 3D Orbit Ring encircling structure */}
              <ellipse cx="250" cy="255" rx="195" ry="75" transform="rotate(-18 250 255)" stroke="url(#glowGradCyan)" strokeWidth="2.2" strokeDasharray="14 10" fill="none" opacity="0.85" />
              <circle cx="105" cy="305" r="7" fill="#38bdf8" />
              <circle cx="395" cy="205" r="8" fill="#c084fc" />

              {/* Micro-spark Nodes in Space */}
              <circle cx="370" cy="115" r="4.5" fill="#38bdf8" />
              <circle cx="130" cy="180" r="4" fill="#c084fc" />
              <circle cx="250" cy="70" r="5" fill="#ffffff" />
            </g>
          )}

          {/* 2. SERVICES: Prismatic Quantum Core with 3D Concentric Refractive Gyro Rings */}
          {(pageTheme === 'services' || pageTheme === 'resources') && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Deep Space Radial Atmosphere */}
              <circle cx="250" cy="250" r="145" fill="url(#quantumOrbCyan)" opacity="0.3" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* 3D Tilted Orbital Gyro Rings */}
              <ellipse cx="250" cy="250" rx="200" ry="70" transform="rotate(-30 250 250)" stroke="url(#glowGradCyan)" strokeWidth="2.5" fill="none" opacity="0.8" />
              <ellipse cx="250" cy="250" rx="175" ry="58" transform="rotate(40 250 250)" stroke="url(#glowGradCyan)" strokeWidth="2" strokeDasharray="16 10" fill="none" opacity="0.85" />
              <ellipse cx="250" cy="250" rx="145" ry="46" transform="rotate(-75 250 250)" stroke="#00f2fe" strokeWidth="2" fill="none" opacity="0.9" />

              {/* Multi-Layer Volumetric Spherical Core */}
              <circle cx="250" cy="250" r="72" fill="url(#glassLeft)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="250" cy="250" r="50" fill="url(#quantumOrbCyan)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="235" cy="235" r="22" fill="#ffffff" opacity="0.9" />

              {/* Prismatic Horizon Ray */}
              <line x1="50" y1="250" x2="450" y2="250" stroke="url(#glowGradCyan)" strokeWidth="1.8" opacity="0.55" strokeDasharray="8 6" />

              {/* Orbital Satellite Nodes */}
              <circle cx="390" cy="170" r="9" fill="#00f2fe" />
              <circle cx="110" cy="330" r="8" fill="#38bdf8" />
              <circle cx="330" cy="355" r="7" fill="#60a5fa" />
              <circle cx="170" cy="145" r="6" fill="#ffffff" />
            </g>
          )}

          {/* 3. TRAINING: Stepped 3D Ascending Skill Matrix & Upward Beacon */}
          {pageTheme === 'training' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Atmospheric Glow */}
              <circle cx="250" cy="250" r="140" fill="url(#quantumOrbEmerald)" opacity="0.32" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* Vertical Laser Light Column */}
              <polygon points="250,45 285,420 215,420" fill="url(#glowGradEmerald)" opacity="0.18" />

              {/* Base Tier: Isometric Emerald Platform */}
              <polygon points="250,330 380,390 250,450 120,390" fill="url(#glassTop)" stroke="#34d399" strokeWidth="2" />
              <polygon points="120,390 250,450 250,470 120,410" fill="url(#glassLeft)" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="1" />
              <polygon points="250,450 380,390 380,410 250,470" fill="url(#glassRight)" stroke="rgba(5, 150, 105, 0.5)" strokeWidth="1" />

              {/* Tier 2: Stepped Platform */}
              <polygon points="250,230 345,280 250,330 155,280" fill="url(#glassTop)" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="155,280 250,330 250,350 155,300" fill="url(#glassLeft)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
              <polygon points="250,330 345,280 345,300 250,350" fill="url(#glassRight)" stroke="rgba(3, 105, 161, 0.5)" strokeWidth="1" />

              {/* Tier 3: High-Focus Apex Cube */}
              <polygon points="250,130 310,165 250,200 190,165" fill="url(#glassTop)" stroke="#34d399" strokeWidth="2.2" />
              <polygon points="190,165 250,200 250,225 190,190" fill="url(#glassLeft)" stroke="rgba(52, 211, 153, 0.7)" strokeWidth="1" />
              <polygon points="250,200 310,165 310,190 250,225" fill="url(#glassRight)" stroke="rgba(5, 150, 105, 0.7)" strokeWidth="1" />

              {/* Apex Quantum Star Core */}
              <circle cx="250" cy="110" r="28" fill="url(#quantumOrbEmerald)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="250" cy="110" r="12" fill="#ffffff" />

              {/* Orbiting Concentric Matrix Rings */}
              <ellipse cx="250" cy="270" rx="180" ry="70" stroke="url(#glowGradEmerald)" strokeWidth="2" strokeDasharray="14 10" fill="none" opacity="0.8" />
              <circle cx="100" cy="300" r="8" fill="#34d399" />
              <circle cx="395" cy="240" r="9" fill="#38bdf8" />
              <circle cx="320" cy="120" r="6" fill="#34d399" />
            </g>
          )}

          {/* 4. CAREERS: Celestial Gyro Nexus & Forward Opportunity Horizon */}
          {pageTheme === 'careers' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Dual-Spectrum Atmosphere */}
              <circle cx="250" cy="250" r="140" fill="url(#quantumOrbGold)" opacity="0.32" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* Giant 3D Gimbal Orbit Rings */}
              <ellipse cx="250" cy="250" rx="205" ry="75" transform="rotate(-35 250 250)" stroke="url(#glowGradGold)" strokeWidth="2.5" fill="none" opacity="0.85" />
              <ellipse cx="250" cy="250" rx="180" ry="65" transform="rotate(45 250 250)" stroke="url(#glowGradCyan)" strokeWidth="2.2" strokeDasharray="16 10" fill="none" opacity="0.85" />
              <circle cx="250" cy="250" r="110" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="10 8" fill="none" opacity="0.6" />

              {/* Central Solaris Fusion Sphere */}
              <circle cx="250" cy="250" r="68" fill="url(#glassLeft)" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="250" cy="250" r="44" fill="url(#quantumOrbGold)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="240" cy="240" r="18" fill="#ffffff" />

              {/* Forward Trajectory Vectors */}
              <path d="M 90 380 Q 230 180 430 120" stroke="url(#glowGradGold)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="430" cy="120" r="9" fill="#fbbf24" />
              <circle cx="90" cy="380" r="8" fill="#38bdf8" />
              <circle cx="380" cy="310" r="7" fill="#fbbf24" />
              <circle cx="150" cy="160" r="7" fill="#38bdf8" />
            </g>
          )}

          {/* 5. ABOUT: Multi-Faceted Prismatic Crystal Monolith */}
          {pageTheme === 'about' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Radiant Atmosphere */}
              <circle cx="250" cy="250" r="145" fill="url(#quantumOrbCyan)" opacity="0.3" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* 3D Geometric Diamond Prism Facets */}
              <polygon points="250,75 350,185 250,250 150,185" fill="url(#solTop)" stroke="#60a5fa" strokeWidth="2" />
              <polygon points="150,185 250,250 250,425 150,315" fill="url(#solLeft)" stroke="rgba(96, 165, 250, 0.7)" strokeWidth="1.5" />
              <polygon points="250,250 350,185 350,315 250,425" fill="url(#solRight)" stroke="rgba(56, 189, 248, 0.7)" strokeWidth="1.5" />
              <polygon points="250,75 250,250 250,425" stroke="#ffffff" strokeWidth="2.2" opacity="0.8" />

              {/* Internal Refractive Crystal Core */}
              <circle cx="250" cy="235" r="34" fill="url(#quantumOrbCyan)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="250" cy="235" r="14" fill="#ffffff" />

              {/* Orbiting Halo Shields */}
              <ellipse cx="250" cy="250" rx="195" ry="80" transform="rotate(-20 250 250)" stroke="url(#glowGradCyan)" strokeWidth="2" strokeDasharray="14 10" fill="none" opacity="0.8" />
              <ellipse cx="250" cy="250" rx="160" ry="65" transform="rotate(35 250 250)" stroke="url(#glowGradViolet)" strokeWidth="1.8" fill="none" opacity="0.75" />
              <circle cx="390" cy="205" r="8" fill="#38bdf8" />
              <circle cx="110" cy="295" r="8" fill="#818cf8" />
            </g>
          )}

          {/* 6. CONTACT: Global Harmonic Pulse Beacon & Orbital Wave Array */}
          {pageTheme === 'contact' && (
            <g filter={`url(#pheroGlow-${pageTheme})`}>
              {/* Radial Beacon Atmosphere */}
              <circle cx="250" cy="250" r="145" fill="url(#quantumOrbCyan)" opacity="0.32" filter={`url(#pheroCoreGlow-${pageTheme})`} />

              {/* Concentric Spherical Pulse Wavefronts */}
              <circle cx="250" cy="250" r="185" stroke="url(#glowGradCyan)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.55" fill="none" />
              <circle cx="250" cy="250" r="145" stroke="url(#glowGradCyan)" strokeWidth="2" strokeDasharray="12 10" opacity="0.75" fill="none" />
              <circle cx="250" cy="250" r="105" stroke="#2dd4bf" strokeWidth="2.2" opacity="0.9" fill="none" />
              <circle cx="250" cy="250" r="68" fill="url(#glassLeft)" stroke="#38bdf8" strokeWidth="2" />

              {/* Central Pulsating Beacon Core */}
              <circle cx="250" cy="250" r="38" fill="url(#quantumOrbCyan)" filter={`url(#pheroCoreGlow-${pageTheme})`} />
              <circle cx="250" cy="250" r="16" fill="#ffffff" />

              {/* Omni-Directional Coordinate Rays */}
              <line x1="60" y1="250" x2="440" y2="250" stroke="url(#glowGradCyan)" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
              <line x1="250" y1="60" x2="250" y2="440" stroke="url(#glowGradCyan)" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />

              {/* Global Satellite Connection Nodes */}
              <circle cx="360" cy="170" r="8" fill="#2dd4bf" />
              <circle cx="140" cy="330" r="8" fill="#38bdf8" />
              <circle cx="380" cy="310" r="7" fill="#38bdf8" />
              <circle cx="120" cy="190" r="7" fill="#2dd4bf" />
            </g>
          )}
        </svg>

        {/* Ambient Chromatic Light Flares */}
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
