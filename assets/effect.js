/* effects.js — Vanilla JS/CSS adaptations of the Aceternity-style motion
   components the user provided. World Cup Info's is a plain HTML/CSS/ES5
   static site (no React, no framer-motion, no build step), so each effect
   below re-implements the same INTERACTION IDEA using the DOM + CSS
   transitions instead of importing the original React components verbatim.

   Included here (used elsewhere in the site with a stated reason — see
   HumanCraft Design Intelligence rules, no effect added "just because"):

   1. textGenerateEffect(el)   — from "Text Generate Effect" component.
      Words fade in from a blur, staggered. Used once, on the homepage H1,
      to read like a briefing being revealed — matches the "PitchBrief"
      summary-first brand voice. Not reused elsewhere (rule: don't repeat
      a flashy device until it becomes wallpaper).

   2. pointerHighlight(el)     — from "Pointer Highlight" component.
      Draws an animated box + pointer around one call-out phrase to direct
      the eye to the single most important fact in the hero (Rule 5:
      visual hierarchy — one focal point, not everything highlighted).

   3. cardStack(container, items) — from "Card Stack" component.
      Used for the homepage QnA preview: a literal stack of cards implies
      "there's more underneath", nudging people toward the full Docs page.

   4. statefulButton(btn, actionFn) — from "Stateful Button" component.
      Spinner -> checkmark feedback for actions where silence would be
      confusing (Settings resets, Wallchart modal save) — confirms the
      action actually happened.

   (Floating Dock and the animated Tabs pill live in theme.js and
   wallchart.html respectively, since those needed to hook into
   already-shared code. Text Hover Effect lives inline in index.html's
   footer, as a small one-off flourish — see that file.) */

/* ---------------- 1. Text Generate Effect ---------------- */

function textGenerateEffect(el, opts) {
  if (!el) { return; }
  opts = opts || {};
  var duration = opts.duration || 500; // ms per word transition
  var stagger = opts.stagger || 70; // ms between words starting
  var text = el.textContent;
  var words = text.split(" ");

  el.innerHTML = "";
  el.style.opacity = "1";

  words.forEach(function (word, idx) {
    var span = document.createElement("span");
    span.textContent = word + (idx < words.length - 1 ? "\u00A0" : "");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.filter = "blur(10px)";
    span.style.transform = "translateY(6px)";
    span.style.transition = "opacity " + duration + "ms ease, filter " + duration + "ms ease, transform " + duration + "ms ease";
    el.appendChild(span);

    setTimeout(function () {
      span.style.opacity = "1";
      span.style.filter = "blur(0px)";
      span.style.transform = "translateY(0)";
    }, idx * stagger + 30);
  });
}

/* ---------------- 2. Pointer Highlight ---------------- */

function pointerHighlight(el, opts) {
  if (!el) { return; }
  opts = opts || {};
  var color = opts.color || "var(--color-accent)";

  el.style.position = "relative";
  el.style.display = "inline-block";
  el.classList.add("pointer-highlight-target");

  var box = document.createElement("span");
  box.className = "pointer-highlight-box";
  box.style.borderColor = color;

  var dot = document.createElement("span");
  dot.className = "pointer-highlight-dot";
  dot.style.background = color;
  box.appendChild(dot);

  el.appendChild(box);

  // Draw in once the element is actually visible (matches whileInView intent)
  var trigger = function () {
    requestAnimationFrame(function () {
      box.classList.add("draw-in");
    });
  };

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { trigger(); io.disconnect(); }
      });
    }, { threshold: 0.6 });
    io.observe(el);
  } else {
    trigger();
  }
}

/* ---------------- 3. Card Stack ---------------- */

function cardStack(container, items, opts) {
  if (!container || !items || items.length === 0) { return; }
  opts = opts || {};
  var offset = opts.offset || 12;
  var scaleStep = opts.scaleStep || 0.05;
  var intervalMs = opts.intervalMs || 5000;

  var order = items.slice();
  container.classList.add("card-stack");
  container.innerHTML = "";

  var cardEls = order.map(function (item) {
    var card = document.createElement("div");
    card.className = "card-stack-item";
    card.innerHTML =
      '<div class="card-stack-content">' + item.content + '</div>' +
      '<div class="card-stack-footer"><strong>' + item.title + '</strong></div>';
    container.appendChild(card);
    return card;
  });

  function layout() {
    cardEls.forEach(function (card, i) {
      var pos = order[i]._pos;
      card.style.transform = "translateY(" + (pos * -offset) + "px) scale(" + (1 - pos * scaleStep) + ")";
      card.style.zIndex = String(cardEls.length - pos);
    });
  }

  order.forEach(function (item, i) { item._pos = i; });
  layout();

  setInterval(function () {
    // move the front card (_pos 0) to the back, shift everyone else forward — same
    // rotation logic as the original component's unshift(pop())
    var maxPos = order.length - 1;
    order.forEach(function (item) {
      item._pos = item._pos === 0 ? maxPos : item._pos - 1;
    });
    layout();
  }, intervalMs);
}

/* ---------------- 4. Stateful Button ---------------- */

function statefulButton(btn, actionFn) {
  if (!btn) { return; }
  var originalLabel = btn.textContent;
  btn.classList.add("stateful-btn");
  btn.innerHTML =
    '<span class="stateful-spinner"></span>' +
    '<span class="stateful-check">\u2713</span>' +
    '<span class="stateful-label">' + originalLabel + '</span>';

  var spinner = btn.querySelector(".stateful-spinner");
  var check = btn.querySelector(".stateful-check");

  btn.addEventListener("click", function () {
    if (btn.classList.contains("stateful-busy")) { return; }
    btn.classList.add("stateful-busy");
    spinner.classList.add("show");

    Promise.resolve(actionFn ? actionFn() : null).then(function (result) {
      spinner.classList.remove("show");
      if (result === false) {
        // actionFn signaled "nothing happened" (e.g. user cancelled a confirm())
        // — just reset, no success checkmark, since nothing was confirmed.
        btn.classList.remove("stateful-busy");
        return;
      }
      check.classList.add("show");
      setTimeout(function () {
        check.classList.remove("show");
        btn.classList.remove("stateful-busy");
      }, 1400);
    });
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { textGenerateEffect: textGenerateEffect, pointerHighlight: pointerHighlight, cardStack: cardStack, statefulButton: statefulButton };
}
