import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { 
  HeartHandshake, 
  TrendingUp, 
  Rocket, 
  MessageSquareQuote, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Award, 
  ShieldCheck, 
  Layers, 
  Bot, 
  BarChart3, 
  FileCheck2, 
  BookOpen, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Paperclip,
  Globe,
  Globe2,
  Cpu,
  Users2,
  Zap,
  MessagesSquare,
  PenTool,
  Eye,
  Quote,
  Target,
  Users,
  Compass,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { company } from '../data/site.js';
import { careersJobs } from '../data/careersData.js';
import { PageHero } from '../components/ui.jsx';

const jobOpenings = careersJobs;

const growthPillars = [
  {
    letter: 'G',
    title: 'Growth',
    tagline: 'Continuous Learning, Mentorship & Global Exposure',
    stageLabel: 'Milestone 01 · Skill Acceleration & Mastery',
    desc: 'At Velvora, development starts on day one with structured technical learning pathways, dedicated executive mentorship, and direct participation in global digital accessibility and publishing operations.',
    points: [
      'Structured technical training in digital accessibility (WCAG/PDF-UA), ePublishing, AI automation, and data analytics.',
      'Global exposure through cross-border enterprise publishing and higher-education client projects.',
      '1-on-1 mentorship from seasoned industry leaders who actively architect your career progression.',
      'Full corporate sponsorship for professional certifications, international workshops, and masterclasses.'
    ],
    sla: '100+ Annual Upskilling Hours & Certified Mentorship',
    trajectory: [
      { step: '01', title: 'Foundation & Tooling', text: 'Intensive domain onboarding & software accreditation' },
      { step: '02', title: 'Project Immersion', text: 'Cross-functional client delivery & shadow audits' },
      { step: '03', title: 'Autonomous Mastery', text: 'Leading technical pipelines & junior engineer mentorship' }
    ],
    story: {
      quote: 'Joined as a junior content specialist and, through structured technical mentorship, transitioned into leading AI-powered XML automation pipelines.',
      role: 'Content Specialist ➔ AI Workflow Lead'
    }
  },
  {
    letter: 'R',
    title: 'Respect',
    tagline: 'Empathetic Collaboration, Open Dialogue & Valued Voices',
    stageLabel: 'Milestone 02 · Culture, Empathy & Voice',
    desc: 'Every voice matters at Velvora. We maintain a non-hierarchical, open-door environment where ideas and insights from any team member can immediately reshape our production workflows.',
    points: [
      'Every perspective, background, and cultural contribution is actively listened to, respected, and celebrated.',
      'Transparent communication channels where suggestions directly influence leadership decisions.',
      'Inclusive practices ensuring our teams reflect the international readers who consume our accessible content.',
      'Monthly peer-recognition and spotlight programs honoring individual and collective team milestones.'
    ],
    sla: 'Flat Communication Architecture & 100% Equal Voice Policy',
    trajectory: [
      { step: '01', title: 'Welcoming Onboarding', text: 'Assigned culture buddy with zero communication gatekeeping' },
      { step: '02', title: 'Open Ideation', text: 'Direct participation in monthly engineering town halls' },
      { step: '03', title: 'Culture Ambassadorship', text: 'Shaping team standards and fostering peer empathy' }
    ],
    story: {
      quote: 'An open environment where even as a new recruit, my workflow recommendations were tested, approved, and rolled out company-wide.',
      role: 'Accessibility Auditor'
    }
  },
  {
    letter: 'O',
    title: 'Opportunity',
    tagline: 'Merit-Based Mobility, High-Velocity Projects & Innovation',
    stageLabel: 'Milestone 03 · Cross-Domain Career Mobility',
    desc: 'We actively reject rigid career silos. Employees have the freedom and encouragement to explore cross-functional disciplines across publishing, AI, software, and marketing.',
    points: [
      'Equal opportunities to build expertise in publishing, digital accessibility, AI, and cloud architectures.',
      'Seamless internal mobility allowing engineers and specialists to transition across departments.',
      'Quarterly innovation challenges allowing teams to build proof-of-concepts with emerging technologies.',
      'Fast-track leadership development programs for proactive individuals ready for greater ownership.'
    ],
    sla: 'Cross-Domain Mobility & Rapid Internal Career Elevation',
    trajectory: [
      { step: '01', title: 'Core Discipline Mastery', text: 'Excelling within your initial focus discipline' },
      { step: '02', title: 'Cross-Domain Rotation', text: 'Hands-on participation in cross-team innovation labs' },
      { step: '03', title: 'Practice Leadership', text: 'Heading new practice initiatives and service lines' }
    ],
    story: {
      quote: 'Started in publishing QA and moved into full-stack software development by participating in our internal automation challenges.',
      role: 'QA Associate ➔ Full-Stack Developer'
    }
  },
  {
    letter: 'W',
    title: 'Well-being',
    tagline: 'Work-Life Harmony, Flexibility & Comprehensive Wellness',
    stageLabel: 'Milestone 04 · Sustainable Life Balance',
    desc: 'High ambition requires sustainable energy. We engineer our operational schedules to safeguard mental health, family time, and personal happiness.',
    points: [
      'Flexible hybrid work arrangements supporting personal commitments and family priorities.',
      'Holistic health initiatives including wellness reimbursements and ergonomic equipment support.',
      'Proactive workload leveling to ensure tight client deadlines never compromise personal downtime.',
      'Regular team social retreats, wellness days, and milestone celebrations to nurture true camaraderie.'
    ],
    sla: 'Flexible Hybrid Culture & Zero-Burnout Workload Policy',
    trajectory: [
      { step: '01', title: 'Balanced Schedule', text: 'Structured hours with clear off-clock boundaries' },
      { step: '02', title: 'Hybrid Empowerment', text: 'Autonomous schedule flexibility and focus days' },
      { step: '03', title: 'Sustained Fulfillment', text: 'Long-term career longevity with personal balance' }
    ],
    story: {
      quote: 'Velvora’s flexible hybrid policies allowed me to complete my postgraduate degree while simultaneously hitting every career milestone.',
      role: 'Senior Project Coordinator'
    }
  },
  {
    letter: 'T',
    title: 'Transformation',
    tagline: 'Future-Proof Reskilling & Pivoting into Next-Gen Tech',
    stageLabel: 'Milestone 05 · Reskilling & Technological Evolution',
    desc: 'The digital landscape is constantly transforming. We provide the mentorship, time, and infrastructure for our team members to pivot into high-demand frontier fields.',
    points: [
      'Structured pathways to pivot from traditional document workflows into Cognitive AI pipelines.',
      'Direct hands-on experience building multi-modal automated accessibility and conversion engines.',
      'Participation in global digital supply chain transformations with tier-1 publishers and universities.',
      'Future-proofing your professional equity in rapidly growing compliance and AI industries.'
    ],
    sla: 'Full Reskilling Sponsorship & Next-Gen Tech Specialization',
    trajectory: [
      { step: '01', title: 'Skill Audit & Ambition', text: 'Identifying emerging technical passions and industry trends' },
      { step: '02', title: 'Reskilling Sandbox', text: 'Dedicated laboratory time for experimenting with AI tools' },
      { step: '03', title: 'Pioneering New Roles', text: 'Leading automated conversion and AI governance practices' }
    ],
    story: {
      quote: 'Pivoted from traditional editorial typesetting into leading automated MathML and JATS XML ingestion pipelines.',
      role: 'Typesetting Specialist ➔ XML Automation Lead'
    }
  },
  {
    letter: 'H',
    title: 'Honesty',
    tagline: 'Radical Integrity, Transparent SLAs & Psychological Safety',
    stageLabel: 'Milestone 06 · Ethical Foundation & Radical Trust',
    desc: 'Integrity is the bedrock of everything we do. From defensible WCAG compliance audits to honest internal feedback, transparency guides every interaction.',
    points: [
      'Transparent, candid feedback loops between leadership, project teams, and clients.',
      'Absolute engineering integrity with zero tolerance for superficial or fake compliance shortcuts.',
      'Ethical AI adoption principles and robust data privacy safeguards in all automated pipelines.',
      'A psychologically safe culture where challenges are raised early and resolved collaboratively.'
    ],
    sla: 'Court-Defensible Audit Standards & Radical Internal Transparency',
    trajectory: [
      { step: '01', title: 'Open Trust Culture', text: 'Safe environment to ask questions and learn from mistakes' },
      { step: '02', title: 'Client Accountability', text: 'Delivering unvarnished, accurate compliance audit reports' },
      { step: '03', title: 'Standards Stewardship', text: 'Enforcing global accessibility ethics across the ecosystem' }
    ],
    story: {
      quote: 'Our commitment to honesty means clients trust our audit findings completely, and internal teams always know where they stand.',
      role: 'Principal Quality Auditor'
    }
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState('Copy Editing Specialist');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [growthExpanded, setGrowthExpanded] = useState(false);
  const [inclusionModalOpen, setInclusionModalOpen] = useState(false);
  const [activeGrowthIndex, setActiveGrowthIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Copy Editing Specialist',
    portfolio: '',
    websiteUrl: '',
    resumeFile: null,
    resumeName: '',
    resumeSize: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateCareerField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return 'Full name is required.';
        if (!/^[a-zA-Z\s.'-]{2,60}$/.test(value.trim())) {
          return 'Full name must contain only letters and spaces (2–60 characters).';
        }
        return '';
      case 'email':
        if (!value || !value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@domain.com).';
        }
        return '';
      case 'phone': {
        if (!value || !value.trim()) return 'Phone number is required.';
        const digits = value.replace(/\D/g, '');
        if (!/^\+?[0-9\s\-()]{8,20}$/.test(value.trim()) || digits.length < 8 || digits.length > 15) {
          return 'Please enter a valid phone number (8–15 digits, e.g. +91 98765 43210).';
        }
        return '';
      }
      case 'portfolio':
        if (value && value.trim() && !/^https?:\/\/.+/i.test(value.trim())) {
          return 'Please enter a valid URL starting with http:// or https://';
        }
        return '';
      case 'websiteUrl':
        if (value && value.trim() && !/^https?:\/\/.+/i.test(value.trim())) {
          return 'Please enter a valid URL starting with http:// or https://';
        }
        return '';
      case 'message':
        if (value && value.trim() && value.trim().length < 10) {
          return 'Please provide a message with at least 10 characters.';
        }
        return '';
      default:
        return '';
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const applySectionRef = useRef(null);

  useEffect(() => {
    document.title = 'Careers at Velvora Solutions | Build Skills. Create Impact. Shape the Future.';
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          const headerOffset = 135;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, []);

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB limit. Please upload a smaller document.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeName: file.name,
        resumeSize: formatFileSize(file.size),
      }));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      resumeFile: null,
      resumeName: '',
      resumeSize: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const scrollToSection = (e, sectionId) => {
    if (e) e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 135;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const scrollToApply = (jobTitle = '') => {
    if (jobTitle) {
      setSelectedJob(jobTitle);
      setFormData((prev) => ({ ...prev, role: jobTitle }));
    }
    setGrowthExpanded(false);
    setInclusionModalOpen(false);
    if (applySectionRef.current) {
      const topOffset = applySectionRef.current.getBoundingClientRect().top + window.scrollY - 135;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateCareerField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    const nameErr = validateCareerField('name', formData.name);
    const emailErr = validateCareerField('email', formData.email);
    const phoneErr = validateCareerField('phone', formData.phone);
    const resumeErr = !formData.resumeFile ? 'Please upload your resume document (.pdf, .doc, .docx up to 10MB).' : '';
    const portErr = validateCareerField('portfolio', formData.portfolio || '');
    const webErr = validateCareerField('websiteUrl', formData.websiteUrl || '');
    const msgErr = validateCareerField('message', formData.message || '');

    const newErrors = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      resume: resumeErr,
      portfolio: portErr,
      websiteUrl: webErr,
      message: msgErr,
    };
    setFormErrors(newErrors);

    if (nameErr || emailErr || phoneErr || resumeErr || portErr || webErr || msgErr) {
      setErrorMessage(nameErr || emailErr || phoneErr || resumeErr || 'Please correct the highlighted form errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('role', formData.role || selectedJob);
      data.append('portfolio', formData.portfolio || '');
      data.append('websiteUrl', formData.websiteUrl || '');
      data.append('message', formData.message || '');
      data.append('resume', formData.resumeFile);

      const response = await fetch('/api/career', {
        method: 'POST',
        body: data,
      });

      let result = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => '');
        result = { error: text || 'Unable to connect to the email server. Please make sure the server is running.' };
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit application. Please try again.');
      }

      setApplicationSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. HERO & BANNER QUOTE */}
      <PageHero
        eyebrow="Careers at Velvora Solutions"
        title="Build Skills. Create Impact. Shape the Future."
        crumbs={['Home', 'Careers']}
      >
        <div className="career-banner-quote-card">
          <Quote size={28} className="career-quote-icon" aria-hidden="true" />
          <p className="career-banner-quote-text">
            “A career is not just about where you work — it’s about the skills you master, the people you empower, and the future you help design.”
          </p>
        </div>
      </PageHero>

      {/* QUICK JUMP DOCK */}
      <section className="career-jump-dock" aria-label="Quick jump section navigation">
        <div className="container">
          <div className="career-jump-row">
            <button 
              type="button" 
              onClick={(e) => scrollToSection(e, 'philosophy')} 
              className="career-jump-btn"
            >
              <Sparkles size={14} className="career-jump-icon" />
              <span>Our Philosophy</span>
            </button>
            <button 
              type="button" 
              onClick={(e) => scrollToSection(e, 'grow-framework')} 
              className="career-jump-btn"
            >
              <TrendingUp size={14} className="career-jump-icon" />
              <span>G.R.O.W. Framework</span>
            </button>
            <button 
              type="button" 
              onClick={(e) => scrollToSection(e, 'inclusion')} 
              className="career-jump-btn"
            >
              <Users size={14} className="career-jump-icon" />
              <span>Inclusion &amp; Innovation</span>
            </button>
            <button 
              type="button" 
              onClick={(e) => scrollToSection(e, 'why-join')} 
              className="career-jump-btn"
            >
              <Globe2 size={14} className="career-jump-icon" />
              <span>Why Join Us?</span>
            </button>
            <button 
              type="button" 
              onClick={(e) => scrollToSection(e, 'quality-framework')} 
              className="career-jump-btn"
            >
              <ShieldCheck size={14} className="career-jump-icon" />
              <span>Quality Framework</span>
            </button>
            <button 
              type="button" 
              onClick={() => scrollToApply()} 
              className="career-jump-btn career-jump-btn--cta"
            >
              <Briefcase size={15} />
              <span>Explore Openings &amp; Apply</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1. OUR PHILOSOPHY (LIGHT THEME) */}
      <section id="philosophy" className="section section--paper career-philosophy-section">
        <div className="container">
          {/* Philosophy Banner */}
          <div className="career-philosophy-card">
            <div className="career-philosophy-card__header">
              <span className="badge-eyebrow">
                <Sparkles size={16} /> Our Philosophy
              </span>
              <h2 className="career-section-h2">Empowering You to Rise, Contribute, and Lead</h2>
            </div>
            <p className="career-philosophy-card__text">
              At Velvora Solutions, we believe careers thrive when people can <strong>GROW</strong> — with opportunities to learn, respect for individuality, and a workplace that values well‑being. We don’t just hire talent; we nurture it, ensuring every team member has the chance to rise, contribute, and make an impact across content, technology, and digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CAREER FRAMEWORK: G.R.O.W.T.H. (OPEN FLUID PROGRESSION HIGHWAY - NO BOX MODEL) */}
      <section id="grow-framework" className="section why-section-dark netbg career-grow-section">
        {/* Soft Ambient Radial Halo */}
        <div className="growth-ambient-glow" aria-hidden="true" />

        <div className="container">
          <div className="career-grow-header text-center">
            <span className="pill"><i /> Career Progression</span>
            <h2 className="career-section-h2">Our Career Framework: G.R.O.W.T.H.</h2>
            <p className="lead" style={{ color: '#cbd5e1', fontSize: '1.18rem', lineHeight: 1.7, maxWidth: '68ch' }}>
              A connected milestone roadmap designed to support your development from day one through continuous career transformations.
            </p>
          </div>

          {/* FLUID INTERACTIVE PROGRESSION HIGHWAY (ZERO BOXES, ZERO CARDS) */}
          <div className="growth-highway-wrap">
            {/* SUBWAY / TIMELINE TRACK NAVIGATOR */}
            <div className="growth-subway-track" role="tablist" aria-label="G.R.O.W.T.H. Framework Milestones">
              <div className="growth-subway-line" aria-hidden="true">
                <div 
                  className="growth-subway-progress" 
                  style={{ width: `${(activeGrowthIndex / 5) * 100}%` }} 
                />
              </div>

              {growthPillars.map((p, pIdx) => {
                const isActive = pIdx === activeGrowthIndex;
                return (
                  <button
                    key={p.letter}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveGrowthIndex(pIdx)}
                    className={`growth-node-trigger ${isActive ? 'growth-node-trigger--active' : ''}`}
                  >
                    <span className="growth-node-ring">
                      <span className="growth-node-letter">{p.letter}</span>
                    </span>
                    <span className="growth-node-label">{p.title}</span>
                  </button>
                );
              })}
            </div>

            {/* UNIFIED OPEN FLUID SHOWCASE (NO BOXES, NO CARD BORDERS) */}
            {(() => {
              const p = growthPillars[activeGrowthIndex];
              return (
                <div className="growth-fluid-stage">
                  {/* GLOWING WATERMARK LETTER */}
                  <div className="growth-watermark-bg" aria-hidden="true">
                    {p.letter}
                  </div>

                  <div className="growth-fluid-grid">
                    {/* LEFT COLUMN: PILLAR PHILOSOPHY & ACTIONABLE POINTS */}
                    <div className="growth-fluid-col-left">
                      <div className="growth-stage-tag-row">
                        <span className="growth-stage-pill">{p.stageLabel}</span>
                        <span className="growth-stage-index">Step 0{activeGrowthIndex + 1} of 06</span>
                      </div>

                      <h3 className="growth-stage-heading">
                        <span className="text-cyan">{p.letter}.</span> {p.title}: {p.tagline}
                      </h3>
                      <p className="growth-stage-narrative">{p.desc}</p>

                      <div className="growth-initiatives-block">
                        <h5 className="growth-initiatives-title">Actionable Milestones &amp; Support:</h5>
                        <ul className="growth-initiatives-list">
                          {p.points.map((pt, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={17} className="growth-pt-icon" aria-hidden="true" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="growth-sla-banner">
                        <Sparkles size={16} className="text-orange" aria-hidden="true" />
                        <span><strong>SLA Guarantee:</strong> {p.sla}</span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: OPEN PROGRESSION LADDER & HUMAN STORY */}
                    <div className="growth-fluid-col-right">
                      {/* OPEN VERTICAL TIMELINE LADDER (ZERO BOXES) */}
                      <div className="growth-open-timeline">
                        <div className="growth-open-timeline-heading">
                          <TrendingUp size={16} aria-hidden="true" />
                          <span>Career Progression Ladder</span>
                        </div>
                        <div className="growth-open-steps">
                          {p.trajectory.map((t, tIdx) => (
                            <div key={tIdx} className="growth-open-step">
                              <span className="growth-open-step-node">{t.step}</span>
                              <div className="growth-open-step-text">
                                <strong>{t.title}</strong>
                                <p>{t.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* OPEN TESTIMONIAL QUOTE (NO BOX BORDERS) */}
                      <div className="growth-open-quote">
                        <p className="growth-open-quote-body">“{p.story.quote}”</p>
                        <div className="growth-open-quote-author">
                          <Award size={14} className="text-orange" aria-hidden="true" />
                          <span>{p.story.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM FLUID CONTROLS & PAGINATION BAR */}
                  <div className="growth-fluid-footer-bar">
                    <button
                      type="button"
                      className="btn btn--outline btn--sm growth-nav-btn"
                      onClick={() => setActiveGrowthIndex((prev) => (prev > 0 ? prev - 1 : growthPillars.length - 1))}
                      aria-label="Previous milestone"
                    >
                      <ChevronLeft size={16} /> Previous Milestone
                    </button>

                    <div className="growth-dots-stream" aria-hidden="true">
                      {growthPillars.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveGrowthIndex(dotIdx)}
                          className={`growth-dot-node ${dotIdx === activeGrowthIndex ? 'growth-dot-node--active' : ''}`}
                          aria-label={`Jump to milestone ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="btn btn--outline btn--sm growth-nav-btn"
                      onClick={() => setActiveGrowthIndex((prev) => (prev < growthPillars.length - 1 ? prev + 1 : 0))}
                      aria-label="Next milestone"
                    >
                      Next Milestone <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* FULL DETAILED BLUEPRINT EXPANSION TOGGLE BUTTON */}
            <div className="career-framework-btn-wrap" style={{ marginTop: '3.5rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setGrowthExpanded(!growthExpanded)}
                className="btn btn--orange btn--lg career-glow-btn"
              >
                <span>{growthExpanded ? 'Collapse Detailed Blueprint Stream' : 'Explore Full G.R.O.W.T.H. Blueprint Stream'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* EXPANDED BLUEPRINT: FLUID VERTICAL TIMELINE STREAM (ZERO BOXES, ZERO CARDS, ZERO POPUPS) */}
            {growthExpanded && (
              <div className="growth-expanded-stream">
                <div className="growth-stream-heading-wrap">
                  <span className="growth-stage-pill" style={{ marginBottom: '0.75rem' }}>
                    <Sparkles size={14} aria-hidden="true" /> Comprehensive Roadmap
                  </span>
                  <h3>The Complete 6-Milestone Progression Blueprint</h3>
                  <p>
                    Every team member’s career at Velvora Solutions progresses along these six foundational pillars, engineered to empower individual mastery and global leadership.
                  </p>
                </div>

                <div className="growth-stream-timeline">
                  {growthPillars.map((p, idx) => (
                    <div key={p.letter} className="growth-stream-entry">
                      <div className="growth-stream-entry-badge">
                        <span>{p.letter}</span>
                      </div>
                      <div className="growth-stream-entry-content">
                        <span className="growth-stage-pill" style={{ marginBottom: '0.45rem' }}>{p.stageLabel}</span>
                        <h4 className="growth-stream-entry-title">{p.title}: {p.tagline}</h4>
                        <p className="growth-stream-entry-desc">{p.desc}</p>

                        <div className="growth-stream-points">
                          {p.points.map((pt, pIdx) => (
                            <div key={pIdx} className="growth-stream-point-item">
                              <CheckCircle2 size={15} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>

                        <p className="growth-stream-quote">“{p.story.quote}” — <strong>{p.story.role}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <button
                    type="button"
                    className="btn btn--orange btn--lg"
                    onClick={() => scrollToApply()}
                  >
                    <span>Ready to Grow With Us? Explore Open Roles &amp; Apply</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. INCLUSION & INNOVATION */}
      <section id="inclusion" className="section section--paper career-inclusion-section">
        <div className="container">
          <div className="career-inclusion-box">
            <div className="career-inclusion-box__left">
              <span className="badge-eyebrow">
                <Users size={16} /> Workplace Diversity
              </span>
              <h2 className="career-section-h2">Inclusion &amp; Innovation</h2>
              <p className="career-inclusion-lead">
                Velvora is committed to building a workplace where every perspective matters.
              </p>
              
              <ul className="career-inclusion-list">
                <li>
                  <CheckCircle2 size={18} className="career-check-icon" />
                  <span>We welcome diverse talents across publishing, accessibility, web development, software engineering, AI automation, data analytics, and digital marketing.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="career-check-icon" />
                  <span>We design workflows and teams that are inclusive by default.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="career-check-icon" />
                  <span>We believe innovation flourishes when people feel empowered to bring their authentic selves to work.</span>
                </li>
              </ul>

              <div style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => setInclusionModalOpen(true)}
                  className="btn btn--orange btn--lg"
                >
                  <span>Our Inclusive Innovation Stories</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="career-inclusion-box__right">
              <div className="career-quote-feature">
                <Quote size={32} className="career-quote-icon" />
                <p className="career-quote-feature__text">
                  “Inclusion isn’t a policy here — it’s how we innovate every day. When people bring their authentic voices, solutions become truly universal.”
                </p>
                <div className="career-quote-feature__author">
                  <strong>Diverse Perspectives · Unified Impact</strong>
                  <span>Global Publishing, Accessibility &amp; Tech Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY JOIN US? */}
      <section id="why-join" className="section why-section-dark netbg career-why-section">
        <div className="container">
          <div className="career-panel-header text-center">
            <span className="pill"><i /> The Velvora Advantage</span>
            <h2 className="career-section-h2" style={{ color: '#fff' }}>Why Join Us?</h2>
            <p className="lead" style={{ color: '#cbd5e1', maxWidth: '64ch', margin: '0 auto' }}>
              Discover an environment where your work directly impacts millions of readers and technology users across the globe.
            </p>
          </div>

          <div className="why-join-grid">
            <div className="why-join-card">
              <div className="why-join-card__top">
                <div className="why-join-icon-wrap why-join-icon-wrap--cyan">
                  <Globe2 size={24} />
                </div>
                <div className="why-join-card__num">01</div>
              </div>
              <h3 className="why-join-card__title">Universal Impact</h3>
              <p className="why-join-card__text">
                Work on projects that make content accessible to millions worldwide.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__top">
                <div className="why-join-icon-wrap why-join-icon-wrap--emerald">
                  <Cpu size={24} />
                </div>
                <div className="why-join-card__num">02</div>
              </div>
              <h3 className="why-join-card__title">Modern Engineering</h3>
              <p className="why-join-card__text">
                Build modern websites, applications, and digital solutions that transform industries.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__top">
                <div className="why-join-icon-wrap why-join-icon-wrap--violet">
                  <Users2 size={24} />
                </div>
                <div className="why-join-card__num">03</div>
              </div>
              <h3 className="why-join-card__title">Specialist Collaboration</h3>
              <p className="why-join-card__text">
                Collaborate with a team of specialists passionate about publishing, technology, and marketing.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__top">
                <div className="why-join-icon-wrap why-join-icon-wrap--amber">
                  <Zap size={24} />
                </div>
                <div className="why-join-card__num">04</div>
              </div>
              <h3 className="why-join-card__title">Cutting-Edge Tech</h3>
              <p className="why-join-card__text">
                Gain exposure to cutting‑edge AI workflows, data analytics, and global standards.
              </p>
            </div>

            <div className="why-join-card why-join-card--wide">
              <div className="why-join-card__top">
                <div className="why-join-icon-wrap why-join-icon-wrap--rose">
                  <HeartHandshake size={24} />
                </div>
                <div className="why-join-card__num">05</div>
              </div>
              <h3 className="why-join-card__title">Culture of Contribution</h3>
              <p className="why-join-card__text">
                Grow in a culture that celebrates curiosity, creativity, and contribution.
              </p>
            </div>
          </div>

          {/* CTA Strip */}
          <div className="why-join-cta-banner">
            <div className="why-join-cta-banner__content">
              <h3>Ready to reimagine your career?</h3>
              <p>
                Join Velvora Solutions and be part of a journey where your skills create impact, your ideas drive innovation, and your career shapes the future.
              </p>
            </div>
            <button
              type="button"
              className="btn btn--orange btn--lg"
              onClick={() => scrollToApply()}
            >
              <span>Apply Now</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. QUALITY FRAMEWORK & CLIENT CHARTER (LIGHT THEME) */}
      <section id="quality-framework" className="section section--paper quality-framework-section">
        <div className="container">
          {/* CLIENT CHARTER */}
          <div className="client-charter-card">
            <div className="client-charter-card__header">
              <div className="client-charter-badge">
                <Target size={16} /> Internal Culture Charter
              </div>
              <h2 className="career-section-h2">
                Message to Our Team: Clients Come First
              </h2>
              <p className="client-charter-sub">
                At Velvora, our clients are the reason we exist. Every project we deliver is not just a task — it’s a promise.
              </p>
            </div>

            <div className="client-charter-grid">
              <div className="client-charter-point">
                <div className="client-charter-point__icon">
                  <ShieldCheck size={22} />
                </div>
                <p><strong>Clients trust us</strong> with their content, technology, and digital growth.</p>
              </div>

              <div className="client-charter-point">
                <div className="client-charter-point__icon">
                  <Clock size={22} />
                </div>
                <p><strong>Clients depend on us</strong> to meet deadlines, maintain accuracy, and ensure accessibility.</p>
              </div>

              <div className="client-charter-point">
                <div className="client-charter-point__icon">
                  <Sparkles size={22} />
                </div>
                <p><strong>Clients inspire us</strong> to innovate, improve, and go beyond expectations.</p>
              </div>
            </div>

            <div className="client-charter-footer">
              <Quote size={24} className="career-quote-icon" />
              <p>
                “To every team member: remember that our success is measured by client satisfaction. Treat every project as if it were your own, and every client as a long‑term partner.”
              </p>
            </div>
          </div>

          {/* QUALITY FRAMEWORK */}
          <div style={{ marginTop: '4.5rem' }}>
            <div className="career-panel-header text-center">
              <span className="pill"><i /> Delivery Lifecycle</span>
              <h2 className="career-section-h2">Delivering Quality Work: Our Framework</h2>
              <p className="lead" style={{ maxWidth: '64ch', margin: '0 auto' }}>
              How our teams guarantee precision, compliance, and excellence on every single engagement.
            </p>
          </div>

          <div className="quality-steps-grid">
            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--blue">
                  <Compass size={22} />
                </div>
                <div className="quality-step-card__num">01</div>
              </div>
              <h3 className="quality-step-card__title">Understand the Client’s Vision</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Begin with clear requirements gathering.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Ask the right questions to uncover hidden needs.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Align project goals with client expectations.</span></li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--emerald">
                  <Target size={22} />
                </div>
                <div className="quality-step-card__num">02</div>
              </div>
              <h3 className="quality-step-card__title">Plan with Precision</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Break down tasks into achievable milestones.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Assign responsibilities clearly.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Use project management tools to track progress.</span></li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--amber">
                  <Sparkles size={22} />
                </div>
                <div className="quality-step-card__num">03</div>
              </div>
              <h3 className="quality-step-card__title">Execute with Excellence</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Apply technical expertise (content, web/software, AI, analytics, marketing).</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Follow industry standards (WCAG, PDF/UA, SEO best practices, coding guidelines).</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Double‑check outputs with human + automated quality checks.</span></li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--cyan">
                  <MessagesSquare size={22} />
                </div>
                <div className="quality-step-card__num">04</div>
              </div>
              <h3 className="quality-step-card__title">Communicate Transparently</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Provide regular updates to clients.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Share progress reports and timelines.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Be proactive about challenges and solutions.</span></li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--violet">
                  <ShieldCheck size={22} />
                </div>
                <div className="quality-step-card__num">05</div>
              </div>
              <h3 className="quality-step-card__title">Test and Validate</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Run accessibility, functionality, and performance checks.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Validate against client requirements before delivery.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Ensure compliance with global standards.</span></li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__top">
                <div className="quality-step-icon-wrap quality-step-icon-wrap--rose">
                  <Rocket size={22} />
                </div>
                <div className="quality-step-card__num">06</div>
              </div>
              <h3 className="quality-step-card__title">Deliver and Support</h3>
              <ul className="quality-step-card__list">
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Deliver on time, with complete documentation.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Offer post‑delivery support and training if needed.</span></li>
                <li><CheckCircle2 size={15} className="quality-step-check" /> <span>Gather feedback to improve future projects.</span></li>
              </ul>
            </div>
          </div>

          {/* What Else We Should Do for Quality Projects */}
          <div className="quality-extra-box">
            <h3 className="quality-extra-box__title">
              <Lightbulb size={20} className="accent" />
              <span>What Else We Should Do for Quality Projects</span>
            </h3>
            <div className="quality-extra-grid">
              <div className="quality-extra-pod">
                <div className="quality-extra-icon-wrap">
                  <BookOpen size={18} />
                </div>
                <strong>Continuous Learning</strong>
                <p>Keep the team updated on new standards, tools, and technologies.</p>
              </div>
              <div className="quality-extra-pod">
                <div className="quality-extra-icon-wrap">
                  <MessagesSquare size={18} />
                </div>
                <strong>Client Feedback Loop</strong>
                <p>Actively collect and act on client feedback to refine deliverable quality.</p>
              </div>
              <div className="quality-extra-pod">
                <div className="quality-extra-icon-wrap">
                  <Lightbulb size={18} />
                </div>
                <strong>Innovation Culture</strong>
                <p>Encourage experimenting with AI, automation, and analytics to improve workflows.</p>
              </div>
              <div className="quality-extra-pod">
                <div className="quality-extra-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <strong>Internal Audits</strong>
                <p>Regularly review processes to ensure consistency and operational excellence.</p>
              </div>
              <div className="quality-extra-pod">
                <div className="quality-extra-icon-wrap">
                  <Award size={18} />
                </div>
                <strong>Celebrate Success</strong>
                <p>Recognize team members who go above and beyond for quality delivery.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* 7. CURRENT OPENINGS (DARK THEME) */}
      <section id="openings-section" className="section why-section-dark netbg career-apply-section">
        <div className="container">
          <div className="career-panel-header text-center">
            <span className="pill"><i /> Join Our Team</span>
            <h2 className="career-section-h2">Explore Current Openings</h2>
            <p className="lead" style={{ color: '#cbd5e1', maxWidth: '64ch', margin: '0 auto' }}>
              Find your next role with Velvora Solutions. Select an opening or submit an open application below.
            </p>
          </div>

          {/* JOB OPENINGS LIST */}
          <div className="job-openings-grid">
            {jobOpenings.map((job) => {
              const roleIcons = {
                'copy-editing-specialist': PenTool,
                'ppt-accessibility-specialist': Eye,
                'typesetting-specialist': BookOpen,
                'ai-automation-engineer': Cpu,
              };
              const RoleIcon = roleIcons[job.id] || Briefcase;

              return (
                <article key={job.id} className="job-opening-card job-opening-card--concise">
                  <div className="job-opening-card__head">
                    <div className="job-opening-card__title-box">
                      <div className="job-opening-role-icon-wrap">
                        <RoleIcon size={20} />
                      </div>
                      <div>
                        <span className="job-opening-card__dept">{job.department}</span>
                        <h3 className="job-opening-card__title">{job.title}</h3>
                      </div>
                    </div>
                    <span className="job-opening-card__type">{job.type}</span>
                  </div>

                <div className="job-opening-card__meta">
                  <span className="job-meta-item"><MapPin size={15} /> <span>{job.location}</span></span>
                  <span className="job-meta-item"><Clock size={15} /> <span>{job.experience}</span></span>
                </div>

                <p className="job-opening-card__summary">{job.shortSummary || job.summary}</p>

                {job.keyTags && (
                  <div className="job-opening-card__tags">
                    {job.keyTags.map((tag) => (
                      <span key={tag} className="job-tag-pill">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="job-opening-card__action">
                  <Link
                    to={`/careers/${job.id}`}
                    className="btn btn--orange job-card-primary-btn"
                  >
                    <span>View Full Job Description &amp; Apply</span>
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    className="btn btn--outline job-card-quick-btn"
                    onClick={() => {
                      setSelectedJob(job.title);
                      setFormData((prev) => ({ ...prev, role: job.title }));
                      const formEl = document.getElementById('careers-application-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Quick Apply Form</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        </div>
      </section>

      {/* 8. APPLICATION PORTAL (LIGHT THEME) */}
      <section ref={applySectionRef} id="apply-section" className="section section--paper career-apply-section-light">
        <div className="container">
          <div id="careers-application-form" className="career-application-wrapper">
            <div className="career-apply-card career-apply-card--light">
              <div className="career-apply-card__header">
                <span className="badge-eyebrow">
                  <Send size={16} /> Application Portal
                </span>
                <h3 className="career-apply-card__title">
                  Submit Your Application
                </h3>
                <p className="career-apply-card__desc">
                  Applying for: <strong className="accent">{formData.role || selectedJob}</strong>
                </p>
              </div>

              {applicationSubmitted ? (
                <div className="career-form-success" role="status" aria-live="polite">
                  <div className="career-form-success__icon">
                    <CheckCircle size={44} />
                  </div>
                  <h3>Application Submitted Successfully!</h3>
                  <p style={{ marginBottom: '10px' }}>
                    Thank you for applying, <strong>{formData.name}</strong>. We have sent an automated confirmation email to your registered address: <strong>{formData.email}</strong>.
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted, #64748b)', lineHeight: 1.6 }}>
                    Our recruitment team will carefully review your qualifications for the <strong>{formData.role}</strong> position and contact you regarding the next steps within 48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setErrorMessage('');
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        role: 'Copy Editing Specialist',
                        portfolio: '',
                        websiteUrl: '',
                        resumeFile: null,
                        resumeName: '',
                        resumeSize: '',
                        message: '',
                      });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="btn btn--outline"
                    style={{ marginTop: '1rem' }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form className="career-form" onSubmit={handleFormSubmit}>
                  {errorMessage && (
                    <div className="contact-form-error" role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="app-name">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        id="app-name"
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Jane Doe"
                        className={`contact-input ${formErrors.name ? 'is-invalid' : ''}`}
                      />
                      {formErrors.name && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {formErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="app-email">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        id="app-email"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. jane@organization.com"
                        className={`contact-input ${formErrors.email ? 'is-invalid' : ''}`}
                      />
                      {formErrors.email && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="app-phone">
                        Phone Number <span className="req">*</span>
                      </label>
                      <input
                        id="app-phone"
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`contact-input ${formErrors.phone ? 'is-invalid' : ''}`}
                      />
                      {formErrors.phone && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {formErrors.phone}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="app-role">
                        Role Applied For <span className="req">*</span>
                      </label>
                      <select
                        id="app-role"
                        name="role"
                        value={formData.role}
                        onChange={handleFormChange}
                        className="contact-input"
                      >
                        {jobOpenings.map((j) => (
                          <option key={j.id} value={j.title}>
                            {j.title}
                          </option>
                        ))}
                        <option value="General Open Application">General Open Application</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="app-portfolio">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        id="app-portfolio"
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleFormChange}
                        placeholder="https://linkedin.com/in/username"
                        className={`contact-input ${formErrors.portfolio ? 'is-invalid' : ''}`}
                      />
                      {formErrors.portfolio && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {formErrors.portfolio}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="app-website">
                        Browser URL / Personal Site
                      </label>
                      <input
                        id="app-website"
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleFormChange}
                        placeholder="https://yourwebsite.com or GitHub"
                        className={`contact-input ${formErrors.websiteUrl ? 'is-invalid' : ''}`}
                      />
                      {formErrors.websiteUrl && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {formErrors.websiteUrl}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RESUME DRAG AND DROP UPLOAD */}
                  <div className="form-group">
                    <label>
                      Resume / CV Document (PDF, DOCX) <span className="req">*</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                    />

                    {formData.resumeName ? (
                      <div className="file-preview-card">
                        <div className="file-preview-card__left">
                          <Paperclip size={20} className="accent" />
                          <div>
                            <strong>{formData.resumeName}</strong>
                            <small>{formData.resumeSize}</small>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="file-remove-btn"
                          aria-label="Remove uploaded resume"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`file-dropzone${isDragging ? ' is-dragging' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload resume by dragging and dropping or clicking"
                      >
                        <UploadCloud size={36} className="file-dropzone__icon" />
                        <p className="file-dropzone__text">
                          Drag and drop your resume here, or <span>browse files</span>
                        </p>
                        <span className="file-dropzone__hint">Supports PDF, DOC, DOCX up to 10MB</span>
                      </div>
                    )}
                    {formErrors.resume && (
                      <span className="field-error-msg" style={{ marginTop: '8px', display: 'flex' }}>
                        <AlertCircle size={13} /> {formErrors.resume}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="app-message">
                      Cover Note / Message
                    </label>
                    <textarea
                      id="app-message"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your background, career aspirations, or why you want to join Velvora Solutions..."
                      className="contact-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn--orange btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    <Send size={18} aria-hidden="true" />
                  </button>

                  <div className="contact-privacy-note">
                    <ShieldCheck size={16} />
                    <span>Your data is confidential and used solely for recruitment review by Velvora Solutions.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL: OUR INCLUSIVE INNOVATION STORIES */}
      {/* ========================================================================= */}
      {inclusionModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setInclusionModalOpen(false)}>
          <div 
            className="career-modal-dialog" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inclusion-modal-title"
          >
            <div className="career-modal-header">
              <div>
                <span className="badge-eyebrow">
                  <Users size={16} /> Showcase &amp; Impact
                </span>
                <h2 id="inclusion-modal-title" className="career-modal-title">
                  Our Inclusive Innovation Stories
                </h2>
              </div>
              <button
                type="button"
                className="career-modal-close"
                onClick={() => setInclusionModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="career-modal-body">
              <div className="career-modal-intro-card">
                <p>
                  At Velvora Solutions, we believe innovation flourishes when inclusion is at the core. Every project we deliver is shaped by diverse perspectives, unique experiences, and authentic voices. This is how we build solutions that matter — for industries, communities, and the world.
                </p>
              </div>

              {/* Inclusive Teams, Innovative Outcomes */}
              <div className="inclusion-section-block">
                <h3 className="inclusion-block-title">Inclusive Teams, Innovative Outcomes</h3>
                <ul className="inclusion-points-list">
                  <li>
                    <strong>Cross‑disciplinary collaboration:</strong> Content specialists, developers, AI engineers, and marketers work together to solve complex challenges.
                  </li>
                  <li>
                    <strong>Global perspectives:</strong> Our teams span countries and cultures, ensuring solutions resonate worldwide.
                  </li>
                  <li>
                    <strong>Accessibility by design:</strong> Every product we build — from websites to AI workflows — is designed to be inclusive and usable by all.
                  </li>
                </ul>
              </div>

              {/* Innovation in Action */}
              <div className="inclusion-section-block">
                <h3 className="inclusion-block-title">Innovation in Action</h3>
                <div className="innovation-action-grid">
                  <div className="innovation-action-pod">
                    <h4>AI Automation for Publishing</h4>
                    <p>Diverse teams reimagined content workflows, making information accessible to millions.</p>
                  </div>
                  <div className="innovation-action-pod">
                    <h4>Web &amp; Software Development</h4>
                    <p>Inclusive design principles shaped applications that serve global audiences.</p>
                  </div>
                  <div className="innovation-action-pod">
                    <h4>Data Analytics Projects</h4>
                    <p>Teams combined technical expertise with cultural insights to deliver smarter, more human‑centered solutions.</p>
                  </div>
                  <div className="innovation-action-pod">
                    <h4>Digital Marketing Campaigns</h4>
                    <p>Campaigns crafted by diverse voices reached broader audiences with authentic impact.</p>
                  </div>
                </div>
              </div>

              {/* Employee Voices */}
              <div className="inclusion-section-block">
                <h3 className="inclusion-block-title">Employee Voices</h3>
                <p className="inclusion-subnote">Innovation is not just about technology — it’s about people.</p>
                <div className="employee-voices-grid">
                  <div className="voice-card">
                    <Quote size={20} className="accent" />
                    <p>“Working with teammates from different backgrounds taught me new ways to solve problems.”</p>
                  </div>
                  <div className="voice-card">
                    <Quote size={20} className="accent" />
                    <p>“Inclusion isn’t a policy here — it’s how we innovate every day.”</p>
                  </div>
                  <div className="voice-card">
                    <Quote size={20} className="accent" />
                    <p>“Velvora gave me the chance to bring my authentic self to work, and that made me more creative.”</p>
                  </div>
                </div>
              </div>

              {/* Why Inclusion Matters for Innovation */}
              <div className="inclusion-section-block">
                <h3 className="inclusion-block-title">Why Inclusion Matters for Innovation</h3>
                <div className="inclusion-why-grid">
                  <div className="inclusion-why-pod">
                    <CheckCircle2 size={18} className="accent" />
                    <span>Diverse perspectives uncover hidden opportunities.</span>
                  </div>
                  <div className="inclusion-why-pod">
                    <CheckCircle2 size={18} className="accent" />
                    <span>Inclusive teams design solutions that work for everyone.</span>
                  </div>
                  <div className="inclusion-why-pod">
                    <CheckCircle2 size={18} className="accent" />
                    <span>Empowered employees bring their best ideas forward.</span>
                  </div>
                  <div className="inclusion-why-pod">
                    <CheckCircle2 size={18} className="accent" />
                    <span>Innovation becomes sustainable when built on respect and collaboration.</span>
                  </div>
                </div>
              </div>

              {/* Call to Action in Modal */}
              <div className="career-modal-cta">
                <div>
                  <h4>Ready to be part of innovation shaped by inclusion?</h4>
                  <p>Join Velvora Solutions and help us design the future of content, technology, and digital transformation.</p>
                </div>
                <button
                  type="button"
                  className="btn btn--orange btn--lg"
                  onClick={() => scrollToApply()}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
