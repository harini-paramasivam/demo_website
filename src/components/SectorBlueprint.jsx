import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { industrySolutions } from '../data/site.js';
import Icon from './Icon.jsx';

const sectorVisuals = {
  publishers: { img: '/hero-epublishing.jpg', badge: 'Editorial & XML Architecture' },
  universities: { img: '/card-training.jpg', badge: 'Accessible Learning Tech' },
  enterprises: { img: '/hero-robot-ai.jpg', badge: 'AI & Enterprise Automation' },
  government: { img: '/hero-slide-2.jpg', badge: 'WCAG & Section 508 Verified' },
};

export default function SectorBlueprint() {
  return (
    <div className="sector-hub">
      <div className="sector-hub__grid">
        {industrySolutions.map((item, idx) => {
          const visual = sectorVisuals[item.id] || { img: '/hero-slide-1.jpg', badge: 'Industry Architecture' };
          return (
            <article key={item.id} className="sector-pod sector-pod--unified reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
              {/* Transparent Cyber Background Behind Words (letter ku pinadi) */}
              <div 
                className="sector-pod__bg-art" 
                style={{ backgroundImage: `url(${visual.img})` }} 
                aria-hidden="true" 
              />
              <div className="sector-pod__glow" aria-hidden="true" />
              <div className="sector-pod__tech-line" aria-hidden="true" />
              
              <div className="sector-pod__header">
                <div className="sector-pod__icon-wrap">
                  <Icon name={item.icon} size={22} />
                </div>
                <div className="sector-pod__meta">
                  <span className="sector-pod__tag">{item.tag}</span>
                  <span className="sector-pod__code">Sector 0{idx + 1}</span>
                </div>
                <span className="sector-pod__media-badge">{visual.badge}</span>
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
