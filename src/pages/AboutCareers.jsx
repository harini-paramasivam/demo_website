import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  Globe2, 
  TrendingUp, 
  HeartHandshake, 
  Bot,
  Send
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';

const whyWorkPoints = [
  {
    title: 'Training & Certification Support',
    desc: 'Training and certification support in accessibility, publishing, and technology.',
    icon: GraduationCap,
  },
  {
    title: 'Global Project Exposure',
    desc: 'Hands-on exposure to global publishing, accessibility, and data projects.',
    icon: Globe2,
  },
  {
    title: 'Supportive Growth Path',
    desc: 'Supportive team and clear growth path across technical and creative domains.',
    icon: TrendingUp,
  },
  {
    title: 'Inclusive Workplace',
    desc: 'Positive, respectful, and inclusive workplace where every perspective matters.',
    icon: HeartHandshake,
  },
  {
    title: 'AI & Digital Innovation',
    desc: 'Opportunities to work on digital marketing and AI-driven projects.',
    icon: Bot,
  },
];

export default function AboutCareers() {
  useEffect(() => {
    document.title = 'Build Your Career with Velvora | Velvora Solutions';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Careers at Velvora"
        title="Build Your Career with Velvora"
        crumbs={['Home', 'About Us', 'Careers']}
      >
        Work on meaningful projects that make information available to people who might otherwise be left out.
      </PageHero>

      {/* INTRO SECTION */}
      <section className="section netbg" style={{ background: 'linear-gradient(180deg, #0a0c14 0%, #0d0f1a 100%)' }}>
        <div className="container">
          <div className="career-philosophy-card" style={{ maxWidth: '900px', marginInline: 'auto' }}>
            <span className="badge-eyebrow">
              <Sparkles size={16} /> Meaningful Impact
            </span>
            <h2 className="career-section-h2">Curiosity, Ownership &amp; Steady Learning</h2>
            <p className="career-philosophy-card__text">
              At Velvora Solutions, you will work on meaningful projects that make information available to people who might otherwise be left out. We are a growing team that values curiosity, ownership, and steady learning.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="section why-section-dark netbg">
        <div className="container">
          <div className="sec-head sec-head--dark text-center" style={{ marginInline: 'auto' }}>
            <p className="eyebrow eyebrow--dark">The Velvora Culture</p>
            <h2 style={{ color: '#ffffff' }}>Why Work With Us</h2>
            <p className="lead" style={{ marginInline: 'auto', maxWidth: '64ch', color: '#cbd5e1' }}>
              We provide the environment, tools, and mentorship you need to advance your career.
            </p>
          </div>

          {/* Funnel Layout: Row 1 has 3 cards, Row 2 has 2 centered cards */}
          <div className="why-work-funnel">
            <div className="why-work-funnel__row why-work-funnel__row--top">
              {whyWorkPoints.slice(0, 3).map((item) => {
                const IconCmp = item.icon;
                return (
                  <div key={item.title} className="grow-pod">
                    <div className="grow-pod__icon-wrap">
                      <IconCmp size={24} />
                    </div>
                    <h3 className="grow-pod__title">{item.title}</h3>
                    <p className="grow-pod__desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="why-work-funnel__row why-work-funnel__row--bottom">
              {whyWorkPoints.slice(3, 5).map((item) => {
                const IconCmp = item.icon;
                return (
                  <div key={item.title} className="grow-pod">
                    <div className="grow-pod__icon-wrap">
                      <IconCmp size={24} />
                    </div>
                    <h3 className="grow-pod__title">{item.title}</h3>
                    <p className="grow-pod__desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS NOTICE */}
      <section className="section why-section-dark netbg">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="career-panel-header text-center">
            <span className="pill"><i /> Current Openings</span>
            <h2 className="career-section-h2" style={{ color: '#ffffff' }}>Open Positions</h2>
            <p className="lead" style={{ color: '#cbd5e1', margin: '0 auto 2rem' }}>
              We do not have open positions right now. Send your resume to <strong className="accent">info@velvorasolutions.com</strong> and we will keep it on file.
            </p>
            <div className="career-openings-btn-row">
              <a
                href="mailto:info@velvorasolutions.com?subject=Resume%20Submission%20-%20Velvora%20Solutions"
                className="btn btn--orange btn--lg"
              >
                <span>Send Your Resume</span>
                <Send size={18} aria-hidden="true" />
              </a>
              <Link to="/careers" className="btn btn--outline btn--lg">
                <span>Explore Full Careers Portal</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Shape the Future with Us?"
        text="Whether you are an accessibility tester, XML expert, or developer, we always welcome passionate talent."
        primaryBtnText="Get in Touch"
        primaryBtnTo="/contact"
      />
    </>
  );
}
