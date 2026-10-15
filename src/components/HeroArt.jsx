// High-end Luxury Hero Visual for Velvora Solutions: Production-Grade Digital Publishing & Accessibility
export default function HeroArt() {
  return (
    <div className="hero__art hero__art--modern" aria-hidden="true">
      {/* Ambient warm gold atmospheric glow */}
      <div className="hero-art-glow" />

      {/* Main showcase frame */}
      <div className="hero-art-frame">
        <img
          src="/hero-velvora-elite.jpg"
          alt="Velvora Solutions – High-End Digital Publishing, Structured XML and Universal Accessibility"
          className="hero-art-img"
          width="700"
          height="700"
          loading="eager"
        />

        {/* Floating Glassmorphic Badge: WCAG 2.2 Level AA Verified */}
        <div className="hero-badge hero-badge--top">
          <span className="hero-badge__dot hero-badge__dot--green" />
          <div className="hero-badge__content">
            <strong>WCAG 2.2 &amp; PDF/UA</strong>
            <small>Universal Accessibility Verified</small>
          </div>
        </div>

        {/* Floating Glassmorphic Badge: EPUB 3 & JATS XML */}
        <div className="hero-badge hero-badge--bottom">
          <span className="hero-badge__dot hero-badge__dot--gold" />
          <div className="hero-badge__content">
            <strong>EPUB 3 &amp; JATS XML</strong>
            <small>Structured Multi-Format Delivery</small>
          </div>
        </div>
      </div>
    </div>
  );
}
