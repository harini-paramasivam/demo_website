import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { industrySolutions } from '../data/site.js';
import Icon from './Icon.jsx';

const sectorVisuals = {
  publishers: { img: '/hero-slide-1.jpg', badge: 'Editorial & XML Architecture' },
  universities: { img: '/card-training.jpg', badge: 'Accessible Learning Tech' },
  enterprises: { img: '/hero-slide-4.jpg', badge: 'Enterprise Digital Systems' },
  government: { img: '/hero-slide-2.jpg', badge: 'WCAG & Section 508 Verified' },
};

export default function SectorBlueprint() {
  return (
    <div className="sector-hub">
      <div className="sector-hub__grid">
        {industrySolutions.map((item, idx) => {
          const visual = sectorVisuals[item.id] || { img: '/hero-slide-1.jpg', badge: 'Industry Architecture' };
          return (
            <article key={item.id} className="sector-pod reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
              <div className="sector-pod__glow" />
              
              {/* 3D Sector Graphic Banner */}
              <div className="sector-pod__media">
                <img 
                  src={visual.img} 
                  alt={`${item.industry} 3D Solution Architecture`} 
                  className="sector-pod__img" 
                  loading="lazy" 
                />
                <div className="sector-pod__media-vignette" aria-hidden="true" />
                <span className="sector-pod__media-badge">{visual.badge}</span>
              </div>

              <div className="sector-pod__header">
                <div className="sector-pod__icon-wrap">
                  <Icon name={item.icon} size={22} />
                </div>
                <div className="sector-pod__meta">
                  <span className="sector-pod__tag">{item.tag}</span>
                  <span className="sector-pod__code">Sector 0{idx + 1}</span>
                </div>
              </div>

              <div className="sector-pod__body">
                <h3 className="sector-pod__title">{item.industry}</h3>
                <h4 className="sector-pod__headline">{item.headline}</h4>
                <p className="sector-pod__desc">{item.desc}</p>

                <div className="sector-pod__highlights">
                  {item.highlights.map((h) => (
                    <span key={h} className="sector-chip">
                      <CheckCircle2 size={13} className="sector-chip__icon" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="sector-pod__footer">
                <Link to="/solutions" className="btn btn--orange sector-pod__btn">
                  View Solution <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
