#!/usr/bin/env python3
"""Preview of the Portfolio page as one full-screen row per work (Home New Sketch grid).

Usage: python3 tools/build_scroll.py   (after tools/build.py)
Writes portfolio.html (the main Portfolio page). The header (marquee + logos) is copied from the built
portfolio-classic.html (the earlier Figma-converted Portfolio page, still built by tools/build.py);
the rows, their growing-on-scroll behaviour and styles are self-contained in this file.
"""
import html
import os

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V, P = "assets/video/", "assets/poster/"

# slug, title, field, year, place, about, media (kind, src), object-fit
WORKS = [
    ("maskit", "Maskit", "Branding", "2026", "Bezalel",
     "Maskit is a speculative brand and immersive desert retreat that explores memory, cultural preservation, and storytelling through symbolic experiences inspired by the Negev.",
     ("video", V + "maskit-film.mp4"), "cover"),
    ("mazor", "Mazor", "Branding", "2025", "Bezalel",
     "“Mazor” is a fungi-infused salt brand, designed for luxury meals and plating.",
     ("img", "assets/img/preview-mazor.webp"), "cover"),
    ("mnemo", "Mnemo", "UX/UI", "2026", "Bezalel",
     "Mnemo is an AI-powered memory platform that transforms photos, videos, and personal stories into an interactive archive of a person's life.",
     ("img", P + "mnemo-reel.webp"), "cover"),
    ("stil", "Stil", "UX/UI", "2026", "Bezalel",
     "Stil is an emotional regulation assistant that detects vital disregulations before they peak, and guides the nervous system back to calm through a living biometric talisman; turning the hardest moments into permanent artifacts.",
     ("video", V + "stil-artifact.mp4"), "contain"),
    ("lifta", "Lifta", "Poster", "2025", "Bezalel",
     "Posters and logo inspired by the contested village of Lifta in Jerusalem. Both designs feature both Hebrew and Arabic, highlighting the site's historical significance.",
     ("video", V + "lifta-logo.mp4"), "contain"),
    ("explainer", "Explainer", "Video", "2026", "Bezalel",
     "A visual storytelling project investigating Jerusalem's ghost stories and spiritual beliefs through the history of my home in Nachlaot, combining animation and interviews.",
     ("video", V + "salt-pour.mp4"), "cover"),
    ("unmask-qatar", "Unmask Qatar", "Branding", "2024", "Freelance",
     "“Unmask Qatar” is a campaign that seeks to reveal how Qatar has been playing both sides of the Israel–Hamas war, profiting from the conflict while contributing to its devastation.",
     ("img", "assets/img/preview-unmask.webp"), "cover"),
    ("voices-from-the-desert", "Voices of the Desert", "Typography", "2025", "Bezalel",
     "Production of a booklet about the Dead Sea scrolls, alongside the development and design of a dedicated website for the launch event, which included a film screening as well as a public discussion.",
     ("img", "assets/img/preview-voices.webp"), "cover"),
    ("miansi", "Miansi", "Branding", "2025", "ECNU",
     "Collaborative branding project for hair accessories designed for an international audience, integrating Chinese silk heritage as a visual and material language to foster cultural connection.",
     ("img", "assets/img/preview-miansi.webp"), "cover"),
    ("sorora", "Sorora", "UX/UI", "2026", "Bezalel",
     "Sorora is a location-based running platform designed to connect women in real time through shared movement, transforming solo runs into a network of presence, safety, and community by matching runners based on pace, route, distance, and location.",
     ("video", V + "sorora-film.mp4"), "cover"),
]
SOCIAL = [("Behance", "https://www.behance.net/noajablon"),
          ("Instagram", "https://www.instagram.com/noaj.creative/"),
          ("LinkedIn", "https://www.linkedin.com/in/noajablon/")]

