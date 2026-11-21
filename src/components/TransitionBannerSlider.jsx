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
  const totalSlides = transitionBannerContent.length;
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        nextSlide();
      } else if (diff < -45) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 8000); // 8 seconds auto slide
    return () => clearInterval(timerRef.current);
  }, [activeIdx]);

  const current = transitionBannerContent[activeIdx];

  return (
    <section 
      className="t-slider-wrap" 
      aria-label="Capabilities Showcase"
    >
      <div className="container">
        {/* Main Banner Card with embedded Left & Right corner arrows and native touch swipe */}
        <div 
          className="t-slide-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="t-slide-card" 
            key={activeIdx}
            role="region"
            aria-label={`${current.title} slide.`}
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
