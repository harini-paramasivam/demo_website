import { useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Frontend-only: opens the visitor's email client. Nothing is sent or stored by this site.
  const submit = (e) => {
    e.preventDefault();
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Enquiry from ' + f.name)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let’s discuss your accessibility project" crumbs={['Contact Us']}>
        Tell us about your documents, workflows or digital requirements.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <form className="form" onSubmit={submit}>
            <label>Name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label>Email<input required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
            <label>Message<textarea required rows="6" value={f.message} onChange={set('message')} /></label>
            <button type="submit" className="btn btn--dark">Open in email app</button>
            <p className="meta">This site has no server. The button prepares an email to {company.email} in your own email app.</p>
          </form>
          <div className="prose">
            <h2>Velvora Solutions</h2>
            <p>Professional PDF accessibility remediation and AI-assisted document accessibility solutions.</p>
            <ul className="contact-list">
              <li><a href={`mailto:${company.email}`}><Mail size={18} aria-hidden="true" /> {company.email}</a></li>
              <li><a href={company.linkedinCompany} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" /> Velvora Solutions on LinkedIn<span className="sr"> (opens in new tab)</span></a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
