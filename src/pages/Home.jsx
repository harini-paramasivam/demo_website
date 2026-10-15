import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { company, whyChoose, numbersStrip, resourceHubs } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import HeroArt from '../components/HeroArt.jsx';
import AboutArt from '../components/AboutArt.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import { SectionHead, CtaBand } from '../components/ui.jsx';
import { useReveal, CountUp } from '../components/hooks.jsx';

export default function Home() {
  useReveal();

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero netbg">
        <div className="container hero__in">
          <div className="hero__copy">
            <p className="pill">
              <i />ePublishing · XML · Digital Accessibility
            </p>
            <h1>
              Content That Works for <span className="accent">Everyone, Everywhere</span>
            </h1>
            <span className="rule" aria-hidden="true" />
            <p className="lead lead--dark">
              {company.heroSubheading}
            </p>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--orange btn--lg">
                Get in Touch <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/services" className="btn btn--outline btn--lg">
                Explore Our Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ul className="chips" aria-label="Core focus areas">
              <li>EPUB 2 &amp; 3</li>
              <li>JATS / BITS XML</li>
              <li>WCAG 2.2</li>
              <li>PDF/UA</li>
              <li>Section 508</li>
            </ul>
          </div>
          <HeroArt />
        </div>

        {/* NUMBERS STRIP */}
        <div className="container stats" aria-label="Key statistics">
          <div>
            <b><CountUp to={10} />+</b>
            <span>Years of Experience</span>
          </div>
          <div>
            <b><CountUp to={5000} />+</b>
            <span>Titles Converted</span>
          </div>
          <div>
            <b><CountUp to={50000} />+</b>
            <span>Documents Remediated</span>
          </div>
          <div>
            <b><CountUp to={100} />+</b>
            <span>Satisfied Clients</span>
          </div>
        </div>
        <p className="scroll" aria-hidden="true">
          Scroll<i />
        </p>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="section">
        <div className="container about">
          <div className="reveal">
            <p className="eyebrow">About Velvora</p>
            <h2 className="xl">
              Your Content Partner from <br />
              <span className="blue">Manuscript to Millions of Readers</span>
            </h2>
            <p className="lead">
              {company.introText}
            </p>
            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <Link to="/about/company-overview" className="arrowlink">
                <span className="circ">
                  <ArrowUp size={18} aria-hidden="true" />
                </span>
                About Velvora Solutions <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="artpanel reveal">
            <AboutArt />
          </div>
        </div>
      </section>

      {/* 3. SERVICES AT A GLANCE */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Services at a Glance"
            title="Complete Content Services Under One Roof"
          >
            We convert, structure, and remediate content so it can be published anywhere and read by anyone.
          </SectionHead>
          <ServiceCards />
        </div>
      </section>

      {/* 4. WHY CHOOSE VELVORA */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why Choose Velvora"
            title="Standards, expertise, and precision you can count on"
          >
            Publishing know-how meets accessibility excellence. Here is why leading publishers and enterprises partner with us.
          </SectionHead>
          <ul className="why">
            {whyChoose.map((item, i) => (
              <li
                key={item.title}
                className="why__card reveal"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span className="why__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. RESOURCES & INSIGHTS */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Resources & Insights"
            title="Explore our latest updates, case studies, and insights"
          />
          <ul className="rcards">
            {resourceHubs.map((r, i) => (
              <li key={r.slug} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link to={r.to} className="rcard">
                  <span className="rcard__img netbg">
                    <Icon name={r.icon} size={44} />
                  </span>
                  <span className="rcard__body">
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                    <span className="scard__go">
                      Explore<span className="sr"> {r.title}</span> <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. CLOSING CALL TO ACTION */}
      <CtaBand
        title="Ready to Make Your Content Accessible and Future-Ready?"
        text="Tell us about your project and our team will respond within one business day."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore Our Services"
        secondaryBtnTo="/services"
      />
    </>
  );
}
