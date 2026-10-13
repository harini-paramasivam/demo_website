import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle } from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

const servicesList = [
  'ePublishing',
  'XML',
  'EPUB Accessibility',
  'Web Accessibility',
  'PDF Accessibility',
  'Word, PPT and Excel Accessibility',
  'Typesetting and Design',
  'Math and Equation Typesetting',
  'Metadata, Indexing and Taxonomy',
  'OCR and Digitization',
  'Captioning, Transcription and Audio Description',
  'Accessibility Training and Consulting',
  'Other',
];

export default function Contact() {
  const [params] = useSearchParams();
  const preselected = params.get('service') || '';

  const [f, setF] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: preselected || 'ePublishing',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Full Name: ${f.fullName}
Email: ${f.email}
Phone: ${f.phone}
Company: ${f.companyName}
Service of Interest: ${f.service}

Message:
${f.message}`;

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      'Project Enquiry from ' + f.fullName + ' - ' + f.service
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Contact Us"
        crumbs={['Contact Us']}
      >
        Have a question or a project in mind? We would love to hear from you. Share a few details and our team will get back to you within one business day.
      </PageHero>

      <section className="section">
        <div className="container split split--top">
          {/* FORM */}
          <div>
            {submitted ? (
              <div className="callout-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <CheckCircle size={48} className="accent" aria-hidden="true" style={{ margin: '0 auto 1rem' }} />
                <h3>Thank You for Reaching Out!</h3>
                <p>
                  Your email client has opened with your project details. You can also contact us directly at{' '}
                  <a href={`mailto:${company.email}`} className="tlink">{company.email}</a>.
                </p>
                <p className="meta">Our team will respond within one business day.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn--outline"
                  style={{ marginTop: '1rem', color: 'var(--ink)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label>
                    Full Name <span aria-hidden="true">*</span>
                    <input
                      required
                      type="text"
                      value={f.fullName}
                      onChange={set('fullName')}
                      placeholder="e.g. Jane Doe"
                      autoComplete="name"
                    />
                  </label>

                  <label>
                    Email <span aria-hidden="true">*</span>
                    <input
                      required
                      type="email"
                      value={f.email}
                      onChange={set('email')}
                      placeholder="e.g. jane@organization.com"
                      autoComplete="email"
                    />
                  </label>
                </div>

                <div className="form-grid">
                  <label>
                    Phone
                    <input
                      type="tel"
                      value={f.phone}
                      onChange={set('phone')}
                      placeholder="+91 XXXXX XXXXX"
                      autoComplete="tel"
                    />
                  </label>

                  <label>
                    Company / Organization
                    <input
                      type="text"
                      value={f.companyName}
                      onChange={set('companyName')}
                      placeholder="e.g. University Press / Publishing House"
                      autoComplete="organization"
                    />
                  </label>
                </div>

                <label>
                  Service of Interest <span aria-hidden="true">*</span>
                  <select
                    value={f.service}
                    onChange={set('service')}
                    className="form-select"
                  >
                    {servicesList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Message <span aria-hidden="true">*</span>
                  <textarea
                    required
                    rows="5"
                    value={f.message}
                    onChange={set('message')}
                    placeholder="Tell us about your project requirements, document volume, or accessibility goals..."
                  />
                </label>

                <button type="submit" className="btn btn--orange btn--lg">
                  Send Message <Send size={18} aria-hidden="true" />
                </button>

                <p className="meta" style={{ marginTop: '1rem' }}>
                  <ShieldCheck size={16} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  We respect your privacy. Your information is used only to respond to your enquiry.
                </p>
              </form>
            )}
          </div>

          {/* CONTACT DETAILS & GET IN TOUCH CALLOUT */}
          <div className="prose">
            <div className="callout-card" style={{ marginBottom: '2rem' }}>
              <p className="eyebrow">Get in Touch</p>
              <h3>Let&apos;s Talk About Your Project</h3>
              <p>
                Tell us what you need, whether it is ePublishing, XML, or accessibility. We will suggest the right approach and share a free, no-obligation quote.
              </p>
            </div>

            <h2>Contact Information</h2>
            <ul className="contact-list" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                <Mail size={20} className="accent" aria-hidden="true" style={{ marginTop: '3px' }} />
                <div>
                  <strong>Email</strong>
                  <br />
                  <a href={`mailto:${company.email}`} className="tlink">{company.email}</a>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                <Phone size={20} className="accent" aria-hidden="true" style={{ marginTop: '3px' }} />
                <div>
                  <strong>Phone</strong>
                  <br />
                  <span>{company.phone}</span>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                <MapPin size={20} className="accent" aria-hidden="true" style={{ marginTop: '3px' }} />
                <div>
                  <strong>Address</strong>
                  <br />
                  <span>{company.address}</span>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                <Clock size={20} className="accent" aria-hidden="true" style={{ marginTop: '3px' }} />
                <div>
                  <strong>Business Hours</strong>
                  <br />
                  <span>{company.hours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