CSS = """
.page-scroll { background: var(--paper); }
.page-scroll .stage { overflow: visible; }
.sc-track { position: relative; }
.sc-view { position: sticky; top: 0; height: calc(100vh / var(--z)); overflow: hidden; }
.sc-word { position: absolute; left: 87px; right: 90px; top: 130px; height: 50px; display: flex; justify-content: space-between;
  align-items: center; padding: 0 45px 0 60px; font: 400 20px/1 "Gilroy", "Outfit", sans-serif; color: var(--ink);
  border-bottom: 1px solid var(--ink); border-left: 1px solid var(--ink); border-right: 1px solid var(--ink); background: var(--paper); z-index: 3; }
.sc-col { position: absolute; left: 0; right: 0; top: 180px; bottom: 0; overflow: hidden; }
.sc-mask { position: absolute; left: 0; right: 0; top: 0; height: 181px; background: var(--paper); z-index: 41; pointer-events: none; }
.sc-mask .hl { position: absolute; left: 0; right: 0; height: 1px; background: var(--ink); }
.sc-mask .vl { position: absolute; top: 130px; height: 50px; width: 1px; background: var(--ink); }
.sc-mask .j { position: absolute; width: 5px; height: 5px; border-radius: 1.6px; background: var(--ink); }
.sc-view { --F: 650px; }
.sc-row { position: absolute; left: 0; width: 1480px; color: var(--ink); background: var(--paper); will-change: top, height; }
.sc-row .in { position: absolute; inset: 0; overflow: hidden; }
.sc-row .hl { position: absolute; left: 0; right: 0; height: 1px; background: var(--ink); z-index: 2; }
.sc-row .v { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--ink); z-index: 2; }
.sc-row .j { position: absolute; width: 5px; height: 5px; border-radius: 1.6px; background: var(--ink); z-index: 3; }
.sc-row .jb { top: auto; bottom: -2px; }
.sc-num { position: absolute; left: 22px; top: 62px; font: 400 26px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 6.2px; }
.sc-title { position: absolute; left: 56px; top: 46px; display: flex; align-items: baseline; font: 500 43px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 13.3px;
  text-transform: uppercase; white-space: nowrap; }
.sc-title b { font-weight: 500; font-size: 28px; letter-spacing: 8.6px; margin-right: 18px; opacity: .85; }
.sc-title.long { font-size: 30px; letter-spacing: 9px; top: 54px; }
.sc-h { position: absolute; left: 87px; width: 470px; height: 1px; background: var(--ink); }
.sc-f { position: absolute; top: 143px; height: 81px; padding: 18px 0 0 50px; }
.sc-f small, .sc-about small { display: block; font: 400 9.8px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 3px; opacity: .55; margin-bottom: 13px; }
.sc-about small { margin-bottom: 9.4px; } /* 13px minus the half-leading of the 1.45 body line, so About sits as close to its text as Field does */
.joint-hidden, .page-scroll [data-name="Joint Marker"] { display: none; }
.sc-f span { font: 400 16px/1 "Gilroy", "Outfit", sans-serif; }
.sc-about { position: absolute; left: 137px; top: 268px; width: 370px; font: 300 16px/1.45 "Gilroy", "Outfit", sans-serif; }
.sc-media { position: absolute; top: 0; bottom: 0; left: 557px; width: 833px; display: flex; justify-content: center; overflow: hidden; }
.sc-media .box { height: 100%; width: calc(833px * var(--g, 1)); position: relative; overflow: hidden; background: #000; }
.sc-media .box > * { position: absolute; inset: 0; width: 100%; height: 100%; }
.sc-side { position: absolute; left: 1390px; width: 90px; top: 0; bottom: 0; }
.sc-count { position: absolute; left: 0; right: 0; top: 73px; text-align: center; font: 400 12px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 2.4px; }
.sc-go { position: absolute; left: 12px; top: calc(var(--F) / 2 - 33px); width: 66px; height: 66px; display: block;
  color: var(--ink); border-radius: 50%; transition: background .5s var(--soft), color .5s var(--soft); }
.sc-arrow { width: 66px; height: 66px; display: block; overflow: visible; }
.sc-arrow circle { fill: transparent; stroke: currentColor; transition: fill .5s var(--soft); }
.sc-arrow path { stroke: currentColor; transition: transform .5s var(--soft); }
.sc-go:hover .sc-arrow circle, .sc-go:focus-visible .sc-arrow circle { fill: var(--ink); }
.sc-go:hover, .sc-go:focus-visible { color: var(--paper); }
.sc-go:hover .sc-arrow circle { stroke: var(--ink); }
.sc-go:hover .sc-arrow path, .sc-go:focus-visible .sc-arrow path { transform: translateX(2px); }
.sc-row .box > * { transition: transform 1.2s var(--soft); }
.sc-row:has(.sc-go:hover) .box > * { transform: scale(1.03); }
.sc-grid { position: absolute; inset: 0; z-index: 80; pointer-events: none; display: none; }
.grid-on .sc-grid { display: block; }
.sc-grid i { position: absolute; background: rgba(255, 64, 64, .55); }
.sc-grid b { position: absolute; font: 600 10px/1 "Outfit", sans-serif; color: #e03030; background: rgba(255,255,255,.85); padding: 2px 3px; }
.sc-fab { position: fixed; z-index: 70; right: calc(120px * var(--z)); bottom: calc(36px * var(--z)); zoom: var(--z);
  display: flex; align-items: center; gap: 14px; height: 58px; padding: 0 26px 0 30px; border-radius: 40px;
  background: var(--ink); color: var(--paper); text-decoration: none; font: 500 14px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 4.4px;
  text-transform: uppercase; box-shadow: 0 10px 30px rgba(0,0,0,.18); border: 1px solid var(--ink);
  transition: background .5s var(--soft), color .5s var(--soft), transform .5s var(--soft), box-shadow .5s var(--soft); }
.sc-fab svg { width: 22px; height: 20px; transition: transform .5s var(--soft); }
.sc-fab .e { max-width: 0; overflow: hidden; white-space: nowrap; letter-spacing: 1px; text-transform: none; font-weight: 400; opacity: 0;
  transition: max-width .6s var(--soft), opacity .4s var(--soft); }
.sc-fab:hover, .sc-fab:focus-visible { background: var(--paper); color: var(--ink); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.22); }
.sc-fab:hover .e, .sc-fab:focus-visible .e { max-width: 220px; opacity: 1; }
.sc-fab:hover svg { transform: translateX(6px); }
.sc-pop { position: fixed; z-index: 71; right: calc(120px * var(--z)); bottom: calc(108px * var(--z)); zoom: var(--z); width: 300px;
  background: var(--paper); color: var(--ink); border: 1px solid var(--ink); font-family: "Gilroy", "Outfit", sans-serif;
  box-shadow: 0 18px 50px rgba(0,0,0,.16); opacity: 0; transform: translateY(14px); transition: opacity .45s var(--soft), transform .45s var(--soft); }
.sc-pop.on { opacity: 1; transform: none; }
.sc-pop[hidden] { display: none; }
.sc-pop h2 { margin: 0; height: 66px; display: flex; align-items: center; justify-content: center; font: 400 20px/1 "Gilroy", "Outfit", sans-serif;
  letter-spacing: 6.2px; text-transform: uppercase; border-bottom: 1px solid var(--ink); }
.sc-x { position: absolute; right: 8px; top: 6px; width: 28px; height: 28px; border: 0; background: none; color: var(--ink); font: 300 22px/1 "Outfit", sans-serif; cursor: pointer; opacity: .6; }
.sc-x:hover { opacity: 1; }
.sc-intro { margin: 18px 21px 16px; font: 400 13px/1.35 "Gilroy", "Outfit", sans-serif; }
.sc-form { display: flex; flex-direction: column; gap: 19px; padding: 0 21px; }
.sc-form input, .sc-form textarea { width: 100%; box-sizing: border-box; border: 1px solid rgba(54,54,54,.6); background: transparent; color: var(--ink);
  font: 400 13px/1.3 "Gilroy", "Outfit", sans-serif; padding: 10px 8px; border-radius: 0; outline: none; transition: border-color .3s; }
.sc-form textarea { height: 113px; resize: none; }
.sc-form input:focus, .sc-form textarea:focus { border-color: var(--ink); }
.sc-form ::placeholder { color: rgba(54,54,54,.55); }
.sc-send { display: flex; justify-content: space-between; align-items: center; margin-top: -9px; }
.sc-send button { font: 400 9.8px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 3px; text-transform: uppercase; color: var(--ink); background: none;
  border: 1px solid rgba(54,54,54,.6); padding: 8px 12px; cursor: pointer; transition: background .3s, color .3s; }
.sc-send button:hover { background: var(--ink); color: var(--paper); }
.sc-status { margin: 0; font-size: 11px; opacity: .7; }
.sc-mail { display: flex; align-items: center; gap: 12px; margin-top: 22px; padding: 16px 21px; border-top: 1px solid var(--ink); color: var(--ink); text-decoration: none; font-size: 13px; }
.sc-mail small { display: block; font-size: 9.8px; letter-spacing: 3px; opacity: .55; margin-bottom: 5px; }
.sc-soc { display: flex; justify-content: center; gap: 16px; padding: 16px; border-top: 1px solid var(--ink); }
.sc-soc a { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; transition: background .3s; }
.sc-soc a:hover { background: rgba(54,54,54,.1); }
.sc-fab { cursor: pointer; }
.sc-fab[aria-expanded="true"] { background: var(--paper); color: var(--ink); }
.sc-fab[aria-expanded="true"] svg { transform: rotate(90deg); }
.sc-contact .sc-media { align-items: center; }
.sc-big { display: flex; align-items: center; justify-content: center; gap: 36px; width: 100%; height: 100%; background: var(--ink);
  color: var(--paper); font: 500 64px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 19px; text-transform: uppercase; text-decoration: none;
  transition: background .5s var(--soft), color .5s var(--soft); }
.sc-big svg { width: 54px; height: 48px; transition: transform .5s var(--soft); }
.sc-big:hover, .sc-big:focus-visible { background: var(--paper); color: var(--ink); }
.sc-big:hover svg { transform: translateX(10px); }
.sc-links { position: absolute; left: 137px; top: 271px; font: 400 15px/2.1 "Gilroy", "Outfit", sans-serif; }
.sc-links a { color: var(--ink); text-decoration: none; display: block; width: max-content; border-bottom: 1px solid transparent; line-height: 1.4; margin-bottom: 10px; }
.sc-links a:hover { border-color: var(--ink); }
"""

