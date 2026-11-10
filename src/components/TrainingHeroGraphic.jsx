import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Code, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';

export default function TrainingHeroGraphic({ onEnquireClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [clickCelebration, setClickCelebration] = useState(false);
  const containerRef = useRef(null);

  const speechMessages = [
    { text: '100% Guaranteed Live Project Exposure', badge: 'Real Workflows', color: '#10b981', tag: 'Live Projects' },
    { text: 'Master AI/ML, GenAI, Python & RAG', badge: 'Next-Gen Tech', color: '#38bdf8', tag: 'AI & Data' },
    { text: 'Official Velvora Certificate & PPO Pathway', badge: 'Career Boost', color: '#fbbf24', tag: 'Internship' },
    { text: 'Industry-Standard ePublishing & XML', badge: 'Publishing Standards', color: '#c084fc', tag: 'Publishing' },
    { text: 'Cuddalore & Chennai Hubs + Virtual Live', badge: 'Hybrid Mode', color: '#00f5d4', tag: 'Flexible' }
  ];

  // Rotate speech message cleanly every 4.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpeechIdx((prev) => (prev + 1) % speechMessages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [speechMessages.length]);

  // Subtle 3D mouse parallax tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleMascotClick = () => {
    setIsWaving(true);
    setClickCelebration(true);
    setTimeout(() => setIsWaving(false), 1400);
    setTimeout(() => setClickCelebration(false), 2000);
    if (typeof onEnquireClick === 'function') {
      setTimeout(() => onEnquireClick(), 350);
    }
  };

  const currentSpeech = speechMessages[activeSpeechIdx];
  const tiltX = (mousePos.y * -10).toFixed(2);
  const tiltY = (mousePos.x * 12).toFixed(2);

  return (
    <div
      ref={containerRef}
      className="th-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }}
      role="region"
      aria-label="Interactive Academy Learning Mascot and Station"
    >
      {/* 1. AMBIENT CYBERNETIC BACKDROP (Non-overlapping, soft glow) */}
      <div className="th-backdrop-glow" aria-hidden="true" />
      <div className="th-radar-ring th-radar-ring--1" aria-hidden="true" />
      <div className="th-radar-ring th-radar-ring--2" aria-hidden="true" />

      {/* 2. TOP-LEFT CARD: VELZA ACADEMY LIVE TRANSMISSION SPEECH BUBBLE */}
      <div
        className="th-card th-card--speech"
        style={{
          borderColor: `${currentSpeech.color}55`,
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -6}px)`
        }}
      >
        <div className="th-card-header">
          <span className="th-card-badge" style={{ backgroundColor: `${currentSpeech.color}20`, color: currentSpeech.color }}>
            <Sparkles size={11} />
            <span>{currentSpeech.badge}</span>
          </span>
          <span className="th-pulse-dot" style={{ backgroundColor: currentSpeech.color }} />
        </div>
        <p className="th-card-speech-text" key={activeSpeechIdx}>
          {currentSpeech.text}
        </p>
      </div>

      {/* 3. TOP-RIGHT CARD: AI/ML & GENAI TRACK */}
      <div
        className="th-card th-card--top-right"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * -8}px)`
        }}
      >
        <div className="th-card-icon-wrap th-card-icon-wrap--cyan">
          <Cpu size={16} />
        </div>
        <div className="th-card-info">
          <span className="th-card-title">AI/ML & GenAI</span>
          <span className="th-card-sub">Python · LLMs · RAG</span>
        </div>
        <span className="th-live-pill th-live-pill--cyan">Active</span>
      </div>

      {/* 4. BOTTOM-LEFT CARD: EPUBLISHING & ACCESSIBILITY */}
      <div
        className="th-card th-card--bottom-left"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * 8}px)`
        }}
      >
        <div className="th-card-icon-wrap th-card-icon-wrap--purple">
          <BookOpen size={16} />
        </div>
        <div className="th-card-info">
          <span className="th-card-title">ePublishing & XML</span>
          <span className="th-card-sub">JATS · EPUB 3 · WCAG</span>
        </div>
        <span className="th-live-pill th-live-pill--purple">Verified</span>
      </div>

      {/* 5. BOTTOM-RIGHT CARD: VERIFIED INTERNSHIP & PPO */}
      <div
        className="th-card th-card--bottom-right"
        style={{
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 10}px)`
        }}
      >
        <div className="th-card-icon-wrap th-card-icon-wrap--amber">
          <GraduationCap size={16} />
        </div>
        <div className="th-card-info">
          <span className="th-card-title">100% Live Projects</span>
          <span className="th-card-sub">Cuddalore & Chennai</span>
        </div>
        <span className="th-live-pill th-live-pill--amber">PPO Track</span>
      </div>

      {/* 6. CENTER: MAJESTIC 3D ROBOT MASCOT POD */}
      <div
        className={`th-mascot-pod ${isWaving ? 'is-waving' : ''} ${clickCelebration ? 'is-celebrating' : ''}`}
        onClick={handleMascotClick}
        title="Click Velza to explore courses & enroll!"
        tabIndex="0"
        role="button"
        aria-label="Velza Academy Mascot – Click to open enrollment form"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMascotClick(); }}
      >
        {/* Anti-Gravity Shadow Base & Pedestal */}
        <div className="th-pod-shadow" aria-hidden="true" />
        <div className="th-pedestal-ring" aria-hidden="true" />

        {/* SVG Robot Character */}
        <svg
          viewBox="0 0 280 320"
          className="th-mascot-svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="thArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="thCyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="thVisorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#070e24" />
              <stop offset="50%" stopColor="#0c1b42" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="thGoldCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="thNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Aura Halo */}
          <ellipse cx="140" cy="275" rx="75" ry="16" fill="rgba(56, 189, 248, 0.28)" filter="url(#thNeonGlow)" />

          {/* Left Leg */}
          <g className="th-leg-left">
            <rect x="105" y="215" width="22" height="42" rx="10" fill="url(#thArmorGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="116" cy="256" rx="15" ry="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          </g>

          {/* Right Leg */}
          <g className="th-leg-right">
            <rect x="153" y="215" width="22" height="42" rx="10" fill="url(#thArmorGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="164" cy="256" rx="15" ry="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          </g>

          {/* Robot Torso / Chassis */}
          <rect x="92" y="130" width="96" height="92" rx="28" fill="url(#thArmorGrad)" stroke="#334155" strokeWidth="3" />
          
          {/* Academy Core Chest Plate */}
          <rect x="106" y="145" width="68" height="60" rx="16" fill="#09132e" stroke="#38bdf8" strokeWidth="2" />
          
          {/* Animated Energy Core Heartbeat */}
          <circle cx="140" cy="175" r="14" fill="url(#thCyanNeon)" filter="url(#thNeonGlow)" className="th-pulse-core" />
          <path d="M 125 175 L 133 175 L 137 167 L 143 183 L 147 175 L 155 175" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck Link */}
          <rect x="126" y="116" width="28" height="18" rx="6" fill="#334155" />

          {/* Robot Head */}
          <rect x="80" y="44" width="120" height="76" rx="34" fill="url(#thArmorGrad)" stroke="#334155" strokeWidth="3" />
          
          {/* Side Audio Sensors / Ears */}
          <rect x="68" y="62" width="14" height="38" rx="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="75" cy="81" r="3" fill="#ffffff" />
          <rect x="198" y="62" width="14" height="38" rx="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="205" cy="81" r="3" fill="#ffffff" />

          {/* High-Tech Visor Screen */}
          <rect x="94" y="56" width="92" height="48" rx="20" fill="url(#thVisorGlass)" stroke="#38bdf8" strokeWidth="2" />

          {/* Expressive Glowing Eyes */}
          <ellipse cx="122" cy="78" rx="10" ry="12" fill="#38bdf8" filter="url(#thNeonGlow)" className="th-eye" />
          <ellipse cx="122" cy="78" rx="6" ry="7" fill="#ffffff" />
          
          <ellipse cx="158" cy="78" rx="10" ry="12" fill="#38bdf8" filter="url(#thNeonGlow)" className="th-eye" />
          <ellipse cx="158" cy="78" rx="6" ry="7" fill="#ffffff" />

          {/* Friendly Visor Smile */}
          <path d="M 130 92 Q 140 98 150 92" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Futuristic Academy Graduation Cap */}
          <path d="M 140 18 L 195 34 L 140 50 L 85 34 Z" fill="#0f172a" stroke="url(#thGoldCap)" strokeWidth="2.5" />
          <circle cx="140" cy="34" r="4.5" fill="#fbbf24" />
          <path d="M 140 34 Q 170 36 178 52" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="178" cy="54" r="3" fill="#f59e0b" />

          {/* Left Arm (Holding Glowing Interactive Learning Tablet) */}
          <g className="th-arm-left">
            <rect x="68" y="142" width="26" height="52" rx="12" fill="url(#thArmorGrad)" stroke="#475569" strokeWidth="2" />
            <circle cx="81" cy="198" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* Holographic Learning Tablet */}
            <rect x="42" y="172" width="56" height="74" rx="8" fill="#070e24" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(-15 70 200)" />
            {/* Multi-Colored Glowing Code Lines */}
            <line x1="52" y1="188" x2="84" y2="188" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="198" x2="78" y2="198" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="208" x2="88" y2="208" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="218" x2="72" y2="218" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
          </g>

          {/* Right Arm (Dynamic Waving / Welcoming Gesture) */}
          <g className="th-arm-right">
            <rect x="186" y="142" width="26" height="52" rx="12" fill="url(#thArmorGrad)" stroke="#475569" strokeWidth="2" />
            <circle cx="199" cy="198" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Floating Call to Action Capsule */}
        <div className="th-click-cta">
          <Zap size={13} className="th-cta-sparkle" />
          <span>Click to Enroll / Apply</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}
