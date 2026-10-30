import { useState } from 'react';
import { 
  Handshake, 
  Globe, 
  Bot, 
  Building2, 
  ShieldCheck, 
  BookOpen, 
  Megaphone, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import { company, partnershipData } from '../data/site.js';
import { useReveal } from '../components/hooks.jsx';
import Icon from '../components/Icon.jsx';

export default function PartnerWithUs() {
  useReveal();

  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    partnershipArea: 'Technology',
    proposal: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const selectArea = (area) => {
    setFormData((prev) => ({ ...prev, partnershipArea: area }));
    const formEl = document.getElementById('partner-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('partner-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Partnership Proposal: ${formData.organizationName} - ${formData.partnershipArea} Area`;
    const body = `PARTNERSHIP APPLICATION
----------------------------------------
Organization Name: ${formData.organizationName}
Contact Person: ${formData.contactPerson}
Email: ${formData.email}
Partnership Area: ${formData.partnershipArea}

Proposal / Message:
${formData.proposal}

Submitted via Velvora Solutions Partnership Portal.`;

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        eyebrow="Partner With Velvora"
        title="Collaborate. Innovate. Grow Together."
        crumbs={['Home', 'Partner With Velvora']}
      >
        <p style={{ margin: '0 0 1.25rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
          At Velvora Solutions, we believe partnerships are the key to scaling innovation and impact. Whether you’re a technology provider, publishing house, accessibility consultant, or industry leader, we welcome collaborations that create value for everyone.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={scrollToForm}
            className="btn btn--orange"
          >
            <span>Submit Partnership Request</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </PageHero>

      {/* WHY PARTNER WITH US */}
      <section className="section section--paper" aria-labelledby="why-partner-head">
        <div className="container">
          <div className="sec-head text-center" style={{ maxWidth: 720, margin: '0 auto 40px' }}>
            <span className="eyebrow">Strategic Synergy</span>
            <h2 id="why-partner-head" className="sec-head__title">Why Partner With Us?</h2>
            <p className="sec-head__sub">
              Combine our high-precision content, accessibility, and AI engineering with your domain strengths to reach global markets.
            </p>
          </div>

          <div className="partner-why-grid">
            {partnershipData.whyPartner.map((item, idx) => (
              <div key={idx} className="partner-why-card">
                <div className="partner-why-card__top">
                  <div className="partner-why-card__icon">
                    <Icon name={item.icon} size={24} />
                  </div>
                  <span className="partner-why-card__badge">{item.badge}</span>
                </div>
                <h3 className="partner-why-card__title">{item.title}</h3>
                <p className="partner-why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES */}
      <section className="section section--dark netbg" aria-labelledby="opportunities-head">
        <div className="container">
          <div className="sec-head sec-head--dark text-center" style={{ maxWidth: 740, margin: '0 auto 44px' }}>
            <span className="eyebrow eyebrow--gold">Collaboration Horizons</span>
            <h2 id="opportunities-head" className="sec-head__title" style={{ color: '#ffffff' }}>Partnership Opportunities</h2>
            <p className="sec-head__sub" style={{ color: '#cbd5e1' }}>
              Explore multi-tiered strategic models crafted for technology providers, publishing houses, consulting firms, and agencies.
            </p>
          </div>

          <div className="partner-opp-grid">
            {partnershipData.opportunities.map((opp) => (
              <div key={opp.id} className="partner-opp-card">
                <div className="partner-opp-card__header">
                  <div className="partner-opp-card__icon-box">
                    <Icon name={opp.icon} size={24} />
                  </div>
                  <div>
                    <span className="partner-opp-card__category">{opp.category}</span>
                    <h3 className="partner-opp-card__title">{opp.title}</h3>
                  </div>
                </div>
                <p className="partner-opp-card__desc">{opp.desc}</p>
                <div className="partner-opp-card__chips">
                  {opp.highlights.map((h, i) => (
                    <span key={i} className="partner-opp-chip">{h}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="partner-opp-btn"
                  onClick={() => selectArea(opp.category)}
                  aria-label={`Apply for ${opp.title}`}
                >
                  <span>Propose Collaboration</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP APPLICATION FORM */}
      <section id="partner-form" className="section" aria-labelledby="form-section-head">
        <div className="container">
          <div className="partner-form-wrapper">
            <div className="partner-form-info">
              <span className="eyebrow">Direct Application</span>
              <h2 id="form-section-head" style={{ fontSize: '2rem', margin: '8px 0 16px', color: '#0f172a' }}>
                Partnership Application Form
              </h2>
              <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Interested in partnering with us? Fill out the form below and our leadership team will connect with you to explore synergies.
              </p>

              <div className="partner-form-perks">
                <div className="partner-form-perk">
                  <CheckCircle2 size={18} className="partner-perk-icon" />
                  <span>Prompt response within 1-2 business days</span>
                </div>
                <div className="partner-form-perk">
                  <CheckCircle2 size={18} className="partner-perk-icon" />
                  <span>Confidential NDA available upon request</span>
                </div>
                <div className="partner-form-perk">
                  <CheckCircle2 size={18} className="partner-perk-icon" />
                  <span>Dedicated partnership liaison team</span>
                </div>
              </div>

              <div className="partner-contact-direct">
                <span className="partner-contact-label">Have questions before applying?</span>
                <a href={`mailto:${company.email}`} className="partner-contact-link">
                  {company.email}
                </a>
              </div>
            </div>

            <div className="partner-form-card">
              {submitted ? (
                <div className="partner-form-success" role="status" aria-live="polite">
                  <div className="partner-success-icon-box">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="partner-success-title">Partnership Request Initialized!</h3>
                  <p className="partner-success-desc">
                    Your default email client has opened with your proposal. You can also send materials directly to{' '}
                    <strong>{company.email}</strong>.
                  </p>
                  <p style={{ fontSize: '.88rem', color: '#334155', marginTop: '12px' }}>
                    Our team looks forward to reviewing your organization's goals and discussing how we can grow together.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        organizationName: '',
                        contactPerson: '',
                        email: '',
                        partnershipArea: 'Technology',
                        proposal: '',
                      });
                    }}
                    className="btn btn--outline"
                    style={{ marginTop: '20px' }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="partner-form" onSubmit={handleSubmit}>
                  <div className="partner-field">
                    <label htmlFor="partner-org" className="partner-label">
                      Organization Name <span className="req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="partner-org"
                      required
                      type="text"
                      placeholder="e.g. Acme Publishing or CloudTech Labs"
                      value={formData.organizationName}
                      onChange={handleChange('organizationName')}
                      className="partner-input"
                    />
                  </div>

                  <div className="partner-field-row">
                    <div className="partner-field">
                      <label htmlFor="partner-person" className="partner-label">
                        Contact Person <span className="req" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="partner-person"
                        required
                        type="text"
                        placeholder="Your full name"
                        value={formData.contactPerson}
                        onChange={handleChange('contactPerson')}
                        className="partner-input"
                      />
                    </div>

                    <div className="partner-field">
                      <label htmlFor="partner-email" className="partner-label">
                        Email Address <span className="req" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="partner-email"
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        className="partner-input"
                      />
                    </div>
                  </div>

                  <div className="partner-field">
                    <label htmlFor="partner-area" className="partner-label">
                      Partnership Area <span className="req" aria-hidden="true">*</span>
                    </label>
                    <div className="partner-area-pills" role="radiogroup" aria-label="Select partnership area">
                      {partnershipData.formAreas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          role="radio"
                          aria-checked={formData.partnershipArea === area}
                          className={`partner-area-pill${formData.partnershipArea === area ? ' is-selected' : ''}`}
                          onClick={() => setFormData((prev) => ({ ...prev, partnershipArea: area }))}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                    <select
                      id="partner-area"
                      value={formData.partnershipArea}
                      onChange={handleChange('partnershipArea')}
                      className="partner-select-screen-reader"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {partnershipData.formAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="partner-field">
                    <label htmlFor="partner-proposal" className="partner-label">
                      Message / Proposal <span className="req" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="partner-proposal"
                      required
                      rows={5}
                      placeholder="Tell us about your organization, collaboration ideas, and how we can innovate together..."
                      value={formData.proposal}
                      onChange={handleChange('proposal')}
                      className="partner-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn--orange btn--block partner-submit-btn">
                    <span>Submit Partnership Request</span>
                    <Send size={16} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CALL TO ACTION BAND */}
      <CtaBand
        title="Let’s build the future together."
        text="Partner with Velvora Solutions and join us in creating inclusive, innovative, and impactful solutions."
        primaryBtnText="Submit Partnership Request"
        primaryBtnOnClick={scrollToForm}
      />
    </>
  );
}
