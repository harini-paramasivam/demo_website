import { company } from '../data/site.js';
import { PageHero, EmptyState } from '../components/ui.jsx';

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Careers" crumbs={['About Us', 'Careers']}>
        Velvora Solutions is a technology-driven company working across accessibility, automation and web development.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <div className="prose">
            <h2>Working at Velvora</h2>
            <p>We combine technology, creativity and expertise to deliver reliable, accessible digital solutions. Our work spans PDF accessibility remediation, AI automation, web development and accessibility QA.</p>
          </div>
          <EmptyState
            title="No open positions are listed right now"
            action={<p><a className="tlink" href={`mailto:${company.email}?subject=Careers%20enquiry`}>Send a careers enquiry</a></p>}
          >
            Current vacancies will be posted here. You are welcome to get in touch by email.
          </EmptyState>
        </div>
      </section>
    </>
  );
}
