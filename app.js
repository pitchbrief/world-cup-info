/* app.js — Logic interaktif untuk WC 2030 Wallchart
   World Cup Info's — vanilla ES5, tanpa framework.

   ====================================================================
   TOGGLE FORMAT (rahasia / manual di source code):
   Ubah nilai FORMAT_OVERRIDE di bawah ini untuk memaksa format tertentu
   tanpa lewat UI. Isi "48" atau "64". Biarkan null untuk ikut default
   di config.json / wallchart.json (activeFormat).
   ==================================================================== */
var FORMAT_OVERRIDE = null; // "48" | "64" | null

var STORAGE_KEY = "wcinfo30_wallchart_state_v1";

var wallchartData = null;
var configData = null;
var currentFormat = "64";
var matchState = {}; // { matchId: { home, away, halfTime:{h,a}, fullTime:{h,a}, extraTime:{enabled,periods:[]}, penalties:{...}, cards:{...} } }
var activeModalMatchId = null;

/* ---------------- Bootstrapping ---------------- */

document.addEventListener("DOMContentLoaded", function () {
  loadState();
  Promise.all([
    fetchJSON("config.json"),
    fetchJSON("assets/wallchart.json")
  ]).then(function (results) {
    configData = results[0];
    wallchartData = results[1];
    currentFormat = FORMAT_OVERRIDE || wallchartData.activeFormat || "64";
    renderFormatToggle();
    renderAll();
    bindModalEvents();
  }).catch(function (err) {
    console.error("Gagal memuat data wallchart:", err);
    var root = document.getElementById("groups-container");
    if (root) {
      root.innerHTML = '<p style="color:#E4002B;font-weight:600;">Gagal memuat data wallchart. Pastikan file assets/wallchart.json dan config.json tersedia.</p>';
    }
  });
});

function fetchJSON(path) {
  return fetch(path).then(function (res) {
    if (!res.ok) { throw new Error("Fetch gagal: " + path); }
    return res.json();
  });
}

/* ---------------- State persistence ---------------- */

function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    matchState = raw ? JSON.parse(raw) : {};
  } catch (e) {
    matchState = {};
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchState));
  } catch (e) { /* ignore quota errors */ }
}

function getMatch(matchId, homeLabel, awayLabel) {
  if (!matchState[matchId]) {
    matchState[matchId] = {
      home: homeLabel,
      away: awayLabel,
      halfTime: { h: null, a: null },
      fullTime: { h: null, a: null },
      extraTime: { enabled: false, periods: [] },
      penalties: {
        enabled: false,
        home: { score: 0, sequence: ["neutral", "neutral", "neutral", "neutral", "neutral"] },
        away: { score: 0, sequence: ["neutral", "neutral", "neutral", "neutral", "neutral"] }
      },
      cards: { home: { yellow: 0, red: 0 }, away: { yellow: 0, red: 0 } }
    };
  }
  return matchState[matchId];
}

/* ---------------- Format toggle ---------------- */

function renderFormatToggle() {
  var wrap = document.getElementById("format-toggle");
  if (!wrap) { return; }
  wrap.innerHTML =
    '<button class="btn btn-sm ' + (currentFormat === "48" ? "btn-primary" : "btn-ghost") + '" id="btn-format-48">48 Tim (104 Laga)</button>' +
    '<button class="btn btn-sm ' + (currentFormat === "64" ? "btn-primary" : "btn-ghost") + '" id="btn-format-64">64 Tim (128 Laga)</button>';
  document.getElementById("btn-format-48").addEventListener("click", function () { switchFormat("48"); });
  document.getElementById("btn-format-64").addEventListener("click", function () { switchFormat("64"); });
}

function switchFormat(fmt) {
  currentFormat = fmt;
  renderFormatToggle();
  renderAll();
}

function renderAll() {
  renderNote();
  renderGroups();
  renderKnockout();
}

function renderNote() {
  var noteEl = document.getElementById("wallchart-note");
  if (!noteEl || !wallchartData) { return; }
  noteEl.textContent = wallchartData.note || "";
}

