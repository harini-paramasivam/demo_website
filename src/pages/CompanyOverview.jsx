import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, BookOpen, RefreshCw } from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';

const values = [
  {
    title: 'Quality',
    desc: 'We check our work twice so you do not have to.',
    icon: CheckCircle2,
  },
  {
    title: 'Inclusion',
    desc: 'Accessibility is not an add-on for us. It is the standard.',
    icon: HeartHandshake,
  },
  {
    title: 'Integrity',
    desc: 'We say what we do and do what we say.',
    icon: Shield,
  },
  {
    title: 'Collaboration',
    desc: 'We work as an extension of your team.',
    icon: BookOpen,
  },
  {
    title: 'Continuous Learning',
    desc: 'Standards evolve and so do we.',
    icon: RefreshCw,
  },
];

export default function CompanyOverview() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Velvora Solutions"
        crumbs={['About Us', 'Company Overview']}
      >
        Transforming manuscripts and documents into structured, accessible, and digital-ready content.
      </PageHero>

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container split split--top">
          <div className="prose">
            <h2>Who We Are</h2>
            <p>
              Velvora Solutions is a content services company that helps publishers, educational institutions, government bodies, and enterprises transform their content into structured, accessible, and digital-ready formats. We specialize in ePublishing, XML, and digital accessibility, and we bring technical depth, process discipline, and genuine care for quality to every project.
            </p>

            <h2>What Sets Us Apart</h2>
            <p>
              We combine publishing know-how with accessibility expertise. Many vendors do one or the other. At Velvora, the same team understands how a book is built and how a screen reader reads it, so the files we deliver work in the real world and not just in a checker.
            </p>
          </div>

          <div className="prose">
            <div className="callout-card">
              <h3>Our Mission</h3>
              <p>
                To make content accessible, discoverable, and usable for every reader, regardless of ability, device, or platform.
              </p>
            </div>

            <div className="callout-card" style={{ marginTop: '1.5rem' }}>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted partner for publishers and organizations building inclusive digital content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="section section--tint">
        <div className="container">
          <div className="sec-head">
            <p className="eyebrow">Guiding Principles</p>
            <h2>Our Values</h2>
            <p className="lead">How we think, work, and collaborate with our clients every single day.</p>
          </div>

          <ul className="why">
            {values.map((v) => {
              const IconCmp = v.icon;
              return (
                <li key={v.title} className="why__card">
                  <span className="why__icon">
                    <IconCmp size={22} aria-hidden="true" />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CLOSING CTA */}
      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
