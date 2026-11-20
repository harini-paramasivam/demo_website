import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Building2, 
  Sparkles, 
  Workflow, 
  Check, 
  LayoutGrid, 
  Table, 
  ShieldCheck, 
  Search, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PageHero } from '../components/ui.jsx';
import { solutionsData } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function SolutionsOverview() {
  useReveal();
  const { slug } = useParams();
  const navigate = useNavigate();
  const spotlightRef = useRef(null);

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

  // Active solution in Spotlight
  const [activeSolutionId, setActiveSolutionId] = useState(
    matchedSolution ? matchedSolution.id : solutionsData[0].id
  );

  // Active solution object
  const activeSolution = useMemo(() => {
    return solutionsData.find((s) => s.id === activeSolutionId) || solutionsData[0];
  }, [activeSolutionId]);

  // Sync active solution whenever URL slug changes
  useEffect(() => {
    if (matchedSolution) {
      setActiveSolutionId(matchedSolution.id);
    }
  }, [matchedSolution]);

  // Filter state: 'all' | 'industry' | 'need'
  const [filter, setFilter] = useState('all');

  // Presentation mode: 'showcase' (Luxury Bento Showcase) vs 'matrix' (Comparison Matrix)
  const [viewMode, setViewMode] = useState('showcase');

  // Real-time keyword search query
  const [searchQuery, setSearchQuery] = useState('');

  // Switch solution in spotlight and update URL
  const selectSolution = (sol, scroll = true) => {
    setActiveSolutionId(sol.id);
    if (sol.slug) {
      navigate(`/solutions/${sol.slug}`, { replace: false });
    }
    if (scroll && spotlightRef.current) {
      spotlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtered solutions based on category filter and search keyword
  const filteredSolutions = useMemo(() => {
    return solutionsData.filter((sol) => {
      const matchCat = filter === 'all' || sol.category === filter;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        sol.title.toLowerCase().includes(q) ||
        sol.tag.toLowerCase().includes(q) ||
        sol.categoryLabel.toLowerCase().includes(q) ||
        (sol.challenges && sol.challenges.some((c) => c.toLowerCase().includes(q))) ||
        (sol.benefits && sol.benefits.some((b) => b.toLowerCase().includes(q))) ||
        (sol.flow && sol.flow.some((f) => f.toLowerCase().includes(q))) ||
        (sol.servicesIncluded && sol.servicesIncluded.some((s) => s.toLowerCase().includes(q)))
      );
    });
  }, [filter, searchQuery]);

  // Secondary solutions excluding the one featured in the spotlight
  const secondarySolutions = useMemo(() => {
    return filteredSolutions.filter((s) => s.id !== activeSolution.id);
  }, [filteredSolutions, activeSolution.id]);

  return (
    <>
      {/* 1. MASTER FUTURISTIC HERO BANNER */}
      <PageHero
        eyebrow={slug && activeSolution ? `${activeSolution.tag} Solution` : 'Solutions Architecture'}
        title={slug && activeSolution ? activeSolution.title : 'Enterprise Architectures Engineered for Scale'}
      >
        {slug && activeSolution
          ? `Purpose-built architecture and delivery frameworks engineered specifically for ${activeSolution.title.toLowerCase()}. Explore operational challenges, workflow blueprints, and verified benefits.`
          : 'Mission-critical transformation blueprints, automated publishing pipelines, and certified accessibility architectures engineered with strict SLA guarantees.'}
      </PageHero>

      {/* 2. SEAMLESS LUXURY BENTO SECTION (UNIFIED CONTINUOUS DARK-SLATE CANVAS) */}
      <section className="sol-bento-section" aria-label="Solutions Showcase">
        <div className="container">
          {/* A. LUXURY TELEMETRY METRICS BAR */}
          <div className="sol-bento-metrics" aria-label="Enterprise capability indicators">
            <div className="sol-bento-metrics-grid">
              <div className="sol-bento-metric-item">
                <span className="sol-metric-dot sol-metric-dot--cyan" />
                <div className="sol-bento-metric-text">
                  <strong className="sol-bento-metric-key">9 Enterprise Architectures</strong>
                  <span className="sol-bento-metric-val">End-to-End Solutions</span>
                </div>
              </div>

              <div className="sol-bento-metric-item">
                <span className="sol-metric-dot sol-metric-dot--blue" />
                <div className="sol-bento-metric-text">
                  <strong className="sol-bento-metric-key">4 Industry Frameworks</strong>
                  <span className="sol-bento-metric-val">Publishers, EdTech &amp; Enterprise</span>
                </div>
              </div>

              <div className="sol-bento-metric-item">
                <span className="sol-metric-dot sol-metric-dot--emerald" />
                <div className="sol-bento-metric-text">
                  <strong className="sol-bento-metric-key">5 Operational Needs</strong>
                  <span className="sol-bento-metric-val">Modernization, AI &amp; Backlists</span>
                </div>
              </div>

              <div className="sol-bento-metric-item">
                <span className="sol-metric-dot sol-metric-dot--purple" />
                <div className="sol-bento-metric-text">
                  <strong className="sol-bento-metric-key">100% Verified SLAs</strong>
                  <span className="sol-bento-metric-val">Zero Disruption Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* B. EXECUTIVE CONTROL BAR (FILTERS, SEARCH & VIEW MODE SWITCHER) */}
          <div className="sol-bento-control-bar">
            {/* Left: Category Filter Tabs */}
            <div className="sol-bento-filter-group" role="tablist" aria-label="Filter solutions">
              <button
                type="button"
                className={`sol-bento-tab${filter === 'all' ? ' is-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <span>All Architectures</span>
                <span className="sol-bento-tab-count">{solutionsData.length}</span>
              </button>
              <button
                type="button"
                className={`sol-bento-tab${filter === 'industry' ? ' is-active' : ''}`}
                onClick={() => setFilter('industry')}
              >
                <Building2 size={14} />
                <span>Industry Sectors</span>
                <span className="sol-bento-tab-count">
                  {solutionsData.filter((s) => s.category === 'industry').length}
                </span>
              </button>
              <button
                type="button"
                className={`sol-bento-tab${filter === 'need' ? ' is-active' : ''}`}
                onClick={() => setFilter('need')}
              >
                <Sparkles size={14} />
                <span>Operational Needs</span>
                <span className="sol-bento-tab-count">
                  {solutionsData.filter((s) => s.category === 'need').length}
                </span>
              </button>
            </div>

            {/* Right: Search & Presentation Switcher */}
            <div className="sol-bento-actions-group">
              {/* Real-time search box */}
              <div className="sol-bento-search">
                <Search size={14} className="sol-bento-search__icon" />
                <input
                  type="text"
                  className="sol-bento-search__input"
                  placeholder="Search architectures or standards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search architectures"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="sol-bento-search__clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* View Switcher: Showcase vs Matrix */}
              <div className="sol-bento-switcher" role="radiogroup" aria-label="Catalog presentation">
                <button
                  type="button"
                  className={`sol-bento-switcher-btn${viewMode === 'showcase' ? ' is-active' : ''}`}
                  onClick={() => setViewMode('showcase')}
                  title="Luxury Bento Architecture Showcase"
                >
                  <LayoutGrid size={14} />
                  <span>Bento Showcase</span>
                </button>
                <button
                  type="button"
                  className={`sol-bento-switcher-btn${viewMode === 'matrix' ? ' is-active' : ''}`}
                  onClick={() => setViewMode('matrix')}
                  title="Enterprise Comparison Matrix Table"
                >
                  <Table size={14} />
                  <span>Comparison Matrix</span>
                </button>
              </div>
            </div>
          </div>

          {/* C. ACTIVE SEARCH FEEDBACK */}
          {searchQuery && (
            <div className="sol-search-feedback">
              <span>
                Found <strong>{filteredSolutions.length}</strong> {filteredSolutions.length === 1 ? 'architecture' : 'architectures'} matching &ldquo;{searchQuery}&rdquo;
              </span>
              <button type="button" onClick={() => setSearchQuery('')} className="sol-search-reset-btn">
                Reset Search
              </button>
            </div>
          )}

          {/* D. EMPTY SEARCH STATE */}
          {filteredSolutions.length === 0 ? (
            <div className="sol-empty-state">
              <AlertCircle size={32} />
              <h4>No matching architectures found</h4>
              <p>Try searching for terms like &ldquo;XML&rdquo;, &ldquo;Accessibility&rdquo;, &ldquo;AI&rdquo;, or &ldquo;EPUB&rdquo;.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setFilter('all'); }}
                className="btn btn--blue btn--sm"
              >
                View All 9 Architectures
              </button>
            </div>
          ) : viewMode === 'matrix' ? (
            /* E. VIEW MODE: COMPARISON MATRIX TABLE */
            <SolutionsMatrixTable 
              solutions={filteredSolutions} 
              onSelect={(sol) => {
                selectSolution(sol);
                setViewMode('showcase');
              }} 
            />
          ) : (
            /* F. VIEW MODE: LUXURY BENTO SHOWCASE */
            <div className="sol-bento-showcase">
              {/* 1. FLAGSHIP ARCHITECTURE SPOTLIGHT (BENTO HERO CARD) */}
              <div ref={spotlightRef} className="sol-flagship-spotlight">
                {/* Spotlight Top Bar: Quick Architecture Switcher Pills */}
                <div className="sol-spotlight-nav-strip">
                  <span className="sol-spotlight-nav-label">Select Architecture:</span>
                  <div className="sol-spotlight-nav-pills">
                    {solutionsData.map((sol) => {
                      const isSelected = sol.id === activeSolution.id;
                      return (
                        <button
                          key={sol.id}
                          type="button"
                          className={`sol-spotlight-nav-pill${isSelected ? ' is-active' : ''}`}
                          onClick={() => selectSolution(sol, false)}
                          aria-selected={isSelected}
                        >
                          <Icon name={sol.icon} size={13} />
                          <span>{sol.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Spotlight Core Content */}
                <div className="sol-spotlight-header">
                  <div className="sol-spotlight-identity">
                    <div className="sol-spotlight-icon-wrap">
                      <Icon name={activeSolution.icon} size={28} />
                    </div>
                    <div>
                      <div className="sol-spotlight-meta-tags">
                        <span className="sol-badge-cat">{activeSolution.categoryLabel}</span>
                        <span className="sol-badge-tag">{activeSolution.tag}</span>
                        <span className="sol-badge-sla">Verified SLA Delivery</span>
                      </div>
                      <h2 className="sol-spotlight-title">{activeSolution.title}</h2>
                    </div>
                  </div>

                  <div className="sol-spotlight-ctas">
                    <Link
                      to={`/contact?subject=${encodeURIComponent(activeSolution.ctaSubject || activeSolution.title)}`}
                      className="btn btn--blue btn--glow sol-spotlight-cta"
                    >
                      <span>Deploy Architecture Blueprint</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                {/* Interactive End-to-End Pipeline Roadmap Strip */}
                <div className="sol-spotlight-pipeline-box">
                  <div className="sol-pipeline-header">
                    <span className="sol-pipeline-heading">
                      <Workflow size={14} />
                      <span>End-to-End Execution Sequence ({activeSolution.flow.length} Production Stages)</span>
                    </span>
                  </div>
                  <div className="sol-pipeline-stages">
                    {activeSolution.flow.map((step, idx) => (
                      <div key={idx} className="sol-pipeline-stage-node">
                        <span className="sol-stage-number">0{idx + 1}</span>
                        <span className="sol-stage-text">{step}</span>
                        {idx < activeSolution.flow.length - 1 && (
                          <span className="sol-stage-connector" aria-hidden="true">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-Column Balanced Architecture Pods */}
                <div className="sol-spotlight-pods-grid">
                  {/* Left Pod: Operational Bottlenecks Addressed */}
                  <div className="sol-spotlight-pod">
                    <div className="sol-pod-head">
                      <AlertCircle size={15} />
                      <h3>The Operational Challenge</h3>
                    </div>
                    <ul className="sol-pod-list">
                      {activeSolution.challenges.map((c, idx) => (
                        <li key={idx}>
                          <span className="sol-pod-dot" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Pod: Verified Business Benefits */}
                  <div className="sol-spotlight-pod">
                    <div className="sol-pod-head">
                      <CheckCircle2 size={15} />
                      <h3>Verified Business Outcomes &amp; SLA</h3>
                    </div>
                    <ul className="sol-pod-list">
                      {activeSolution.benefits.map((b, idx) => (
                        <li key={idx}>
                          <Check size={14} className="sol-pod-check" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spotlight Footer: Included Tech Stack & Case Study Link */}
                <div className="sol-spotlight-footer">
                  <div className="sol-spotlight-tech-stack">
                    <span className="sol-tech-stack-label">
                      <Layers size={13} /> Integrated Stack:
                    </span>
                    <div className="sol-tech-stack-pills">
                      {activeSolution.servicesIncluded.map((s) => (
                        <span key={s} className="sol-tech-pill">{s}</span>
                      ))}
                    </div>
                  </div>

                  {activeSolution.caseStudy && (
                    <div className="sol-spotlight-caseref">
                      {activeSolution.caseStudyLink ? (
                        <Link to={activeSolution.caseStudyLink} className="sol-caseref-anchor">
                          <span>Case Study: {activeSolution.caseStudy}</span>
                          <ExternalLink size={12} />
                        </Link>
                      ) : (
                        <span className="sol-caseref-text">Case Study: {activeSolution.caseStudy}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 2. SECONDARY ARCHITECTURES BENTO GRID */}
              {secondarySolutions.length > 0 && (
                <div className="sol-bento-secondary-section">
                  <div className="sol-secondary-head">
                    <h3 className="sol-secondary-title">
                      {filter === 'all' ? 'Explore All Other Enterprise Architectures' : `Filtered Architectures (${secondarySolutions.length})`}
                    </h3>
                    <p className="sol-secondary-desc">
                      Select any architecture below to inspect its live execution sequence, SLA deliverables, and verified benefits.
                    </p>
                  </div>

                  <div className="sol-bento-cards-grid">
                    {secondarySolutions.map((sol) => (
                      <article key={sol.id} className="sol-bento-card">
                        <div className="sol-bento-card__top">
                          <div className="sol-bento-card__icon">
                            <Icon name={sol.icon} size={22} />
                          </div>
                          <div className="sol-bento-card__meta">
                            <span className="sol-badge-cat">{sol.categoryLabel}</span>
                            <span className="sol-badge-tag">{sol.tag}</span>
                          </div>
                        </div>

                        <h4 className="sol-bento-card__title">{sol.title}</h4>

                        {/* Operational Bottleneck Snapshot */}
                        <div className="sol-bento-card__pod">
                          <span className="sol-bento-pod__label">
                            <AlertCircle size={12} /> Operational Bottleneck
                          </span>
                          <p className="sol-bento-pod__text">{sol.challenges[0]}</p>
                        </div>

                        {/* Pipeline Strip */}
                        <div className="sol-bento-card__pod">
                          <span className="sol-bento-pod__label">
                            <Workflow size={12} /> Delivery Pipeline
                          </span>
                          <div className="sol-card-pipe-flow">
                            {sol.flow.slice(0, 3).map((st, i) => (
                              <span key={i} className="sol-card-pipe-step">
                                <strong>0{i + 1}</strong> {st}
                              </span>
                            ))}
                            {sol.flow.length > 3 && (
                              <span className="sol-card-pipe-more">+{sol.flow.length - 3}</span>
                            )}
                          </div>
                        </div>

                        {/* Verified SLA Outcome */}
                        <div className="sol-bento-card__pod">
                          <span className="sol-bento-pod__label">
                            <CheckCircle2 size={12} /> Guaranteed Outcome
                          </span>
                          <p className="sol-bento-pod__text">{sol.benefits[0]}</p>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="sol-bento-card__actions">
                          <button
                            type="button"
                            className="sol-bento-inspect-btn"
                            onClick={() => selectSolution(sol, true)}
                            title="Inspect in Flagship Spotlight"
                          >
                            <Workflow size={13} />
                            <span>Inspect Spotlight</span>
                          </button>
                          <Link
                            to={`/contact?subject=${encodeURIComponent(sol.ctaSubject || sol.title)}`}
                            className="sol-bento-enquire-btn"
                          >
                            <span>Enquire</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. UNIFIED ENTERPRISE CONSULTATION SPOTLIGHT (CONTINUOUS LUXURY DARK THEME) */}
      <section className="sol-bento-cta-section" aria-label="Architecture consultation">
        <div className="container">
          <div className="sol-luxury-cta-card">
            <div className="sol-luxury-cta-content">
              <span className="sol-cta-badge">
                <ShieldCheck size={16} /> Certified SLA Guarantee
              </span>
              <h3>Ready to Deploy These Architectures for Your Organization?</h3>
              <p>Our solutions architects are available to review your current content workflows, conduct complimentary technical audits, and provide customized implementation roadmaps.</p>
            </div>
            <div className="sol-luxury-cta-actions">
              <Link to="/contact" className="btn btn--blue btn--glow">
                Schedule Architecture Consultation <ArrowRight size={16} />
              </Link>
            </div>
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
                <span className="sol-matrix-badge">
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
                    title="Inspect in Flagship Spotlight"
                  >
                    <Workflow size={13} />
                    <span>Inspect Spotlight</span>
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
