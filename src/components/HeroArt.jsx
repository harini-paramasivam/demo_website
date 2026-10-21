import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Pause, 
  Play 
} from 'lucide-react';
import { transitionBannerContent } from '../data/site.js';
import Icon from './Icon.jsx';

export default function HeroArt({
  activeIdx: controlledIdx,
  setActiveIdx: controlledSetIdx,
  isHeld: controlledHeld,
  setIsHeld: controlledSetHeld,
  onNext: controlledNext,
  onPrev: controlledPrev
}) {
  const [internalIdx, setInternalIdx] = useState(0);
  const [internalHeld, setInternalHeld] = useState(false);
  const totalSlides = transitionBannerContent.length;
  const timerRef = useRef(null);

  const activeIdx = controlledIdx !== undefined ? controlledIdx : internalIdx;
  const setActiveIdx = controlledSetIdx !== undefined ? controlledSetIdx : setInternalIdx;
  const isHeld = controlledHeld !== undefined ? controlledHeld : internalHeld;
  const setIsHeld = controlledSetHeld !== undefined ? controlledSetHeld : setInternalHeld;

  const nextSlide = () => {
    if (controlledNext) {
      controlledNext();
    } else {
      setActiveIdx((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (controlledPrev) {
      controlledPrev();
    } else {
      setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  useEffect(() => {
    // If controlled externally by Home, don't set duplicate interval
    if (controlledIdx !== undefined) return;

    if (isHeld) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextSlide, 4000); // 4-second automatic transition
    return () => clearInterval(timerRef.current);
  }, [activeIdx, isHeld, controlledIdx]);

  const handleFrameClick = (e) => {
    // If user clicked an arrow or a link, don't toggle hold
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    setIsHeld((prev) => !prev);
  };

  const current = transitionBannerContent[activeIdx];

  return (
    <div className="hero__art hero__art--modern">
      {/* Ambient warm gold atmospheric glow */}
      <div className="hero-art-glow" />

      {/* Main Interactive Showcase Frame: 7 Image Capabilities Slider */}
      <div 
        className={`hero-art-frame hero-art-frame--slider${isHeld ? ' is-held' : ''}`}
        onClick={handleFrameClick}
        role="region"
        aria-label={`${current.title} slide. Tap to ${isHeld ? 'resume' : 'hold'} scrolling.`}
        title="Tap image to hold or resume slide"
      >
        {/* Left Arrow inside image frame */}
        <button 
          type="button" 
          className="hero-slider-arrow hero-slider-arrow--prev" 
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide image"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow inside image frame */}
        <button 
          type="button" 
          className="hero-slider-arrow hero-slider-arrow--next" 
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dynamic Image for current capability */}
        <img
          key={current.image}
          src={current.image}
          alt={`Velvora Solutions – ${current.title}`}
          className="hero-art-img hero-art-img--fade"
          width="700"
          height="700"
          loading="eager"
        />

        {/* Hold status badge */}
        <div className="hero-art-hold-pill">
          {isHeld ? (
            <span className="hero-art-hold-pill__active">
              <Pause size={12} />
              <span>Held</span>
            </span>
          ) : (
            <span className="hero-art-hold-pill__hint">
              <span>Auto · 4s</span>
            </span>
          )}
        </div>

        {/* Floating Glassmorphic Badge: Top */}
        <div className="hero-badge hero-badge--top">
          <span className={`hero-badge__dot hero-badge__dot--${current.badgeTop?.dot || 'green'}`} />
          <div className="hero-badge__content">
            <strong>{current.badgeTop?.label}</strong>
            <small>{current.badgeTop?.sub}</small>
          </div>
        </div>

        {/* Floating Glassmorphic Badge: Bottom */}
        <div className="hero-badge hero-badge--bottom">
          <span className={`hero-badge__dot hero-badge__dot--${current.badgeBottom?.dot || 'gold'}`} />
          <div className="hero-badge__content">
            <strong>{current.badgeBottom?.label}</strong>
            <small>{current.badgeBottom?.sub}</small>
          </div>
        </div>

        {/* Bottom Info Overlay Card */}
        <div className="hero-art-overlay">
          <div className="hero-art-overlay__meta">
            <span className="hero-art-overlay__tag">
              <Icon name={current.icon} size={14} />
              <span>{current.title}</span>
            </span>
            <Link 
              to={current.to} 
              className="hero-art-overlay__link"
              onClick={(e) => e.stopPropagation()}
            >
              Explore <ArrowRight size={13} />
            </Link>
          </div>
          <p className="hero-art-overlay__quote">{current.quote}</p>
        </div>

        {/* 7 Slide Navigation Dots */}
        <div className="hero-art-dots" role="tablist" aria-label="Slide selectors">
          {transitionBannerContent.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={activeIdx === idx}
              className={`hero-art-dot${activeIdx === idx ? ' is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              aria-label={`Jump to slide ${idx + 1}: ${item.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
