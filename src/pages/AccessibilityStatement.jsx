import { Mail } from 'lucide-react';
import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

export default function AccessibilityStatement() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility Statement"
        crumbs={['Accessibility Statement']}
      >
        Our ongoing commitment to digital accessibility and WCAG 2.2 Level AA conformance.
      </PageHero>

      <section className="section">
        <div className="container prose">
          <h2>Our Commitment</h2>
          <p>
            {company.accessibilityStatement}
          </p>

          <h2>Standards Conformance</h2>
          <p>
            This website is engineered to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We regularly evaluate our website using automated analysis tools, keyboard navigation checks, and assistive technologies including screen readers (NVDA, JAWS, VoiceOver) to ensure an inclusive user experience.
          </p>

          <h2>Measures to Support Accessibility</h2>
          <p>Velvora Solutions takes the following measures to ensure accessibility:</p>
          <ul className="bullets">
            <li>Employing semantic HTML5 elements and ARIA landmarks for clear document hierarchy.</li>
            <li>Providing descriptive alternative text for all informational graphics and figures.</li>
            <li>Maintaining strict color contrast ratios meeting WCAG Level AA thresholds.</li>
            <li>Ensuring comprehensive keyboard operability and visible focus indicators.</li>
            <li>Continuous training for our web and content teams on modern accessibility standards.</li>
          </ul>

          <h2>Feedback and Assistance</h2>
          <p>
            We welcome your feedback on the accessibility of the Velvora Solutions website. If you encounter any accessibility barriers or require information in an alternative format, please contact our accessibility team:
          </p>
          <p>
            <a href={`mailto:${company.accessibilityEmail}`} className="tlink">
              <Mail size={18} aria-hidden="true" /> {company.accessibilityEmail}
            </a>
          </p>
          <p className="meta">We aim to respond to all accessibility feedback within one business day.</p>
        </div>
      </section>
    </>
  );
}