/* ---------------- Group stage ---------------- */

function renderGroups() {
  var container = document.getElementById("groups-container");
  if (!container || !wallchartData) { return; }
  container.innerHTML = "";

  var fmt = wallchartData.formats[currentFormat];
  var template = wallchartData.groupFixtureTemplate; // ["1v2","1v3",...]
  var groupKeys = Object.keys(fmt.groups);

  groupKeys.forEach(function (groupKey) {
    var teams = fmt.groups[groupKey];
    var groupBox = document.createElement("div");
    groupBox.className = "card group-card";

    var title = document.createElement("h3");
    title.textContent = "Grup " + groupKey;
    groupBox.appendChild(title);

    var matchList = document.createElement("div");
    matchList.className = "match-list";

    template.forEach(function (pairCode) {
      var idxs = pairCode.split("v").map(function (n) { return parseInt(n, 10) - 1; });
      var homeTeam = teams[idxs[0]];
      var awayTeam = teams[idxs[1]];
      var matchId = "G-" + currentFormat + "-" + groupKey + "-" + pairCode;
      matchList.appendChild(buildMatchRow(matchId, homeTeam, awayTeam));
    });

    groupBox.appendChild(matchList);
    container.appendChild(groupBox);
  });
}

/* ---------------- Knockout stage ---------------- */

var ROUND_LABELS = {
  roundOf32: "Babak 32 Besar",
  roundOf16: "Babak 16 Besar",
  quarterFinals: "Perempat Final",
  semiFinals: "Semifinal",
  thirdPlacePlayoff: "Perebutan Juara 3",
  final: "Final"
};

var ROUND_ORDER = ["roundOf32", "roundOf16", "quarterFinals", "semiFinals", "thirdPlacePlayoff", "final"];

function renderKnockout() {
  var container = document.getElementById("knockout-container");
  if (!container || !wallchartData) { return; }
  container.innerHTML = "";

  var fmt = wallchartData.formats[currentFormat];
  var knockout = fmt.knockout;

  ROUND_ORDER.forEach(function (roundKey) {
    var round = knockout[roundKey];
    if (!round) { return; }

    var roundBox = document.createElement("div");
    roundBox.className = "knockout-round";

    var title = document.createElement("h4");
    title.textContent = ROUND_LABELS[roundKey] + " (" + round.matchCount + " Laga)";
    roundBox.appendChild(title);

    var list = document.createElement("div");
    list.className = "match-list";

    round.matches.forEach(function (m) {
      var matchId = "K-" + currentFormat + "-" + m.id;
      list.appendChild(buildMatchRow(matchId, m.home, m.away));
    });

    roundBox.appendChild(list);
    container.appendChild(roundBox);
  });
}

/* ---------------- Match row builder (dipakai grup & knockout) ---------------- */

function flagOrPlaceholder(teamLabel) {
  var code = teamNameToCode(teamLabel);
  if (code && typeof FLAGS !== "undefined" && FLAGS[code]) {
    return '<span class="flag-icon">' + FLAGS[code] + '</span>';
  }
  return '<span class="flag-icon flag-placeholder"></span>';
}

// Pemetaan sederhana nama tuan rumah ke kode bendera (karena tim lain masih TBD)
var HOST_CODE_MAP = {
  "Morocco": "MAR",
  "Portugal": "POR",
  "Spain": "ESP",
  "Uruguay": "URU",
  "Argentina": "ARG",
  "Paraguay": "PAR"
};

function teamNameToCode(name) {
  return HOST_CODE_MAP[name] || null;
}

