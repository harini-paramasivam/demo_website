import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Clock, 
  Building2, 
  Check, 
  Sparkles, 
  Quote, 
  Star, 
  AlertCircle,
  Cpu,
  Layers,
  FileCheck,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { PageHero } from '../components/ui.jsx';
import { getCaseStudyBySlug, getAllCaseStudies } from '../data/caseStudiesData.js';
import { company } from '../data/site.js';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();

  const caseStudy = getCaseStudyBySlug(slug);
  const allCaseStudies = getAllCaseStudies();

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!caseStudy) {
    return (
      <>
        <PageHero
          eyebrow="Case Studies"
          title="Case Study Not Found"
          crumbs={['Home', 'Case Studies', 'Not Found']}
        >
          The case study you are looking for does not exist or may have been relocated.
        </PageHero>
        <section className="section section--paper">
          <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <AlertCircle size={48} style={{ color: 'var(--orange)', marginBottom: '16px' }} />
            <h2 style={{ marginBottom: '12px', color: 'var(--navy)' }}>Case Study Not Found</h2>
            <p style={{ maxWidth: '500px', margin: '0 auto 24px auto', color: '#64748b' }}>
              Please review our full library of enterprise case studies to explore our work in WCAG accessibility, ePublishing transformation, and scholarly XML workflows.
            </p>
            <Link to="/case-studies" className="btn btn--orange">
              <ArrowLeft size={16} /> Return to All Case Studies
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Filter other case studies for the next/related section
  const otherCaseStudies = allCaseStudies.filter(
    (cs) => cs.slug.toLowerCase() !== caseStudy.slug.toLowerCase()
  );

  return (
    <>
      <PageHero
        eyebrow={caseStudy.categoryLabel || caseStudy.category}
        title={caseStudy.title}
        crumbs={['Home', 'Case Studies', caseStudy.shortTitle || caseStudy.title]}
      >
        {caseStudy.subtitle}
      </PageHero>

      {/* TOP KPI IMPACT STRIP */}
      <section className="case-detail-kpi-ribbon">
        <div className="container">
          <div className="case-detail-kpi-grid">
            {caseStudy.heroStats.map((stat, idx) => (
              <div key={idx} className="case-detail-kpi-pod">
                <span className="case-detail-kpi-num">{stat.value}</span>
                <span className="case-detail-kpi-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <section className="section section--paper case-detail-body-section">
        <div className="container">
          {/* BACK LINK */}
          <div className="case-detail-back-bar">
            <Link to="/case-studies" className="case-detail-back-link">
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Back to All Case Studies</span>
            </Link>
          </div>

          {/* ============================================================
              ROW 1: EXECUTIVE SUMMARY (LEFT) + PROJECT METADATA & STANDARDS (RIGHT)
              BALANCED 2-COLUMN SPLIT
              ============================================================ */}
          <div className="case-detail-row-grid case-detail-row-grid--split">
            {/* LEFT: SUMMARY & TAKEAWAYS */}
            <div className="case-detail-card case-summary-pod">
              <div className="case-detail-card-head">
                <span className="case-detail-section-tag">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Executive Summary</span>
                </span>
                <h2 className="case-detail-card-title">Project Context &amp; Objective</h2>
              </div>
              <p className="case-detail-summary-lead">
                {caseStudy.summary}
              </p>

              {caseStudy.keyTakeaways && (
                <div className="case-takeaways-box">
                  <h4 className="case-takeaways-title">Key Strategic Takeaways:</h4>
                  <ul className="case-takeaways-list">
                    {caseStudy.keyTakeaways.map((item, tIdx) => (
                      <li key={tIdx}>
                        <CheckCircle2 size={18} className="case-check-icon" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT: METADATA & STANDARDS BADGES */}
            <div className="case-detail-card case-meta-pod">
              <div className="case-detail-card-head">
                <span className="case-detail-section-tag case-detail-section-tag--cyan">
                  <Building2 size={14} aria-hidden="true" />
                  <span>Project Profile</span>
                </span>
                <h3 className="case-detail-card-title" style={{ fontSize: '1.35rem' }}>
                  Metadata &amp; Conformance
                </h3>
              </div>

              <div className="case-meta-spec-grid">
                <div className="case-meta-spec-item">
                  <span className="case-meta-spec-label">Industry Sector</span>
                  <strong className="case-meta-spec-val">{caseStudy.industry}</strong>
                </div>
                <div className="case-meta-spec-item">
                  <span className="case-meta-spec-label">Client Type</span>
                  <strong className="case-meta-spec-val">{caseStudy.clientType}</strong>
                </div>
                <div className="case-meta-spec-item">
                  <span className="case-meta-spec-label">Delivery Timeline</span>
                  <strong className="case-meta-spec-val">{caseStudy.timeline}</strong>
                </div>
                <div className="case-meta-spec-item">
                  <span className="case-meta-spec-label">Primary Engagement</span>
                  <strong className="case-meta-spec-val">{caseStudy.category}</strong>
                </div>
              </div>

              <div className="case-meta-standards-block">
                <h5 className="case-meta-standards-heading">
                  <ShieldCheck size={16} className="text-cyan" aria-hidden="true" />
                  Standards &amp; Regulatory Frameworks:
                </h5>
                <div className="case-meta-standards-tags">
                  {caseStudy.standardsComplied.map((std, sIdx) => (
                    <span key={sIdx} className="case-standard-badge">
                      <Check size={12} aria-hidden="true" />
                      <span>{std}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              ROW 2: THE CHALLENGE (LEFT) + OPERATIONAL PAIN POINTS (RIGHT)
              BALANCED 2-COLUMN SPLIT
              ============================================================ */}
          <div className="case-detail-row-grid case-detail-row-grid--challenge">
            {/* LEFT: CHALLENGE CONTEXT */}
            <div className="case-detail-card case-challenge-narrative-pod">
              <div className="case-detail-card-head">
                <span className="case-detail-section-tag case-detail-section-tag--purple">
                  <AlertCircle size={14} aria-hidden="true" />
                  <span>The Challenge</span>
                </span>
                <h2 className="case-detail-card-title">{caseStudy.challenge.headline}</h2>
              </div>
              <p className="case-detail-body-p">
                {caseStudy.challenge.overview}
              </p>

              <div className="case-risk-callout">
                <div className="case-risk-callout-icon">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <div className="case-risk-callout-body">
                  <strong>Regulatory &amp; Brand Exposure:</strong>
                  <p>
                    Non-compliance with statutory mandates exposes organizations to costly legal actions, commercial distributor delistings, and severe accessibility barriers for end-users.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: PAIN POINTS MATRIX */}
            <div className="case-detail-card case-painpoints-pod">
              <div className="case-detail-card-head">
                <span className="case-detail-section-tag case-detail-section-tag--purple">
                  <Layers size={14} aria-hidden="true" />
                  <span>Audit Findings</span>
                </span>
                <h3 className="case-detail-card-title" style={{ fontSize: '1.35rem' }}>
                  Identified Operational Pain Points
                </h3>
              </div>

              <div className="case-painpoints-list">
                {caseStudy.challenge.painPoints.map((pt, pIdx) => (
                  <div key={pIdx} className="case-painpoint-item">
                    <span className="case-painpoint-num">0{pIdx + 1}</span>
                    <p>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================
              ROW 3: THE SOLUTION & 4-PHASE DELIVERY ARCHITECTURE
              FULL-WIDTH 2x2 PHASE CARDS GRID
              ============================================================ */}
          <div className="case-detail-card case-solution-full-card">
            <div className="case-detail-card-head">
              <span className="case-detail-section-tag case-detail-section-tag--cyan">
                <Cpu size={14} aria-hidden="true" />
                <span>Velvora Engineering Architecture</span>
              </span>
              <h2 className="case-detail-card-title">{caseStudy.solution.headline}</h2>
              <p className="case-detail-body-p" style={{ marginTop: '0.85rem', marginBottom: '1.75rem' }}>
                {caseStudy.solution.overview}
              </p>
            </div>

            <div className="case-phases-grid-2x2">
              {caseStudy.solution.phases.map((ph, phIdx) => (
                <div key={phIdx} className="case-phase-grid-card">
                  <div className="case-phase-grid-header">
                    <span className="case-phase-badge">{ph.phase}</span>
                    <h4 className="case-phase-name">{ph.name}</h4>
                  </div>
                  <p className="case-phase-desc">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              ROW 4: MEASURABLE RESULTS & QUANTIFIED OUTCOMES
              FULL-WIDTH 4-METRIC GRID
              ============================================================ */}
          <div className="case-detail-card case-results-full-card">
            <div className="case-detail-card-head" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.25rem' }}>
              <span className="case-detail-section-tag case-detail-section-tag--green">
                <Award size={14} aria-hidden="true" />
                <span>Measurable Outcomes</span>
              </span>
              <h2 className="case-detail-card-title">{caseStudy.results.headline}</h2>
            </div>

            <div className="case-results-metric-grid-4">
              {caseStudy.results.metrics.map((m, mIdx) => (
                <div key={mIdx} className="case-result-metric-card-wide">
                  <span className="case-result-metric-stat">{m.stat}</span>
                  <h4 className="case-result-metric-title">{m.title}</h4>
                  <p className="case-result-metric-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              ROW 5: CLIENT TESTIMONIAL (LEFT) + TOOLING & QA STACK (RIGHT)
              BALANCED 2-COLUMN SPLIT
              ============================================================ */}
          <div className="case-detail-row-grid case-detail-row-grid--endorsement">
            {/* LEFT: TESTIMONIAL */}
            <div className="case-detail-testimonial-card">
              <Quote size={32} className="case-testimonial-quote-icon" aria-hidden="true" />
              <p className="case-testimonial-quote">
                “{caseStudy.testimonial.quote}”
              </p>
              <div className="case-testimonial-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} fill="#f59e0b" color="#f59e0b" aria-hidden="true" />
                ))}
              </div>
              <div className="case-testimonial-author-block">
                <strong>{caseStudy.testimonial.author}</strong>
                <span>{caseStudy.testimonial.role}</span>
                <span className="case-testimonial-org">{caseStudy.testimonial.organization}</span>
              </div>
            </div>

            {/* RIGHT: TECH TOOLING & QA PLATFORMS */}
            <div className="case-detail-card case-tools-pod">
              <div className="case-detail-card-head">
                <span className="case-detail-section-tag case-detail-section-tag--cyan">
                  <FileCheck size={14} aria-hidden="true" />
                  <span>Technical Tooling &amp; QA</span>
                </span>
                <h3 className="case-detail-card-title" style={{ fontSize: '1.35rem' }}>
                  Verified Verification Suite
                </h3>
              </div>
              <p className="case-tools-desc">
                Every file and dataset is processed and validated using enterprise-grade industry parsers, assistive screen readers, and programmatic QA checkers:
              </p>

              <div className="case-tools-grid">
                {(caseStudy.techStack || [
                  'Automated Structural Pre-flight Checker',
                  'High-Density Screen Reader Validation',
                  'Semantic HTML5 / MathML Engine',
                  'VPAT 2.4 Accessibility Conformance'
                ]).map((tool, tIdx) => (
                  <div key={tIdx} className="case-tool-chip">
                    <CheckCircle size={14} className="text-cyan" aria-hidden="true" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>

              <div className="case-tools-cta-row">
                <Link to="/contact" className="btn btn--orange btn--sm">
                  Discuss Technical Scope <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <a href={`mailto:${company.email}`} className="case-tools-email-link">
                  <Mail size={14} aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================
              ROW 6: ENTERPRISE CTA BANNER (FULL WIDTH)
              ============================================================ */}
          <div className="case-bottom-cta-banner">
            <div className="case-bottom-cta-content">
              <span className="case-bottom-cta-pill">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Enterprise SLA Guarantee</span>
              </span>
              <h3>Ready to Achieve Similar Results for Your Organization?</h3>
              <p>
                From strict university ADA Title II / WCAG 2.2 deadlines to high-volume European Accessibility Act (EAA) publisher conversions, Velvora delivers certified engineering precision with zero compromise.
              </p>
            </div>
            <div className="case-bottom-cta-btn-wrap">
              <Link to="/contact" className="btn btn--orange btn--lg">
                Schedule a Technical Consultation <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ============================================================
              ROW 7: EXPLORE OTHER CASE STUDIES (2-COLUMN CARDS)
              ============================================================ */}
          <div className="case-related-nav-block">
            <h3 className="case-related-heading">Explore Other Featured Engagements</h3>
            <div className="case-related-grid">
              {otherCaseStudies.map((other) => (
                <Link 
                  key={other.slug} 
                  to={`/case-studies/${other.slug}`} 
                  className="case-related-card"
                >
                  <span className="case-related-tag">{other.category}</span>
                  <h4 className="case-related-title">{other.shortTitle || other.title}</h4>
                  <p className="case-related-snippet">{other.summary}</p>
                  <span className="case-related-cta">
                    Read Case Study <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
