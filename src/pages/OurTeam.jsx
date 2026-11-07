import { useEffect } from 'react';
import { User, Sparkles, Award } from 'lucide-react';
import { teamMembers } from '../data/site.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

export default function OurTeam() {
  useEffect(() => {
    document.title = 'Meet the People Behind Velvora | Velvora Solutions';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Leadership & Specialists"
        title="Meet the People Behind Velvora"
        crumbs={['Home', 'About Us', 'Our Team']}
      >
        Publishing professionals, XML specialists, accessibility testers, data and automation engineers, digital marketers, and project managers who work together to deliver reliable results.
      </PageHero>

      <section className="section team-section-glass">
        {/* Ambient atmospheric smoke orbs */}
        <div className="team-smoke-orb team-smoke-orb--1" aria-hidden="true" />
        <div className="team-smoke-orb team-smoke-orb--2" aria-hidden="true" />
        <div className="team-smoke-orb team-smoke-orb--3" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="prose" style={{ maxWidth: '82ch', marginBottom: '3.5rem' }}>
            <span className="badge-eyebrow">
              <Sparkles size={16} /> Our People, Our Strength
            </span>
            <h2 className="career-section-h2" style={{ color: '#ffffff' }}>
              United by Craft, Driven by Quality
            </h2>
            <p className="lead" style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Our strength is our people. Velvora’s team includes publishing professionals, XML specialists, accessibility testers, data and automation engineers, digital marketers, and project managers who work together to deliver reliable results.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article key={member.name} className="team-card team-card--glass">
                {/* Internal card refractive aurora smoke beam */}
                <div className="team-card__smoke" aria-hidden="true" />
                <div className="team-card__glow-mesh" aria-hidden="true" />

                <div className="team-card__avatar">
                  <div className="avatar-placeholder" role="img" aria-label={member.alt}>
                    <User size={48} strokeWidth={1.5} />
                  </div>
                  <span className="sr">{member.alt}</span>
                </div>
                <div className="team-card__content">
                  <p className="eyebrow eyebrow--cyan">{member.designation}</p>
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
        text="Discuss your project with our accessibility, XML, engineering, and production leads today."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
