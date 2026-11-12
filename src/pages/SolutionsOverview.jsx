import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Building2, 
  ChevronRight,
  Sparkles,
  Award,
  SlidersHorizontal,
  Compass,
  Search,
  Filter
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import { solutionsData } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function SolutionsOverview() {
  useReveal();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSolutions = solutionsData.filter((sol) => {
    const matchesCategory = filter === 'all' || sol.category === filter;
    const matchesSearch = !searchQuery.trim() || 
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.servicesIncluded.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Solutions Overview"
        title="Practical Solutions for Real Challenges"
        crumbs={['Home', 'Solutions']}
      >
        Velvora applies its services to solve industry‑specific and organizational challenges. Each solution includes the challenge, the solution flow, the services included, and the benefits delivered.
      </PageHero>

      {/* SOLUTIONS INTERACTIVE COMMAND CENTER */}
      <section className="section section--paper" aria-labelledby="solutions-list-head">
        <div className="container">
          <div className="solutions-hub-layout">
            {/* LEFT SIDEBAR: DIRECTORY NAVIGATOR & FILTERS */}
            <aside className="solutions-hub-sidebar" aria-label="Solutions Navigator">
              <div className="solutions-sidebar-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Filter size={16} style={{ color: '#0284c7' }} />
                  <span className="solutions-sidebar-title" style={{ margin: 0 }}>Category Navigator</span>
                </div>

                <nav className="solutions-nav-list" aria-label="Filter solutions by scope">
                  <button
                    type="button"
                    className={`solutions-nav-btn${filter === 'all' ? ' is-active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <SlidersHorizontal size={17} />
                      <span>All Solutions</span>
                    </div>
                    <span className="count-badge">{solutionsData.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`solutions-nav-btn${filter === 'industry' ? ' is-active' : ''}`}
                    onClick={() => setFilter('industry')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Building2 size={17} />
                      <span>By Industry Sector</span>
                    </div>
                    <span className="count-badge">
                      {solutionsData.filter((s) => s.category === 'industry').length}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`solutions-nav-btn${filter === 'need' ? ' is-active' : ''}`}
                    onClick={() => setFilter('need')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Sparkles size={17} />
                      <span>By Operational Need</span>
                    </div>
                    <span className="count-badge">
                      {solutionsData.filter((s) => s.category === 'need').length}
                    </span>
                  </button>
                </nav>

                {/* Quick Search */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Quick search solutions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 34px',
                        fontSize: '0.88rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        outline: 'none',
                        background: '#f8fafc',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SOLUTIONS ADVISORY CARD */}
              <div className="solutions-sidebar-promo">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                  <Compass size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Custom Architecture</span>
                </div>
                <h4>Need a Specialized Enterprise Flow?</h4>
                <p>
                  Our solutions architects engineer custom multi-format ingestion pipelines and accessibility QA workflows tailored to your stack.
                </p>
                <Link to="/contact" className="btn btn--cyan btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Consult Architects</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </aside>

            {/* RIGHT STREAM: SOLUTIONS CARDS */}
            <main className="solutions-hub-main">
              {/* Stream Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                    {filter === 'all' ? 'All Purpose-Built Architectures' : filter === 'industry' ? 'Industry-Specific Solutions' : 'Operational & Workflows Solutions'}
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Displaying {filteredSolutions.length} of {solutionsData.length} active solution configurations
                  </span>
                </div>
              </div>

              <div className="solutions-grid">
                {filteredSolutions.map((sol) => (
                  <article key={sol.id} className="solution-card">
                    {/* Header */}
                    <div className="solution-card__header">
                      <div className="solution-card__top">
                        <div className="solution-card__icon-box">
                          <Icon name={sol.icon} size={24} />
                        </div>
                        <span className="solution-card__badge">{sol.categoryLabel}</span>
                      </div>
                      <h3 className="solution-card__title">{sol.title}</h3>
                      <span className="solution-card__tag">{sol.tag}</span>
                    </div>

                    <div className="solution-card__content">
                      {/* The Challenge */}
                      <div className="solution-section solution-section--challenge">
                        <h4 className="solution-section__title">
                          <AlertCircle size={16} className="solution-section__icon-alert" aria-hidden="true" />
                          The Challenge
                        </h4>
                        <ul className="solution-challenge-list">
                          {sol.challenges.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Solution Flow */}
                      <div className="solution-section solution-section--flow">
                        <h4 className="solution-section__title">
                          <Layers size={16} className="solution-section__icon-flow" aria-hidden="true" />
                          Solution Flow
                        </h4>
                        <div className="solution-flow-steps">
                          {sol.flow.map((step, idx) => (
                            <div key={idx} className="solution-flow-step-wrap">
                              <span className="solution-flow-step">
                                <span className="solution-flow-step__idx">0{idx + 1}</span>
                                <span>{step}</span>
                              </span>
                              {idx < sol.flow.length - 1 && (
                                <ChevronRight size={15} className="solution-flow-arrow" aria-hidden="true" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Services Included */}
                      <div className="solution-section solution-section--services">
                        <h4 className="solution-section__title">Services Included</h4>
                        <div className="solution-services-tags">
                          {sol.servicesIncluded.map((svc) => (
                            <span key={svc} className="solution-service-pill">
                              {svc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="solution-section solution-section--benefits">
                        <h4 className="solution-section__title">
                          <CheckCircle2 size={16} className="solution-section__icon-check" aria-hidden="true" />
                          Benefits Delivered
                        </h4>
                        <ul className="solution-benefits-list">
                          {sol.benefits.map((b, i) => (
                            <li key={i}>
                              <CheckCircle2 size={15} className="solution-check-bullet" aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standards We Work To (for Compliance) */}
                      {sol.standards && (
                        <div className="solution-section solution-section--standards">
                          <h4 className="solution-section__title">
                            <Award size={16} className="solution-section__icon-award" aria-hidden="true" />
                            Standards We Work To
                          </h4>
                          <div className="solution-standards-grid">
                            {sol.standards.map((st) => (
                              <span key={st} className="solution-standard-tag">
                                {st}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Case Study Callout */}
                      {sol.caseStudy && (
                        <div className="solution-case-callout">
                          <span className="solution-case-callout__eyebrow">Related Case Study</span>
                          <p className="solution-case-callout__text">
                            <strong>{sol.caseStudy}</strong>
                          </p>
                          {sol.caseStudyLink && (
                            <Link to={sol.caseStudyLink} className="solution-case-callout__link">
                              Explore Case Study <ChevronRight size={14} aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer CTA */}
                    <div className="solution-card__footer">
                      <Link
                        to={`/contact?subject=${encodeURIComponent(sol.ctaSubject || sol.title)}`}
                        className="btn btn--orange btn--block"
                      >
                        <span>{sol.ctaText}</span>
                        <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CLOSING CTA BAND */}
      <CtaBand
        title="Need a Custom Workflow Tailored for Your Organization?"
        text="Discuss your content specifications, accessibility targets, or automation goals with our solutions specialists."
        primaryBtnText="Consult Our Specialists"
        primaryBtnTo="/contact"
      />
    </>
  );
}
