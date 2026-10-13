import { User } from 'lucide-react';
import { teamMembers } from '../data/site.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

export default function OurTeam() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Meet the People Behind Velvora"
        crumbs={['About Us', 'Our Team']}
      >
        Publishing professionals, XML specialists, accessibility testers, and project managers delivering reliable results.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: '75ch', marginBottom: '3rem' }}>
            <h2>Our People, Our Strength</h2>
            <p className="lead">
              Our strength is our people. Velvora&apos;s team includes publishing professionals, XML specialists, accessibility testers, and project managers who work together to deliver reliable results.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article key={member.name} className="team-card">
                <div className="team-card__avatar">
                  <div className="avatar-placeholder" aria-hidden="true">
                    <User size={48} strokeWidth={1.5} />
                  </div>
                  <span className="sr">{member.alt}</span>
                </div>
                <div className="team-card__content">
                  <p className="eyebrow">{member.designation}</p>
                  <h3>{member.name}</h3>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to Collaborate with Our Specialists?"
        text="Discuss your project with our accessibility, XML, and production leads today."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
