import { services, company } from '../data/site.js';
import { PageHero, TextLink, CtaBand } from '../components/ui.jsx';

export default function CompanyOverview() {
  const verified = services.filter((s) => s.verified);
  return (
    <>
      <PageHero eyebrow="About Us" title="Company Overview" crumbs={['About Us', 'Company Overview']}>
        A technology and digital solutions company focused on accessible, high-quality digital content.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <div className="prose">
            <h2>Who we are</h2>
            <p>{company.description}</p>
            <p>Our mission is to help businesses, educational institutions, publishers and organizations create inclusive digital experiences that meet global accessibility standards while improving efficiency and user engagement.</p>
            <p>We combine technology, creativity and expertise to provide reliable solutions that help businesses grow in the digital world.</p>
          </div>
          <div className="prose">
            <h2>What we do</h2>
            <ul className="bullets">
              <li>PDF accessibility remediation and accessibility QA</li>
              <li>AI-powered automation and document workflows</li>
              <li>Web development and custom IT services</li>
              <li>OCR processing and document automation</li>
            </ul>
            <p>Explore the detail on each service page:</p>
            <ul className="bullets">
              {verified.map((s) => <li key={s.slug}><TextLink to={`/services/${s.slug}`}>{s.title}</TextLink></li>)}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
