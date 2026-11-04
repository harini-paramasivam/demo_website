import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { company, whyChoose, homeServices, industrySolutions, transitionBannerContent } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import HeroArt from '../components/HeroArt.jsx';
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
  }, []);

  const [heroIdx, setHeroIdx] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const totalSlides = transitionBannerContent.length;
  const timerRef = useRef(null);

  const nextHeroSlide = () => {
    setHeroIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevHeroSlide = () => {
    setHeroIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isHeld) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextHeroSlide, 4000); // 4-second synchronized auto transition
    return () => clearInterval(timerRef.current);
  }, [heroIdx, isHeld]);

  const currentSlide = transitionBannerContent[heroIdx];

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
      {/* 1. HERO SECTION */}
      <section className="hero netbg" aria-labelledby="hero-title">
        <div className="container hero__in">
          <div className="hero__copy">
            <p className="pill">
              <i />
              Content &amp; Technology Services
            </p>
            <h1 id="hero-title" className="hero-main-h1">
              Content That Works for <span className="accent">Everyone, Everywhere</span>
            </h1>
            <p className="lead lead--dark hero-main-lead">
              We help publishers, universities, enterprises, and government organizations create structured, accessible content and smarter digital workflows—from ePublishing and XML to AI, software, data analytics, and digital marketing.
            </p>
            <div className="btn-row hero-main-btns">
              <Link to="/contact" className="btn btn--orange btn--lg">
                Get in Touch <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="#services-glance" className="btn btn--outline btn--lg">
                Explore Our Services <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            {/* Synchronized 7-Capability Transition Card */}
            <div className="hero-transition-banner" key={heroIdx}>
              <div className="hero-transition-banner__top">
                <span className="hero-transition-banner__tag">
                  <Icon name={currentSlide.icon} size={15} />
                  <span>{currentSlide.title}</span>
                </span>
                <span className="hero-transition-banner__counter">
                  0{heroIdx + 1} / 0{totalSlides}
                </span>
              </div>
              <p className="hero-transition-banner__quote">
                “{currentSlide.quote.replace(/[“”]/g, '')}”
              </p>
              <p className="hero-transition-banner__desc">
                {currentSlide.desc}
              </p>
            </div>

            {/* Single-line Horizontally Moving Capabilities Ribbon */}
            <div className="hero-chips-marquee" aria-label={`Core capabilities for ${currentSlide.title}`}>
              <div className="hero-chips-track">
                {[...currentSlide.chips, ...currentSlide.chips].map((chip, idx) => (
                  <span key={`${chip}-${idx}`} className="hero-chip-pill">
                    <span className="hero-chip-dot" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <HeroArt 
            activeIdx={heroIdx}
            setActiveIdx={setHeroIdx}
            isHeld={isHeld}
            setIsHeld={setIsHeld}
            onNext={nextHeroSlide}
            onPrev={prevHeroSlide}
          />
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
