export default function HeroCyberWave() {
  return (
    <div className="hero-cyber-wave-container" aria-hidden="true">
      <svg
        className="hero-cyber-wave-svg"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cyberWaveGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.12" />
            <stop offset="35%" stopColor="#00d2ff" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="85%" stopColor="#00d2ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="cyberWaveGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#00d2ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="cyberWaveGradBright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#00d2ff" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.3" />
          </linearGradient>

          <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Undulating Wavy Dotted Topography Grid (Spanning across WORDS SIDE on left & ROBOT on right) */}
        <g className="cyber-wave-mesh" filter="url(#cyberGlow)">
          {/* Base sweeping flow curves */}
          <path
            d="M -50 480 Q 280 420, 580 460 T 1150 410 Q 1320 370, 1500 440"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.8"
            strokeDasharray="3 8"
            className="wave-drift-1"
          />
          <path
            d="M -50 510 Q 300 460, 600 500 T 1180 440 Q 1340 400, 1500 470"
            stroke="url(#cyberWaveGradBright)"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            className="wave-drift-2"
          />
          <path
            d="M -50 540 Q 320 500, 620 530 T 1200 480 Q 1350 440, 1500 510"
            stroke="url(#cyberWaveGradBlue)"
            strokeWidth="1.6"
            strokeDasharray="3 10"
            className="wave-drift-3"
          />
          <path
            d="M -50 570 Q 340 530, 640 565 T 1220 520 Q 1360 480, 1500 550"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.4"
            strokeDasharray="2 8"
            className="wave-drift-1"
          />
          <path
            d="M -50 450 Q 260 380, 560 430 T 1120 370 Q 1300 330, 1500 400"
            stroke="url(#cyberWaveGradBlue)"
            strokeWidth="1.5"
            strokeDasharray="4 12"
            className="wave-drift-2"
          />
          <path
            d="M -50 600 Q 360 560, 660 590 T 1240 550 Q 1370 510, 1500 580"
            stroke="url(#cyberWaveGradBright)"
            strokeWidth="1.2"
            strokeDasharray="2 9"
            className="wave-drift-3"
          />

          {/* Perspective grid transverse rays connecting the terrain */}
          <path
            d="M 120 530 Q 160 470, 200 410"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            opacity="0.4"
          />
          <path
            d="M 280 540 Q 320 480, 360 420"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            opacity="0.45"
          />
          <path
            d="M 440 550 Q 480 490, 520 430"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            opacity="0.5"
          />
          <path
            d="M 620 560 Q 670 490, 710 420"
            stroke="url(#cyberWaveGradBright)"
            strokeWidth="1.4"
            strokeDasharray="2 6"
            opacity="0.6"
          />
          <path
            d="M 820 540 Q 880 460, 930 380"
            stroke="url(#cyberWaveGradBright)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            opacity="0.65"
          />
          <path
            d="M 1040 520 Q 1090 440, 1140 360"
            stroke="url(#cyberWaveGradCyan)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            opacity="0.7"
          />
          <path
            d="M 1220 500 Q 1260 420, 1300 340"
            stroke="url(#cyberWaveGradBright)"
            strokeWidth="1.4"
            strokeDasharray="2 6"
            opacity="0.6"
          />
        </g>

        {/* 2. Floating Luminous Light Nodes (Glowing particles hovering across both sides) */}
        <g className="cyber-particles">
          {/* Under words side */}
          <circle cx="180" cy="460" r="2.5" fill="#00d2ff" className="p-dot-pulse-1" />
          <circle cx="280" cy="490" r="3.2" fill="#38bdf8" className="p-dot-pulse-2" />
          <circle cx="390" cy="440" r="2.2" fill="#60a5fa" className="p-dot-pulse-3" />
          <circle cx="490" cy="510" r="3" fill="#00d2ff" className="p-dot-pulse-1" />
          <circle cx="120" cy="390" r="2" fill="#00d2ff" className="p-dot-pulse-2" />

          {/* Under center & robot side */}
          <circle cx="740" cy="480" r="3.5" fill="#00d2ff" className="p-dot-pulse-2" />
          <circle cx="880" cy="420" r="4" fill="#38bdf8" className="p-dot-pulse-1" />
          <circle cx="980" cy="390" r="4.5" fill="#00d2ff" className="p-dot-pulse-3" />
          <circle cx="1090" cy="370" r="3.8" fill="#38bdf8" className="p-dot-pulse-2" />
          <circle cx="1220" cy="420" r="3.2" fill="#60a5fa" className="p-dot-pulse-1" />
          <circle cx="1310" cy="460" r="2.5" fill="#00d2ff" className="p-dot-pulse-3" />
        </g>
      </svg>
    </div>
  );
}

