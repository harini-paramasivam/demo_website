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
        background: 'linear-gradient(145deg, rgba(10, 18, 42, 0.96) 0%, rgba(6, 12, 28, 0.98) 100%)',
        border: '1.5px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.12)',
        position: 'relative'
      }}>
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '9999px',
            padding: '6px 16px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#38bdf8',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            <Sparkles size={14} />
            <span>Admissions Desk &amp; Enrollment Portal</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
            Enroll or Request Course Syllabus
          </h2>
          <p style={{ fontSize: '1rem', color: '#e2e8f0', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Bridge academic theory with real industry workflows. Fill in your details below and an academic counselor will connect with you within 24 hours.
          </p>
        </div>

        {status.type === 'success' ? (
          <div style={{
            background: 'rgba(12, 24, 56, 0.85)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '18px',
            padding: '36px 28px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '2px solid #38bdf8',
              color: '#38bdf8',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 18px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
              Application Submitted Successfully!
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '540px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              {status.message}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '9999px',
              marginBottom: '24px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Enquiry Ref ID:</span>
              <strong style={{ fontSize: '1.05rem', color: '#38bdf8', letterSpacing: '0.04em' }}>{status.referenceId}</strong>
            </div>

            <div style={{
              background: 'rgba(6, 12, 28, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '16px 20px',
              textAlign: 'left',
              maxWidth: '520px',
              margin: '0 auto 24px',
              fontSize: '0.92rem',
              color: '#cbd5e1'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span>Selected Track:</span>
                <strong style={{ color: '#ffffff' }}>{formData.program}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span>Applicant:</span>
                <strong style={{ color: '#ffffff' }}>{formData.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span>Mode &amp; Duration:</span>
                <strong style={{ color: '#ffffff' }}>{formData.trainingMode} · {formData.duration}</strong>
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
                className="btn btn--cyan"
              >
                Instant WhatsApp Enquiry <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {status.type === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '10px',
                padding: '12px 18px',
                color: '#fca5a5',
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
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
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
                <label htmlFor="te-fullName" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Full Name <span style={{ color: '#38bdf8' }}>*</span>
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
                    background: 'rgba(6, 12, 28, 0.85)',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-email" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Email Address <span style={{ color: '#38bdf8' }}>*</span>
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
                    background: 'rgba(6, 12, 28, 0.85)',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Phone / WhatsApp */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-phone" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Phone / WhatsApp Number <span style={{ color: '#38bdf8' }}>*</span>
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
                    background: 'rgba(6, 12, 28, 0.85)',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Applicant Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-applicantType" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Applicant Category <span style={{ color: '#38bdf8' }}>*</span>
                </label>
                <select
                  id="te-applicantType"
                  name="applicantType"
                  value={formData.applicantType}
                  onChange={handleChange}
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#070e24',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Student (College / University)" style={{ background: '#070e24', color: '#ffffff' }}>Student (College / University)</option>
                  <option value="Recent Graduate / Fresher" style={{ background: '#070e24', color: '#ffffff' }}>Recent Graduate / Fresher</option>
                  <option value="Working Professional" style={{ background: '#070e24', color: '#ffffff' }}>Working Professional</option>
                  <option value="Corporate / Enterprise Team" style={{ background: '#070e24', color: '#ffffff' }}>Corporate / Enterprise Team</option>
                </select>
              </div>
            </div>

            {/* SECTION 2: PROGRAM SELECTION */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
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
                <label htmlFor="te-program" style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                  Choose Program or Track <span style={{ color: '#38bdf8' }}>*</span>
                </label>
                <select
                  id="te-program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#070e24',
                    border: '1.5px solid rgba(56, 189, 248, 0.55)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Internship Program (Live Industry Projects)" style={{ background: '#070e24', color: '#ffffff' }}>
                    ⭐ Flagship Internship Program (Live Industry Projects &amp; Mentorship)
                  </option>
                  <option value="ePublishing Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    ePublishing Training (EPUB 3, JATS/BITS XML, XSLT, InDesign)
                  </option>
                  <option value="AI/ML Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    AI/ML Training (Machine Learning, Deep Learning, NLP, PyTorch)
                  </option>
                  <option value="Generative AI Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    Generative AI Training (LLMs, LangChain, RAG Systems, AI Agents)
                  </option>
                  <option value="Data Analytics & Business Intelligence Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    Data Analytics &amp; Business Intelligence Training (Power BI, SQL, Python)
                  </option>
                  <option value="Digital Accessibility Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    Digital Accessibility Training (WCAG 2.2, PDF/UA, Screen Readers)
                  </option>
                  <option value="Software Development Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    Software Development Training (Full Stack React, Node.js, Python, Cloud)
                  </option>
                  <option value="Digital Marketing Training" style={{ background: '#070e24', color: '#ffffff' }}>
                    Digital Marketing Training (SEO, Performance PPC, Meta, LinkedIn)
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
                  <label htmlFor="te-trainingMode" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                    Preferred Learning Mode
                  </label>
                  <select
                    id="te-trainingMode"
                    name="trainingMode"
                    value={formData.trainingMode}
                    onChange={handleChange}
                    className="contact-input"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      background: '#070e24',
                      border: '1.5px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Online Virtual Live (Interactive Webinar)" style={{ background: '#070e24', color: '#ffffff' }}>
                      Online Virtual Live (Interactive Webinar)
                    </option>
                    <option value="Classroom In-Person (Cuddalore Head Office)" style={{ background: '#070e24', color: '#ffffff' }}>
                      Classroom In-Person (Cuddalore Head Office)
                    </option>
                    <option value="Classroom In-Person (Chennai Branch Office)" style={{ background: '#070e24', color: '#ffffff' }}>
                      Classroom In-Person (Chennai Branch Office)
                    </option>
                    <option value="Hybrid (Virtual Live + Weekend In-Person Labs)" style={{ background: '#070e24', color: '#ffffff' }}>
                      Hybrid (Virtual Live + Weekend In-Person Labs)
                    </option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="te-duration" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                    Preferred Duration
                  </label>
                  <select
                    id="te-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="contact-input"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      background: '#070e24',
                      border: '1.5px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="1 Month (Fast-Track Project Bootcamp)" style={{ background: '#070e24', color: '#ffffff' }}>
                      1 Month (Fast-Track Project Bootcamp)
                    </option>
                    <option value="3 Months (Standard Certification Track)" style={{ background: '#070e24', color: '#ffffff' }}>
                      3 Months (Standard Certification Track)
                    </option>
                    <option value="6 Months (Comprehensive Capstone & PPO)" style={{ background: '#070e24', color: '#ffffff' }}>
                      6 Months (Comprehensive Capstone &amp; PPO)
                    </option>
                  </select>
                </div>
              </div>

              {/* Message / Goals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="te-message" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
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
                    background: 'rgba(6, 12, 28, 0.85)',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    minHeight: '110px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Submit Action Row */}
            <div style={{ marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn--cyan btn--lg btn--block"
                style={{
                  width: '100%',
                  padding: '16px 32px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
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

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginTop: '1.25rem',
              fontSize: '0.84rem',
              color: '#cbd5e1',
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
