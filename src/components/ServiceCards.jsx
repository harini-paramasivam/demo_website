import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/site.js';
import Icon from './Icon.jsx';

export default function ServiceCards() {
  return (
    <ul className="scards">
      {services.map((s, i) => (
        <li key={s.slug} className={`reveal ${i < 4 ? 'span3' : 'span4'}`} style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
          <Link to={`/services/${s.slug}`} className="scard">
            <span className="scard__top">
              <span className="scard__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="scard__icon"><Icon name={s.icon} size={22} /></span>
            </span>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className="scard__go">Explore<span className="sr"> {s.title}</span> <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
