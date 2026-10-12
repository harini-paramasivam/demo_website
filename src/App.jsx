import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CompanyOverview from './pages/CompanyOverview.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Careers from './pages/Careers.jsx';
import ServicesOverview from './pages/ServicesOverview.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';
import Contact from './pages/Contact.jsx';
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
    f(); window.addEventListener('scroll', f, { passive: true });
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
          <Route path="/about/careers" element={<Careers />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/resources/news-events" element={<ResourcePage type="news-events" />} />
          <Route path="/resources/case-studies" element={<ResourcePage type="case-studies" />} />
          <Route path="/resources/client-testimonials" element={<ResourcePage type="client-testimonials" />} />
          <Route path="/resources/guides-insights" element={<ResourcePage type="guides-insights" />} />
          <Route path="/blog" element={<ResourcePage type="blog" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <button type="button" className={`totop${showTop ? ' show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={22} aria-hidden="true" /></button>
    </>
  );
}
