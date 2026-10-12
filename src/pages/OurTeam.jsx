import { Linkedin } from 'lucide-react';
import { founder } from '../data/site.js';
import { PageHero, EmptyState, CtaBand } from '../components/ui.jsx';

export default function OurTeam() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Our Team" crumbs={['About Us', 'Our Team']}>
        The people behind Velvora Solutions.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <article className="person">
            {/* Add a portrait here once you have a licensed/approved image: <img src="/founder.png" alt="Portrait of Iyshwariya Senthil" /> */}
            <p className="eyebrow">{founder.role}</p>
            <h2>{founder.name}</h2>
            <p>{founder.bio}</p>
            <a className="tlink" href={founder.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" /> Connect on LinkedIn<span className="sr"> (opens in new tab)</span>
            </a>
          </article>
          <EmptyState title="Additional team profiles">
            Only the founder is listed on the official website. Add further team members here once their details are approved.
          </EmptyState>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
