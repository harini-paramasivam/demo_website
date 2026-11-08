import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { company, whyChoose, homeServices, industrySolutions, transitionBannerContent } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import HeroArt from '../components/HeroArt.jsx';
import HeroCyberWave from '../components/HeroCyberWave.jsx';
import ServicesStream from '../components/ServicesStream.jsx';
import SectorBlueprint from '../components/SectorBlueprint.jsx';
import TrustArchitecture from '../components/TrustArchitecture.jsx';
import CaseStudySpotlight from '../components/CaseStudySpotlight.jsx';
import { SectionHead, CtaBand } from '../components/ui.jsx';
import { useReveal, CountUp } from '../components/hooks.jsx';

export default function Home() {
  useReveal();

  useEffect(() => {
    // Ensure data-theme is cleared so the website strictly uses the new logo static brand palette
    document.documentElement.removeAttribute('data-theme');

    // Preload all slide images for instant, zero-latency 3-second transitions
    transitionBannerContent.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, []);

  const [heroIdx, setHeroIdx] = useState(0);
  const totalSlides = transitionBannerContent.length;

  const nextHeroSlide = () => {
    setHeroIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevHeroSlide = () => {
    setHeroIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    nextHeroSlide();
  };

  const handlePrev = () => {
    prevHeroSlide();
  };

  const handleSelect = (idx) => {
    setHeroIdx(idx);
  };

  // Automatic slide rotation every 3 seconds seamlessly & continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  // Keyboard navigation support (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSlide = transitionBannerContent[heroIdx] || transitionBannerContent[0];

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

  return (
    <>
      {/* 1. FUTURISTIC HERO BANNER (INSPIRED BY REFERENCE DESIGN) */}
      <section 
        className="hero hero--cinematic hero--ref-style" 
        aria-labelledby="hero-title"
      >
        {/* Atmospheric Volumetric Light Beams */}
        <div className="hero-ambient-mesh" aria-hidden="true" />
        <HeroCyberWave />
        <div className="hero-light-beam hero-light-beam--1" aria-hidden="true" />
        <div className="hero-light-beam hero-light-beam--2" aria-hidden="true" />

        {/* Minimalist Right Rail Navigation (PREV / NEXT - No 1/6 counter) */}
        <div className="hero-ref-rail-nav">
          <button 
            type="button" 
            onClick={handlePrev} 
            className="hero-ref-rail-btn"
            aria-label="Previous slide"
          >
            PREV
          </button>
          <span className="hero-ref-rail-line" aria-hidden="true" />
          <button 
            type="button" 
            onClick={handleNext} 
            className="hero-ref-rail-btn"
            aria-label="Next slide"
          >
            NEXT
          </button>
        </div>

        <div className="container hero-ref-container">
          <div className="hero-ref-stage-grid">
            {/* LEFT COLUMN: Editorial Typography & Glowing Capsule CTA */}
            <div className="hero-ref-copy">
              {/* Lighter, Translucent Geometric Triangle Prism on Left Behind Content */}
              <div className="hero-ref-prism hero-ref-prism--left" aria-hidden="true" />

              {/* Minimalist Category Eyebrow */}
              <div className="hero-ref-eyebrow" key={`eyebrow-${heroIdx}`}>
                <span className="hero-pill-radar" aria-hidden="true" />
                <Icon name={currentSlide.icon} size={15} />
                <span>{currentSlide.tag || currentSlide.title}</span>
              </div>

              {/* Bold Stacked Display Headline */}
              <h1 id="hero-title" className="hero-ref-headline" key={`head-${heroIdx}`}>
                <span className="hero-ref-headline__prefix">{currentSlide.headlinePrefix}</span>
                <span className="hero-ref-headline__accent">{currentSlide.headlineAccent}</span>
              </h1>

              {/* Supporting Editorial Description */}
              <p className="hero-ref-desc" key={`desc-${heroIdx}`}>
                {currentSlide.desc}
              </p>

              {/* Capabilities Pill Strip */}
              <div className="hero-ref-chips" key={`chips-${heroIdx}`}>
                {currentSlide.chips.map((chip) => (
                  <span key={chip} className="hero-ref-chip">
                    <span className="hero-chip-bullet" aria-hidden="true" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>

              {/* Glowing Capsule Action Buttons */}
              <div className="hero-ref-btn-row">
                <Link to="/contact" className="hero-ref-btn-primary">
                  <span>Get in Touch</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#services-glance" className="hero-ref-btn-secondary">
                  <span>Explore Services</span>
                </a>
              </div>
            </div>

            {/* CENTER / RIGHT COLUMN: Borderless 3D Artwork & Glowing Geometric Prism */}
            <HeroArt 
              activeIdx={heroIdx}
              setActiveIdx={handleSelect}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>

          {/* INTEGRATED BOTTOM FROSTED GLASS DECK (Exactly as in Reference Design) */}
          <div className="hero-ref-dock" role="region" aria-label="Service capability deck">
            <div className="hero-ref-dock__col">
              <span className="hero-ref-dock__label">WHAT WE DO</span>
              <strong className="hero-ref-dock__title">{currentSlide.badgeTop?.label || currentSlide.title}</strong>
              <p className="hero-ref-dock__sub">{currentSlide.badgeTop?.sub || currentSlide.chips.slice(0, 3).join(' · ')}</p>
            </div>

            <div className="hero-ref-dock__col">
              <span className="hero-ref-dock__label">OUR MISSION &amp; ASSURANCE</span>
              <strong className="hero-ref-dock__title">{currentSlide.badgeBottom?.label || 'Universal Accessibility'}</strong>
              <p className="hero-ref-dock__sub">{currentSlide.badgeBottom?.sub || 'WCAG 2.2 Level AA · Section 508 · PDF/UA Verified'}</p>
            </div>

            <div className="hero-ref-dock__col hero-ref-dock__col--tracks">
              <span className="hero-ref-dock__label">SLIDE SEQUENCE</span>
              <div className="hero-ref-dock__segments" role="tablist" aria-label="Select hero slide">
                {transitionBannerContent.map((slide, idx) => (
                  <button
                    key={slide.title}
                    type="button"
                    role="tab"
                    aria-selected={heroIdx === idx}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    className={`hero-ref-dock__seg${heroIdx === idx ? ' is-active' : ''}${heroIdx > idx ? ' is-passed' : ''}`}
                    onClick={() => handleSelect(idx)}
                    title={slide.title}
                  >
                    <span className="hero-ref-dock__track">
                      <span
                        className="hero-ref-dock__fill"
                        style={{
                          animationDuration: heroIdx === idx ? '3000ms' : '0s',
                          animationPlayState: 'running',
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NUMBERS STRIP - LUMINOUS METRIC PODS */}
        <div className="container stats" aria-label="Key company statistics">
          <div className="stat-card">
            <div className="stat-card__icon">
              <Icon name="Globe" size={20} />
            </div>
            <b className="stat-card__num">
              <CountUp to={5} /><span className="stat-card__plus">+</span>
            </b>
            <span className="stat-card__label">Countries Reached</span>
            <span className="stat-card__sub">Global Delivery</span>
            <div className="stat-card__bar" />
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <Icon name="FileCode" size={20} />
            </div>
            <b className="stat-card__num">
              <CountUp to={500} /><span className="stat-card__plus">+</span>
            </b>
            <span className="stat-card__label">XML Titles Structured</span>
            <span className="stat-card__sub">Publishing Standards</span>
            <div className="stat-card__bar" />
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <Icon name="GraduationCap" size={20} />
            </div>
            <b className="stat-card__num">
              <CountUp to={2000} /><span className="stat-card__plus">+</span>
            </b>
            <span className="stat-card__label">Training Hours Delivered</span>
            <span className="stat-card__sub">Continuous Upskilling</span>
            <div className="stat-card__bar" />
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <Icon name="Users" size={20} />
            </div>
            <b className="stat-card__num">
              <CountUp to={30} /><span className="stat-card__plus">+</span>
            </b>
            <span className="stat-card__label">Skilled Specialists</span>
            <span className="stat-card__sub">In-House Experts</span>
            <div className="stat-card__bar" />
          </div>
        </div>

        <p className="scroll" aria-hidden="true">
          Scroll<i />
        </p>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="section intro-section" aria-labelledby="intro-head">
        <div className="container">
          <div className="intro-card reveal">
            {/* Innovative Cybernetic Background Graphic (fills empty space on left & right of wording) */}
            <div className="intro-card__bg-graphic" aria-hidden="true">
              <div className="intro-card__aurora intro-card__aurora--left" />
              <div className="intro-card__aurora intro-card__aurora--right" />
              <div className="intro-card__aurora intro-card__aurora--center" />
              
              {/* Left Orbit Telemetry HUD behind left heading */}
              <div className="intro-card__hud-left">
                <svg viewBox="0 0 320 320" className="intro-hud-svg" fill="none">
                  <circle cx="160" cy="160" r="140" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" strokeDasharray="5 7" />
                  <circle cx="160" cy="160" r="105" stroke="rgba(0, 210, 255, 0.4)" strokeWidth="1.5" strokeDasharray="14 10 4 10" className="intro-hud-spin" />
                  <circle cx="160" cy="160" r="70" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1" strokeDasharray="8 6" />
                  <circle cx="160" cy="160" r="4.5" fill="#00d2ff" />
                  <line x1="160" y1="10" x2="160" y2="310" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" />
                  <line x1="10" y1="160" x2="310" y2="160" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" />
                  <polygon points="160,115 198,137 198,183 160,205 122,183 122,137" stroke="rgba(0, 210, 255, 0.45)" strokeWidth="1.2" fill="rgba(0, 210, 255, 0.04)" />
                </svg>
              </div>

              {/* Right Cyber Mesh & Node Constellation behind right text & tags */}
              <div className="intro-card__hud-right">
                <svg viewBox="0 0 380 320" className="intro-hud-svg" fill="none">
                  <path d="M 30,160 Q 130,50 250,130 T 360,90" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.5" strokeDasharray="6 5" />
                  <path d="M 20,230 Q 150,290 270,190 T 370,250" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.5" />
                  <path d="M 60,70 L 170,140 L 290,80 L 350,160 L 270,230 L 150,210 Z" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1" strokeDasharray="4 6" fill="rgba(56, 189, 248, 0.03)" />
                  <circle cx="60" cy="70" r="4" fill="#38bdf8" className="intro-node-pulse" />
                  <circle cx="170" cy="140" r="5" fill="#00d2ff" className="intro-node-pulse" />
                  <circle cx="290" cy="80" r="4.5" fill="#a78bfa" className="intro-node-pulse" />
                  <circle cx="350" cy="160" r="4" fill="#38bdf8" />
                  <circle cx="270" cy="230" r="4.5" fill="#60a5fa" />
                  <circle cx="150" cy="210" r="3.5" fill="#a78bfa" />
                </svg>
              </div>

              {/* High-tech Cyber Grid Lines */}
              <div className="intro-card__grid-overlay" />
            </div>

            {/* Corner Tech Accents */}
            <span className="intro-card__corner intro-card__corner--tl" aria-hidden="true" />
            <span className="intro-card__corner intro-card__corner--tr" aria-hidden="true" />
            <span className="intro-card__corner intro-card__corner--bl" aria-hidden="true" />
            <span className="intro-card__corner intro-card__corner--br" aria-hidden="true" />

            <div className="intro-card__header">
              <span className="badge-eyebrow">
                <Icon name="Sparkles" size={16} /> Partner with Velvora
              </span>
              <h2 id="intro-head" className="intro-card__title">
                Your Content and Technology Partner, from Manuscript to Millions of Readers
              </h2>
            </div>
            <div className="intro-card__body">
              <p className="intro-card__text">
                Velvora Solutions is a content and technology services company. We combine ePublishing, XML, digital accessibility, AI automation, website development, software development, data analytics, and digital marketing to make your content well-structured, standards-compliant, discoverable, and usable by everyone, including people who rely on assistive technologies.
              </p>
              <div className="intro-card__tags">
                <span className="intro-tag">ePublishing &amp; XML</span>
                <span className="intro-tag">Digital Accessibility</span>
                <span className="intro-tag">AI Automation</span>
                <span className="intro-tag">Web &amp; Software</span>
                <span className="intro-tag">Data Analytics</span>
                <span className="intro-tag">Digital Marketing</span>
                <span className="intro-tag">Training &amp; Skills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES AT A GLANCE */}
      <section id="services-glance" className="section section--tint" aria-labelledby="services-head">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities Overview"
            title="Services at a Glance"
          >
            We convert, structure, and remediate content so it can be published anywhere and read by anyone.
          </SectionHead>
          
          <ServicesStream />

          {/* Centered View All Button */}
          <div className="glance-cta-wrap">
            <Link to="/services" className="btn btn--orange btn--lg">
              <span>View All Services</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHO WE SERVE */}
      <section className="section section--paper" aria-labelledby="industry-head">
        <div className="container">
          <SectionHead
            eyebrow="Who We Serve"
            title="Solutions for Your Industry"
          >
            Purpose-built workflows, regulatory conformance, and technology ecosystems configured for your domain.
          </SectionHead>

          <SectorBlueprint />
        </div>
      </section>

      {/* 5. WHY CHOOSE VELVORA */}
      <section className="section why-section-dark netbg" aria-labelledby="why-head">
        <div className="container">
          <SectionHead
            eyebrow="The Velvora Advantage"
            title="Why Choose Velvora"
            dark={true}
          >
            Publishing know-how meets accessibility excellence. Here is why leading publishers and enterprises partner with us.
          </SectionHead>
          
          <TrustArchitecture />
        </div>
      </section>

      {/* 7. CASE STUDY TEASER */}
      <CaseStudySpotlight />

      {/* 8. CLOSING CALL TO ACTION */}
      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore Our Services"
        secondaryBtnTo="/services"
      />
    </>
  );
}
