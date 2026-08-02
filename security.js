/* security.js: Security Level 2 ("Secure") hardening for World Cup Info's.

   Scale used across this project (see project memory for future reference):
   - Level 1 "Basic": no special hardening, relies only on browser defaults.
   - Level 2 "Secure" (this file): sane defaults for a static, no-backend
     site. Defends against the realistic risks a static GitHub Pages site
     actually has: XSS from unsanitized dynamic HTML, clickjacking via
     iframe embedding, and casual self-XSS (someone pasting a malicious
     snippet into DevTools because a scammer told them to).
   - Level 3 "Ultimate": would add things this project doesn't need yet,
     such as Subresource Integrity hashes on every external asset, a
     strict no-unsafe-inline CSP with per-script nonces (needs a build
     step to generate), tamper-evident checksums on the JSON data files,
     and a Service Worker that verifies cached assets before serving them.

   This is a static site with no login, no backend, and no user accounts,
   so "security" here means defensive coding hygiene, not access control.
*/

(function () {
  "use strict";

  /* ---------------- 1. Clickjacking defense ---------------- */
  /* If this page is ever loaded inside someone else's iframe (a common
     clickjacking setup), break out to the top window. */
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location.href;
    }
  } catch (e) {
    /* Cross-origin frame access throws by design; if we can't even read
       window.top, we're definitely framed by a different origin, so hide
       the page content instead of risking a clickjacking overlay. */
    document.documentElement.style.display = "none";
  }

  /* ---------------- 2. Self-XSS console warning ---------------- */
  /* The classic "Stop!" warning: scammers sometimes tell people to paste
     a script into DevTools to "unlock" something. This won't stop a
     determined attacker, but it does stop the social-engineering trick
     that targets ordinary visitors. */
  var warningStyle = "color:#E4002B;font-size:36px;font-weight:900;";
  var bodyStyle = "color:#0B3D2E;font-size:15px;";
  try {
    console.log("%cStop!", warningStyle);
    console.log(
      "%cThis is a browser feature for developers. If someone told you to paste something here to unlock a feature, get free items, or hack an account, it's a scam and will give them access to your data. World Cup Info's will never ask you to paste anything into this console.",
      bodyStyle
    );
  } catch (e) { /* console unavailable in some embedded contexts, non-fatal */ }

  /* ---------------- 3. HTML-escaping utility ---------------- */
  /* Every page on this site builds HTML strings from data (group.json,
     wallchart.json, localStorage) via innerHTML. Those files are only
     ever edited by the site owner, not visitors, so the realistic risk
     is low, but escaping is still cheap insurance. Exposed globally as
     window.escapeHTML for any script on the site to use defensively. */
  function escapeHTML(str) {
    if (str === null || str === undefined) { return ""; }
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  window.escapeHTML = escapeHTML;

  /* ---------------- 4. Safe localStorage read/write ---------------- */
  /* Centralized helpers so a corrupted or hand-edited localStorage value
     (or one written by a different site sharing the same browser profile,
     in the unlikely event of a key collision) can never throw and break
     the page. Exposed as window.safeStorage. */
  function safeGet(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (raw === null) { return fallback; }
      return JSON.parse(raw);
    } catch (e) {
      console.warn("security.js: could not read localStorage key", key, e);
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("security.js: could not write localStorage key", key, e);
      return false;
    }
  }

  window.safeStorage = { get: safeGet, set: safeSet };

  /* ---------------- 5. Freeze shared data after load ---------------- */
  /* Once assets/flags-data.js and assets/other.js have populated the
     global FLAGS, FIFA_TEAMS, and OTHER_SVG objects, freeze them. This
     doesn't stop a malicious script from redefining the globals outright,
     but it does stop accidental or injected mutation of the existing
     objects (e.g. a bug elsewhere overwriting a flag entry), which keeps
     every page rendering the same data all session. */
  function freezeIfPresent(name) {
    if (window[name] && typeof window[name] === "object" && !Object.isFrozen(window[name])) {
      try { Object.freeze(window[name]); } catch (e) { /* non-fatal */ }
    }
  }

  window.addEventListener("load", function () {
    freezeIfPresent("FLAGS");
    freezeIfPresent("FIFA_TEAMS");
    freezeIfPresent("OTHER_SVG");
  });
})();