function buildMatchRow(matchId, homeLabel, awayLabel) {
  var m = getMatch(matchId, homeLabel, awayLabel);
  var row = document.createElement("div");
  row.className = "match-row";
  row.setAttribute("data-match-id", matchId);

  var scoreDisplay = formatScoreDisplay(m);

  row.innerHTML =
    '<div class="match-team match-team-home">' + flagOrPlaceholder(homeLabel) + '<span>' + homeLabel + '</span></div>' +
    '<div class="match-score-mini">' +
      '<input type="number" min="0" class="score-mini-input" data-side="h" value="' + (m.fullTime.h === null ? "" : m.fullTime.h) + '" placeholder="-">' +
      '<span class="score-mini-sep">:</span>' +
      '<input type="number" min="0" class="score-mini-input" data-side="a" value="' + (m.fullTime.a === null ? "" : m.fullTime.a) + '" placeholder="-">' +
    '</div>' +
    '<div class="match-team match-team-away">' + '<span>' + awayLabel + '</span>' + flagOrPlaceholder(awayLabel) + '</div>' +
    '<button class="btn btn-sm btn-ghost match-other-btn">Other</button>' +
    '<div class="match-score-display">' + scoreDisplay + '</div>';

  var inputs = row.querySelectorAll(".score-mini-input");
  inputs.forEach(function (inp) {
    inp.addEventListener("input", function () {
      var side = inp.getAttribute("data-side");
      var val = inp.value === "" ? null : parseInt(inp.value, 10);
      if (side === "h") { m.fullTime.h = val; } else { m.fullTime.a = val; }
      row.querySelector(".match-score-display").innerHTML = formatScoreDisplay(m);
      saveState();
    });
  });

  row.querySelector(".match-other-btn").addEventListener("click", function () {
    openMatchModal(matchId);
  });

  return row;
}

function formatScoreDisplay(m) {
  var h = m.fullTime.h === null ? "-" : m.fullTime.h;
  var a = m.fullTime.a === null ? "-" : m.fullTime.a;
  var str = h + " : " + a;
  if (m.penalties && m.penalties.enabled) {
    str = h + " (" + m.penalties.home.score + ") : (" + m.penalties.away.score + ") " + a;
  }
  return str;
}

/* ---------------- Modal "Other" ---------------- */

function bindModalEvents() {
  var overlay = document.getElementById("match-modal");
  if (!overlay) { return; }
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) { closeMatchModal(); }
  });
  var closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) { closeBtn.addEventListener("click", closeMatchModal); }
}

function openMatchModal(matchId) {
  activeModalMatchId = matchId;
  var m = matchState[matchId];
  if (!m) { return; }

  document.getElementById("modal-match-title").textContent = m.home + " vs " + m.away;
  renderModalBody(m);

  document.getElementById("match-modal").classList.add("open");
}

function closeMatchModal() {
  document.getElementById("match-modal").classList.remove("open");
  activeModalMatchId = null;
  // refresh baris match yang tadi dibuka biar skor & penalty ke-update di list
  renderAll();
}

