/* flag-svg.js — Bendera 50 negara top FIFA Ranking, digambar ulang secara
   geometris sederhana (rect/polygon warna dasar bendera), BUKAN aset/foto
   resmi. viewBox seragam "0 0 3 2" biar gampang dipasang di mana saja. */

var STAR5 = "1.5,0.6 1.594,0.871 1.880,0.876 1.652,1.049 1.735,1.324 1.5,1.16 1.265,1.324 1.348,1.049 1.120,0.876 1.406,0.871";

var FLAGS = {

  FRA: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',

  ARG: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect width="3" height="0.667" fill="#74ACDF"/><rect y="1.333" width="3" height="0.667" fill="#74ACDF"/><circle cx="1.5" cy="1" r="0.22" fill="#F6B40E"/></svg>',

  ESP: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>',

  ENG: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect x="1.2" width="0.6" height="2" fill="#CE1124"/><rect y="0.8" width="3" height="0.4" fill="#CE1124"/></svg>',

  BRA: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#009739"/><polygon points="1.5,0.15 2.85,1 1.5,1.85 0.15,1" fill="#FEDD00"/><circle cx="1.5" cy="1" r="0.45" fill="#012169"/></svg>',

  MAR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C1272D"/><polygon points="' + STAR5 + '" fill="#006233"/></svg>',

  POR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.2" height="2" fill="#046A38"/><rect x="1.2" width="1.8" height="2" fill="#DA291C"/><circle cx="1.2" cy="1" r="0.28" fill="#FFCC00"/></svg>',

  BEL: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#000000"/><rect x="1" width="1" height="2" fill="#FAE042"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>',

  NED: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#AE1C28"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#21468B"/></svg>',

  MEX: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#006341"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#CE1126"/><circle cx="1.5" cy="1" r="0.2" fill="#AE8F3D"/></svg>',

  COL: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FCD116"/><rect y="1" width="3" height="0.5" fill="#003893"/><rect y="1.5" width="3" height="0.5" fill="#CE1126"/></svg>',

  GER: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#000000"/><rect y="0.667" width="3" height="0.667" fill="#DD0000"/><rect y="1.333" width="3" height="0.667" fill="#FFCE00"/></svg>',

  CRO: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FF0000"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#171796"/><rect x="1.35" y="0.75" width="0.3" height="0.3" fill="#C8102E"/></svg>',

  SUI: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#D52B1E"/><rect x="1.35" y="0.6" width="0.3" height="0.8" fill="#FFFFFF"/><rect x="1.1" y="0.85" width="0.8" height="0.3" fill="#FFFFFF"/></svg>',

  ITA: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>',

  USA: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#B22234"/><rect y="0.153" width="3" height="0.153" fill="#FFFFFF"/><rect y="0.462" width="3" height="0.153" fill="#FFFFFF"/><rect y="0.769" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.077" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.385" width="3" height="0.153" fill="#FFFFFF"/><rect y="1.692" width="3" height="0.153" fill="#FFFFFF"/><rect width="1.2" height="1.077" fill="#3C3B6E"/></svg>',

  JPN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.5" fill="#BC002D"/></svg>',

  SEN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#00853F"/><rect x="1" width="1" height="2" fill="#FDEF42"/><rect x="2" width="1" height="2" fill="#E31B23"/><polygon points="' + STAR5 + '" fill="#00853F"/></svg>',

  NOR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#EF2B2D"/><rect x="0.9" width="0.5" height="2" fill="#FFFFFF"/><rect y="0.75" width="3" height="0.5" fill="#FFFFFF"/><rect x="1.02" width="0.26" height="2" fill="#002868"/><rect y="0.87" width="3" height="0.26" fill="#002868"/></svg>',

  URU: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect y="0.222" width="3" height="0.222" fill="#0038A8"/><rect y="0.667" width="3" height="0.222" fill="#0038A8"/><rect y="1.111" width="3" height="0.222" fill="#0038A8"/><rect y="1.556" width="3" height="0.222" fill="#0038A8"/><rect width="1.2" height="1" fill="#FFFFFF"/><circle cx="0.6" cy="0.5" r="0.22" fill="#FCD116"/></svg>',

  DEN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#C60C30"/><rect x="0.9" width="0.4" height="2" fill="#FFFFFF"/><rect y="0.8" width="3" height="0.4" fill="#FFFFFF"/></svg>',

  IRN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#239F40"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#DA0000"/></svg>',

  AUT: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#ED2939"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#ED2939"/></svg>',

  EGY: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#CE1126"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#000000"/><circle cx="1.5" cy="1" r="0.18" fill="#C09300"/></svg>',

  ECU: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFDD00"/><rect y="1" width="3" height="0.5" fill="#0F47AF"/><rect y="1.5" width="3" height="0.5" fill="#EF3340"/><circle cx="1.5" cy="1" r="0.2" fill="#FFFFFF" stroke="#0F47AF" stroke-width="0.03"/></svg>',

  NGA: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#008751"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#008751"/></svg>',

  TUR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#E30A17"/><circle cx="1.3" cy="1" r="0.42" fill="#FFFFFF"/><circle cx="1.41" cy="1" r="0.35" fill="#E30A17"/><polygon points="1.75,0.75 1.82,0.93 2.01,0.93 1.86,1.05 1.92,1.23 1.75,1.12 1.58,1.23 1.64,1.05 1.49,0.93 1.68,0.93" fill="#FFFFFF"/></svg>',

  AUS: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#00008B"/><rect width="1.3" height="1" fill="#FFFFFF"/><rect x="0.08" y="0.08" width="1.14" height="0.84" fill="#CE1126"/><circle cx="2.2" cy="0.5" r="0.07" fill="#FFFFFF"/><circle cx="2.5" cy="1" r="0.07" fill="#FFFFFF"/><circle cx="2.1" cy="1.5" r="0.07" fill="#FFFFFF"/><circle cx="2.6" cy="1.6" r="0.05" fill="#FFFFFF"/><circle cx="2.7" cy="0.7" r="0.05" fill="#FFFFFF"/></svg>',

  ALG: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="2" fill="#006233"/><rect x="1.5" width="1.5" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.38" fill="#FFFFFF"/><circle cx="1.6" cy="1" r="0.32" fill="#006233"/><polygon points="' + STAR5 + '" fill="#D21034"/></svg>',

  CAN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="0.75" height="2" fill="#FF0000"/><rect x="0.75" width="1.5" height="2" fill="#FFFFFF"/><rect x="2.25" width="0.75" height="2" fill="#FF0000"/><polygon points="1.5,0.6 1.6,0.9 1.9,0.9 1.65,1.1 1.75,1.4 1.5,1.2 1.25,1.4 1.35,1.1 1.1,0.9 1.4,0.9" fill="#FF0000"/></svg>',

  CIV: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#F77F00"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#009E60"/></svg>',

  KOR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><circle cx="1.5" cy="1" r="0.42" fill="#FFFFFF"/><path d="M1.5,0.58 A0.21,0.21 0 0,1 1.5,1 A0.21,0.21 0 0,0 1.5,1.42 A0.42,0.42 0 0,0 1.5,0.58 Z" fill="#CD2E3A"/><path d="M1.5,1.42 A0.21,0.21 0 0,1 1.5,1 A0.21,0.21 0 0,0 1.5,0.58 A0.42,0.42 0 0,0 1.5,1.42 Z" fill="#0047A0"/></svg>',

  UKR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#0057B7"/><rect y="1" width="3" height="1" fill="#FFD700"/></svg>',

  PAR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#D52B1E"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#0038A8"/><circle cx="1.5" cy="1" r="0.16" fill="#FFCC00" stroke="#0038A8" stroke-width="0.02"/></svg>',

  RUS: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFFFFF"/><rect y="0.667" width="3" height="0.667" fill="#0039A6"/><rect y="1.333" width="3" height="0.667" fill="#D52B1E"/></svg>',

  POL: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>',

  SWE: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#006AA7"/><rect x="0.9" width="0.4" height="2" fill="#FECC02"/><rect y="0.8" width="3" height="0.4" fill="#FECC02"/></svg>',

  WAL: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#00B140"/><ellipse cx="1.5" cy="1" rx="0.45" ry="0.28" fill="#C8102E"/><polygon points="1.9,1 2.25,0.87 2.25,1.13" fill="#C8102E"/></svg>',

  HUN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#CD2A3E"/><rect y="0.667" width="3" height="0.667" fill="#FFFFFF"/><rect y="1.333" width="3" height="0.667" fill="#436F4D"/></svg>',

  SRB: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#C6363C"/><rect y="0.667" width="3" height="0.667" fill="#0C4076"/><rect y="1.333" width="3" height="0.667" fill="#FFFFFF"/></svg>',

  COD: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#007FFF"/><polygon points="0,2 0.3,2 3,0.3 3,0" fill="#F7D618"/><polygon points="0,2 0.15,2 3,0.15 3,0" fill="#CE1021"/><polygon points="0.45,0.20 0.485,0.301 0.593,0.304 0.507,0.369 0.538,0.471 0.45,0.41 0.362,0.471 0.393,0.369 0.307,0.304 0.415,0.301" fill="#F7D618"/></svg>',

  SCO: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#005EB8"/><polygon points="0,0 0.35,0 3,1.75 3,2 2.65,2 0,0.25" fill="#FFFFFF"/><polygon points="3,0 2.65,0 0,1.75 0,2 0.35,2 3,0.25" fill="#FFFFFF"/></svg>',

  CMR: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#007A5E"/><rect x="1" width="1" height="2" fill="#CE1126"/><rect x="2" width="1" height="2" fill="#FCD116"/><polygon points="' + STAR5 + '" fill="#FCD116"/></svg>',

  PAN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="1" fill="#FFFFFF"/><rect x="1.5" width="1.5" height="1" fill="#DA121A"/><rect y="1" width="1.5" height="1" fill="#0072C6"/><rect x="1.5" y="1" width="1.5" height="1" fill="#FFFFFF"/><circle cx="0.75" cy="0.5" r="0.14" fill="#0072C6"/><circle cx="2.25" cy="1.5" r="0.14" fill="#DA121A"/></svg>',

  SVK: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFFFFF"/><rect y="0.667" width="3" height="0.667" fill="#0B4EA2"/><rect y="1.333" width="3" height="0.667" fill="#EE1C25"/></svg>',

  GRE: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFFFFF"/><rect width="3" height="0.222" fill="#0D5EAF"/><rect y="0.444" width="3" height="0.222" fill="#0D5EAF"/><rect y="0.889" width="3" height="0.222" fill="#0D5EAF"/><rect y="1.333" width="3" height="0.222" fill="#0D5EAF"/><rect y="1.778" width="3" height="0.222" fill="#0D5EAF"/><rect width="1.2" height="1.111" fill="#0D5EAF"/><rect x="0.5" y="0.35" width="0.2" height="0.7" fill="#FFFFFF"/><rect x="0.3" y="0.6" width="0.6" height="0.2" fill="#FFFFFF"/></svg>',

  VEN: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="0.667" fill="#FFCC00"/><rect y="0.667" width="3" height="0.667" fill="#00247D"/><rect y="1.333" width="3" height="0.667" fill="#CF142B"/><circle cx="1.1" cy="1" r="0.045" fill="#FFFFFF"/><circle cx="1.3" cy="0.92" r="0.045" fill="#FFFFFF"/><circle cx="1.5" cy="0.88" r="0.045" fill="#FFFFFF"/><circle cx="1.7" cy="0.92" r="0.045" fill="#FFFFFF"/><circle cx="1.9" cy="1" r="0.045" fill="#FFFFFF"/></svg>',

  CZE: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#D7141A"/><polygon points="0,0 1.3,1 0,2" fill="#11457E"/></svg>',

  CHI: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="1" fill="#FFFFFF"/><rect y="1" width="3" height="1" fill="#D52B1E"/><rect width="1" height="1" fill="#0039A6"/><polygon points="0.5,0.25 0.559,0.419 0.738,0.423 0.595,0.531 0.647,0.702 0.5,0.6 0.353,0.702 0.405,0.531 0.262,0.423 0.441,0.419" fill="#FFFFFF"/></svg>',

  PER: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#D91023"/><rect x="1" width="1" height="2" fill="#FFFFFF"/><rect x="2" width="1" height="2" fill="#D91023"/></svg>'
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = FLAGS;
}
