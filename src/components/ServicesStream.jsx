import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { homeServices } from '../data/site.js';
import Icon from './Icon.jsx';

export default function ServicesStream() {
  return (
    <div className="glance-grid">
      {homeServices.map((svc, idx) => (
        <article key={svc.id} className="glance-card glance-card--unified reveal" style={{ transitionDelay: `${idx * 60}ms` }}>
          {/* Cybernetic Transparent Background Graphic Behind Words (letter ku pinadi) */}
          <div 
            className="glance-card__bg-art" 
            style={{ backgroundImage: `url(${svc.image})` }} 
            aria-hidden="true" 
          />
          <div className="glance-card__ambient-glow" aria-hidden="true" />
          <div className="glance-card__tech-line" aria-hidden="true" />

          <div className="glance-card__content">
            {/* Top Category Badge & Telemetry */}
            <div className="glance-card__top">
              <span className="glance-card__badge">
                <Icon name={svc.icon} size={15} />
                <span>{svc.tag}</span>
              </span>
              <span className="glance-card__code">0{idx + 1}</span>
            </div>

            {/* Header in Bold */}
            <h3 className="glance-card__title">{svc.title}</h3>

            {/* About it (Description) */}
            <p className="glance-card__desc">{svc.desc}</p>

            {/* Direct Action Link */}
            <div className="glance-card__action">
              <Link to={svc.to} className="glance-card__link" aria-label={`Explore ${svc.title}`}>
                <span>{svc.btnText || 'Explore Service'}</span>
                <span className="glance-card__arrow-wrap">
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