function renderModalBody(m) {
  var body = document.getElementById("modal-body");

  var html = "";

  // Half Time & Full Time (otomatis, tapi tetap bisa isi manual half time)
  html += '<div class="modal-section">';
  html += '<div class="modal-section-title">Half Time</div>';
  html += '<div class="score-input-group">' +
    '<input type="number" min="0" id="ht-home" class="score-box" value="' + (m.halfTime.h === null ? "" : m.halfTime.h) + '">' +
    '<span class="score-vs">:</span>' +
    '<input type="number" min="0" id="ht-away" class="score-box" value="' + (m.halfTime.a === null ? "" : m.halfTime.a) + '">' +
    '</div></div>';

  html += '<div class="modal-section">';
  html += '<div class="modal-section-title">Full Time</div>';
  html += '<div class="score-input-group">' +
    '<input type="number" min="0" id="ft-home" class="score-box" value="' + (m.fullTime.h === null ? "" : m.fullTime.h) + '">' +
    '<span class="score-vs">:</span>' +
    '<input type="number" min="0" id="ft-away" class="score-box" value="' + (m.fullTime.a === null ? "" : m.fullTime.a) + '">' +
    '</div></div>';

  // Extra Time
  html += '<div class="modal-section">';
  html += '<div class="toggle-row">' +
    '<span class="toggle-row-label">Extra Time (120 menit)</span>' +
    '<span class="toggle ' + (m.extraTime.enabled ? "active" : "") + '" id="et-toggle"><span class="toggle-knob"></span></span>' +
    '</div>';
  html += '<div id="et-periods-wrap" style="display:' + (m.extraTime.enabled ? "block" : "none") + ';">';
  html += '<div id="et-periods-list"></div>';
  html += '<button class="btn btn-sm btn-ghost" id="et-add-period" style="margin-top:8px;">+ Tambah Periode Extra Time</button>';
  html += '</div></div>';

  // Penalty
  html += '<div class="modal-section">';
  html += '<div class="toggle-row">' +
    '<span class="toggle-row-label">Adu Penalti</span>' +
    '<span class="toggle ' + (m.penalties.enabled ? "active" : "") + '" id="pen-toggle"><span class="toggle-knob"></span></span>' +
    '</div>';
  html += '<div id="pen-wrap" style="display:' + (m.penalties.enabled ? "block" : "none") + ';">';
  html += '<p style="font-size:12px;color:var(--color-text-muted);margin-bottom:10px;">Klik tiap titik: 1x = Gol, 2x = Gagal, 3x = Netral lagi.</p>';
  html += '<div id="pen-home-row" class="pen-row"><span class="pen-label">' + m.home + '</span><div class="pen-dots" id="pen-home-dots"></div></div>';
  html += '<div id="pen-away-row" class="pen-row"><span class="pen-label">' + m.away + '</span><div class="pen-dots" id="pen-away-dots"></div></div>';
  html += '<p style="font-size:13px;font-weight:700;margin-top:8px;" id="pen-score-summary"></p>';
  html += '</div></div>';

  // Cards
  html += '<div class="modal-section">';
  html += '<div class="modal-section-title">Kartu</div>';
  html += '<div class="grid grid-2" style="gap:14px;">';
  html += cardStepperBlock(m.home, "home", "yellow", m.cards.home.yellow);
  html += cardStepperBlock(m.away, "away", "yellow", m.cards.away.yellow);
  html += cardStepperBlock(m.home, "home", "red", m.cards.home.red);
  html += cardStepperBlock(m.away, "away", "red", m.cards.away.red);
  html += '</div></div>';

  html += '<button class="btn btn-primary" id="modal-save-btn" style="width:100%;justify-content:center;">Simpan</button>';

  body.innerHTML = html;

  // Bind Half/Full time
  document.getElementById("ht-home").addEventListener("input", function (e) { m.halfTime.h = e.target.value === "" ? null : parseInt(e.target.value, 10); });
  document.getElementById("ht-away").addEventListener("input", function (e) { m.halfTime.a = e.target.value === "" ? null : parseInt(e.target.value, 10); });
  document.getElementById("ft-home").addEventListener("input", function (e) { m.fullTime.h = e.target.value === "" ? null : parseInt(e.target.value, 10); });
  document.getElementById("ft-away").addEventListener("input", function (e) { m.fullTime.a = e.target.value === "" ? null : parseInt(e.target.value, 10); });

  // Extra time toggle
  document.getElementById("et-toggle").addEventListener("click", function () {
    m.extraTime.enabled = !m.extraTime.enabled;
    if (m.extraTime.enabled && m.extraTime.periods.length === 0) {
      m.extraTime.periods.push({ period: 1, home: 0, away: 0 });
      m.extraTime.periods.push({ period: 2, home: 0, away: 0 });
    }
    renderModalBody(m);
  });

  renderExtraTimePeriods(m);
  document.getElementById("et-add-period").addEventListener("click", function () {
    m.extraTime.periods.push({ period: m.extraTime.periods.length + 1, home: 0, away: 0 });
    renderExtraTimePeriods(m);
  });

  // Penalty toggle
  document.getElementById("pen-toggle").addEventListener("click", function () {
    m.penalties.enabled = !m.penalties.enabled;
    renderModalBody(m);
  });
  renderPenaltyDots(m);

  // Card steppers
  body.querySelectorAll(".stepper-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var side = btn.getAttribute("data-side");
      var type = btn.getAttribute("data-type");
      var op = btn.getAttribute("data-op");
      var current = m.cards[side][type];
      if (op === "inc") { current = Math.min(current + 1, 11); }
      if (op === "dec") { current = Math.max(current - 1, 0); }
      m.cards[side][type] = current;
      body.querySelector('.stepper-value[data-side="' + side + '"][data-type="' + type + '"]').textContent = current;
      saveState();
    });
  });

  document.getElementById("modal-save-btn").addEventListener("click", function () {
    saveState();
    closeMatchModal();
  });
}

