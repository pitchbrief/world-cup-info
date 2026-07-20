/* app.js — WC 2030 Wallchart interactive logic
   World Cup Info's — vanilla ES5, no framework.

   ====================================================================
   FORMAT TOGGLE (manual / hidden in source code):
   Change FORMAT_OVERRIDE below to force a specific format without
   going through the UI. Use "48" or "64". Leave null to follow the
   default from Settings, then config.json / wallchart.json (activeFormat).
   ==================================================================== */
var FORMAT_OVERRIDE = null; // "48" | "64" | null

var STORAGE_KEY = "wcinfo30_wallchart_state_v1";

var wallchartData = null;
var configData = null;
var currentFormat = "64";
var matchState = {}; // { matchId: { home, away, round, date, time, halfTime:{h,a}, fullTime:{h,a}, extraTime:{enabled,periods:[]}, penalties:{...}, cards:{...} } }
var activeModalMatchId = null;

var ROUND_META = {
  GS: { label: "Group Stage", badge: "GS" },
  RO32: { label: "Round of 32", badge: "R32" },
  RO16: { label: "Round of 16", badge: "R16" },
  QF: { label: "Quarter-Finals", badge: "QF" },
  SF: { label: "Semi-Finals", badge: "SF" },
  TPM: { label: "Third Place Match", badge: "3RD" },
  FINAL: { label: "Final", badge: "FIN" }
};
var ROUND_ORDER = ["GS", "RO32", "RO16", "QF", "SF", "TPM", "FINAL"];
var KNOCKOUT_KEY_MAP = {
  RO32: "roundOf32",
  RO16: "roundOf16",
  QF: "quarterFinals",
  SF: "semiFinals",
  TPM: "thirdPlacePlayoff",
  FINAL: "final"
};

/* ---------------- Bootstrapping ---------------- */

document.addEventListener("DOMContentLoaded", function () {
  loadState();
  Promise.all([
    fetchJSON("config.json"),
    fetchJSON("assets/wallchart.json")
  ]).then(function (results) {
    configData = results[0];
    wallchartData = results[1];
    var settingsFormat = (typeof WCSettings !== "undefined") ? WCSettings.get("wallchartFormat") : null;
    currentFormat = FORMAT_OVERRIDE || settingsFormat || wallchartData.activeFormat || "64";
    renderFormatToggle();
    renderAll();
    bindModalEvents();
  }).catch(function (err) {
    console.error("Failed to load wallchart data:", err);
    var root = document.getElementById("groups-container");
    if (root) {
      root.innerHTML = '<p style="color:#E4002B;font-weight:600;">Failed to load wallchart data. Make sure assets/wallchart.json and config.json are available.</p>';
    }
  });
});

