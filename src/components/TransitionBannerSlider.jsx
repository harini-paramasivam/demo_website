import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight, 
  Sparkles,
  Quote
} from 'lucide-react';
import { transitionBannerContent } from '../data/site.js';
import Icon from './Icon.jsx';

export default function TransitionBannerSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalSlides = transitionBannerContent.length;
  const timerRef = useRef(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, activeIdx]);

  const current = transitionBannerContent[activeIdx];

  return (
    <section 
      className="t-slider-wrap" 
      aria-label="Core Capabilities Interactive Showcase"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="container">
        {/* Top Header & Slide Navigation Tabs */}
        <div className="t-slider-top">
          <div className="t-slider-eyebrow">
            <span className="t-slider-eyebrow__pulse" />
            <Sparkles size={16} className="t-slider-sparkle" />
            <span>TRANSITION SHOWCASE · 7 CORE PILLARS</span>
          </div>

          <div className="t-slider-controls">
            <span className="t-slider-counter" aria-live="polite">
              <span className="t-slider-counter__current">0{activeIdx + 1}</span>
              <span className="t-slider-counter__sep">/</span>
              <span className="t-slider-counter__total">0{totalSlides}</span>
            </span>

            <button 
              type="button" 
              className="t-slider-btn" 
              onClick={prevSlide}
              aria-label="Previous capability slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              className="t-slider-btn" 
              onClick={nextSlide}
              aria-label="Next capability slide"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="t-slider-btn t-slider-btn--play"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
          </div>
        </div>

        {/* Tab Pills for Instant Direct Slide Selection */}
        <div className="t-slider-tabs" role="tablist" aria-label="Capability selection">
          {transitionBannerContent.map((item, idx) => (
            <button
              key={item.title}
              role="tab"
              aria-selected={activeIdx === idx}
              className={`t-slider-tab${activeIdx === idx ? ' is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="t-slider-tab__icon">
                <Icon name={item.icon} size={16} />
              </span>
              <span className="t-slider-tab__label">{item.title}</span>
              {activeIdx === idx && isPlaying && (
                <span className="t-slider-tab__progress" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>

        {/* Main Stage Slide Card */}
        <div className="t-slide-stage">
          <div className="t-slide-card" key={activeIdx}>
            <div className="t-slide-card__ambient-glow" />
            
            <div className="t-slide-card__content">
              <div className="t-slide-card__meta">
                <span className="t-slide-card__badge">
                  <Icon name={current.icon} size={15} />
                  <span>{current.tag}</span>
                </span>
                <span className="t-slide-card__index">Pillar 0{activeIdx + 1} of 0{totalSlides}</span>
              </div>

              <h2 className="t-slide-card__title">
                {current.title}
              </h2>

              <div className="t-slide-card__quote-wrap">
                <Quote size={28} className="t-slide-card__quote-icon" aria-hidden="true" />
                <p className="t-slide-card__quote">
                  {current.quote}
                </p>
              </div>

              <p className="t-slide-card__desc">
                {current.desc}
              </p>

              <div className="t-slide-card__action">
                <Link to={current.to} className="btn btn--orange">
                  Explore {current.title} <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn btn--outline">
                  Talk to Our Team <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="t-slide-card__art">
              <div className="t-slide-card__orb">
                <div className="t-slide-card__orb-inner">
                  <Icon name={current.icon} size={54} className="t-slide-card__art-icon" />
                </div>
                <div className="t-slide-card__ring t-slide-card__ring--1" />
                <div className="t-slide-card__ring t-slide-card__ring--2" />
              </div>
              <div className="t-slide-card__preview-badge">
                <strong>Universal Standard</strong>
                <small>100% Quality Assured</small>
              </div>
            </div>
          </div>
        </div>

        {/* Running Infinity Marquee Ticker */}
        <div className="t-marquee" aria-hidden="true">
          <div className="t-marquee__track">
            {[...transitionBannerContent, ...transitionBannerContent].map((item, i) => (
              <div key={i} className="t-marquee__item">
                <span className="t-marquee__dot" />
                <strong className="t-marquee__title">{item.title}</strong>
                <span className="t-marquee__quote">{item.quote}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
