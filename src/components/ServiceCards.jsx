import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/site.js';
import Icon from './Icon.jsx';

const buttonLabels = {
  'epublishing': 'Learn More',
  'xml': 'Learn More',
  'digital-accessibility': 'Learn More',
  'typesetting-and-design': 'Explore Typesetting and Design',
  'math-and-equation-typesetting': 'Explore Math Typesetting',
  'metadata-indexing-and-taxonomy': 'Explore Metadata and Indexing',
  'ocr-and-digitization': 'Explore OCR and Digitization',
  'captioning-transcription-and-audio-description': 'Explore Captioning Services',
  'accessibility-training-and-consulting': 'Explore Training and Consulting',
};

export default function ServiceCards({ limit }) {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <ul className="scards">
      {displayServices.map((s, i) => {
        const btnLabel = buttonLabels[s.slug] || 'Learn More';
        return (
          <li
            key={s.slug}
            className={`reveal ${i < 3 ? 'span4' : 'span4'}`}
            style={{ transitionDelay: `${(i % 3) * 70}ms` }}
          >
            <Link to={`/services/${s.slug}`} className="scard">
              <span className="scard__top">
                <span className="scard__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="scard__icon">
                  <Icon name={s.icon} size={24} />
                </span>
              </span>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <span className="scard__go">
                {btnLabel} <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
