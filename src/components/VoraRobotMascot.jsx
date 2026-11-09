import React from 'react';

/**
 * VoraRobotMascot
 * Premium, adorable 2D/2.5D animated robot mascot for Velvora Solutions.
 * Supports independently articulated components:
 * - Walking leg cycles with glowing anti-gravity boot soles
 * - Head tilting (down for reading, upright for greeting visitor)
 * - Visor eyes: reading scan, friendly look-up, natural blink, happy smile
 * - Open animated manuscript book with 3D page-flip animation
 * - Waving hand with independent arm articulation
 * - Closing book animation for transition into launcher
 */
export default function VoraRobotMascot({
  size = 120,
  isWalking = false,
  isWaving = false,
  isReading = true,
  isBookClosed = false,
  isEntering = false,
  eyesState = 'reading', // 'reading' | 'look-up' | 'blink' | 'happy' | 'curious'
  headTilt = 'down',     // 'down' | 'front' | 'up'
  className = '',
  onClick
}) {
  return (
    <div
      className={`vora-robot-wrapper ${isWalking ? 'is-walking' : ''} ${isWaving ? 'is-waving' : ''} ${isReading ? 'is-reading' : ''} ${isEntering ? 'is-entering' : ''} ${className}`}
      style={{
        width: size,
        height: size * 1.25,
        display: 'inline-block',
        position: 'relative',
        transformOrigin: 'bottom center'
      }}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 180 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vora-robot-svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Head & Body Gradients */}
          <linearGradient id="voraHeadGrad" x1="45" y1="20" x2="135" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f1f5f9" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="voraVisorGrad" x1="50" y1="45" x2="130" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="60%" stopColor="#0a193d" />
            <stop offset="100%" stopColor="#020817" />
          </linearGradient>

          <linearGradient id="voraChestGrad" x1="55" y1="100" x2="125" y2="165" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="55%" stopColor="#0a132c" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="voraCyanCore" x1="78" y1="120" x2="102" y2="144" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Book Gradients */}
          <linearGradient id="voraBookCoverGrad" x1="0" y1="0" x2="38" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="voraPageGrad" x1="0" y1="0" x2="30" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient id="voraRibbonGrad" x1="0" y1="0" x2="8" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Glow & Shadow Filters */}
          <filter id="voraCyanGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="voraCoreBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="voraSubtleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* Dynamic Soft Ground Shadow */}
        <ellipse
          className="vora-shadow"
          cx="90"
          cy="208"
          rx="42"
          ry="7.5"
          fill="rgba(2, 6, 23, 0.45)"
        />

        {/* ========================================================================= */}
        {/* LEGS & FEET (Independently Articulated Walking Gait) */}
        {/* ========================================================================= */}
        <g className="vora-legs-group">
          {/* Left Leg (Rear Leg in Walking Cycle) */}
          <g className="vora-leg vora-leg-left">
            {/* Upper Thigh */}
            <rect x="68" y="158" width="13" height="32" rx="6.5" fill="#64748b" />
            {/* Metallic Knee Joint Ring */}
            <circle cx="74.5" cy="172" r="7" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="74.5" cy="172" r="2.5" fill="#38bdf8" />
            {/* Ergonomic Rounded Cyber Boot */}
            <path
              d="M62 186C62 182 70 182 76 182H88C92.5 182 94 186 94 191C94 196 90 198 86 198H65C62.5 198 62 191 62 186Z"
              fill="#334155"
            />
            {/* Glowing Anti-Gravity Hover Sole */}
            <path
              d="M63 196H92C93.5 196 93.5 199 91.5 199H64C62.5 199 62 196 63 196Z"
              fill="#38bdf8"
              filter="url(#voraCyanGlow)"
            />
          </g>

          {/* Right Leg (Front Leg in Walking Cycle) */}
          <g className="vora-leg vora-leg-right">
            {/* Upper Thigh */}
            <rect x="99" y="158" width="13" height="32" rx="6.5" fill="#475569" />
            {/* Metallic Knee Joint Ring */}
            <circle cx="105.5" cy="172" r="7" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="105.5" cy="172" r="2.5" fill="#00f2fe" />
            {/* Ergonomic Rounded Cyber Boot */}
            <path
              d="M93 186C93 182 101 182 107 182H119C123.5 182 125 186 125 191C125 196 121 198 117 198H96C93.5 198 93 191 93 186Z"
              fill="#1e293b"
            />
            {/* Glowing Anti-Gravity Hover Sole */}
            <path
              d="M94 196H123C124.5 196 124.5 199 122.5 199H95C93.5 199 93 196 94 196Z"
              fill="#00f2fe"
              filter="url(#voraCyanGlow)"
            />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TORSO & CHASSIS (Natural Bobbing & Sway) */}
        {/* ========================================================================= */}
        <g className="vora-body-group">
          {/* Main Armor Pod */}
          <rect
            x="54"
            y="102"
            width="72"
            height="64"
            rx="28"
            fill="url(#voraChestGrad)"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="2"
            filter="url(#voraSubtleShadow)"
          />

          {/* Shoulder Spheres */}
          <circle cx="54" cy="115" r="9.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="126" cy="115" r="9.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />

          {/* Chest Plate Inset */}
          <rect
            x="66"
            y="112"
            width="48"
            height="42"
            rx="16"
            fill="#060c1d"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
          />

          {/* Arc Reactor Core with Radiant Aura */}
          <circle cx="90" cy="132" r="11" fill="url(#voraCyanCore)" filter="url(#voraCoreBloom)" />
          <circle cx="90" cy="132" r="6.5" fill="#ffffff" opacity="0.95" />

          {/* Status Gauge Telemetry Lines */}
          <line x1="77" y1="147" x2="84" y2="147" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="87" y1="147" x2="93" y2="147" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="96" y1="147" x2="103" y2="147" stroke="#00f2fe" strokeWidth="1.8" strokeLinecap="round" />

          {/* ======================================================================= */}
          {/* HEAD & FACE (Articulated Tilt & Expressive Eyes) */}
          {/* ======================================================================= */}
          <g
            className={`vora-head-group vora-head--tilt-${headTilt}`}
            style={{
              transformOrigin: '90px 96px',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Top Antenna */}
            <path d="M90 34V16" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="90" cy="13" r="7" fill="#00f2fe" filter="url(#voraCyanGlow)" />
            <circle cx="90" cy="13" r="3" fill="#ffffff" />

            {/* Audio Sensor Ears */}
            <rect x="38" y="52" width="9" height="26" rx="4.5" fill="#64748b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="42.5" cy="65" r="2.5" fill="#38bdf8" filter="url(#voraCyanGlow)" />
            <rect x="133" y="52" width="9" height="26" rx="4.5" fill="#64748b" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="137.5" cy="65" r="2.5" fill="#38bdf8" filter="url(#voraCyanGlow)" />

            {/* Pearlescent Head Dome */}
            <rect
              x="43"
              y="30"
              width="94"
              height="70"
              rx="30"
              fill="url(#voraHeadGrad)"
              stroke="#ffffff"
              strokeWidth="2.2"
              filter="url(#voraSubtleShadow)"
            />

            {/* Glossy Top Specular Highlight */}
            <path
              d="M58 40C70 33 110 33 122 40"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Cyber Visor Screen */}
            <rect
              x="52"
              y="44"
              width="76"
              height="46"
              rx="20"
              fill="url(#voraVisorGrad)"
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth="1.6"
            />

            {/* Diagonal Visor Glare Streak */}
            <path d="M59 48L76 48L64 86L55 86Z" fill="rgba(255, 255, 255, 0.08)" />

            {/* ------------------------------------------------------------------- */}
            {/* VISOR EYES (Expressive Animated States) */}
            {/* ------------------------------------------------------------------- */}

            {/* 1. READING EYES: Looking down towards the book in hands */}
            {eyesState === 'reading' && (
              <g className="vora-eyes vora-eyes--reading" filter="url(#voraCyanGlow)">
                {/* Left Eye Cast Down */}
                <ellipse cx="71" cy="71" rx="5.5" ry="4" fill="#00f2fe" className="vora-eye-pupil-reading" />
                <circle cx="73" cy="70" r="1.8" fill="#ffffff" />
                {/* Right Eye Cast Down */}
                <ellipse cx="109" cy="71" rx="5.5" ry="4" fill="#00f2fe" className="vora-eye-pupil-reading" />
                <circle cx="111" cy="70" r="1.8" fill="#ffffff" />
                {/* Subtle Rosy Reading Glow */}
                <circle cx="63" cy="77" r="3" fill="rgba(56, 189, 248, 0.3)" />
                <circle cx="117" cy="77" r="3" fill="rgba(56, 189, 248, 0.3)" />
              </g>
            )}

            {/* 2. LOOK-UP / CURIOUS EYES: Notice the visitor with wide curious gaze */}
            {eyesState === 'look-up' && (
              <g className="vora-eyes vora-eyes--lookup" filter="url(#voraCyanGlow)">
                <ellipse cx="71" cy="62" rx="6.5" ry="7" fill="#00f2fe" />
                <circle cx="73" cy="59.5" r="2.5" fill="#ffffff" />
                <circle cx="69" cy="64.5" r="1.2" fill="#ffffff" />

                <ellipse cx="109" cy="62" rx="6.5" ry="7" fill="#00f2fe" />
                <circle cx="111" cy="59.5" r="2.5" fill="#ffffff" />
                <circle cx="107" cy="64.5" r="1.2" fill="#ffffff" />
              </g>
            )}

            {/* 3. HAPPY / SMILING EYES: Cheerful greeting inverted-crescents */}
            {eyesState === 'happy' && (
              <g className="vora-eyes vora-eyes--happy" filter="url(#voraCyanGlow)">
                <path d="M64 66C64 58 76 58 76 66" stroke="#00f2fe" strokeWidth="4.8" strokeLinecap="round" fill="none" />
                <path d="M104 66C104 58 116 58 116 66" stroke="#00f2fe" strokeWidth="4.8" strokeLinecap="round" fill="none" />
                <circle cx="61" cy="74" r="3.5" fill="rgba(56, 189, 248, 0.45)" />
                <circle cx="119" cy="74" r="3.5" fill="rgba(56, 189, 248, 0.45)" />
              </g>
            )}

            {/* 4. BLINK EYES: Gentle horizontal glow line during blink */}
            {eyesState === 'blink' && (
              <g className="vora-eyes vora-eyes--blink" filter="url(#voraCyanGlow)">
                <line x1="64" y1="65" x2="76" y2="65" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" />
                <line x1="104" y1="65" x2="116" y2="65" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Cheerful Robot Smile */}
            <path
              d="M84 79C88 82.5 92 82.5 96 79"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#voraCyanGlow)"
            />
          </g>

          {/* ======================================================================= */}
          {/* ARMS & THE ANIMATED VELVORA BOOK */}
          {/* ======================================================================= */}

          {/* MODE A: READING POSTURE (Holding open book in front while walking) */}
          {isReading && !isWaving && (
            <g className="vora-reading-rig">
              {/* Left Arm Holding Left Side of Open Book */}
              <g className="vora-arm-read-left">
                <path d="M52 116C46 128 54 142 66 146" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
                <circle cx="66" cy="146" r="6.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              </g>

              {/* Right Arm Holding Right Side of Open Book */}
              <g className="vora-arm-read-right">
                <path d="M128 116C134 128 126 142 114 146" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
                <circle cx="114" cy="146" r="6.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              </g>

              {/* THE OPEN BOOK WITH ANIMATED PAGES & VELVORA MONOGRAM */}
              <g className={`vora-open-book ${isBookClosed ? 'is-closed' : ''}`} transform="translate(62, 130)">
                {/* Book Blue Hard Cover (Open Wings) */}
                <path
                  d="M2 10C2 4 8 2 28 4L28 38C8 36 2 40 2 40Z"
                  fill="url(#voraBookCoverGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />
                <path
                  d="M54 10C54 4 48 2 28 4L28 38C48 36 54 40 54 40Z"
                  fill="url(#voraBookCoverGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />

                {/* Left Open Page with Printed Lines */}
                <path d="M5 8C12 7 20 6 28 6V36C20 35 12 36 5 37Z" fill="url(#voraPageGrad)" />
                <line x1="8" y1="12" x2="24" y2="11" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="16" x2="22" y2="15" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="20" x2="24" y2="19" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="24" x2="19" y2="23" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="28" x2="23" y2="27" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

                {/* Right Open Page with Printed Lines */}
                <path d="M51 8C44 7 36 6 28 6V36C36 35 44 36 51 37Z" fill="url(#voraPageGrad)" />
                <line x1="32" y1="11" x2="48" y2="12" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="32" y1="15" x2="46" y2="16" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="32" y1="19" x2="48" y2="20" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="32" y1="23" x2="44" y2="24" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="32" y1="27" x2="47" y2="28" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

                {/* ANIMATED FLIPPING / TURNING PAGE */}
                <g className="vora-turning-page" style={{ transformOrigin: '28px 6px' }}>
                  <path
                    d="M28 6C36 6.5 44 7.5 50 8.5V36.5C44 35.5 36 35.5 28 36Z"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="0.8"
                  />
                  <line x1="31" y1="12" x2="46" y2="13" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
                  <line x1="31" y1="17" x2="44" y2="18" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
                  <line x1="31" y1="22" x2="45" y2="23" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
                </g>

                {/* Central Spine with Glowing Golden Ribbon Bookmark */}
                <line x1="28" y1="4" x2="28" y2="39" stroke="#075985" strokeWidth="2.5" />
                <path d="M28 38V47L31 45L34 47V38" fill="url(#voraRibbonGrad)" />

                {/* Thumbs Gripping the Book Margins */}
                <circle cx="5" cy="22" r="4.5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
                <circle cx="51" cy="22" r="4.5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
              </g>
            </g>
          )}

          {/* MODE B: GREETING & WAVING POSTURE (Holding book at side, right hand waving) */}
          {isWaving && (
            <g className="vora-greeting-rig">
              {/* Left Arm (Holding Closed Book at Hip) */}
              <g className="vora-arm-hold-book">
                <path d="M50 116C38 126 34 140 40 152" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
                <circle cx="40" cy="152" r="6.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />

                {/* Book Tucked at Side */}
                <g className="vora-book-tucked" transform="translate(24, 138) rotate(18)">
                  <rect x="0" y="0" width="22" height="32" rx="3.5" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                  <rect x="2" y="0" width="20" height="32" rx="2.5" fill="url(#voraBookCoverGrad)" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="22" y1="4" x2="22" y2="28" stroke="#f8fafc" strokeWidth="2" />
                  <path d="M8 12L12 21L16 12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 32V39L14.5 37.5L17 39V32" fill="url(#voraRibbonGrad)" />
                </g>
              </g>

              {/* Right Arm (Waving Cheerfully at Visitor) */}
              <g className="vora-arm-waving" style={{ transformOrigin: '128px 116px' }}>
                <path d="M128 116C138 108 148 94 144 80" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
                {/* Waving Palm & Cute Cyber Fingers */}
                <circle cx="144" cy="78" r="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="140" cy="71" r="2.5" fill="#e2e8f0" />
                <circle cx="145" cy="70" r="2.5" fill="#e2e8f0" />
                <circle cx="150" cy="72" r="2.5" fill="#e2e8f0" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
