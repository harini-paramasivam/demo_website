import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  FileCode, 
  Bot, 
  BarChart3, 
  ChevronRight,
  Sparkles,
  Award,
  SlidersHorizontal
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import { solutionsData } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function SolutionsOverview() {
  useReveal();
  const [filter, setFilter] = useState('all');

  const filteredSolutions = filter === 'all' 
    ? solutionsData 
    : solutionsData.filter((s) => s.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Solutions Overview"
        title="Practical Solutions for Real Challenges"
        crumbs={['Home', 'Solutions']}
      >
        Velvora applies its services to solve industry‑specific and organizational challenges. Each solution includes the challenge, the solution flow, the services included, and the benefits delivered.
      </PageHero>

      {/* FILTER TABS DOCK */}
      <section className="career-nav-section-dark netbg" aria-label="Solutions Categories">
        <div className="container">
          <div className="career-filter-bar" role="tablist" aria-label="Filter solutions">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`career-filter-btn${filter === 'all' ? ' is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              <span>All Solutions</span>
              <span className="why-filter-count" style={{ marginLeft: 6 }}>{solutionsData.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'industry'}
              className={`career-filter-btn${filter === 'industry' ? ' is-active' : ''}`}
              onClick={() => setFilter('industry')}
            >
              <Building2 size={16} aria-hidden="true" />
              <span>By Industry</span>
              <span className="why-filter-count" style={{ marginLeft: 6 }}>
                {solutionsData.filter((s) => s.category === 'industry').length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'need'}
              className={`career-filter-btn${filter === 'need' ? ' is-active' : ''}`}
              onClick={() => setFilter('need')}
            >
              <Sparkles size={16} aria-hidden="true" />
              <span>By Need</span>
              <span className="why-filter-count" style={{ marginLeft: 6 }}>
                {solutionsData.filter((s) => s.category === 'need').length}
              </span>
            </button>
          </div>

          <div className="career-filter-hint">
            <span className="career-filter-hint__badge">
              <span className="career-filter-hint__dot" />
              {filter === 'all' ? 'Complete Portfolio' : filter === 'industry' ? 'By Industry Solutions' : 'By Need Solutions'}
            </span>
            <span className="career-filter-hint__text">
              — {filter === 'all' ? 'Displaying all 9 purpose-built solution architectures' : filter === 'industry' ? 'Configured for Publishers, Higher Ed, Enterprises, and Compliance' : 'Workflows for Back-Catalogues, XML, Digitization, AI, and Dashboards'}
            </span>
          </div>
        </div>
      </section>

      {/* SOLUTIONS LIST */}
      <section className="section section--paper" aria-labelledby="solutions-list-head">
        <div className="container">
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
