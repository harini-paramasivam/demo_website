import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Grid, Sliders, Layers } from 'lucide-react';
import { homeServices } from '../data/site.js';
import Icon from './Icon.jsx';

export default function HomeServicesSlider() {
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'grid'
  const [activeSlide, setActiveSlide] = useState(0);

  const total = homeServices.length;

  const next = () => {
    setActiveSlide((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setActiveSlide((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="svc-slider-container">
      {/* View Switcher and Carousel Controls */}
      <div className="svc-slider-toolbar">
        <div className="svc-slider-mode-tabs" role="group" aria-label="Display mode">
          <button
            type="button"
            className={`svc-mode-btn${viewMode === 'slider' ? ' is-active' : ''}`}
            onClick={() => setViewMode('slider')}
            aria-pressed={viewMode === 'slider'}
          >
            <Sliders size={16} aria-hidden="true" />
            <span>Interactive Slide Carousel</span>
          </button>
          <button
            type="button"
            className={`svc-mode-btn${viewMode === 'grid' ? ' is-active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            <Grid size={16} aria-hidden="true" />
            <span>Complete Grid View</span>
          </button>
        </div>

        {viewMode === 'slider' && (
          <div className="svc-carousel-nav">
            <span className="svc-carousel-index">
              Showing <strong>{activeSlide + 1}</strong> of {total}
            </span>
            <button
              type="button"
              className="svc-nav-btn"
              onClick={prev}
              aria-label="Previous service slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="svc-nav-btn"
              onClick={next}
              aria-label="Next service slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {viewMode === 'slider' ? (
        /* Slider Mode: Carousel stage showing active card + neighbor previews */
        <div className="svc-carousel-stage">
          <div className="svc-carousel-track">
            {homeServices.map((svc, idx) => {
              const isActive = idx === activeSlide;
              const isPrev = (idx === (activeSlide - 1 + total) % total);
              const isNext = (idx === (activeSlide + 1) % total);

              let positionClass = 'is-hidden';
              if (isActive) positionClass = 'is-active';
              else if (isPrev) positionClass = 'is-prev';
              else if (isNext) positionClass = 'is-next';

              return (
                <article
                  key={svc.id}
                  className={`svc-slide-card ${positionClass}`}
                  onClick={() => {
                    if (isPrev) prev();
                    if (isNext) next();
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="svc-slide-card__header">
                    <span className="svc-slide-card__num">0{idx + 1}</span>
                    <span className="svc-slide-card__icon-box">
                      <Icon name={svc.icon} size={28} />
                    </span>
                  </div>

                  <div className="svc-slide-card__badge-row">
                    <span className="svc-slide-card__tag">{svc.tag}</span>
                    <span className="svc-slide-card__specs">{svc.badge}</span>
                  </div>

                  <h3 className="svc-slide-card__title">{svc.title}</h3>
                  <p className="svc-slide-card__desc">{svc.desc}</p>

                  <div className="svc-slide-card__footer">
                    <Link to={svc.to} className="btn btn--orange svc-slide-card__btn">
                      {svc.btnText} <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="svc-dots" role="tablist" aria-label="Service slides">
            {homeServices.map((svc, idx) => (
              <button
                key={svc.id}
                role="tab"
                aria-selected={idx === activeSlide}
                className={`svc-dot${idx === activeSlide ? ' is-active' : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${svc.title}`}
              >
                <span className="svc-dot__pip" />
                <span className="svc-dot__label">{svc.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Grid Mode: Full 6-Card Responsive Matrix */
        <ul className="scards scards--modern-matrix">
          {homeServices.map((svc, idx) => (
            <li key={svc.id} className="span4 reveal">
              <div className="scard scard--featured">
                <div className="scard__top">
                  <span className="scard__num">0{idx + 1}</span>
                  <span className="scard__icon">
                    <Icon name={svc.icon} size={24} />
                  </span>
                </div>
                <div className="svc-slide-card__badge-row" style={{ marginBottom: '12px' }}>
                  <span className="svc-slide-card__tag">{svc.tag}</span>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <Link to={svc.to} className="btn btn--orange btn--block">
                    {svc.btnText} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
