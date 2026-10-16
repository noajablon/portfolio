#!/usr/bin/env python3
"""Artwork pages in the "Maskit NEW Redesign" format (Figma page NEW, frame 777:27999).

Usage: python3 tools/build_art.py   (after tools/build.py, which builds portfolio-classic.html)
Writes maskit.html. The header (marquee + logos) is copied from portfolio-classic.html like the
Portfolio page; everything else sits on one grid:
  columns  0 | 87 numbers | content ... | 1226 notes | 1390 | 1480
  sections are separated by a 13px gap between two full-width rules, joints on every crossing.
"""
import html
import os

from bs4 import BeautifulSoup

from contact import CONTACT_CSS, CONTACT_JS, FAB, MASK, popup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V, P, I = "assets/video/", "assets/poster/", "assets/img/"
L, R, NOTE = 87, 1390, 1226   # grid lines
GAP = 13
CX = (L + R) / 2              # centre of the content box

MASKIT = {
    "slug": "maskit", "num": "01", "title": "Maskit", "logo": I + "b3c3c5bd6496c9.webp",
    "prev": "sorora.html", "next": "mazor.html",
    "field": "Branding", "year": "2026", "place": "Bezalel",
    "about": "Maskit is a speculative brand and immersive desert retreat that explores memory, cultural preservation, and "
             "storytelling through symbolic experiences, artifacts, and rituals inspired by the Negev. The project combines "
             "branding, spatial design, printed matter.",
    "sections": [
        {"h": 1812, "media": ("img", I + "6c5ee5b5191b4e.webp"), "right": R},
        {"h": 630, "media": ("video", "maskit-brandbook"), "right": NOTE,
         "notes": [("The brief", "The project began with a speculative constraint: a brand that exists entirely offline. "
                                 "We reimagined how Maskit could communicate through physical encounters, objects, and spaces.")]},
        {"h": 660, "media": ("gallery", [I + f"gal-maskit-{i}.webp" for i in range(1, 5)]), "right": 957,
         "notes": [("Secret language", "We began developing a visual language that guests could gradually discover, creating a "
                                       "sense of belonging through shared symbols.\n\nWe deconstructed Maskit’s original logo "
                                       "into five shapes, then recombined them into a new symbolic language.")],
         "notes_left": 957, "notes_right": NOTE, "symbols": 7},
        {"h": 596, "media": ("video", "maskit-film"), "right": 1480},
        {"h": 847, "media": ("img", I + "ca316056e6d562.webp"), "right": NOTE,
         "notes": [("Geometric patterns", "The symbolic language was further developed into intricate, embroidery-inspired "
                                          "patterns, each composed of the letters spelling its symbol’s name."),
                   ("The bird", "Represents migration and continuity, carrying memories and traditions across places and generations."),
                   ("The flower", "Symbolizes renewal, expressing how cultural roots can flourish in new surroundings."),
                   ("The eye", "Represents awareness and remembrance, inviting us to observe, reflect, and preserve the stories around us.")]},
        {"h": 664, "media": ("video", "maskit-yoman"), "right": NOTE,
         "notes": [("The Negev", "We imagined a retreat in the Negev, removed from the pace of city life and constant digital "
                                 "connection. The desert offered a setting for slowing down, creating space for memory, ritual, "
                                 "and human connection.")]},
    ],
}

