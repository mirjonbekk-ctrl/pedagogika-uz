// Hero uchun SVG illyustratsiya: bitiruv qalpog‘i, kitoblar stopkasi, shaffof kartalar.
// Kitoblardagi yozuvlar SVG matni (tarjima va tahrir oson). Kartalar callout’dan pastda turadi.

export default function HeroIllustration() {
  return (
    <svg className="hero-illus" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="hi-navy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a5585" />
          <stop offset="1" stopColor="#14314f" />
        </linearGradient>
        <linearGradient id="hi-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0c765" />
          <stop offset="1" stopColor="#c8922a" />
        </linearGradient>
        <linearGradient id="hi-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24496f" />
          <stop offset="1" stopColor="#0b2038" />
        </linearGradient>
      </defs>

      {/* Orbit line */}
      <path d="M40 300 Q200 120 360 250" fill="none" stroke="#d4a93f" strokeWidth="2" opacity=".7" />
      <circle cx="360" cy="250" r="6" fill="#d4a93f" />
      <circle cx="40" cy="300" r="5" fill="#d4a93f" />

      {/* Floating glass cards */}
      <g fill="#ffffff" fillOpacity=".14" stroke="#ffffff" strokeOpacity=".45" strokeWidth="1.5">
        <rect x="26" y="150" width="88" height="88" rx="18" />
        <rect x="282" y="230" width="84" height="84" rx="18" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 190 Q60 184 70 190 Q80 184 90 190 V222 Q80 216 70 222 Q60 216 50 222 Z" />
        <path d="M70 190 V222" />
      </g>
      <g fill="#ffffff">
        <rect x="300" y="290" width="12" height="28" rx="3" />
        <rect x="318" y="274" width="12" height="44" rx="3" />
        <rect x="336" y="256" width="12" height="62" rx="3" />
      </g>

      {/* Graduation cap */}
      <path d="M140 175 V212 Q200 238 260 212 V175 L200 200 Z" fill="#1c3d62" />
      <path d="M200 110 L316 156 L200 202 L84 156 Z" fill="url(#hi-cap)" />
      <path d="M200 110 L316 156 L200 202 L84 156 Z" fill="none" stroke="#ffffff" strokeOpacity=".18" strokeWidth="1.5" />
      <path d="M200 156 L316 156" stroke="#d4a93f" strokeWidth="2" opacity=".6" />
      <path d="M300 160 L306 212" stroke="url(#hi-gold)" strokeWidth="3" strokeLinecap="round" />
      <rect x="301" y="208" width="10" height="16" rx="2" fill="url(#hi-gold)" />

      {/* Book stack: bottom to top */}
      <ellipse cx="200" cy="420" rx="168" ry="22" fill="#dfe7f1" opacity=".22" />
      <rect x="80" y="356" width="240" height="60" rx="8" fill="url(#hi-navy)" />
      <rect x="86" y="404" width="228" height="8" rx="3" fill="#f4f7fb" opacity=".85" />
      <text x="200" y="394" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="20" letterSpacing="2" fill="#ffffff">RIVOJLANIŞ</text>

      <rect x="110" y="300" width="200" height="56" rx="8" fill="url(#hi-gold)" />
      <rect x="116" y="344" width="188" height="7" rx="3" fill="#fff8e6" opacity=".85" />
      <text x="210" y="336" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="18" letterSpacing="2" fill="#14314f">KÖNIKMA</text>

      <rect x="92" y="240" width="216" height="56" rx="8" fill="url(#hi-navy)" />
      <rect x="98" y="284" width="204" height="7" rx="3" fill="#f4f7fb" opacity=".85" />
      <text x="200" y="276" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="18" letterSpacing="2" fill="#ffffff">BILIM</text>
    </svg>
  );
}
