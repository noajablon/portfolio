#!/usr/bin/env python3
"""Preview of the Portfolio page as one full-screen row per work (Home New Sketch grid).

Usage: python3 tools/build_scroll.py   (after tools/build.py)
Writes portfolio-scroll.html. The header (marquee + logos) is copied from the built portfolio.html;
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
     "Maskit is a speculative brand and immersive desert retreat that explores memory, cultural preservation, and storytelling through symbolic experiences.",
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
TAGS = {'maskit': ['Speculative', 'Brand identity', 'Experience'], 'mazor': ['Packaging', 'Brand identity', 'Food'], 'mnemo': ['AI', 'Product design', 'Archive'], 'stil': ['Wearable', 'Product design', 'Wellbeing'], 'lifta': ['Poster', 'Logo', 'Bilingual'], 'explainer': ['Animation', 'Storytelling', 'Interviews'], 'unmask-qatar': ['Campaign', 'Activism', 'Social media'], 'voices-from-the-desert': ['Editorial', 'Web design', 'Event'], 'miansi': ['Brand identity', 'Packaging', 'Collaboration'], 'sorora': ['Mobile app', 'Community', 'Safety']}
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
.sc-row { position: absolute; left: 0; width: 1480px; overflow: hidden; color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--ink); background: var(--paper); will-change: top, height; }
.sc-row .v { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--ink); }
.sc-row .j { position: absolute; width: 5px; height: 5px; border-radius: 1.6px; background: var(--ink); z-index: 2; }
.sc-num { position: absolute; left: 22px; top: 62px; font: 400 26px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 6.2px; }
.sc-title { position: absolute; left: 137px; top: 50px; font: 500 46px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 13px;
  text-transform: uppercase; white-space: nowrap; width: 400px; }
.sc-title.long { font-size: 32px; letter-spacing: 9px; top: 58px; }
.sc-h { position: absolute; left: 87px; width: 470px; height: 1px; background: var(--ink); }
.sc-f { position: absolute; top: 143px; height: 81px; padding: 22px 0 0 50px; }
.sc-f + .sc-f { border-left: 1px solid var(--ink); }
.sc-f small, .sc-about small { display: block; font: 400 9px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 2.79px; opacity: .55; margin-bottom: 14px; }
.sc-f span { font: 500 15px/1 "Gilroy", "Outfit", sans-serif; }
.sc-about { position: absolute; left: 137px; top: 271px; width: 370px; font: 400 15px/1.55 "Gilroy", "Outfit", sans-serif; }
.sc-media { position: absolute; top: 0; bottom: 0; left: 557px; width: 833px; display: flex; justify-content: center; overflow: hidden; }
.sc-media .box { height: 100%; width: calc(833px * var(--g, 1)); position: relative; overflow: hidden; background: #000; }
.sc-media .box > * { position: absolute; inset: 0; width: 100%; height: 100%; }
.sc-side { position: absolute; left: 1390px; width: 90px; top: 0; bottom: 0; }
.sc-count { position: absolute; left: 0; right: 0; top: 62px; text-align: center; font: 400 12px/1 "Gilroy", "Outfit", sans-serif; letter-spacing: 2.4px; }
.sc-arrow { position: absolute; left: 25px; top: 50%; width: 38px; height: 34px; margin-top: -17px; transition: transform .5s var(--soft); }
.sc-row:hover .sc-arrow, .sc-row:focus-visible .sc-arrow { transform: translateX(8px); }
.sc-row .box > * { transition: transform 1.2s var(--soft); }
.sc-row:hover .box > * { transform: scale(1.03); }
.sc-tags { position: absolute; left: 137px; width: 400px; padding-top: 44px; display: flex; flex-wrap: wrap; gap: 12px 10px; font: 400 12px/1 "Gilroy", "Outfit", sans-serif; }
.sc-tags small { width: 100%; font-size: 9px; letter-spacing: 2.79px; opacity: .55; margin-bottom: 8px; }
.sc-tags em { font-style: normal; border: 1px solid var(--ink); border-radius: 20px; padding: 8px 15px; }
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
  var MIN = 0.3, PEEK = 72, TOP = 180, F = 0, z = 1;
  var vids = rows.map(function (r) { return r.querySelector('video'); });
  function size() {
    z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1;
    var H = innerHeight / z;
    F = Math.max(H - TOP - PEEK, 300);
    track.style.height = ((rows.length - 1) * F + H) + 'px';
    place();
  }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function place() {
    var p = Math.min(Math.max(scrollY / z / F, 0), rows.length - 1);
    var k = Math.floor(p), t = p - k, y = -F * t, H = innerHeight / z;
    rows.forEach(function (r, i) {
      var g = i <= k ? 1 : i === k + 1 ? MIN + (1 - MIN) * ease(t) : MIN, last = i === rows.length - 1, h = F * g + (last ? PEEK * (i <= k ? 1 : i === k + 1 ? ease(t) : 0) : 0), top;
      if (i < k) { r.style.visibility = 'hidden'; return; }
      top = y; y += h;
      r.style.visibility = top > H ? 'hidden' : '';
      r.style.top = top + 'px'; r.style.height = h + 'px';
      r.style.setProperty('--g', g.toFixed(4));
      var v = vids[i]; if (v) { if (top < H - TOP - 40 && top + h > 0) { if (v.paused) v.play().catch(function () {}); } else if (!v.paused) v.pause(); }
    });
  }
  addEventListener('resize', size);
  addEventListener('scroll', function () { requestAnimationFrame(place); }, { passive: true });
  size();
})();
"""