JS = """
(function () {
  var view = document.querySelector('.sc-view'), track = document.querySelector('.sc-track');
  var rows = [].slice.call(document.querySelectorAll('.sc-row'));
  var MIN = 0.3, PEEK = 72, TOP = 180, GAP = 13, F = 0, z = 1, col = document.querySelector('.sc-col');
  var vids = rows.map(function (r) { return r.querySelector('video'); });
  function size() {
    z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1;
    var H = innerHeight / z;
    F = Math.max(H - TOP - PEEK, 420);
    view.style.setProperty('--F', F + 'px');
    track.style.height = ((rows.length - 1) * (F + GAP) + H) + 'px';
    place();
  }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function place() {
    var p = Math.min(Math.max(scrollY / z / (F + GAP), 0), rows.length - 1);
    var k = Math.floor(p), t = p - k, y = -(F + GAP) * t, H = innerHeight / z;
    rows.forEach(function (r, i) {
      var g = i <= k ? 1 : i === k + 1 ? MIN + (1 - MIN) * ease(t) : MIN, last = i === rows.length - 1, h = F * g + (last ? PEEK * (i <= k ? 1 : i === k + 1 ? ease(t) : 0) : 0), top;
      if (i < k) { r.style.visibility = 'hidden'; return; }
      top = y; y += h + GAP;
      r.style.visibility = top > H ? 'hidden' : '';
      r.style.top = top + 'px'; r.style.height = h + 'px';
      r.style.setProperty('--g', g.toFixed(4));
      var v = vids[i]; if (v) { if (top < H - TOP - 40 && top + h > 0) { if (v.paused) v.play().catch(function () {}); } else if (!v.paused) v.pause(); }
    });
  }
  if (/[?&]grid/.test(location.search)) document.documentElement.classList.add('grid-on');
  var fab = document.querySelector('.sc-fab'), pop = document.getElementById('sc-pop');
  function openPop(on) {
    fab.setAttribute('aria-expanded', on); if (on) { pop.hidden = false; requestAnimationFrame(function () { pop.classList.add('on'); }); pop.querySelector('input').focus({ preventScroll: true }); }
    else { pop.classList.remove('on'); setTimeout(function () { if (!pop.classList.contains('on')) pop.hidden = true; }, 450); }
  }
  fab.addEventListener('click', function () { openPop(fab.getAttribute('aria-expanded') !== 'true'); });
  pop.querySelector('.sc-x').addEventListener('click', function () { openPop(false); fab.focus(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && fab.getAttribute('aria-expanded') === 'true') { openPop(false); fab.focus(); } });
  document.addEventListener('click', function (e) { if (fab.getAttribute('aria-expanded') === 'true' && !pop.contains(e.target) && !fab.contains(e.target)) openPop(false); });
  var form = pop.querySelector('form'), st = pop.querySelector('.sc-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { st.textContent = 'Please fill in all three fields.'; return; }
    st.textContent = 'Sending\u2026';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw 0; form.reset(); st.textContent = 'Thank you, message sent.'; })
      .catch(function () { st.textContent = 'Could not send. Please email me instead.'; });
  });
  addEventListener('resize', size);
  addEventListener('scroll', function () { requestAnimationFrame(place); }, { passive: true });
  size();
})();
"""

