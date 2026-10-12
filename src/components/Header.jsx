import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { nav } from '../data/site.js';

function DropdownItem({ item, open, onToggle, onClose }) {
  const ref = useRef(null);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); if (!open) onToggle(true); };
  const leave = () => { timer.current = setTimeout(() => onToggle(false), 120); };
  return (
    <li
      ref={ref}
      className={`nav__item${open ? ' is-open' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(e) => { if (!ref.current.contains(e.relatedTarget)) onToggle(false); }}
      onKeyDown={(e) => { if (e.key === 'Escape') { onToggle(false); ref.current.querySelector('button').focus(); } }}
    >
      <button type="button" className="nav__link" aria-expanded={open} aria-haspopup="true" onClick={() => onToggle(!open)}>
        {item.label}<ChevronDown size={15} aria-hidden="true" className="nav__chev" />
      </button>
      <ul className="dropdown">
        {item.items.map((sub) => (
          <li key={sub.to}><Link to={sub.to} onClick={onClose}>{sub.label}</Link></li>
        ))}
      </ul>
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
          <img src="/logo.png" alt="Velvora Solutions" width="735" height="679" />
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
