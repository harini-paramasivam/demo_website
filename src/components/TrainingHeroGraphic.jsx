import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  BookOpen, 
  GraduationCap, 
  Code, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Terminal,
  Award
} from 'lucide-react';
import VoraRobotMascot from './VoraRobotMascot.jsx';

export default function TrainingHeroGraphic({ onEnquireClick }) {
  const [isWaving, setIsWaving] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const featuredTracks = [
    { title: 'AI/ML & GenAI', icon: 'Cpu', badge: 'High Demand', tag: 'Python · PyTorch · RAG', color: '#38bdf8' },
    { title: 'Flagship Internship', icon: 'GraduationCap', badge: '100% Live Projects', tag: 'PPO Pathway · Mentorship', color: '#10b981' },
    { title: 'ePublishing & XML', icon: 'BookOpen', badge: 'Global Standards', tag: 'EPUB 3 · JATS · InDesign', color: '#818cf8' },
    { title: 'Full-Stack Dev', icon: 'Code', badge: 'Modern Stack', tag: 'React · Node · TypeScript', color: '#00f2fe' }
  ];

  // Rotate active track telemetry smoothly every 4.5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTrackIdx((prev) => (prev + 1) % featuredTracks.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, featuredTracks.length]);

  const handleMascotClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1600);
    if (typeof onEnquireClick === 'function') {
      setTimeout(() => onEnquireClick(), 300);
    }
  };

  const currentTrack = featuredTracks[activeTrackIdx];

  return (
    <div
      ref={containerRef}
      className="th-hub-station"
      onMouseEnter={() => { setIsHovered(true); setIsWaving(true); }}
      onMouseLeave={() => { setIsHovered(false); setIsWaving(false); }}
      role="region"
      aria-label="Interactive Academy 3D Learning Hub"
    >
      {/* 1. AMBIENT CYBERNETIC MESH & NEON ENERGY BACKDROP */}
      <div className="th-hub-mesh" aria-hidden="true" />
      <div className="th-energy-ring th-energy-ring--outer" aria-hidden="true" />
      <div className="th-energy-ring th-energy-ring--inner" aria-hidden="true" />

      {/* 2. TOP TELEMETRY STATUS CAPSULE (Clean, High-Tech, Non-Clumsy) */}
      <div className="th-status-capsule">
        <span className="th-status-pulse-dot" />
        <span className="th-status-label">Velvora Academy Live Lab Active</span>
        <span className="th-status-code">v2.4</span>
      </div>

      {/* 3. CENTRAL 3D ROBOT MASCOT STAGE */}
      <div
        className="th-mascot-stage"
        onClick={handleMascotClick}
        title="Click Velza to explore courses & enroll!"
        tabIndex="0"
        role="button"
        aria-label="Interactive 3D Velza Mascot – Click to open enrollment form"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMascotClick(); }}
      >
        {/* Anti-Gravity Holographic Pedestal Platform */}
        <div className="th-holo-platform" aria-hidden="true">
          <div className="th-holo-glow" />
          <div className="th-holo-ring" />
          <div className="th-holo-grid" />
        </div>

        {/* Photorealistic 3D Robot Mascot (Sleek 195px) */}
        <div className="th-mascot-rig">
          <VoraRobotMascot
            size={195}
            isWalking={false}
            isWaving={isWaving}
            isTalking={false}
            className="th-mascot-3d"
          />
        </div>

        {/* Floating Interactive Speech Callout */}
        <div className="th-holo-callout">
          <Sparkles size={14} className="th-callout-sparkle" />
          <span>Learn with Senior Tech Leads & Live Projects</span>
        </div>
      </div>

      {/* 4. DYNAMIC TRACK SWITCHER TELEMETRY CAROUSEL */}
      <div className="th-track-matrix">
        <div className="th-track-selector">
          {featuredTracks.map((tr, idx) => (
            <button
              key={tr.title}
              type="button"
              className={`th-track-tab ${activeTrackIdx === idx ? 'is-active' : ''}`}
              onClick={() => setActiveTrackIdx(idx)}
              aria-label={`Select ${tr.title} track`}
            >
              <span className="th-track-tab-dot" />
              <span className="th-track-tab-name">{tr.title}</span>
            </button>
          ))}
        </div>

        {/* Active Track Telemetry Showcase Card */}
        <div className="th-telemetry-card">
          <div className="th-telemetry-header">
            <div className="th-telemetry-icon-box">
              {currentTrack.icon === 'Cpu' && <Cpu size={18} />}
              {currentTrack.icon === 'GraduationCap' && <GraduationCap size={18} />}
              {currentTrack.icon === 'BookOpen' && <BookOpen size={18} />}
              {currentTrack.icon === 'Code' && <Code size={18} />}
            </div>
            <div>
              <span className="th-telemetry-badge">{currentTrack.badge}</span>
              <h4 className="th-telemetry-title">{currentTrack.title}</h4>
            </div>
            <button
              type="button"
              onClick={handleMascotClick}
              className="th-telemetry-btn"
              title="Apply for this track"
            >
              <span>Enroll</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="th-telemetry-footer">
            <Terminal size={13} className="th-telemetry-term-icon" />
            <span className="th-telemetry-tag">{currentTrack.tag}</span>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM TRUST METRICS STRIP */}
      <div className="th-trust-strip">
        <div className="th-trust-item">
          <ShieldCheck size={14} className="th-trust-check" />
          <span>Verifiable QR Certificate</span>
        </div>
        <div className="th-trust-divider" />
        <div className="th-trust-item">
          <CheckCircle2 size={14} className="th-trust-check" />
          <span>100% Real Production Code</span>
        </div>
        <div className="th-trust-divider" />
        <div className="th-trust-item">
          <Zap size={14} className="th-trust-check" />
          <span>Direct PPO Pathway</span>
        </div>
      </div>
    </div>
  );
}
