import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ArrowUp, Phone } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { company } from './data/site.js';
import Home from './pages/Home.jsx';
import CompanyOverview from './pages/CompanyOverview.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Careers from './pages/Careers.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import AboutCareers from './pages/AboutCareers.jsx';
import ServicesOverview from './pages/ServicesOverview.jsx';
import SolutionsOverview from './pages/SolutionsOverview.jsx';
import PartnerWithUs from './pages/PartnerWithUs.jsx';
import Insights from './pages/Insights.jsx';
import Training from './pages/Training.jsx';
import TrainingProgramPage from './pages/TrainingProgramPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';
import BlogOverview from './pages/BlogOverview.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import AccessibilityStatement from './pages/AccessibilityStatement.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import NotFound from './pages/NotFound.jsx';
import VoraChat from './components/VoraChat.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let ticking = false;
    let currentShow = false;
    const f = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 500;
          if (shouldShow !== currentShow) {
            currentShow = shouldShow;
            setShowTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about/company-overview" element={<CompanyOverview />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/careers" element={<Navigate to="/careers" replace />} />
          <Route path="/about/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<JobDetailPage />} />
          <Route path="/partner" element={<PartnerWithUs />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:slug" element={<TrainingProgramPage />} />
          <Route path="/training-and-internships" element={<Training />} />
          <Route path="/services/accessibility-training-and-consulting" element={<Training />} />
          <Route path="/solutions" element={<SolutionsOverview />} />
          <Route path="/solutions-overview" element={<SolutionsOverview />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/resources/insights" element={<Insights />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/resources/news-events" element={<ResourcePage type="news-events" />} />
          <Route path="/resources/case-studies" element={<ResourcePage type="case-studies" />} />
          <Route path="/resources/client-testimonials" element={<ResourcePage type="client-testimonials" />} />
          <Route path="/blog" element={<BlogOverview />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <button
        type="button"
        className={`totop${showTop ? ' show' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={22} aria-hidden="true" />
      </button>

      {/* Floating Call Button strictly for Mobile View Alone */}
      <a
        href={`tel:${company.phone.replace(/\s+/g, '')}`}
        className="mobile-phone-launcher"
        aria-label={`Call Velvora Solutions at ${company.phoneFormatted}`}
        title="Call Us"
      >
        <span className="mobile-phone-pulse" aria-hidden="true" />
        <div className="mobile-phone-inner">
          <Phone size={22} className="mobile-phone-icon" />
          <span className="mobile-phone-online-dot" aria-hidden="true" />
        </div>
      </a>

      <VoraChat />
    </>
  );
}
