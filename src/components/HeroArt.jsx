import { transitionBannerContent } from '../data/site.js';

export default function HeroArt({
  activeIdx,
  setActiveIdx,
  isHeld,
  setIsHeld,
  onNext,
  onPrev
}) {
  const current = transitionBannerContent[activeIdx] || transitionBannerContent[0];

  return (
    <div 
      className={`hero-ref-stage${isHeld ? ' is-paused' : ''}`}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      role="region"
      aria-label={`${current.title} 3D architectural showcase`}
    >
      {/* 1. Volumetric Ambient Glow Blooms behind the artwork */}
      <div className="hero-ref-glow hero-ref-glow--cyan" aria-hidden="true" />
      <div className="hero-ref-glow hero-ref-glow--sapphire" aria-hidden="true" />
      <div className="hero-ref-glow hero-ref-glow--magenta" aria-hidden="true" />

      {/* 2. Glowing Geometric Prism Polygon directly behind the 3D subject */}
      <div className="hero-ref-prism" aria-hidden="true" />

      {/* 3. Borderless 3D Subject Artwork */}
      <div className="hero-ref-visual-stage">
        <div className="hero-ref-img-wrap" key={current.image}>
          <img
            src={current.image}
            alt={`Velvora 3D Artwork for ${current.title}`}
            className="hero-ref-img"
            width="1376"
            height="768"
            loading="eager"
          />
          {/* Subtle bottom/side gradient fade blending subject into canvas */}
          <div className="hero-ref-fade-bottom" aria-hidden="true" />
          <div className="hero-ref-fade-left" aria-hidden="true" />
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
