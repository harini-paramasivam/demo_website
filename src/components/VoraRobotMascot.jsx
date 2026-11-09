import React from 'react';

/**
 * VoraRobotMascot
 * Professional 2D/2.5D cute, friendly mascot character for Velvora Solutions.
 * Features:
 * - Expressive glowing cyan ocular visor (blinking / smiling eyes)
 * - Holding a small tech-manuscript book with glowing bookmark
 * - Natural limb kinematics: swinging arms, bobbing chassis, stepping feet
 * - Cyber obsidian and satin platinum shell matching Velvora brand identity
 */
export default function VoraRobotMascot({
  size = 110,
  isWalking = false,
  isWaving = false,
  isTalking = false,
  eyesState = 'happy', // 'happy' | 'blink' | 'curious'
  className = '',
  onClick
}) {
  return (
    <div 
      className={`vora-robot-wrapper ${isWalking ? 'is-walking' : ''} ${isWaving ? 'is-waving' : ''} ${isTalking ? 'is-talking' : ''} ${className}`}
      style={{ width: size, height: size * 1.25, display: 'inline-block', position: 'relative' }}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vora-robot-svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Head & Body Gradients */}
          <linearGradient id="voraHeadGrad" x1="40" y1="20" x2="120" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="voraVisorGrad" x1="45" y1="40" x2="115" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#040711" />
            <stop offset="100%" stopColor="#0b1736" />
          </linearGradient>

          <linearGradient id="voraChestGrad" x1="50" y1="95" x2="110" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#090e1d" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <linearGradient id="voraCyanCore" x1="70" y1="115" x2="90" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>

          {/* Book Gradients */}
          <linearGradient id="voraBookCover" x1="0" y1="0" x2="28" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="voraGoldBookmark" x1="0" y1="0" x2="10" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="voraCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="voraSubtleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0284c7" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Dynamic Ground Shadow */}
        <ellipse 
          className="vora-shadow"
          cx="80" 
          cy="192" 
          rx="38" 
          ry="7" 
          fill="rgba(2, 6, 23, 0.45)" 
        />

        {/* ========================================================================= */}
        {/* LEGS & FEET (Natural Stepping Kinematics) */}
        {/* ========================================================================= */}
        <g className="vora-legs-group">
          {/* Left Leg (Back when walking) */}
          <g className="vora-leg vora-leg-left">
            <rect x="60" y="146" width="12" height="28" rx="6" fill="#64748b" />
            {/* Cute Rounded Boot with Cyan Sole */}
            <path d="M54 172C54 168 62 168 67 168H78C82 168 83 172 83 176C83 180 80 182 76 182H57C54.5 182 54 176 54 172Z" fill="#334155" />
            <path d="M55 180H81C82 180 82 183 80 183H56C54 183 54 180 55 180Z" fill="#38bdf8" filter="url(#voraCyanGlow)" />
          </g>

          {/* Right Leg (Front when walking) */}
          <g className="vora-leg vora-leg-right">
            <rect x="88" y="146" width="12" height="28" rx="6" fill="#475569" />
            {/* Cute Rounded Boot with Cyan Sole */}
            <path d="M82 172C82 168 90 168 95 168H106C110 168 111 172 111 176C111 180 108 182 104 182H85C82.5 182 82 176 82 172Z" fill="#1e293b" />
            <path d="M83 180H109C110 180 110 183 108 183H84C82 183 82 180 83 180Z" fill="#00d2ff" filter="url(#voraCyanGlow)" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TORSO & CHASSIS (Natural Bob & Sway) */}
        {/* ========================================================================= */}
        <g className="vora-body-group">
          {/* Body Main Armor (Egg-like rounded cyber pod) */}
          <rect 
            x="48" 
            y="94" 
            width="64" 
            height="58" 
            rx="24" 
            fill="url(#voraChestGrad)" 
            stroke="rgba(56, 189, 248, 0.4)" 
            strokeWidth="1.8"
            filter="url(#voraSubtleShadow)"
          />

          {/* Shoulder Armor Pauldrons */}
          <ellipse cx="48" cy="106" rx="9" ry="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="112" cy="106" rx="9" ry="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

          {/* Chest Plate Inlay */}
          <rect x="58" y="104" width="44" height="38" rx="14" fill="#070d1e" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

          {/* Glowing Arc Reactor / Core */}
          <circle cx="80" cy="122" r="10" fill="url(#voraCyanCore)" filter="url(#voraCyanGlow)" />
          <circle cx="80" cy="122" r="6" fill="#ffffff" opacity="0.9" />

          {/* Subtle Cyber Status Gauge lines */}
          <line x1="68" y1="135" x2="74" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="77" y1="135" x2="83" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="86" y1="135" x2="92" y2="135" stroke="#00f2fe" strokeWidth="1.5" strokeLinecap="round" />

          {/* ======================================================================= */}
          {/* HEAD & FACE (Expressive Eyes & Antenna) */}
          {/* ======================================================================= */}
          <g className="vora-head-group">
            {/* Little Antenna with Glowing Bulb */}
            <path d="M80 32V18" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="80" cy="14" r="6" fill="#00d2ff" filter="url(#voraCyanGlow)" />
            <circle cx="80" cy="14" r="2.5" fill="#ffffff" />

            {/* Ear Cylinders / Audio Sensors */}
            <rect x="34" y="48" width="8" height="24" rx="4" fill="#64748b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="38" cy="60" r="2" fill="#38bdf8" filter="url(#voraCyanGlow)" />
            <rect x="118" y="48" width="8" height="24" rx="4" fill="#64748b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="122" cy="60" r="2" fill="#38bdf8" filter="url(#voraCyanGlow)" />

            {/* Head Dome */}
            <rect 
              x="38" 
              y="28" 
              width="84" 
              height="64" 
              rx="28" 
              fill="url(#voraHeadGrad)" 
              stroke="#ffffff" 
              strokeWidth="2"
              filter="url(#voraSubtleShadow)"
            />

            {/* Gloss Highlight on top of head */}
            <path d="M50 36C60 31 100 31 110 36" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round" />

            {/* Digital Visor Display Screen */}
            <rect 
              x="46" 
              y="40" 
              width="68" 
              height="42" 
              rx="18" 
              fill="url(#voraVisorGrad)" 
              stroke="rgba(56, 189, 248, 0.4)" 
              strokeWidth="1.5"
            />

            {/* Visor Glare Streak */}
            <path d="M52 44L66 44L56 78L48 78Z" fill="rgba(255, 255, 255, 0.08)" />

            {/* Expressive Glowing Eyes */}
            {eyesState === 'happy' && (
              <g className="vora-eyes vora-eyes--happy" filter="url(#voraCyanGlow)">
                {/* Left Happy Curved Eye */}
                <path d="M56 59C56 53 66 53 66 59" stroke="#00f2fe" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Right Happy Curved Eye */}
                <path d="M94 59C94 53 104 53 104 59" stroke="#00f2fe" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Cute Cheerful Cheek Blush */}
                <circle cx="53" cy="68" r="3" fill="rgba(56, 189, 248, 0.35)" />
                <circle cx="107" cy="68" r="3" fill="rgba(56, 189, 248, 0.35)" />
              </g>
            )}

            {eyesState === 'blink' && (
              <g className="vora-eyes vora-eyes--blink" filter="url(#voraCyanGlow)">
                <line x1="56" y1="58" x2="66" y2="58" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" />
                <line x1="94" y1="58" x2="104" y2="58" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {eyesState === 'curious' && (
              <g className="vora-eyes vora-eyes--curious" filter="url(#voraCyanGlow)">
                <circle cx="61" cy="58" r="5" fill="#00f2fe" />
                <circle cx="63" cy="56" r="2" fill="#ffffff" />
                <circle cx="99" cy="58" r="6" fill="#00f2fe" />
                <circle cx="101" cy="56" r="2.5" fill="#ffffff" />
              </g>
            )}

            {/* Gentle Smile Line */}
            <path d="M75 72C78 75 82 75 85 72" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" filter="url(#voraCyanGlow)" />
          </g>

          {/* ======================================================================= */}
          {/* LEFT ARM (Waves or Swings Naturally during Walk) */}
          {/* ======================================================================= */}
          <g className="vora-arm-left">
            <path d="M44 107C32 114 26 128 32 138" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            {/* Cute 3-Finger Hand */}
            <circle cx="32" cy="138" r="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          </g>

          {/* ======================================================================= */}
          {/* RIGHT ARM (Holding Little Velvora Publishing Book) */}
          {/* ======================================================================= */}
          <g className="vora-arm-right">
            {/* Forearm angled forward holding book */}
            <path d="M116 107C124 116 126 128 120 136" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <circle cx="120" cy="136" r="6" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />

            {/* THE LITTLE BOOK (Velvora Manuscript / Knowledge Guide) */}
            <g className="vora-book" transform="translate(112, 118) rotate(-14)">
              {/* Back Book Pages Shadow */}
              <rect x="0" y="0" width="28" height="38" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
              {/* Book Blue Cover */}
              <rect x="2" y="0" width="26" height="38" rx="3" fill="url(#voraBookCover)" stroke="#38bdf8" strokeWidth="1" />
              {/* Page Edges */}
              <line x1="28" y1="4" x2="28" y2="34" stroke="#f8fafc" strokeWidth="2.5" />
              <line x1="27" y1="5" x2="27" y2="33" stroke="#94a3b8" strokeWidth="1" />
              {/* Little 'V' Embossed Monogram */}
              <path d="M11 14L16 26L21 14" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#voraCyanGlow)" />
              {/* Glowing Silk Ribbon Bookmark */}
              <path d="M16 38V46L19 44L22 46V38" fill="url(#voraGoldBookmark)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
