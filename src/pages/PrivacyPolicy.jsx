import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/ui.jsx';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={['Privacy Policy']}>
        How Velvora Solutions collects, protects, and handles your personal data in accordance with applicable laws.
      </PageHero>

      <section className="section">
        <div className="container prose" style={{ maxWidth: '820px' }}>
          <p className="meta" style={{ marginBottom: '2rem' }}>
            <strong>Last updated:</strong> October 2026
          </p>

          <h2>1. Introduction</h2>
          <p>
            Velvora Solutions (&ldquo;Velvora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and the choices you have when you visit <a href="https://www.velvorasolutions.com/" target="_blank" rel="noreferrer">velvorasolutions.com</a>, use our products or services, or contact us. We handle personal data in line with the Digital Personal Data Protection Act, 2023 (India) and other applicable laws.
          </p>
          <p>
            By using our website or services, you acknowledge that you have read this policy. Where the law requires your consent, we will ask for it separately.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Information you provide to us</h3>
          <p>
            We collect your name, email address, phone number, company name and job title; your billing and contact address; details you share in enquiries, support requests, feedback forms or job applications; and your account login details, if you create an account.
          </p>

          <h3>Information collected automatically</h3>
          <p>
            We automatically collect your IP address, browser type, device information and operating system; the pages you visit, time spent, referring pages and general usage data; and cookie identifiers and similar technologies.
          </p>

          <h3>Information from clients and third parties</h3>
          <p>
            Where we provide services to a client, we may process personal data supplied by that client. In such cases the client decides why and how the data is used, and we process it only on their instructions and under our agreement with them.
          </p>

          <h3>Payment information</h3>
          <p>
            Payments are handled by third-party payment providers. We do not store full card or bank details.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal data for several purposes.
          </p>
          <p>
            These include providing, operating, maintaining and improving our services; responding to enquiries and providing customer support; issuing invoices, processing payments and managing contracts; sending service updates and, where you have agreed, marketing communications; evaluating job applications; detecting and preventing fraud, misuse and security incidents; and complying with legal, tax and regulatory obligations.
          </p>

          <h2>4. Consent and Lawful Use</h2>
          <p>
            We process personal data based on your consent, or for other uses permitted by law, such as performing a contract with you, meeting legal obligations, or responding to a request you have made. You may withdraw your consent at any time by contacting us at the address below. Withdrawal does not affect processing carried out before you withdrew.
          </p>

          <h2>5. Cookies and Similar Technologies</h2>
          <p>
            We use cookies for essential site functions, analytics and, where applicable, advertising. You can control or delete cookies through your browser settings. Disabling some cookies may affect how the site works.
          </p>

          <h2>6. Sharing Your Information</h2>
          <p>
            We do not sell your personal data. We may share it where necessary, as described below.
          </p>
          <p>
            We may share data with service providers that help us run our business, such as hosting, cloud storage, analytics, email, payment and IT support providers, who must protect the data and use it only for our purposes. We may also share it with professional advisers, such as lawyers, auditors and accountants; with authorities, courts or regulators, where required by law or to protect rights and safety; and with a successor business, in the event of a merger, acquisition or sale of assets.
          </p>

          <h2>7. Transfers Outside India</h2>
          <p>
            Your data may be stored or processed on servers located outside India. Where this happens, we take steps to ensure it is handled securely and in accordance with applicable law.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We keep personal data only for as long as needed for the purposes described in this policy, or as required by law or for legitimate business records. When it is no longer needed, we delete or anonymise it.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We use reasonable technical and organisational safeguards, such as access controls, encryption where appropriate, and staff confidentiality obligations, to protect personal data against unauthorised access, loss or misuse. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a personal data breach occurs, we will notify affected persons and the relevant authority as required by law.
          </p>

          <h2>10. Your Rights</h2>
          <p>
            Subject to applicable law, you have several rights.
          </p>
          <p>
            These include the right to obtain a summary of the personal data we hold about you and how we process it; to request correction or updating of inaccurate or incomplete data; to request erasure of your data when it is no longer needed; to withdraw your consent; to seek redressal of grievances; and to nominate another person to exercise your rights in the event of your death or incapacity.
          </p>
          <p>
            To exercise any of these rights, contact us using the details in <a href="#section-13" className="tlink">Section 13</a>.
          </p>

          <h2>11. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed at children under 18. We do not knowingly collect personal data from children without verifiable consent from a parent or lawful guardian. If you believe a child has given us data, please contact us and we will delete it.
          </p>

          <h2>12. Third-Party Links</h2>
          <p>
            Our website may link to other websites. We are not responsible for the privacy practices of those sites, and we encourage you to read their policies.
          </p>

          <div id="section-13" className="callout-card" style={{ margin: '2.5rem 0' }}>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} className="accent" aria-hidden="true" />
              13. Grievance Officer and Contact Details
            </h2>
            <p>
              If you have questions, concerns or complaints about this policy or how we handle your data, please contact:
            </p>
            <p style={{ margin: '1rem 0' }}>
              <strong>Grievance Officer / Data Protection Contact:</strong><br />
              <strong>Velvora Solutions</strong><br />
              450/90, Indra Nagar,<br />
              Pathirikuppam,<br />
              Cuddalore,<br />
              Tamilnadu &ndash; 606302
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <Mail size={16} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Email:{' '}
              <a href="mailto:info@velvorasolutions.com" className="tlink">info@velvorasolutions.com</a>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <Phone size={16} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Phone: <strong>+91 9500834236</strong>
            </p>
            <p className="meta" style={{ marginTop: '1rem' }}>
              We will aim to respond within a reasonable time, and within any period required by law.
            </p>
          </div>

          <h2>14. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be posted on our website with the &ldquo;Last updated&rdquo; date. If we make significant changes, we will notify you where required.
          </p>

          <h2>15. Disclaimer</h2>
          <p>
            This Privacy Policy is provided for general information about how Velvora Solutions handles personal data. It does not constitute legal advice and does not create any rights or obligations beyond those provided by applicable law. If any part of this policy conflicts with applicable law, the law prevails. Nothing in this policy limits any right you have under law. If you have specific concerns about your personal data, please contact us using the details in <a href="#section-13" className="tlink">Section 13</a>.
          </p>
        </div>
      </section>
    </>
  );
}
