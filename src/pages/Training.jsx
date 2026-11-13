import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Award, 
  Users, 
  ChevronDown, 
  Phone, 
  Mail, 
  Briefcase,
  HelpCircle,
  Laptop,
  GraduationCap
} from 'lucide-react';
import { 
  trainingHero, 
  trainingCategories, 
  trainingPrograms, 
  learningRoadmap, 
  trainingFaqs 
} from '../data/trainingData.js';
import Icon from '../components/Icon.jsx';
import { PageHero, CtaBand } from '../components/ui.jsx';
import TrainingEnrollmentForm from '../components/TrainingEnrollmentForm.jsx';

function FaqAccordion({ items = [] }) {
  const [openIdx, setOpenIdx] = useState(0); // 1st Q&A opened by default!

  return (
    <div className="faq-list">
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

export default function Training() {
  const [activeCategory, setActiveCategory] = useState('all');
  const formSectionRef = useRef(null);
  const catalogSectionRef = useRef(null);

  useEffect(() => {
    document.title = 'Training Programs & Internships | Velvora Solutions Academy';
  }, []);

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCatalog = () => {
    if (catalogSectionRef.current) {
      catalogSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredPrograms = trainingPrograms.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const featuredInternship = trainingPrograms.find((p) => p.id === 'internship-program');

  return (
    <>
      {/* 1. UNIFIED PAGE HERO MATCHING REST OF SITE */}
      <PageHero
        eyebrow="Velvora Academy"
        title="Training Programs & Internships"
        crumbs={['Home', 'Training']}
      >
        Transforming Knowledge into Skills and Skills into Opportunities. Industry-standard training and 100% live client project internships across 8 core technological disciplines. Learn directly from practicing architects and work on actual production assets.
      </PageHero>

      {/* 2. OVERVIEW & IMPACT METRICS */}
      <section className="section section--paper">
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', marginInline: 'auto' }}>
          <span className="badge-eyebrow" style={{ justifyContent: 'center' }}>
            <Sparkles size={16} /> Enterprise-Grade Learning
          </span>
          <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>
            Empowering Students &amp; Professionals with Production Capabilities
          </h2>
          <p className="lead" style={{ marginInline: 'auto', color: '#475569' }}>
            At Velvora Solutions Academy, we bridge the gap between academic curricula and actual commercial requirements. Whether you are aiming for a career in ePublishing, AI/ML, Data Analytics, Digital Accessibility, or Software Development, our tracks provide rigorous hands-on training backed by guaranteed live production exposure.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={scrollToCatalog} className="btn btn--cyan btn--lg">
              <span>Explore 8 Specialized Tracks</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={scrollToForm} className="btn btn--secondary btn--lg">
              <span>Apply for Enrollment</span>
            </button>
          </div>
        </div>

        {/* 4 STATS CARDS */}
        <div className="container" style={{ marginTop: '3.5rem' }}>
          <div className="stats-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {trainingHero.stats.map((s, idx) => (
              <div
                key={idx}
                className="stat-card"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0284c7', lineHeight: 1, marginBottom: '8px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 700 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP INTERNSHIP SPOTLIGHT (2:2 Grid on Desktop & Rich Blue Theme) */}
      {featuredInternship && (
        <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3.5rem' }}>
          <div className="container">
            <div
              className="svc-header--glass internship-spotlight-blue"
              style={{
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 44px)',
                marginBottom: 0,
                background: 'linear-gradient(145deg, #0a173b 0%, #060e24 100%)',
                border: '1.5px solid rgba(56, 189, 248, 0.38)',
                boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.12)'
              }}
            >
              <div className="svc-header__top-bar">
                <div className="svc-header__icon-pill" style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.35)', color: '#38bdf8' }}>
                  <span className="svc-header__icon-bubble" style={{ background: '#38bdf8', color: '#070f26' }}>
                    <GraduationCap size={20} />
                  </span>
                  <span className="svc-header__tag-text" style={{ color: '#e0f2fe' }}>Flagship Student &amp; Fresher Program</span>
                </div>
                <div className="svc-header__badge-pill" style={{ background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}>
                  <Sparkles size={14} className="accent" aria-hidden="true" />
                  <span>Accepting Applications for Next Batch</span>
                </div>
              </div>

              <h2 className="svc-header__title" style={{ marginTop: '0.75rem', color: '#ffffff' }}>
                {featuredInternship.title}
              </h2>

              <p className="svc-header__lead" style={{ color: '#cbd5e1' }}>
                {featuredInternship.lead}
              </p>

              {/* 2:2 Grid Layout for 4 Internship Cards */}
              <div className="internship-highlights-2x2" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="internship-card-blue">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                    <Users size={19} />
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>Who It's For:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    {featuredInternship.internshipSpecs.whoItsFor}
                  </p>
                </div>

                <div className="internship-card-blue">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                    <CheckCircle2 size={19} />
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>Eligibility:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    {featuredInternship.internshipSpecs.eligibility}
                  </p>
                </div>

                <div className="internship-card-blue">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                    <Clock size={19} />
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>Flexible Duration:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    {featuredInternship.internshipSpecs.duration}
                  </p>
                </div>

                <div className="internship-card-blue">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                    <Laptop size={19} />
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>Live Production Projects:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    {featuredInternship.internshipSpecs.liveProjectExposure}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '1.25rem' }}>
                <Link to="/training/internship-program" className="btn btn--cyan">
                  <span>Explore Full Internship Curriculum</span>
                  <ArrowRight size={16} />
                </Link>
                <button type="button" onClick={scrollToForm} className="btn btn--outline" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#ffffff' }}>
                  <span>Quick Apply Online</span>
                </button>
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', marginLeft: 'auto', fontWeight: 500 }}>
                  Locations: Cuddalore HQ · Chennai Branch · Virtual Remote
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. THE 8 SPECIALIZED TRAINING TRACKS */}
      <section ref={catalogSectionRef} id="training-catalog" className="section section--paper" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="eyebrow">Curriculum Directory</p>
            <h2>8 Specialized Industry Training Programs</h2>
            <p className="lead" style={{ marginInline: 'auto', maxWidth: '640px' }}>
              Select a specialized track to view its comprehensive syllabus, hands-on modules, tools covered, and live production capstone deliverables.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {trainingCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`pill ${activeCategory === cat.id ? 'pill--active' : ''}`}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  border: activeCategory === cat.id ? '1.5px solid #0284c7' : '1px solid var(--border)',
                  background: activeCategory === cat.id ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg)',
                  color: activeCategory === cat.id ? '#0284c7' : 'var(--body)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 8 PROGRAMS GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredPrograms.map((p) => (
              <div
                key={p.id}
                className="svc-offer-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  borderRadius: '20px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative'
                }}
              >
                {/* Meta Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#0284c7',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <Icon name={p.icon || 'GraduationCap'} size={22} />
                  </div>
                  <span
                    className="pill"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: 'rgba(56, 189, 248, 0.08)',
                      color: '#0284c7',
                      border: '1px solid rgba(56, 189, 248, 0.25)'
                    }}
                  >
                    {p.duration.split('/')[0].trim()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, flexGrow: 1, marginBottom: '16px' }}>
                  {p.lead}
                </p>

                {/* Specs Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.08)', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    {p.level}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#334155', background: 'var(--tint)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    {p.mode.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#334155', background: 'var(--tint)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    {p.liveProjects}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <Link
                    to={`/training/${p.id}`}
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: '#0284c7',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>View Track &amp; Syllabus</span>
                    <ArrowRight size={15} />
                  </Link>

                  <button
                    type="button"
                    onClick={scrollToForm}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-STEP ACADEMIC LEARNING PROCESS (DARK THEME) */}
      <section className="section why-section-dark netbg" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <div className="sec-head sec-head--dark" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ color: '#38bdf8' }}>Academic Methodology</p>
            <h2 style={{ color: '#ffffff' }}>The Velvora Learning Journey</h2>
            <p className="lead" style={{ marginInline: 'auto', maxWidth: '640px', color: '#cbd5e1' }}>
              From foundational concepts to live enterprise delivery, our 4-stage progression ensures job-readiness.
            </p>
          </div>

          <div
            className="process-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {learningRoadmap.map((step) => (
              <div
                key={step.step}
                className="svc-offer-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(165deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 12, 22, 0.98) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1, marginBottom: '12px' }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="section section--paper" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="eyebrow">Got Questions?</p>
            <h2>Frequently Asked Questions</h2>
            <p className="lead" style={{ marginInline: 'auto' }}>
              Everything you need to know about our training programs, internship structure, and credentials.
            </p>
          </div>

          <FaqAccordion items={trainingFaqs} />
        </div>
      </section>

      {/* 7. ADMISSIONS DESK & ENROLLMENT FORM */}
      <section ref={formSectionRef} id="admissions-portal" className="section why-section-dark netbg" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <TrainingEnrollmentForm />
        </div>
      </section>

      {/* 8. UNIFIED CTA BAND (STRICTLY LIGHT THEME AS REQUESTED) */}
      <CtaBand
        title="Ready to Build Real-World Engineering Competencies?"
        lead="Join Velvora Solutions Academy today. Choose from 8 specialized tracks or apply for our flagship internship with 100% live client project exposure."
        btnText="Apply for Enrollment"
        btnLink="#enrollment-form-section"
        theme="light"
      />
    </>
  );
}
