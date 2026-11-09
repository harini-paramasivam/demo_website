import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Eye,
  BookOpen,
  Cpu,
  Workflow,
  TrendingUp,
  Briefcase,
  ArrowRight,
  BadgeCheck,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { teamMembers } from '../data/site.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

// Verified department metadata for the 6 specialists (strictly NO photographs)
const specialistMeta = {
  'Rajesh Kumar': {
    initials: 'RK',
    icon: Eye,
    exp: '9 Years Exp',
    cert: 'CPACC & WAS Certified',
    tags: ['WCAG 2.2 AA / AAA', 'PDF/UA & Section 508', 'Assistive Tech Audits']
  },
  'Priya Raman': {
    initials: 'PR',
    icon: BookOpen,
    exp: '8 Years Exp',
    cert: 'Editorial Standards Certified',
    tags: ['XML / HTML5 Typesetting', 'Multilingual Editorial', 'Automated QA Pipelines']
  },
  'Karthik Subramanian': {
    initials: 'KS',
    icon: Cpu,
    exp: '10 Years Exp',
    cert: 'Cloud Architecture & AI',
    tags: ['AI Workflows & LLMs', 'Enterprise Cloud Systems', 'Automation Scripts']
  },
  'Anand Natarajan': {
    initials: 'AN',
    icon: Workflow,
    exp: '11 Years Exp',
    cert: 'Agile & Security Certified',
    tags: ['Operations Governance', 'SLA & Security Compliance', 'Cross-Team Delivery']
  },
  'Shanmugham': {
    initials: 'SM',
    icon: TrendingUp,
    exp: '12+ Years Exp',
    cert: 'Advanced SEO & Strategy',
    tags: ['Search Engine Optimization', 'Global Brand Growth', 'Content Distribution']
  },
  'Hema': {
    initials: 'HE',
    icon: Briefcase,
    exp: '2+ Years Exp',
    cert: 'Client Engagement Specialist',
    tags: ['Strategic Partnerships', 'Market Expansion', 'Client Relations']
  }
};

