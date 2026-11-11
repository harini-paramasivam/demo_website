import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  Megaphone, 
  FileCheck2, 
  Code, 
  GraduationCap, 
  Clock, 
  MapPin, 
  Award, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Phone, 
  Mail, 
  Briefcase, 
  Laptop, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { 
  getTrainingProgramBySlug, 
  getRelatedTrainingPrograms 
} from '../data/trainingData.js';
import TrainingEnrollmentForm from '../components/TrainingEnrollmentForm.jsx';

// Icon resolver helper
function ProgramIcon({ name, size = 24, className = '' }) {
  switch (name) {
    case 'BookOpen': return <BookOpen size={size} className={className} />;
    case 'Cpu': return <Cpu size={size} className={className} />;
    case 'Sparkles': return <Sparkles size={size} className={className} />;
    case 'BarChart3': return <BarChart3 size={size} className={className} />;
    case 'Megaphone': return <Megaphone size={size} className={className} />;
    case 'FileCheck2': return <FileCheck2 size={size} className={className} />;
    case 'Code': return <Code size={size} className={className} />;
    case 'GraduationCap': return <GraduationCap size={size} className={className} />;
    default: return <GraduationCap size={size} className={className} />;
  }
}

export default function TrainingProgramPage() {
  const { slug } = useParams();
  const program = getTrainingProgramBySlug(slug);

  const [openModuleIdx, setOpenModuleIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const formSectionRef = useRef(null);

  // Scroll to top on slug change & set SEO title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (program) {
      document.title = `${program.title} | Velvora Solutions Academy`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', program.lead);
      }
    }
  }, [slug, program]);

  if (!program) {
    return <Navigate to="/training" replace />;
  }

  const related = getRelatedTrainingPrograms(program.id, 3);

  const scrollToEnrollForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="training-program-page">
      {/* -------------------------------------------------------------------
          1. HERO HEADER WITH BREADCRUMBS & CYBERNETIC BADGES
      --------------------------------------------------------------------- */}
      <section className="tp-hero">
        <div className="tp-hero-glow" aria-hidden="true" />
        <div className="container tp-hero-container">
          {/* Breadcrumb Navigation */}
          <nav className="tp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/training" className="tp-crumb-link">
              <ArrowLeft size={14} />
              <span>All Training Programs</span>
            </Link>
            <span className="tp-crumb-sep">/</span>
            <span className="tp-crumb-current">{program.title}</span>
          </nav>

          <div className="tp-hero-grid">
            {/* Left Main Hero Info */}
            <div className="tp-hero-content">
              <div className="tp-eyebrow-row">
                <span className="tp-category-pill">
                  <ProgramIcon name={program.icon} size={15} />
                  <span>{program.tag}</span>
                </span>
                <span className="tp-status-pill">
                  <Sparkles size={13} />
                  <span>{program.badge}</span>
                </span>
              </div>

              <h1 className="tp-hero-title">
                {program.title}
              </h1>

              <p className="tp-hero-lead">
                {program.lead}
              </p>

              <p className="tp-hero-extended">
                {program.heroDescription}
              </p>

              {/* Fast Action Buttons */}
              <div className="tp-hero-btn-row">
                <button
                  type="button"
                  onClick={scrollToEnrollForm}
                  className="btn btn--cyan btn--lg tp-hero-apply-btn"
                >
                  <span>Enroll or Request Syllabus</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <a
                  href="https://wa.me/919500834236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary tp-hero-wa-btn"
                >
                  <Phone size={16} />
                  <span>Chat with Academic Counselor</span>
                </a>
              </div>
            </div>

            {/* Right Quick Telemetry Spec Card */}
            <div className="tp-hero-spec-col">
              <div className="tp-spec-card">
                <div className="tp-spec-card-header">
                  <div className="tp-spec-icon-box">
                    <ProgramIcon name={program.icon} size={28} />
                  </div>
                  <div>
                    <span className="tp-spec-k">Program Track</span>
                    <h3 className="tp-spec-v">{program.tag}</h3>
                  </div>
                </div>

                <div className="tp-spec-divider" />

                <ul className="tp-spec-list">
                  <li className="tp-spec-item">
                    <Clock size={16} className="tp-spec-bullet" />
                    <div>
                      <span className="tp-spec-item-k">Duration</span>
                      <span className="tp-spec-item-v">{program.duration}</span>
                    </div>
                  </li>
                  <li className="tp-spec-item">
                    <Award size={16} className="tp-spec-bullet" />
                    <div>
                      <span className="tp-spec-item-k">Skill Level</span>
                      <span className="tp-spec-item-v">{program.level}</span>
                    </div>
                  </li>
                  <li className="tp-spec-item">
                    <Laptop size={16} className="tp-spec-bullet" />
                    <div>
                      <span className="tp-spec-item-k">Delivery Mode</span>
                      <span className="tp-spec-item-v">{program.mode}</span>
                    </div>
                  </li>
                  <li className="tp-spec-item">
                    <ShieldCheck size={16} className="tp-spec-bullet" />
                    <div>
                      <span className="tp-spec-item-k">Live Project Work</span>
                      <span className="tp-spec-item-v">100% Guaranteed Production Assets</span>
                    </div>
                  </li>
                  <li className="tp-spec-item">
                    <Briefcase size={16} className="tp-spec-bullet" />
                    <div>
                      <span className="tp-spec-item-k">Career Pathway</span>
                      <span className="tp-spec-item-v">Pre-Placement Offers (PPO) & Hiring</span>
                    </div>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={scrollToEnrollForm}
                  className="btn btn--cyan btn--block tp-spec-card-action"
                >
                  <span>Apply for this Track</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          2. CORE HIGHLIGHTS & WHY VELVORA
      --------------------------------------------------------------------- */}
      <section className="tp-why-section">
        <div className="container">
          <div className="tp-why-grid">
            <div className="tp-why-box">
              <div className="tp-why-icon-wrap">
                <Target size={24} />
              </div>
              <h3>Why Choose This Program at Velvora?</h3>
              <p>{program.whyChoose}</p>
              <div className="tp-why-points">
                <div className="tp-point-row">
                  <CheckCircle2 size={16} className="tp-point-check" />
                  <span>Direct mentorship from senior practicing tech leads & architects</span>
                </div>
                <div className="tp-point-row">
                  <CheckCircle2 size={16} className="tp-point-check" />
                  <span>Hands-on work on live enterprise codebases and client deliverables</span>
                </div>
                <div className="tp-point-row">
                  <CheckCircle2 size={16} className="tp-point-check" />
                  <span>100% verifiable digital credentials with QR validation</span>
                </div>
              </div>
            </div>

            <div className="tp-audience-box">
              <div className="tp-why-icon-wrap tp-why-icon-wrap--azure">
                <Users size={24} />
              </div>
              <h3>Who This Track Is Built For</h3>
              <p>{program.targetAudience}</p>
              <div className="tp-prereq-badge">
                <Sparkles size={14} />
                <span><strong>Prerequisites:</strong> {program.prerequisites}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          3. COMPREHENSIVE CURRICULUM SYLLABUS ACCORDION
      --------------------------------------------------------------------- */}
      <section className="tp-curriculum-section">
        <div className="container">
          <div className="tp-section-header">
            <span className="tp-section-eyebrow">
              <Layers size={14} />
              <span>Step-by-Step Syllabus</span>
            </span>
            <h2 className="tp-section-title">In-Depth Curriculum & Learning Modules</h2>
            <p className="tp-section-desc">
              Every module is designed to transition you from foundational concepts to production-grade implementation.
            </p>
          </div>

          <div className="tp-modules-list">
            {program.modules && program.modules.map((m, idx) => {
              const isOpen = openModuleIdx === idx;
              return (
                <div key={m.moduleNumber} className={`tp-module-card ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="tp-module-header"
                    onClick={() => setOpenModuleIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="tp-mod-left">
                      <span className="tp-mod-num">{m.moduleNumber}</span>
                      <div className="tp-mod-title-wrap">
                        <span className="tp-mod-duration">{m.duration}</span>
                        <h3 className="tp-mod-title">{m.title}</h3>
                      </div>
                    </div>
                    <div className="tp-mod-right">
                      <span className="tp-mod-toggle-label">{isOpen ? 'Collapse' : 'Explore'}</span>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="tp-module-body">
                      <p className="tp-mod-overview">{m.overview}</p>
                      <div className="tp-mod-topics-wrap">
                        <span className="tp-mod-topics-lbl">Lessons & Hands-On Topics Covered:</span>
                        <ul className="tp-mod-topics-list">
                          {m.topics.map((t, i) => (
                            <li key={i}>
                              <CheckCircle2 size={16} className="tp-topic-icon" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          4. LIVE PRODUCTION CAPSTONE PROJECT
      --------------------------------------------------------------------- */}
      {program.liveProject && (
        <section className="tp-project-section">
          <div className="container">
            <div className="tp-project-card">
              <div className="tp-project-header">
                <span className="tp-project-pill">
                  <Terminal size={14} />
                  <span>Live Industry Capstone Experience</span>
                </span>
                <h2 className="tp-project-title">{program.liveProject.title}</h2>
                <p className="tp-project-scope">{program.liveProject.scope}</p>
              </div>

              <div className="tp-project-grid">
                <div className="tp-project-deliverables">
                  <h4>Key Portfolio Deliverables You Build:</h4>
                  <ul>
                    {program.liveProject.deliverables.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="tp-deliv-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tp-project-eval">
                  <h4>Mentor Review & Evaluation:</h4>
                  <p>{program.liveProject.evaluation}</p>
                  <div className="tp-cert-highlight">
                    <Award size={20} className="tp-cert-icon" />
                    <div>
                      <strong>Verified Credential:</strong>
                      <span>{program.certification}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          5. TOOLS & FRAMEWORKS MASTERED
      --------------------------------------------------------------------- */}
      <section className="tp-tools-section">
        <div className="container">
          <div className="tp-section-header">
            <span className="tp-section-eyebrow">
              <Zap size={14} />
              <span>Production Stack</span>
            </span>
            <h2 className="tp-section-title">Tools & Technologies Mastered</h2>
            <p className="tp-section-desc">
              Work with the exact enterprise software, IDEs, and validation tools employed by global tech leaders.
            </p>
          </div>

          <div className="tp-tools-grid">
            {program.toolsLearned.map((tool) => (
              <div key={tool} className="tp-tool-card">
                <div className="tp-tool-bullet" />
                <span className="tp-tool-name">{tool}</span>
              </div>
            ))}
          </div>

          {/* Career Roles Prepared For */}
          <div className="tp-roles-banner">
            <Briefcase size={22} className="tp-roles-icon" />
            <div>
              <strong>Target Career Roles for Graduates:</strong>
              <p>{program.careerRoles.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          6. DIRECT ENROLLMENT & SYLLABUS REQUEST FORM
      --------------------------------------------------------------------- */}
      <section ref={formSectionRef} className="tp-form-section">
        <div className="container">
          <div className="tp-section-header">
            <span className="tp-section-eyebrow">
              <Sparkles size={14} />
              <span>Admissions Desk</span>
            </span>
            <h2 className="tp-section-title">Enroll in {program.title}</h2>
            <p className="tp-section-desc">
              Reserve your seat or request the complete week-by-week curriculum PDF. Our academic team responds within 24 hours.
            </p>
          </div>

          <TrainingEnrollmentForm initialProgram={program.title} />
        </div>
      </section>

      {/* -------------------------------------------------------------------
          7. PROGRAM-SPECIFIC FAQS
      --------------------------------------------------------------------- */}
      {program.programFaqs && program.programFaqs.length > 0 && (
        <section className="tp-faq-section">
          <div className="container">
            <div className="tp-section-header">
              <span className="tp-section-eyebrow">
                <HelpCircle size={14} />
                <span>Common Questions</span>
              </span>
              <h2 className="tp-section-title">Frequently Asked Questions</h2>
            </div>

            <div className="tp-faq-list">
              {program.programFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className={`tp-faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="tp-faq-q"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="tp-faq-chev" />
                    </button>
                    {isOpen && (
                      <div className="tp-faq-a">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          8. EXPLORE RELATED TRAINING TRACKS
      --------------------------------------------------------------------- */}
      <section className="tp-related-section">
        <div className="container">
          <div className="tp-section-header">
            <span className="tp-section-eyebrow">
              <Award size={14} />
              <span>Expand Your Skillset</span>
            </span>
            <h2 className="tp-section-title">Explore Related Training Tracks</h2>
          </div>

          <div className="tp-related-grid">
            {related.map((rel) => (
              <Link key={rel.id} to={`/training/${rel.id}`} className="tp-related-card">
                <div className="tp-rel-header">
                  <div className="tp-rel-icon">
                    <ProgramIcon name={rel.icon} size={20} />
                  </div>
                  <span className="tp-rel-tag">{rel.tag}</span>
                </div>
                <h3 className="tp-rel-title">{rel.title}</h3>
                <p className="tp-rel-lead">{rel.lead}</p>
                <div className="tp-rel-footer">
                  <span className="tp-rel-duration"><Clock size={13} /> {rel.duration}</span>
                  <span className="tp-rel-action">View Program <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