function cardStepperBlock(teamLabel, side, type, value) {
  var iconKey = type === "yellow" ? "cardYellow" : "cardRed";
  var icon = (typeof OTHER_SVG !== "undefined" && OTHER_SVG[iconKey]) ? OTHER_SVG[iconKey] : "";
  return '<div class="card-counter">' +
    '<span class="card-icon-sm">' + icon + '</span>' +
    '<div><div style="font-size:12px;color:var(--color-text-muted);">' + teamLabel + '</div>' +
    '<div class="stepper">' +
      '<button class="stepper-btn" data-side="' + side + '" data-type="' + type + '" data-op="dec">-</button>' +
      '<span class="stepper-value" data-side="' + side + '" data-type="' + type + '">' + value + '</span>' +
      '<button class="stepper-btn" data-side="' + side + '" data-type="' + type + '" data-op="inc">+</button>' +
    '</div></div></div>';
}

function renderExtraTimePeriods(m) {
  var wrap = document.getElementById("et-periods-list");
  if (!wrap) { return; }
  wrap.innerHTML = "";
  m.extraTime.periods.forEach(function (p, idx) {
    var row = document.createElement("div");
    row.className = "et-period";
    row.innerHTML =
      '<span class="et-period-label">Periode ' + p.period + '</span>' +
      '<input type="number" min="0" class="score-box" style="width:44px;height:40px;font-size:15px;" data-idx="' + idx + '" data-side="home" value="' + p.home + '">' +
      '<span class="score-vs">:</span>' +
      '<input type="number" min="0" class="score-box" style="width:44px;height:40px;font-size:15px;" data-idx="' + idx + '" data-side="away" value="' + p.away + '">';
    wrap.appendChild(row);
  });
  wrap.querySelectorAll("input").forEach(function (inp) {
    inp.addEventListener("input", function () {
      var idx = parseInt(inp.getAttribute("data-idx"), 10);
      var side = inp.getAttribute("data-side");
      m.extraTime.periods[idx][side] = inp.value === "" ? 0 : parseInt(inp.value, 10);
      saveState();
    });
  });
}

function renderPenaltyDots(m) {
  ["home", "away"].forEach(function (side) {
    var wrap = document.getElementById("pen-" + side + "-dots");
    if (!wrap) { return; }
    wrap.innerHTML = "";
    m.penalties[side].sequence.forEach(function (state, idx) {
      var dot = document.createElement("div");
      dot.className = "pen-dot " + (state === "goal" ? "goal" : state === "miss" ? "miss" : "");
      dot.textContent = (idx + 1);
      dot.addEventListener("click", function () {
        cyclePenaltyDot(m, side, idx);
      });
      wrap.appendChild(dot);
    });
  });
  updatePenaltyScoreSummary(m);
}

function cyclePenaltyDot(m, side, idx) {
  var seq = m.penalties[side].sequence;
  var current = seq[idx];
  var next = current === "neutral" ? "goal" : current === "goal" ? "miss" : "neutral";
  seq[idx] = next;
  m.penalties[side].score = seq.filter(function (s) { return s === "goal"; }).length;
  renderPenaltyDots(m);
  saveState();
}

function updatePenaltyScoreSummary(m) {
  var el = document.getElementById("pen-score-summary");
  if (!el) { return; }
  el.textContent = "Skor Penalti: " + m.penalties.home.score + " - " + m.penalties.away.score;
}