CSS = """
.page-art .stage { overflow: visible; }
.ar .hl { position: absolute; left: 0; width: 1480px; height: 1px; background: var(--ink); }
.ar .vl { position: absolute; width: 1px; background: var(--ink); }
.ar .j { position: absolute; width: 5px; height: 5px; border-radius: 1.6px; background: var(--ink); z-index: 3; }
.ar { position: relative; width: 1480px; color: var(--ink); font-family: "Gilroy", "Outfit", sans-serif; }
.ar-intro { position: absolute; left: 0; top: 180px; width: 1480px; height: 513px; }
.ar-label { position: absolute; font: 500 20px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 6.2px; text-transform: uppercase; white-space: nowrap; }
.ar-logo { position: absolute; width: 551px; height: 110px; }
.ar-facts { position: absolute; display: flex; }
.ar-facts span { position: relative; width: 114px; padding: 0 0 0 22px; box-sizing: border-box; }
.ar-facts span + span::before { content: ""; position: absolute; left: 0; top: 0; height: 36px; width: 1px; background: var(--ink); }
.ar-facts span + span::after { content: ""; position: absolute; left: -2px; top: -2px; width: 5px; height: 40px;
  background: linear-gradient(var(--ink) 0 5px, transparent 5px 35px, var(--ink) 35px); border-radius: 1.6px; }
.ar-facts small { display: block; font: 400 9.45px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 2.9px; opacity: .55; margin-bottom: 9px; }
.ar-facts b { font: 500 15.75px/1 "Gilroy", "Outfit", sans-serif; }
.ar-about { position: absolute; width: 602px; text-align: center; font: 400 18px/1.4 "Gilroy", "Outfit", sans-serif; margin: 0; }
.ar-btn { position: absolute; width: 50px; height: 50px; border-radius: 50%; border: 0.8px solid var(--ink); color: var(--ink);
  display: flex; align-items: center; justify-content: center; transition: background .5s var(--soft), color .5s var(--soft); }
.ar-btn svg { width: 24px; height: 22px; transition: transform .5s var(--soft); }
.ar-btn:hover, .ar-btn:focus-visible { background: var(--ink); color: var(--paper); }
.ar-btn.next:hover svg { transform: translateX(3px); }
.ar-btn.prev:hover svg { transform: translateX(-3px); }
.ar-num { position: absolute; left: 22px; font: 400 20px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 6.2px; }
.ar-media { position: absolute; overflow: hidden; background: #000; }
.ar-media > img, .ar-media > video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.ar-gal img { opacity: 0; transition: opacity 1s var(--soft); }
.ar-gal img.on { opacity: 1; }
.ar-gal button { position: absolute; right: 24px; top: calc(50% - 22px); width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
  border: 1px solid #fff; background: transparent; color: #fff; display: flex; align-items: center; justify-content: center;
  transition: background .5s var(--soft), color .5s var(--soft); }
.ar-gal button:hover, .ar-gal button:focus-visible { background: #fff; color: var(--ink); }
.ar-gal button svg { width: 20px; height: 18px; }
.ar-dots { position: absolute; left: 50%; bottom: 18px; translate: -50% 0; display: flex; gap: 8px; }
.ar-dots i { width: 6px; height: 6px; border-radius: 50%; background: #fff; opacity: .4; transition: opacity .5s; }
.ar-dots i.on { opacity: 1; }
.ar-snd { position: absolute; right: 16px; bottom: 16px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid #fff; background: rgba(0,0,0,.15);
  color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .4s, color .4s; }
.ar-snd:hover { background: #fff; color: var(--ink); }
.ar-snd svg { width: 20px; height: 16px; }
.ar-snd .on, .ar-snd[aria-pressed="true"] .off { display: none; }
.ar-snd[aria-pressed="true"] .on { display: inline; }
.ar-notes { position: absolute; padding: 31px 20px 0 25px; box-sizing: border-box; }
.ar-notes h3 { margin: 0 0 12px; font: 500 12px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 3.4px; white-space: nowrap; text-transform: uppercase; opacity: .45; }
.ar-notes p { margin: 0 0 39px; font: 400 13px/1.54 "Gilroy", "Outfit", sans-serif; white-space: pre-line; }
.ar-sym { position: absolute; display: grid; grid-template-columns: 1fr 1fr; }
.ar-sym span { display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--ink); }
.ar-sym span:nth-child(odd) { border-right: 1px solid var(--ink); }
.ar-sym span:nth-last-child(-n+2) { border-bottom: 0; }
.ar-sym img { transition: scale .6s var(--soft); }
.ar-sym span:hover img { scale: 1.12; }
.ar-end { position: absolute; display: flex; gap: 36px; }
.ar-end a { width: 115px; height: 115px; border-radius: 50%; border: 0.8px solid var(--ink); color: var(--ink); text-decoration: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center;
  font: 400 15px/1.1 "Gilroy", "Outfit", sans-serif; letter-spacing: .5px; text-transform: uppercase;
  transition: background .5s var(--soft), color .5s var(--soft); }
.ar-end a svg { width: 28px; height: 26px; }
.ar-end a:hover, .ar-end a:focus-visible { background: var(--ink); color: var(--paper); }
.ar-top { position: fixed; z-index: 69; right: calc(120px * var(--z)); bottom: calc(36px * var(--z)); zoom: var(--z); width: 88px; height: 88px;
  border-radius: 50%; border: 0.8px solid var(--ink); background: var(--paper); color: var(--ink); cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  font: 400 12px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 1px; opacity: 0; transform: translateY(24px); pointer-events: none;
  transition: opacity .6s var(--soft), transform .6s var(--soft), background .5s var(--soft), color .5s var(--soft); }
.ar-top svg { width: 20px; height: 22px; }
.ar-top.on { opacity: 1; transform: none; pointer-events: auto; }
.ar-top:hover, .ar-top:focus-visible { background: var(--ink); color: var(--paper); }
"""