export default function OurTeam() {
  useEffect(() => {
    document.title = 'Meet the People Behind Velvora | Velvora Solutions';
  }, []);

  const leader = teamMembers[0]; // Iyshwariya Senthil – Founder / Managing Director
  const specialists = teamMembers.slice(1); // 6 employees – displayed without photographs

  return (
    <>
      <PageHero
        eyebrow="Our People, Our Strength"
        title="Meet the People Behind Velvora"
        crumbs={['About Us', 'Our Team']}
      >
        Publishing professionals, XML specialists, accessibility testers, data and automation engineers, digital marketers, and project managers who work together to deliver reliable results.
      </PageHero>

      <div className="team-page-content">
        {/* Ambient atmospheric smoke orbs */}
        <div className="team-smoke-orb team-smoke-orb--1" aria-hidden="true" />
        <div className="team-smoke-orb team-smoke-orb--2" aria-hidden="true" />
        <div className="team-smoke-orb team-smoke-orb--3" aria-hidden="true" />

        {/* ========================================================= */}
        {/* SECTION 1: OUR LEADERSHIP (Only Iyshwariya Senthil)       */}
        {/* ========================================================= */}
        <section className="leadership-section" aria-labelledby="leadership-heading">
          <div className="container">
            <div className="leadership-header">
              <span className="leadership-eyebrow">
                <Sparkles size={16} /> OUR LEADERSHIP
              </span>
              <h2 id="leadership-heading" className="leadership-title">
                Guiding Velvora Forward
              </h2>
              <p className="leadership-subtitle">
                Visionary governance uniting technological precision with human dedication to deliver accessible, world-class publishing and digital solutions.
              </p>
            </div>

            <div className="leadership-showcase">
              {/* Left Column: Portrait Showcase with verified genuine photograph */}
              <div className="leadership-portrait-col">
                <div className="leadership-portrait-frame">
                  <div className="leadership-glow-backing" aria-hidden="true" />
                  <img
                    src="/team-iyshwariya.jpg"
                    alt={leader.alt || 'Portrait of Iyshwariya Senthil, Founder / Managing Director'}
                    className="leadership-img"
                    width={520}
                    height={650}
                    loading="eager"
                  />
                  {/* Floating Cyan Verification Badge */}
                  <div className="leadership-floating-badge">
                    <div className="badge-icon-cyan">
                      <Award size={22} />
                    </div>
                    <div className="badge-text-wrap">
                      <span className="badge-title">7+ Years Experience</span>
                      <span className="badge-caption">Universal Design & Operations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Narrative & Credentials */}
              <div className="leadership-info-col">
                <div className="leadership-role-pill">
                  <span className="pill-dot" />
                  FOUNDER / MANAGING DIRECTOR
                </div>

                <h3 className="leadership-name">{leader.name}</h3>
                <p className="leadership-dept">{leader.department} • Strategic Governance</p>

                <div className="leadership-quote-card">
                  <Quote size={26} className="quote-icon" aria-hidden="true" />
                  <p className="leadership-quote-text">
                    “At Velvora, our mission is to build accessible, precision-driven digital solutions where advanced technology and human craftsmanship converge to deliver uncompromising quality for global organizations.”
                  </p>
                </div>

                <p className="leadership-bio-text">
                  {leader.bio.replace(/^[“"]|[”"]$/g, '')} She oversees Velvora’s strategic roadmap, cultivating deep domain expertise across digital accessibility compliance, scalable content workflows, and mission-critical client operations.
                </p>

                {/* Key Leadership Pillars */}
                <div className="leadership-pillars-grid">
                  <div className="leadership-pillar-card">
                    <div className="pillar-header">
                      <ShieldCheck size={20} className="pillar-icon pillar-icon--cyan" />
                      <h4>Universal Design Certified</h4>
                    </div>
                    <p>Expertise in WCAG 2.2, PDF/UA, and Section 508 standards ensuring universal accessibility conformance.</p>
                  </div>

                  <div className="leadership-pillar-card">
                    <div className="pillar-header">
                      <CheckCircle2 size={20} className="pillar-icon pillar-icon--cyan" />
                      <h4>Publishing Operations</h4>
                    </div>
                    <p>Proven operational leadership orchestrating high-volume XML, eBook conversion, and automated pipelines.</p>
                  </div>
                </div>

                <div className="leadership-action-row">
                  <a
                    href={leader.linkedin || 'https://www.linkedin.com/in/iyshwariya-senthil-bb7707287/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leadership-linkedin-btn"
                    aria-label="Connect with Iyshwariya Senthil on LinkedIn (opens in new tab)"
                  >
                    <Linkedin size={18} className="linkedin-icon" />
                    <span>Connect on LinkedIn</span>
                    <ExternalLink size={14} className="external-icon" />
                  </a>
                  <div className="leadership-verified-badge">
                    <BadgeCheck size={18} />
                    <span>Verified Executive Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: OUR PEOPLE (6 Employees - NO PHOTOGRAPHS)      */}
        {/* ========================================================= */}
        <section className="specialists-section" aria-labelledby="people-heading">
          <div className="container">
            <div className="specialists-header">
              <span className="specialists-eyebrow">
                <Sparkles size={16} /> OUR PEOPLE
              </span>
              <h2 id="people-heading" className="specialists-title">
                The Specialists Behind Our Work
              </h2>
              <p className="specialists-subtitle">
                United by craft and driven by quality. Velvora’s multidisciplinary team combines deep domain expertise across accessibility auditing, XML conversion, production workflows, cloud engineering, and strategic marketing.
              </p>
            </div>

            <div className="specialists-grid">
              {specialists.map((member) => {
                const meta = specialistMeta[member.name] || {
                  initials: member.name.split(' ').map((n) => n[0]).join('').slice(0, 2),
                  icon: Sparkles,
                  exp: 'Verified Specialist',
                  cert: 'Industry Certified',
                  tags: ['Quality Assurance', 'Client Excellence']
                };
                const DeptIcon = meta.icon;

                return (
                  <article key={member.name} className="specialist-card">
                    <div className="specialist-card__smoke" aria-hidden="true" />
                    <div className="specialist-card__glow-mesh" aria-hidden="true" />

                    {/* Card Header: Monogram Initials + Dept Badge (NO PHOTO) */}
                    <div className="specialist-card__top">
                      <div className="specialist-monogram" aria-label={`Monogram for ${member.name}`}>
                        <span className="monogram-text">{meta.initials}</span>
                      </div>
                      <div className="specialist-dept-badge">
                        <DeptIcon size={14} className="dept-badge-icon" />
                        <span>{member.department}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="specialist-card__body">
                      <h3 className="specialist-name">{member.name}</h3>
                      <p className="specialist-role">{member.designation}</p>
                      <p className="specialist-bio">{member.bio.replace(/^[“"]|[”"]$/g, '')}</p>
                    </div>

                    {/* Card Footer: Verified Highlights & Specializations */}
                    <div className="specialist-card__footer">
                      <div className="specialist-cert-pill">
                        <CheckCircle2 size={14} className="cert-check-icon" />
                        <span>{meta.cert} • {meta.exp}</span>
                      </div>
                      <div className="specialist-tags-list">
                        {meta.tags.map((tag) => (
                          <span key={tag} className="specialist-tag-item">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <CtaBand
        title="Want to Collaborate with Our Specialists?"
        text="Discuss your project with our accessibility, XML, engineering, and production leads today."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
