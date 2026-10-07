// Noa Jablon portfolio: runtime behaviour for the static Figma-built pages.
(() => {
  const doc = document.documentElement;
  const body = document.body;
  const page = body.dataset.page;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = (id, r = document) => r.querySelector(`[data-node-id="${id}"], [data-node-id$=";${id}"]`);

  // ---------- Scale the 1480px design to the window ----------
  let Z = 1;
  const setZoom = () => {
    Z = Math.max(doc.clientWidth, 320) / 1480;
    doc.style.setProperty("--z", Z);
  };
  setZoom();
  addEventListener("resize", () => { setZoom(); onScroll(); });

  // ---------- Page transitions: slow, soft dissolve on every internal link ----------
  const nativeVT = "onpagereveal" in window && CSS.supports && CSS.supports("view-transition-name: a");
  if (nativeVT) doc.classList.add("vt");
  requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("ready")));
  addEventListener("pageshow", (e) => { if (e.persisted) { body.classList.remove("leaving"); body.classList.add("ready"); } });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || nativeVT || reduce) return;
    const url = new URL(a.href, location.href);
    if (a.target === "_blank" || url.origin !== location.origin || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    body.classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, 800);
  });

  // ---------- Header: hover shows that page's title, icon lifts ----------
  const hdr = $(".hdr");
  if (hdr) {
    const icons = { L: $('[data-name="Untitled-3 1"]', hdr), M: $('[data-name="shape 2 2"]', hdr), R: $('[data-name^="ChatGPT"]', hdr) };
    const titles = {};
    $$("p", hdr).forEach((p) => {
      const t = p.textContent.trim();
      if (t === "PORTFOLIO") titles.L = p;
      else if (t === "ABOUT ME") titles.M = p;
      else if (t === "WORK WITH ME") titles.R = p;
    });
    const shownSpacing = { L: "143.8px", M: "165px", R: "101.4px" };
    const saved = new Map();
    [...Object.values(icons), ...Object.values(titles)].forEach((el) => el && saved.set(el, el.getAttribute("style") || ""));
    const restore = () => saved.forEach((s, el) => el.setAttribute("style", s));
    const show = (k) => {
      for (const key of ["L", "M", "R"]) {
        const ic = icons[key], ti = titles[key];
        if (ic) { ic.style.opacity = key === k ? "1" : "0.25"; ic.style.transform = key === k ? "translate(-3.6px,-3.6px)" : ""; }
        if (ti) { ti.style.opacity = key === k ? "1" : "0"; if (key === k) ti.style.letterSpacing = shownSpacing[key]; }
      }
    };
    [["Hit L", "L"], ["Hit M", "M"], ["Hit R", "R"]].forEach(([n, k]) => {
      const hit = $(`[data-name="${n}"]`, hdr);
      if (!hit) return;
      hit.addEventListener("mouseenter", () => show(k));
      hit.addEventListener("mouseleave", restore);
      hit.addEventListener("focus", () => show(k));
      hit.addEventListener("blur", restore);
    });
  }

  // ---------- Pin an absolutely positioned element to explicit top/left ----------
  function pin(el) {
    if (el.dataset.pinned) return;
    const cs = getComputedStyle(el);
    if (cs.position !== "absolute") { el.dataset.pinned = "1"; return; }
    const cl = el.classList;
    let top = parseFloat(cs.top), left = parseFloat(cs.left);
    if (cl.contains("translate-y-full")) top += parseFloat(cs.height);
    if (cl.contains("translate-x-full")) left += parseFloat(cs.width);
    if (cl.contains("-translate-y-1/2")) top -= parseFloat(cs.height) / 2;
    if (cl.contains("-translate-x-1/2")) left -= parseFloat(cs.width) / 2;
    el.style.top = top + "px"; el.style.left = left + "px";
    el.style.bottom = "auto"; el.style.right = "auto"; el.style.translate = "none";
    el.dataset.pinned = "1";
  }

  // ---------- Portfolio rows: smart-animate hover + preview panel ----------
  const range = (a, b, pre = "375:") => Array.from({ length: b - a + 1 }, (_, i) => pre + (a + i));
  const ROWS = {
    "297:304": { n: "286:5218", t: "286:5217", ty: [27, 17], d: "297:315", dy: [70, 85.42],
      g: ["286:5235", "386:1533"], m: ["297:288", "297:289", "297:290", "373:394", "373:395", "369:2288", "373:399", "373:421", "369:2291", "369:2292", "373:391"] },
    "298:319": { n: "286:5219", t: "286:5237", ty: [27, 17], d: "286:5236", dy: [72.14, 85.94],
      g: ["286:5266", "386:1537"], m: ["286:5343", "286:5329", "298:305", ...range(393, 406)] },
    "298:345": { n: "286:5220", t: "286:5239", ty: [27, 17], d: "286:5238", dy: [72.14, 85.94],
      g: ["286:5249"], m: ["286:5355", "286:5363", "298:331", ...range(418, 431)] },
    "683:1767": { n: "683:1768", t: "683:1770", ty: [26.76, 16.54], d: "683:1769", dy: [71.5, 85.01],
      g: ["683:1771", "683:1814"],
      m: ["683:1775", "683:1776", "683:1777", "683:1821", "683:1822", "683:1823", "683:1818", "683:1819", "683:1820",
        "683:1815", "683:1816", "683:1817", "683:1787", "683:1788", "683:1789", "683:1790", "683:1791"],
      my: { "683:1790": -1.2, "683:1791": 0.38 } },
    "298:372": { n: "683:1882", t: "286:5241", ty: [26.76, 16.54], d: "286:5240", dy: [71.5, 85.01],
      g: ["286:5267", "286:5268", "386:1273", "386:1541"], m: ["286:5370", "286:5337", "298:357", ...range(443, 456)] },
    "298:397": { n: "683:1884", t: "286:5243", ty: [26.76, 16.54], tw: 372, d: "286:5242", dy: [71.66, 85.01],
      g: ["286:5269", "286:5270", "386:1267", "386:1430", "386:1505"], m: ["286:5375", "286:5348", "298:385", ...range(468, 481)] },
    "298:418": { n: "683:1886", t: "286:5245", ty: [23, 20], tlh: 38.73, d: "286:5244", dy: [102, 124.52],
      g: ["286:5271"], m: ["286:5381", "286:5462", "298:407", ...range(493, 506)] },
    "298:438": { n: "683:1888", t: "286:5273", ty: [23, 20], tw: 395, tlh: 38.73, d: "286:5272", dy: [102, 111.94],
      g: ["286:5282"], m: ["286:5468", "286:5458", "298:427", ...range(518, 531)] },
    "298:458": { n: "684:2392", t: "286:5275", ty: [19, 15], tlh: 50.42, d: "286:5274", dy: [72.14, 85.94],
      g: ["386:1298"], m: ["286:5471", "286:5465", "298:447", ...range(543, 547), "614:868", ...range(549, 556)] },
    "386:1324": { n: "408:484", t: "410:461", ty: [26.76, 17], regular: true, d: "410:463", dy: [71.66, 82.41],
      g: [...range(487, 490, "408:"), ...range(13276, 13279, "608:")], m: [...range(491, 495, "408:"), "614:866", ...range(497, 507, "408:")] },
  };

  const reel = $(".reel");
  let reelTimer = null, reelIdx = 0, hovering = 0;
  const slides = reel ? $$(".slide", reel) : [];
  const playIn = (el) => $$("video", el).forEach((v) => { v.muted = true; v.play().catch(() => {}); });
  const pauseIn = (el) => $$("video", el).forEach((v) => v.pause());
  function reelStep() {
    if (!slides.length || hovering) return;
    const prev = slides[reelIdx];
    reelIdx = (reelIdx + 1) % slides.length;
    slides[reelIdx].classList.add("on");
    playIn(slides[reelIdx]);
    prev.classList.remove("on");
    setTimeout(() => { if (!prev.classList.contains("on")) pauseIn(prev); }, 800);
  }
  if (slides.length) {
    playIn(slides[0]);
    if (!reduce) reelTimer = setInterval(reelStep, 3500);
  }

  $$(".row").forEach((row) => {
    const cfg = ROWS[row.dataset.row];
    if (!cfg) return;
    const q = (id) => byId(id, row);
    const items = [];
    const add = (el, fn) => { if (el) items.push([el, fn]); };
    add(q(cfg.n), (s) => { s.transform = "translate(-10px,-11px)"; s.fontSize = "38px"; s.letterSpacing = "11.78px"; s.width = "120px"; });
    add(q(cfg.t), (s) => {
      s.transform = `translateY(${cfg.ty[1] - cfg.ty[0]}px)`; s.fontSize = "38.73px"; s.letterSpacing = "12px";
      if (!cfg.regular) s.fontWeight = "700";
      s.width = (cfg.tw || 400) + "px";
      if (cfg.tlh) s.lineHeight = cfg.tlh + "px";
    });
    add(q(cfg.d), (s) => {
      s.transform = `translateY(${cfg.dy[1] - cfg.dy[0]}px)`; s.fontSize = "18px"; s.lineHeight = "1.2"; s.width = "395px";
    });
    cfg.g.forEach((id) => add(q(id), (s) => { s.opacity = "0"; }));
    const moved = cfg.m.map(q).filter(Boolean);
    moved.filter((el) => !moved.some((o) => o !== el && o.contains(el))).forEach((el) => {
      const raw = el.dataset.nodeId.split(";").pop();
      const dy = (cfg.my && cfg.my[raw]) || 0;
      add(el, (s) => { s.transform = `translate(173px,${dy}px)`; });
    });
    const saved = items.map(([el]) => [el, null]);
    const preview = $(`.pv[data-for="${row.dataset.row}"]`);
    const enter = () => {
      items.forEach(([el, fn], i) => {
        if (el.classList.contains("contents")) return;
        if (saved[i][1] === null) { pin(el); saved[i][1] = el.getAttribute("style") || ""; }
        fn(el.style);
      });
      hovering++;
      if (preview) { preview.classList.add("on"); playIn(preview); }
    };
    const leave = () => {
      saved.forEach(([el, s]) => { if (s !== null) el.setAttribute("style", s); });
      hovering = Math.max(0, hovering - 1);
      if (preview) { preview.classList.remove("on"); setTimeout(() => !preview.classList.contains("on") && pauseIn(preview), 600); }
    };
    row.addEventListener("mouseenter", enter);
    row.addEventListener("mouseleave", leave);
    row.addEventListener("focus", enter);
    row.addEventListener("blur", leave);
  });

  // ---------- Sound buttons: toggle mute on the video they sit on ----------
  const vids = $$("video.media");
  $$(".sound").forEach((btn) => {
    const x = $('[data-name="Mute X"]', btn);
    const target = () => {
      const r = btn.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let best = null, bd = Infinity;
      vids.forEach((v) => {
        const b = v.getBoundingClientRect();
        const dx = Math.max(b.left - cx, 0, cx - b.right), dy = Math.max(b.top - cy, 0, cy - b.bottom);
        const d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = v; }
      });
      return bd < 250 * 250 ? best : null;
    };
    if (!target()) btn.classList.add("no-video");
    btn.addEventListener("click", () => {
      const v = target();
      if (!v) return;
      v.muted = !v.muted;
      if (!v.muted) v.play().catch(() => {});
      if (x) x.style.opacity = v.muted ? "1" : "0";
    });
  });

  // ---------- Videos: play only while on screen ----------
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { v.play().catch(() => {}); } else if (!v.closest(".reel, .pv")) v.pause();
  }), { rootMargin: "200px 0px" });
  vids.forEach((v) => { v.muted = true; vio.observe(v); });

  // ---------- To Top ----------
  const frame = $(".frame");
  const toTop = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  let float = $(".totop-float");
  const end = $(".totop-end");
  if (!float && end && page !== "home-main2") {
    float = end.cloneNode(true);
    float.classList.remove("totop-end");
    float.classList.add("totop-float", "fx");
    float.removeAttribute("data-node-id");
    frame.appendChild(float);
  }
  if (float) {
    float.style.top = "auto";
    float.style.bottom = "26px";
    float.style.left = "calc(87.5% - 32.78px)";
  }
  $$(".totop").forEach((b) => b.addEventListener("click", toTop));
  // Section 1.1 marks where the floating button appears.
  const sec = $$("p", frame).find((p) => /^1\.1\b/.test(p.textContent.trim()));

  // ---------- Images fade in as they scroll into view ----------
  if (!reduce && page !== "entrance-main") {
    const targets = new Set();
    $$("img, video.media", frame).forEach((m) => {
      if (m.closest(".fx, .hdr, .row, .reel, .pv, .marquee, .totop, .neg-host, .sound")) return;
      const r = m.getBoundingClientRect();
      if (r.width / Z < 110 || r.height / Z < 90) return;
      let el = m;
      while (el.parentElement && el.parentElement !== frame) {
        const p = el.parentElement, c = p.classList;
        if (c.contains("contents") || p.dataset.name === "Strip") break;
        const pr = p.getBoundingClientRect();
        if (Math.abs(pr.width - r.width) > 4 || Math.abs(pr.height - r.height) > 4) break;
        el = p;
      }
      targets.add(el);
    });
    const rio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); }
    }), { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    targets.forEach((el) => {
      if (el.closest("[data-name='Work Scroll']")) return;
      el.classList.add("reveal");
      rio.observe(el);
    });
  }

  // ---------- Work with Me: the image strip scrolls continuously ----------
  const strip = $('[data-name="Strip"]');
  if (strip && !reduce) {
    const cycle = 2287.3;
    strip.animate([{ transform: "translateY(0)" }, { transform: `translateY(${-cycle}px)` }],
      { duration: (cycle / 30) * 1000, iterations: Infinity });
  }

  // ---------- Contact form (Formspree) ----------
  const form = $(".contact-form");
  if (form) {
    const fields = $$(".field", form);
    const placeholders = { name: "Name and Surname", email: "Email", message: "Message" };
    const phFor = (f) => $$("p", frame).find((p) => p.textContent.trim() === placeholders[f.name]);
    const status = $(".form-status", form);
    const update = () => {
      fields.forEach((f) => { const p = phFor(f); if (p) p.classList.toggle("hide-ph", f.value.length > 0 || document.activeElement === f); });
      form.classList.toggle("ready", fields.every((f) => f.value.trim()) && /\S+@\S+\.\S+/.test(form.email.value));
    };
    fields.forEach((f) => ["input", "focus", "blur"].forEach((ev) => f.addEventListener(ev, update)));
    const msgP = () => phFor(form.message);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.classList.contains("ready")) { fields.find((f) => !f.value.trim())?.focus(); return; }
      const span = $(".send span", form);
      span.textContent = "SENDING";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        span.textContent = "SENT · THANK YOU";
        form.classList.add("ready");
        setTimeout(() => { span.textContent = "SEND"; update(); }, 4000);
      } catch {
        span.textContent = "TRY AGAIN";
      }
      update();
      void msgP;
      void status;
    });
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) form.requestSubmit();
    });
  }

  // ---------- Entrance: the intro plays as you scroll ----------
  const entrance = $(".entrance");
  let entranceUpdate = null;
  if (entrance) entranceUpdate = setupEntrance(entrance);

  // ---------- Scroll handler ----------
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (entranceUpdate) entranceUpdate();
      if (float) {
        const vh = innerHeight;
        const started = sec ? sec.getBoundingClientRect().top < vh * 0.85 : scrollY > vh * 0.6;
        const er = end ? end.getBoundingClientRect() : null;
        const docked = er && er.top < vh - 10;
        float.classList.toggle("show", started);
        float.classList.toggle("docked", !!docked);
      }
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Entrance timeline (from the Figma motion keyframes, 13.9s, in % of the timeline) =====
  function setupEntrance(root) {
    const bez = (x1, y1, x2, y2) => {
      const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
      const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
      const sx = (t) => ((ax * t + bx) * t + cx) * t, sy = (t) => ((ay * t + by) * t + cy) * t;
      const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
      return (x) => {
        let t = x;
        for (let i = 0; i < 8; i++) { const e = sx(t) - x, d = dx(t); if (Math.abs(e) < 1e-5 || !d) break; t -= e / d; }
        t = Math.min(1, Math.max(0, t));
        return sy(t);
      };
    };
    const A = bez(0.22, 1, 0.36, 1), B = bez(0.65, 0, 0.35, 1), V1 = bez(0.45, 0, 0.4, 1);
    const EIN = bez(0.42, 0, 1, 1), EOUT = bez(0, 0, 0.58, 1), L = (x) => x;
    // track: [[pct, value, easeIntoThisKey], ...]; held flat between keys.
    const at = (track, p) => {
      if (p <= track[0][0]) return track[0][1];
      for (let i = 1; i < track.length; i++) {
        const [p1, v1, e] = track[i];
        if (p <= p1) {
          const [p0, v0] = track[i - 1];
          const k = p1 === p0 ? 1 : (p - p0) / (p1 - p0);
          return v0 + (v1 - v0) * (e || L)(k);
        }
      }
      return track[track.length - 1][1];
    };
    const inOut = (a, b, from, to, ease = A) => [[0, from], [a, from], [b, to, ease]];
    const word = (inA, inB, pa, pb, pc, pd) => ({
      o: inOut(inA, inB, 0, 1),
      x: [[0, -28], [inA, -28], [inB, 0, A], [pa, 0], [pb, 52.8, B], [pc, 52.8], [pd, 0, B]],
      s: [[0, 1], [pa, 1], [pb, 1.3, B], [pc, 1.3], [pd, 1, B]],
    });
    const dot = (a, b, c) => ({ o: inOut(a, b, 0, 1), s: [[0, 0.3], [a, 0.3], [c, 1, A]] });
    const T = {
      "338:374": { y: [[0, 0], [20.863, 0], [33.094, -400, B], [39.568, -400], [51.079, -880, B], [92.086, -880], [99.281, -960, B]] },
      "331:1373": { o: [[0, 0], [34.173, 0], [39.209, 1, A], [56.475, 1], [60.072, 0, B]], x: [[0, -28], [34.173, -28], [39.209, 0, A], [56.475, 0], [60.072, -16, B]] },
      "331:1374": { o: [[0, 0], [25.899, 0], [30.935, 1, A], [56.475, 1], [60.072, 0, B]], x: [[0, -28], [25.899, -28], [30.935, 0, A], [56.475, 0], [60.072, -16, B]] },
      "331:1375": word(44.604, 49.64, 60.072, 62.95, 64.388, 66.906),
      "331:1376": word(46.763, 51.799, 67.986, 70.863, 72.302, 74.82),
      "331:1385": word(48.921, 53.957, 75.899, 78.777, 80.216, 82.734),
      "331:1387": word(51.079, 56.115, 83.813, 86.691, 88.129, 90.647),
      "331:1377": { trim: [[0, 0], [22.302, 0], [34.173, 0.353, V1], [39.568, 0.353], [44.604, 0.557, EIN], [46.763, 0.643], [48.921, 0.733], [51.079, 0.814, EOUT], [90.647, 0.814], [93.525, 1, B]] },
      "338:376": { o: inOut(14.388, 20.144, 0, 1), y: inOut(14.388, 20.144, 20, 0) },
      "338:378": { o: inOut(14.388, 20.144, 0, 1), y: inOut(14.388, 20.144, 20, 0) },
      "338:380": { o: inOut(7.194, 12.95, 0, 1), y: inOut(7.194, 12.95, 20, 0) },
      "338:393": { o: inOut(93.525, 97.122, 0, 1), x: inOut(93.525, 97.122, -20, 0) },
      "331:1383": { o: inOut(21.583, 23.381, 0, 1), s: [[0, 0.3], [21.583, 0.3], [24.101, 1, A]] },
      "331:1384": dot(46.763, 48.561, 49.281),
      "331:1386": dot(48.921, 50.719, 51.439),
      "331:1388": dot(51.079, 52.878, 53.597),
      "331:1389": dot(44.604, 46.403, 47.122),
      "331:1390": { o: [[0, 0], [34.173, 0], [35.971, 1, A], [56.475, 1], [60.072, 0, B]], s: [[0, 0.3], [34.173, 0.3], [36.691, 1, A]] },
      "331:1391": dot(93.525, 95.324, 96.043),
      "331:1398": { o: [[0, 0], [6.475, 1, A]] },
      "331:1393": {
        o: [[0, 0], [44.604, 0], [50.36, 0.35, A], [75.899, 0.35], [79.496, 1, B], [83.813, 1], [87.41, 0.35, B]],
        y: [[0, 0], [67.986, 0], [71.583, -122.558, B], [75.899, -122.558], [79.496, -302.188, B], [83.813, -302.188], [87.41, -473.946, B]],
        x: [[0, 0], [75.899, 0], [79.496, -35, B], [83.813, -35], [87.41, 0, B]],
        s: [[0, 1], [75.899, 1], [79.496, 1.769, B], [83.813, 1.769], [87.41, 1, B]] },
      "331:1394": {
        o: [[0, 0], [44.604, 0], [50.36, 0.35, A], [67.986, 0.35], [69.784, 0, B], [69.928, 0], [71.583, 0.35, B], [83.813, 0.35], [87.41, 1, B]],
        y: [[0, 0], [67.986, 0], [69.784, -30, B], [69.928, 601.819], [71.583, 571.819, B], [75.899, 571.819], [79.496, 438.842, B], [83.813, 438.842], [87.41, 268.738, B]],
        x: [[0, 0], [83.813, 0], [87.41, -35, B]],
        s: [[0, 1], [83.813, 1], [87.41, 1.769, B]] },
      "331:1395": {
        o: [[0, 0], [44.604, 0], [50.36, 0.35, A], [75.899, 0.35], [77.698, 0, B], [77.842, 0], [79.496, 0.35, B]],
        y: [[0, 0], [67.986, 0], [71.583, -132.942, B], [75.899, -132.942], [77.698, -162.942, B], [77.842, 468.842], [79.496, 438.842, B], [83.813, 438.842], [87.41, 317.046, B]] },
      "331:1396": {
        o: [[0, 0], [44.604, 0], [50.36, 1, A], [67.986, 1], [71.583, 0.35, B], [83.813, 0.35], [85.612, 0, B], [85.755, 0], [87.41, 0.35, B]],
        x: [[0, -35], [67.986, -35], [71.583, 0, B]],
        s: [[0, 1.769], [67.986, 1.769], [71.583, 1, B]],
        y: [[0, 0], [67.986, 0], [71.583, -179.481, B], [75.899, -179.481], [79.496, -302.304, B], [83.813, -302.304], [85.612, -332.304, B], [85.755, 300.508], [87.41, 270.508, B]] },
      "331:1397": {
        o: [[0, 0], [44.604, 0], [50.36, 0.35, A], [67.986, 0.35], [71.583, 1, B], [75.899, 1], [79.496, 0.35, B]],
        x: [[0, 0], [67.986, 0], [71.583, -35, B], [75.899, -35], [79.496, 0, B]],
        s: [[0, 1], [67.986, 1], [71.583, 1.769, B], [75.899, 1.769], [79.496, 1, B]],
        y: [[0, 0], [67.986, 0], [71.583, -174.288, B], [75.899, -174.288], [79.496, -348.842, B], [83.813, -348.842], [87.41, -473.946, B]] },
    };
    const els = Object.entries(T).map(([id, tr]) => [root.querySelector(`[data-node-id="${id}"]`), tr]).filter(([el]) => el);
    // "contents" groups have no box of their own; animate their children instead.
    const targets = (el) => (el.classList.contains("contents") ? Array.from(el.children) : [el]);
    els.forEach(([el]) => targets(el).forEach((t) => (t.style.willChange = "transform, opacity")));
    const scrolly = $("#scrolly");
    const START = 6.475; // the logos are already in when the page opens
    const hint = document.createElement("div");
    hint.className = "scroll-hint";
    hint.textContent = "SCROLL";
    body.appendChild(hint);
    const size = () => { scrolly.style.height = `${innerHeight * 7}px`; };
    size();
    addEventListener("resize", size);
    let last = -1;
    return () => {
      const max = scrolly.offsetHeight - innerHeight;
      const prog = Math.min(1, Math.max(0, scrollY / max));
      const p = reduce ? 100 : START + prog * (100 - START);
      hint.classList.toggle("gone", prog > 0.02);
      if (p === last) return;
      last = p;
      for (const [el, tr] of els) {
        const o = tr.o ? at(tr.o, p) : null;
        const x = tr.x ? at(tr.x, p) : 0, y = tr.y ? at(tr.y, p) : 0, s = tr.s ? at(tr.s, p) : 1;
        for (const t of targets(el)) {
          if (o !== null) t.style.opacity = o.toFixed(3);
          if (tr.x || tr.y || tr.s) t.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${s.toFixed(4)})`;
          if (tr.trim) {
            // The line's own box is 0px wide, so clip the drawn stroke inside it.
            const v = at(tr.trim, p), line = t.firstElementChild || t;
            t.style.visibility = p < 22.302 ? "hidden" : "visible";
            line.style.clipPath = `inset(0 0 ${((1 - v) * 100).toFixed(2)}% 0)`;
          }
        }
        if (o !== null) el.style.pointerEvents = o < 0.5 ? "none" : "";
      }
    };
  }
})();
