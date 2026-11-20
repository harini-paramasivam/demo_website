import { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Building2, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  SlidersHorizontal,
  Workflow,
  Check,
  LayoutGrid,
  Table,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { PageHero } from '../components/ui.jsx';
import { solutionsData } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function SolutionsOverview() {
  useReveal();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find solution matching URL slug if present
  const matchedSolution = useMemo(() => {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();
    return (
      solutionsData.find(
        (s) =>
          s.slug === clean ||
          s.id === clean ||
          s.id.replace(/-solution$/, '') === clean ||
          (s.aliases && s.aliases.includes(clean)) ||
          (s.slug && clean.includes(s.slug))
      ) || null
    );
  }, [slug]);

  // Active solution in Interactive andConsole
  const [activeSolutionId, setActiveSolutionId] = useState(
    matchedSolution ? matchedSolution.id : solutionsData[0].id
  );

  // Sync active solution whenever URL slug changes
  useEffect(() => {
    if (matchedSolution) {
      setActiveSolutionId(matchedSolution.id);
      setViewMode('console');
    }
  }, [matchedSolution]);

  // View mode: 'console' (Interactive Architecture Blueprint) vs 'grid' (Full Catalog Matrix)
  const [viewMode, setViewMode] = useState('console');

  // Filter state for catalog view
  const [filter, setFilter] = useState('all');

  // Layout mode for catalog: 'cards' (Executive Cards) vs 'matrix' (Comparison Table)
  const [catalogLayout, setCatalogLayout] = useState('cards');

  // Active solution object
  const activeSolution = useMemo(() => {
    return solutionsData.find((s) => s.id === activeSolutionId) || solutionsData[0];
  }, [activeSolutionId]);

  const activeIndex = useMemo(() => {
    return solutionsData.findIndex((s) => s.id === activeSolution.id);
  }, [activeSolution]);

  const selectSolution = (sol) => {
    setActiveSolutionId(sol.id);
    setViewMode('console');
    if (sol.slug) {
      navigate(`/solutions/${sol.slug}`, { replace: false });
    }
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + solutionsData.length) % solutionsData.length;
    selectSolution(solutionsData[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % solutionsData.length;
    selectSolution(solutionsData[nextIndex]);
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
        eyebrow={slug && activeSolution ? `${activeSolution.tag} Solution` : 'Solutions Overview'}
        title={slug && activeSolution ? activeSolution.title : 'Practical Solutions for Real Challenges'}
        crumbs={slug && activeSolution ? ['Home', 'Solutions', activeSolution.title] : ['Home', 'Solutions']}
      >
        {slug && activeSolution
          ? `Purpose-built architecture and delivery frameworks engineered specifically for ${activeSolution.title.toLowerCase()}. Explore operational challenges, workflow blueprints, and verified benefits.`
          : 'Velvora applies its services to solve industry‑specific and organizational challenges. Each solution includes the challenge, the solution flow, the services included, and the benefits delivered.'}
      </PageHero>

      {/* METRIC HIGHLIGHT STRIP */}
      <section className="sol-metrics-strip" aria-label="Key Solutions Capabilities">
        <div className="container">
          <div className="sol-metrics-grid">
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--blue" />
              <strong className="sol-metric-key">9 Enterprise Architectures</strong>
              <span className="sol-metric-val">End-to-End Solutions</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--cyan" />
              <strong className="sol-metric-key">4 Industry Frameworks</strong>
              <span className="sol-metric-val">Publishers, EdTech &amp; Corporate</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--emerald" />
              <strong className="sol-metric-key">5 Operational Needs</strong>
              <span className="sol-metric-val">Modernization, AI &amp; Backlists</span>
            </div>
            <div className="sol-metric-pill">
              <span className="sol-metric-dot sol-metric-dot--purple" />
              <strong className="sol-metric-key">100% Verified SLAs</strong>
              <span className="sol-metric-val">Zero Production Disruption</span>
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
                            onClick={() => selectSolution(sol)}
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
                            onClick={() => selectSolution(sol)}
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
                        <div className="sol-flow-timeline" style={{ textAlign: 'left', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {activeSolution.flow.map((step, idx) => (
                            <span key={idx} className="sol-flow-step-wrap" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                              <span className="sol-flow-step-pill">
                                <span className="sol-flow-step-idx">0{idx + 1}</span>
                                <span className="sol-flow-step-text">{step}</span>
                              </span>
                              <ChevronRight size={13} className="sol-flow-arrow" aria-hidden="true" />
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
                      <div className="sol-direct-card sol-direct-card--light">
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
                    <div className="sol-stage-footer__controls">
                      <button
                        type="button"
                        className="sol-nav-stepper sol-nav-stepper--prev"
                        onClick={handlePrev}
                        aria-label="View previous solution"
                      >
                        <ArrowLeft size={16} aria-hidden="true" />
                        <span>Previous Solution</span>
                      </button>
                      <button
                        type="button"
                        className="sol-nav-stepper sol-nav-stepper--next"
                        onClick={handleNext}
                        aria-label="View next solution"
                      >
                        <span>Next Solution</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="sol-stepper-indicator">
                      <span>Architecture <strong>{activeIndex + 1}</strong> of <strong>{solutionsData.length}</strong></span>
                    </div>
                  </footer>
                </article>
              </main>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW MODE 2: COMPLETE PORTFOLIO CATALOG (GRID & MATRIX VIEWS) */}
          {/* ========================================================================= */}
          {viewMode === 'grid' && (
            <div className="sol-catalog-view sol-catalog-view--hybrid">
              {/* Category Filter Tabs & Layout Switcher Toolbar */}
              <div className="sol-catalog-toolbar">
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

                {/* Display Mode Switcher (Cards vs Matrix) */}
                <div className="sol-layout-switcher" role="radiogroup" aria-label="Catalog layout mode">
                  <button
                    type="button"
                    className={`sol-layout-btn${catalogLayout === 'cards' ? ' is-active' : ''}`}
                    onClick={() => setCatalogLayout('cards')}
                    title="Executive Cards Grid"
                  >
                    <LayoutGrid size={15} />
                    <span>Executive Cards</span>
                  </button>
                  <button
                    type="button"
                    className={`sol-layout-btn${catalogLayout === 'matrix' ? ' is-active' : ''}`}
                    onClick={() => setCatalogLayout('matrix')}
                    title="Comparison Matrix Table"
                  >
                    <Table size={15} />
                    <span>Comparison Matrix</span>
                  </button>
                </div>
              </div>

              {/* View Presentation: Matrix Table vs Executive Cards */}
              {catalogLayout === 'matrix' ? (
                <SolutionsMatrixTable 
                  solutions={filteredSolutions} 
                  onSelect={selectSolution} 
                />
              ) : filter === 'all' ? (
                <div className="sol-catalog-sections">
                  {/* SECTION 1: BY INDUSTRY SECTOR */}
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
                        <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => selectSolution(sol)} />
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: BY OPERATIONAL NEED */}
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
                        <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => selectSolution(sol)} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Filtered Grid */
                <div className="solutions-grid" style={{ marginTop: '28px' }}>
                  {filteredSolutions.map((sol) => (
                    <CatalogSolutionCard key={sol.id} sol={sol} onSelect={() => selectSolution(sol)} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* UNIFIED ENTERPRISE CONSULTATION CTA (MATCHING IMAGE 1) */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="testimonials-cta-spotlight sol-cta-spotlight--light">
            <div className="testimonials-cta-spotlight__content">
              <span className="badge-eyebrow" style={{ color: '#0284c7' }}>
                <ShieldCheck size={16} /> SLA Guarantee
              </span>
              <h4>Ready to Deploy These Architectures for Your Organization?</h4>
              <p>Our solutions architects are available to discuss tailored timelines, sample audits, and fixed-scope delivery roadmaps.</p>
            </div>
            <Link to="/contact" className="btn btn--orange btn--lg testimonials-cta-spotlight__btn">
              <span>Discuss Your Project</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Executive Comparison Matrix Table for Enterprise Solution Portfolios
 */
function SolutionsMatrixTable({ solutions, onSelect }) {
  return (
    <div className="sol-matrix-table-wrap">
      <table className="sol-matrix-table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '22%' }}>Architecture / Framework</th>
            <th scope="col" style={{ width: '13%' }}>Sector / Scope</th>
            <th scope="col" style={{ width: '25%' }}>Core Challenge Solved</th>
            <th scope="col" style={{ width: '22%' }}>Delivery Pipeline</th>
            <th scope="col" style={{ width: '18%' }}>Executive Actions</th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((sol) => (
            <tr key={sol.id} className="sol-matrix-row">
              <td className="sol-matrix-title-cell">
                <div className="sol-matrix-title-flex">
                  <div className="sol-matrix-icon-box">
                    <Icon name={sol.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="sol-matrix-name">{sol.title}</h4>
                    <span className="sol-matrix-subtag">{sol.tag}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className={`sol-matrix-badge sol-matrix-badge--${sol.category}`}>
                  {sol.category === 'industry' ? <Building2 size={12} /> : <Sparkles size={12} />}
                  <span>{sol.categoryLabel}</span>
                </span>
              </td>
              <td>
                <p className="sol-matrix-challenge">
                  {sol.challenges[0]}
                </p>
                {sol.challenges.length > 1 && (
                  <span className="sol-matrix-more-hint">+{sol.challenges.length - 1} additional pain points</span>
                )}
              </td>
              <td>
                <div className="sol-matrix-flow-strip">
                  {sol.flow.map((step, idx) => (
                    <span key={idx} className="sol-matrix-flow-step">
                      {idx + 1}. {step}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="sol-matrix-actions">
                  <button
                    type="button"
                    onClick={() => onSelect(sol)}
                    className="sol-matrix-blueprint-btn"
                    title="Inspect architecture blueprint"
                  >
                    <Workflow size={13} />
                    <span>Inspect Blueprint</span>
                  </button>
                  <Link
                    to={`/contact?subject=${encodeURIComponent(sol.ctaSubject || sol.title)}`}
                    className="sol-matrix-enquire-link"
                  >
                    <span>Enquire</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Standardized High-Impact Executive Solution Card for Catalog View
 * Compact layout with expandable deep-dive specifications
 */
function CatalogSolutionCard({ sol, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`solution-card${expanded ? ' is-expanded' : ''}`}>
      {/* Header */}
      <div className="solution-card__header">
        <div className="solution-card__top">
          <div className="solution-card__icon-box">
            <Icon name={sol.icon} size={22} />
          </div>
          <span className="solution-card__badge">{sol.categoryLabel}</span>
        </div>
        <h3 className="solution-card__title">{sol.title}</h3>
        <span className="solution-card__tag">{sol.tag}</span>
      </div>

      <div className="solution-card__content">
        {/* Core Challenge Snapshot */}
        <div className="solution-card__summary-block">
          <span className="solution-card__block-label">
            <AlertCircle size={13} className="text-amber-500" />
            <span>Core Challenge</span>
          </span>
          <p className="solution-card__summary-text">
            {sol.challenges[0]}
          </p>
        </div>

        {/* 3-Step Pipeline Flow Strip */}
        <div className="solution-card__pipeline-strip">
          <span className="solution-card__block-label">
            <Workflow size={13} className="text-sky-600" />
            <span>Delivery Pipeline</span>
          </span>
          <div className="solution-card__pipeline-pills">
            {sol.flow.slice(0, 3).map((st, i) => (
              <span key={i} className="solution-card__pipeline-pill">
                <span className="sol-pipe-num">0{i + 1}</span> {st}
              </span>
            ))}
            {sol.flow.length > 3 && (
              <span className="solution-card__pipeline-more">+{sol.flow.length - 3}</span>
            )}
          </div>
        </div>

        {/* Top Integrated Services */}
        <div className="solution-card__services-block">
          <span className="solution-card__block-label">
            <Layers size={13} className="text-indigo-600" />
            <span>Integrated Stack</span>
          </span>
          <div className="solution-card__services-pills">
            {sol.servicesIncluded.slice(0, 4).map((s) => (
              <span key={s} className="sol-mini-service-tag">{s}</span>
            ))}
            {sol.servicesIncluded.length > 4 && (
              <span className="sol-mini-service-tag sol-mini-service-tag--more">
                +{sol.servicesIncluded.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Primary Guaranteed Outcome */}
        <div className="solution-card__outcome-block">
          <span className="solution-card__block-label">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Guaranteed Outcome</span>
          </span>
          <p className="solution-card__outcome-text">
            {sol.benefits[0]}
          </p>
        </div>

        {/* Expandable Full Specifications Drawer */}
        {expanded && (
          <div className="solution-card__drawer">
            {/* Full Challenges */}
            {sol.challenges.length > 1 && (
              <div className="sol-drawer-section">
                <h5 className="sol-drawer-heading">Detailed Operational Bottlenecks</h5>
                <ul className="sol-drawer-list">
                  {sol.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Flow */}
            <div className="sol-drawer-section">
              <h5 className="sol-drawer-heading">Complete 5-Stage Orchestration</h5>
              <div className="sol-drawer-flow">
                {sol.flow.map((step, idx) => (
                  <span key={idx} className="sol-drawer-flow-item">
                    <strong>Phase {idx + 1}:</strong> {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete Benefits */}
            <div className="sol-drawer-section">
              <h5 className="sol-drawer-heading">All SLA & Business Deliverables</h5>
              <ul className="sol-drawer-benefits">
                {sol.benefits.map((b, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standards & Compliance */}
            {sol.standards && (
              <div className="sol-drawer-section">
                <h5 className="sol-drawer-heading">Governing Standards</h5>
                <div className="sol-drawer-tags">
                  {sol.standards.map((st) => (
                    <span key={st} className="sol-drawer-tag">{st}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Case Study */}
            {sol.caseStudy && (
              <div className="sol-drawer-case">
                <span className="sol-drawer-case__label">Proven Implementation</span>
                <p className="sol-drawer-case__text">{sol.caseStudy}</p>
                {sol.caseStudyLink && (
                  <Link to={sol.caseStudyLink} className="sol-drawer-case__link">
                    Read Published Case Study <ChevronRight size={13} />
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Toggle Specifications Button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="sol-card-expand-btn"
          aria-expanded={expanded}
        >
          <span>{expanded ? 'Collapse Specifications' : 'View Full Specifications'}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Card Actions */}
      <div className="solution-card__footer">
        <button
          type="button"
          onClick={onSelect}
          className="sol-card-blueprint-btn"
          title="Open in Interactive Blueprint Stage"
        >
          <Workflow size={14} />
          <span>Inspect Architecture Blueprint</span>
        </button>
        <div className="solution-card__sub-actions">
          <Link
            to={`/contact?subject=${encodeURIComponent(sol.ctaSubject || sol.title)}`}
            className="sol-card-enquire-btn"
          >
            <span>{sol.ctaText}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}