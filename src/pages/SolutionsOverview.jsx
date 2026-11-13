import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Building2, 
  ChevronRight,
  Sparkles,
  Award,
  SlidersHorizontal,
  Workflow,
  Check,
  LayoutGrid,
  Filter
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import { solutionsData } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function SolutionsOverview() {
  useReveal();

  // Active solution in Interactive Console
  const [activeSolutionId, setActiveSolutionId] = useState(solutionsData[0].id);

  // View mode: 'console' (Interactive Architecture Blueprint) vs 'grid' (Full Catalog Matrix)
  const [viewMode, setViewMode] = useState('console');

  // Filter state for catalog view
  const [filter, setFilter] = useState('all');

  // Active solution object
  const activeSolution = useMemo(() => {
    return solutionsData.find((s) => s.id === activeSolutionId) || solutionsData[0];
  }, [activeSolutionId]);

  // Current index for previous / next navigation
  const activeIndex = useMemo(() => {
    return solutionsData.findIndex((s) => s.id === activeSolution.id);
  }, [activeSolution]);

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + solutionsData.length) % solutionsData.length;
    setActiveSolutionId(solutionsData[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % solutionsData.length;
    setActiveSolutionId(solutionsData[nextIndex].id);
  };

  // Filtered solutions for grid view
  const filteredSolutions = useMemo(() => {
    return solutionsData.filter((sol) => {
      return filter === 'all' || sol.category === filter;
    });
  }, [filter]);

  const industrySolutions = useMemo(() => {
    return solutionsData.filter((s) => s.category === 'industry');
  }, []);

  const needSolutions = useMemo(() => {
    return solutionsData.filter((s) => s.category === 'need');
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Solutions Overview"
        title="Practical Solutions for Real Challenges"
        crumbs={['Home', 'Solutions']}
      >
        Velvora applies its services to solve industry‑specific and organizational challenges. Each solution includes the challenge, the solution flow, the services included, and the benefits delivered.
      </PageHero>

      {/* METRIC HIGHLIGHT STRIP */}
      <section className="sol-metrics-strip" aria-label="Key Solutions Capabilities">
        <div className="container">
          <div className="sol-metrics-grid">
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--blue" aria-hidden="true" />
              <strong className="sol-metric-title">9 Enterprise Architectures</strong>
              <span className="sol-metric-sub">End-to-End Solutions</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--cyan" aria-hidden="true" />
              <strong className="sol-metric-title">4 Industry Frameworks</strong>
              <span className="sol-metric-sub">Publishers, EdTech &amp; Corporate</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--emerald" aria-hidden="true" />
              <strong className="sol-metric-title">5 Operational Needs</strong>
              <span className="sol-metric-sub">Modernization, AI &amp; Backlists</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--purple" aria-hidden="true" />
              <strong className="sol-metric-title">100% Verified SLAs</strong>
              <span className="sol-metric-sub">Zero Production Disruption</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS COMMAND CENTER SECTION */}
      <section className="section section--paper sol-command-section" aria-labelledby="solutions-hub-heading">
        <div className="container">
          {/* TOP CONTROLS: VIEW SWITCHER */}
          <div className="sol-top-bar sol-top-bar--centered">
            <div className="sol-view-switcher" role="tablist" aria-label="Solutions display mode">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'console'}
                className={`sol-view-btn${viewMode === 'console' ? ' is-active' : ''}`}
                onClick={() => setViewMode('console')}
              >
                <Workflow size={17} aria-hidden="true" />
                <span>Interactive Blueprint</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'grid'}
                className={`sol-view-btn${viewMode === 'grid' ? ' is-active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={17} aria-hidden="true" />
                <span>Full Portfolio Catalog</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VIEW MODE 1: INTERACTIVE ARCHITECTURE BLUEPRINT (COMMAND CONSOLE) */}
          {/* ========================================================================= */}
          {viewMode === 'console' && (
            <div className="sol-blueprint-console">
              {/* LEFT RAIL: SOLUTION SELECTOR */}
              <aside className="sol-rail" aria-label="Select a solution architecture">
                <div className="sol-rail-card">
                  <div className="sol-rail-header">
                    <Filter size={15} style={{ color: '#0284c7' }} />
                    <span>Select Architecture</span>
                  </div>

                  {/* Industry Group */}
                  <div className="sol-rail-group">
                    <span className="sol-rail-group-label">By Industry Sector (4)</span>
                    <div className="sol-rail-list">
                      {industrySolutions.map((sol) => {
                        const isSelected = sol.id === activeSolution.id;
                        return (
                          <button
                            key={sol.id}
                            type="button"
                            className={`sol-rail-item${isSelected ? ' is-active' : ''}`}
                            onClick={() => setActiveSolutionId(sol.id)}
                            aria-selected={isSelected}
                          >
                            <span className="sol-rail-item__icon">
                              <Icon name={sol.icon} size={17} />
                            </span>
                            <div className="sol-rail-item__text">
                              <strong>{sol.title}</strong>
                              <span>{sol.tag}</span>
                            </div>
                            <ChevronRight size={14} className="sol-rail-item__arrow" aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Need Group */}
                  <div className="sol-rail-group" style={{ marginTop: '14px' }}>
                    <span className="sol-rail-group-label">By Operational Need (5)</span>
                    <div className="sol-rail-list">
                      {needSolutions.map((sol) => {
                        const isSelected = sol.id === activeSolution.id;
                        return (
                          <button
                            key={sol.id}
                            type="button"
                            className={`sol-rail-item${isSelected ? ' is-active' : ''}`}
                            onClick={() => setActiveSolutionId(sol.id)}
                            aria-selected={isSelected}
                          >
                            <span className="sol-rail-item__icon">
                              <Icon name={sol.icon} size={17} />
                            </span>
                            <div className="sol-rail-item__text">
                              <strong>{sol.title}</strong>
                              <span>{sol.tag}</span>
                            </div>
                            <ChevronRight size={14} className="sol-rail-item__arrow" aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advisory Quick Link */}
                  <div className="sol-rail-advisory">
                    <span className="sol-rail-advisory__title">Custom Enterprise SLA?</span>
                    <p className="sol-rail-advisory__text">We configure bespoke multi-system delivery pipelines.</p>
                    <Link to="/contact" className="sol-rail-advisory__btn">
                      Request Custom Architecture <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </aside>

              {/* RIGHT STAGE: ACTIVE SOLUTION ARCHITECTURE DISPLAY */}
              <main className="sol-stage" aria-live="polite">
                <article className="sol-stage-card">
                  {/* Stage Top Banner */}
                  <header className="sol-stage-header">
                    <div className="sol-stage-header__icon-box">
                      <Icon name={activeSolution.icon} size={30} />
                    </div>
                    <div className="sol-stage-header__info">
                      <div className="sol-stage-header__meta">
                        <span className="sol-stage-badge sol-stage-badge--cat">
                          {activeSolution.categoryLabel}
                        </span>
                        <span className="sol-stage-badge sol-stage-badge--tag">
                          {activeSolution.tag}
                        </span>
                      </div>
                      <h2 className="sol-stage-header__title">{activeSolution.title}</h2>
                    </div>
                    <div className="sol-stage-header__action">
                      <Link
                        to={`/contact?subject=${encodeURIComponent(activeSolution.ctaSubject || activeSolution.title)}`}
                        className="btn btn--orange sol-stage-cta-btn"
                      >
                        <span>{activeSolution.ctaText}</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </header>

                  {/* BALANCED 2-COLUMN STAGE BODY - ZERO ARTIFICIAL GAPS */}
                  <div className="sol-stage-body">
                    {/* LEFT COLUMN */}
                    <div className="sol-stage-col sol-stage-col--workflow">
                      {/* 1. THE CHALLENGE */}
                      <div className="sol-module sol-module--challenges">
                        <div className="sol-module-head">
                          <span className="sol-module-head__icon sol-module-head__icon--alert">
                            <AlertCircle size={15} aria-hidden="true" />
                          </span>
                          <h3 className="sol-module-head__title">The Operational Challenge</h3>
                        </div>
                        <ul className="sol-challenge-list">
                          {activeSolution.challenges.map((c, i) => (
                            <li key={i}>
                              <span className="sol-challenge-dot" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 2. SOLUTION FLOW PIPELINE (COMPACT CONNECTED ROADMAP) */}
                      <div className="sol-module sol-module--flow">
                        <div className="sol-module-head">
                          <span className="sol-module-head__icon sol-module-head__icon--flow">
                            <Workflow size={15} aria-hidden="true" />
                          </span>
                          <h3 className="sol-module-head__title">Velvora Solution Flow Pipeline</h3>
                        </div>
                        <div className="sol-flow-timeline">
                          {activeSolution.flow.map((step, idx) => (
                            <span key={idx} className="sol-flow-step-wrap">
                              <span className="sol-flow-step-pill">
                                <span className="sol-flow-step-idx">0{idx + 1}</span>
                                <span className="sol-flow-step-text">{step}</span>
                              </span>
                              {idx < activeSolution.flow.length - 1 && (
                                <ChevronRight size={13} className="sol-flow-arrow" aria-hidden="true" />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. INTEGRATED SERVICES */}
                      <div className="sol-module sol-module--services">
                        <div className="sol-module-head">
                          <span className="sol-module-head__icon sol-module-head__icon--services">
                            <Layers size={15} aria-hidden="true" />
                          </span>
                          <h3 className="sol-module-head__title">Velvora Services Integrated</h3>
                        </div>
                        <div className="sol-services-wrap">
                          {activeSolution.servicesIncluded.map((s, idx) => (
                            <span key={idx} className="sol-service-chip">
                              <Check size={12} className="sol-service-chip__check" />
                              <span>{s}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="sol-stage-col sol-stage-col--impact">
                      {/* 4. BENEFITS DELIVERED */}
                      <div className="sol-module sol-module--benefits">
                        <div className="sol-module-head">
                          <span className="sol-module-head__icon sol-module-head__icon--benefits">
                            <CheckCircle2 size={15} aria-hidden="true" />
                          </span>
                          <h3 className="sol-module-head__title">Verified Benefits Delivered</h3>
                        </div>
                        <ul className="sol-benefits-list">
                          {activeSolution.benefits.map((b, i) => (
                            <li key={i}>
                              <CheckCircle2 size={15} className="sol-benefit-check" aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 5. STANDARDS OR CASE STUDY SPOTLIGHT */}
                      {activeSolution.standards ? (
                        <div className="sol-module sol-module--standards">
                          <div className="sol-module-head">
                            <span className="sol-module-head__icon sol-module-head__icon--award">
                              <Award size={15} aria-hidden="true" />
                            </span>
                            <h3 className="sol-module-head__title">Verified Standards &amp; Regulations</h3>
                          </div>
                          <div className="sol-standards-tags-grid">
                            {activeSolution.standards.map((st) => (
                              <span key={st} className="sol-std-pill">
                                {st}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : activeSolution.caseStudy ? (
                        <div className="sol-module sol-module--casestudy">
                          <span className="sol-casestudy-tag">Verified Production Case</span>
                          <h4 className="sol-casestudy-title">{activeSolution.caseStudy}</h4>
                          {activeSolution.caseStudyLink && (
                            <Link to={activeSolution.caseStudyLink} className="sol-casestudy-link">
                              <span>Read Case Report</span>
                              <ChevronRight size={13} aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div className="sol-module sol-module--assurance">
                          <div className="sol-module-head">
                            <span className="sol-module-head__icon sol-module-head__icon--award">
                              <Award size={15} aria-hidden="true" />
                            </span>
                            <h3 className="sol-module-head__title">Enterprise Quality Guarantee</h3>
                          </div>
                          <p className="sol-assurance-text">
                            Backed by Velvora’s 99.9% quality compliance SLA, multi-tier QA gates, and automated regression testing across all formats.
                          </p>
                        </div>
                      )}

                      {/* 6. DEPLOY ACTION CARD */}
                      <div className="sol-direct-card">
                        <span className="sol-direct-card__badge">Execution SLA</span>
                        <h4 className="sol-direct-card__title">Deploy this Architecture</h4>
                        <p className="sol-direct-card__desc">
                          Our solutions architects will analyze your content repositories and establish a zero-disruption timeline within 24 hours.
                        </p>
                        <Link
                          to={`/contact?subject=${encodeURIComponent(activeSolution.ctaSubject || activeSolution.title)}`}
                          className="btn btn--orange btn--block sol-direct-card__btn"
                        >
                          <span>{activeSolution.ctaText}</span>
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* STAGE FOOTER: PREVIOUS / NEXT SOLUTION STEPPERS */}
                  <footer className="sol-stage-footer">
                    <button
                      type="button"
                      className="sol-nav-stepper sol-nav-stepper--prev"
                      onClick={handlePrev}
                      aria-label="View previous solution"
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Previous Solution</span>
                    </button>
                    <div className="sol-stepper-indicator">
                      <span>Architecture <strong>{activeIndex + 1}</strong> of <strong>{solutionsData.length}</strong></span>
                    </div>
                    <button
                      type="button"
                      className="sol-nav-stepper sol-nav-stepper--next"
                      onClick={handleNext}
                      aria-label="View next solution"
                    >
                      <span>Next Solution</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </footer>
                </article>
              </main>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW MODE 2: COMPLETE PORTFOLIO CATALOG (GRID VIEW) */}
          {/* ========================================================================= */}
          {viewMode === 'grid' && (
            <div className="sol-catalog-view">
              {/* Category Filter Tabs */}
              <div className="sol-filter-pills" role="tablist" aria-label="Filter catalog">
                <button
                  type="button"
                  className={`sol-filter-pill${filter === 'all' ? ' is-active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  <SlidersHorizontal size={15} />
                  <span>All Solutions</span>
                  <span className="sol-filter-count">{solutionsData.length}</span>
                </button>
                <button
                  type="button"
                  className={`sol-filter-pill${filter === 'industry' ? ' is-active' : ''}`}
                  onClick={() => setFilter('industry')}
                >
                  <Building2 size={15} />
                  <span>By Industry</span>
                  <span className="sol-filter-count">
                    {solutionsData.filter((s) => s.category === 'industry').length}
                  </span>
                </button>
                <button
                  type="button"
                  className={`sol-filter-pill${filter === 'need' ? ' is-active' : ''}`}
                  onClick={() => setFilter('need')}
                >
                  <Sparkles size={15} />
                  <span>By Need</span>
                  <span className="sol-filter-count">
                    {solutionsData.filter((s) => s.category === 'need').length}
                  </span>
                </button>
              </div>

              {/* If filter is ALL: Display 2 distinct sections (Industry 2x2, Need 3:2 Funnel) */}
              {filter === 'all' ? (
                <div className="sol-catalog-sections">
                  {/* SECTION 1: BY INDUSTRY SECTOR (2x2 GRID) */}
                  <div className="sol-catalog-group">
                    <div className="sol-group-head">
                      <div className="sol-group-head__badge">
                        <Building2 size={16} />
                        <span>Industry Sectors</span>
                      </div>
                      <h3 className="sol-group-head__title">Solutions by Industry (4 Frameworks)</h3>
                      <p className="sol-group-head__desc">
                        Domain-tailored transformation pipelines addressing publishers, higher education, enterprises, and global compliance.
                      </p>
                    </div>

                    <div className="grid-4-even">
                      {industrySolutions.map((sol) => (
                        <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => { setActiveSolutionId(sol.id); setViewMode('console'); }} />
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: BY OPERATIONAL NEED (3:2 FUNNEL GRID) */}
                  <div className="sol-catalog-group" style={{ marginTop: '56px' }}>
                    <div className="sol-group-head">
                      <div className="sol-group-head__badge">
                        <Sparkles size={16} />
                        <span>Organizational Needs</span>
                      </div>
                      <h3 className="sol-group-head__title">Solutions by Need (5 Architectures)</h3>
                      <p className="sol-group-head__desc">
                        Targeted workflows addressing backlists, automated XML ingestion, custom application engineering, and executive BI.
                      </p>
                    </div>

                    <div className="grid-5-funnel">
                      {needSolutions.map((sol) => (
                        <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => { setActiveSolutionId(sol.id); setViewMode('console'); }} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Filtered Grid */
                <div className="solutions-grid" style={{ marginTop: '28px' }}>
                  {filteredSolutions.map((sol) => (
                    <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => { setActiveSolutionId(sol.id); setViewMode('console'); }} />
                  ))}
                </div>
              )}
            </div>
          )}
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

/**
 * Standardized High-Impact Solution Card for Catalog View
 */
function CatalogSolutionCard({ sol, onSelect }) {
  return (
    <article className="solution-card">
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
        {/* Challenge */}
        <div className="solution-section">
          <h4 className="solution-section__title">
            <AlertCircle size={15} className="solution-section__icon-alert" aria-hidden="true" />
            The Challenge
          </h4>
          <ul className="solution-challenge-list">
            {sol.challenges.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Flow */}
        <div className="solution-section">
          <h4 className="solution-section__title">
            <Workflow size={15} className="solution-section__icon-flow" aria-hidden="true" />
            Solution Flow
          </h4>
          <div className="solution-flow-steps">
            {sol.flow.map((step, idx) => (
              <span key={idx} className="solution-flow-step-wrap">
                <span className="solution-flow-step">
                  <span className="solution-flow-step__idx">{idx + 1}.</span> {step}
                </span>
                {idx < sol.flow.length - 1 && (
                  <ChevronRight size={13} className="solution-flow-arrow" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Services Included */}
        <div className="solution-section">
          <h4 className="solution-section__title">Services Included</h4>
          <div className="solution-services-tags">
            {sol.servicesIncluded.map((s) => (
              <span key={s} className="solution-service-pill">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="solution-section">
          <h4 className="solution-section__title">
            <CheckCircle2 size={15} className="solution-section__icon-check" aria-hidden="true" />
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
              <Award size={15} className="solution-section__icon-award" aria-hidden="true" />
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
                Explore Case Study <ChevronRight size={13} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA & Interactive Deep Dive Link */}
      <div className="solution-card__footer">
        <Link
          to={`/contact?subject=${encodeURIComponent(sol.ctaSubject || sol.title)}`}
          className="btn btn--orange btn--block"
        >
          <span>{sol.ctaText}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={onSelect}
          className="sol-card-blueprint-btn"
          title="Open in Interactive Blueprint Stage"
        >
          <Workflow size={13} />
          <span>Inspect Architecture Blueprint</span>
        </button>
      </div>
    </article>
  );
}
