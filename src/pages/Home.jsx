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
      {/* 1. HERO SECTION (SYNCHRONIZED 7-CAPABILITY SLIDER) */}
      <section className="hero netbg" aria-labelledby="hero-title">
        <div className="container hero__in">
          <div className="hero__copy hero__copy--slider" key={heroIdx}>
            <p className="pill">
              <i />
              {currentSlide.tag} · {currentSlide.title}
            </p>
            <h1 id="hero-title" className="hero-slide-h1">
              {currentSlide.headlinePrefix}{' '}
              <span className="accent">{currentSlide.headlineAccent}</span>
            </h1>
            <span className="rule" aria-hidden="true" />
            <p className="hero-slide-quote">
              “{currentSlide.quote.replace(/[“”]/g, '')}”
            </p>
            <p className="lead lead--dark">
              {currentSlide.desc}
            </p>
            <div className="btn-row">
              <Link to={currentSlide.to} className="btn btn--orange btn--lg">
                Explore {currentSlide.title} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn--outline btn--lg">
                Get in Touch <ArrowRight size={18} aria-hidden="true" />
              </Link>
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

        {/* NUMBERS STRIP */}
        <div className="container stats" aria-label="Key statistics">
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

        <p className="scroll" aria-hidden="true">
          Scroll<i />
        </p>
      </section>

      {/* 2. SERVICES AT A GLANCE */}
      <section id="services-glance" className="section section--tint" aria-labelledby="services-head">
        <div className="container">
          <SectionHead
            eyebrow="Services at a Glance"
            title="Complete Content Services Under One Roof"
          >
            We convert, structure, and remediate content so it can be published anywhere and read by anyone.
          </SectionHead>
          
          <ServicesStream />
        </div>
      </section>

      {/* 5. WHO WE SERVE (INNOVATIVE 4-SECTOR CONNECTED BLUEPRINT) */}
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

      {/* 6. WHY CHOOSE VELVORA (LUXURY 9-PILLAR ASSURANCE MATRIX) */}
      <section className="section why-section-dark netbg" aria-labelledby="why-head">
        <div className="container">
          <SectionHead
            eyebrow="The Velvora Advantage"
            title="Standards, expertise, and precision you can count on"
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
