import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Phone, 
  Mail, 
  Briefcase,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { 
  trainingHero, 
  trainingCategories, 
  trainingPrograms, 
  learningRoadmap, 
  trainingFaqs 
} from '../data/trainingData.js';
import TrainingHeroGraphic from '../components/TrainingHeroGraphic.jsx';
import TrainingEnrollmentForm from '../components/TrainingEnrollmentForm.jsx';

// Icon resolver helper
function ProgramIcon({ name, size = 22, className = '' }) {
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

export default function Training() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProgramForForm, setSelectedProgramForForm] = useState('Internship Program (Live Industry Projects)');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const formSectionRef = useRef(null);
  const programsSectionRef = useRef(null);

  // Set document title and SEO meta
  useEffect(() => {
    document.title = 'Training Programs & Internships | Velvora Solutions';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Transforming Knowledge into Skills and Skills into Opportunities. Industry-standard training in ePublishing, AI/ML, Generative AI, Data Analytics, Digital Marketing, Accessibility, and Software Development with 100% Live Project Internships.'
      );
    }
  }, []);

  const scrollToForm = (programTitle = '') => {
    if (programTitle) {
      setSelectedProgramForForm(programTitle);
    }
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPrograms = () => {
    if (programsSectionRef.current) {
      programsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter programs based on active tab
  const filteredPrograms = trainingPrograms.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const featuredInternship = trainingPrograms.find((p) => p.id === 'internship-program');

  return (
    <div className="training-page">
      {/* -------------------------------------------------------------------
          1. HERO SECTION WITH 3D INTERACTIVE MASCOT
      --------------------------------------------------------------------- */}
      <section className="training-hero-section">
        <div className="container training-hero-container">
          <div className="training-hero-grid">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="training-hero-left">
              {/* Category Pill */}
              <div className="training-hero-eyebrow">
                <span className="hero-pill-radar" aria-hidden="true" />
                <GraduationCap size={15} />
                <span>{trainingHero.badge}</span>
              </div>

              {/* Stacked Display Headline */}
              <h1 className="training-hero-title">
                <span className="training-title-prefix">{trainingHero.headingPrefix}</span>{' '}
                <span className="training-title-accent">{trainingHero.headingAccent}</span>
              </h1>

              {/* Supporting Lead Description */}
              <p className="training-hero-desc">
                {trainingHero.subheading}
              </p>

              {/* Key Highlights Pill Strip */}
              <div className="training-hero-chips">
                <span className="training-chip">
                  <span className="hero-chip-bullet" aria-hidden="true" />
                  <span>100% Live Production Projects</span>
                </span>
                <span className="training-chip">
                  <span className="hero-chip-bullet" aria-hidden="true" />
                  <span>8 Specialized Tracks</span>
                </span>
                <span className="training-chip">
                  <span className="hero-chip-bullet" aria-hidden="true" />
                  <span>Cuddalore & Chennai Centers</span>
                </span>
                <span className="training-chip">
                  <span className="hero-chip-bullet" aria-hidden="true" />
                  <span>Official Certificate & PPO Pathway</span>
                </span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="training-hero-cta-row">
                <button
                  type="button"
                  onClick={() => scrollToForm('Internship Program (Live Industry Projects)')}
                  className="btn btn--orange training-hero-btn-primary"
                >
                  <span>Apply for Internship / Enroll</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={scrollToPrograms}
                  className="btn btn--secondary training-hero-btn-secondary"
                >
                  <span>Explore 8 Programs</span>
                </button>
              </div>

              {/* Fast Facts Bar */}
              <div className="training-hero-facts">
                <div className="th-fact">
                  <span className="th-fact-num">2,000+</span>
                  <span className="th-fact-lbl">Training Hours</span>
                </div>
                <div className="th-fact-div" />
                <div className="th-fact">
                  <span className="th-fact-num">1-on-1</span>
                  <span className="th-fact-lbl">Architect Mentorship</span>
                </div>
                <div className="th-fact-div" />
                <div className="th-fact">
                  <span className="th-fact-num">Hybrid</span>
                  <span className="th-fact-lbl">Online + In-Person</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Holographic AI Academy Graphic */}
            <div className="training-hero-right">
              <TrainingHeroGraphic onEnquireClick={() => scrollToForm()} />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          2. IMPACT METRICS STRIP
      --------------------------------------------------------------------- */}
      <section className="training-stats-strip" aria-label="Key Training Metrics">
        <div className="container">
          <div className="training-stats-grid">
            {trainingHero.stats.map((s, idx) => (
              <div key={idx} className="training-stat-item">
                <span className="training-stat-value">{s.value}</span>
                <span className="training-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          3. FEATURED HIGHLIGHT: THE INTERNSHIP PROGRAM
      --------------------------------------------------------------------- */}
      {featuredInternship && (
        <section className="training-featured-section">
          <div className="container">
            <div className="training-featured-card">
              <div className="tf-badge-row">
                <span className="tf-tag-pill">
                  <Sparkles size={14} />
                  <span>Flagship Student Program</span>
                </span>
                <span className="tf-status-badge">Accepting Applications</span>
              </div>

              <div className="tf-grid">
                <div className="tf-col-main">
                  <h2 className="tf-title">{featuredInternship.title}</h2>
                  <p className="tf-lead">{featuredInternship.lead}</p>

                  <div className="tf-specs-grid">
                    <div className="tf-spec-pod">
                      <Users size={16} className="tf-spec-icon" />
                      <div>
                        <strong>Who It's For:</strong>
                        <p>{featuredInternship.internshipSpecs.whoItsFor}</p>
                      </div>
                    </div>

                    <div className="tf-spec-pod">
                      <CheckCircle2 size={16} className="tf-spec-icon" />
                      <div>
                        <strong>Eligibility:</strong>
                        <p>{featuredInternship.internshipSpecs.eligibility}</p>
                      </div>
                    </div>

                    <div className="tf-spec-pod">
                      <Clock size={16} className="tf-spec-icon" />
                      <div>
                        <strong>Duration:</strong>
                        <p>{featuredInternship.internshipSpecs.duration}</p>
                      </div>
                    </div>

                    <div className="tf-spec-pod">
                      <Laptop size={16} className="tf-spec-icon" />
                      <div>
                        <strong>Live Project Exposure:</strong>
                        <p>{featuredInternship.internshipSpecs.liveProjectExposure}</p>
                      </div>
                    </div>
                  </div>

                  <div className="tf-perks-list">
                    <strong>What You Gain:</strong>
                    <ul>
                      {featuredInternship.internshipSpecs.perks.map((perk, i) => (
                        <li key={i}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="tf-col-action">
                  <div className="tf-action-box">
                    <div className="tf-action-icon">
                      <GraduationCap size={36} />
                    </div>
                    <h3>Start Your Internship Journey</h3>
                    <p>
                      Gain verified corporate experience across ePublishing, AI/ML, Data Analytics, Digital Accessibility, and Software Development.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToForm(featuredInternship.title)}
                      className="btn btn--orange btn--block tf-action-btn"
                    >
                      <span>Apply for Internship Now</span>
                      <ArrowRight size={17} />
                    </button>
                    <span className="tf-action-sub">
                      Online Live · Cuddalore Head Office · Chennai Branch Office
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------
          4. INTERACTIVE PROGRAMS FILTER & SHOWCASE
      --------------------------------------------------------------------- */}
      <section ref={programsSectionRef} className="training-programs-section">
        <div className="container">
          <div className="training-section-header">
            <span className="section-eyebrow">Comprehensive Curriculum</span>
            <h2 className="section-title">Industry-Standard Career Programs</h2>
            <p className="section-desc">
              Designed and instructed by senior architects. Each program blends fundamental theory with real-world enterprise deliverables, live tools, and modern workflows.
            </p>

            {/* Filter Tabs */}
            <div className="training-tabs-bar" role="tablist" aria-label="Course Category Tabs">
              {trainingCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`training-tab-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div className="training-cards-grid">
            {filteredPrograms.map((prog) => {
              const isIntern = prog.id === 'internship-program';
              return (
                <div
                  key={prog.id}
                  className={`training-course-card ${isIntern ? 'is-internship-card' : ''}`}
                >
                  {/* Card Header */}
                  <div className="tcc-header">
                    <div className="tcc-icon-pod">
                      <ProgramIcon name={prog.icon} size={24} />
                    </div>
                    <div className="tcc-tags">
                      <span className="tcc-badge">{prog.badge}</span>
                      <span className="tcc-category">{prog.tag}</span>
                    </div>
                  </div>

                  {/* Card Title & Lead */}
                  <h3 className="tcc-title">{prog.title}</h3>
                  <p className="tcc-lead">{prog.lead}</p>

                  {/* Program Meta Details */}
                  <div className="tcc-meta-row">
                    <div className="tcc-meta-item">
                      <Clock size={14} />
                      <span>{prog.duration}</span>
                    </div>
                    <div className="tcc-meta-item">
                      <Award size={14} />
                      <span>{prog.level}</span>
                    </div>
                    <div className="tcc-meta-item">
                      <MapPin size={14} />
                      <span>Hybrid / Centers</span>
                    </div>
                  </div>

                  {/* Advanced Topics Section */}
                  <div className="tcc-topics-block">
                    <span className="tcc-topics-title">Advanced Topics Covered:</span>
                    <ul className="tcc-topics-list">
                      {prog.advancedTopics.map((top, idx) => (
                        <li key={idx}>
                          <span className="tcc-topic-dot" aria-hidden="true">▸</span>
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools & Tech Chips */}
                  <div className="tcc-tools-block">
                    <span className="tcc-tools-label">Tools & Frameworks:</span>
                    <div className="tcc-tools-chips">
                      {prog.toolsLearned.map((tool) => (
                        <span key={tool} className="tcc-tool-pill">{tool}</span>
                      ))}
                    </div>
                  </div>

                  {/* Career Roles Prepared For */}
                  <div className="tcc-roles-block">
                    <Briefcase size={14} />
                    <span><strong>Career Roles:</strong> {prog.careerRoles.join(', ')}</span>
                  </div>

                  {/* Card Footer Action */}
                  <div className="tcc-footer">
                    <button
                      type="button"
                      onClick={() => scrollToForm(prog.title)}
                      className="btn btn--orange btn--block tcc-action-btn"
                    >
                      <span>Enquire for this Program</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          5. THE 4-STEP CAREER ACCELERATION ROADMAP
      --------------------------------------------------------------------- */}
      <section className="training-roadmap-section">
        <div className="container">
          <div className="training-section-header">
            <span className="section-eyebrow">Structured Learning Journey</span>
            <h2 className="section-title">How We Accelerate Your Career</h2>
            <p className="section-desc">
              From day one, you transition from passive studying to active engineering with real client workflows, code reviews, and industry mentors.
            </p>
          </div>

          <div className="roadmap-grid">
            {learningRoadmap.map((item) => (
              <div key={item.step} className="roadmap-card">
                <div className="roadmap-step-badge">{item.step}</div>
                <h3 className="roadmap-title">{item.title}</h3>
                <p className="roadmap-desc">{item.desc}</p>
                <div className="roadmap-glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          6. INTERACTIVE APPLICATION & ENROLLMENT FORM
      --------------------------------------------------------------------- */}
      <section ref={formSectionRef} className="training-form-section">
        <div className="container">
          <TrainingEnrollmentForm initialProgram={selectedProgramForForm} />
        </div>
      </section>

      {/* -------------------------------------------------------------------
          7. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
      --------------------------------------------------------------------- */}
      <section className="training-faq-section">
        <div className="container">
          <div className="training-section-header">
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about eligibility, scheduling, certifications, and live project mentorship.
            </p>
          </div>

          <div className="training-faq-list">
            {trainingFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={`training-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="training-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="training-faq-chev" aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="training-faq-a">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          8. FINAL CALL TO ACTION BANNER
      --------------------------------------------------------------------- */}
      <section className="training-cta-banner">
        <div className="container">
          <div className="training-cta-box">
            <div className="training-cta-content">
              <span className="training-cta-eyebrow">Ready to Start Learning?</span>
              <h2 className="training-cta-title">
                Talk to our academic team about the right program for you or your organization.
              </h2>
              <p className="training-cta-desc">
                Whether you are a college student building your first enterprise capstone, or an enterprise team upskilling in WCAG 2.2 and Generative AI, we provide tailored counseling within 24 hours.
              </p>
              <div className="training-cta-direct">
                <a href="tel:+919500834236" className="training-direct-link">
                  <Phone size={16} />
                  <span>Call: +91 9500834236</span>
                </a>
                <a href="mailto:info@velvorasolutions.com" className="training-direct-link">
                  <Mail size={16} />
                  <span>Email: info@velvorasolutions.com</span>
                </a>
              </div>
            </div>

            <div className="training-cta-btn-col">
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="btn btn--orange btn--lg training-cta-action"
              >
                <span>Enroll or Enquire Now</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

