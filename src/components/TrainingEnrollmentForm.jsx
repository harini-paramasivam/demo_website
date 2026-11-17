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
    program: initialProgram || 'Internship Program (Live Industry Projects)',
    trainingMode: 'Online Virtual Live (Interactive)',
    duration: '3 Months (Standard Certification Track)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '', referenceId: '' });

  useEffect(() => {
    if (initialProgram) {
      const target = initialProgram.toLowerCase();
      let matchedVal = initialProgram;
      if (target.includes('internship')) matchedVal = 'Internship Program (Live Industry Projects)';
      else if (target.includes('epublishing')) matchedVal = 'ePublishing Training';
      else if (target.includes('generative')) matchedVal = 'Generative AI Training';
      else if (target.includes('ai') || target.includes('ml')) matchedVal = 'AI/ML Training';
      else if (target.includes('analytics') || target.includes('bi')) matchedVal = 'Data Analytics & Business Intelligence Training';
      else if (target.includes('accessibility')) matchedVal = 'Digital Accessibility Training';
      else if (target.includes('software')) matchedVal = 'Software Development Training';
      else if (target.includes('marketing')) matchedVal = 'Digital Marketing Training';

      setFormData((prev) => ({ ...prev, program: matchedVal }));
    }
  }, [initialProgram]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: null, message: '', referenceId: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.fullName.trim() || !/^[a-zA-Z\s.'-]{2,60}$/.test(formData.fullName.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid full name (letters and spaces only, 2–60 characters).' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      setStatus({ type: 'error', message: 'Please provide a valid email address (e.g. name@domain.com).' });
      return;
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || !/^\+?[0-9\s\-()]{8,20}$/.test(formData.phone.trim()) || phoneDigits.length < 8 || phoneDigits.length > 15) {
      setStatus({ type: 'error', message: 'Please provide a valid phone or WhatsApp number (8–15 digits, e.g. +91 98765 43210).' });
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

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Your training enrollment enquiry has been submitted successfully! An automated confirmation email has been sent to your registered email address.',
          referenceId: data.referenceId || `VEL-TRN-${Date.now().toString().slice(-6)}`
        });
        if (typeof onSubmitted === 'function') onSubmitted(data);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong while submitting your application. Please try again or reach out to us directly.'
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
      program: 'Internship Program (Live Industry Projects)',
      trainingMode: 'Online Virtual Live (Interactive)',
      duration: '3 Months (Standard Certification Track)',
      message: ''
    });
    setStatus({ type: null, message: '', referenceId: '' });
  };

  return (
    <div id="enrollment-form-section" className="te-form-wrapper" style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      <div className="te-form-card" style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        boxShadow: '0 10px 36px rgba(15, 23, 42, 0.06)',
        position: 'relative'
      }}>
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.28)',
            borderRadius: '9999px',
            padding: '6px 16px',
            fontSize: '0.82rem',
            fontWeight: 750,
            color: '#0284c7',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            <Sparkles size={14} />
            <span>Admissions Desk &amp; Enrollment Portal</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, color: '#070f26', margin: '0 0 10px' }}>
            Enroll or Request Course Syllabus
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Bridge academic theory with real industry workflows. Fill in your details below and an academic counselor will connect with you within 24 hours.
          </p>
        </div>

        {status.type === 'success' ? (
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '18px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(2, 132, 199, 0.1)',
              border: '2px solid #0284c7',
              color: '#0284c7',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 18px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#070f26', marginBottom: '10px' }}>
              Application Submitted Successfully!
            </h3>
            <p style={{ color: '#475569', fontSize: '1.02rem', maxWidth: '540px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              {status.message}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(2, 132, 199, 0.28)',
              borderRadius: '9999px',
              marginBottom: '24px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Enquiry Ref ID:</span>
              <strong style={{ fontSize: '1.05rem', color: '#0284c7', letterSpacing: '0.04em' }}>{status.referenceId}</strong>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px 20px',
              textAlign: 'left',
              maxWidth: '520px',
              margin: '0 auto 24px',
              fontSize: '0.92rem',
              color: '#475569'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Selected Track:</span>
                <strong style={{ color: '#070f26' }}>{formData.program}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Applicant:</span>
                <strong style={{ color: '#070f26' }}>{formData.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Mode &amp; Duration:</span>
                <strong style={{ color: '#070f26' }}>{formData.trainingMode} · {formData.duration}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn--outline"
              >
                Submit Another Application
              </button>
              <a
                href="https://wa.me/919500834236"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--orange"
              >
                Instant WhatsApp Enquiry <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {status.type === 'error' && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '12px 18px',
                color: '#b91c1c',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.5rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{status.message}</span>
              </div>
            )}

            {/* SECTION 1: CANDIDATE INFO */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: 750,
              color: '#0284c7',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #f1f5f9',
              paddingBottom: '8px',
              marginBottom: '1.25rem'
            }}>
              <User size={15} />
              <span>1. Candidate Profile &amp; Contact Details</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              {/* Full Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-fullName" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Full Name <span style={{ color: '#0284c7' }}>*</span>
                </label>
                <input
                  type="text"
                  id="te-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aadhya Sharma"
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-email" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Email Address <span style={{ color: '#0284c7' }}>*</span>
                </label>
                <input
                  type="email"
                  id="te-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. aadhya@university.edu"
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Phone / WhatsApp */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-phone" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Phone / WhatsApp Number <span style={{ color: '#0284c7' }}>*</span>
                </label>
                <input
                  type="tel"
                  id="te-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Applicant Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-applicantType" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Applicant Category <span style={{ color: '#0284c7' }}>*</span>
                </label>
                <select
                  id="te-applicantType"
                  name="applicantType"
                  value={formData.applicantType}
                  onChange={handleChange}
                  className="contact-input te-select-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Student (College / University)">Student (College / University)</option>
                  <option value="Recent Graduate / Fresher">Recent Graduate / Fresher</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Corporate / Enterprise Team">Corporate / Enterprise Team</option>
                </select>
              </div>
            </div>

            {/* SECTION 2: PROGRAM SELECTION */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: 750,
              color: '#0284c7',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #f1f5f9',
              paddingBottom: '8px',
              marginBottom: '1.25rem',
              marginTop: '2rem'
            }}>
              <Sparkles size={15} />
              <span>2. Choose Training Track &amp; Learning Mode</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Program Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-program" style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                  Choose Program or Track <span style={{ color: '#0284c7' }}>*</span>
                </label>
                <select
                  id="te-program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="contact-input te-select-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Internship Program (Live Industry Projects)">
                    ⭐ Flagship Internship Program (Live Industry Projects)
                  </option>
                  <option value="ePublishing Training">
                    ePublishing Training (EPUB 3, JATS XML, MathML)
                  </option>
                  <option value="AI/ML Training">
                    AI/ML Training (Deep Learning, NLP Pipelines)
                  </option>
                  <option value="Generative AI Training">
                    Generative AI Training (LLMs, RAG Architectures)
                  </option>
                  <option value="Data Analytics & Business Intelligence Training">
                    Data Analytics &amp; BI (Power BI, SQL, Data Pipelines)
                  </option>
                  <option value="Digital Accessibility Training">
                    Digital Accessibility Training (WCAG 2.2, PDF/UA, Section 508)
                  </option>
                  <option value="Software Development Training">
                    Software Development Training (React, Full Stack, Cloud)
                  </option>
                  <option value="Digital Marketing Training">
                    Digital Marketing Training (Technical SEO, Conversion Optimization)
                  </option>
                </select>
              </div>

              {/* Mode & Duration Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="te-trainingMode" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                    Preferred Learning Mode
                  </label>
                  <select
                    id="te-trainingMode"
                    name="trainingMode"
                    value={formData.trainingMode}
                    onChange={handleChange}
                    className="contact-input te-select-input"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Online Virtual Live (Interactive Webinar)">
                      Online Virtual Live (Interactive Webinar)
                    </option>
                    <option value="Classroom In-Person (Cuddalore Head Office)">
                      Classroom In-Person (Cuddalore Head Office)
                    </option>
                    <option value="Classroom In-Person (Chennai Branch Office)">
                      Classroom In-Person (Chennai Branch Office)
                    </option>
                    <option value="Hybrid (Virtual Live + Weekend In-Person Labs)">
                      Hybrid (Virtual Live + Weekend In-Person Labs)
                    </option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="te-duration" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                    Preferred Duration
                  </label>
                  <select
                    id="te-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="contact-input te-select-input"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="1 Month (Fast-Track Project Bootcamp)">
                      1 Month (Fast-Track Project Bootcamp)
                    </option>
                    <option value="3 Months (Standard Certification Track)">
                      3 Months (Standard Certification Track)
                    </option>
                    <option value="6 Months (Comprehensive Capstone & PPO)">
                      6 Months (Comprehensive Capstone &amp; PPO)
                    </option>
                  </select>
                </div>
              </div>

              {/* Message / Goals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-message" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Career Goals / Specific Topics You Want to Learn (Optional)
                </label>
                <textarea
                  id="te-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about what you want to achieve, your preferred batch timings, or any questions for our mentors..."
                  className="contact-textarea"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    minHeight: '110px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Submit Action Row */}
            <div className="te-submit-row" style={{ marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn--orange btn--lg btn--block te-submit-btn"
                style={{
                  width: '100%',
                  fontWeight: 750,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Enrollment Application</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>

            <div className="te-trust-row" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginTop: '1.25rem',
              fontSize: '0.84rem',
              color: '#64748b',
              flexWrap: 'wrap'
            }}>
              <span>🔒 100% Confidential &amp; Verified</span>
              <span>•</span>
              <span>⚡ Fast 24-Hour Admission Response</span>
              <span>•</span>
              <span>📜 Recognized Certificate with QR</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
