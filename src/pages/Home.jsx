import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Accessibility, Bot, UserCheck, ShieldCheck, FileSearch, Code, Check } from 'lucide-react';
import { resourceHubs } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import HeroArt from '../components/HeroArt.jsx';
import AboutArt from '../components/AboutArt.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import { SectionHead, EmptyState, CtaBand } from '../components/ui.jsx';
import { useReveal, CountUp } from '../components/hooks.jsx';

const why = [
  [Accessibility, 'Accessibility at the core', 'PDF accessibility remediation is central to what we do, from tagged structure to reading order.'],
  [Bot, 'AI-assisted workflows', 'Smart automation for faster, more scalable accessibility remediation.'],
  [UserCheck, 'Manual quality assurance', 'Every automated step is backed by manual accessibility verification.'],
  [ShieldCheck, 'Standards alignment', 'Accessibility workflows aligned with international standards, including WCAG and PDF/UA.'],
  [FileSearch, 'Validation and testing', 'PAC validation and screen reader testing as part of delivery.'],
  [Code, 'Technology breadth', 'Web development, Python tooling, automation and IT services under one roof.'],
];

// Step blurbs reuse wording from the official site where it exists.
const steps = [
  ['Document Analysis', 'We review the source document before remediation begins.'],
  ['OCR & Structure Detection', 'OCR processing and structure detection for scanned and untagged documents.'],
  ['Accessibility Remediation', 'Tagged PDFs and reading order correction.'],
  ['Alt Text & Table Fixes', 'Alt text creation and table remediation.'],
  ['PAC Validation', 'Validation with the PDF Accessibility Checker (PAC).'],
  ['Screen Reader Testing', 'Screen reader QA to confirm the document reads as intended.'],
  ['Quality Assurance', 'Manual accessibility verification.'],
  ['Final Delivery', 'The finished, accessible document is delivered.'],
];

const capabilities = [
  ['WCAG', 'Accessibility compliance workflows'],
  ['PDF/UA', 'Accessible document standards'],
  ['AI-assisted remediation', 'Faster, scalable workflows'],
  ['Manual QA', 'Manual accessibility verification'],
  ['PAC validation', 'Document accessibility checks'],
  ['Screen reader testing', 'Real-world QA'],
  ['OCR processing', 'Scanned document cleanup'],
  ['Python development', 'Automation and productivity tools'],
];

