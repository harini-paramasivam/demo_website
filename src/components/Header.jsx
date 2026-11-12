import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  Code,
  Cpu,
  FileCode,
  GraduationCap,
  Globe,
  Layers,
  Megaphone,
  Menu,
  Palette,
  ScanText,
  ShieldCheck,
  Sigma,
  Sparkles,
  Terminal,
  Video,
  X,
} from 'lucide-react';
import { nav } from '../data/site.js';

const ICON_MAP = {
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  Bot,
  BrainCircuit,
  Code,
  Cpu,
  FileCode,
  GraduationCap,
  Globe,
  Layers,
  Megaphone,
  Palette,
  ScanText,
  ShieldCheck,
  Sigma,
  Sparkles,
  Terminal,
  Video,
};

function DropdownItem({ item, open, onToggle, onClose }) {
  const ref = useRef(null);
  const timer = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const enter = () => {
    clearTimeout(timer.current);
    if (!open) onToggle(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => {
      onToggle(false);
      setActiveCategory(0);
    }, 120);
  };

  const isMega = Boolean(item.megaMenu && item.categories && item.categories.length > 0);

  return (
    <li
      ref={ref}
      className={`nav__item${open ? ' is-open' : ''}${isMega ? ' nav__item--mega' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(e) => {
        if (!ref.current.contains(e.relatedTarget)) onToggle(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onToggle(false);
          ref.current.querySelector('button, a').focus();
        }
      }}
    >
      {item.to ? (
        <NavLink
          to={item.to}
          className="nav__link"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={onClose}
        >
          {item.label}
          <ChevronDown size={15} aria-hidden="true" className="nav__chev" />
        </NavLink>
      ) : (
        <button
          type="button"
          className="nav__link"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => onToggle(!open)}
        >
          {item.label}
          <ChevronDown size={15} aria-hidden="true" className="nav__chev" />
        </button>
      )}

      {isMega ? (
        <div className="nav__megamenu" role="region" aria-label={`${item.label} menu`}>
          <div className="nav__megamenu-inner">
            {/* Left Column: Vertical Category List (Image 2) */}
            <div className="nav__megamenu-sidebar">
              <div className="nav__megamenu-sidebar-head">
                <span>Categories</span>
              </div>
              <div className="nav__megamenu-categories" role="tablist">
                {item.categories.map((cat, idx) => {
                  const CatIcon = ICON_MAP[cat.icon] || BookOpen;
                  const isActive = activeCategory === idx;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`nav__megamenu-cat-btn ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveCategory(idx)}
                      onFocus={() => setActiveCategory(idx)}
                      onClick={() => setActiveCategory(idx)}
                    >
                      <span className="nav__megamenu-cat-label">
                        <CatIcon size={16} className="nav__megamenu-cat-icon" />
                        <span>{cat.name}</span>
                      </span>
                      <span className="nav__megamenu-cat-badge">
                        <span className="nav__megamenu-cat-count">{cat.count}</span>
                        {isActive && <ChevronRight size={14} className="nav__megamenu-cat-chev" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Segregated Subtopics with Unique Icons (Image 2) */}
            <div className="nav__megamenu-content">
              <div className="nav__megamenu-content-head">
                <h4 className="nav__megamenu-active-title">
                  {item.categories[activeCategory]?.name}
                </h4>
                <span className="nav__megamenu-active-count">
                  {item.categories[activeCategory]?.subtopics.length} Specializations
                </span>
              </div>

              <div className="nav__megamenu-subtopics">
                {item.categories[activeCategory]?.subtopics.map((sub) => {
                  const SubIcon = ICON_MAP[sub.icon] || BookOpen;
                  return (
                    <Link
                      key={sub.title}
                      to={sub.to}
                      className="nav__megamenu-card"
                      onClick={onClose}
                    >
                      <div className={`nav__megamenu-card-icon nav__megamenu-card-icon--${sub.color || 'blue'}`}>
                        <SubIcon size={20} />
                      </div>
                      <div className="nav__megamenu-card-body">
                        <div className="nav__megamenu-card-title">
                          <span>{sub.title}</span>
                          <ArrowRight size={13} className="nav__megamenu-card-arrow" />
                        </div>
                        <p className="nav__megamenu-card-desc">{sub.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mega-menu footer link */}
          <div className="nav__megamenu-footer">
            <span className="nav__megamenu-footer-note">Looking for end-to-end delivery or customized engagement?</span>
            <Link to={item.to} className="nav__megamenu-footer-link" onClick={onClose}>
              <span>Explore All {item.label} Overview</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <ul className="dropdown">
          {item.items.map((sub) => (
            <li key={sub.to}>
              <Link to={sub.to} onClick={onClose}>{sub.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpenMenu(null); setMobile(false); setMobileSub(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <a href="#main" className="skip">Skip to main content</a>
      <div className="container header__bar">
        <Link to="/" className="header__logo" aria-label="Velvora Solutions – home">
          <img src="/logo.png" alt="Velvora Solutions" width="910" height="305" />
        </Link>
        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {nav.map((item) =>
              item.items ? (
                <DropdownItem key={item.label} item={item} open={openMenu === item.label}
                  onToggle={(v) => setOpenMenu(v ? item.label : null)} onClose={() => setOpenMenu(null)} />
              ) : (
                <li key={item.label} className="nav__item">
                  <NavLink to={item.to} end className="nav__link">{item.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
        <Link to="/contact" className="btn btn--orange header__cta">Get in Touch <ArrowRight size={18} aria-hidden="true" /></Link>
        <button type="button" className="header__toggle" aria-label={mobile ? 'Close menu' : 'Open menu'}
          aria-expanded={mobile} aria-controls="mobile-nav" onClick={() => setMobile(!mobile)}>
          {mobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div id="mobile-nav" className={`mobile${mobile ? ' is-open' : ''}`} hidden={!mobile}>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item) =>
              item.items ? (
                <li key={item.label}>
                  <button type="button" className="mobile__row" aria-expanded={mobileSub === item.label}
                    onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}>
                    {item.label}<ChevronDown size={18} aria-hidden="true" className={mobileSub === item.label ? 'rot' : ''} />
                  </button>
                  {mobileSub === item.label && (
                    <ul className="mobile__sub">{item.items.map((s) => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}</ul>
                  )}
                </li>
              ) : (
                <li key={item.label}><Link to={item.to} className="mobile__row">{item.label}</Link></li>
              )
            )}
          </ul>
          <Link to="/contact" className="btn btn--orange btn--block">Get in Touch <ArrowRight size={18} aria-hidden="true" /></Link>
        </nav>
      </div>
    </header>
  );
}