JS = """
(function () {
  var z = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1; };
  // Videos play only while on screen; the speaker button turns the sound on.
  var vids = [].slice.call(document.querySelectorAll('.ar video'));
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
    if (e.isIntersecting) e.target.play().catch(function () {}); else e.target.pause(); }); }, { threshold: 0.25 });
  vids.forEach(function (v) { io.observe(v); });
  [].forEach.call(document.querySelectorAll('.ar-snd'), function (b) {
    b.addEventListener('click', function () {
      var v = b.parentNode.querySelector('video'), on = v.muted;
      vids.forEach(function (o) { o.muted = true; });
      [].forEach.call(document.querySelectorAll('.ar-snd'), function (o) { o.setAttribute('aria-pressed', 'false'); });
      v.muted = !on; b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) v.play().catch(function () {});
    });
  });
  // Gallery: the arrow fades to the next picture.
  [].forEach.call(document.querySelectorAll('.ar-gal'), function (g) {
    var imgs = g.querySelectorAll('img'), dots = g.querySelectorAll('.ar-dots i'), k = 0;
    g.querySelector('button').addEventListener('click', function () {
      imgs[k].classList.remove('on'); dots[k].classList.remove('on');
      k = (k + 1) % imgs.length;
      imgs[k].classList.add('on'); dots[k].classList.add('on');
    });
  });
  // To top: appears once the opening section has scrolled away (the Contact me button leaves at the same point).
  var top = document.querySelector('.ar-top'), away = +document.body.dataset.fabHide;
  function check() { top.classList.toggle('on', scrollY / z() > away); }
  addEventListener('scroll', check, { passive: true }); check();
  [].forEach.call(document.querySelectorAll('[data-top]'), function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
  });
})();
"""

ARR = '<svg viewBox="0 0 24 22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 11h22M12 1l10 10-10 10"/></svg>'
ARR_L = '<svg viewBox="0 0 24 22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M24 11H2M12 1 2 11l10 10"/></svg>'
ARR_UP = '<svg viewBox="0 0 22 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M11 24V2M1 12 11 2l10 10"/></svg>'
SND = ('<svg viewBox="0 0 20 16" fill="currentColor"><path d="M0 5h4l5-4v14l-5-4H0z"/>'
       '<path class="off" d="M13 5l6 6M19 5l-6 6" stroke="currentColor" stroke-width="1.4" fill="none"/>'
       '<path class="on" d="M12.5 4.5a5 5 0 0 1 0 7M15 2a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>')


def hl(y):
    return f'<i class="hl" style="top:{y}px"></i>'


def vl(x, y0, y1):
    return f'<i class="vl" style="left:{x}px;top:{y0}px;height:{y1 - y0}px"></i>'


def j(x, y):
    return f'<i class="j" style="left:{x - 2}px;top:{y - 2}px"></i>'


def media_html(m, x, y, w, h):
    kind, src = m
    box = f'left:{x}px;top:{y}px;width:{w}px;height:{h}px'
    if kind == "img":
        return f'<div class="ar-media" style="{box}"><img src="{src}" alt="" loading="lazy" decoding="async"></div>'
    if kind == "video":
        poster = P + src + ".webp"
        pa = f' poster="{poster}"' if os.path.exists(os.path.join(ROOT, poster)) else ""
        return (f'<div class="ar-media" style="{box}"><video src="{V}{src}.mp4"{pa} muted loop playsinline preload="metadata"></video>'
                f'<button class="ar-snd" type="button" aria-label="Sound" aria-pressed="false">{SND}</button></div>')
    imgs = "".join(f'<img src="{s}" alt=""{" class=on" if i == 0 else ""} loading="lazy" decoding="async">' for i, s in enumerate(src))
    dots = "".join(f'<i{" class=on" if i == 0 else ""}></i>' for i in range(len(src)))
    return (f'<div class="ar-media ar-gal" style="{box}">{imgs}<span class="ar-dots">{dots}</span>'
            f'<button type="button" aria-label="Next picture">{ARR}</button></div>')


