import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Layers, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  Grid,
  FileCheck2,
  BookOpen,
  Mail,
  Phone,
  Clock,
  ArrowUp
} from 'lucide-react';
import { company, whyChoose, numbersStrip } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import HeroArt from '../components/HeroArt.jsx';
import AboutArt from '../components/AboutArt.jsx';
import TransitionBannerSlider from '../components/TransitionBannerSlider.jsx';
import HomeServicesSlider from '../components/HomeServicesSlider.jsx';
import IndustrySolutionsSlider from '../components/IndustrySolutionsSlider.jsx';
import CaseStudySpotlight from '../components/CaseStudySpotlight.jsx';
import { CtaBand } from '../components/ui.jsx';
import { CountUp } from '../components/hooks.jsx';

const SLIDES = [
  { id: 'hero', number: '01', title: 'Home & Overview', tag: 'VELVORA INTRO' },
  { id: 'pillars', number: '02', title: '7 Core Capabilities', tag: 'TRANSITION SHOWCASE' },
  { id: 'about', number: '03', title: 'Content & Tech Partner', tag: 'ABOUT VELVORA' },
  { id: 'services', number: '04', title: 'Services at a Glance', tag: 'CORE OFFERINGS' },
  { id: 'industries', number: '05', title: 'Solutions for Your Industry', tag: 'WHO WE SERVE' },
  { id: 'why', number: '06', title: 'Why Choose Velvora', tag: 'STANDARDS & TRUST' },
  { id: 'case-study', number: '07', title: 'Featured Case Study', tag: 'SUCCESS STORY' },
  { id: 'cta', number: '08', title: 'Get in Touch', tag: 'READY TO START' }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideDeckMode, setIsSlideDeckMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef(null);
  const slideContainerRef = useRef(null);

  const totalSlides = SLIDES.length;

  // SEO Update
  useEffect(() => {
    document.title = 'Velvora Solutions | ePublishing, XML, Accessibility, AI, Data, and Digital Marketing Services';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Velvora Solutions delivers ePublishing, XML, digital accessibility, AI automation, website development, software development, data analytics, and digital marketing services for publishers, universities, enterprises, and government organizations worldwide.'
      );
    }
  }, []);

  const goToSlide = (index) => {
    const nextIdx = Math.max(0, Math.min(totalSlides - 1, index));
    setCurrentSlide(nextIdx);
    if (!isSlideDeckMode) {
      const el = document.getElementById(SLIDES[nextIdx].id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    if (isSlideDeckMode) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    if (isSlideDeckMode) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for slide deck
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (autoPlay && isSlideDeckMode) {
      autoPlayRef.current = setInterval(nextSlide, 9000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, isSlideDeckMode, currentSlide]);

  return (
    <div className={`deck-master${isSlideDeckMode ? ' is-slide-mode' : ' is-scroll-mode'}`} ref={slideContainerRef}>
      {/* 1. TOP SLIDE PRESENTATION HUD BAR */}
      <div className="deck-hud-top" role="toolbar" aria-label="Slide Deck Navigation">
        <div className="container deck-hud-top__in">
          <div className="deck-hud-branding">
            <span className="deck-hud-live-dot" />
            <span className="deck-hud-badge">INTERACTIVE PRESENTATION</span>
            <span className="deck-hud-slide-title">
              Slide <strong>{SLIDES[currentSlide].number}</strong>: {SLIDES[currentSlide].title}
            </span>
          </div>

          {/* Quick Clickable Slide Nav Tabs */}
          <div className="deck-tabs-nav" role="tablist" aria-label="Slides">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={currentSlide === idx}
                className={`deck-tab-pill${currentSlide === idx ? ' is-active' : ''}`}
                onClick={() => goToSlide(idx)}
                title={`Jump to ${s.number}: ${s.title}`}
              >
                <span className="deck-tab-pill__num">{s.number}</span>
                <span className="deck-tab-pill__label">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
          <div className="deck-hud-actions">
            <button
              type="button"
              className={`deck-mode-toggle${isSlideDeckMode ? ' is-active' : ''}`}
              onClick={() => setIsSlideDeckMode(!isSlideDeckMode)}
              title={isSlideDeckMode ? 'Switch to Continuous Scroll' : 'Switch to Slide Deck Mode'}
            >
              {isSlideDeckMode ? (
                <>
                  <Sliders size={15} />
                  <span>Slide Mode</span>
                </>
              ) : (
                <>
                  <Grid size={15} />
                  <span>Scroll View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Slide Progress Bar */}
        <div className="deck-progress-track">
          <div 
            className="deck-progress-fill" 
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }} 
          />
        </div>
      </div>

      {/* 2. THE SLIDE STAGE */}
      <div className="deck-stage">

        {/* ==================== SLIDE 01: HERO & STATS ==================== */}
        <div 
          id="hero" 
          className={`deck-slide netbg${currentSlide === 0 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 0}
        >
          <div className="deck-slide__ambient" />
          <div className="container hero__in deck-slide__container">
            <div className="hero__copy">
              <div className="deck-slide-tag">
                <span className="deck-slide-tag__num">SLIDE 01 / 08</span>
                <span>GLOBAL CONTENT &amp; DIGITAL AUTOMATION</span>
              </div>
              <p className="pill">
                <i />
                ePublishing · XML · Digital Accessibility · AI &amp; Tech
              </p>
              <h1>
                Content That Works for <span className="accent">Everyone, Everywhere</span>
              </h1>
              <span className="rule" aria-hidden="true" />
              <p className="lead lead--dark">
                {company.heroSubheading}
              </p>

              <div className="btn-row">
                <Link to="/contact" className="btn btn--orange btn--lg">
                  Get in Touch <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <button 
                  type="button" 
                  onClick={() => goToSlide(3)} 
                  className="btn btn--outline btn--lg"
                >
                  Explore Our Services <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              <ul className="chips" aria-label="Core focus areas">
                <li>EPUB 2 &amp; 3</li>
                <li>JATS / BITS XML</li>
                <li>WCAG 2.2</li>
                <li>PDF/UA</li>
                <li>AI Automation</li>
                <li>Data Analytics</li>
                <li>Web &amp; Software Dev</li>
              </ul>
            </div>
            
            <HeroArt />
          </div>

          {/* Numbers Strip Banner */}
          <div className="container stats stats--deck" aria-label="Key statistics">
            <div>
              <b><CountUp to={5} />+</b>
              <span>Countries Reached</span>
            </div>
            <div>
              <b><CountUp to={500} />+</b>
              <span>XML Titles Structured</span>
            </div>
            <div>
              <b><CountUp to={2000} />+</b>
              <span>Training Hours Delivered</span>
            </div>
            <div>
              <b><CountUp to={30} />+</b>
              <span>Skilled Specialists</span>
            </div>
          </div>

          {isSlideDeckMode && (
            <div className="deck-slide-quick-nav container">
              <button 
                type="button" 
                className="btn btn--orange deck-next-banner-btn"
                onClick={nextSlide}
              >
                <span>Proceed to Slide 02: 7 Core Capabilities</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ==================== SLIDE 02: 7 CORE PILLARS ==================== */}
        <div 
          id="pillars" 
          className={`deck-slide deck-slide--pillars${currentSlide === 1 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 1}
        >
          <div className="deck-slide-header container">
            <div className="deck-slide-tag">
              <span className="deck-slide-tag__num">SLIDE 02 / 08</span>
              <span>CORE TRANSITION PILLARS</span>
            </div>
            <h2>The 7 Core Capabilities of Velvora Solutions</h2>
            <p className="lead lead--dark">
              From XML conversion and EPUB accessibility to AI automation, software engineering, and digital marketing.
            </p>
          </div>

          <TransitionBannerSlider />

          {isSlideDeckMode && (
            <div className="deck-slide-quick-nav container">
              <button type="button" className="deck-back-btn" onClick={prevSlide}>
                <ChevronLeft size={16} /> Back to Hero
              </button>
              <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                <span>Proceed to Slide 03: Content &amp; Technology Partner</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ==================== SLIDE 03: ABOUT / INTRO ==================== */}
        <div 
          id="about" 
          className={`deck-slide deck-slide--light${currentSlide === 2 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 2}
        >
          <div className="container deck-about-grid">
            <div className="deck-about-left">
              <div className="deck-slide-tag deck-slide-tag--light">
                <span className="deck-slide-tag__num">SLIDE 03 / 08</span>
                <span>ABOUT VELVORA SOLUTIONS</span>
              </div>
              <h2 className="xl">
                Your Content and Technology Partner, from <br />
                <span className="blue">Manuscript to Millions of Readers</span>
              </h2>
              <p className="lead">
                {company.introText}
              </p>

              {/* Ecosystem Grid */}
              <div className="intro-pillars-grid">
                <div className="intro-pillar-card">
                  <ShieldCheck size={22} className="intro-pillar-card__icon" />
                  <div>
                    <strong>Standards-First Precision</strong>
                    <small>WCAG 2.2, PDF/UA, EPUB 3 &amp; JATS XML</small>
                  </div>
                </div>
                <div className="intro-pillar-card">
                  <Sparkles size={22} className="intro-pillar-card__icon" />
                  <div>
                    <strong>Human + Tool Checks</strong>
                    <small>Real screen readers &amp; verified compliance</small>
                  </div>
                </div>
              </div>

              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link to="/about/company-overview" className="btn btn--orange btn--lg">
                  About Velvora Solutions <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/about/our-team" className="btn btn--navy btn--lg">
                  Meet Our Team <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="deck-about-right">
              <div className="artpanel">
                <AboutArt />
              </div>
            </div>
          </div>

          {isSlideDeckMode && (
            <div className="deck-slide-quick-nav container">
              <button type="button" className="deck-back-btn" onClick={prevSlide}>
                <ChevronLeft size={16} /> Back to Capabilities
              </button>
              <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                <span>Proceed to Slide 04: Services at a Glance</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ==================== SLIDE 04: SERVICES AT A GLANCE ==================== */}
        <div 
          id="services" 
          className={`deck-slide deck-slide--tint${currentSlide === 3 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 3}
        >
          <div className="container">
            <div className="deck-slide-header">
              <div className="deck-slide-tag deck-slide-tag--light">
                <span className="deck-slide-tag__num">SLIDE 04 / 08</span>
                <span>SERVICES AT A GLANCE</span>
              </div>
              <h2>Complete Content and Technology Services Under One Roof</h2>
              <p className="lead">
                Explore our 6 foundational service domains engineered for modern publishers, enterprises, and educational institutions worldwide.
              </p>
            </div>

            <HomeServicesSlider />

            {isSlideDeckMode && (
              <div className="deck-slide-quick-nav">
                <button type="button" className="deck-back-btn" onClick={prevSlide}>
                  <ChevronLeft size={16} /> Back to About
                </button>
                <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                  <span>Proceed to Slide 05: Solutions for Your Industry</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ==================== SLIDE 05: WHO WE SERVE ==================== */}
        <div 
          id="industries" 
          className={`deck-slide deck-slide--paper${currentSlide === 4 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 4}
        >
          <div className="container">
            <div className="deck-slide-header">
              <div className="deck-slide-tag deck-slide-tag--light">
                <span className="deck-slide-tag__num">SLIDE 05 / 08</span>
                <span>WHO WE SERVE</span>
              </div>
              <h2>Solutions for Your Industry</h2>
              <p className="lead">
                Specialized workflows, regulatory conformance architectures, and digital scaling tailored to your sector.
              </p>
            </div>

            <IndustrySolutionsSlider />

            {isSlideDeckMode && (
              <div className="deck-slide-quick-nav">
                <button type="button" className="deck-back-btn" onClick={prevSlide}>
                  <ChevronLeft size={16} /> Back to Services
                </button>
                <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                  <span>Proceed to Slide 06: Why Choose Velvora</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ==================== SLIDE 06: WHY CHOOSE VELVORA ==================== */}
        <div 
          id="why" 
          className={`deck-slide deck-slide--light${currentSlide === 5 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 5}
        >
          <div className="container">
            <div className="deck-slide-header">
              <div className="deck-slide-tag deck-slide-tag--light">
                <span className="deck-slide-tag__num">SLIDE 06 / 08</span>
                <span>WHY CHOOSE VELVORA</span>
              </div>
              <h2>Standards, expertise, and precision you can count on</h2>
              <p className="lead">
                Publishing know-how meets accessibility excellence and modern technology. Here is why leading publishers and enterprises partner with us.
              </p>
            </div>

            <ul className="why deck-why-grid">
              {whyChoose.map((item, i) => (
                <li key={item.title} className="why__card">
                  <div className="why__top">
                    <span className="why__icon">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span className="why__num">0{i + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>

            {isSlideDeckMode && (
              <div className="deck-slide-quick-nav">
                <button type="button" className="deck-back-btn" onClick={prevSlide}>
                  <ChevronLeft size={16} /> Back to Industries
                </button>
                <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                  <span>Proceed to Slide 07: Featured Case Study</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ==================== SLIDE 07: CASE STUDY SPOTLIGHT ==================== */}
        <div 
          id="case-study" 
          className={`deck-slide deck-slide--case${currentSlide === 6 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 6}
        >
          <div className="container">
            <div className="deck-slide-header deck-slide-header--dark">
              <div className="deck-slide-tag">
                <span className="deck-slide-tag__num">SLIDE 07 / 08</span>
                <span>CASE STUDY SPOTLIGHT</span>
              </div>
              <h2>Making a 5,000-Title EPUB Library Accessible</h2>
              <p className="lead lead--dark">
                A leading publisher needed its back-catalogue to meet EPUB Accessibility 1.1 ahead of a regulatory deadline.
              </p>
            </div>

            <CaseStudySpotlight />

            {isSlideDeckMode && (
              <div className="deck-slide-quick-nav">
                <button type="button" className="deck-back-btn deck-back-btn--dark" onClick={prevSlide}>
                  <ChevronLeft size={16} /> Back to Why Choose
                </button>
                <button type="button" className="btn btn--orange deck-next-banner-btn" onClick={nextSlide}>
                  <span>Proceed to Slide 08: Closing CTA &amp; Contact</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ==================== SLIDE 08: CLOSING CALL TO ACTION ==================== */}
        <div 
          id="cta" 
          className={`deck-slide deck-slide--cta netbg${currentSlide === 7 || !isSlideDeckMode ? ' is-visible' : ' is-hidden'}`}
          aria-hidden={isSlideDeckMode && currentSlide !== 7}
        >
          <div className="container deck-cta-box">
            <div className="deck-slide-tag">
              <span className="deck-slide-tag__num">SLIDE 08 / 08</span>
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="deck-cta-title">
              Ready to Make Your Content <span className="accent">Accessible and Future-Ready?</span>
            </h2>
            <p className="deck-cta-text">
              Tell us about your project and our team will respond within one business day.
            </p>

            <div className="deck-cta-buttons">
              <Link to="/contact" className="btn btn--orange btn--lg">
                Get in Touch <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <button 
                type="button" 
                onClick={() => goToSlide(0)} 
                className="btn btn--outline btn--lg"
              >
                Restart Presentation <ArrowUp size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Direct Contact Pillars Strip */}
            <div className="deck-contact-strip">
              <div className="deck-contact-item">
                <Mail size={18} className="deck-contact-icon" />
                <div>
                  <strong>Direct Email</strong>
                  <span>{company.email}</span>
                </div>
              </div>
              <div className="deck-contact-item">
                <Phone size={18} className="deck-contact-icon" />
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <span>{company.phone}</span>
                </div>
              </div>
              <div className="deck-contact-item">
                <Clock size={18} className="deck-contact-icon" />
                <div>
                  <strong>Response SLA</strong>
                  <span>Within 1 Business Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. FLOATING BOTTOM SLIDE CONTROLLER DECK */}
      <aside className="deck-controller" aria-label="Slide Deck Controls">
        <div className="deck-controller__in">
          <button
            type="button"
            className="deck-nav-arrow"
            onClick={prevSlide}
            aria-label="Previous Slide (Keyboard: Left Arrow)"
            title="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="deck-controller__info">
            <span className="deck-controller__indicator">
              SLIDE <strong>{SLIDES[currentSlide].number}</strong> / {SLIDES.length}
            </span>
            <span className="deck-controller__name">
              {SLIDES[currentSlide].title}
            </span>
          </div>

          <button
            type="button"
            className="deck-nav-arrow"
            onClick={nextSlide}
            aria-label="Next Slide (Keyboard: Right Arrow or Space)"
            title="Next Slide"
          >
            <ChevronRight size={22} />
          </button>

          <div className="deck-controller__sep" />

          <button
            type="button"
            className={`deck-auto-btn${autoPlay ? ' is-playing' : ''}`}
            onClick={() => setAutoPlay(!autoPlay)}
            aria-label={autoPlay ? 'Pause Auto-Advance' : 'Start Auto-Advance'}
            title={autoPlay ? 'Pause Auto-Advance' : 'Start Auto-Advance (9s per slide)'}
          >
            {autoPlay ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className="deck-keyboard-hint">
            <span>Keys: ◀ ▶</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
