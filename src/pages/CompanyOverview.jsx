import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  BookOpen, 
  RefreshCw, 
  Layers, 
  Sparkles, 
  Compass, 
  Check, 
  Target 
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';

const values = [
  {
    title: 'Quality',
    desc: 'We check our work twice so you don’t have to.',
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
    icon: ShieldCheck,
  },
  {
    title: 'Collaboration',
    desc: 'We work as an extension of your team.',
    icon: BookOpen,
  },
  {
    title: 'Continuous Learning',
    desc: 'Standards and technology evolve, and so do we.',
    icon: RefreshCw,
  },
];

export default function CompanyOverview() {
  useEffect(() => {
    document.title = 'About Velvora Solutions | Company Overview';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Velvora Solutions"
        crumbs={['Home', 'About Us', 'Company Overview']}
      >
        Transforming content and data into structured, accessible, and digital-ready assets for organizations worldwide.
      </PageHero>

      {/* WHO WE ARE & MISSION / VISION */}
      <section className="section">
        <div className="container split split--top">
          <div className="prose">
            <span className="badge-eyebrow">
              <Sparkles size={16} /> Content &amp; Technology Services
            </span>
            <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>Who We Are</h2>
            <p className="lead" style={{ color: '#334155', lineHeight: 1.7 }}>
              Velvora Solutions is a content and technology services company that helps publishers, educational institutions, government bodies, and enterprises transform their content and data into structured, accessible, and digital-ready assets. We specialize in ePublishing, XML, digital accessibility, AI automation, software development, data analytics, and digital marketing. Every project we deliver reflects technical depth, process discipline, and genuine care for quality.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <span className="badge-eyebrow">
                <Compass size={16} /> The Velvora Advantage
              </span>
              <h2 className="career-section-h2" style={{ color: 'var(--ink)' }}>What Sets Us Apart</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.75 }}>
                We combine publishing know-how with accessibility and technology expertise. Many vendors do only one of these. At Velvora, the same team understands how a book is built, how a screen reader reads it, and how automation or marketing can amplify it—so the files, systems, and campaigns we deliver work in the real world, not just in a checker.
              </p>
            </div>
          </div>

          <div className="prose">
            <div className="callout-card" style={{ padding: '2.2rem 2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orange)', marginBottom: '0.6rem' }}>
                <Target size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Purpose</span>
              </div>
              <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.45rem', color: '#ffffff' }}>Our Mission</h3>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                To make content accessible, discoverable, and usable for every reader, regardless of ability, device, or platform.
              </p>
            </div>

            <div className="callout-card" style={{ marginTop: '1.5rem', padding: '2.2rem 2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orange)', marginBottom: '0.6rem' }}>
                <Compass size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Future Horizon</span>
              </div>
              <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.45rem', color: '#ffffff' }}>Our Vision</h3>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                To be the most trusted partner for publishers and organizations building inclusive digital content and smarter workflows.
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
        title="Ready to Partner with Velvora Solutions?"
        text="Tell us about your publishing, accessibility, or technology project and our specialists will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
