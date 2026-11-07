import { transitionBannerContent } from '../data/site.js';

export default function HeroArt({
  activeIdx,
  setActiveIdx,
  onNext,
  onPrev
}) {
  const current = transitionBannerContent[activeIdx] || transitionBannerContent[0];

  return (
    <div 
      className="hero-ref-stage"
      role="region"
      aria-label={`${current.title} 3D architectural showcase`}
    >
      {/* 1. Volumetric Ambient Glow Blooms behind the artwork */}
      <div className="hero-ref-glow hero-ref-glow--cyan" aria-hidden="true" />
      <div className="hero-ref-glow hero-ref-glow--sapphire" aria-hidden="true" />
      <div className="hero-ref-glow hero-ref-glow--magenta" aria-hidden="true" />

      {/* 2. Cyber Orbit HUD Rings (Inspired by Behance Reference) */}
      <div className="hero-ref-orbit-ring hero-ref-orbit-ring--outer" aria-hidden="true" />
      <div className="hero-ref-orbit-ring hero-ref-orbit-ring--inner" aria-hidden="true" />
      <div className="hero-ref-orbit-radar" aria-hidden="true" />

      {/* 3. Truly Borderless Transparent 3D Subject (AI Robot in Zero-G) */}
      <div className="hero-ref-visual-stage">
        <div className="hero-ref-transparent-wrap" key={current.image}>
          <img
            src={current.image}
            alt={`Velvora 3D Artwork for ${current.title}`}
            className="hero-ref-transparent-img"
            width="1376"
            height="768"
            loading="eager"
          />
        </div>

        {/* Floating Verified Standards Capsule */}
        {current.badgeTop && (
          <div className="hero-ref-float-badge" key={`badge-top-${activeIdx}`}>
            <span className="hero-ref-badge-dot" />
            <div className="hero-ref-badge-text">
              <strong className="hero-ref-badge-label">{current.badgeTop.label}</strong>
              <span className="hero-ref-badge-sub">{current.badgeTop.sub}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
