import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, ShieldCheck, FileCheck } from 'lucide-react';

export default function CaseStudySpotlight() {
  return (
    <section className="section section--case-teaser netbg" aria-labelledby="case-study-title">
      <div className="container">
        <div className="case-spotlight-card reveal">
          <div className="case-spotlight-glow" />

          <div className="case-spotlight-body">
            <div className="case-spotlight-eyebrow">
              <Award size={16} />
              <span>FEATURED SUCCESS STORY · PUBLISHING CASE STUDY</span>
            </div>

            <h2 id="case-study-title" className="case-spotlight-title">
              Making a 5,000-Title EPUB Library Accessible
            </h2>

            <p className="case-spotlight-lead">
              A leading publisher needed its back-catalogue to meet EPUB Accessibility 1.1 ahead of a regulatory deadline.
            </p>

            <div className="case-metrics-strip">
              <div className="case-metric">
                <b>5,000+</b>
                <span>EPUB 3 Converted</span>
              </div>
              <div className="case-metric">
                <b>99.8%</b>
                <span>Validation Rate</span>
              </div>
              <div className="case-metric">
                <b>3 Weeks</b>
                <span>Ahead of Deadline</span>
              </div>
            </div>

            <div className="case-spotlight-actions">
              <Link to="/resources/case-studies" className="btn btn--orange btn--lg">
                Read the Case Study <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn--outline btn--lg">
                Discuss Your Back-Catalogue <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="case-spotlight-side">
            <div className="case-badge-glass">
              <ShieldCheck size={36} className="case-badge-glass__icon" />
              <strong>EPUB Accessibility 1.1</strong>
              <p>WCAG 2.2 Level AA &amp; Ace by DAISY Verified</p>
              <ul className="case-badge-list">
                <li><CheckCircle2 size={15} /> Semantic XHTML structure</li>
                <li><CheckCircle2 size={15} /> Comprehensive Alt Text</li>
                <li><CheckCircle2 size={15} /> Embedded Schema Metadata</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
