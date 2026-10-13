import { Check, Mail, ArrowRight } from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

const whyWorkWithUs = [
  'Training and certification support in accessibility (WCAG, PDF/UA, EPUB, and more)',
  'Hands-on exposure to global publishing and accessibility projects',
  'Supportive team and clear growth path',
  'Positive, respectful, and inclusive workplace',
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career with Velvora"
        crumbs={['About Us', 'Careers']}
      >
        Work on meaningful projects that make information available to people who might otherwise be left out.
      </PageHero>

      <section className="section">
        <div className="container split split--top">
          <div className="prose">
            <h2>Why Work With Us</h2>
            <p>
              At Velvora Solutions, you will work on meaningful projects that make information available to people who might otherwise be left out. We are a growing team that values curiosity, ownership, and steady learning.
            </p>
            <ul className="bullets" style={{ marginTop: '1.25rem' }}>
              {whyWorkWithUs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="callout-card" style={{ padding: '2rem' }}>
            <h3>Join Our Growing Team</h3>
            <p>
              We are always looking for passionate publishing professionals, XML specialists, accessibility testers, and developers.
            </p>
            <p>
              Interested in shaping an inclusive digital future with us? Send your resume and portfolio directly to our recruitment team:
            </p>
            <a
              href={`mailto:${company.email}?subject=Career%20Application%20at%20Velvora%20Solutions`}
              className="btn btn--orange"
              style={{ marginTop: '1rem' }}
            >
              <Mail size={18} aria-hidden="true" /> Send Your Resume
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Build Meaningful Content?"
        text="Get in touch to learn more about our upcoming roles and internship programs."
        primaryBtnText="Contact Recruitment"
        primaryBtnTo="/contact"
      />
    </>
  );
}
