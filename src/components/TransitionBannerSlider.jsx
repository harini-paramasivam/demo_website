import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Quote,
  Pause,
  Play
} from 'lucide-react';
import { transitionBannerContent } from '../data/site.js';
import Icon from './Icon.jsx';

export default function TransitionBannerSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const totalSlides = transitionBannerContent.length;
  const timerRef = useRef(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isHeld) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextSlide, 4000); // 4 seconds auto slide
    return () => clearInterval(timerRef.current);
  }, [activeIdx, isHeld]);

  const handleCardClick = (e) => {
    // If clicking a link or button directly, allow its normal action
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    // Toggle hold when tapping/clicking banner card
    setIsHeld((prev) => !prev);
  };

  const current = transitionBannerContent[activeIdx];

  return (
    <section 
      className="t-slider-wrap" 
      aria-label="Capabilities Showcase"
    >
      <div className="container">
        {/* Main Banner Card with embedded Left & Right corner arrows */}
        <div className="t-slide-stage">
          <div 
            className={`t-slide-card${isHeld ? ' is-held' : ''}`} 
            key={activeIdx}
            onClick={handleCardClick}
            role="region"
            aria-label={`${current.title} slide. Tap to ${isHeld ? 'resume' : 'hold'}.`}
            style={{ cursor: 'pointer' }}
          >
            <div className="t-slide-card__ambient-glow" />

            {/* Left corner arrow button inside banner */}
            <button 
              type="button" 
              className="t-card-arrow t-card-arrow--prev" 
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right corner arrow button inside banner */}
            <button 
              type="button" 
              className="t-card-arrow t-card-arrow--next" 
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={22} />
            </button>
            
            <div className="t-slide-card__content">
              <div className="t-slide-card__meta">
                <span className="t-slide-card__badge">
                  <Icon name={current.icon} size={15} />
                  <span>{current.tag}</span>
                </span>

                {/* Subtle Hold Status Pill */}
                {isHeld ? (
                  <span className="t-held-pill" title="Slide is on hold. Tap to resume automatic sliding.">
                    <Pause size={12} />
                    <span>Held · Tap to Resume</span>
                  </span>
                ) : (
                  <span className="t-held-hint" title="Tap banner to hold this slide">
                    Tap to Hold
                  </span>
                )}
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

          {/* Navigation Dots */}
          <div className="t-slider-dots" role="tablist" aria-label="Slides">
            {transitionBannerContent.map((item, idx) => (
              <button
                key={item.title}
                role="tab"
                aria-selected={activeIdx === idx}
                className={`t-slider-dot${activeIdx === idx ? ' is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              />
            ))}
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
