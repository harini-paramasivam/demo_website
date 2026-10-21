export default function AboutArt() {
  return (
    <div className="about-art-frame">
      <div className="about-art-glow" />
      <img
        src="/about-manuscript.jpg"
        alt="Velvora Solutions – From Manuscript to Millions of Readers with Structured XML & Universal Accessibility"
        className="about-art-img"
        width="800"
        height="600"
        loading="lazy"
      />

      {/* Floating Glassmorphic Badges in Brand Orange Theme */}
      <div className="about-badge about-badge--top">
        <span className="about-badge__dot" />
        <div>
          <strong>JATS / BITS XML &amp; EPUB 3</strong>
          <small>Structured Semantic Conversion</small>
        </div>
      </div>

      <div className="about-badge about-badge--bottom">
        <span className="about-badge__dot about-badge__dot--gold" />
        <div>
          <strong>WCAG 2.2 &amp; PDF/UA Compliant</strong>
          <small>Global Universal Accessibility</small>
        </div>
      </div>
    </div>
  );
}
