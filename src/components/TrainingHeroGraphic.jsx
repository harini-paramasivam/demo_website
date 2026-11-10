import { useState, useEffect, useRef } from 'react';
import { Sparkles, Code, BookOpen, Cpu, BarChart3, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrainingHeroGraphic({ onEnquireClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [clickCelebration, setClickCelebration] = useState(false);
  const containerRef = useRef(null);

  const speechMessages = [
    { text: '👋 Welcome to Velvora Academy!', badge: 'Start Here', color: '#38bdf8' },
    { text: '💡 100% Guaranteed Live Project Exposure', badge: 'Real Workflows', color: '#10b981' },
    { text: '🚀 Master AI/ML, GenAI, RAG & Python', badge: 'Next-Gen', color: '#a855f7' },
    { text: '🎓 Official Velvora Certificate & PPO Pathway', badge: 'Career Boost', color: '#f59e0b' },
    { text: '📍 Centers in Cuddalore & Chennai + Virtual Live', badge: 'Hybrid Mode', color: '#38bdf8' }
  ];

  // Rotate speech messages automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpeechIdx((prev) => (prev + 1) % speechMessages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [speechMessages.length]);

  // Mouse parallax tracking
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
      setTimeout(() => onEnquireClick(), 400);
    }
  };

  const tiltX = (mousePos.y * -14).toFixed(2);
  const tiltY = (mousePos.x * 18).toFixed(2);

  return (
    <div
      ref={containerRef}
      className="training-hero-art"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      role="region"
      aria-label="Interactive Academy Learning Mascot and Station"
    >
      {/* Background Holographic Glow & Grid Orbits */}
      <div className="th-glow-radial" aria-hidden="true" />
      <div className="th-grid-lines" aria-hidden="true" />

      {/* Orbit Ring 1 (Clockwise) */}
      <div
        className="th-orbit th-orbit--outer"
        style={{
          transform: `translate(-50%, -50%) rotate(${mousePos.x * 25}deg)`
        }}
        aria-hidden="true"
      >
        <div className="th-orbit-node th-node-ai" title="AI & Machine Learning">
          <Cpu size={14} />
          <span>AI/ML</span>
        </div>
        <div className="th-orbit-node th-node-genai" title="Generative AI & LLMs">
          <Sparkles size={14} />
          <span>GenAI</span>
        </div>
        <div className="th-orbit-node th-node-bi" title="Data Analytics & BI">
          <BarChart3 size={14} />
          <span>BI & Data</span>
        </div>
      </div>

      {/* Orbit Ring 2 (Counter-Clockwise) */}
      <div
        className="th-orbit th-orbit--inner"
        style={{
          transform: `translate(-50%, -50%) rotate(${-mousePos.y * 30}deg)`
        }}
        aria-hidden="true"
      >
        <div className="th-orbit-node th-node-epub" title="ePublishing & JATS XML">
          <BookOpen size={13} />
          <span>ePub & XML</span>
        </div>
        <div className="th-orbit-node th-node-dev" title="Software Development">
          <Code size={13} />
          <span>Full-Stack</span>
        </div>
        <div className="th-orbit-node th-node-intern" title="Student Internship">
          <GraduationCap size={13} />
          <span>Internship</span>
        </div>
      </div>

      {/* Animated Speech Bubble */}
      <div
        className="th-speech-bubble"
        key={activeSpeechIdx}
        style={{
          borderColor: speechMessages[activeSpeechIdx].color,
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)`
        }}
      >
        <div className="th-speech-badge" style={{ backgroundColor: `${speechMessages[activeSpeechIdx].color}20`, color: speechMessages[activeSpeechIdx].color }}>
          <Sparkles size={11} />
          <span>{speechMessages[activeSpeechIdx].badge}</span>
        </div>
        <p className="th-speech-text">{speechMessages[activeSpeechIdx].text}</p>
        <div className="th-speech-tail" style={{ borderTopColor: speechMessages[activeSpeechIdx].color }} />
      </div>

      {/* CENTRAL 3D ACADEMY ROBOT MASCOT */}
      <div
        className={`th-mascot-pod ${isWaving ? 'is-waving' : ''} ${clickCelebration ? 'is-celebrating' : ''}`}
        onClick={handleMascotClick}
        title="Click me to explore courses & enroll!"
        tabIndex="0"
        role="button"
        aria-label="Velza Academy Mentor Mascot – Click to open enrollment form"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMascotClick(); }}
      >
        {/* Anti-Gravity Shadow Base */}
        <div className="th-pod-shadow" aria-hidden="true" />
        <div className="th-pod-pedestal" aria-hidden="true" />

        {/* SVG Robot Character */}
        <svg
          viewBox="0 0 280 320"
          className="th-mascot-svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="visorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#070e24" />
              <stop offset="50%" stopColor="#0c1b42" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Aura Halo */}
          <ellipse cx="140" cy="275" rx="75" ry="16" fill="rgba(56, 189, 248, 0.25)" filter="url(#neonGlow)" />

          {/* Left Leg */}
          <g className="th-leg-left">
            <rect x="105" y="215" width="22" height="42" rx="10" fill="url(#armorGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="116" cy="256" rx="15" ry="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          </g>

          {/* Right Leg */}
          <g className="th-leg-right">
            <rect x="153" y="215" width="22" height="42" rx="10" fill="url(#armorGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="164" cy="256" rx="15" ry="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          </g>

          {/* Robot Torso / Chassis */}
          <rect x="92" y="130" width="96" height="92" rx="28" fill="url(#armorGrad)" stroke="#334155" strokeWidth="3" />
          
          {/* Academy Core Chest Plate */}
          <rect x="106" y="145" width="68" height="60" rx="16" fill="#09132e" stroke="#38bdf8" strokeWidth="2" />
          
          {/* Animated Energy Core Heartbeat */}
          <circle cx="140" cy="175" r="14" fill="url(#cyanNeon)" filter="url(#neonGlow)" className="th-pulse-core" />
          <path d="M 125 175 L 133 175 L 137 167 L 143 183 L 147 175 L 155 175" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck Link */}
          <rect x="126" y="116" width="28" height="18" rx="6" fill="#334155" />

          {/* Robot Head */}
          <rect x="80" y="44" width="120" height="76" rx="34" fill="url(#armorGrad)" stroke="#334155" strokeWidth="3" />
          
          {/* Side Audio Sensors / Ears */}
          <rect x="68" y="62" width="14" height="38" rx="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="75" cy="81" r="3" fill="#ffffff" />
          <rect x="198" y="62" width="14" height="38" rx="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="205" cy="81" r="3" fill="#ffffff" />

          {/* High-Tech Visor Screen */}
          <rect x="94" y="56" width="92" height="48" rx="20" fill="url(#visorGlass)" stroke="#38bdf8" strokeWidth="2" />

          {/* Expressive Glowing Eyes */}
          <ellipse cx="122" cy="78" rx="10" ry="12" fill="#38bdf8" filter="url(#neonGlow)" className="th-eye" />
          <ellipse cx="122" cy="78" rx="6" ry="7" fill="#ffffff" />
          
          <ellipse cx="158" cy="78" rx="10" ry="12" fill="#38bdf8" filter="url(#neonGlow)" className="th-eye" />
          <ellipse cx="158" cy="78" rx="6" ry="7" fill="#ffffff" />

          {/* Friendly Visor Smile */}
          <path d="M 130 92 Q 140 98 150 92" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Futuristic Academy Graduation Cap / Crest */}
          <path d="M 140 18 L 195 34 L 140 50 L 85 34 Z" fill="#0f172a" stroke="url(#goldCap)" strokeWidth="2.5" />
          <circle cx="140" cy="34" r="4.5" fill="#fbbf24" />
          <path d="M 140 34 Q 170 36 178 52" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="178" cy="54" r="3" fill="#f59e0b" />

          {/* Left Arm (Holding Glowing Interactive Learning Tablet) */}
          <g className="th-arm-left">
            <rect x="68" y="142" width="26" height="52" rx="12" fill="url(#armorGrad)" stroke="#475569" strokeWidth="2" />
            <circle cx="81" cy="198" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* Holographic Learning Tablet */}
            <rect x="42" y="172" width="56" height="74" rx="8" fill="#070e24" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(-15 70 200)" />
            {/* Glowing lines on tablet */}
            <line x1="52" y1="188" x2="84" y2="188" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="198" x2="78" y2="198" stroke="#10b981" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="208" x2="88" y2="208" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
            <line x1="52" y1="218" x2="72" y2="218" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 70 200)" />
          </g>

          {/* Right Arm (Dynamic Waving / Welcoming Gesture) */}
          <g className="th-arm-right">
            <rect x="186" y="142" width="26" height="52" rx="12" fill="url(#armorGrad)" stroke="#475569" strokeWidth="2" />
            <circle cx="199" cy="198" r="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Floating Call to Action Pill */}
        <div className="th-click-cta">
          <Sparkles size={13} className="th-cta-sparkle" />
          <span>Click to Enroll / Enquire</span>
          <ArrowRight size={13} />
        </div>
      </div>

      {/* Floating Status Badges */}
      <div className="th-floating-badge th-badge-left">
        <CheckCircle2 size={16} className="th-badge-icon" />
        <div>
          <span className="th-badge-title">2,000+ Hours</span>
          <span className="th-badge-sub">Live Mentorship Delivered</span>
        </div>
      </div>

      <div className="th-floating-badge th-badge-right">
        <GraduationCap size={16} className="th-badge-icon th-badge-icon--orange" />
        <div>
          <span className="th-badge-title">100% Live Projects</span>
          <span className="th-badge-sub">Cuddalore & Chennai Hubs</span>
        </div>
      </div>
    </div>
  );
}