export default function Home() {
  const [active, setActive] = useState(2);
  useReveal();
  return (
    <>
      {/* HERO */}
      <section className="hero netbg">
        <div className="container hero__in">
          <div className="hero__copy">
            <p className="pill"><i />Web Development · AI Automation · Accessibility Solutions</p>
            <h1>Making Digital Documents <span className="accent">Accessible</span> for Everyone.</h1>
            <span className="rule" aria-hidden="true" />
            <p className="lead lead--dark">
              Velvora Solutions provides modern web development, AI-powered automation, IT services and accessibility solutions for businesses and global organizations.
            </p>
            <div className="btn-row">
              <Link to="/services" className="btn btn--orange btn--lg">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to="/contact" className="btn btn--outline btn--lg">Get in Touch <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
            <ul className="chips" aria-label="Focus areas">
              <li>WCAG</li><li>PDF/UA</li><li>AI-assisted workflows</li><li>Manual QA</li>
            </ul>
          </div>
        </div>
        <HeroArt />
        <div className="container stats">
          <div><b><CountUp to={7} /></b><span>Service areas</span></div>
          <div><b><CountUp to={8} /></b><span>Workflow steps</span></div>
          <div><b><CountUp to={2} /></b><span>Accessibility standards</span></div>
          <div><b>Global</b><span>Client focus</span></div>
        </div>
        <p className="scroll" aria-hidden="true">Scroll<i /></p>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="container about">
          <div className="reveal">
            <p className="eyebrow">About Velvora</p>
            <h2 className="xl">Technology Expertise.<br />Accessible Outcomes.<br /><span className="blue">Reliable Delivery.</span></h2>
            <p className="lead">
              Velvora Solutions is a technology-driven company dedicated to delivering innovative, accessible, high-quality digital solutions. We specialize in PDF accessibility remediation, web development, AI-powered solutions, digital services and IT consulting, helping businesses, educational institutions, publishers and organizations create inclusive digital experiences.
            </p>
            <Link to="/about/company-overview" className="arrowlink"><span className="circ"><ArrowUp size={18} aria-hidden="true" /></span>About Velvora <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="artpanel reveal"><AboutArt /></div>
        </div>
      </section>

      {/* WHY */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Why Velvora" title="Why organizations work with Velvora Solutions">
            Technology alone does not create accessible content. It takes the right combination of automation, expertise and verification.
          </SectionHead>
          <ul className="why">
            {why.map(([I, t, d], i) => (
              <li key={t} className="why__card reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <span className="why__icon"><I size={22} aria-hidden="true" /></span>
                <h3>{t}</h3><p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Services" title="Seven services. One trusted partner.">
            From accessible documents to automation and software.
          </SectionHead>
          <ServiceCards />
        </div>
      </section>

      {/* WORKFLOW (interactive) */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Our process" title="Our accessibility workflow">
            Eight steps from the first document review to final delivery.
          </SectionHead>
          <div className="flow">
            <ol className="flow__list">
              {steps.map(([t, d], i) => (
                <li key={t}>
                  <button type="button" className={`flow__item${i === active ? ' is-active' : ''}`}
                    aria-current={i === active ? 'step' : undefined}
                    onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                    <span className="flow__n">{String(i + 1).padStart(2, '0')}</span>
                    <span><b>{t}</b><small>{d}</small></span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="flow__panel netbg" aria-live="polite">
              <p className="pill"><i />Step {active + 1} of {steps.length}</p>
              <h3>{steps[active][0]}</h3>
              <p>{steps[active][1]}</p>
              <div className="flow__bar" aria-hidden="true"><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
              <Link to="/services/document-accessibility" className="tlink tlink--light">Explore Document Accessibility <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOVING CAPABILITIES STRIP */}
      <section className="section section--paper">
        <div className="container">
          <SectionHead eyebrow="Capabilities" title="Built on standards, tools and testing." />
        </div>
        <div className="marquee" aria-label="Velvora capabilities">
          <div className="marquee__track">
            {[0, 1].map((k) => (
              <ul key={k} className="marquee__set" aria-hidden={k === 1 ? 'true' : undefined}>
                {capabilities.map(([t, d]) => (
                  <li key={t + k} className="mcard"><b>{t}</b><span>{d}</span></li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="container"><p className="note">Capabilities listed on velvorasolutions.com. No partnerships or certifications are implied.</p></div>
      </section>

      {/* CASE STUDIES */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Featured case studies" title="Project stories, shared when they are ready.">
            Each case study will cover the challenge, services delivered, approach and verified outcomes.
          </SectionHead>
          <EmptyState title="No case studies published yet" action={<p><Link className="tlink" to="/resources/case-studies">Go to Case Studies <ArrowRight size={16} aria-hidden="true" /></Link></p>}>
            Real projects will appear here once approved for publication. No placeholder projects are shown.
          </EmptyState>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Resources and insights" title="Latest thinking from our team" />
          <ul className="rcards">
            {resourceHubs.map((r, i) => (
              <li key={r.slug} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link to={r.to} className="rcard">
                  <span className="rcard__img netbg"><Icon name={r.icon} size={44} /></span>
                  <span className="rcard__body">
                    <h3>{r.title}</h3><p>{r.text}</p>
                    <span className="scard__go">Open<span className="sr"> {r.title}</span> <ArrowRight size={16} aria-hidden="true" /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAREERS */}
      <section className="section">
        <div className="container careers reveal">
          <div>
            <p className="eyebrow">Careers</p>
            <h2>Build accessible digital experiences with us.</h2>
            <p className="lead">Velvora is a technology-driven company working across accessibility, automation and web development.</p>
            <Link to="/about/careers" className="btn btn--navy">View Careers <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ul className="checks" aria-label="Areas we work in">
            {['PDF accessibility', 'AI automation', 'Web development', 'Accessibility QA'].map((t) => (
              <li key={t}><Check size={18} aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
