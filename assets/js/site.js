// Noa Jablon portfolio: runtime behaviour for the static Figma-built pages.
(() => {
  const doc = document.documentElement;
  const body = document.body;
  const page = body.dataset.page;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = (id, r = document) => r.querySelector(`[data-node-id="${id}"], [data-node-id$=";${id}"]`);

  // ---------- Top bar: NOA JABLON first, then the Figma words, drifting slowly ----------
  $$(".marquee [data-name='Track']").forEach((track) => {
    const seqs = $$("[data-name='Sequence']", track);
    if (!seqs.length) return;
    const first = $("p", seqs[0]);
    const words = ["NOA JABLON", ...$$("p", seqs[0]).map((p) => p.textContent.trim()).filter((t) => t && t !== "NOA JABLON")];
    const c = first && getComputedStyle(first);
    const font = c ? `font-family:${c.fontFamily};font-weight:${c.fontWeight};letter-spacing:${c.letterSpacing}` : ""; // read before the p is removed
    seqs.forEach((seq) => {
      seq.textContent = "";
      seq.className = "mq-seq";
      words.forEach((w) => {
        const t = document.createElement("span");
        t.className = "mq-w";
        t.textContent = w;
        t.style.cssText = font;
        const dot = document.createElement("i");
        dot.className = "mq-dot";
        seq.append(t, dot);
      });
    });
    const sync = () => track.style.setProperty("--mq-w", seqs[0].offsetWidth);
    sync();
    if (document.fonts) document.fonts.ready.then(sync);
  });

  // ---------- Scale the 1480px design to the window ----------
  let Z = 1;
  // Phones (and narrow windows) get a one-column layout instead of the scaled 1480px design; decided once per load.
  const MOB = innerWidth < 700;
  const setZoom = () => {
    Z = Math.max(doc.clientWidth, 320) / 1480;
    if (doc.classList.contains("mob")) {
      doc.style.setProperty("--z", (Z = 1)); doc.classList.remove("fit-one");
      const st = $(".stage"); if (st) st.style.height = "";
      return;
    }
    // About / Work With Me: always the same width and position as the Portfolio page (the same scale), so moving
    // between pages nothing shifts. One screen, never scrolled, when the window is tall enough; otherwise it scrolls.
    const fit = +doc.dataset.fit, stage = fit && $(".stage");
    if (stage) {
      const H = Math.max(innerHeight / Z, fit);
      stage.style.height = H + "px";
      // On a taller window the closing rule and the picture column grow with it, up to Noa's Figma 790.
      doc.style.setProperty("--fe", Math.min(H - 3, 790) + "px");
      doc.classList.toggle("fit-one", innerHeight / Z >= fit);
    }
    doc.style.setProperty("--z", Z);
  };
  setZoom();
  addEventListener("resize", () => { if (MOB !== innerWidth < 700) return location.reload(); setZoom(); onScroll(); });

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
    setTimeout(() => { location.href = url.href; }, MOB ? 220 : 800);
  });
  // Phones: the next page starts downloading as soon as a finger touches its link (and Chrome may fetch it a little earlier),
  // so moving between pages is quick.
  if (MOB) {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
      const sr = document.createElement("script"); sr.type = "speculationrules";
      sr.textContent = JSON.stringify({ prefetch: [{ source: "document", where: { href_matches: "/*" }, eagerness: "moderate" }] });
      document.head.appendChild(sr);
    }
    const got = new Set();
    document.addEventListener("touchstart", (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || got.has(url.pathname)) return;
      got.add(url.pathname);
      const l = document.createElement("link"); l.rel = "prefetch"; l.href = url.pathname; document.head.appendChild(l);
    }, { passive: true });
  }

  let introIcons = [];
  // ---------- Header: hover shows that page's title, icon grows in place ----------
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
    // Each title spans the bar like PORTFOLIO does on the Portfolio page: its last letter ends inside the 1390 rule.
    const shownSpacing = { L: "137.6px", M: "158.7px", R: "96.6px" };
    const saved = new Map();
    for (const k of ["L", "M", "R"]) if (titles[k]) titles[k].style.letterSpacing = shownSpacing[k];
    [...Object.values(icons), ...Object.values(titles)].forEach((el) => el && saved.set(el, el.getAttribute("style") || ""));
    Object.values(titles).forEach((ti) => ti && (ti.dataset.txt = ti.textContent));
    // Letters dissolve in: each one blurs and fades into place, passing through a random letter or two on the way.
    const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let timers = [];
    const stopScramble = () => { timers.forEach(clearTimeout); timers = []; };
    const scramble = (ti) => {
      const txt = ti.dataset.txt;
      ti.textContent = "";
      const spans = [...txt].map((ch) => {
        const s = document.createElement("span");
        s.textContent = ch;
        s.style.cssText = "display:inline-block;white-space:pre;opacity:0;filter:blur(6px);transition:opacity .55s ease-out,filter .55s ease-out";
        ti.appendChild(s);
        return s;
      });
      spans.forEach((s) => (s.style.width = s.getBoundingClientRect().width / Z + "px")); // random letters never shift the word
      spans.forEach((s, i) => {
        const ch = txt[i];
        if (ch === " " || reduce) { s.style.opacity = "1"; s.style.filter = "none"; return; }
        const start = Math.random() * 280, swaps = 1 + ((Math.random() * 2) | 0);
        timers.push(setTimeout(() => {
          s.textContent = ABC[(Math.random() * 26) | 0];
          s.style.opacity = ".55"; s.style.filter = "blur(3px)";
        }, start));
        for (let n = 1; n <= swaps; n++) {
          const last = n === swaps;
          timers.push(setTimeout(() => {
            s.textContent = last ? ch : ABC[(Math.random() * 26) | 0];
            if (last) { s.style.opacity = "1"; s.style.filter = "blur(0)"; }
          }, start + n * 110));
        }
      });
    };
    let current = null;
    const restore = () => {
      stopScramble();
      Object.values(titles).forEach((ti) => ti && (ti.textContent = ti.dataset.txt));
      saved.forEach((s, el) => el.setAttribute("style", s));
      // The page's own title comes back the same way.
      const own = Object.values(titles).find((ti) => ti && ti !== current && getComputedStyle(ti).opacity !== "0");
      current = null;
      if (own) scramble(own);
    };
    const show = (k) => {
      stopScramble();
      for (const key of ["L", "M", "R"]) {
        const ic = icons[key], ti = titles[key];
        if (ic) { ic.style.opacity = key === k ? "1" : "0.25"; ic.style.transform = key === k ? "scale(1.15)" : ""; }
        if (ti) {
          ti.textContent = ti.dataset.txt;
          ti.style.opacity = key === k ? "1" : "0";
          if (key === k) {
            ti.style.transition = "none";
            ti.style.letterSpacing = shownSpacing[key];
            ti.style.transform = "none";
            void ti.offsetWidth;
            ti.style.transition = "";
            current = ti;
            scramble(ti);
          }
        }
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
    // Entrance (index.html, or any page with ?intro): the three icons appear in the middle of an empty page,
    // then glide up into their places in the bar while the page fades in under them.
    introIcons = ["L", "M", "R"].map((k) => icons[k]).filter(Boolean); // played once the text effect below is set up
  }

  // ---------- Fit text: the web font runs a little wider than Gilroy ----------
  // Single-line labels shrink to their Figma width; paragraphs shrink (a little) to their Figma height.
  function fitText() {
    $$(".frame p").forEach((p) => {
      if (p.closest(".row")) return;
      const cs = getComputedStyle(p);
      if (cs.display === "none" || p.dataset.fitBase === undefined && !(p.dataset.fitBase = cs.fontSize)) return;
      const base = parseFloat(p.dataset.fitBase);
      p.style.fontSize = "";
      const single = cs.whiteSpace === "nowrap";
      const hasH = /(^| )h-\[/.test(p.className);
      for (let k = 1, i = 0; i < 14; i++) {
        const over = single ? p.scrollWidth > p.clientWidth + 1 && p.clientWidth > 0
          : hasH && p.scrollHeight > p.clientHeight + 2 && p.clientHeight > 0;
        if (!over || k <= (single ? 0.75 : 0.86)) break;
        k -= 0.02;
        p.style.fontSize = (base * k).toFixed(2) + "px";
      }
    });
  }
  // Multi-paragraph text boxes: shrink size and line height together until they fit the Figma box.
  function fitBlocks() {
    $$(".frame div").forEach((box) => {
      if (!/(^| )h-\[/.test(box.className) || !box.querySelector(":scope > p") || box.closest(".row")) return;
      const ps = $$(":scope > p", box);
      ps.forEach((p) => { if (!p.dataset.fs) { const c = getComputedStyle(p); p.dataset.fs = c.fontSize; p.dataset.lh = c.lineHeight; } p.style.fontSize = p.style.lineHeight = ""; });
      for (let k = 1, i = 0; i < 10 && box.scrollHeight > box.clientHeight + 2 && k > 0.9; i++) {
        k -= 0.02;
        ps.forEach((p) => {
          p.style.fontSize = (parseFloat(p.dataset.fs) * k).toFixed(2) + "px";
          if (p.dataset.lh !== "normal") p.style.lineHeight = (parseFloat(p.dataset.lh) * k).toFixed(2) + "px";
        });
      }
    });
  }
  const fitAll = () => { fitText(); fitBlocks(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll); else addEventListener("load", fitAll);

  // ---------- Pin an absolutely positioned element to explicit top/left ----------
  function pin(el) {
    if (el.dataset.pinned) return;
    if (getComputedStyle(el).position !== "absolute") { el.dataset.pinned = "1"; return; }
    // offset* are in the page's own (unzoomed) pixels in every browser, unlike computed top/left under CSS zoom.
    const cl = el.classList;
    let top = el.offsetTop, left = el.offsetLeft;
    if (cl.contains("translate-y-full")) top += el.offsetHeight;
    if (cl.contains("translate-x-full")) left += el.offsetWidth;
    if (cl.contains("-translate-y-1/2")) top -= el.offsetHeight / 2;
    if (cl.contains("-translate-x-1/2")) left -= el.offsetWidth / 2;
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
    "298:458": { n: "408:484", t: "286:5275", ty: [19, 15], tlh: 50.42, d: "286:5274", dy: [72.14, 85.94],
      g: ["386:1298"], m: ["286:5471", "286:5465", "298:447", ...range(543, 547), "614:868", ...range(549, 556)] },
    "386:1324": { n: "408:484", t: "408:486", ty: [26.76, 17], regular: true, d: "408:485", dy: [71.66, 82.41],
      g: [...range(487, 490, "408:"), ...range(13276, 13279, "608:")], m: [...range(491, 495, "408:"), "614:866", ...range(497, 507, "408:")] },
  };

  // Every enlarged description uses the same size.
  const HFS = 15;
  // Hover-state corrections so every enlarged title sits the same distance above its description.
  const HX = { "298:418": 43, "298:438": -10, "683:1767": 5, "298:372": 2, "298:397": 2, "298:458": 3, "297:304": -1 };
  // Every row keeps the same gap between its title and description, and the description stays inside the row.
  const textBox = (el) => {
    const rs = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n; (n = walk.nextNode());) {
      if (!n.textContent.replace(/[\s\u200b]/g, "")) continue; // skip empty lines
      const rg = document.createRange(); rg.selectNodeContents(n);
      rs.push(...[...rg.getClientRects()].filter((r) => r.height > 0));
    }
    return rs.length ? { top: Math.min(...rs.map((r) => r.top)), bottom: Math.max(...rs.map((r) => r.bottom)), right: Math.max(...rs.map((r) => r.right)) } : null;
  };
  function spaceRows() {
    $$(".row").forEach((row) => {
      const cfg = ROWS[row.dataset.row];
      const t = cfg && byId(cfg.t, row), d = cfg && byId(cfg.d, row);
      if (!t || !d || d.dataset.spaced) return;
      const tb = textBox(t), db = textBox(d);
      if (!tb || !db) return;
      pin(d);
      row.classList.add("measuring"); // measure the new layout now, not mid-transition
      cfg.shift = (tb.bottom + 21 * Z - db.top) / Z;
      d.style.top = parseFloat(d.style.top) + cfg.shift + "px";
      d.style.height = "auto";
      if (d.offsetWidth > 245) d.style.width = "241px"; // keep clear of the Field column
      if (row.dataset.row === "298:438") d.style.fontSize = "12.5px"; // Voices runs long
      const limit = row.getBoundingClientRect().bottom - 8 * Z;
      let fs = parseFloat(getComputedStyle(d).fontSize);
      while (textBox(d).bottom > limit && fs > 11) { fs -= 0.5; d.style.fontSize = fs + "px"; }
      // Field values (e.g. "Typography") stay inside their column.
      const colRight = row.getBoundingClientRect().left + 466 * Z;
      $$("p", row).forEach((p) => {
        if (!/text-\[15px\]/.test(p.className)) return;
        let f = 15;
        while (textBox(p) && textBox(p).right > colRight && f > 11) { f -= 0.5; p.style.fontSize = f + "px"; }
      });
      d.dataset.spaced = "1";
      requestAnimationFrame(() => requestAnimationFrame(() => row.classList.remove("measuring")));
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(spaceRows)); else addEventListener("load", spaceRows);

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
    if (!reduce) reelTimer = setInterval(reelStep, 2400);
  }

  $$(".row").forEach((row) => {
    const cfg = ROWS[row.dataset.row];
    if (!cfg) return;
    const q = (id) => byId(id, row);
    const items = [];
    const add = (el, fn, fixPos = false) => { if (el) items.push([el, fn, fixPos]); };
    add(q(cfg.n), (s) => { s.transform = "translate(-10px,-11px)"; s.fontSize = "38px"; s.letterSpacing = "11.78px"; s.width = "120px"; }, true);
    add(q(cfg.t), (s) => {
      s.transform = `translateY(${cfg.ty[1] - cfg.ty[0]}px)`; s.fontSize = "38.73px"; s.letterSpacing = "12px";
      if (!cfg.regular) s.fontWeight = "700";
      s.width = (cfg.tw || 400) + "px";
      if (cfg.tlh) s.lineHeight = cfg.tlh + "px";
    }, true);
    add(q(cfg.d), (s) => {
      s.transform = `translateY(${cfg.dy[1] - cfg.dy[0] - (cfg.shift || 0) - (HX[row.dataset.row] || 0)}px)`; s.fontSize = HFS + "px"; s.lineHeight = "1.2"; s.width = "395px";
    }, true);
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
      items.forEach(([el, fn, fixPos], i) => {
        if (el.classList.contains("contents")) return;
        if (saved[i][1] === null) { if (fixPos) pin(el); saved[i][1] = el.getAttribute("style") || ""; }
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
      if (btn.dataset.for) return $(`[data-node-id="${btn.dataset.for}"] video`);
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
      btn.classList.toggle("on", !v.muted);
      btn.setAttribute("aria-label", v.muted ? "Sound on" : "Sound off");
    });
  });

  // ---------- Image galleries: arrows step through the slides ----------
  $$(".gal").forEach((g) => {
    const slides = $$(".gal-slide", g), prev = $(".gal-prev", g), next = $(".gal-next", g);
    let i = 0;
    const show = (n) => {
      i = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach((s, k) => s.classList.toggle("on", k === i));
      prev.hidden = i === 0;
      next.hidden = i === slides.length - 1;
    };
    slides.forEach((s) => { s.loading = "eager"; });
    prev.addEventListener("click", () => show(i - 1));
    next.addEventListener("click", () => show(i + 1));
    show(0);
  });

  // ---------- Videos: play only while on screen ----------
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { v.play().catch(() => {}); } else if (!v.closest(".reel, .pv")) v.pause();
  }), { rootMargin: "200px 0px" });
  // ---------- Artwork pages: the top bar hides while you scroll down, and returns when you scroll up ----------
  if (body.matches(".art-page, .page-art")) {
    let lastY = scrollY;
    addEventListener("scroll", () => {
      const y = scrollY, d = y - lastY;
      if (Math.abs(d) < 4) return;
      body.classList.toggle("bar-away", d > 0 && y > 60);
      lastY = y;
    }, { passive: true });
  }

  // ---------- Text dissolves in on every page, as on the Portfolio page ----------
  // Each piece of text waits until it scrolls into view, then its letters blur in through a random letter or two
  // (longer text word by word), top to bottom. The Portfolio rows' titles and text have their own copy of this.
  const DZ_ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dzSplit = (el, out, words) => {
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 1) { if (!n.matches("svg, .dz, .dz-w")) dzSplit(n, out, words); return; }
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      const f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(w)); return; }
        if (words) { const s = document.createElement("span"); s.className = "dz dz-hide"; s.textContent = w; s.dataset.c = w; f.appendChild(s); out.push(s); return; }
        const word = document.createElement("span"); word.className = "dz-w";
        [...w].forEach((ch) => { const s = document.createElement("span"); s.className = "dz dz-hide"; s.textContent = ch; s.dataset.c = ch; word.appendChild(s); out.push(s); });
        f.appendChild(word);
      });
      n.parentNode.replaceChild(f, n);
    });
  };
  const dzCue = [];
  let dzRaf = 0;
  const dzTick = (now) => {
    dzRaf = 0;
    for (let i = dzCue.length - 1; i >= 0; i--) {
      const c = dzCue[i];
      if (now < c.start) continue;
      const st = now < c.end ? 1 + Math.floor((now - c.start) / 110) : -1;
      if (c.s._st !== st) {
        c.s._st = st;
        if (st === -1) { c.s.textContent = c.s.dataset.c; c.s.className = "dz"; }
        else { c.s.textContent = c.swap ? DZ_ABC[(Math.random() * 26) | 0] : c.s.dataset.c; c.s.className = "dz dz-mid"; }
      }
      if (st === -1 && now > c.end + 700) { c.s.className = "dz dz-done"; dzCue.splice(i, 1); }
    }
    if (dzCue.length) dzRaf = requestAnimationFrame(dzTick);
  };
  // Plays the letters (spans from dzSplit) of a group of elements that came into view together.
  const dzPlay = (items, delay = 250) => {
    const now = performance.now();
    items.sort((a, b) => a.y - b.y);
    const y0 = items.length ? items[0].y : 0;
    items.forEach((it) => {
      it.ls.forEach((s) => { if (s.dataset.c.length === 1) s.style.width = s.getBoundingClientRect().width / (it.z || Z) + "px"; }); // swaps never shift the line
      const base = now + delay + Math.min(900, (it.y - y0) / Z * 0.9);
      it.ls.forEach((s, n) => {
        const start = base + Math.random() * 380 + Math.min(n, 120) * 2, swap = /^[A-Za-z]$/.test(s.dataset.c);
        dzCue.push({ s, start, end: start + (swap ? 110 * (1 + ((Math.random() * 2) | 0)) : 0), swap });
      });
    });
    if (!dzRaf) dzRaf = requestAnimationFrame(dzTick);
  };

  // ---------- Phones: the page re-flows into one column ----------
  // The desktop pages are absolute layouts from Figma. On a phone we measure that layout once, then move its content
  // into a column in reading order: rows of the design top to bottom, and inside a row each column left to right.
  if (MOB) {
    const frame = $(".frame");
    const mh = document.createElement("header"); mh.className = "mh";
    const mq = $(".marquee"); if (mq) mh.appendChild(mq);
    if (hdr) {
      const nav = document.createElement("nav"); nav.className = "mh-nav";
      const ttl = $$("p", hdr).find((p) => getComputedStyle(p).opacity !== "0" && getComputedStyle(p).display !== "none");
      const word = $(".sc-word");
      introIcons = [];
      [["Hit L", '[data-name="Untitled-3 1"]'], ["Hit M", '[data-name="shape 2 2"]'], ["Hit R", '[data-name^="ChatGPT"]']].forEach(([h, ic]) => {
        const hit = $(`[data-name="${h}"]`, hdr), icon = $(ic, hdr);
        const a = document.createElement("a"); a.href = (hit && hit.getAttribute("href")) || "portfolio.html";
        a.setAttribute("aria-label", hit ? hit.getAttribute("aria-label") || h : h);
        if (icon) { const c = icon.cloneNode(true); c.removeAttribute("class"); c.style.cssText = `opacity:${getComputedStyle(icon).opacity}`; c.className = "mh-ic"; a.appendChild(c); introIcons.push(c); }
        nav.appendChild(a);
      });
      mh.appendChild(nav);
      const t = document.createElement("div"); t.className = "mh-title";
      const txt = (word ? word.textContent : ttl ? ttl.dataset.txt || ttl.textContent : "").replace(/\s+/g, "");
      [...txt].forEach((ch) => { const sp = document.createElement("span"); sp.textContent = ch; t.appendChild(sp); });
      mh.appendChild(t);
    }
    const flow = $(".sc-track") || $(".frame > .ph") ? null : document.createElement("main");
    if (frame && flow) {
      flow.className = "mf";
      const blocks = [], stageR = $(".stage").getBoundingClientRect();
      const stageB = +doc.dataset.fit ? +doc.dataset.fit + 30 : (stageR.bottom + scrollY) / Z; // one-screen pages end at their rule
      const skip = (el) => el.matches(".hdr, .marquee, .ar-mask, .ar-btn, .hl, .vl, .j, .fit-end, .fit-j, .bar-1390, .bar-1390-j, script, style") ||
        el.dataset.name === "Joints";
      const walk = (box) => [...box.children].forEach((el) => {
        if (skip(el)) return;
        const cs = getComputedStyle(el);
        if (cs.display === "contents" || el.matches(".ar")) return walk(el);
        if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity < 0.05) return;
        const r = el.getBoundingClientRect(), w = r.width / Z, h = r.height / Z;
        const media = el.querySelector("img, video") || el.matches("img, video");
        const text = el.textContent.trim();
        const hit = el.matches("a") && !text && !media;
        if (!hit && (w < 4 || h < 4 || (w < 12 && h < 12) || (!media && !text))) return;
        if ((r.top + scrollY) / Z >= stageB - 2 || r.left / Z >= 1478 || r.right <= 0) return; // parked off the page in Figma
        if (r.bottom / Z < 175 && !el.matches(".ar-end")) return; // the old header strip
        const y = el.matches(".ar-end") ? 1e6 : (r.top + scrollY) / Z; // the closing links always come last
        blocks.push({ el, x: r.left / Z, y, w, h, media: !!media && !text, hit });
      });
      walk(frame);
      // Empty link areas lie on top of the thing they open: hand each to the block it covers most.
      const hits = blocks.filter((b) => b.hit), rest = blocks.filter((b) => !b.hit);
      const ov = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
      hits.forEach((hb) => { const t = rest.reduce((m, b) => (ov(hb, b) > (m ? ov(hb, m) : 0) ? b : m), null); if (t) (t.hits = t.hits || []).push(hb.el); });
      // A picture with things laid on top of it (labels, a phone, buttons) stays one composition, scaled to the phone.
      const inside = (b, m) => b.x >= m.x - 2 && b.y >= m.y - 2 && b.x + b.w <= m.x + m.w + 2 && b.y + b.h <= m.y + m.h + 2;
      const hosts = rest.filter((m) => m.media && m.w > 300).sort((a, b) => b.w * b.h - a.w * a.h);
      const put = (el, x, y, w, h) => {
        ["translate", "transform", "right", "bottom", "inset"].forEach((k) => el.style.removeProperty(k));
        [["left", x], ["top", y], ["width", w], ["height", h]].forEach(([k, v]) => el.style.setProperty(k, v + "px", "important"));
        el.style.setProperty("translate", "none", "important"); el.style.setProperty("transform", "none", "important");
        el.style.setProperty("position", "absolute", "important"); el.style.setProperty("margin", "0", "important");
      };
      hosts.forEach((m) => {
        if (m.gone) return;
        const guests = rest.filter((b) => b !== m && !b.gone && !b.el.matches(".ar-num") && inside(b, m));
        if (!guests.length) return;
        const wrap = document.createElement("div"), inner = document.createElement("div");
        wrap.className = "mf-grp"; wrap.style.aspectRatio = `${m.w} / ${m.h}`;
        inner.className = "mf-grp-in"; inner.style.cssText = `width:${m.w}px;height:${m.h}px;zoom:${innerWidth / m.w}`;
        [m, ...guests].forEach((b) => { put(b.el, b.x - m.x, b.y - m.y, b.w, b.h); inner.appendChild(b.el); b.gone = true; (b.hits || []).forEach((a) => b.el.appendChild(a)); });
        wrap.appendChild(inner);
        rest.push({ el: wrap, x: m.x, y: m.y, w: m.w, h: m.h, group: true });
      });
      for (let i = rest.length - 1; i >= 0; i--) if (rest[i].gone) rest.splice(i, 1);
      // The title area (above the first numbered section) keeps its side margins; pictures below run edge to edge.
      const firstNum = Math.min(...rest.filter((b) => /^\d+\s*\.\s*\d+$/.test(b.el.textContent.trim())).map((b) => b.y), 1e6);
      rest.forEach((b) => { if (b.y < firstNum - 4) b.intro = true; });
      // Rows: blocks whose heights overlap belong together. Columns inside a row: blocks whose widths overlap.
      rest.sort((a, b) => a.y - b.y);
      const rows = [];
      rest.forEach((b) => {
        const row = rows[rows.length - 1];
        if (row && b.y < row.bottom - 8) { row.items.push(b); row.bottom = Math.max(row.bottom, b.y + b.h); }
        else rows.push({ items: [b], bottom: b.y + b.h });
      });
      rows.forEach((row) => {
        const cols = [];
        row.items.forEach((b) => {
          const hitCols = cols.filter((c) => b.x < c.r - 4 && b.x + b.w > c.l + 4);
          const c = { l: b.x, r: b.x + b.w, items: [b] };
          hitCols.forEach((h) => { c.l = Math.min(c.l, h.l); c.r = Math.max(c.r, h.r); c.items.push(...h.items); cols.splice(cols.indexOf(h), 1); });
          cols.push(c);
        });
        cols.sort((a, b) => a.l - b.l);
        const sec = document.createElement("section"); sec.className = "mf-row";
        cols.forEach((c) => c.items.sort((a, b) => a.y - b.y || a.x - b.x).forEach((b) => {
          const el = b.el;
          if (b.intro) el.classList.add("mf-in");
          if (b.group) return sec.appendChild(el);
          el.classList.add("mf-b", b.w > 300 ? "mf-wide" : "mf-small");
          ["translate", "transform", "scale", "top", "left"].forEach((k) => el.style.setProperty(k, k === "top" || k === "left" ? "auto" : "none", "important"));
          if (b.media) { el.classList.add("mf-media"); el.style.aspectRatio = `${b.w} / ${b.h}`; if (b.w <= 300) el.style.width = b.w + "px"; }
          else if (b.w <= 300 && !el.matches(".ar-end, .ar-facts, .ar-notes")) el.style.maxWidth = "100%";
          // Big display type comes down to phone size.
          $$("*", el).concat(el).forEach((t) => {
            if (!t.childNodes.length || ![...t.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
            const fs = parseFloat(getComputedStyle(t).fontSize);
            if (fs > 26) { const k = Math.max(26, fs * 0.55) / fs; t.style.setProperty("font-size", fs * k + "px", "important"); t.style.setProperty("line-height", "1.1", "important");
              const ls = parseFloat(getComputedStyle(t).letterSpacing); if (ls) t.style.setProperty("letter-spacing", ls * k + "px", "important"); }
          });
          (b.hits || []).forEach((a) => { a.classList.add("mf-hit"); el.appendChild(a); });
          sec.appendChild(el);
        }));
        flow.appendChild(sec);
      });
    }
    doc.classList.add("mob");
    setZoom();
    // Portfolio rows all show at once on a phone: each film plays while it is on screen.
    const vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (e.isIntersecting) { v.muted = true; v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.25 });
    $$(".sc-row video").forEach((v) => { v.preload = "metadata"; vio.observe(v); });
    if (frame) { frame.prepend(mh); if (flow) mh.after(flow); }
  }
  // The closing links keep their label as one block under the arrow (the text effect splits it into word spans).
  $$(".ar-end a").forEach((a) => {
    const t = document.createElement("span"); t.className = "ar-end-t";
    [...a.childNodes].filter((n) => !(n.nodeType === 1 && n.matches("svg"))).forEach((n) => t.appendChild(n));
    a.appendChild(t);
  });
  const introOn = (body.hasAttribute("data-intro") || /[?&]intro\b/.test(location.search)) && !reduce;
  if (!reduce && page !== "entrance-main") {
    const els = $$(".frame :is(p, h3, small, b, .ar-label, .ar-num, .sc-f > span, .sc-count)").filter((el) =>
      !el.closest(".hdr, .fx, .marquee, form, [data-name='Header Title'], .sc-title, .sc-pop, .sc-fab, .dz, .vc, .ph") &&
      !el.querySelector(":scope p, :scope h3") && el.textContent.trim() && getComputedStyle(el).display !== "none");
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      const items = new Map();
      els.forEach((el) => {
        if (el.querySelector(".dz")) return; // already handled (Portfolio rows)
        const ls = [];
        dzSplit(el, ls, el.textContent.trim().length > 40);
        if (ls.length) items.set(el, { el, ls, y: 0 });
      });
      const io = new IntersectionObserver((es) => {
        const batch = es.filter((e) => e.isIntersecting).map((e) => { io.unobserve(e.target); const it = items.get(e.target); it.y = e.boundingClientRect.top; return it; });
        if (batch.length) dzPlay(batch, introOn && performance.now() < 4000 ? 2700 : 250); // under the intro, wait for it
      }, { rootMargin: "0px 0px -4% 0px", threshold: 0.01 });
      items.forEach((it) => io.observe(it.el));
    });
  }
  if (introOn) iconIntro(introIcons);

  // ---------- Artwork pages: each video starts when you reach it, with pause and restart buttons ----------
  const artVids = body.matches(".art-page, .page-art") ? $$("video").filter((v) => !v.closest(".reel, .pv, .ph")) : [];
  const PAUSE = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="3.2" height="12" rx=".6"/><rect x="11.8" y="4" width="3.2" height="12" rx=".6"/></svg>';
  const PLAY = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.5 4.2v11.6L16 10z"/></svg>';
  const AGAIN = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.6 10a5.4 5.4 0 1 0 1.6-3.85"/><path d="M5.6 2.9v3.5h3.5"/></svg>';
  const artVidsAll = artVids.slice();
  artVids.forEach((v) => {
    v.removeAttribute("autoplay");
    v.autoplay = false;
    v.muted = true;
    v.pause();
    if (v.closest("[data-gif]")) return; // a looping gif: no pause or restart buttons
    // The buttons sit at the bottom left of the video, or, when the video is a screen inside a picture
    // (a phone), at the bottom left of that picture, off the video itself.
    let host = v.parentElement;
    const vr = v.getBoundingClientRect();
    for (let a = host; a && !host.matches(".ar-media") && !a.matches(".frame, .stage, body, main"); a = a.parentElement) {
      const r = a.getBoundingClientRect(), cs = getComputedStyle(a);
      if (cs.display === "contents" || cs.position === "static") continue;
      if (r.width > vr.width * 1.25 && r.height > vr.height * 1.08) { host = a; break; }
      if (r.width > vr.width * 1.25 || r.height > vr.height * 1.25) break;
    }
    // A phone laid over a picture: the picture is a sibling, not a parent. Use the smallest picture around the
    // video that holds no other video.
    if (MOB && v.closest(".mf-b")) host = v.closest(".mf-b"); // phone column: on the video's own block
    else if (host === v.parentElement && vr.width < 600) {
      let area = Infinity;
      const others = artVidsAll.filter((o) => o !== v).map((o) => o.getBoundingClientRect());
      $$(".frame [data-node-id]").forEach((e) => {
        if (e.contains(v) || e.tagName === "IMG" || e.closest(".fx")) return;
        const r = e.getBoundingClientRect();
        if (!(r.left <= vr.left + 1 && r.top <= vr.top + 1 && r.right >= vr.right - 1 && r.bottom >= vr.bottom - 1)) return;
        if (!(r.width > vr.width * 1.25 && r.height > vr.height * 1.08) || r.width * r.height >= area) return;
        const c = getComputedStyle(e);
        if (c.position === "static" || c.display === "contents") return;
        if (c.backgroundImage === "none" && /^rgba\(0, 0, 0, 0\)$/.test(c.backgroundColor) && !e.querySelector("img")) return;
        if (others.some((o) => o.left >= r.left - 1 && o.top >= r.top - 1 && o.right <= r.right + 1 && o.bottom <= r.bottom + 1)) return;
        area = r.width * r.height; host = e;
      });
    }
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    const bar = document.createElement("div");
    bar.className = "vc";
    bar.innerHTML = `<button type="button" aria-label="Pause">${PAUSE}</button><button type="button" aria-label="Play from the start">${AGAIN}</button>`;
    host.appendChild(bar);
    const pb = bar.firstChild;
    const sync = () => { pb.innerHTML = v.paused ? PLAY : PAUSE; pb.setAttribute("aria-label", v.paused ? "Play" : "Pause"); };
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    sync();
    // A video you paused stays paused, even when you scroll away and back.
    pb.addEventListener("click", () => { if (v.paused) { delete v.dataset.held; v.play().catch(() => {}); } else { v.dataset.held = "1"; v.pause(); } });
    bar.lastChild.addEventListener("click", () => { delete v.dataset.held; v.currentTime = 0; v.play().catch(() => {}); });
  });
  // ---------- Artwork pages on a phone (.ph, the Figma phone frame): scaled to the screen; its buttons drive
  // the videos (pause / play again / sound) and the galleries (next picture) ----------
  const ph = MOB && $(".frame > .ph");
  if (ph) {
    doc.classList.add("has-ph");
    const fit = () => { ph.style.zoom = Math.min(innerWidth, doc.clientWidth) / 390; };
    fit();
    addEventListener("resize", fit);
    const pv = $$("video", ph);
    const pio = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.dataset.held) v.play().catch(() => {}); } else v.pause();
    }), { threshold: 0.3 });
    pv.forEach((v) => { v.muted = true; pio.observe(v); });
    $$(".pb", ph).forEach((b) => {
      const v = pv[+b.dataset.for], a = b.dataset.a;
      if (a === "play") {
        const sync = () => b.setAttribute("aria-label", v.paused ? "Play" : "Pause");
        v.addEventListener("play", sync); v.addEventListener("pause", sync);
        b.addEventListener("click", () => { if (v.paused) { delete v.dataset.held; v.play().catch(() => {}); } else { v.dataset.held = "1"; v.pause(); } });
      } else if (a === "again") {
        b.addEventListener("click", () => { delete v.dataset.held; v.currentTime = 0; v.play().catch(() => {}); });
      } else if (a === "mute") {
        // The X on the speaker shows while the video is muted.
        const marks = $$(".pi", b.parentElement).filter((i) => i.querySelector(".mx") || i.classList.contains("px"))
          .filter((i) => { const r = i.getBoundingClientRect(), o = b.getBoundingClientRect(); return r.left < o.right && r.right > o.left && r.top < o.bottom && r.bottom > o.top; });
        b.addEventListener("click", () => {
          v.muted = !v.muted;
          if (!v.muted) { pv.forEach((o) => { if (o !== v) o.muted = true; }); v.play().catch(() => {}); }
          $$(".pi.snd-on", ph).forEach((i) => { if (!marks.includes(i)) i.classList.remove("snd-on"); });
          marks.forEach((i) => i.classList.toggle("snd-on", !v.muted));
          b.setAttribute("aria-label", v.muted ? "Sound on" : "Sound off");
        });
      } else if (a === "next") {
        const g = b.closest(".pgal"), slides = $$(".gs", g), dots = $$(".gd", g);
        let i = 0;
        const show = () => { slides.forEach((s, k) => s.classList.toggle("on", k === i)); dots.forEach((d, k) => d.classList.toggle("on", k === i % dots.length)); };
        slides.forEach((s) => { s.loading = "eager"; });
        show();
        b.addEventListener("click", () => { i = (i + 1) % slides.length; show(); });
      }
    });
    $$(".totop-ph", ph).forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }));
    // Work With Me: the row of pictures drifts sideways on its own; a swipe pushes it along.
    const ps = $(".pstrip", ph), psi = ps && $(".pstrip-in", ps);
    if (psi) {
      let x = 0, last = performance.now(), drag = null, push = 0;
      const half = () => psi.scrollWidth / 2 + 3; // the pictures are listed twice; one set plus its gap
      const step = (t) => {
        const dt = Math.min(0.1, (t - last) / 1000); last = t;
        if (!drag) { x += (reduce ? 0 : 24) * dt + push; push *= 0.92; if (Math.abs(push) < 0.05) push = 0; }
        const H = half(); x = ((x % H) + H) % H;
        psi.style.transform = `translateX(${-x}px)`;
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      const zx = () => parseFloat(ph.style.zoom) || 1;
      ps.addEventListener("pointerdown", (e) => { drag = { s: e.clientX, x0: x, l: e.clientX, v: 0 }; });
      ps.addEventListener("pointermove", (e) => { if (!drag) return; drag.v = (drag.l - e.clientX) / zx(); drag.l = e.clientX; x = drag.x0 + (drag.s - e.clientX) / zx(); });
      const end = () => { if (drag) { push = drag.v; drag = null; } };
      ps.addEventListener("pointerup", end); ps.addEventListener("pointercancel", end); ps.addEventListener("pointerleave", end);
    }
  }
  const aio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { if (!v.dataset.held) v.play().catch(() => {}); } else v.pause();
  }), { threshold: 0.4 });
  artVids.forEach((v) => aio.observe(v));
  vids.forEach((v) => { v.muted = true; if (!artVids.includes(v)) vio.observe(v); });

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
      if (m.closest(".fx, .hdr, .row, .reel, .pv, .marquee, .totop, .neg-host, .sound, .gal-btn, .ph")) return;
      const r = m.getBoundingClientRect();
      if (r.width / Z < 110 || r.height / Z < 90) return;
      let el = m;
      // A picture cropped by its box: the box is what grows and shrinks.
      const pb = m.parentElement && m.parentElement.getBoundingClientRect();
      if (pb && m.parentElement !== frame && getComputedStyle(m.parentElement).overflow === "hidden" && pb.width >= 110 * Z && (pb.width < r.width - 4 || pb.height < r.height - 4)) el = m.parentElement;
      while (el.parentElement && el.parentElement !== frame) {
        const p = el.parentElement, c = p.classList;
        if (c.contains("contents") || p.dataset.name === "Strip") break;
        const pr = p.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        if (Math.abs(pr.width - er.width) > 4 || Math.abs(pr.height - er.height) > 4) break;
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

  // ---------- Work with Me: the image strip drifts on its own, and wheel/drag scroll it too ----------
  const strip = $('[data-name="Strip"]');
  if (strip) {
    const cycle = 2287; // the strip's pictures repeat every 2287px (Part 2 starts two pictures in), so wrapping there is seamless
    const box = strip.parentElement;
    let y = 0, last = performance.now(), drag = null, push = 0;
    const speed = reduce ? 0 : 30; // px per second
    const wrap = (v) => ((v % cycle) + cycle) % cycle;
    const frameFn = (t) => {
      const dt = Math.min(0.1, (t - last) / 1000); last = t;
      if (!drag) { y += speed * dt + push; push *= 0.9; if (Math.abs(push) < 0.05) push = 0; }
      y = wrap(y);
      strip.style.transform = `translateY(${-y}px)`;
      requestAnimationFrame(frameFn);
    };
    requestAnimationFrame(frameFn);
    box.addEventListener("wheel", (e) => { e.preventDefault(); y += e.deltaY / Z; push = 0; }, { passive: false });
    box.style.touchAction = "none";
    box.style.pointerEvents = "auto";
    box.style.cursor = "grab";
    box.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      drag = { start: e.clientY, y0: y, lastY: e.clientY, v: 0 };
      box.setPointerCapture(e.pointerId); box.style.cursor = "grabbing";
    });
    box.addEventListener("pointermove", (e) => {
      if (!drag) return;
      drag.v = (drag.lastY - e.clientY) / Z; drag.lastY = e.clientY;
      y = drag.y0 + (drag.start - e.clientY) / Z;
    });
    const end = () => { if (!drag) return; push = drag.v; drag = null; box.style.cursor = "grab"; };
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
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
      if (!form.classList.contains("ready")) { (fields.find((f) => !f.value.trim()) || form.email).focus(); return; }
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
      "338:376": { o: inOut(11.8, 16.4, 0, 1), y: inOut(11.8, 16.4, 20, 0) },
      "338:378": { o: inOut(15.6, 20.6, 0, 1), y: inOut(15.6, 20.6, 20, 0) },
      "338:380": { o: inOut(7, 11.6, 0, 1), y: inOut(7, 11.6, 20, 0) },
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
    const size = () => { scrolly.style.height = `${innerHeight * 13}px`; };
    size();
    addEventListener("resize", size);
    // Scrolling sets a target; the timeline glides toward it each frame, so wheel steps never jump.
    let cur = -1, target = 0, raf = 0;
    const render = (p) => {
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
    const tick = () => {
      raf = 0;
      const d = target - cur;
      cur = Math.abs(d) < 0.02 || cur < 0 ? target : cur + d * 0.05;
      render(cur);
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    return () => {
      const max = scrolly.offsetHeight - innerHeight;
      const prog = Math.min(1, Math.max(0, scrollY / max));
      target = reduce ? 100 : START + prog * (100 - START);
      hint.classList.toggle("gone", prog > 0.02);
      if (!raf) raf = requestAnimationFrame(tick);
    };
  }
  function iconIntro(list) {
    if (!list.length) return;
    scrollTo(0, 0);
    const made = [];
    const fixed = (css) => { const d = document.createElement("div"); d.style.cssText = "position:fixed;margin:0;pointer-events:none;" + css; body.appendChild(d); made.push(d); return d; };
    const cover = fixed("inset:0;background:#f5f3f1;z-index:9998");
    const ends = list.map((el) => el.getBoundingClientRect());
    // Noa's "Entrance NEW" frame: NOA • JABLON over the three icons (each three times its bar size), small squares between them.
    const S = Math.min(3, (innerWidth * 0.6) / ends.reduce((a, r) => a + r.width, 0));
    const u = Z * S / 3; // one Figma px of that frame, on screen
    const step = Math.max(...ends.map((r) => r.width)) * S * 1.6, cy = innerHeight / 2;
    const cxs = list.map((_, i) => innerWidth / 2 + (i - (list.length - 1) / 2) * step);
    const T = 3500, ms = (t) => Math.min(1, Math.max(0, t / T));
    const MID = { opacity: 0.55, filter: "blur(3px)" }, ON = { opacity: 1, filter: "blur(0px)" }, OFF = { opacity: 0, filter: "blur(6px)" };
    const anims = [];
    // Shown like a letter of the text effect: blurred in, half there, then sharp.
    const appear = (el, at, out, extra = {}) => anims.push(el.animate([
      { ...OFF, offset: 0 }, { ...OFF, offset: ms(at) }, { ...MID, offset: ms(at) + 0.0001, easing: "ease-out" },
      { ...ON, offset: ms(at + 550) }, { ...ON, offset: ms(out) }, { ...OFF, offset: ms(out + 450) }, { ...OFF, offset: 1 },
    ], { duration: T, fill: "both", ...extra }));
    // The name, letter by letter, centred over the icons and never wider than their row.
    const name = fixed(`left:0;top:${cy - 119 * u}px;transform:translateY(-50%);z-index:9999`);
    const inner = document.createElement("div");
    inner.style.cssText = `zoom:${u};font:400 28.7px/1 "Gilroy","Outfit",sans-serif;letter-spacing:var(--ls);color:#363636;white-space:nowrap`;
    inner.innerHTML = 'NOA<i style="display:inline-block;width:7px;height:7px;border-radius:1.6px;background:#363636;vertical-align:middle;margin-right:var(--ls)"></i>JABLON';
    name.appendChild(inner);
    const nameLs = [];
    dzSplit(inner, nameLs, false);
    // The icons' drawn edges sit a little inside their boxes, so the name stops 10px (Figma) inside them.
    const rowL = cxs[0] - (ends[0].width * S) / 2 + 10 * u, rowR = cxs[cxs.length - 1] + (ends[ends.length - 1].width * S) / 2 - 10 * u;
    let ls = 41.6; // Noa's Figma: 28.7px, 145% tracking
    const span = () => { // the letters' own extent on screen (the last letter's trailing spacing left out)
      const a = nameLs[0].getBoundingClientRect(), b = nameLs[nameLs.length - 1].getBoundingClientRect();
      return [a.left, b.right - ls * u];
    };
    for (let k = 0; k < 3; k++) { // only ever tighter, so it never runs past the icons
      inner.style.setProperty("--ls", ls + "px");
      const [l, r] = span(), over = r - l - (rowR - rowL);
      if (over <= 0) break;
      ls -= over / u / nameLs.length;
    }
    inner.style.setProperty("--ls", ls + "px");
    const [l0, r0] = span();
    name.style.left = ((rowL + rowR) / 2 - (l0 + r0) / 2) + "px";
    dzPlay([{ el: inner, ls: nameLs, y: 0, z: u }], 100);
    anims.push(name.animate([{ ...ON, offset: 0 }, { ...ON, offset: ms(1900) }, { ...OFF, offset: ms(2400) }, { ...OFF, offset: 1 }], { duration: T, fill: "both" }));
    appear(inner.querySelector("i"), 500, 1900);
    // The squares between the icons.
    cxs.slice(0, -1).forEach((cx, i) => {
      const d = fixed(`left:${(cx + cxs[i + 1]) / 2 - 3.5 * u}px;top:${cy - 3.5 * u}px;width:${7 * u}px;height:${7 * u}px;border-radius:${1.6 * u}px;background:#363636;z-index:9999`);
      appear(d, 900 + i * 150, 1900);
    });
    // The icons: a soft blurred fade-in at the centre, then they glide into the bar.
    const ghosts = [];
    list.forEach((el, i) => {
      const r = ends[i], g = el.cloneNode(true), to = +getComputedStyle(el).opacity;
      g.removeAttribute("data-node-id");
      g.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;margin:0;z-index:9999;transform-origin:0 0;pointer-events:none`;
      body.appendChild(g);
      ghosts.push(g);
      el.style.visibility = "hidden";
      const from = `translate(${cxs[i] - (r.width * S) / 2 - r.left}px,${cy - (r.height * S) / 2 - r.top}px) scale(${S})`;
      const a = 350 + i * 180, glide = 2000 + i * 90;
      anims.push(g.animate([
        { transform: `${from} scale(.7)`, opacity: 0, filter: "blur(10px)", offset: 0 },
        { transform: `${from} scale(.7)`, opacity: 0, filter: "blur(10px)", offset: ms(a), easing: "cubic-bezier(.2,.7,.2,1)" },
        { transform: from, opacity: 1, filter: "blur(0px)", offset: ms(a + 950) },
        { transform: from, opacity: 1, filter: "blur(0px)", offset: ms(glide), easing: "cubic-bezier(.65,0,.25,1)" },
        { transform: "none", opacity: to, filter: "blur(0px)", offset: ms(glide + 1100) },
        { transform: "none", opacity: to, filter: "blur(0px)", offset: 1 },
      ], { duration: T, fill: "both" }));
    });
    anims.push(cover.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, delay: 2600, easing: "ease-out", fill: "both" }));
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      list.forEach((el) => (el.style.visibility = ""));
      ghosts.forEach((g) => g.remove());
      made.forEach((d) => d.remove());
    };
    Promise.all(anims.map((a) => a.finished)).then(finish, finish);
    // Any click or key skips straight to the page.
    const skip = () => anims.forEach((a) => a.finish());
    addEventListener("pointerdown", skip, { once: true });
    addEventListener("keydown", skip, { once: true });
  }

})();
