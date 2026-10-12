// Original illustration: an accessible document with structure tags on a laptop. Decorative only.
export default function AboutArt() {
  return (
    <svg viewBox="0 0 480 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a laptop showing an accessible document with tagged structure">
      <defs>
        <linearGradient id="abg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#12285a" /><stop offset="1" stopColor="#060d1f" /></linearGradient>
        <radialGradient id="aglow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f59a3c" stopOpacity=".55" /><stop offset="1" stopColor="#f59a3c" stopOpacity="0" /></radialGradient>
        <linearGradient id="alap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfd6e6" /><stop offset="1" stopColor="#8d98b3" /></linearGradient>
        <pattern id="adots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#8fa6d8" opacity=".45" /></pattern>
      </defs>
      <rect width="480" height="560" fill="url(#abg)" /><rect width="480" height="560" fill="url(#adots)" />
      <circle cx="400" cy="90" r="170" fill="url(#aglow)" />

      <rect x="56" y="150" width="368" height="244" rx="16" fill="#0b1630" stroke="#2c4278" strokeWidth="2" />
      <rect x="70" y="164" width="340" height="216" rx="8" fill="#eef1f8" />
      <rect x="70" y="164" width="340" height="22" rx="8" fill="#d9deec" />
      <circle cx="86" cy="175" r="4" fill="#f59a3c" /><circle cx="100" cy="175" r="4" fill="#c3cbe0" /><circle cx="114" cy="175" r="4" fill="#c3cbe0" />

      <rect x="86" y="200" width="70" height="10" rx="5" fill="#0a1630" />
      <rect x="86" y="222" width="70" height="6" rx="3" fill="#8fa0c4" /><rect x="96" y="236" width="60" height="6" rx="3" fill="#b7c2dc" />
      <rect x="96" y="250" width="50" height="6" rx="3" fill="#b7c2dc" /><rect x="86" y="268" width="70" height="6" rx="3" fill="#8fa0c4" />
      <rect x="96" y="282" width="56" height="6" rx="3" fill="#b7c2dc" />

      <rect x="176" y="198" width="150" height="176" rx="4" fill="#fff" stroke="#c6cee2" />
      <rect x="190" y="212" width="90" height="10" rx="5" fill="#0a1630" />
      <rect x="190" y="232" width="122" height="5" rx="2.5" fill="#b7c2dc" /><rect x="190" y="243" width="122" height="5" rx="2.5" fill="#b7c2dc" /><rect x="190" y="254" width="84" height="5" rx="2.5" fill="#b7c2dc" />
      <rect x="190" y="272" width="52" height="42" rx="3" fill="#cfd9ee" /><path d="M190 314l16-18 12 10 10-8 14 16z" fill="#f59a3c" opacity=".75" />
      <rect x="250" y="274" width="62" height="5" rx="2.5" fill="#b7c2dc" /><rect x="250" y="285" width="62" height="5" rx="2.5" fill="#b7c2dc" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={190 + c * 41} y={324 + r * 14} width="39" height="12" fill={r === 0 ? '#0a1630' : '#fff'} stroke="#b7c2dc" />))}

      <rect x="344" y="200" width="54" height="8" rx="4" fill="#8fa0c4" /><rect x="344" y="216" width="40" height="8" rx="4" fill="#b7c2dc" /><rect x="344" y="232" width="48" height="8" rx="4" fill="#b7c2dc" />
      <path d="M30 394h420l-26 34H56z" fill="url(#alap)" /><rect x="190" y="394" width="100" height="8" rx="4" fill="#7a86a3" />

      <g>
        <rect x="34" y="84" width="150" height="46" rx="23" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".28" />
        <path d="M54 107l7 7 13-15" stroke="#f59a3c" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="86" y="113" fill="#fff" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Tagged PDF</text>
      </g>
      <g>
        <rect x="300" y="116" width="140" height="46" rx="23" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".28" />
        <path d="M320 139l7 7 13-15" stroke="#f59a3c" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="350" y="145" fill="#fff" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Alt text</text>
      </g>
      <g>
        <rect x="150" y="448" width="190" height="46" rx="23" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".28" />
        <path d="M170 471l7 7 13-15" stroke="#f59a3c" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="200" y="477" fill="#fff" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Reading order</text>
      </g>
    </svg>
  );
}
