import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Calendar, CheckCircle2, BookOpen } from 'lucide-react';
import { content } from '../data/site.js';
import { PageHero, EmptyState, CtaBand } from '../components/ui.jsx';

export default function ResourcePage({ type }) {
  const c = content[type] || { title: 'Resources', intro: '', items: [] };
  const crumbs = type === 'blog' ? ['Blog'] : ['Resources', c.title];

  return (
    <>
      <PageHero
        eyebrow={type === 'blog' ? 'Blog' : 'Resources'}
        title={c.title}
        crumbs={crumbs}
      >
        {c.intro}
      </PageHero>

      <section className="section">
        <div className="container">
          {/* CASE STUDIES VIEW */}
          {type === 'case-studies' && (
            <div className="case-studies-grid">
              {c.items.map((cs) => (
                <article key={cs.id} className="case-card">
                  <p className="eyebrow">Case Study</p>
                  <h2>{cs.title}</h2>
                  <div className="case-section">
                    <h4>Challenge</h4>
                    <p>{cs.challenge}</p>
                  </div>
                  <div className="case-section">
                    <h4>Solution</h4>
                    <p>{cs.solution}</p>
                  </div>
                  <div className="case-section result-box">
                    <h4>Result</h4>
                    <p>{cs.result}</p>
                  </div>
                  <div className="btn-row" style={{ marginTop: '1.75rem' }}>
                    <Link to="/contact" className="btn btn--orange">
                      Get in Touch <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link to="/contact" className="btn btn--outline" style={{ color: 'var(--ink)' }}>
                      Read the Full Case Study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CLIENT TESTIMONIALS VIEW */}
          {type === 'client-testimonials' && (
            <div>
              <p className="meta" style={{ marginBottom: '2rem', fontStyle: 'italic' }}>
                {c.intro}
              </p>
              <div className="testimonials-grid">
                {c.items.map((item, idx) => (
                  <article key={idx} className="testimonial-card">
                    <Quote size={32} className="accent" aria-hidden="true" style={{ marginBottom: '1rem' }} />
                    <blockquote className="testimonial-text">&ldquo;{item.quote}&rdquo;</blockquote>
                    <footer className="testimonial-author">
                      <strong>{item.author}</strong>
                      <span>{item.role}</span>
                      <small>{item.company}</small>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* NEWS & EVENTS VIEW */}
          {type === 'news-events' && (
            <div className="news-grid">
              {c.items.map((item) => (
                <article key={item.title} className="news-card">
                  <div className="news-card__meta">
                    <span className="eyebrow">{item.tag}</span>
                    <span className="news-date">
                      <Calendar size={14} aria-hidden="true" /> {item.date}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link to={item.href || '/contact'} className="tlink">
                    {item.actionLabel || 'Read More'} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* BLOG (VELVORA INSIGHTS) VIEW */}
          {type === 'blog' && (
            <div className="blog-container">
              {/* Featured article sample */}
              {c.items.length > 0 && (
                <article className="featured-blog-card">
                  <p className="eyebrow">{c.items[0].tag}</p>
                  <h2>{c.items[0].title}</h2>
                  <p className="lead">{c.items[0].summary}</p>
                  <Link to="/contact" className="btn btn--orange" style={{ marginTop: '1rem' }}>
                    Request Full Article &amp; Guide <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              )}

              <h3 className="section-subtitle" style={{ marginTop: '3.5rem' }}>
                Suggested Insights &amp; Articles
              </h3>
              <div className="blog-grid">
                {c.items.slice(1).map((item) => (
                  <article key={item.id} className="blog-card">
                    <p className="eyebrow">{item.tag}</p>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                    <Link to="/contact" className="tlink">
                      Learn More <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
