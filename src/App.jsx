import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CompanyOverview from './pages/CompanyOverview.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Careers from './pages/Careers.jsx';
import AboutCareers from './pages/AboutCareers.jsx';
import ServicesOverview from './pages/ServicesOverview.jsx';
import SolutionsOverview from './pages/SolutionsOverview.jsx';
import PartnerWithUs from './pages/PartnerWithUs.jsx';
import Insights from './pages/Insights.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';
import Contact from './pages/Contact.jsx';
import AccessibilityStatement from './pages/AccessibilityStatement.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import NotFound from './pages/NotFound.jsx';

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
    const f = () => setShowTop(window.scrollY > 500);
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
          {/* 5 Independent Homepage Theme Experiment Routes */}
          <Route path="/index-obsidian-gold.html" element={<Home initialTheme="obsidian-gold" />} />
          <Route path="/theme/obsidian-gold" element={<Home initialTheme="obsidian-gold" />} />
          <Route path="/index-burnt-orange.html" element={<Home initialTheme="burnt-orange" />} />
          <Route path="/theme/burnt-orange" element={<Home initialTheme="burnt-orange" />} />
          <Route path="/index-ivory-champagne.html" element={<Home initialTheme="ivory-champagne" />} />
          <Route path="/theme/ivory-champagne" element={<Home initialTheme="ivory-champagne" />} />
          <Route path="/index-emerald-gold.html" element={<Home initialTheme="emerald-gold" />} />
          <Route path="/theme/emerald-gold" element={<Home initialTheme="emerald-gold" />} />
          <Route path="/index-burgundy-rosegold.html" element={<Home initialTheme="burgundy-rosegold" />} />
          <Route path="/theme/burgundy-rosegold" element={<Home initialTheme="burgundy-rosegold" />} />
          {/* Gold Suite & Complementary Luxury Themes */}
          <Route path="/theme/venetian-gold" element={<Home initialTheme="venetian-gold" />} />
          <Route path="/index-venetian-gold.html" element={<Home initialTheme="venetian-gold" />} />
          <Route path="/theme/imperial-gold" element={<Home initialTheme="imperial-gold" />} />
          <Route path="/index-imperial-gold.html" element={<Home initialTheme="imperial-gold" />} />
          <Route path="/theme/sahara-bronze" element={<Home initialTheme="sahara-bronze" />} />
          <Route path="/index-sahara-bronze.html" element={<Home initialTheme="sahara-bronze" />} />
          <Route path="/theme/nordic-sage" element={<Home initialTheme="nordic-sage" />} />
          {/* Light Theme Suite Routes */}
          <Route path="/theme/porcelain-azure" element={<Home initialTheme="porcelain-azure" />} />
          <Route path="/index-porcelain-azure.html" element={<Home initialTheme="porcelain-azure" />} />
          <Route path="/theme/mint-breeze" element={<Home initialTheme="mint-breeze" />} />
          <Route path="/index-mint-breeze.html" element={<Home initialTheme="mint-breeze" />} />
          <Route path="/theme/sunrise-peach" element={<Home initialTheme="sunrise-peach" />} />
          <Route path="/index-sunrise-peach.html" element={<Home initialTheme="sunrise-peach" />} />
          <Route path="/theme/pearl-platinum" element={<Home initialTheme="pearl-platinum" />} />
          <Route path="/index-pearl-platinum.html" element={<Home initialTheme="pearl-platinum" />} />
          {/* Logo-Suited Light Theme Suite Routes */}
          <Route path="/theme/amber-honey" element={<Home initialTheme="amber-honey" />} />
          <Route path="/index-amber-honey.html" element={<Home initialTheme="amber-honey" />} />
          <Route path="/theme/platinum-silver-gold" element={<Home initialTheme="platinum-silver-gold" />} />
          <Route path="/index-platinum-silver-gold.html" element={<Home initialTheme="platinum-silver-gold" />} />
          <Route path="/theme/gilded-cashmere" element={<Home initialTheme="gilded-cashmere" />} />
          <Route path="/index-gilded-cashmere.html" element={<Home initialTheme="gilded-cashmere" />} />
          <Route path="/theme/sunburst-gold" element={<Home initialTheme="sunburst-gold" />} />
          <Route path="/index-sunburst-gold.html" element={<Home initialTheme="sunburst-gold" />} />
          {/* Legacy fallback aliases */}
          <Route path="/theme/cyber-teal" element={<Home initialTheme="venetian-gold" />} />
          <Route path="/theme/electric-cobalt" element={<Home initialTheme="imperial-gold" />} />


          <Route path="/about/company-overview" element={<CompanyOverview />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/careers" element={<AboutCareers />} />
          <Route path="/about/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/partner" element={<PartnerWithUs />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/solutions" element={<SolutionsOverview />} />
          <Route path="/solutions-overview" element={<SolutionsOverview />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/resources/insights" element={<Insights />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/resources/news-events" element={<ResourcePage type="news-events" />} />
          <Route path="/resources/case-studies" element={<ResourcePage type="case-studies" />} />
          <Route path="/resources/client-testimonials" element={<ResourcePage type="client-testimonials" />} />
          <Route path="/blog" element={<ResourcePage type="blog" />} />
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
    </>
  );
}
