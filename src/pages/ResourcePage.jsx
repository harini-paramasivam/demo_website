import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Quote,
  Calendar,
  CheckCircle2,
  BookOpen,
  Star,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
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

      <section className={`section ${type === 'client-testimonials' ? 'section--paper testimonials-section-wrap' : ''}`}>
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
                    <Link to="/blog" className="btn btn--outline" style={{ color: 'var(--ink)' }}>
                      Read the Full Case Study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CLIENT TESTIMONIALS VIEW - LUXURY EXECUTIVE SHOWCASE */}
          {type === 'client-testimonials' && (
            <div className="client-testimonials-showcase">
              {/* TOP TRUST & IMPACT METRICS STRIP */}
              <div className="testimonials-trust-bar">
                <div className="trust-metric-pod">
                  <div className="trust-metric-value">99.8%</div>
                  <div className="trust-metric-label">On-Time SLA Delivery</div>
                </div>
                <div className="trust-metric-pod">
                  <div className="trust-metric-value">5,000+</div>
                  <div className="trust-metric-label">EPUB &amp; XML Titles Converted</div>
                </div>
                <div className="trust-metric-pod">
                  <div className="trust-metric-value">100%</div>
                  <div className="trust-metric-label">WCAG 2.2 &amp; PDF/UA Conformance</div>
                </div>
                <div className="trust-metric-pod">
                  <div className="trust-metric-value">4.9 / 5.0</div>
                  <div className="trust-metric-label">Client Satisfaction Rating</div>
                </div>
              </div>

              {/* SECTION SUB-HEADER */}
              <div className="testimonials-head-block text-center" style={{ margin: '3.5rem auto 2.5rem', maxWidth: '780px' }}>
                <span className="subservices-hub-badge">
                  <Sparkles size={15} />
                  <span>Enterprise Client Endorsements</span>
                </span>
                <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 800, color: '#070e24', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                  Proven Impact Across Mission-Critical Deliverables
                </h3>
                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65, margin: 0 }}>
                  {c.intro}
                </p>
              </div>

              {/* 6-CARD TESTIMONIALS GRID */}
              <div className="testimonials-luxury-grid">
                {c.items.map((item, idx) => (
                  <article key={idx} className="testimonial-luxury-card">
                    <div className="testimonial-luxury-card__top">
                      <div className="testimonial-rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="star-filled" fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="testimonial-verified-badge">
                        <CheckCircle2 size={13} style={{ color: '#059669' }} />
                        <span>Verified Client</span>
                      </span>
                    </div>

                    <div className="testimonial-service-tag-pill">
                      <span>{item.service || 'Enterprise Engagement'}</span>
                    </div>

                    <blockquote className="testimonial-luxury-text">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    {item.metric && (
                      <div className="testimonial-impact-pill">
                        <TrendingUp size={13} style={{ color: '#0284c7' }} />
                        <strong>Key Impact:</strong>
                        <span>{item.metric}</span>
                      </div>
                    )}

                    <footer className="testimonial-luxury-footer">
                      <div className="testimonial-avatar-bubble">
                        {item.initials || item.author.charAt(0)}
                      </div>
                      <div className="testimonial-author-info">
                        <strong>{item.author}</strong>
                        <span>{item.role}</span>
                        <small>{item.company}</small>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>

              {/* BOTTOM SPOTLIGHT CONSULTATION BANNER */}
              <div className="testimonials-cta-spotlight">
                <div className="testimonials-cta-spotlight__content">
                  <span className="badge-eyebrow" style={{ color: '#38bdf8' }}>
                    <ShieldCheck size={16} /> SLA Guarantee
                  </span>
                  <h4>Ready to Achieve the Same Results for Your Organization?</h4>
                  <p>Our solutions architects are available to discuss tailored timelines, sample audits, and fixed-scope delivery roadmaps.</p>
                </div>
                <Link to="/contact" className="btn btn--orange btn--lg testimonials-cta-spotlight__btn">
                  <span>Discuss Your Project</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}

          {/* NEWS & EVENTS VIEW */}
          {type === 'news-events' && (
            <div className="news-grid">
              {c.items.map((item) => (
                <article key={item.title} className="news-card">
                  <div className="news-card__meta">
                    <span className="news-tag eyebrow">{item.tag}</span>
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
