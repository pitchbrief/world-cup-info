/* theme.js — Engine Settings global untuk World Cup Info's
   Menangani: dark/light/system mode, default format wallchart,
   default timezone countdown. Dipakai di semua halaman lewat
   <script src="assets/theme.js"></script> + snippet anti-flash di <head>. */

var WC_SETTINGS_KEY = "wcinfo30_settings_v1";

var WCSettings = (function () {

  var DEFAULTS = {
    theme: "system",           // "light" | "dark" | "system"
    wallchartFormat: "64",     // "48" | "64"
    timezoneOffsetMinutes: 420, // default GMT+7
    timezoneLabel: "Jakarta (GMT+7)"
  };

  function load() {
    try {
      var raw = localStorage.getItem(WC_SETTINGS_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      var merged = {};
      for (var k in DEFAULTS) { merged[k] = (parsed[k] !== undefined) ? parsed[k] : DEFAULTS[k]; }
      return merged;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
  }

  function save(settings) {
    try {
      localStorage.setItem(WC_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) { /* ignore quota errors */ }
  }

  function get(key) {
    var s = load();
    return key ? s[key] : s;
  }

  function set(key, value) {
    var s = load();
    s[key] = value;
    save(s);
    if (key === "theme") { applyTheme(s.theme); }
    return s;
  }

  function resolvedTheme(themeValue) {
    if (themeValue === "system") {
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return themeValue;
  }

  function applyTheme(themeValue) {
    var resolved = resolvedTheme(themeValue || get("theme"));
    document.documentElement.setAttribute("data-theme", resolved);
    updateToggleIcon(resolved);
  }

  function updateToggleIcon(resolved) {
    var btn = document.getElementById("theme-quick-toggle");
    if (!btn || typeof OTHER_SVG === "undefined") { return; }
    btn.innerHTML = resolved === "dark" ? OTHER_SVG.sun : OTHER_SVG.moon;
  }

  // Toggle cepat: cuma gonta-ganti light <-> dark (tidak menyentuh opsi "system")
  function quickToggle() {
    var current = resolvedTheme(get("theme"));
    var next = current === "dark" ? "light" : "dark";
    set("theme", next);
  }

  function injectQuickToggleButton() {
    var navInner = document.querySelector(".navbar-inner");
    if (!navInner || document.getElementById("theme-quick-toggle")) { return; }
    var btn = document.createElement("button");
    btn.id = "theme-quick-toggle";
    btn.className = "theme-toggle-btn";
    btn.setAttribute("aria-label", "Ganti mode terang/gelap");
    var toggleEl = navInner.querySelector(".navbar-toggle");
    if (toggleEl) {
      navInner.insertBefore(btn, toggleEl);
    } else {
      navInner.appendChild(btn);
    }
    btn.addEventListener("click", quickToggle);
    updateToggleIcon(resolvedTheme(get("theme")));
  }

  // Terapkan tema sesegera mungkin (sebelum DOM lain dirender) untuk cegah flash
  applyTheme(get("theme"));

  // Kalau mode "system" dan OS ganti tema saat halaman terbuka, ikut berubah live
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (get("theme") === "system") { applyTheme("system"); }
    });
  }

  document.addEventListener("DOMContentLoaded", injectQuickToggleButton);

  return {
    get: get,
    set: set,
    applyTheme: applyTheme,
    resolvedTheme: resolvedTheme,
    DEFAULTS: DEFAULTS
  };
})();
