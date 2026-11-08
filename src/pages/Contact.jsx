import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Linkedin,
  Compass,
  Briefcase,
  BookOpen,
  FileCheck2,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Velvora Solutions';
  }, []);

  const [f, setF] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(f),
      });

      let data = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => '');
        data = { error: text || 'Unable to connect to the email server. Please make sure the server is running.' };
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send your message. Please try again.');
      }

      setSubmitted(true);
      setF({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while delivering your message. Please try again or reach out to us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: company.linkedinCompany || 'https://www.linkedin.com/company/118444302/',
      color: '#0a66c2'
    }
  ];

  const quickLinks = [
    {
      label: 'Explore Services',
      hint: 'Leads to Services Overview',
      to: '/services',
      icon: BookOpen
    },
    {
      label: 'Join Our Team',
      hint: 'Leads to Careers Application Page',
      to: '/careers',
      icon: Briefcase
    },
    {
      label: 'Discover Our Projects',
      hint: 'Leads to Case Studies / Insights',
      to: '/resources/case-studies',
      icon: Compass
    },
    {
      label: 'Accessibility Support',
      hint: 'Leads to Accessibility Services',
      to: '/services/digital-accessibility',
      icon: FileCheck2
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        crumbs={['Contact Us']}
      >
        <p className="contact-hero-tagline">
          We’re here to connect, collaborate, and create solutions together.
        </p>
        <p className="contact-hero-intro">
          At Velvora Solutions, we value every conversation. Whether you’re a client, candidate, or partner, we’re ready to listen and respond.
        </p>
      </PageHero>

      <section className="section contact-page-section">
        <div className="container">
          <div className="contact-grid-main">
            {/* LEFT COLUMN: CONTACT FORM */}
            <div className="contact-card contact-card--form">
              <div className="contact-card__badge">
                <Sparkles size={16} /> Direct Message
              </div>
              <h2 className="contact-card__title">Contact Form</h2>
              <p className="contact-card__desc">
                Have a question or idea? Fill out the form below and our team will get back to you within 24–48 hours.
              </p>

              {submitted ? (
                <div className="contact-form-success" role="status" aria-live="polite">
                  <div className="contact-form-success__icon">
                    <CheckCircle size={44} />
                  </div>
                  <h3>Thank You for Reaching Out!</h3>
                  <p>
                    Your message has been received successfully. We appreciate your interest and our team will get back to you within 24–48 hours.
                  </p>
                  <div className="contact-form-success__note">
                    <Clock size={16} />
                    <span>Our team will get back to you within 24–48 hours.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage('');
                      setF({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn btn--outline"
                    style={{ marginTop: '1.25rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form-inner" onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="contact-form-error" role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name">
                      Name <span className="req">*</span>
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      value={f.name}
                      onChange={set('name')}
                      placeholder="e.g. Jane Doe"
                      autoComplete="name"
                      className="contact-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">
                      Email <span className="req">*</span>
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={f.email}
                      onChange={set('email')}
                      placeholder="e.g. jane@organization.com"
                      autoComplete="email"
                      className="contact-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">
                      Subject <span className="req">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      required
                      type="text"
                      value={f.subject}
                      onChange={set('subject')}
                      placeholder="e.g. Project Consultation / Publishing Enquiry"
                      className="contact-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">
                      Message <span className="req">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={f.message}
                      onChange={set('message')}
                      placeholder="Tell us about your project requirements, document volume, or accessibility goals..."
                      className="contact-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn--orange btn--lg contact-submit-btn">
                    <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
                    <Send size={18} aria-hidden="true" />
                  </button>

                  <div className="contact-privacy-note">
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>We respect your privacy. Your details are strictly confidential and will only be used to respond to your request.</span>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: OUR OFFICES, ONLINE CONNECT & QUICK LINKS */}
            <div className="contact-sidebar">
              {/* 1. OUR OFFICES & DIRECT INFO */}
              <div className="contact-card contact-card--info">
                <h3 className="contact-sidebar-heading">Our Offices &amp; Contact</h3>
                
                <div className="office-block">
                  <div className="office-block__icon">
                    <MapPin size={20} />
                  </div>
                  <div className="office-block__details">
                    <strong className="office-block__label">Cuddalore Office</strong>
                    <p className="office-block__text">
                      {company.office1}
                    </p>
                  </div>
                </div>

                <div className="office-block">
                  <div className="office-block__icon">
                    <MapPin size={20} />
                  </div>
                  <div className="office-block__details">
                    <strong className="office-block__label">Chennai Office (Porur)</strong>
                    <p className="office-block__text">
                      {company.office2}
                    </p>
                  </div>
                </div>

                <div className="office-block">
                  <div className="office-block__icon">
                    <Clock size={20} />
                  </div>
                  <div className="office-block__details">
                    <strong className="office-block__label">Office Hours</strong>
                    <p className="office-block__text">
                      {company.hours}
                    </p>
                  </div>
                </div>

                <div className="office-block">
                  <div className="office-block__icon">
                    <Mail size={20} />
                  </div>
                  <div className="office-block__details">
                    <strong className="office-block__label">Email</strong>
                    <p className="office-block__text">
                      <a href={`mailto:${company.email}`} className="contact-link">
                        {company.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="office-block">
                  <div className="office-block__icon">
                    <Phone size={20} />
                  </div>
                  <div className="office-block__details">
                    <strong className="office-block__label">Phone</strong>
                    <p className="office-block__text">
                      <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="contact-link">
                        {company.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. CONNECT ONLINE */}
              <div className="contact-card contact-card--social">
                <h3 className="contact-sidebar-heading">Connect Online</h3>
                <div className="social-links-list">
                  {socialLinks.map((s) => {
                    const IconComp = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="social-pill-link"
                        aria-label={`${s.name} (opens in new tab)`}
                      >
                        <span className="social-pill-link__icon" style={{ color: s.color }}>
                          <IconComp size={18} />
                        </span>
                        <span className="social-pill-link__name">{s.name}</span>
                        <ArrowRight size={15} className="social-pill-link__arrow" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* 3. QUICK LINKS */}
              <div className="contact-card contact-card--quicklinks">
                <h3 className="contact-sidebar-heading">Quick Links</h3>
                <div className="quick-links-list">
                  {quickLinks.map((q) => {
                    const IconComp = q.icon;
                    return (
                      <Link
                        key={q.label}
                        to={q.to}
                        className="quick-nav-card"
                      >
                        <div className="quick-nav-card__icon">
                          <IconComp size={18} />
                        </div>
                        <div className="quick-nav-card__body">
                          <strong>{q.label}</strong>
                          <span>{q.hint}</span>
                        </div>
                        <ArrowRight size={16} className="quick-nav-card__arrow" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
