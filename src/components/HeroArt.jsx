// Original hero artwork (orb, friendly assistant, glass cards). Decorative only.
export default function HeroArt() {
  return (
    <div className="hero__art" aria-hidden="true">
      <svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="orb" cx=".32" cy=".26" r=".9">
            <stop offset="0" stopColor="#ffe0b4" /><stop offset=".2" stopColor="#f9a74e" />
            <stop offset=".48" stopColor="#dd6b11" /><stop offset=".74" stopColor="#7b3a14" />
            <stop offset="1" stopColor="#16305f" />
          </radialGradient>
          <radialGradient id="glow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#f59a3c" stopOpacity=".38" /><stop offset="1" stopColor="#f59a3c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="head" cx=".35" cy=".28" r=".85">
            <stop offset="0" stopColor="#e3f3ff" /><stop offset=".45" stopColor="#82bff2" /><stop offset="1" stopColor="#3b78c8" />
          </radialGradient>
          <linearGradient id="arm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffbe74" /><stop offset="1" stopColor="#e2701a" />
          </linearGradient>
          <linearGradient id="glassfill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".2" /><stop offset="1" stopColor="#fff" stopOpacity=".05" />
          </linearGradient>
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 -.12" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="soft"><feGaussianBlur stdDeviation="10" /></filter>
        </defs>

        <circle cx="440" cy="330" r="330" fill="url(#glow)" />
        <ellipse cx="450" cy="520" rx="400" ry="84" transform="rotate(-14 450 520)" fill="none" stroke="#f59a3c" strokeOpacity=".28" strokeWidth="1.5" />

        <g className="fl-orb">
          <circle cx="450" cy="520" r="300" fill="url(#orb)" />
          <circle cx="450" cy="520" r="300" fill="#fff" filter="url(#grain)" opacity=".55" />
          <ellipse cx="350" cy="330" rx="120" ry="60" fill="#fff" opacity=".12" filter="url(#soft)" />
        </g>

        <g transform="translate(0 14)"><g className="fl-bot">
          <ellipse cx="392" cy="214" rx="56" ry="9" fill="#2a1204" opacity=".5" filter="url(#soft)" />
          <line x1="392" y1="44" x2="392" y2="26" stroke="#9cc8f2" strokeWidth="4" strokeLinecap="round" />
          <circle cx="392" cy="22" r="7" fill="#f59a3c" />
          <rect x="360" y="148" width="64" height="66" rx="28" fill="url(#head)" />
          <ellipse cx="366" cy="182" rx="15" ry="22" fill="url(#arm)" />
          <ellipse cx="418" cy="182" rx="15" ry="22" fill="url(#arm)" />
          <circle cx="392" cy="176" r="6" fill="#f59a3c" />
          <circle cx="392" cy="98" r="56" fill="url(#head)" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
          <circle cx="334" cy="102" r="10" fill="#f59a3c" /><circle cx="450" cy="102" r="10" fill="#f59a3c" />
          <rect x="350" y="76" width="84" height="46" rx="23" fill="#0a1732" />
          <circle cx="372" cy="99" r="13" fill="#f59a3c" /><circle cx="412" cy="99" r="13" fill="#f59a3c" />
          <circle cx="372" cy="99" r="8" fill="#fff" /><circle cx="412" cy="99" r="8" fill="#fff" />
          <circle cx="373" cy="100" r="4" fill="#0a1732" /><circle cx="413" cy="100" r="4" fill="#0a1732" />
          <path d="M382 114q10 7 20 0" stroke="#82bff2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="372" cy="66" rx="20" ry="9" fill="#fff" opacity=".35" transform="rotate(-18 372 66)" />
        </g></g>

        <g className="fl-a" transform="rotate(-8 150 300)">
          <rect x="40" y="250" width="250" height="120" rx="22" fill="url(#glassfill)" stroke="#fff" strokeOpacity=".2" />
          <circle cx="68" cy="274" r="4" fill="#fff" opacity=".7" /><circle cx="84" cy="274" r="4" fill="#fff" opacity=".7" /><circle cx="100" cy="274" r="4" fill="#fff" opacity=".7" />
          <circle cx="82" cy="328" r="20" fill="#f59a3c" />
          <rect x="118" y="308" width="140" height="9" rx="4.5" fill="#fff" opacity=".6" />
          <rect x="118" y="326" width="108" height="9" rx="4.5" fill="#fff" opacity=".42" />
          <rect x="118" y="344" width="84" height="9" rx="4.5" fill="#fff" opacity=".3" />
        </g>

        <g className="fl-b">
          <rect x="250" y="400" width="226" height="52" rx="26" fill="url(#glassfill)" stroke="#fff" strokeOpacity=".25" />
          <path d="M276 426l8 8 15-17" stroke="#f59a3c" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="312" y="433" fill="#fff" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif">PAC validation</text>
        </g>
        <g className="fl-c">
          <rect x="300" y="500" width="256" height="52" rx="26" fill="url(#glassfill)" stroke="#fff" strokeOpacity=".25" />
          <path d="M326 526l8 8 15-17" stroke="#f59a3c" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="362" y="533" fill="#fff" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif">Screen reader QA</text>
        </g>
        <g className="fl-d">
          <rect x="120" y="500" width="150" height="46" rx="23" fill="#0d1b38" stroke="#fff" strokeOpacity=".15" />
          <circle cx="146" cy="523" r="10" fill="#1f4f9a" />
          <rect x="166" y="518" width="80" height="9" rx="4.5" fill="#fff" opacity=".55" />
        </g>
      </svg>
    </div>
  );
}