ARROW = ('<svg class="sc-arrow" viewBox="0 0 50 50" fill="none" aria-hidden="true">'
         '<circle cx="25" cy="25" r="24.5" stroke-width="1"/>'
         '<path d="M14 24.2H36L27.8 13.8" stroke-width="2.2" stroke-linecap="square" stroke-linejoin="round"/>'
         '<path d="M33.9 30.3L27.9 36.3" stroke-width="2.2" stroke-linecap="square"/></svg>')


def joints(xs):
    return "".join(f'<i class="j" style="left:{x - 2}px;top:-2px"></i>' for x in xs)


def media(m, fit):
    kind, src = m
    style = f'object-fit:{fit}'
    if kind == "video":
        poster = P + os.path.basename(src)[:-4] + ".webp"
        pa = f' poster="{poster}"' if os.path.exists(os.path.join(ROOT, poster)) else ""
        return f'<video src="{src}"{pa} muted loop playsinline preload="metadata" style="{style}"></video>'
    return f'<img src="{src}" alt="" decoding="async" style="{style}">'


def row(i, w):
    slug, title, field, year, place, about, m, fit = w
    n = len(WORKS)
    long = " long" if len(title) > 10 else ""
    lines = '<i class="hl" style="top:0"></i><i class="hl" style="bottom:0"></i>'
    lines += '<i class="v" style="left:87px;top:143px"></i><i class="v" style="left:557px"></i><i class="v" style="left:1390px"></i>'
    js = "".join(f'<i class="j" style="left:{x - 2}px;top:-2px"></i><i class="j jb" style="left:{x - 2}px"></i>' for x in (557, 1390))
    js += '<i class="j jb" style="left:85px"></i>'
    inner = "".join(f'<i class="j" style="left:{x - 2}px;top:{y - 2}px"></i>' for y in (143, 224) for x in (87, 257, 386, 557))
    return f"""<div class="sc-row">
{lines}{js}
<div class="in">
<span class="sc-title{long}"><b>{i + 1:02d}/</b>{html.escape(title)}</span>
<i class="sc-h" style="top:143px;left:0;width:557px"></i><i class="sc-h" style="top:224px"></i>
<i class="v" style="left:257px;top:143px;bottom:auto;height:81px"></i><i class="v" style="left:386px;top:143px;bottom:auto;height:81px"></i>{inner}
<span class="sc-f" style="left:87px;width:170px"><small>FIELD</small><span>{field}</span></span>
<span class="sc-f" style="left:257px;width:129px"><small>YEAR</small><span>{year}</span></span>
<span class="sc-f" style="left:386px;width:171px"><small>PLACE</small><span>{place}</span></span>
<span class="sc-about"><small>ABOUT</small>{html.escape(about)}</span>
<span class="sc-media"><span class="box">{media(m, fit)}</span></span>
<span class="sc-side"><span class="sc-count">{i + 1:02d} / {n:02d}</span><a class="sc-go" href="{slug}.html" aria-label="Open {html.escape(title)}">{ARROW}</a></span>
</div>
</div>"""


