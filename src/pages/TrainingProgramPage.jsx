import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Phone, 
  Mail, 
  Award,
  Layers,
  Laptop,
  Briefcase,
  FileCheck2,
  Calendar,
  Check,
  Building2,
  GraduationCap
} from 'lucide-react';
import { 
  getTrainingProgramBySlug, 
  getRelatedTrainingPrograms,
  trainingPrograms 
} from '../data/trainingData.js';
import Icon from '../components/Icon.jsx';
import { PageHero, CtaBand } from '../components/ui.jsx';
import TrainingEnrollmentForm from '../components/TrainingEnrollmentForm.jsx';

function FaqAccordion({ items = [] }) {
  const [openIdx, setOpenIdx] = useState(0); // 1st Q&A opened by default!

  return (
    <div className="faq-list" style={{ marginTop: '1.25rem' }}>
      {items.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={faq.q || idx} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s ease',
                  flexShrink: 0,
                }}
              />
            </button>
            {isOpen && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ModuleAccordion({ module, idx, isOpenDefault = false }) {
  const [open, setOpen] = useState(isOpenDefault);
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`} style={{ marginBottom: '14px' }}>
      <button
        type="button"
        className="faq-question"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
          <span
            className="pill"
            style={{
              padding: '4px 12px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: 'rgba(56, 189, 248, 0.12)',
              color: '#0284c7',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}
          >
            Module {module.moduleNumber || idx + 1}
          </span>
          <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{module.title}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap' }}>{module.duration}</span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}
          />
        </div>
      </button>
      {open && (
        <div className="faq-answer" style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <ul className="bullets" style={{ margin: 0 }}>
            {module.topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TrainingProgramPage() {
  const { slug } = useParams();
  const program = getTrainingProgramBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (program) {
      document.title = `${program.title} | Velvora Solutions Academy`;
    }
  }, [slug, program]);

  if (!program) {
    return <Navigate to="/training" replace />;
  }

  const otherPrograms = trainingPrograms.filter((p) => p.id !== program.id);

  return (
    <>
      <PageHero
        eyebrow="Training & Internships"
        title={program.title}
        crumbs={['Home', 'Training', program.title]}
      >
        {program.lead}
      </PageHero>

      <section className="section">
        <div className="container svc-layout">
          {/* MAIN COLUMN */}
          <div className="svc-main">
            {/* MODERN GLASS HEADER */}
            <div className="svc-header svc-header--glass">
              <div className="svc-header__bg-art" aria-hidden="true" />

              {/* Top Bar with Icon & Track Tag */}
              <div className="svc-header__top-bar">
                <div className="svc-header__icon-pill">
                  <span className="svc-header__icon-bubble">
                    <Icon name={program.icon || 'GraduationCap'} size={20} />
                  </span>
                  <span className="svc-header__tag-text">{program.title} Professional Track</span>
                </div>
                <div className="svc-header__badge-pill">
                  <Sparkles size={14} className="accent" aria-hidden="true" />
                  <span>Velvora Certified Academy Standard</span>
                </div>
              </div>

              {/* Main Headline */}
              <h2 className="svc-header__title">
                Master {program.title} with 100% Live Production Projects
              </h2>

              {/* Rich Lead Description */}
              <p className="svc-header__lead">
                {program.heroDescription || program.lead}
              </p>

              {/* Key Highlights Chips */}
              <div className="svc-header__features">
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>100% Live Client Projects</span>
                </div>
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>1-on-1 Architect Mentorship</span>
                </div>
                <div className="svc-feature-chip">
                  <CheckCircle2 size={15} className="svc-chip-icon" aria-hidden="true" />
                  <span>Official Certificate &amp; PPO Pathway</span>
                </div>
              </div>
            </div>

            {/* VALUE PROPOSITION CALLOUT (White inner card with crisp dark text, Blue outside container) */}
            <div className="training-value-outer-blue" style={{ margin: '2.5rem 0', borderRadius: '24px', padding: '22px', background: 'linear-gradient(145deg, #0a173b 0%, #060e24 100%)', border: '1.5px solid rgba(56, 189, 248, 0.35)', boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.1)' }}>
              <div className="training-value-inner-white" style={{ background: '#ffffff', borderRadius: '16px', padding: '26px 30px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0a1630', fontSize: '1.32rem', fontWeight: 800, marginBottom: '12px' }}>
                  <CheckCircle2 size={22} style={{ color: '#0284c7', flexShrink: 0 }} aria-hidden="true" />
                  Why Learn {program.title} at Velvora Academy?
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.02rem', lineHeight: 1.75 }}>
                  {program.whyChoose}
                </p>
              </div>
            </div>

            {/* INTERNSHIP SPECIAL SPECIFICATIONS (2:2 Grid on Desktop) */}
            {program.internshipSpecs && (
              <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                <h3 className="section-subtitle">Flagship Internship Specifications</h3>
                <div className="internship-highlights-2x2">
                  <div className="svc-offer-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '6px' }}>
                      <Users size={18} />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>Target Audience</strong>
                    </div>
                    <p>{program.internshipSpecs.whoItsFor}</p>
                  </div>

                  <div className="svc-offer-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '6px' }}>
                      <CheckCircle2 size={18} />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>Eligibility Criteria</strong>
                    </div>
                    <p>{program.internshipSpecs.eligibility}</p>
                  </div>

                  <div className="svc-offer-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '6px' }}>
                      <Clock size={18} />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>Flexible Duration</strong>
                    </div>
                    <p>{program.internshipSpecs.duration}</p>
                  </div>

                  <div className="svc-offer-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '6px' }}>
                      <Laptop size={18} />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>Live Project Exposure</strong>
                    </div>
                    <p>{program.internshipSpecs.liveProjectExposure}</p>
                  </div>
                </div>

                <div className="callout-card" style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--ink)' }}>Key Internship Perks &amp; Career Benefits:</h4>
                  <ul className="bullets">
                    {program.internshipSpecs.perks.map((perk, i) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* COMPLETE CURRICULUM MODULES */}
            {program.curriculum && program.curriculum.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 className="section-subtitle">
                  Complete Curriculum &amp; Syllabus ({program.curriculum.length} Modules)
                </h3>
                <p className="lead" style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                  Comprehensive module-by-module breakdown designed to take you from foundational concepts to enterprise execution.
                </p>
                <div className="faq-list">
                  {program.curriculum.map((mod, idx) => (
                    <ModuleAccordion
                      key={mod.moduleNumber || idx}
                      module={mod}
                      idx={idx}
                      isOpenDefault={idx === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* LIVE CAPSTONE PROJECTS & DELIVERABLES */}
            {program.projects && program.projects.length > 0 && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">
                  Live Capstone Projects &amp; Deliverables
                </h3>
                <p className="lead" style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                  Every student and intern completes real production assets that form a verifiable portfolio for employment.
                </p>
                <div className="svc-offers-grid">
                  {program.projects.map((proj, idx) => (
                    <div key={idx} className="svc-offer-card">
                      <span className="pill" style={{ marginBottom: '8px', fontSize: '0.78rem' }}>
                        Project 0{idx + 1}
                      </span>
                      <h4 style={{ fontSize: '1.1rem', margin: '4px 0 8px' }}>{proj.title}</h4>
                      <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TOOLS & FRAMEWORKS MASTERED */}
            {program.tools && program.tools.length > 0 && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Tools, Technologies &amp; Standards Mastered</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1rem' }}>
                  {program.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="pill"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        background: 'rgba(56, 189, 248, 0.08)',
                        color: '#0284c7',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '9999px'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FREQUENTLY ASKED QUESTIONS */}
            {(program.programFaqs || program.faqs) && (program.programFaqs || program.faqs).length > 0 && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 className="section-subtitle">Frequently Asked Questions</h3>
                <FaqAccordion items={program.programFaqs || program.faqs} />
              </div>
            )}

            {/* EMBEDDED ENROLLMENT APPLICATION FORM */}
            <div style={{ marginTop: '4.5rem' }}>
              <TrainingEnrollmentForm initialProgram={program.title} />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="svc-sidebar">
            {/* PROGRAM QUICK SPECS CARD */}
            <div className="svc-sidebar__card">
              <h3>Program Overview</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Duration</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{program.duration}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Users size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Audience Level</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{program.level}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Laptop size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Learning Mode</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{program.mode}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Briefcase size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Production Projects</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{program.liveProjects}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Award size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Credential</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{program.credential}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Training Centers</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Cuddalore HQ &amp; Chennai Branch + Virtual</p>
                  </div>
                </div>
              </div>

              <a
                href="#enrollment-form-section"
                className="btn btn--cyan btn--block"
                style={{ textAlign: 'center' }}
              >
                <span>Enroll in This Track</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* OTHER TRAINING PROGRAMS LIST */}
            <div className="svc-sidebar__card">
              <h3>Other Training Tracks</h3>
              <ul className="svc-sidebar__list">
                {otherPrograms.map((op) => (
                  <li key={op.id}>
                    <Link to={`/training/${op.id}`}>
                      <Icon name={op.icon || 'GraduationCap'} size={16} />
                      <span>{op.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ADMISSIONS DESK QUICK CONTACT CARD */}
            <div className="svc-sidebar__cta gradient-cta">
              <h4>Questions About Admissions?</h4>
              <p>
                Speak directly with an academic counselor to discuss batch schedules, syllabus details, or corporate cohort arrangements.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="tel:+919500834236"
                  className="btn btn--cyan btn--block"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Phone size={16} />
                  <span>Call +91 95008 34236</span>
                </a>
                <a
                  href="https://wa.me/919500834236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--block"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Ready to Master ${program.title}?`}
        lead="Join Velvora's professional training track with real-world industry projects, 1-on-1 mentorship, and recognized certification."
        btnText="Apply for Enrollment"
        btnLink="#enrollment-form-section"
      />
    </>
  );
}
