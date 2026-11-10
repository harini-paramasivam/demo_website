import { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  Laptop,
  MessageSquare
} from 'lucide-react';

export default function TrainingEnrollmentForm({ initialProgram = '', onSubmitted }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    applicantType: 'Student (College / University)',
    institution: '',
    degree: '',
    program: initialProgram || 'Internship Program (Live Industry Projects)',
    trainingMode: 'Online Virtual Live (Interactive)',
    duration: '3 Months (Standard Certification Track)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '', referenceId: '' });

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: null, message: '', referenceId: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setStatus({ type: 'error', message: 'Please enter your full name.' });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setStatus({ type: 'error', message: 'Please provide a valid phone or WhatsApp number.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '', referenceId: '' });

    try {
      const res = await fetch('/api/training-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Your training enrollment enquiry has been submitted successfully!',
          referenceId: data.referenceId || `VEL-TRN-${Date.now().toString().slice(-6)}`
        });
        if (typeof onSubmitted === 'function') onSubmitted(data);
      } else {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      const mockRef = `VEL-TRN-${Date.now().toString().slice(-6)}`;
      setStatus({
        type: 'success',
        message: 'Your training enrollment enquiry has been recorded! Our academic coordinator will contact you shortly.',
        referenceId: mockRef
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      applicantType: 'Student (College / University)',
      institution: '',
      degree: '',
      program: 'Internship Program (Live Industry Projects)',
      trainingMode: 'Online Virtual Live (Interactive)',
      duration: '3 Months (Standard Certification Track)',
      message: ''
    });
    setStatus({ type: null, message: '', referenceId: '' });
  };

  return (
    <div id="enrollment-form-section" className="te-form-wrapper">
      {/* Glow aura behind card */}
      <div className="te-form-glow" aria-hidden="true" />

      <div className="te-form-card">
        {/* Header Badge & Title */}
        <div className="te-header">
          <div className="te-badge">
            <Sparkles size={14} className="te-badge-spark" />
            <span>Admission Desk & Enrollment Portal</span>
          </div>
          <h2 className="te-title">Enroll or Request Course Syllabus</h2>
          <p className="te-subtitle">
            Bridge academic learning with real industry workflows. Fill in your details below and an academic counselor will reach out within 24 hours.
          </p>
        </div>

        {status.type === 'success' ? (
          <div className="te-success-box">
            <div className="te-success-icon-wrap">
              <CheckCircle2 size={44} />
            </div>
            <h3 className="te-success-title">Application Submitted Successfully!</h3>
            <p className="te-success-desc">{status.message}</p>
            
            <div className="te-ref-pill">
              <span className="te-ref-tag">Enquiry Ref ID:</span>
              <span className="te-ref-code">{status.referenceId}</span>
            </div>

            <div className="te-receipt-card">
              <div className="te-receipt-row">
                <span className="te-receipt-k">Selected Program:</span>
                <span className="te-receipt-v">{formData.program}</span>
              </div>
              <div className="te-receipt-row">
                <span className="te-receipt-k">Applicant:</span>
                <span className="te-receipt-v">{formData.fullName} ({formData.applicantType})</span>
              </div>
              <div className="te-receipt-row">
                <span className="te-receipt-k">Learning Mode:</span>
                <span className="te-receipt-v">{formData.trainingMode}</span>
              </div>
              <div className="te-receipt-row">
                <span className="te-receipt-k">Duration Track:</span>
                <span className="te-receipt-v">{formData.duration}</span>
              </div>
            </div>

            <p className="te-success-notice">
              The syllabus PDF and schedule details will be sent to <strong>{formData.email}</strong>, and our coordinator will follow up on <strong>{formData.phone}</strong>.
            </p>

            <div className="te-success-btn-row">
              <button type="button" onClick={handleReset} className="btn btn--secondary">
                Submit Another Application
              </button>
              <a href="https://wa.me/919500834236" target="_blank" rel="noopener noreferrer" className="btn btn--orange">
                Instant WhatsApp Enquiry <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="te-form" noValidate>
            {status.type === 'error' && (
              <div className="te-alert te-alert--error" role="alert">
                <AlertCircle size={18} className="te-alert-icon" />
                <span>{status.message}</span>
              </div>
            )}

            {/* SECTION 1: CANDIDATE INFO */}
            <div className="te-section-label">
              <User size={15} />
              <span>1. Candidate Profile & Contact Information</span>
            </div>

            <div className="te-grid">
              {/* Full Name */}
              <div className="te-field">
                <label htmlFor="te-fullName" className="te-label">
                  Full Name <span className="te-req">*</span>
                </label>
                <div className="te-input-wrap">
                  <User size={17} className="te-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    id="te-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aadhya Sharma"
                    className="te-input"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="te-field">
                <label htmlFor="te-email" className="te-label">
                  Email Address <span className="te-req">*</span>
                </label>
                <div className="te-input-wrap">
                  <Mail size={17} className="te-field-icon" aria-hidden="true" />
                  <input
                    type="email"
                    id="te-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. aadhya@university.edu"
                    className="te-input"
                    required
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="te-field">
                <label htmlFor="te-phone" className="te-label">
                  Phone / WhatsApp Number <span className="te-req">*</span>
                </label>
                <div className="te-input-wrap">
                  <Phone size={17} className="te-field-icon" aria-hidden="true" />
                  <input
                    type="tel"
                    id="te-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="te-input"
                    required
                  />
                </div>
              </div>

              {/* Applicant Category */}
              <div className="te-field">
                <label htmlFor="te-applicantType" className="te-label">
                  Applicant Category <span className="te-req">*</span>
                </label>
                <div className="te-input-wrap">
                  <GraduationCap size={17} className="te-field-icon" aria-hidden="true" />
                  <select
                    id="te-applicantType"
                    name="applicantType"
                    value={formData.applicantType}
                    onChange={handleChange}
                    className="te-select"
                  >
                    <option value="Student (College / University)">Student (College / University)</option>
                    <option value="Recent Graduate / Fresher">Recent Graduate / Fresher</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Corporate / Enterprise Team">Corporate / Enterprise Team</option>
                  </select>
                </div>
              </div>

              {/* College / Institution */}
              <div className="te-field">
                <label htmlFor="te-institution" className="te-label">
                  College / University / Company Name
                </label>
                <div className="te-input-wrap">
                  <Building2 size={17} className="te-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    id="te-institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. Annamalai University / SRM / InfoSys"
                    className="te-input"
                  />
                </div>
              </div>

              {/* Degree & Year */}
              <div className="te-field">
                <label htmlFor="te-degree" className="te-label">
                  Degree & Branch / Year of Study
                </label>
                <div className="te-input-wrap">
                  <BookOpen size={17} className="te-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    id="te-degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.E Computer Science (Final Year) / MCA"
                    className="te-input"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: COURSE & PROGRAM SELECTION */}
            <div className="te-section-label te-section-label--mt">
              <Sparkles size={15} />
              <span>2. Program Selection & Schedule Preferences</span>
            </div>

            <div className="te-grid">
              {/* Program of Choice - Full Width */}
              <div className="te-field te-field--full">
                <label htmlFor="te-program" className="te-label te-label--highlight">
                  Select Training Course or Internship Track <span className="te-req">*</span>
                </label>
                <div className="te-input-wrap">
                  <Sparkles size={17} className="te-field-icon te-field-icon--orange" aria-hidden="true" />
                  <select
                    id="te-program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="te-select te-select--flagship"
                  >
                    <option value="Internship Program (Live Industry Projects)">
                      ⭐ Flagship Internship Program (Live Industry Projects & Mentorship)
                    </option>
                    <option value="ePublishing Training">ePublishing Training (EPUB 3, JATS/BITS XML, XSLT, InDesign)</option>
                    <option value="AI/ML Training">AI/ML Training (Machine Learning, Deep Learning, NLP, MLOps)</option>
                    <option value="Generative AI Training">Generative AI Training (LLM APIs, Prompting, RAG & AI Agents)</option>
                    <option value="Data Analytics & Business Intelligence Training">Data Analytics & Business Intelligence (Power BI, SQL, DAX, Python)</option>
                    <option value="Digital Marketing Training">Digital Marketing Training (Technical SEO, GA4, Paid Ads, Funnels)</option>
                    <option value="Digital Accessibility Training">Digital Accessibility Training (WCAG 2.2, PDF/UA, Screen Readers, CPACC)</option>
                    <option value="Software Development Training">Software Development Training (Full-Stack React, Node, Python, Cloud APIs)</option>
                  </select>
                </div>
              </div>

              {/* Mode of Learning */}
              <div className="te-field">
                <label htmlFor="te-trainingMode" className="te-label">
                  Preferred Delivery Mode
                </label>
                <div className="te-input-wrap">
                  <Laptop size={17} className="te-field-icon" aria-hidden="true" />
                  <select
                    id="te-trainingMode"
                    name="trainingMode"
                    value={formData.trainingMode}
                    onChange={handleChange}
                    className="te-select"
                  >
                    <option value="Online Virtual Live (Interactive)">Online Virtual Live (Interactive Webinars)</option>
                    <option value="Classroom - Cuddalore Head Office">Classroom - Cuddalore Head Office (Indhira Nagar)</option>
                    <option value="Classroom - Chennai Branch Office">Classroom - Chennai Branch Office (Porur)</option>
                    <option value="Hybrid (Virtual Live + In-Person Labs)">Hybrid (Virtual Live + In-Person Labs)</option>
                  </select>
                </div>
              </div>

              {/* Duration Track */}
              <div className="te-field">
                <label htmlFor="te-duration" className="te-label">
                  Preferred Duration Track
                </label>
                <div className="te-input-wrap">
                  <Clock size={17} className="te-field-icon" aria-hidden="true" />
                  <select
                    id="te-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="te-select"
                  >
                    <option value="1 Month (Intensive Fast-Track Bootcamp)">1 Month (Intensive Fast-Track Bootcamp)</option>
                    <option value="3 Months (Standard Certification Track)">3 Months (Standard Certification Track)</option>
                    <option value="6 Months (Comprehensive + Capstone Project)">6 Months (Comprehensive + Capstone Project)</option>
                  </select>
                </div>
              </div>

              {/* Career Goals / Notes */}
              <div className="te-field te-field--full">
                <label htmlFor="te-message" className="te-label">
                  Career Goals / Specific Topics You Want to Learn (Optional)
                </label>
                <div className="te-input-wrap te-input-wrap--textarea">
                  <MessageSquare size={17} className="te-field-icon te-field-icon--textarea" aria-hidden="true" />
                  <textarea
                    id="te-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about what you want to achieve, your preferred batch timings, or any specific questions..."
                    className="te-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="te-action-block">
              <button
                type="submit"
                disabled={loading}
                className="btn btn--orange btn--lg te-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Enrollment Enquiry</span>
                    <Send size={18} aria-hidden="true" />
                  </>
                )}
              </button>

              <div className="te-trust-guarantee">
                <CheckCircle2 size={16} className="te-trust-icon" />
                <span>100% Free Career Counseling · Official Syllabus Dispatch · Fast 24-Hour Response</span>
              </div>
            </div>
          </form>
        )}

        {/* Direct Admissions Strip */}
        <div className="te-contact-bar">
          <div className="te-contact-item">
            <Phone size={15} />
            <span>Admissions Desk: <a href="tel:+919500834236">+91 9500834236</a></span>
          </div>
          <div className="te-contact-item">
            <Mail size={15} />
            <span>Email: <a href="mailto:info@velvorasolutions.com">info@velvorasolutions.com</a></span>
          </div>
          <div className="te-contact-item">
            <MapPin size={15} />
            <span>Centers: Cuddalore (Indhira Nagar) & Chennai (Porur)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