def contact():
    n = len(WORKS) + 1
    links = "".join(f'<a href="{u}" target="_blank" rel="noopener">{t}</a>' for t, u in SOCIAL)
    return f"""<div class="sc-row sc-contact">
<i class="v" style="left:87px"></i><i class="v" style="left:557px"></i><i class="v" style="left:1390px"></i>{joints([87, 557, 1390])}
<span class="sc-num">{n:02d}</span>
<span class="sc-title">Contact</span>
<i class="sc-h" style="top:143px"></i><i class="j" style="left:85px;top:141px"></i><i class="j" style="left:555px;top:141px"></i>
<span class="sc-f" style="left:87px;width:470px"><small>HAVE A PROJECT IN MIND?</small><span>I'd be happy to hear about it.</span></span>
<span class="sc-links"><a href="mailto:noajablon@gmail.com">noajablon@gmail.com</a>{links}</span>
<span class="sc-media"><a class="sc-big" href="work-with-me.html">Contact me<svg viewBox="0 0 38 34" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 17h36M20 1l16 16-16 16"/></svg></a></span>
<span class="sc-side"></span>
</div>"""


GRID_V = [(56, "56 no."), (87, "87"), (137, "137 text"), (257, "257"), (386, "386"), (557, "557"), (1390, "1390"), (1480, "1480")]
GRID_H = [("58px", "58 marquee"), ("130px", "130"), ("180px", "180 row top"), ("323px", "+143 title"), ("404px", "+224 field row"), ("calc(180px + var(--F))", "row bottom"),
          ("calc(193px + var(--F))", "gap 13 / next row")]


