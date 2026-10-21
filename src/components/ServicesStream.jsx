import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { homeServices } from '../data/site.js';
import Icon from './Icon.jsx';

export default function ServicesStream() {
  return (
    <div className="glance-grid">
      {homeServices.map((svc) => (
        <article key={svc.id} className="glance-card">
          {/* 1. Image Related to the Service */}
          <div className="glance-card__media">
            <img 
              src={svc.image} 
              alt={svc.title} 
              className="glance-card__img" 
              loading="lazy" 
            />
            {/* Top Category Badge */}
            <span className="glance-card__badge">
              <Icon name={svc.icon} size={15} />
              <span>{svc.tag}</span>
            </span>
          </div>

          <div className="glance-card__body">
            {/* 2. Header in Bold */}
            <h3 className="glance-card__title">{svc.title}</h3>

            {/* 3. About it (Description) */}
            <p className="glance-card__desc">{svc.desc}</p>

            {/* Direct Action Link */}
            <div className="glance-card__action">
              <Link to={svc.to} className="glance-card__link">
                <span>{svc.btnText}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
