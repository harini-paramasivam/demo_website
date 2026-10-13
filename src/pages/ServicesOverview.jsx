import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function ServicesOverview() {
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our Services"
        crumbs={['Services']}
      >
        Velvora offers end-to-end content services. We convert, structure, and remediate content so it can be published anywhere and read by anyone. Choose a service below to learn more.
      </PageHero>

      {/* UPDATED INTRO PARAGRAPH (Section 17) */}
      <section className="section section--paper">
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', marginInline: 'auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>End-to-End Content Lifecycle</p>
          <h2>Complete Content Services Under One Roof</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>
            From the first page layout to the final accessible file, Velvora supports every stage of your content life cycle. Our services cover ePublishing, XML, typesetting, math, metadata, digitization, multimedia accessibility, and training. Combine services in one project or choose only what you need.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn--orange btn--lg">
              Discuss Your Project <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <p className="eyebrow">Explore Capabilities</p>
            <h2>All Services</h2>
            <p className="lead">Select any service to view full specifications, workflows, and deliverables.</p>
          </div>
          <ServiceCards />
        </div>
      </section>

      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