ARROW = ('<svg class="sc-arrow" viewBox="0 0 38 34" fill="none" stroke="currentColor" stroke-width="1.6">'
         '<path d="M0 17h36M20 1l16 16-16 16"/></svg>')


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
    TAGY = 430
    long = " long" if len(title) > 10 else ""
    return f"""<a class="sc-row" href="{slug}.html" aria-label="{html.escape(title)}">
<i class="v" style="left:87px"></i><i class="v" style="left:557px"></i><i class="v" style="left:1390px"></i>{joints([87, 557, 1390])}
<span class="sc-num">{i + 1:02d}</span>
<span class="sc-title{long}">{html.escape(title)}</span>
<i class="sc-h" style="top:143px"></i><i class="sc-h" style="top:224px"></i>
<i class="j" style="left:85px;top:141px"></i><i class="j" style="left:555px;top:141px"></i><i class="j" style="left:85px;top:222px"></i><i class="j" style="left:555px;top:222px"></i>
<i class="j" style="left:255px;top:141px"></i><i class="j" style="left:384px;top:141px"></i><i class="j" style="left:255px;top:222px"></i><i class="j" style="left:384px;top:222px"></i>
<span class="sc-f" style="left:87px;width:170px"><small>FIELD</small><span>{field}</span></span>
<span class="sc-f" style="left:257px;width:129px;padding-left:30px"><small>YEAR</small><span>{year}</span></span>
<span class="sc-f" style="left:386px;width:171px;padding-left:30px"><small>PLACE</small><span>{place}</span></span>
<span class="sc-about"><small>ABOUT</small>{html.escape(about)}</span>
<i class="sc-h" style="top:{TAGY}px"></i><i class="j" style="left:85px;top:{TAGY - 2}px"></i><i class="j" style="left:555px;top:{TAGY - 2}px"></i>
<span class="sc-tags" style="top:{TAGY}px"><small>TAGS</small>{"".join(f"<em>{html.escape(t)}</em>" for t in TAGS[slug])}</span>
<span class="sc-media"><span class="box">{media(m, fit)}</span></span>
<span class="sc-side"><span class="sc-count">{i + 1:02d} / {n:02d}</span>{ARROW}</span>
</a>"""


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


def main():
    src = open(os.path.join(ROOT, "portfolio.html")).read()
    soup = BeautifulSoup(src, "html.parser")
    head = src[:src.find("<body")]
    head = head.replace("<title>Portfolio</title>", "<title>Portfolio (scroll preview)</title>")
    head = head.replace("</head>", f'<meta name="robots" content="noindex">\n<style>{CSS}</style>\n</head>')
    hdr = "".join(str(soup.find(attrs={"data-node-id": nid})) for nid in ("286:5418", "434:575"))
    letters = "".join(f"<span>{c}</span>" for c in "PORTFOLIO")
    rows = "\n".join(row(i, w) for i, w in enumerate(WORKS))
    body = f"""<body class="page-scroll" data-page="scroll">
<div id="stage" class="stage"><div class="frame" style="position:relative">
{hdr}
<div class="sc-track"><div class="sc-view">
<div class="sc-mask" aria-hidden="true"><i class="hl" style="top:130px"></i><i class="hl" style="top:180px"></i><i class="vl" style="left:87px"></i><i class="vl" style="left:1390px"></i>
<i class="j" style="left:85px;top:128px"></i><i class="j" style="left:1388px;top:128px"></i><i class="j" style="left:85px;top:178px"></i><i class="j" style="left:555px;top:178px"></i><i class="j" style="left:1388px;top:178px"></i></div>
<div class="sc-col">
{rows}
</div></div></div>
</div></div>
<a class="sc-fab" href="work-with-me.html"><span class="t">Contact me</span><span class="e">noajablon@gmail.com</span><svg viewBox="0 0 38 34" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 17h36M20 1l16 16-16 16"/></svg></a>
<script>{JS}</script>
</body>
</html>
"""
    with open(os.path.join(ROOT, "portfolio-scroll.html"), "w") as f:
        f.write(head + body)
    print("wrote portfolio-scroll.html")


if __name__ == "__main__":
    main()
