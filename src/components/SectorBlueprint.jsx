import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { industrySolutions } from '../data/site.js';
import Icon from './Icon.jsx';

export default function SectorBlueprint() {
  return (
    <div className="sector-hub">
      <div className="sector-hub__grid">
        {industrySolutions.map((item, idx) => (
          <article key={item.id} className="sector-pod reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
            <div className="sector-pod__glow" />
            
            <div className="sector-pod__header">
              <div className="sector-pod__icon-wrap">
                <Icon name={item.icon} size={24} />
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
              <Link to="/contact" className="btn btn--orange sector-pod__btn">
                View Solution <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
