import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { industrySolutions } from '../data/site.js';
import Icon from './Icon.jsx';

export default function IndustrySolutionsSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const total = industrySolutions.length;
  const current = industrySolutions[activeTab];

  const next = () => setActiveTab((prev) => (prev + 1) % total);
  const prev = () => setActiveTab((prev) => (prev - 1 + total) % total);

  return (
    <div className="ind-slider">
      {/* Industry Tabs on Top */}
      <div className="ind-tabs-row" role="tablist" aria-label="Industries served">
        {industrySolutions.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === idx}
            className={`ind-tab${activeTab === idx ? ' is-active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            <span className="ind-tab__icon">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="ind-tab__title">{item.industry}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Industry Slide Card */}
      <div className="ind-stage">
        <div className="ind-slide-card" key={current.id}>
          <div className="ind-slide-card__glow" />

          <div className="ind-slide-card__left">
            <div className="ind-slide-card__badge">
              <Icon name={current.icon} size={16} />
              <span>{current.tag}</span>
            </div>

            <h3 className="ind-slide-card__industry">{current.industry}</h3>
            <h4 className="ind-slide-card__headline">{current.headline}</h4>
            <p className="ind-slide-card__desc">{current.desc}</p>

            <div className="ind-slide-card__highlights">
              {current.highlights.map((h) => (
                <span key={h} className="ind-pill">
                  <CheckCircle2 size={14} className="ind-pill__check" />
                  {h}
                </span>
              ))}
            </div>

            <div className="ind-slide-card__action">
              <Link to="/contact" className="btn btn--orange">
                View Solution <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to={current.to} className="btn btn--outline">
                Explore Relevant Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="ind-slide-card__right">
            <div className="ind-stat-cube">
              <span className="ind-stat-cube__badge">Sector Ready</span>
              <div className="ind-stat-cube__icon-wrap">
                <Icon name={current.icon} size={48} />
              </div>
              <strong className="ind-stat-cube__title">{current.industry}</strong>
              <p className="ind-stat-cube__sub">Engineered for production scale, editorial pipelines & compliance.</p>
              
              <div className="ind-nav-arrows">
                <button type="button" className="ind-nav-btn" onClick={prev} aria-label="Previous industry">
                  <ChevronLeft size={18} />
                </button>
                <span className="ind-nav-counter">0{activeTab + 1} / 0{total}</span>
                <button type="button" className="ind-nav-btn" onClick={next} aria-label="Next industry">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