function fetchJSON(path) {
  return fetch(path).then(function (res) {
    if (!res.ok) { throw new Error("Fetch failed: " + path); }
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

function getMatch(matchId, homeLabel, awayLabel, round) {
  if (!matchState[matchId]) {
    matchState[matchId] = {
      home: homeLabel,
      away: awayLabel,
      round: round,
      date: "",
      time: "",
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
  matchState[matchId].round = round; // keep round tag current even for state saved before this field existed
  return matchState[matchId];
}

function isGroupStage(round) {
  return round === "GS";
}

/* ---------------- Format toggle ---------------- */

function renderFormatToggle() {
  var wrap = document.getElementById("format-toggle");
  if (!wrap) { return; }
  wrap.innerHTML =
    '<button class="btn btn-sm ' + (currentFormat === "48" ? "btn-primary" : "btn-ghost") + '" id="btn-format-48">48 Teams (104 Matches)</button>' +
    '<button class="btn btn-sm ' + (currentFormat === "64" ? "btn-primary" : "btn-ghost") + '" id="btn-format-64">64 Teams (128 Matches)</button>';
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
  renderStandings();
  renderScoreWallchart();
}

function renderNote() {
  var noteEl = document.getElementById("wallchart-note");
  if (!noteEl || !wallchartData) { return; }
  noteEl.textContent = wallchartData.note || "";
}

/* ---------------- Helpers: teams & flags ---------------- */

var HOST_CODE_MAP = {
  "Morocco": "MAR",
  "Portugal": "POR",
  "Spain": "ESP",
  "Uruguay": "URU",
  "Argentina": "ARG",
  "Paraguay": "PAR"
};

function teamNameToCode(name) {
  if (HOST_CODE_MAP[name]) { return HOST_CODE_MAP[name]; }
  if (typeof FIFA_TEAMS !== "undefined") {
    var found = FIFA_TEAMS.filter(function (t) { return t.name === name; })[0];
    if (found) { return found.code; }
  }
  return null;
}

function flagOrPlaceholder(teamLabel) {
  var code = teamNameToCode(teamLabel);
  var svg = (typeof FLAGS !== "undefined" && code) ? FLAGS[code] : null;
  if (svg) {
    return '<span class="flag-icon">' + svg + '</span>';
  }
  return '<span class="flag-icon flag-placeholder"></span>';
}

/* ---------------- Tab 1: World Cup Group (standings, computed from GS scores) ---------------- */

function renderStandings() {
  var container = document.getElementById("groups-container");
  if (!container || !wallchartData) { return; }
  container.innerHTML = "";

  var fmt = wallchartData.formats[currentFormat];
  var template = wallchartData.groupFixtureTemplate;
  var groupKeys = Object.keys(fmt.groups);

  groupKeys.forEach(function (groupKey) {
    var teams = fmt.groups[groupKey];
    var stats = teams.map(function (name) {
      return { name: name, played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
    });

    template.forEach(function (pairCode) {
      var idxs = pairCode.split("v").map(function (n) { return parseInt(n, 10) - 1; });
      var matchId = "GS-" + currentFormat + "-" + groupKey + "-" + pairCode;
      var m = matchState[matchId];
      if (!m || m.fullTime.h === null || m.fullTime.a === null) { return; }
      var hIdx = idxs[0], aIdx = idxs[1];
      var hs = m.fullTime.h, as = m.fullTime.a;
      stats[hIdx].played++; stats[aIdx].played++;
      stats[hIdx].gf += hs; stats[hIdx].ga += as;
      stats[aIdx].gf += as; stats[aIdx].ga += hs;
      if (hs > as) { stats[hIdx].won++; stats[hIdx].pts += 3; stats[aIdx].lost++; }
      else if (hs < as) { stats[aIdx].won++; stats[aIdx].pts += 3; stats[hIdx].lost++; }
      else { stats[hIdx].draw++; stats[aIdx].draw++; stats[hIdx].pts += 1; stats[aIdx].pts += 1; }
    });

    stats.sort(function (x, y) {
      if (y.pts !== x.pts) { return y.pts - x.pts; }
      var gdX = x.gf - x.ga, gdY = y.gf - y.ga;
      if (gdY !== gdX) { return gdY - gdX; }
      return y.gf - x.gf;
    });

    var box = document.createElement("div");
    box.className = "card group-card";
    var title = document.createElement("h3");
    title.textContent = "Group " + groupKey;
    box.appendChild(title);

    var table = document.createElement("table");
    table.className = "standings-table";
    var thead = '<thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>GF-GA</th><th>PTS</th></tr></thead>';
    var rows = '<tbody>';
    stats.forEach(function (s) {
      rows += '<tr><td><div class="standings-team-cell">' + flagOrPlaceholder(s.name) + '<span>' + s.name + '</span></div></td>' +
        '<td>' + s.won + '</td><td>' + s.draw + '</td><td>' + s.lost + '</td>' +
        '<td>' + s.gf + '-' + s.ga + '</td><td class="standings-pts">' + s.pts + '</td></tr>';
    });
    rows += '</tbody>';
    table.innerHTML = thead + rows;
    box.appendChild(table);
    container.appendChild(box);
  });
}

/* ---------------- Tab 2: Score Wallchart (ALL rounds: GS-RO32-RO16-QF-SF-TPM-FINAL) ---------------- */

function renderScoreWallchart() {
  var container = document.getElementById("knockout-container");
  if (!container || !wallchartData) { return; }
  container.innerHTML = "";

  var fmt = wallchartData.formats[currentFormat];

  ROUND_ORDER.forEach(function (roundTag) {
    var sectionTitle = document.createElement("div");
    sectionTitle.className = "round-section-title";
    sectionTitle.textContent = ROUND_META[roundTag].label;
    container.appendChild(sectionTitle);

    var list = document.createElement("div");
    list.className = "match-list";

    if (roundTag === "GS") {
      var template = wallchartData.groupFixtureTemplate;
      var groupKeys = Object.keys(fmt.groups);
      groupKeys.forEach(function (groupKey) {
        var teams = fmt.groups[groupKey];
        template.forEach(function (pairCode) {
          var idxs = pairCode.split("v").map(function (n) { return parseInt(n, 10) - 1; });
          var homeTeam = teams[idxs[0]];
          var awayTeam = teams[idxs[1]];
          var matchId = "GS-" + currentFormat + "-" + groupKey + "-" + pairCode;
          list.appendChild(buildFixtureRow(matchId, homeTeam, awayTeam, "GS", groupKey));
        });
      });
    } else {
      var knockoutKey = KNOCKOUT_KEY_MAP[roundTag];
      var round = fmt.knockout[knockoutKey];
      if (round) {
        round.matches.forEach(function (m) {
          var matchId = roundTag + "-" + currentFormat + "-" + m.id;
          list.appendChild(buildFixtureRow(matchId, m.home, m.away, roundTag, ROUND_META[roundTag].badge));
        });
      }
    }

    container.appendChild(list);
  });
}

function buildFixtureRow(matchId, homeLabel, awayLabel, round, badgeLabel) {
  var m = getMatch(matchId, homeLabel, awayLabel, round);
  var row = document.createElement("div");
  row.className = "fixture-row";
  row.setAttribute("data-match-id", matchId);

  row.innerHTML =
    '<div class="fixture-date-time">' +
      '<input type="text" class="fixture-date-input" placeholder="Date" value="' + (m.date || "") + '">' +
      '<input type="text" class="fixture-time-input" placeholder="Time" value="' + (m.time || "") + '">' +
    '</div>' +
    '<div class="match-team match-team-home">' + flagOrPlaceholder(homeLabel) + '<span>' + homeLabel + '</span></div>' +
    '<div class="match-score-mini">' +
      '<input type="number" min="0" class="score-mini-input" data-side="h" value="' + (m.fullTime.h === null ? "" : m.fullTime.h) + '" placeholder="-">' +
      '<span class="score-mini-sep">:</span>' +
      '<input type="number" min="0" class="score-mini-input" data-side="a" value="' + (m.fullTime.a === null ? "" : m.fullTime.a) + '" placeholder="-">' +
    '</div>' +
    '<div class="match-team match-team-away">' + '<span>' + awayLabel + '</span>' + flagOrPlaceholder(awayLabel) + '</div>' +
    '<div class="fixture-badge">' + badgeLabel + '</div>' +
    '<button class="btn btn-sm btn-ghost match-other-btn">Other</button>';

  row.querySelector(".fixture-date-input").addEventListener("input", function (e) { m.date = e.target.value; saveState(); });
  row.querySelector(".fixture-time-input").addEventListener("input", function (e) { m.time = e.target.value; saveState(); });

  var inputs = row.querySelectorAll(".score-mini-input");
  inputs.forEach(function (inp) {
    inp.addEventListener("input", function () {
      var side = inp.getAttribute("data-side");
      var val = inp.value === "" ? null : parseInt(inp.value, 10);
      if (side === "h") { m.fullTime.h = val; } else { m.fullTime.a = val; }
      saveState();
      if (round === "GS") { renderStandings(); }
    });
  });

  row.querySelector(".match-other-btn").addEventListener("click", function () {
    openMatchModal(matchId);
  });

  return row;
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
  renderAll();
}

function renderModalBody(m) {
  var body = document.getElementById("modal-body");
  var groupStage = isGroupStage(m.round);
  var html = "";

  if (groupStage) {
    html += '<p style="font-size:12px;color:var(--color-text-muted);margin-bottom:16px;background:rgba(212,175,55,0.1);padding:10px 14px;border-radius:var(--radius-sm);">Group Stage match — no Extra Time or Penalty Shootout, straight to Full Time.</p>';
  }

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

  if (!groupStage) {
    html += '<div class="modal-section">';
    html += '<div class="toggle-row">' +
      '<span class="toggle-row-label">Extra Time (120 min)</span>' +
      '<span class="toggle ' + (m.extraTime.enabled ? "active" : "") + '" id="et-toggle"><span class="toggle-knob"></span></span>' +
      '</div>';
    html += '<div id="et-periods-wrap" style="display:' + (m.extraTime.enabled ? "block" : "none") + ';">';
    html += '<div id="et-periods-list"></div>';
    html += '<button class="btn btn-sm btn-ghost" id="et-add-period" style="margin-top:8px;">+ Add Extra Time Period</button>';
    html += '</div></div>';

    html += '<div class="modal-section">';
    html += '<div class="toggle-row">' +
      '<span class="toggle-row-label">Penalty Shootout</span>' +
      '<span class="toggle ' + (m.penalties.enabled ? "active" : "") + '" id="pen-toggle"><span class="toggle-knob"></span></span>' +
      '</div>';
    html += '<div id="pen-wrap" style="display:' + (m.penalties.enabled ? "block" : "none") + ';">';
    html += '<p style="font-size:12px;color:var(--color-text-muted);margin-bottom:10px;">Click each dot: 1st click = Goal, 2nd click = Miss, 3rd click = back to Neutral.</p>';
    html += '<div id="pen-home-row" class="pen-row"><span class="pen-label">' + m.home + '</span><div class="pen-dots" id="pen-home-dots"></div></div>';
    html += '<div id="pen-away-row" class="pen-row"><span class="pen-label">' + m.away + '</span><div class="pen-dots" id="pen-away-dots"></div></div>';
    html += '<p style="font-size:13px;font-weight:700;margin-top:8px;" id="pen-score-summary"></p>';
    html += '</div></div>';
  }

  html += '<div class="modal-section">';
  html += '<div class="modal-section-title">Cards</div>';
  html += '<div class="grid grid-2" style="gap:14px;">';
  html += cardStepperBlock(m.home, "home", "yellow", m.cards.home.yellow);
  html += cardStepperBlock(m.away, "away", "yellow", m.cards.away.yellow);
  html += cardStepperBlock(m.home, "home", "red", m.cards.home.red);
  html += cardStepperBlock(m.away, "away", "red", m.cards.away.red);
  html += '</div></div>';

  html += '<button class="btn btn-primary" id="modal-save-btn" style="width:100%;justify-content:center;">Save</button>';

  body.innerHTML = html;

  document.getElementById("ht-home").addEventListener("input", function (e) { m.halfTime.h = e.target.value === "" ? null : parseInt(e.target.value, 10); saveState(); });
  document.getElementById("ht-away").addEventListener("input", function (e) { m.halfTime.a = e.target.value === "" ? null : parseInt(e.target.value, 10); saveState(); });
  document.getElementById("ft-home").addEventListener("input", function (e) { m.fullTime.h = e.target.value === "" ? null : parseInt(e.target.value, 10); saveState(); });
  document.getElementById("ft-away").addEventListener("input", function (e) { m.fullTime.a = e.target.value === "" ? null : parseInt(e.target.value, 10); saveState(); });

  if (!groupStage) {
    document.getElementById("et-toggle").addEventListener("click", function () {
      m.extraTime.enabled = !m.extraTime.enabled;
      if (m.extraTime.enabled && m.extraTime.periods.length === 0) {
        m.extraTime.periods.push({ period: 1, home: 0, away: 0 });
        m.extraTime.periods.push({ period: 2, home: 0, away: 0 });
      }
      saveState();
      renderModalBody(m);
    });

    renderExtraTimePeriods(m);
    document.getElementById("et-add-period").addEventListener("click", function () {
      m.extraTime.periods.push({ period: m.extraTime.periods.length + 1, home: 0, away: 0 });
      saveState();
      renderExtraTimePeriods(m);
    });

    document.getElementById("pen-toggle").addEventListener("click", function () {
      m.penalties.enabled = !m.penalties.enabled;
      saveState();
      renderModalBody(m);
    });
    renderPenaltyDots(m);
  }

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

/* renderExtraTimePeriods — each period row now has a remove (✕) button.
   BUG FIX: previously there was no way to delete an accidentally-added
   period. Now every period (including the first two default ones) can
   be removed individually, and remaining periods are renumbered. */
function renderExtraTimePeriods(m) {
  var wrap = document.getElementById("et-periods-list");
  if (!wrap) { return; }
  wrap.innerHTML = "";
  m.extraTime.periods.forEach(function (p, idx) {
    var row = document.createElement("div");
    row.className = "et-period";
    row.innerHTML =
      '<span class="et-period-label">Period ' + p.period + '</span>' +
      '<input type="number" min="0" class="score-box" style="width:44px;height:40px;font-size:15px;" data-idx="' + idx + '" data-side="home" value="' + p.home + '">' +
      '<span class="score-vs">:</span>' +
      '<input type="number" min="0" class="score-box" style="width:44px;height:40px;font-size:15px;" data-idx="' + idx + '" data-side="away" value="' + p.away + '">' +
      '<button type="button" class="stepper-btn et-remove-btn" data-idx="' + idx + '" title="Remove this period" style="margin-left:6px;color:var(--color-danger);">✕</button>';
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
  wrap.querySelectorAll(".et-remove-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var idx = parseInt(btn.getAttribute("data-idx"), 10);
      m.extraTime.periods.splice(idx, 1);
      m.extraTime.periods.forEach(function (p, i) { p.period = i + 1; }); // renumber sequentially
      saveState();
      renderExtraTimePeriods(m);
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
  el.textContent = "Penalty Score: " + m.penalties.home.score + " - " + m.penalties.away.score;
}
