// ============================================================
// Background skyline: one landmark for each destination, drawn as
// a single-colour silhouette. Sits faintly behind the flight map,
// fading out toward the top. Left to right: Petronas Towers (MY),
// Sydney Opera House (AU), Sky Tower (NZ), Big Ben (UK), Statue of
// Liberty (US), CN Tower (CA), Mosta Dome (MT).
//
// Pure SVG: loads instantly, adapts to both themes via currentColor,
// and reads as texture rather than photography.
// ============================================================

export function Skyline() {
  return (
    <svg
      className="hero-skyline"
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* Petronas Towers */}
        <path d="M62 300 L68 175 L74 160 L77 132 L79 96 L81 132 L84 160 L90 175 L96 300 Z" />
        <path d="M116 300 L122 175 L128 160 L131 132 L133 96 L135 132 L138 160 L144 175 L150 300 Z" />
        <rect x="93" y="208" width="26" height="8" />

        {/* low buildings */}
        <rect x="180" y="252" width="34" height="48" />
        <rect x="222" y="268" width="24" height="32" />

        {/* Sydney Opera House */}
        <path d="M282 300 Q294 213 380 199 L356 300 Z" />
        <path d="M368 300 Q380 200 470 189 L444 300 Z" />
        <path d="M458 300 Q466 209 532 204 L516 300 Z" />

        {/* low building */}
        <rect x="560" y="262" width="30" height="38" />

        {/* Sky Tower */}
        <rect x="636" y="132" width="8" height="168" />
        <ellipse cx="640" cy="138" rx="17" ry="9" />
        <ellipse cx="640" cy="122" rx="9" ry="5" />
        <rect x="639" y="58" width="2" height="64" />

        {/* Big Ben */}
        <rect x="716" y="168" width="44" height="132" />
        <rect x="712" y="128" width="52" height="40" />
        <path d="M712 128 L738 62 L764 128 Z" />
        <rect x="736" y="44" width="4" height="18" />

        {/* low buildings */}
        <rect x="800" y="258" width="36" height="42" />
        <rect x="844" y="272" width="22" height="28" />

        {/* Statue of Liberty */}
        <rect x="896" y="238" width="64" height="62" />
        <rect x="906" y="210" width="44" height="28" />
        <path d="M916 210 L920 150 Q922 128 928 122 L940 122 Q946 128 948 150 L952 210 Z" />
        <circle cx="933" cy="110" r="9" />
        <path d="M925 102 L921 88 L928 99 Z" />
        <path d="M931 100 L931 84 L936 99 Z" />
        <path d="M939 101 L945 88 L942 103 Z" />
        <path d="M942 130 L962 72 L968 74 L950 134 Z" />
        <rect x="960" y="58" width="12" height="16" />
        <path d="M966 40 L971 56 L961 56 Z" />

        {/* CN Tower */}
        <path d="M1078 300 L1082 158 L1090 158 L1094 300 Z" />
        <ellipse cx="1086" cy="150" rx="17" ry="9" />
        <ellipse cx="1086" cy="136" rx="8" ry="4" />
        <rect x="1085" y="52" width="2" height="84" />

        {/* low building */}
        <rect x="1130" y="266" width="26" height="34" />

        {/* Mosta Dome, Malta */}
        <rect x="1196" y="258" width="150" height="42" />
        <path d="M1216 258 Q1271 186 1326 258 Z" />
        <rect x="1266" y="162" width="10" height="18" />
        <path d="M1271 146 L1276 160 L1266 160 Z" />
        <rect x="1352" y="240" width="16" height="60" />
        <path d="M1352 240 L1360 226 L1368 240 Z" />
      </g>
    </svg>
  )
}
