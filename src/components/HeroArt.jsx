import { useState, useRef, useCallback } from 'react';
import { transitionBannerContent } from '../data/site.js';

export default function HeroArt({
  activeIdx,
  setActiveIdx,
  onNext,
  onPrev
}) {
  const current = transitionBannerContent[activeIdx] || transitionBannerContent[0];
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    // Normalize -1 to +1
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // Max 10 deg tilt
    setTilt({
      x: nx * 12,
      y: -ny * 12
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={stageRef}
      className={`hero-ref-stage${isHovering ? ' is-tilting' : ''}`}
      role="region"
      aria-label={`${current.title} 3D architectural showcase`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Volumetric Ambient Glow Blooms behind the artwork */}
      <div 
        className="hero-ref-glow hero-ref-glow--cyan" 
        style={{
          transform: isHovering ? `translate(${tilt.x * 1.5}px, ${-tilt.y * 1.5}px)` : 'none',
          transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.6s ease-out'
        }}
        aria-hidden="true" 
      />
      <div 
        className="hero-ref-glow hero-ref-glow--sapphire" 
        style={{
          transform: isHovering ? `translate(${-tilt.x * 1.2}px, ${tilt.y * 1.2}px)` : 'none',
          transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.6s ease-out'
        }}
        aria-hidden="true" 
      />
      <div className="hero-ref-glow hero-ref-glow--magenta" aria-hidden="true" />

      {/* Floating Cyber Particle Mesh */}
      <div className="hero-cyber-particles" aria-hidden="true">
        <span className="h-particle h-p-1" />
        <span className="h-particle h-p-2" />
        <span className="h-particle h-p-3" />
        <span className="h-particle h-p-4" />
        <span className="h-particle h-p-5" />
        <span className="h-particle h-p-6" />
      </div>

      {/* 2. Cyber Orbit HUD Rings (Inspired by Behance Reference) */}
      <div 
        className="hero-ref-orbit-ring hero-ref-orbit-ring--outer" 
        style={{
          transform: isHovering ? `translate3d(${tilt.x * 0.8}px, ${-tilt.y * 0.8}px, 0)` : 'none',
          transition: isHovering ? 'transform 0.2s ease-out' : 'transform 0.7s ease-out'
        }}
        aria-hidden="true" 
      />
      <div 
        className="hero-ref-orbit-ring hero-ref-orbit-ring--inner" 
        style={{
          transform: isHovering ? `translate3d(${-tilt.x * 0.6}px, ${tilt.y * 0.6}px, 0)` : 'none',
          transition: isHovering ? 'transform 0.2s ease-out' : 'transform 0.7s ease-out'
        }}
        aria-hidden="true" 
      />
      <div className="hero-ref-orbit-radar" aria-hidden="true" />

      {/* 3. Truly Borderless Transparent 3D Subject (AI Robot in Zero-G) with Interactive Parallax */}
      <div 
        className="hero-ref-visual-stage"
        style={{
          transform: isHovering 
            ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovering ? 'transform 0.12s ease-out' : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
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
      </div>
    </div>
  );
}
