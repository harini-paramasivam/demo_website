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
  Mail,
  Megaphone,
  Menu,
  Palette,
  Phone,
  ScanText,
  ShieldCheck,
  Sigma,
  Sparkles,
  Terminal,
  Video,
  X,
} from 'lucide-react';
import { nav, company } from '../data/site.js';

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
            {/* Left Column: Vertical Category List */}
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

            {/* Right Column: Segregated Subtopics with Unique Icons */}
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

  useEffect(() => {
    setOpenMenu(null);
    setMobile(false);
    setMobileSub(null);
  }, [pathname]);

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
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

  const closeMobile = () => {
    setMobile(false);
    setMobileSub(null);
  };

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#main" className="skip">Skip to main content</a>
        <div className="container header__bar">
          <Link to="/" className="header__logo" aria-label="Velvora Solutions – home" onClick={closeMobile}>
            <img src="/logo.png" alt="Velvora Solutions" width="910" height="305" />
          </Link>
          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              {nav.map((item) =>
                item.items ? (
                  <DropdownItem
                    key={item.label}
                    item={item}
                    open={openMenu === item.label}
                    onToggle={(v) => setOpenMenu(v ? item.label : null)}
                    onClose={() => setOpenMenu(null)}
                  />
                ) : (
                  <li key={item.label} className="nav__item">
                    <NavLink to={item.to} end className="nav__link">{item.label}</NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>
          <Link to="/contact" className="btn btn--orange header__cta">
            Get in Touch <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="header__toggle"
            aria-label={mobile ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      </header>

      {/* MOBILE NAVIGATION DRAWER: Rendered outside <header> to escape backdrop-filter containing-block coordinate trap */}
      <div
        id="mobile-nav"
        className={`mobile${mobile ? ' is-open' : ''}`}
        aria-hidden={!mobile}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile__backdrop" onClick={closeMobile} aria-hidden="true" />
        <div className="mobile__panel">
          <nav aria-label="Mobile Navigation" className="mobile__nav">
            <ul className="mobile__list">
              {nav.map((item) => {
                const hasChildren = Boolean(item.items || item.categories);
                const isOpen = mobileSub === item.label;

                if (!hasChildren) {
                  return (
                    <li key={item.label} className="mobile__item">
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `mobile__row ${isActive ? 'is-active' : ''}`}
                        onClick={closeMobile}
                      >
                        <span className="mobile__row-text">{item.label}</span>
                        <ChevronRight size={18} className="mobile__row-arrow" />
                      </NavLink>
                    </li>
                  );
                }

                return (
                  <li key={item.label} className={`mobile__item ${isOpen ? 'is-expanded' : ''}`}>
                    <button
                      type="button"
                      className={`mobile__row mobile__row--btn ${isOpen ? 'is-active' : ''}`}
                      aria-expanded={isOpen}
                      onClick={() => setMobileSub(isOpen ? null : item.label)}
                    >
                      <span className="mobile__row-text">{item.label}</span>
                      <ChevronDown size={18} className={`mobile__row-chev ${isOpen ? 'rot' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="mobile__sub-panel">
                        {item.categories ? (
                          <div className="mobile__cats">
                            <Link
                              to={item.to}
                              className="mobile__overview-link"
                              onClick={closeMobile}
                            >
                              <span>Explore All {item.label} (Overview)</span>
                              <ArrowRight size={15} />
                            </Link>

                            {item.categories.map((cat) => {
                              const CatIcon = ICON_MAP[cat.icon] || BookOpen;
                              return (
                                <div key={cat.id} className="mobile__cat-section">
                                  <div className="mobile__cat-heading">
                                    <CatIcon size={15} className="mobile__cat-heading-icon" />
                                    <span>{cat.name}</span>
                                    <span className="mobile__cat-heading-count">({cat.subtopics.length})</span>
                                  </div>
                                  <ul className="mobile__cat-links">
                                    {cat.subtopics.map((sub) => {
                                      const SubIcon = ICON_MAP[sub.icon] || BookOpen;
                                      return (
                                        <li key={sub.title}>
                                          <Link
                                            to={sub.to}
                                            className="mobile__subtopic-card"
                                            onClick={closeMobile}
                                          >
                                            <span className={`mobile__subtopic-icon mobile__subtopic-icon--${sub.color || 'blue'}`}>
                                              <SubIcon size={16} />
                                            </span>
                                            <span className="mobile__subtopic-content">
                                              <span className="mobile__subtopic-title">{sub.title}</span>
                                              {sub.desc && <span className="mobile__subtopic-desc">{sub.desc}</span>}
                                            </span>
                                            <ChevronRight size={14} className="mobile__subtopic-arrow" />
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <ul className="mobile__sub-list">
                            {item.items.map((sub) => (
                              <li key={sub.to}>
                                <NavLink
                                  to={sub.to}
                                  className={({ isActive }) => `mobile__sub-link ${isActive ? 'is-active' : ''}`}
                                  onClick={closeMobile}
                                >
                                  <span>{sub.label}</span>
                                  <ChevronRight size={14} className="mobile__sub-arrow" />
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mobile__cta-wrap">
              <Link to="/contact" className="btn btn--orange btn--block mobile__contact-btn" onClick={closeMobile}>
                <span>Get in Touch</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <div className="mobile__quick-info">
                <a href={`mailto:${company.email}`} className="mobile__info-row">
                  <Mail size={15} />
                  <span>{company.email}</span>
                </a>
                <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="mobile__info-row">
                  <Phone size={15} />
                  <span>{company.phone}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