def build(w):
    out, lines, joints = [], [], []
    # Intro: 180 to 693, framed by the 87 / 1390 lines.
    y_end = 693
    lines += [vl(L, 130, y_end), vl(R, 130, y_end), hl(y_end)]
    joints += [j(L, y_end), j(R, y_end)]
    logo_x = CX - 551 / 2
    facts_w = 3 * 114
    out.append(f'<a class="ar-btn prev" href="portfolio.html" style="left:19px;top:222px" aria-label="Back to Portfolio">{ARR_L}</a>')
    out.append(f'<a class="ar-btn next" href="{w["next"]}" style="left:1410px;top:222px" aria-label="Next artwork">{ARR}</a>')
    out.append(f'<span class="ar-label" style="left:{logo_x}px;top:252px">{w["num"]}/ {html.escape(w["title"])}</span>')
    out.append(f'<img class="ar-logo" src="{w["logo"]}" alt="{html.escape(w["title"])}" style="left:{logo_x}px;top:296px">')
    out.append(f'<div class="ar-facts" style="left:{CX - facts_w / 2 + 11}px;top:442px">'
               f'<span><small>FIELD</small><b>{w["field"]}</b></span><span><small>YEAR</small><b>{w["year"]}</b></span>'
               f'<span><small>PLACE</small><b>{w["place"]}</b></span></div>')
    out.append(f'<p class="ar-about" style="left:{CX - 301}px;top:512px">{html.escape(w["about"])}</p>')

    y = y_end + GAP
    for n, s in enumerate(w["sections"], 1):
        h, right = s["h"], s["right"]
        y0, y1 = y, y + h
        lines += [hl(y0), hl(y1)]
        xs = [L] + ([right] if right < 1480 else [])
        if "notes_right" in s:
            xs.append(s["notes_right"])
        for x in xs:
            lines.append(vl(x, y0, y1))
            joints += [j(x, y0), j(x, y1)]
        out.append(f'<span class="ar-num" style="top:{y0 + 18}px">{w["num"][-1]}.{n}</span>')
        out.append(media_html(s["media"], L + 1, y0 + 1, right - L - 1, h - 1))
        if "notes" in s:
            nl = s.get("notes_left", right)
            nr = s.get("notes_right", 1480)
            body = "".join(f'<h3>{html.escape(t)}</h3><p>{html.escape(p)}</p>' for t, p in s["notes"])
            out.append(f'<div class="ar-notes" style="left:{nl + 1}px;top:{y0 + 1}px;width:{nr - nl - 1}px">{body}</div>')
        if s.get("symbols"):
            rows = s["symbols"]
            cells = "".join(f'<span><img src="assets/img/maskit-symbols/{r}{side}.svg" alt="" loading="lazy"></span>'
                            for r in range(1, rows + 1) for side in "LR")
            sx, sw = NOTE + 1, 1480 - NOTE - 1
            out.append(f'<div class="ar-sym" style="left:{sx}px;top:{y0 + 1}px;width:{sw}px;height:{h - 1}px;'
                       f'grid-template-rows:repeat({rows},1fr)">{cells}</div>')
            mid = NOTE + (1480 - NOTE) // 2
            joints += [j(mid, y0), j(mid, y1)]
            for r in range(1, rows):
                joints.append(j(NOTE, round(y0 + h * r / rows)))
            joints += [j(mid, round(y0 + h * r / rows)) for r in range(1, rows)]
        y = y1 + GAP
    # End: previous / to top / next, centred in the content box.
    end_top = y + 66
    out.append(f'<nav class="ar-end" style="left:{CX - (3 * 115 + 2 * 36) / 2}px;top:{end_top}px" aria-label="More work">'
               f'<a href="{w["prev"]}">{ARR_L}Previous<br>design</a><a href="#" data-top>{ARR_UP}To top</a>'
               f'<a href="{w["next"]}">{ARR}Next<br>design</a></nav>')
    total = end_top + 115 + 80
    lines.append(vl(L, y - GAP, total))
    # the 87 rule runs through every gap too
    yy = y_end
    for s in w["sections"]:
        lines.append(vl(L, yy, yy + GAP))
        yy += GAP + s["h"]
    return "\n".join(lines + joints + out), total


def main():
    src = open(os.path.join(ROOT, "portfolio-classic.html")).read()
    soup = BeautifulSoup(src, "html.parser")
    w = MASKIT
    head = src[:src.find("<body")]
    head = head.replace("page-home-main2", "page-art")
    head = head.replace("<title>Portfolio", f"<title>{w['title']}")
    head = head.replace("</head>", f"<style>{CSS}{CONTACT_CSS}</style>\n</head>")
    hdr = "".join(str(soup.find(attrs={"data-node-id": nid})) for nid in ("286:5418", "434:575"))
    body_html, total = build(w)
    page = f"""<body class="page-art page-{w['slug']}" data-page="{w['slug']}" data-fab-hide="520">
<div id="stage" class="stage"><div class="frame" style="position:relative;height:{total}px">
{hdr}
{MASK}
<main class="ar" style="height:{total}px">
{body_html}
</main>
</div></div>
{FAB}
<button class="ar-top" type="button" data-top aria-label="Back to top">{ARR_UP}TO TOP</button>
{popup()}
<script>{JS}</script>
<script>{CONTACT_JS}</script>
<script src="assets/js/site.js" defer></script>
</body>
</html>
"""
    with open(os.path.join(ROOT, f"{w['slug']}.html"), "w") as f:
        f.write(head + page)
    print(f"wrote {w['slug']}.html ({total}px)")


if __name__ == "__main__":
    main()
