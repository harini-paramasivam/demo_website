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
      <section className="section">
        <div className="container">
          <div className="career-philosophy-card reveal" style={{ maxWidth: '900px', marginInline: 'auto' }}>
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
      <section className="section section--tint">
        <div className="container">
          <div className="sec-head text-center" style={{ marginInline: 'auto' }}>
            <p className="eyebrow">The Velvora Culture</p>
            <h2>Why Work With Us</h2>
            <p className="lead" style={{ marginInline: 'auto', maxWidth: '64ch' }}>
              We provide the environment, tools, and mentorship you need to advance your career.
            </p>
          </div>

          <div className="career-grow-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {whyWorkPoints.map((item) => {
              const IconCmp = item.icon;
              return (
                <div key={item.title} className="grow-pod" style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="grow-pod__icon-wrap">
                    <IconCmp size={24} />
                  </div>
                  <h3 className="grow-pod__title" style={{ color: '#0f172a' }}>{item.title}</h3>
                  <p className="grow-pod__desc" style={{ color: '#475569' }}>{item.desc}</p>
                </div>
              );
            })}
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
              We do not have open positions right now. Send your resume to <strong className="accent">careers@velvorasolutions.com</strong> and we will keep it on file.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="mailto:careers@velvorasolutions.com?subject=Resume%20Submission%20-%20Velvora%20Solutions"
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
