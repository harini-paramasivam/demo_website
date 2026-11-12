import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Send, 
  UploadCloud, 
  Paperclip, 
  Check, 
  Share2, 
  Building2, 
  AlertCircle,
  HelpCircle,
  CheckCircle
} from 'lucide-react';
import { careersJobs } from '../data/careersData.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

export default function JobDetailPage() {
  const { jobId } = useParams();
  const applyFormRef = useRef(null);

  const job = careersJobs.find((j) => j.id === jobId) || careersJobs[0];
  const otherJobs = careersJobs.filter((j) => j.id !== job?.id);

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '1 - 3 Years',
    portfolio: '',
    resumeFile: null,
    resumeName: '',
    resumeSize: '',
    message: '',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (job) {
      document.title = `${job.title} | Careers at Velvora Solutions`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [job, jobId]);

  const scrollToApply = () => {
    if (applyFormRef.current) {
      const headerOffset = 110;
      const elementPosition = applyFormRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        role: job.title,
        jobId: job.id,
        portfolio: formData.portfolio || 'Not Provided',
        resumeName: formData.resumeName || 'Attached in email / on file',
        message: formData.message || `Direct application submitted for ${job.title}`,
      };

      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Application could not be delivered. Please email info@velvorasolutions.com');
      }

      setApplicationSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Position Not Found</h2>
        <p>The job opening you are looking for has been filled or updated.</p>
        <Link to="/careers" className="btn btn--orange" style={{ marginTop: '20px' }}>
          Explore Current Openings
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={`Careers · ${job.department}`}
        title={job.title}
        crumbs={['Home', 'Careers', job.title]}
      >
        {job.shortSummary}
      </PageHero>

      {/* JOB BANNER BAR */}
      <section className="job-meta-bar" aria-label="Job metadata and quick apply">
        <div className="container">
          <div className="job-meta-bar__inner">
            <Link to="/careers" className="job-back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to All Openings</span>
            </Link>

            <div className="job-meta-pills">
              <span className="job-meta-pill">
                <Briefcase size={14} className="job-meta-pill__icon" />
                <span>{job.type}</span>
              </span>
              <span className="job-meta-pill">
                <MapPin size={14} className="job-meta-pill__icon" />
                <span>{job.location}</span>
              </span>
              <span className="job-meta-pill">
                <Clock size={14} className="job-meta-pill__icon" />
                <span>{job.experience}</span>
              </span>
              <span className="job-meta-pill">
                <Calendar size={14} className="job-meta-pill__icon" />
                <span>Posted: {job.postedDate}</span>
              </span>
            </div>

            <button type="button" onClick={scrollToApply} className="btn btn--orange job-meta-apply-btn">
              <span>Apply for this Role</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* JOB DETAIL MAIN CONTENT */}
      <section className="section section--paper job-detail-section">
        <div className="container">
          <div className="job-detail-layout">
            {/* LEFT MAIN COLUMN: DETAILED JD */}
            <main className="job-detail-main">
              {/* 1. ROLE OVERVIEW */}
              <article className="job-detail-card">
                <div className="job-detail-section-head">
                  <span className="job-detail-icon-box job-detail-icon-box--blue">
                    <Sparkles size={18} />
                  </span>
                  <h2 className="job-detail-section-title">Role Overview & Strategic Impact</h2>
                </div>
                <div className="job-detail-prose">
                  {job.fullOverview.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </article>

              {/* 2. KEY RESPONSIBILITIES */}
              <article className="job-detail-card" style={{ marginTop: '24px' }}>
                <div className="job-detail-section-head">
                  <span className="job-detail-icon-box job-detail-icon-box--cyan">
                    <CheckCircle2 size={18} />
                  </span>
                  <h2 className="job-detail-section-title">Key Responsibilities</h2>
                </div>
                <ul className="job-checklist">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="job-check-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 3. REQUIRED QUALIFICATIONS */}
              <article className="job-detail-card" style={{ marginTop: '24px' }}>
                <div className="job-detail-section-head">
                  <span className="job-detail-icon-box job-detail-icon-box--emerald">
                    <Award size={18} />
                  </span>
                  <h2 className="job-detail-section-title">Required Qualifications &amp; Experience</h2>
                </div>
                <ul className="job-checklist">
                  {job.requirements.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="job-check-icon job-check-icon--emerald" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 4. PREFERRED / BONUS SKILLS */}
              {job.preferredSkills && (
                <article className="job-detail-card" style={{ marginTop: '24px' }}>
                  <div className="job-detail-section-head">
                    <span className="job-detail-icon-box job-detail-icon-box--purple">
                      <Sparkles size={18} />
                    </span>
                    <h2 className="job-detail-section-title">Preferred &amp; Bonus Skills</h2>
                  </div>
                  <ul className="job-checklist">
                    {job.preferredSkills.map((item, idx) => (
                      <li key={idx}>
                        <Check size={16} className="job-check-icon job-check-icon--purple" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {/* 5. WHAT WE OFFER */}
              <article className="job-detail-card" style={{ marginTop: '24px' }}>
                <div className="job-detail-section-head">
                  <span className="job-detail-icon-box job-detail-icon-box--orange">
                    <Award size={18} />
                  </span>
                  <h2 className="job-detail-section-title">What Velvora Solutions Offers You</h2>
                </div>
                <ul className="job-checklist">
                  {job.whatWeOffer.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="job-check-icon job-check-icon--orange" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 6. DIRECT APPLICATION FORM CARD */}
              <article ref={applyFormRef} id="apply-now" className="job-apply-card" style={{ marginTop: '36px' }}>
                <div className="job-apply-card__head">
                  <span className="pill"><i /> Direct Application</span>
                  <h2 className="job-apply-card__title">Apply for: {job.title}</h2>
                  <p className="job-apply-card__desc">
                    Complete the application below. Our talent acquisition team will review your qualifications and respond within 2 business days.
                  </p>
                </div>

                {applicationSubmitted ? (
                  <div className="job-apply-success">
                    <div className="job-apply-success__icon">
                      <CheckCircle size={44} />
                    </div>
                    <h3>Application Submitted Successfully!</h3>
                    <p>
                      Thank you for applying for the <strong>{job.title}</strong> role at Velvora Solutions. A confirmation has been logged with our talent acquisition team.
                    </p>
                    <Link to="/careers" className="btn btn--outline" style={{ marginTop: '16px' }}>
                      Explore Other Openings
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="job-apply-form">
                    {errorMessage && (
                      <div className="job-apply-error">
                        <AlertCircle size={18} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="applicant-name">
                          Full Name <span className="req">*</span>
                        </label>
                        <input
                          id="applicant-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your complete legal name"
                          className="contact-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="applicant-email">
                          Email Address <span className="req">*</span>
                        </label>
                        <input
                          id="applicant-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="applicant-phone">
                          Phone / WhatsApp Number <span className="req">*</span>
                        </label>
                        <input
                          id="applicant-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="contact-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="applicant-location">
                          Current City / Location <span className="req">*</span>
                        </label>
                        <input
                          id="applicant-location"
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Cuddalore, Chennai, Pondicherry"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="applicant-exp">
                          Total Relevant Experience <span className="req">*</span>
                        </label>
                        <select
                          id="applicant-exp"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="contact-select"
                        >
                          <option value="0 - 1 Years (Entry Level)">0 - 1 Years (Entry Level / Fresher)</option>
                          <option value="1 - 3 Years">1 - 3 Years (Junior / Mid-Level)</option>
                          <option value="3 - 5 Years">3 - 5 Years (Mid-Senior)</option>
                          <option value="5+ Years">5+ Years (Senior / Lead)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="applicant-portfolio">
                          LinkedIn or Portfolio URL (Optional)
                        </label>
                        <input
                          id="applicant-portfolio"
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Box */}
                    <div className="form-group">
                      <label>
                        Upload Resume / CV (PDF, DOCX) <span className="req">*</span>
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                      />
                      <div 
                        className="job-upload-box"
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                      >
                        <UploadCloud size={28} className="job-upload-icon" />
                        {formData.resumeName ? (
                          <div className="job-upload-file-badge">
                            <Paperclip size={15} />
                            <strong>{formData.resumeName}</strong>
                            <span>({formData.resumeSize})</span>
                          </div>
                        ) : (
                          <div>
                            <strong>Click to browse resume</strong> or drag and drop file here
                            <span>PDF or Word format (Max 10MB)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Note */}
                    <div className="form-group">
                      <label htmlFor="applicant-message">
                        Brief Cover Note / Why You are a Great Fit
                      </label>
                      <textarea
                        id="applicant-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your relevant projects, publishing background, or technical interests..."
                        className="contact-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--orange btn--lg btn--block"
                    >
                      <span>{isSubmitting ? 'Submitting Application...' : `Submit Application for ${job.title}`}</span>
                      <Send size={18} aria-hidden="true" />
                    </button>
                  </form>
                )}
              </article>
            </main>

            {/* RIGHT SIDEBAR: QUICK SUMMARY & OTHER ROLES */}
            <aside className="job-detail-sidebar" aria-label="Job highlights and other openings">
              {/* SUMMARY CARD */}
              <div className="job-sidebar-card">
                <span className="job-sidebar-title">Position Summary</span>
                <div className="job-sidebar-specs">
                  <div className="job-spec-row">
                    <span className="job-spec-label">Department</span>
                    <strong className="job-spec-val">{job.department}</strong>
                  </div>
                  <div className="job-spec-row">
                    <span className="job-spec-label">Employment</span>
                    <strong className="job-spec-val">{job.type}</strong>
                  </div>
                  <div className="job-spec-row">
                    <span className="job-spec-label">Location</span>
                    <strong className="job-spec-val">{job.location}</strong>
                  </div>
                  <div className="job-spec-row">
                    <span className="job-spec-label">Experience</span>
                    <strong className="job-spec-val">{job.experience}</strong>
                  </div>
                  <div className="job-spec-row">
                    <span className="job-spec-label">Posted</span>
                    <strong className="job-spec-val">{job.postedDate}</strong>
                  </div>
                </div>

                <button type="button" onClick={scrollToApply} className="btn btn--orange btn--block" style={{ marginTop: '20px' }}>
                  <span>Apply Now</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <button type="button" onClick={handleCopyLink} className="job-share-btn" style={{ marginTop: '12px' }}>
                  <Share2 size={15} />
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share this Position'}</span>
                </button>
              </div>

              {/* OTHER OPEN ROLES */}
              <div className="job-sidebar-card" style={{ marginTop: '24px' }}>
                <span className="job-sidebar-title">Other Open Positions ({otherJobs.length})</span>
                <div className="job-other-list">
                  {otherJobs.map((oj) => (
                    <Link key={oj.id} to={`/careers/${oj.id}`} className="job-other-item">
                      <div>
                        <strong>{oj.title}</strong>
                        <span>{oj.department}</span>
                      </div>
                      <ArrowRight size={14} className="job-other-arrow" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <Link to="/careers" className="job-view-all-link">
                  <span>View All Openings &amp; Culture</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CLOSING CTA BAND */}
      <CtaBand
        title="Have Questions About this Role or the Hiring Process?"
        text="Our talent acquisition team is available to assist you. Contact us directly at info@velvorasolutions.com."
        primaryBtnText="Contact Talent Team"
        primaryBtnTo="/contact"
      />
    </>
  );
}
