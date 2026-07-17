/* other.js — Kumpulan aset SVG custom untuk World Cup Info's
   Semua desain ORIGINAL, bukan reproduksi logo/trofi resmi FIFA. */

var OTHER_SVG = {

  // Trofi generik bergaya flat, BUKAN bentuk trofi resmi FIFA
  trophy: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="30" y="90" width="40" height="7" rx="3" fill="#0B3D2E"/>' +
    '<rect x="40" y="80" width="20" height="12" rx="2" fill="#D4AF37"/>' +
    '<path d="M33 22 H67 V44 C67 60 57 70 50 70 C43 70 33 60 33 44 Z" fill="#FFD700"/>' +
    '<path d="M33 26 C18 26 18 46 33 50" stroke="#FFD700" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<path d="M67 26 C82 26 82 46 67 50" stroke="#FFD700" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<rect x="46" y="68" width="8" height="14" fill="#D4AF37"/>' +
    '<circle cx="50" cy="36" r="8" fill="#FFFFFF" opacity="0.35"/>' +
    '</svg>',

  // Logo custom "WC 2030" — desain sendiri, bukan emblem resmi FIFA
  wc2030Logo: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="100" cy="100" r="94" fill="#0B3D2E"/>' +
    '<circle cx="100" cy="100" r="94" fill="none" stroke="#D4AF37" stroke-width="5"/>' +
    '<circle cx="100" cy="100" r="80" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.25"/>' +
    '<text x="100" y="92" font-family="Inter, sans-serif" font-size="46" font-weight="700" fill="#FFFFFF" text-anchor="middle">WC</text>' +
    '<text x="100" y="134" font-family="Inter, sans-serif" font-size="28" font-weight="600" fill="#D4AF37" text-anchor="middle" letter-spacing="2">2030</text>' +
    '</svg>',

  // Ikon bola sepak flat
  ball: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>' +
    '<polygon points="50,26 62,36 58,50 42,50 38,36" fill="#1A1A1A"/>' +
    '<line x1="50" y1="26" x2="22" y2="34" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="50" y1="26" x2="78" y2="34" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="38" y1="36" x2="18" y2="34" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="62" y1="36" x2="82" y2="34" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="42" y1="50" x2="20" y2="56" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="58" y1="50" x2="80" y2="56" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="42" y1="50" x2="34" y2="76" stroke="#1A1A1A" stroke-width="2"/>' +
    '<line x1="58" y1="50" x2="66" y2="76" stroke="#1A1A1A" stroke-width="2"/>' +
    '</svg>',

  // Ikon peluit wasit
  whistle: '<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="8" y="20" width="42" height="20" rx="10" fill="#C0C0C0"/>' +
    '<circle cx="70" cy="30" r="20" fill="#D9D9D9"/>' +
    '<circle cx="70" cy="30" r="20" fill="none" stroke="#8A8A8A" stroke-width="3"/>' +
    '<rect x="4" y="26" width="8" height="8" fill="#8A8A8A"/>' +
    '<circle cx="70" cy="30" r="6" fill="#8A8A8A"/>' +
    '</svg>',

  // Kartu kuning
  cardYellow: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="60" height="90" rx="7" fill="#FFD500"/>' +
    '<rect x="2" y="2" width="56" height="86" rx="5" fill="none" stroke="#E0B800" stroke-width="2"/>' +
    '</svg>',

  // Kartu merah
  cardRed: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="60" height="90" rx="7" fill="#E4002B"/>' +
    '<rect x="2" y="2" width="56" height="86" rx="5" fill="none" stroke="#B8001F" stroke-width="2"/>' +
    '</svg>',

  // Gembok tertutup (status wallchart terkunci)
  lockClosed: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="24" y="46" width="52" height="42" rx="8" fill="#374151"/>' +
    '<path d="M34 46 V30 a16 16 0 0 1 32 0 V46" fill="none" stroke="#374151" stroke-width="8"/>' +
    '<circle cx="50" cy="66" r="6" fill="#FBBF24"/>' +
    '<rect x="47" y="70" width="6" height="10" fill="#FBBF24"/>' +
    '</svg>',

  // Gembok terbuka (status wallchart kebuka)
  lockOpen: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="24" y="46" width="52" height="42" rx="8" fill="#10B981"/>' +
    '<path d="M34 46 V30 a16 16 0 0 1 32 0 V36" fill="none" stroke="#10B981" stroke-width="8"/>' +
    '<circle cx="50" cy="66" r="6" fill="#FFFFFF"/>' +
    '<rect x="47" y="70" width="6" height="10" fill="#FFFFFF"/>' +
    '</svg>',

  // Ikon jam untuk countdown
  clock: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="50" cy="50" r="42" fill="none" stroke="#0B3D2E" stroke-width="6"/>' +
    '<line x1="50" y1="50" x2="50" y2="26" stroke="#0B3D2E" stroke-width="5" stroke-linecap="round"/>' +
    '<line x1="50" y1="50" x2="68" y2="58" stroke="#D4AF37" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="50" cy="50" r="4" fill="#0B3D2E"/>' +
    '</svg>',

  // Ikon peringkat/podium untuk ranking
  ranking: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="10" y="55" width="24" height="35" rx="3" fill="#D4AF37"/>' +
    '<rect x="38" y="35" width="24" height="55" rx="3" fill="#0B3D2E"/>' +
    '<rect x="66" y="65" width="24" height="25" rx="3" fill="#10603F"/>' +
    '<text x="50" y="55" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>' +
    '</svg>',

  // Ikon dokumen untuk halaman Docs
  docs: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="22" y="10" width="56" height="80" rx="6" fill="#FFFFFF" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="32" y1="30" x2="68" y2="30" stroke="#0B3D2E" stroke-width="4" stroke-linecap="round"/>' +
    '<line x1="32" y1="46" x2="68" y2="46" stroke="#0B3D2E" stroke-width="4" stroke-linecap="round"/>' +
    '<line x1="32" y1="62" x2="54" y2="62" stroke="#D4AF37" stroke-width="4" stroke-linecap="round"/>' +
    '</svg>',

  // Ikon bracket/wallchart
  bracket: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="14" y1="20" x2="34" y2="20" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="14" y1="40" x2="34" y2="40" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="34" y1="20" x2="34" y2="40" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="34" y1="30" x2="54" y2="30" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="14" y1="60" x2="34" y2="60" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="14" y1="80" x2="34" y2="80" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="34" y1="60" x2="34" y2="80" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="34" y1="70" x2="54" y2="70" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="54" y1="30" x2="54" y2="70" stroke="#0B3D2E" stroke-width="4"/>' +
    '<line x1="54" y1="50" x2="80" y2="50" stroke="#D4AF37" stroke-width="5"/>' +
    '</svg>',

  // Ikon home
  home: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M50 15 L88 48 H78 V88 H58 V62 H42 V88 H22 V48 H12 Z" fill="#0B3D2E"/>' +
    '<rect x="42" y="62" width="16" height="26" fill="#D4AF37"/>' +
    '</svg>',

  // Ikon roda gigi untuk Settings
  settings: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M50 30a20 20 0 1 0 0.001 0Z" fill="none" stroke="currentColor" stroke-width="8"/>' +
    '<circle cx="50" cy="50" r="8" fill="currentColor"/>' +
    '<path d="M50 8 L54 20 L46 20 Z" fill="currentColor"/>' +
    '<path d="M50 92 L54 80 L46 80 Z" fill="currentColor"/>' +
    '<path d="M8 50 L20 46 L20 54 Z" fill="currentColor"/>' +
    '<path d="M92 50 L80 46 L80 54 Z" fill="currentColor"/>' +
    '<path d="M20 20 L30 26 L26 30 Z" fill="currentColor"/>' +
    '<path d="M80 80 L70 74 L74 70 Z" fill="currentColor"/>' +
    '<path d="M80 20 L70 26 L74 30 Z" fill="currentColor"/>' +
    '<path d="M20 80 L30 74 L26 70 Z" fill="currentColor"/>' +
    '</svg>',

  // Ikon matahari (mode terang)
  sun: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="50" cy="50" r="20" fill="currentColor"/>' +
    '<g stroke="currentColor" stroke-width="7" stroke-linecap="round">' +
    '<line x1="50" y1="8" x2="50" y2="20"/>' +
    '<line x1="50" y1="80" x2="50" y2="92"/>' +
    '<line x1="8" y1="50" x2="20" y2="50"/>' +
    '<line x1="80" y1="50" x2="92" y2="50"/>' +
    '<line x1="20" y1="20" x2="28" y2="28"/>' +
    '<line x1="72" y1="72" x2="80" y2="80"/>' +
    '<line x1="80" y1="20" x2="72" y2="28"/>' +
    '<line x1="28" y1="72" x2="20" y2="80"/>' +
    '</g></svg>',

  // Ikon bulan (mode gelap)
  moon: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M68 15 A38 38 0 1 0 85 68 A30 30 0 0 1 68 15 Z" fill="currentColor"/>' +
    '</svg>',

  // Ikon monitor untuk pilihan "Ikuti Sistem"
  system: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="12" y="20" width="76" height="50" rx="6" fill="none" stroke="currentColor" stroke-width="7"/>' +
    '<line x1="38" y1="86" x2="62" y2="86" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>' +
    '<line x1="50" y1="70" x2="50" y2="86" stroke="currentColor" stroke-width="7"/>' +
    '</svg>'
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = OTHER_SVG;
}
