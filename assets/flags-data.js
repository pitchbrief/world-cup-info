/* flags-data.js — Database bendera negara (200+ tim nasional) untuk World Cup Info's.
   Semua digambar ulang secara geometris sederhana (BUKAN aset/foto resmi).
   Dipakai untuk autocomplete: ketik kode 3-huruf FIFA (misal "MEX") -> flag muncul.

   Struktur akhir:
   - var FLAGS        = { CODE: "<svg>...</svg>", ... }   (dipakai di semua halaman, kompatibel dgn nama lama)
   - var FIFA_TEAMS    = [ { code, name }, ... ]           (dipakai untuk autocomplete/search)
   - function getFlag(code) -> svg string atau null
   - function searchTeams(query) -> array {code,name} yang cocok (buat autocomplete) */

var STAR5 = "1.5,0.6 1.594,0.871 1.880,0.876 1.652,1.049 1.735,1.324 1.5,1.16 1.265,1.324 1.348,1.049 1.120,0.876 1.406,0.871";

/* ===================== 50 bendera detail (dipertahankan presisi) ===================== */
var FLAGS_DETAILED = {
  FRA: { name: "France", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>' },
  ARG: { name: "Argentina", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect width="3" height="0.667" fill="#74ACDF"/><rect y="1.333" width="3" height="0.667" fill="#74ACDF"/><circle cx="1.5" cy="1" r="0.22" fill="#F6B40E"/></svg>' },
  ESP: { name: "Spain", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>' },
  ENG: { name: "England", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect x="1.2" width="0.6" height="2" fill="#CE1124"/><rect y="0.8" width="3" height="0.4" fill="#CE1124"/></svg>' },
  BRA: { name: "Brazil", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#009739"/><polygon points="1.5,0.15 2.85,1 1.5,1.85 0.15,1" fill="#FEDD00"/><circle cx="1.5" cy="1" r="0.45" fill="#012169"/></svg>' },
  MAR: { name: "Morocco", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C1272D"/><polygon points="' + STAR5 + '" fill="#006233"/></svg>' },
  POR: { name: "Portugal", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.2" height="2" fill="#046A38"/><rect x="1.2" width="1.8" height="2" fill="#DA291C"/><circle cx="1.2" cy="1" r="0.28" fill="#FFCC00"/></svg>' },
  BEL: { name: "Belgium", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#000000"/><rect x="1" width="1" height="2" fill="#FAE042"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>' },
  NED: { name: "Netherlands", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#AE1C28"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#21468B"/></svg>' },
  MEX: { name: "Mexico", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#006341"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#CE1126"/><circle cx="1.5" cy="1" r="0.2" fill="#AE8F3D"/></svg>' },
  COL: { name: "Colombia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FCD116"/><rect y="1" width="3" height="0.5" fill="#003893"/><rect y="1.5" width="3" height="0.5" fill="#CE1126"/></svg>' },
  GER: { name: "Germany", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#000000"/><rect y="0.667" width="3" height="0.667" fill="#DD0000"/><rect y="1.333" width="3" height="0.667" fill="#FFCE00"/></svg>' },
  CRO: { name: "Croatia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FF0000"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#171796"/><rect x="1.35" y="0.75" width="0.3" height="0.3" fill="#C8102E"/></svg>' },
  SUI: { name: "Switzerland", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#D52B1E"/><rect x="1.35" y="0.6" width="0.3" height="0.8" fill="#FFFFFF"/><rect x="1.1" y="0.85" width="0.8" height="0.3" fill="#FFFFFF"/></svg>' },
  ITA: { name: "Italy", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>' },
  USA: { name: "United States", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#B22234"/><rect y="0.153" width="3" height="0.153" fill="#FFFFFF"/><rect y="0.462" width="3" height="0.153" fill="#FFFFFF"/><rect y="0.769" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.077" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.385" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.692" width="3" height="0.153" fill="#FFFFFF"/><rect width="1.2" height="1.077" fill="#3C3B6E"/></svg>' },
  JPN: { name: "Japan", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.5" fill="#BC002D"/></svg>' },
  SEN: { name: "Senegal", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#00853F"/><rect x="1" width="1" height="2" fill="#FDEF42"/><rect x="2" width="1" height="2" fill="#E31B23"/><polygon points="' + STAR5 + '" fill="#00853F"/></svg>' },
  NOR: { name: "Norway", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#EF2B2D"/><rect x="0.9" width="0.5" height="2" fill="#FFFFFF"/><rect y="0.75" width="3" height="0.5" fill="#FFFFFF"/><rect x="1.02" width="0.26" height="2" fill="#002868"/><rect y="0.87" width="3" height="0.26" fill="#002868"/></svg>' },
  URU: { name: "Uruguay", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect y="0.222" width="3" height="0.222" fill="#0038A8"/><rect y="0.667" width="3" height="0.222" fill="#0038A8"/><rect y="1.111" width="3" height="0.222" fill="#0038A8"/><rect y="1.556" width="3" height="0.222" fill="#0038A8"/><rect width="1.2" height="1" fill="#FFFFFF"/><circle cx="0.6" cy="0.5" r="0.22" fill="#FCD116"/></svg>' },
  DEN: { name: "Denmark", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C60C30"/><rect x="0.9" width="0.4" height="2" fill="#FFFFFF"/><rect y="0.8" width="3" height="0.4" fill="#FFFFFF"/></svg>' },
  IRN: { name: "IR Iran", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#239F40"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#DA0000"/></svg>' },
  AUT: { name: "Austria", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#ED2939"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#ED2939"/></svg>' },
  EGY: { name: "Egypt", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#CE1126"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#000000"/><circle cx="1.5" cy="1" r="0.18" fill="#C09300"/></svg>' },
  ECU: { name: "Ecuador", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFDD00"/><rect y="1" width="3" height="0.5" fill="#0F47AF"/><rect y="1.5" width="3" height="0.5" fill="#EF3340"/><circle cx="1.5" cy="1" r="0.2" fill="#FFFFFF" stroke="#0F47AF" stroke-width="0.03"/></svg>' },
  NGA: { name: "Nigeria", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#008751"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#008751"/></svg>' },
  TUR: { name: "Türkiye", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#E30A17"/><circle cx="1.3" cy="1" r="0.42" fill="#FFFFFF"/><circle cx="1.41" cy="1" r="0.35" fill="#E30A17"/><polygon points="1.75,0.75 1.82,0.93 2.01,0.93 1.86,1.05 1.92,1.23 1.75,1.12 1.58,1.23 1.64,1.05 1.49,0.93 1.68,0.93" fill="#FFFFFF"/></svg>' },
  AUS: { name: "Australia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#00008B"/><rect width="1.3" height="1" fill="#FFFFFF"/><rect x="0.08" y="0.08" width="1.14" height="0.84" fill="#CE1126"/><circle cx="2.2" cy="0.5" r="0.07" fill="#FFFFFF"/><circle cx="2.5" cy="1" r="0.07" fill="#FFFFFF"/><circle cx="2.1" cy="1.5" r="0.07" fill="#FFFFFF"/><circle cx="2.6" cy="1.6" r="0.05" fill="#FFFFFF"/><circle cx="2.7" cy="0.7" r="0.05" fill="#FFFFFF"/></svg>' },
  ALG: { name: "Algeria", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="2" fill="#006233"/><rect x="1.5" width="1.5" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.38" fill="#FFFFFF"/><circle cx="1.6" cy="1" r="0.32" fill="#006233"/><polygon points="' + STAR5 + '" fill="#D21034"/></svg>' },
  CAN: { name: "Canada", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="0.75" height="2" fill="#FF0000"/><rect x="0.75" width="1.5" height="2" fill="#FFFFFF"/><rect x="2.25" width="0.75" height="2" fill="#FF0000"/><polygon points="1.5,0.6 1.6,0.9 1.9,0.9 1.65,1.1 1.75,1.4 1.5,1.2 1.25,1.4 1.35,1.1 1.1,0.9 1.4,0.9" fill="#FF0000"/></svg>' },
  CIV: { name: "Côte d'Ivoire", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#F77F00"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#009E60"/></svg>' },
  KOR: { name: "Korea Republic", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.42" fill="#FFFFFF"/><path d="M1.5,0.58 A0.21,0.21 0 0,1 1.5,1 A0.21,0.21 0 0,0 1.5,1.42 A0.42,0.42 0 0,0 1.5,0.58 Z" fill="#CD2E3A"/><path d="M1.5,1.42 A0.21,0.21 0 0,1 1.5,1 A0.21,0.21 0 0,0 1.5,0.58 A0.42,0.42 0 0,0 1.5,1.42 Z" fill="#0047A0"/></svg>' },
  UKR: { name: "Ukraine", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#0057B7"/><rect y="1" width="3" height="1" fill="#FFD700"/></svg>' },
  PAR: { name: "Paraguay", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#D52B1E"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#0038A8"/><circle cx="1.5" cy="1" r="0.16" fill="#FFCC00" stroke="#0038A8" stroke-width="0.02"/></svg>' },
  RUS: { name: "Russia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFFFFF"/><rect y="0.667" width="3" height="0.667" fill="#0039A6"/><rect y="1.333" width="3" height="0.667" fill="#D52B1E"/></svg>' },
  POL: { name: "Poland", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>' },
  SWE: { name: "Sweden", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#006AA7"/><rect x="0.9" width="0.4" height="2" fill="#FECC02"/><rect y="0.8" width="3" height="0.4" fill="#FECC02"/></svg>' },
  WAL: { name: "Wales", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#00B140"/><ellipse cx="1.5" cy="1" rx="0.45" ry="0.28" fill="#C8102E"/><polygon points="1.9,1 2.25,0.87 2.25,1.13" fill="#C8102E"/></svg>' },
  HUN: { name: "Hungary", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#CD2A3E"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#436F4D"/></svg>' },
  SRB: { name: "Serbia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#C6363C"/><rect y="0.667" width="3" height="0.667" fill="#0C4076"/><rect y="1.333" width="3" height="0.667" fill="#FFFFFF"/></svg>' },
  COD: { name: "Congo DR", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#007FFF"/><polygon points="0,2 0.3,2 3,0.3 3,0" fill="#F7D618"/><polygon points="0,2 0.15,2 3,0.15 3,0" fill="#CE1021"/><polygon points="0.45,0.20 0.485,0.301 0.593,0.304 0.507,0.369 0.538,0.471 0.45,0.41 0.362,0.471 0.393,0.369 0.307,0.304 0.415,0.301" fill="#F7D618"/></svg>' },
  SCO: { name: "Scotland", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#005EB8"/><polygon points="0,0 0.35,0 3,1.75 3,2 2.65,2 0,0.25" fill="#FFFFFF"/><polygon points="3,0 2.65,0 0,1.75 0,2 0.35,2 3,0.25" fill="#FFFFFF"/></svg>' },
  CMR: { name: "Cameroon", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#007A5E"/><rect x="1" width="1" height="2" fill="#CE1126"/><rect x="2" width="1" height="2" fill="#FCD116"/><polygon points="' + STAR5 + '" fill="#FCD116"/></svg>' },
  PAN: { name: "Panama", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="1" fill="#FFFFFF"/><rect x="1.5" width="1.5" height="1" fill="#DA121A"/><rect y="1" width="1.5" height="1" fill="#0072C6"/><rect x="1.5" y="1" width="1.5" height="1" fill="#FFFFFF"/><circle cx="0.75" cy="0.5" r="0.14" fill="#0072C6"/><circle cx="2.25" cy="1.5" r="0.14" fill="#DA121A"/></svg>' },
  SVK: { name: "Slovakia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFFFFF"/><rect y="0.667" width="3" height="0.667" fill="#0B4EA2"/><rect y="1.333" width="3" height="0.667" fill="#EE1C25"/></svg>' },
  GRE: { name: "Greece", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect width="3" height="0.222" fill="#0D5EAF"/><rect y="0.444" width="3" height="0.222" fill="#0D5EAF"/><rect y="0.889" width="3" height="0.222" fill="#0D5EAF"/><rect y="1.333" width="3" height="0.222" fill="#0D5EAF"/><rect y="1.778" width="3" height="0.222" fill="#0D5EAF"/><rect width="1.2" height="1.111" fill="#0D5EAF"/><rect x="0.5" y="0.35" width="0.2" height="0.7" fill="#FFFFFF"/><rect x="0.3" y="0.6" width="0.6" height="0.2" fill="#FFFFFF"/></svg>' },
  VEN: { name: "Venezuela", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFCC00"/><rect y="0.667" width="3" height="0.667" fill="#00247D"/><rect y="1.333" width="3" height="0.667" fill="#CF142B"/><circle cx="1.1" cy="1" r="0.045" fill="#FFFFFF"/><circle cx="1.3" cy="0.92" r="0.045" fill="#FFFFFF"/><circle cx="1.5" cy="0.88" r="0.045" fill="#FFFFFF"/><circle cx="1.7" cy="0.92" r="0.045" fill="#FFFFFF"/><circle cx="1.9" cy="1" r="0.045" fill="#FFFFFF"/></svg>' },
  CZE: { name: "Czechia", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#D7141A"/><polygon points="0,0 1.3,1 0,2" fill="#11457E"/></svg>' },
  CHI: { name: "Chile", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#D52B1E"/><rect width="1" height="1" fill="#0039A6"/><polygon points="0.5,0.25 0.559,0.419 0.738,0.423 0.595,0.531 0.647,0.702 0.5,0.6 0.353,0.702 0.405,0.531 0.262,0.423 0.441,0.419" fill="#FFFFFF"/></svg>' },
  PER: { name: "Peru", svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#D91023"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#D91023"/></svg>' }
};

/* ===================== Generator untuk sisa negara (pattern sederhana) ===================== */

function buildFlag(type, colors) {
  var vb = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"';
  var c = colors;
  switch (type) {
    case "h2":
      return '<svg ' + vb + '><rect width="3" height="1" fill="' + c[0] + '"/><rect y="1" width="3" height="1" fill="' + c[1] + '"/></svg>';
    case "h3":
      return '<svg ' + vb + '><rect width="3" height="0.667" fill="' + c[0] + '"/><rect y="0.667" width="3" height="0.667" fill="' + c[1] + '"/><rect y="1.333" width="3" height="0.667" fill="' + c[2] + '"/></svg>';
    case "h4":
      return '<svg ' + vb + '><rect width="3" height="0.5" fill="' + c[0] + '"/><rect y="0.5" width="3" height="0.5" fill="' + c[1] + '"/><rect y="1" width="3" height="0.5" fill="' + c[2] + '"/><rect y="1.5" width="3" height="0.5" fill="' + c[3] + '"/></svg>';
    case "v2":
      return '<svg ' + vb + '><rect width="1.5" height="2" fill="' + c[0] + '"/><rect x="1.5" width="1.5" height="2" fill="' + c[1] + '"/></svg>';
    case "v3":
      return '<svg ' + vb + '><rect width="1" height="2" fill="' + c[0] + '"/><rect x="1" width="1" height="2" fill="' + c[1] + '"/><rect x="2" width="1" height="2" fill="' + c[2] + '"/></svg>';
    case "cross":
      return '<svg ' + vb + '><rect width="3" height="2" fill="' + c[0] + '"/><rect x="0.9" width="0.4" height="2" fill="' + c[1] + '"/><rect y="0.8" width="3" height="0.4" fill="' + c[1] + '"/></svg>';
    case "plainCircle":
      return '<svg ' + vb + '><rect width="3" height="2" fill="' + c[0] + '"/><circle cx="1.65" cy="1" r="0.4" fill="' + c[1] + '"/></svg>';
    case "plain":
    default:
      return '<svg ' + vb + '><rect width="3" height="2" fill="' + c[0] + '"/></svg>';
  }
}

/* [code, name, type, colors] */
var TEAM_DATA = [
  // Rank 51-100
  ["CRC", "Costa Rica", "h3", ["#002B7F", "#FFFFFF", "#CE1126"]],
  ["ROU", "Romania", "v3", ["#002B7F", "#FCD116", "#CE1126"]],
  ["MLI", "Mali", "v3", ["#14B53A", "#FCD116", "#CE1126"]],
  ["RSA", "South Africa", "h3", ["#DE3831", "#FFFFFF", "#002395"]],
  ["IRL", "Republic of Ireland", "v3", ["#169B62", "#FFFFFF", "#FF883E"]],
  ["SVN", "Slovenia", "h3", ["#FFFFFF", "#0000FF", "#FF0000"]],
  ["TUN", "Tunisia", "plain", ["#E70013"]],
  ["KSA", "Saudi Arabia", "plain", ["#006C35"]],
  ["QAT", "Qatar", "v2", ["#FFFFFF", "#8D1B3D"]],
  ["UZB", "Uzbekistan", "h3", ["#0099B5", "#FFFFFF", "#1EB53A"]],
  ["BIH", "Bosnia and Herzegovina", "v2", ["#002395", "#FECB00"]],
  ["BFA", "Burkina Faso", "h2", ["#EF2B2D", "#009E49"]],
  ["IRQ", "Iraq", "h3", ["#CE1126", "#FFFFFF", "#000000"]],
  ["CPV", "Cabo Verde", "h3", ["#003893", "#FFFFFF", "#CF2027"]],
  ["GHA", "Ghana", "h3", ["#CE1126", "#FCD116", "#006B3F"]],
  ["HON", "Honduras", "h3", ["#0073CF", "#FFFFFF", "#0073CF"]],
  ["ALB", "Albania", "plain", ["#E41E20"]],
  ["UAE", "United Arab Emirates", "h3", ["#00732F", "#FFFFFF", "#000000"]],
  ["MKD", "North Macedonia", "plain", ["#D20000"]],
  ["NIR", "Northern Ireland", "h2", ["#FFFFFF", "#D50032"]],
  ["JAM", "Jamaica", "h2", ["#FED100", "#000000"]],
  ["GEO", "Georgia", "h2", ["#FFFFFF", "#FF0000"]],
  ["JOR", "Jordan", "h3", ["#000000", "#FFFFFF", "#007A3D"]],
  ["ISL", "Iceland", "cross", ["#02529C", "#DC1E35"]],
  ["FIN", "Finland", "cross", ["#FFFFFF", "#002F6C"]],
  ["ISR", "Israel", "h2", ["#FFFFFF", "#0038B8"]],
  ["BOL", "Bolivia", "h3", ["#D52B1E", "#F9E300", "#007934"]],
  ["KVX", "Kosovo", "plain", ["#244AA5"]],
  ["OMA", "Oman", "h3", ["#FFFFFF", "#DB161B", "#008D36"]],
  ["MNE", "Montenegro", "plain", ["#D0103A"]],
  ["GUI", "Guinea", "v3", ["#CE1126", "#FCD116", "#009460"]],
  ["CUW", "Curaçao", "plain", ["#002B7F"]],
  ["SYR", "Syria", "h3", ["#CE1126", "#FFFFFF", "#000000"]],
  ["GAB", "Gabon", "h3", ["#009E60", "#FCD116", "#3A75C2"]],
  ["BUL", "Bulgaria", "h3", ["#FFFFFF", "#00966E", "#D62612"]],
  ["NZL", "New Zealand", "plain", ["#00247D"]],
  ["ANG", "Angola", "h2", ["#CC092F", "#000000"]],
  ["HAI", "Haiti", "h2", ["#00209F", "#D21034"]],
  ["UGA", "Uganda", "h3", ["#000000", "#FCDC04", "#D90000"]],
  ["ZAM", "Zambia", "plain", ["#198A00"]],
  ["CHN", "China PR", "plain", ["#DE2910"]],
  ["BHR", "Bahrain", "plain", ["#CE1126"]],
  ["BEN", "Benin", "v2", ["#008751", "#FCD116"]],
  ["THA", "Thailand", "h3", ["#A51931", "#F4F5F8", "#2D2A4A"]],
  ["PLE", "Palestine", "h3", ["#000000", "#FFFFFF", "#007A3D"]],
  ["BLR", "Belarus", "h2", ["#D22730", "#007A3D"]],
  ["GUA", "Guatemala", "v3", ["#4997D0", "#FFFFFF", "#4997D0"]],
  ["LUX", "Luxembourg", "h3", ["#ED2939", "#FFFFFF", "#00A1DE"]],
  ["VIE", "Vietnam", "plain", ["#DA251D"]],
  ["SLV", "El Salvador", "h3", ["#0047AB", "#FFFFFF", "#0047AB"]],

  // CONCACAF tambahan
  ["NCA", "Nicaragua", "h3", ["#0067C6", "#FFFFFF", "#0067C6"]],
  ["DOM", "Dominican Republic", "h2", ["#002D62", "#CE1126"]],
  ["TRI", "Trinidad and Tobago", "h2", ["#DA121A", "#000000"]],
  ["BAH", "Bahamas", "h3", ["#00778B", "#FFC72C", "#00778B"]],
  ["BRB", "Barbados", "v3", ["#00267F", "#FFC726", "#00267F"]],
  ["BLZ", "Belize", "plain", ["#0033A0"]],
  ["BER", "Bermuda", "plain", ["#C8102E"]],
  ["CUB", "Cuba", "h3", ["#002A8F", "#FFFFFF", "#002A8F"]],
  ["GRN", "Grenada", "h2", ["#007A5E", "#FCD116"]],
  ["GUY", "Guyana", "h2", ["#009E49", "#FCD116"]],
  ["SUR", "Suriname", "h3", ["#377E3F", "#FFFFFF", "#B40A2D"]],
  ["SKN", "St Kitts and Nevis", "h2", ["#007A33", "#DA121A"]],
  ["LCA", "St Lucia", "plain", ["#66CCFF"]],
  ["VIN", "St Vincent and the Grenadines", "v3", ["#0072C6", "#FCD116", "#009E60"]],
  ["ATG", "Antigua and Barbuda", "h3", ["#000000", "#0072C6", "#FFFFFF"]],
  ["ARU", "Aruba", "plain", ["#4189DD"]],
  ["CAY", "Cayman Islands", "plain", ["#002868"]],
  ["VIR", "US Virgin Islands", "plain", ["#FFFFFF"]],
  ["VGB", "British Virgin Islands", "plain", ["#00247D"]],
  ["PUR", "Puerto Rico", "h3", ["#ED1C24", "#FFFFFF", "#ED1C24"]],
  ["MSR", "Montserrat", "plain", ["#00247D"]],
  ["AIA", "Anguilla", "plain", ["#00247D"]],
  ["TCA", "Turks and Caicos", "plain", ["#00247D"]],
  ["DMA", "Dominica", "plain", ["#007A3D"]],

  // CAF tambahan
  ["KEN", "Kenya", "h3", ["#000000", "#BB0000", "#006600"]],
  ["ETH", "Ethiopia", "h3", ["#078930", "#FCDD09", "#DA121A"]],
  ["TAN", "Tanzania", "v2", ["#1EB53A", "#00A3DD"]],
  ["ZIM", "Zimbabwe", "h3", ["#006400", "#FFD200", "#DE2010"]],
  ["MOZ", "Mozambique", "h3", ["#009739", "#000000", "#FCD116"]],
  ["NAM", "Namibia", "v2", ["#003580", "#009543"]],
  ["BOT", "Botswana", "h3", ["#75AADB", "#000000", "#75AADB"]],
  ["RWA", "Rwanda", "h3", ["#00A1DE", "#FAD201", "#20603D"]],
  ["SDN", "Sudan", "h3", ["#D21034", "#FFFFFF", "#000000"]],
  ["LBY", "Libya", "h3", ["#E70013", "#000000", "#239E46"]],
  ["MTN", "Mauritania", "plain", ["#00A651"]],
  ["NIG", "Niger", "h3", ["#E05206", "#FFFFFF", "#0DB02B"]],
  ["CHA", "Chad", "v3", ["#002664", "#FECB00", "#C60C30"]],
  ["CTA", "Central African Republic", "h4", ["#003082", "#FFFFFF", "#289728", "#FFCE00"]],
  ["CGO", "Congo", "v2", ["#009543", "#DC241F"]],
  ["EQG", "Equatorial Guinea", "h3", ["#3E9A00", "#FFFFFF", "#E32118"]],
  ["SLE", "Sierra Leone", "h3", ["#1EB53A", "#FFFFFF", "#0072C6"]],
  ["LBR", "Liberia", "h3", ["#BF0A30", "#FFFFFF", "#002868"]],
  ["TOG", "Togo", "h3", ["#006A4E", "#FFCE00", "#D21034"]],
  ["GAM", "Gambia", "h3", ["#CE1126", "#0C1C8C", "#3A7728"]],
  ["COM", "Comoros", "h4", ["#FFC61E", "#FFFFFF", "#DE2110", "#3A75C4"]],
  ["MAD", "Madagascar", "v3", ["#FFFFFF", "#FC3D32", "#007E3A"]],
  ["MRI", "Mauritius", "h4", ["#EA2839", "#1A206D", "#FFD500", "#00A551"]],
  ["SWZ", "Eswatini", "h3", ["#3A75C2", "#FFD900", "#B10C0C"]],
  ["LES", "Lesotho", "h3", ["#00209F", "#FFFFFF", "#009543"]],
  ["MWI", "Malawi", "h3", ["#000000", "#CE1126", "#339E35"]],
  ["BDI", "Burundi", "plain", ["#1EB53A"]],
  ["DJI", "Djibouti", "h2", ["#6AB2E7", "#12AD2B"]],
  ["SOM", "Somalia", "plain", ["#4189DD"]],
  ["SSD", "South Sudan", "h3", ["#000000", "#DA121A", "#0F47AF"]],
  ["SEY", "Seychelles", "h3", ["#003F87", "#FCD856", "#D62828"]],

  // AFC tambahan
  ["IND", "India", "h3", ["#FF9933", "#FFFFFF", "#138808"]],
  ["PAK", "Pakistan", "v2", ["#01411C", "#FFFFFF"]],
  ["BAN", "Bangladesh", "plainCircle", ["#006A4E", "#F42A41"]],
  ["SRI", "Sri Lanka", "v3", ["#FFBE29", "#FF5B00", "#8D153A"]],
  ["NEP", "Nepal", "plain", ["#C8102E"]],
  ["MYA", "Myanmar", "h3", ["#FECB00", "#34B233", "#EA2839"]],
  ["CAM", "Cambodia", "h3", ["#032EA1", "#E00025", "#032EA1"]],
  ["LAO", "Laos", "h3", ["#CE1126", "#002868", "#CE1126"]],
  ["SGP", "Singapore", "h2", ["#ED2939", "#FFFFFF"]],
  ["MAS", "Malaysia", "h3", ["#010066", "#CC0001", "#FFCC00"]],
  ["IDN", "Indonesia", "h2", ["#FF0000", "#FFFFFF"]],
  ["PHI", "Philippines", "h2", ["#0038A8", "#CE1126"]],
  ["HKG", "Hong Kong", "plain", ["#DE2910"]],
  ["TPE", "Chinese Taipei", "plain", ["#FE0000"]],
  ["MNG", "Mongolia", "v3", ["#DA2032", "#015197", "#DA2032"]],
  ["KAZ", "Kazakhstan", "plain", ["#00AFCA"]],
  ["KGS", "Kyrgyzstan", "plain", ["#E8112D"]],
  ["TJK", "Tajikistan", "h3", ["#CC0000", "#FFFFFF", "#006600"]],
  ["TKM", "Turkmenistan", "plain", ["#1EB53A"]],
  ["AFG", "Afghanistan", "v3", ["#000000", "#D32011", "#007A36"]],
  ["YEM", "Yemen", "h3", ["#CE1126", "#FFFFFF", "#000000"]],
  ["LIB", "Lebanon", "h3", ["#ED1C24", "#FFFFFF", "#ED1C24"]],
  ["KUW", "Kuwait", "h3", ["#007A3D", "#FFFFFF", "#CE1126"]],
  ["BHU", "Bhutan", "v2", ["#FFCB05", "#FF4E12"]],
  ["MDV", "Maldives", "plain", ["#D21034"]],
  ["TLS", "Timor-Leste", "plain", ["#DC241F"]],
  ["BRU", "Brunei", "plain", ["#FFC726"]],
  ["MAC", "Macau", "plain", ["#00785E"]],
  ["GUM", "Guam", "plain", ["#002868"]],
  ["PRK", "Korea DPR", "h3", ["#024FA2", "#ED1C27", "#024FA2"]],

  // OFC tambahan
  ["FIJ", "Fiji", "plain", ["#68BFE5"]],
  ["PNG", "Papua New Guinea", "v2", ["#000000", "#CE1126"]],
  ["SOL", "Solomon Islands", "v2", ["#0051BA", "#215B33"]],
  ["VAN", "Vanuatu", "h2", ["#D21034", "#009543"]],
  ["SAM", "Samoa", "plain", ["#CE1126"]],
  ["TGA", "Tonga", "plain", ["#C10000"]],
  ["ASA", "American Samoa", "plain", ["#0033A0"]],
  ["COK", "Cook Islands", "plain", ["#0033A0"]],
  ["NCL", "New Caledonia", "h3", ["#002395", "#ED2939", "#00843D"]],
  ["TAH", "Tahiti", "h3", ["#CE1126", "#FFFFFF", "#CE1126"]],

  // UEFA tambahan
  ["EST", "Estonia", "h3", ["#0072CE", "#000000", "#FFFFFF"]],
  ["LAT", "Latvia", "h3", ["#9E3039", "#FFFFFF", "#9E3039"]],
  ["LTU", "Lithuania", "h3", ["#FDB913", "#006A44", "#C1272D"]],
  ["MDA", "Moldova", "v3", ["#003DA5", "#FFD200", "#CC092F"]],
  ["ARM", "Armenia", "h3", ["#D90012", "#0033A0", "#F2A800"]],
  ["AZE", "Azerbaijan", "h3", ["#00B9E4", "#EF3340", "#509E2F"]],
  ["CYP", "Cyprus", "plain", ["#D57800"]],
  ["MLT", "Malta", "v2", ["#FFFFFF", "#CF142B"]],
  ["SMR", "San Marino", "h2", ["#FFFFFF", "#5EB6E4"]],
  ["AND", "Andorra", "v3", ["#0018A8", "#FEDD00", "#D50032"]],
  ["LIE", "Liechtenstein", "h2", ["#002B7F", "#CE1126"]],
  ["MON", "Monaco", "h2", ["#CE1126", "#FFFFFF"]],
  ["FRO", "Faroe Islands", "cross", ["#FFFFFF", "#0065BD"]],
  ["GIB", "Gibraltar", "h2", ["#FFFFFF", "#C8102E"]]
];

/* ===================== Build FLAGS & FIFA_TEAMS ===================== */

var FLAGS = {};
var FIFA_TEAMS = [];

(function () {
  var code;
  for (code in FLAGS_DETAILED) {
    FLAGS[code] = FLAGS_DETAILED[code].svg;
    FIFA_TEAMS.push({ code: code, name: FLAGS_DETAILED[code].name });
  }
  TEAM_DATA.forEach(function (row) {
    var teamCode = row[0], teamName = row[1], type = row[2], colors = row[3];
    FLAGS[teamCode] = buildFlag(type, colors);
    FIFA_TEAMS.push({ code: teamCode, name: teamName });
  });
  FIFA_TEAMS.sort(function (a, b) { return a.name.localeCompare(b.name); });
})();

function getFlag(code) {
  if (!code) { return null; }
  return FLAGS[code.toUpperCase()] || null;
}

function searchTeams(query) {
  if (!query) { return []; }
  var q = query.toUpperCase();
  return FIFA_TEAMS.filter(function (t) {
    return t.code.indexOf(q) !== -1 || t.name.toUpperCase().indexOf(q) !== -1;
  }).slice(0, 12);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FLAGS: FLAGS, FIFA_TEAMS: FIFA_TEAMS, getFlag: getFlag, searchTeams: searchTeams };
}
