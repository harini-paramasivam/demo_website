import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={['Privacy Policy']}>
        How Velvora Solutions protects your information and confidentiality.
      </PageHero>

      <section className="section">
        <div className="container prose">
          <h2>Your Privacy Matters</h2>
          <p>
            Velvora Solutions respects your privacy. When you contact us or request a consultation, your information is used solely to respond to your enquiry and deliver our agreed services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We only collect personal information that you voluntarily provide to us through our contact forms or direct email correspondence (such as your name, email address, phone number, company name, and project specifications).
          </p>

          <h2>Confidentiality and Content Security</h2>
          <p>
            We understand the sensitivity of your manuscripts, publications, proprietary archives, and institutional documents. Velvora Solutions adheres to strict non-disclosure and intellectual property protection standards throughout all conversion, typesetting, and accessibility workflows.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please email us at{' '}
            <a href={`mailto:${company.email}`} className="tlink">{company.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
