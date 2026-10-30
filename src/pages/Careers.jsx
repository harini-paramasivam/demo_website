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
  UploadCloud,
  Paperclip,
  Globe,
  Quote,
  Target,
  Users,
  Compass,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

const jobOpenings = [
  {
    id: 'copy-editing-specialist',
    title: 'Copy Editing Specialist',
    department: 'Editorial & Quality Assurance',
    type: 'Full-Time / Hybrid',
    location: 'Cuddalore, TN / Hybrid',
    summary: 'Review and refine content for accuracy, clarity, and consistency across academic and enterprise publications.',
    responsibilities: [
      'Review and refine content for accuracy, clarity, and consistency.',
      'Ensure adherence to publishing standards and client style guides (APA, Chicago, MLA, etc.).',
      'Collaborate with content, design, and accessibility teams to guarantee editorial excellence.',
    ],
    requirements: [
      'Strong command of English grammar, syntax, and publishing style guides.',
      'Experience in academic, technical, or corporate editing.',
      'Exceptional attention to detail and ability to meet project deadlines.',
    ],
  },
  {
    id: 'ppt-accessibility-specialist',
    title: 'PPT Accessibility Specialist',
    department: 'Digital Accessibility',
    type: 'Full-Time / Hybrid',
    location: 'Cuddalore, TN / Hybrid',
    summary: 'Remediate PowerPoint presentations to conform to WCAG 2.2, PDF/UA, and Section 508 standards.',
    responsibilities: [
      'Remediate PowerPoint files to meet accessibility standards (WCAG 2.2, Section 508).',
      'Add meaningful alt text, proper reading order in selection panes, and accessible slide formatting.',
      'Collaborate with clients and internal teams to deliver fully inclusive presentation decks.',
    ],
    requirements: [
      'Knowledge of accessibility guidelines (WCAG, Section 508) and assistive technologies (JAWS, NVDA).',
      'Hands‑on experience with accessible document remediation and slide design.',
      'Strong communication, problem‑solving skills, and empathy for diverse users.',
    ],
  },
  {
    id: 'typesetting-specialist',
    title: 'Typesetting Specialist',
    department: 'Publishing Production',
    type: 'Full-Time / Hybrid',
    location: 'Cuddalore, TN / Hybrid',
    summary: 'Format and design manuscripts, journals, and books for print and multi-format digital publishing.',
    responsibilities: [
      'Format and design manuscripts, journals, and books for digital and print publishing.',
      'Apply consistent styles, layouts, and templates across large volumes of complex content.',
      'Ensure compliance with publishing standards (EPUB 3, JATS/BITS XML, PDF).',
    ],
    requirements: [
      'Hands-on experience with typesetting tools (InDesign, LaTeX, MathML, or XML workflows).',
      'Strong eye for typography, layout design, grid structure, and detail.',
      'Ability to manage multiple concurrent titles and meet delivery schedules.',
    ],
  },
  {
    id: 'ai-automation-engineer',
    title: 'AI & Automation Engineer',
    department: 'Engineering & Innovation',
    type: 'Full-Time / Hybrid',
    location: 'Cuddalore, TN / Hybrid',
    summary: 'Build intelligent workflow pipelines using Python, NLP, and modern LLMs to accelerate content publishing.',
    responsibilities: [
      'Architect AI pipelines that parse, remediate, and validate complex publication manuscripts.',
      'Develop automated quality gates for XML and EPUB conversion pipelines.',
      'Collaborate across cross-disciplinary teams to integrate generative AI safely and accurately.',
    ],
    requirements: [
      'Proficiency with Python, API integration, and machine learning/NLP concepts.',
      'Interest in accessibility standards and automated document processing.',
      'Strong problem-solving and proactive debugging abilities.',
    ],
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState('Copy Editing Specialist');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [growthModalOpen, setGrowthModalOpen] = useState(false);
  const [inclusionModalOpen, setInclusionModalOpen] = useState(false);

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

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const applySectionRef = useRef(null);

  useEffect(() => {
    document.title = 'Careers at Velvora Solutions | Build Skills. Create Impact. Shape the Future.';
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

  const scrollToApply = (jobTitle = '') => {
    if (jobTitle) {
      setSelectedJob(jobTitle);
      setFormData((prev) => ({ ...prev, role: jobTitle }));
    }
    setGrowthModalOpen(false);
    setInclusionModalOpen(false);
    if (applySectionRef.current) {
      const topOffset = applySectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
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
            <a href="#philosophy" className="career-jump-btn">
              <span>Our Philosophy</span>
            </a>
            <a href="#grow-framework" className="career-jump-btn">
              <span>G.R.O.W. Framework</span>
            </a>
            <a href="#inclusion" className="career-jump-btn">
              <span>Inclusion &amp; Innovation</span>
            </a>
            <a href="#why-join" className="career-jump-btn">
              <span>Why Join Us?</span>
            </a>
            <a href="#quality-framework" className="career-jump-btn">
              <span>Quality Framework</span>
            </a>
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

      {/* 2. OUR PHILOSOPHY & CAREER FRAMEWORK: G.R.O.W. */}
      <section id="philosophy" className="section career-philosophy-section">
        <div className="container">
          {/* Philosophy Banner */}
          <div className="career-philosophy-card reveal">
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

          {/* G.R.O.W. Cards */}
          <div id="grow-framework" className="career-grow-header" style={{ marginTop: '4rem' }}>
            <span className="pill"><i /> Career Progression</span>
            <h2 className="career-section-h2">Our Career Framework: G.R.O.W.</h2>
            <p className="lead" style={{ color: '#cbd5e1', fontSize: '1.18rem', lineHeight: 1.7, maxWidth: '68ch' }}>
              A structured roadmap designed to support your development from day one through continuous milestones.
            </p>
          </div>

          <div className="career-grow-grid">
            <div className="grow-pod">
              <div className="grow-pod__icon-wrap">
                <TrendingUp size={24} />
              </div>
              <h3 className="grow-pod__title">Growth</h3>
              <p className="grow-pod__desc">
                Continuous learning and skill development through training, mentorship, and global exposure.
              </p>
            </div>

            <div className="grow-pod">
              <div className="grow-pod__icon-wrap">
                <HeartHandshake size={24} />
              </div>
              <h3 className="grow-pod__title">Respect</h3>
              <p className="grow-pod__desc">
                Valuing every perspective, background, and contribution across our teams.
              </p>
            </div>

            <div className="grow-pod">
              <div className="grow-pod__icon-wrap">
                <Rocket size={24} />
              </div>
              <h3 className="grow-pod__title">Opportunity</h3>
              <p className="grow-pod__desc">
                Equal chances to innovate in publishing, web development, software, AI, and marketing.
              </p>
            </div>

            <div className="grow-pod">
              <div className="grow-pod__icon-wrap">
                <ShieldCheck size={24} />
              </div>
              <h3 className="grow-pod__title">Well‑being</h3>
              <p className="grow-pod__desc">
                A supportive environment that balances professional success with personal health.
              </p>
            </div>
          </div>

          {/* Learn More Button for G.R.O.W.T.H. */}
          <div className="career-framework-btn-wrap">
            <button
              type="button"
              onClick={() => setGrowthModalOpen(true)}
              className="btn btn--orange btn--lg career-glow-btn"
            >
              <span>Learn More About Our Framework: G.R.O.W.T.H.</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. INCLUSION & INNOVATION */}
      <section id="inclusion" className="section section--paper career-inclusion-section">
        <div className="container">
          <div className="career-inclusion-box reveal">
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
      <section id="why-join" className="section why-section-dark netbg">
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
              <div className="why-join-card__num">01</div>
              <h3 className="why-join-card__title">Universal Impact</h3>
              <p className="why-join-card__text">
                Work on projects that make content accessible to millions worldwide.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__num">02</div>
              <h3 className="why-join-card__title">Modern Engineering</h3>
              <p className="why-join-card__text">
                Build modern websites, applications, and digital solutions that transform industries.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__num">03</div>
              <h3 className="why-join-card__title">Specialist Collaboration</h3>
              <p className="why-join-card__text">
                Collaborate with a team of specialists passionate about publishing, technology, and marketing.
              </p>
            </div>

            <div className="why-join-card">
              <div className="why-join-card__num">04</div>
              <h3 className="why-join-card__title">Cutting-Edge Tech</h3>
              <p className="why-join-card__text">
                Gain exposure to cutting‑edge AI workflows, data analytics, and global standards.
              </p>
            </div>

            <div className="why-join-card why-join-card--wide">
              <div className="why-join-card__num">05</div>
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

      {/* 5. MESSAGE TO OUR TEAM: CLIENTS COME FIRST */}
      <section className="section client-charter-section">
        <div className="container">
          <div className="client-charter-card reveal">
            <div className="client-charter-card__header">
              <div className="client-charter-badge">
                <Target size={16} /> Internal Culture Charter
              </div>
              <h2 className="career-section-h2" style={{ color: '#fff' }}>
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
        </div>
      </section>

      {/* 6. DELIVERING QUALITY WORK: OUR FRAMEWORK */}
      <section id="quality-framework" className="section why-section-dark netbg quality-framework-section">
        <div className="container">
          <div className="career-panel-header text-center">
            <span className="pill"><i /> Delivery Lifecycle</span>
            <h2 className="career-section-h2">Delivering Quality Work: Our Framework</h2>
            <p className="lead" style={{ maxWidth: '64ch', margin: '0 auto' }}>
              How our teams guarantee precision, compliance, and excellence on every single engagement.
            </p>
          </div>

          <div className="quality-steps-grid">
            <div className="quality-step-card">
              <div className="quality-step-card__num">01</div>
              <h3 className="quality-step-card__title">Understand the Client’s Vision</h3>
              <ul className="quality-step-card__list">
                <li>Begin with clear requirements gathering.</li>
                <li>Ask the right questions to uncover hidden needs.</li>
                <li>Align project goals with client expectations.</li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__num">02</div>
              <h3 className="quality-step-card__title">Plan with Precision</h3>
              <ul className="quality-step-card__list">
                <li>Break down tasks into achievable milestones.</li>
                <li>Assign responsibilities clearly.</li>
                <li>Use project management tools to track progress.</li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__num">03</div>
              <h3 className="quality-step-card__title">Execute with Excellence</h3>
              <ul className="quality-step-card__list">
                <li>Apply technical expertise (content, web/software, AI, analytics, marketing).</li>
                <li>Follow industry standards (WCAG, PDF/UA, SEO best practices, coding guidelines).</li>
                <li>Double‑check outputs with human + automated quality checks.</li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__num">04</div>
              <h3 className="quality-step-card__title">Communicate Transparently</h3>
              <ul className="quality-step-card__list">
                <li>Provide regular updates to clients.</li>
                <li>Share progress reports and timelines.</li>
                <li>Be proactive about challenges and solutions.</li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__num">05</div>
              <h3 className="quality-step-card__title">Test and Validate</h3>
              <ul className="quality-step-card__list">
                <li>Run accessibility, functionality, and performance checks.</li>
                <li>Validate against client requirements before delivery.</li>
                <li>Ensure compliance with global standards.</li>
              </ul>
            </div>

            <div className="quality-step-card">
              <div className="quality-step-card__num">06</div>
              <h3 className="quality-step-card__title">Deliver and Support</h3>
              <ul className="quality-step-card__list">
                <li>Deliver on time, with complete documentation.</li>
                <li>Offer post‑delivery support and training if needed.</li>
                <li>Gather feedback to improve future projects.</li>
              </ul>
            </div>
          </div>

          {/* What Else We Should Do for Quality Projects */}
          <div className="quality-extra-box reveal">
            <h3 className="quality-extra-box__title">
              <Lightbulb size={20} className="accent" />
              <span>What Else We Should Do for Quality Projects</span>
            </h3>
            <div className="quality-extra-grid">
              <div className="quality-extra-pod">
                <strong>Continuous Learning</strong>
                <p>Keep the team updated on new standards, tools, and technologies.</p>
              </div>
              <div className="quality-extra-pod">
                <strong>Client Feedback Loop</strong>
                <p>Actively collect and act on client feedback to refine deliverable quality.</p>
              </div>
              <div className="quality-extra-pod">
                <strong>Innovation Culture</strong>
                <p>Encourage experimenting with AI, automation, and analytics to improve workflows.</p>
              </div>
              <div className="quality-extra-pod">
                <strong>Internal Audits</strong>
                <p>Regularly review processes to ensure consistency and operational excellence.</p>
              </div>
              <div className="quality-extra-pod">
                <strong>Celebrate Success</strong>
                <p>Recognize team members who go above and beyond for quality delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CURRENT OPENINGS & APPLICATION FORM */}
      <section ref={applySectionRef} id="apply-section" className="section career-apply-section">
        <div className="container">
          <div className="career-panel-header text-center">
            <span className="pill"><i /> Join Our Team</span>
            <h2 className="career-section-h2">Explore Current Openings &amp; Apply</h2>
            <p className="lead" style={{ color: '#cbd5e1', maxWidth: '64ch', margin: '0 auto' }}>
              Find your next role with Velvora Solutions. Select an opening or submit an open application below.
            </p>
          </div>

          {/* JOB OPENINGS LIST */}
          <div className="job-openings-grid">
            {jobOpenings.map((job) => (
              <article key={job.id} className="job-opening-card">
                <div className="job-opening-card__head">
                  <div>
                    <span className="job-opening-card__dept">{job.department}</span>
                    <h3 className="job-opening-card__title">{job.title}</h3>
                  </div>
                  <span className="job-opening-card__type">{job.type}</span>
                </div>

                <p className="job-opening-card__summary">{job.summary}</p>

                <div className="job-opening-card__meta">
                  <span><MapPin size={14} /> {job.location}</span>
                </div>

                <div className="job-opening-card__details">
                  <div className="job-col">
                    <strong>Key Responsibilities:</strong>
                    <ul>
                      {job.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="job-col">
                    <strong>Requirements:</strong>
                    <ul>
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="job-opening-card__action">
                  <button
                    type="button"
                    className="btn btn--orange"
                    onClick={() => {
                      setSelectedJob(job.title);
                      setFormData((prev) => ({ ...prev, role: job.title }));
                      const formEl = document.getElementById('careers-application-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* APPLICATION FORM WITH FILE UPLOAD & BROWSER URL */}
          <div id="careers-application-form" className="career-application-wrapper">
            <div className="career-apply-card">
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
                  <p>
                    Thank you for applying, <strong>{formData.name}</strong>. Our talent team will review your application for the <strong>{formData.role}</strong> position and reach out within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationSubmitted(false);
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
                    }}
                    className="btn btn--outline"
                    style={{ marginTop: '1rem' }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form className="career-form" onSubmit={handleFormSubmit}>
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
                        className="contact-input"
                      />
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
                        className="contact-input"
                      />
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
                        className="contact-input"
                      />
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
                        className="contact-input"
                      />
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
                        className="contact-input"
                      />
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

                  <button type="submit" className="btn btn--orange btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Submit Application</span>
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
      {/* MODAL 1: LEARN MORE ABOUT OUR FRAMEWORK: G.R.O.W.T.H. */}
      {/* ========================================================================= */}
      {growthModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setGrowthModalOpen(false)}>
          <div 
            className="career-modal-dialog" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="growth-modal-title"
          >
            <div className="career-modal-header">
              <div>
                <span className="badge-eyebrow">
                  <TrendingUp size={16} /> Detailed Blueprint
                </span>
                <h2 id="growth-modal-title" className="career-modal-title">
                  Learn More About Our Framework: G.R.O.W.T.H.
                </h2>
              </div>
              <button
                type="button"
                className="career-modal-close"
                onClick={() => setGrowthModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="career-modal-body">
              <div className="career-modal-intro-card">
                <p>
                  At Velvora Solutions, we believe careers thrive when people can achieve <strong>G.R.O.W.T.H.</strong> — a holistic journey that blends skill development, respect, opportunity, well‑being, transformation, and honesty.
                </p>
              </div>

              <div className="growth-pillars-list">
                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">G</div>
                  <div className="growth-pillar-item__content">
                    <h3>Growth</h3>
                    <ul>
                      <li>Structured training programs in publishing, web/software, AI, and analytics.</li>
                      <li>Global exposure through cross‑border projects and industry collaborations.</li>
                      <li>Mentorship from experienced leaders who guide career paths.</li>
                      <li>Access to certifications, workshops, and online learning platforms.</li>
                    </ul>
                  </div>
                </div>

                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">R</div>
                  <div className="growth-pillar-item__content">
                    <h3>Respect</h3>
                    <ul>
                      <li>Every perspective, background, and contribution is valued.</li>
                      <li>Open communication channels encourage ideas from all levels.</li>
                      <li>Diversity is celebrated, ensuring teams reflect global voices.</li>
                      <li>Recognition programs highlight individual and team achievements.</li>
                    </ul>
                  </div>
                </div>

                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">O</div>
                  <div className="growth-pillar-item__content">
                    <h3>Opportunity</h3>
                    <ul>
                      <li>Equal chances to innovate in publishing, web/software, AI, analytics, and marketing.</li>
                      <li>Career mobility across multiple domains.</li>
                      <li>Internal innovation challenges to encourage experimentation.</li>
                      <li>Leadership tracks for those ready to take on bigger responsibilities.</li>
                    </ul>
                  </div>
                </div>

                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">W</div>
                  <div className="growth-pillar-item__content">
                    <h3>Well‑being</h3>
                    <ul>
                      <li>Flexible work arrangements to support personal and professional life.</li>
                      <li>Health and wellness initiatives, including counseling and fitness programs.</li>
                      <li>A supportive environment that prioritizes mental health.</li>
                      <li>Celebrations, team‑building, and recognition events to keep morale high.</li>
                    </ul>
                  </div>
                </div>

                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">T</div>
                  <div className="growth-pillar-item__content">
                    <h3>Transformation</h3>
                    <ul>
                      <li>Career transitions supported by mentorship (e.g., content → AI automation).</li>
                      <li>Opportunities to reskill and upskill with emerging technologies.</li>
                      <li>Exposure to global projects that reshape industries.</li>
                    </ul>
                  </div>
                </div>

                <div className="growth-pillar-item">
                  <div className="growth-pillar-item__badge">H</div>
                  <div className="growth-pillar-item__content">
                    <h3>Honesty</h3>
                    <ul>
                      <li>Transparent communication with clients and colleagues.</li>
                      <li>Integrity in every project delivery.</li>
                      <li>Ethical practices that build long‑term trust.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Employee Growth Stories */}
              <div className="growth-stories-section">
                <h3 className="growth-stories-title">
                  <Sparkles size={20} className="accent" />
                  <span>Employee Growth Stories</span>
                </h3>
                <div className="growth-stories-grid">
                  <div className="growth-story-card">
                    <Quote size={20} className="accent" />
                    <p>A content specialist who transitioned into AI automation through mentorship.</p>
                  </div>
                  <div className="growth-story-card">
                    <Quote size={20} className="accent" />
                    <p>A developer who grew into a project lead by taking part in innovation challenges.</p>
                  </div>
                  <div className="growth-story-card">
                    <Quote size={20} className="accent" />
                    <p>A marketing analyst who expanded into global strategy roles after training programs.</p>
                  </div>
                </div>
                <p className="growth-stories-promise">
                  These journeys show that <strong>G.R.O.W.T.H.</strong> is more than a framework — it’s a promise of transformation.
                </p>
              </div>

              {/* Call to Action in Modal */}
              <div className="career-modal-cta">
                <div>
                  <h4>Ready to grow with us?</h4>
                  <p>Explore opportunities at Velvora Solutions and be part of a workplace where your skills, ideas, and well‑being matter.</p>
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

      {/* ========================================================================= */}
      {/* MODAL 2: OUR INCLUSIVE INNOVATION STORIES */}
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