def grid():
    out = "".join(f'<i style="left:{x}px;top:0;bottom:0;width:1px"></i><b style="left:{x + 3}px;top:184px">{t}</b>' for x, t in GRID_V)
    out += "".join(f'<i style="top:{y};left:0;right:0;height:1px"></i><b style="top:{y};left:3px">{t}</b>' for y, t in GRID_H)
    return f'<div class="sc-grid" aria-hidden="true">{out}</div>'


ICONS = [("Behance", "https://www.behance.net/noajablon", "assets/img/1a710c2d6f4a60.svg", 22, 14),
         ("Instagram", "https://www.instagram.com/noaj.creative/", "assets/img/d0d99ff10c0164.svg", 23, 23),
         ("LinkedIn", "https://www.linkedin.com/in/noajablon/", "assets/img/373fad069254eb.svg", 21, 20)]


def popup():
    soc = "".join(f'<a href="{u}" target="_blank" rel="noopener" aria-label="{t}"><img src="{src}" alt="" width="{w}" height="{h}"></a>'
                  for t, u, src, w, h in ICONS)
    return f"""<div class="sc-pop" id="sc-pop" role="dialog" aria-modal="false" aria-labelledby="sc-pop-h" hidden>
<button class="sc-x" type="button" aria-label="Close">&times;</button>
<h2 id="sc-pop-h">Contact me</h2>
<p class="sc-intro">Have a project in mind? Get in touch \u2014 I\u2019ll be happy to discuss the details of our cooperation.</p>
<form class="sc-form" action="https://formspree.io/f/mgaoayek" method="POST" novalidate>
<input name="name" type="text" placeholder="Name and Surname" aria-label="Name and Surname" autocomplete="name" required>
<input name="email" type="email" placeholder="Email" aria-label="Email" autocomplete="email" required>
<textarea name="message" placeholder="Message" aria-label="Message" required></textarea>
<div class="sc-send"><p class="sc-status" aria-live="polite"></p><button type="submit">Send</button></div>
</form>
<a class="sc-mail" href="mailto:noajablon@gmail.com"><img src="assets/img/3f7ea14da518cf.webp" alt="" width="44" height="44"><span><small>EMAIL</small>noajablon@gmail.com</span></a>
<div class="sc-soc">{soc}</div>
</div>"""


def main():
    src = open(os.path.join(ROOT, "portfolio-classic.html")).read()
    soup = BeautifulSoup(src, "html.parser")
    head = src[:src.find("<body")]
    head = head.replace("page-home-main2", "page-scroll")
    head = head.replace("</head>", f'<style>{CSS}</style>\n</head>')
    hdr = "".join(str(soup.find(attrs={"data-node-id": nid})) for nid in ("286:5418", "434:575"))
    letters = "".join(f"<span>{c}</span>" for c in "PORTFOLIO")
    rows = "\n".join(row(i, w) for i, w in enumerate(WORKS))
    body_popup = popup()
    body = f"""<body class="page-scroll" data-page="scroll">
<div id="stage" class="stage"><div class="frame" style="position:relative">
{hdr}
<div class="sc-track"><div class="sc-view">
<div class="sc-mask" aria-hidden="true"><i class="hl" style="top:130px"></i><i class="hl" style="top:180px"></i><i class="vl" style="left:87px"></i><i class="vl" style="left:1390px"></i>
<i class="j" style="left:85px;top:128px"></i><i class="j" style="left:1388px;top:128px"></i><i class="j" style="left:85px;top:178px"></i><i class="j" style="left:555px;top:178px"></i><i class="j" style="left:1388px;top:178px"></i></div>
<div class="sc-col">
{rows}
</div>{grid()}</div></div>
</div></div>
<button class="sc-fab" type="button" aria-haspopup="dialog" aria-controls="sc-pop" aria-expanded="false"><span class="t">Contact me</span><svg viewBox="0 0 38 34" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 17h36M20 1l16 16-16 16"/></svg></button>
{body_popup}
<script>{JS}</script>
</body>
</html>
"""
    with open(os.path.join(ROOT, "portfolio.html"), "w") as f:
        f.write(head + body)
    print("wrote portfolio.html")


if __name__ == "__main__":
    main()
