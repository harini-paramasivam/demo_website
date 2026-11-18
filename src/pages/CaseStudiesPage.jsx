import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Layers, 
  Clock, 
  Building2, 
  FileCheck 
} from 'lucide-react';
import { PageHero } from '../components/ui.jsx';
import { getAllCaseStudies } from '../data/caseStudiesData.js';

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Proven Enterprise Success"
        title="Enterprise Case Studies & Digital Transformation"
        crumbs={['Home', 'Case Studies']}
      >
        Explore how Velvora Solutions partners with leading publishers, universities, and enterprise organizations to achieve 100% WCAG 2.2 / PDF/UA compliance, transform multi-thousand title back-catalogues into accessible EPUB 3, and automate large-scale scholarly journal XML workflows.
      </PageHero>

      {/* TRUST METRICS RIBBON */}
      <section className="case-studies-trust-ribbon">
        <div className="container">
          <div className="case-trust-grid">
            <div className="case-trust-item">
              <span className="case-trust-num">100%</span>
              <span className="case-trust-desc">WCAG 2.2 &amp; PDF/UA Conformance</span>
            </div>
            <div className="case-trust-divider" aria-hidden="true" />
            <div className="case-trust-item">
              <span className="case-trust-num">5,000+</span>
              <span className="case-trust-desc">EPUB 3 Titles Modernized</span>
            </div>
            <div className="case-trust-divider" aria-hidden="true" />
            <div className="case-trust-item">
              <span className="case-trust-num">12,000+</span>
              <span className="case-trust-desc">Scholarly Articles Tagged to JATS XML</span>
            </div>
            <div className="case-trust-divider" aria-hidden="true" />
            <div className="case-trust-item">
              <span className="case-trust-num">0</span>
              <span className="case-trust-desc">Retail &amp; Statutory Rejections</span>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="section section--paper case-studies-list-section">
        <div className="container">
          <div className="case-studies-header-block">
            <div className="case-studies-badge-pill">
              <Sparkles size={14} aria-hidden="true" />
              <span>Verified Results Across Critical Workflows</span>
            </div>
            <h2 className="case-studies-heading">Featured Client Engagements</h2>
            <p className="case-studies-subheading">
              Every case study below represents an end-to-end engineered transformation delivered with certified human-in-the-loop QA, automated validation pipelines, and ironclad compliance guarantees.
            </p>
          </div>

          <div className="case-studies-cards-stack">
            {caseStudies.map((cs, idx) => (
              <article key={cs.id || cs.slug} className="case-study-showcase-card">
                <div className="case-card-top-bar">
                  <div className="case-card-tags">
                    <span className="case-card-category-badge">
                      <Award size={13} aria-hidden="true" />
                      {cs.category}
                    </span>
                    <span className="case-card-meta-pill">
                      <Building2 size={13} aria-hidden="true" />
                      {cs.industry}
                    </span>
                    <span className="case-card-meta-pill">
                      <Clock size={13} aria-hidden="true" />
                      {cs.timeline}
                    </span>
                  </div>
                  <span className="case-card-index">0{idx + 1}</span>
                </div>

                <div className="case-card-content-body">
                  <h3 className="case-card-title">
                    <Link to={`/case-studies/${cs.slug}`}>
                      {cs.title}
                    </Link>
                  </h3>
                  <p className="case-card-subtitle">{cs.subtitle}</p>

                  {/* 3-COLUMN SUMMARY GRID */}
                  <div className="case-card-stages-grid">
                    <div className="case-stage-pod case-stage-pod--challenge">
                      <span className="case-stage-label">The Challenge</span>
                      <p className="case-stage-text">{cs.challenge?.overview || cs.summary}</p>
                    </div>

                    <div className="case-stage-pod case-stage-pod--solution">
                      <span className="case-stage-label">Velvora Solution</span>
                      <p className="case-stage-text">{cs.solution?.overview || cs.summary}</p>
                    </div>

                    <div className="case-stage-pod case-stage-pod--result">
                      <span className="case-stage-label">Measurable Result</span>
                      <p className="case-stage-text">{cs.results?.headline || cs.summary}</p>
                    </div>
                  </div>

                  {/* STATS STRIP */}
                  {cs.heroStats && cs.heroStats.length > 0 && (
                    <div className="case-card-kpi-strip">
                      {cs.heroStats.map((stat, sIdx) => (
                        <div key={sIdx} className="case-card-kpi-item">
                          <span className="case-card-kpi-val">{stat.value}</span>
                          <span className="case-card-kpi-lbl">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="case-card-actions-bar">
                    <Link 
                      to={`/case-studies/${cs.slug}`} 
                      className="btn btn--orange btn--case-action"
                      id={`btn-read-case-${cs.slug}`}
                    >
                      Read Full Case Study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link 
                      to="/contact" 
                      className="btn btn--outline btn--case-discuss"
                      style={{ color: 'var(--ink)' }}
                    >
                      Discuss Similar Project <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM INVITATION BANNER */}
          <div className="case-bottom-cta-banner">
            <div className="case-bottom-cta-content">
              <span className="case-bottom-cta-pill">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Enterprise SLA Guarantee</span>
              </span>
              <h3>Need a Defensible Compliance or High-Volume Conversion Partner?</h3>
              <p>
                From strict university ADA Title II / WCAG 2.2 deadlines to high-volume European Accessibility Act (EAA) publisher conversions, Velvora delivers certified engineering precision with zero compromise.
              </p>
            </div>
            <div className="case-bottom-cta-btn-wrap">
              <Link to="/contact" className="btn btn--orange btn--lg">
                Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
