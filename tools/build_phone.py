#!/usr/bin/env python3
"""Phone layout of the artwork pages, straight from the Figma phone frames.

Usage: python3 tools/build_phone.py   (after tools/build.py, before tools/stamp.py)
Reads tools/phone/NN.json (the "Phone version" frames, exported as compact layout data) and writes a
<div class="ph"> into each artwork page, between <!--ph--> markers. Desktop never shows it; on a phone
site.js puts it under the header (.mh) and scales it from 390 wide to the screen.

Layout data: each element is [kind, x, y, w, h, attrs, children?], x/y relative to its parent.
  f frame, i image, v video, t text, s vector (inline icon or exported svg), b button, r rectangle.
"""
import glob
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PH = os.path.join(ROOT, "tools", "phone")
TOP = 123.8  # the header (marquee, icons, PORTFOLIO) is site.js's .mh; the layout starts under its rule

# About Me and Work With Me (11.json, 12.json) use the same phone layout.
EXTRA = [("about", "11.json"), ("work-with-me", "12.json")]
# Links laid over a drawn button: page -> [(x, y, w, h, href, label)]
LINKS = {"about": [(20, 1097, 214.7, 45, "https://drive.google.com/file/d/1mGYaaXfdkSXDLcc07iWEXfS7u2k7PoNW/view?usp=sharing",
                    "View my resume")]}
# Work With Me's picture strip (Figma turns the desktop's vertical strip on its side): the same pictures, upright, in a row
# that drifts sideways (site.js moves it; a swipe moves it too).
STRIP = [f"assets/img/wwm-strip-{i}.webp" for i in range(1, 7)]

PAGES = ["maskit", "mazor", "mnemo", "stil", "lifta", "explainer", "unmask-qatar", "voices-from-the-desert", "miansi", "sorora"]

ICONS = json.load(open(os.path.join(PH, "icons.json")))
PLAY = {"921:3732", "921:3813", "921:3854", "921:4563", "921:4150", "921:4187", "921:4220", "921:4235", "921:4818",
        "921:5067", "921:5086", "921:5122", "921:5105", "921:958", "921:4420", "921:4988"}
AGAIN = {"921:3739", "921:3820", "921:3861", "921:4570", "921:4157", "921:4194", "921:4227", "921:4242", "921:4825",
         "921:5074", "921:5093", "921:5129", "921:5112", "921:965", "921:4427", "921:4995"}
MUTE = {"921:3723", "921:3804", "921:3845"}           # speaker, X and waves in one icon
SOUND = {"932:965", "932:967", "932:961"}              # ring of a three-part sound button
SOUND_X = {"932:981", "932:983", "932:977"}
NEXT = {"921:3756", "932:1155", "932:1159"}            # gallery arrows
WAVES = {"932:969", "932:973", "932:975"}              # sound waves of a three-part sound button
# The drawn video buttons differ in size and place from frame to frame; they are left out and every video gets
# the same set instead: pause and play again at the bottom left of its box, sound at the bottom right.
CTRL = PLAY | AGAIN | MUTE | SOUND | SOUND_X | WAVES
RING, INSET, GAP = 30, 10, 6
AUDIO = {"explainer-film", "lifta-logo", "maskit-brandbook", "maskit-film", "mnemo-film", "sorora-film", "stil-app",
         "stil-film", "unmask-film"}  # videos with a sound track get the sound button
# Vectors exported whole (tools/phone assets): node id -> file
SVG = {"947:3121": "title-miansi.svg", "932:2458": "title-sorora.svg", "921:3761": "maskit-symbols.svg",
       "921:4265": "stil-artifacts.svg"}
# Frames drawn in fonts the site does not have, or full of vectors: (page, x, y) -> picture
FRAMES = {("mnemo", 20, 203.2): "title-mnemo.svg", ("stil", 26.2, 203.2): "title-stil.svg",
          ("explainer", 20, 203.2): "title-explainer.svg",
          ("stil", 28, 941.6): "stil-stage1-bg.webp", ("stil", 28, 1419.5): "stil-stage2-bg.webp",
          ("stil", 28, 1897.4): "stil-stage3-bg.webp", ("stil", 28, 2793.8): "stil-ai-bg.webp"}
VIDEO_NAMES = {"Stage 3 1": "stil-stage3"}
# Pictures Noa replaced in the phone frames (the desktop pages keep theirs)
SWAP = {"assets/img/gal-mazor-1.webp": "assets/img/mazor-gal1-ph.webp",
        "assets/img/unmask-img5063.webp": "assets/img/unmask-img5063-ph.webp"}
# Grey placeholder boxes in the phone frames, filled with the desktop page's media for that spot:
# (page, frame x, y) -> extra children drawn first in that frame; frames listed in DROP are left out.
ADD = {("explainer", 28, 1806): [["v", 0, 0, 334, 176.9, {"n": "video:poster/salt-pour.webp"}]]}
# Media drawn last in a frame, over its other contents: the clock sits on the squared paper.
ADD_TOP = {("explainer", 28, 1476): [["v", 74.9, 72, 174.6, 157.1, {"n": "video:poster/explainer-clock.webp"}]]}
DROP = set()
GIFS = ["explainer-process", "explainer-glass", "explainer-clock", "salt-pour", "voices-gif"]  # loop like gifs, no buttons
BLEND = {"explainer-clock", "explainer-process"}  # white-ground animation over the squared paper
# Text set in capitals in Figma (text case, not the characters)
UPPER = {("maskit", t) for t in ["01/ Maskit", "The brief", "Secret language", "Geometric patterns", "The bird", "The flower",
                                 "The eye", "The Negev"]}


def n(v):
    return f"{round(v, 2):g}"


def box(x, y, w, h):
    return f"left:{n(x)}px;top:{n(y)}px;width:{n(w)}px;height:{n(h)}px"


def color(c):
    if not c:
        return ""
    hx, _, op = c.partition("/")
    if op:
        r, g, b = (int(hx[i:i + 2], 16) for i in (0, 2, 4))
        return f"rgba({r},{g},{b},{op})"
    return "#" + hx


def svg_size(f):
    head = open(os.path.join(ROOT, "assets", "phone", f)).read(300)
    return float(re.search(r'width="([\d.]+)"', head).group(1)), float(re.search(r'height="([\d.]+)"', head).group(1))


def svg_origin(f):
    """Where the picture's viewBox starts (a negative origin leaves room for a blur round the drawing)."""
    m = re.search(r'viewBox="(-?[\d.]+) (-?[\d.]+)', open(os.path.join(ROOT, "assets", "phone", f)).read(300))
    return float(m.group(1)), float(m.group(2))


def strip_ctrls(kids):
    """Leave out drawn video buttons: their icons and the rings round them."""
    icons = [(c[1] + c[3] / 2, c[2] + c[4] / 2) for c in kids if c[0] == "s" and c[5]["id"] in CTRL]
    def ring(c):
        return (c[0] == "r" and c[3] <= 40 and c[4] <= 40 and
                any(c[1] <= x <= c[1] + c[3] and c[2] <= y <= c[2] + c[4] for x, y in icons))
    return [c for c in kids if not (c[0] == "s" and c[5]["id"] in CTRL) and not ring(c)]


class Page:
    def __init__(self, slug, data, nav):
        self.slug, self.d, self.nav = slug, data, nav
        self.videos = []   # (abs x, y, w, h, idx)
        self.ctrls = []    # (html index, abs centre) resolved to a video at the end

    def media_src(self, name):
        if name in VIDEO_NAMES:
            return "video", VIDEO_NAMES[name]
        kind, _, path = name.partition(":")
        if kind == "video":
            return "video", os.path.splitext(os.path.basename(path))[0]
        stem = os.path.splitext(os.path.basename(path))[0]
        if path.startswith("assets/poster/") and os.path.exists(os.path.join(ROOT, "assets", "video", stem + ".mp4")):
            return "video", stem
        if not os.path.exists(os.path.join(ROOT, path)):
            raise SystemExit(f"{self.slug}: missing {path}")
        return kind, path

    def text(self, e):
        _, x, y, w, h, a = e[:6]
        st = []
        if "rot" in a and re.fullmatch(r"\d+\.\d+", "".join(s[0] for s in a["s"])):
            # Section numbers stand upright and small at the top of their section (Noa's 1.1 in Figma):
            # 11px under the section's top rule, in the 28px margin.
            top = max(g[1] for g in self.d["grid"] if not g[4] and g[2] >= 300 and g[1] < y)
            a = dict(a, au="W", nh=12, s=[[s[0], s[1], 10, 2 if len(s[0]) < 4 else 1, 0, s[5]] for s in a["s"]])
            st.append(box(6 if len(a["s"][0][0]) < 4 else 4, top + 11, 24, 12))
        elif "rot" in a:
            nw, nh = a["nw"], a["nh"]
            st.append(box(x + (w - nw) / 2, y + (h - nh) / 2, nw, nh) + f";transform:rotate({-a['rot']:g}deg)")
        else:
            st.append(box(x, y, w, h))
        if a.get("op"):
            st.append(f"opacity:{a['op']}")
        if a["al"] == "C":
            st.append("text-align:center")
        st.append("white-space:nowrap" if a["au"] == "W" else "white-space:normal")
        if (self.slug, "".join(s[0] for s in a["s"])) in UPPER:
            st.append("text-transform:uppercase")
        spans = []
        for s, font, size, ls, lh, col in a["s"]:
            if font[0] != "G":
                raise SystemExit(f"{self.slug}: text in {font} needs a picture: {s[:30]}")
            css = [f"font-size:{n(size)}px", "font-weight:" + ("500" if font == "GMedium" else "400")]
            if ls:
                css.append(f"letter-spacing:{n(ls)}px")
            if lh:
                css.append(f"line-height:{n(lh)}px")
            elif a["au"] == "W" and "\n" not in s:
                css.append(f"line-height:{n(a.get('nh', h))}px")
            else:
                css.append("line-height:normal")
            if not spans:  # the paragraph's own line box follows its first run
                st += [c for c in css if c.startswith(("font-size", "line-height"))]
            if col:
                css.append("color:" + color(col))
            spans.append(f'<span style="{";".join(css)}">{html.escape(s).replace(chr(10), "<br>")}</span>')
        return f'<div class="pt" style="{";".join(st)}">{"".join(spans)}</div>'

    def render(self, ch, ax, ay, ctx):
        out, last = [], None
        for e in strip_ctrls(ch):
            k, x, y, w, h, a = e[:6]
            if k == "r":
                key = (x, y, w, h, json.dumps(a, sort_keys=True))
                if key == last or (not a.get("c") and not a.get("st")):
                    continue
                last = key
                if ctx.get("gal") and a.get("c") == "ffffff" and w < 8:
                    out.append(f'<i class="gd" style="{box(x, y, w, h)};border-radius:50%"></i>')
                    continue
                st = [box(x, y, w, h)]
                if a.get("c"):
                    st.append("background:" + color(a["c"]))
                if a.get("r"):
                    st.append(f"border-radius:{n(min(a['r'], w / 2, h / 2))}px")
                if a.get("st"):
                    st.append(f"border:{n(a['st'][1])}px solid {color(a['st'][0])}")
                if a.get("op"):
                    st.append(f"opacity:{a['op']}")
                out.append(f'<i class="pr" style="{";".join(st)}"></i>')
                continue
            last = None
            if k == "t":
                out.append(self.text(e))
            elif k in "iv":
                kind, src = self.media_src(a["n"])
                st = [box(x, y, w, h)]
                if a.get("op"):
                    st.append(f"opacity:{a['op']}")
                if a.get("r"):
                    st.append(f"border-radius:{n(a['r'])}px")
                if kind == "video":
                    if src in BLEND:
                        st.append("mix-blend-mode:multiply")
                    self.videos.append((ax + x, ay + y, w, h, len(self.videos), ctx.get("id"), src))
                    out.append(f'<video class="pvid" data-v="{len(self.videos) - 1}" style="{";".join(st)}" muted loop playsinline '
                               f'preload="none" poster="assets/poster/{src}.webp" src="assets/video/{src}.mp4"></video>')
                elif ctx.get("gal") and "/gal-" in src:
                    m = re.match(r"(.*/gal-[\w-]+?-)\d+\.webp$", src)
                    files = sorted(glob.glob(os.path.join(ROOT, m.group(1) + "*.webp")),
                                   key=lambda f: int(re.search(r"-(\d+)\.webp$", f).group(1)))
                    for i, f in enumerate(files):
                        rel = os.path.relpath(f, ROOT)
                        rel = SWAP.get(rel, rel)
                        out.append(f'<img class="gs{" on" if i == 0 else ""}" style="{";".join(st)}" src="{rel}" alt="" '
                                   f'decoding="async" loading="lazy">')
                else:
                    fit = "contain" if kind == "img-fit" else "cover"
                    src = SWAP.get(src, src)
                    out.append(f'<img style="{";".join(st)};object-fit:{fit}" src="{src}" alt="" decoding="async" loading="lazy">')
            elif k == "s":
                sid = a["id"]
                if sid in SVG:
                    sw, sh = svg_size(SVG[sid])
                    out.append(f'<img style="{box(x, y, sw, sh)}" src="assets/phone/{SVG[sid]}" alt="">')
                    continue
                svg = ICONS.get(sid)
                if svg is None:
                    if not ctx.get("baked"):
                        raise SystemExit(f"{self.slug}: no svg for {sid}")
                    continue
                svg = re.sub(r'<svg width="[\d.]+" height="[\d.]+"', '<svg aria-hidden="true"', svg, count=1)
                if sid in MUTE:
                    paths = svg.split("<path ")
                    svg = paths[0] + "<path " + paths[1] + '<path class="mx" ' + paths[2] + '<path class="mw" ' + paths[3]
                cls = "pi px" if sid in SOUND_X else "pi"
                out.append(f'<span class="{cls}" style="{box(x, y, w, h)}">{svg}</span>')
                act = ("play" if sid in PLAY else "again" if sid in AGAIN else "mute" if sid in MUTE | SOUND
                       else "next" if sid in NEXT else None)
                if act:
                    # The button covers the ring drawn under the icon (the rectangle around its centre).
                    cx, cy = x + w / 2, y + h / 2
                    ring = next((r for r in reversed(ch[:ch.index(e)]) if r[0] == "r" and r[1] <= cx <= r[1] + r[3]
                                 and r[2] <= cy <= r[2] + r[4] and r[3] < 60), None)
                    bx = (ring[1], ring[2], ring[3], ring[4]) if ring else (x, y, w, h)
                    if act == "next":
                        bx = (cx - 22, cy - 22, 44, 44)
                    label = {"play": "Pause", "again": "Play from the start", "mute": "Sound on", "next": "Next picture"}[act]
                    tok = ""
                    if act != "next":
                        tok = f' data-for="@{len(self.ctrls)}@"'
                        self.ctrls.append((ax + cx, ay + cy, ctx.get("id")))
                    out.append(f'<button type="button" class="pb"{tok} data-a="{act}" aria-label="{label}" style="{box(*bx)}"></button>')
            elif k == "b":
                which = "prev" if a["n"].startswith("Previous") else "top" if a["n"].startswith("To Top") else "next"
                href = {"prev": self.nav[0], "top": "#top", "next": self.nav[1]}[which]
                label = {"prev": "Previous design", "top": "To top", "next": "Next design"}[which]
                out.append(f'<a class="pbt{" totop-ph" if which == "top" else ""}" href="{href}" aria-label="{label}" '
                           f'style="{box(x, y, w, h)}"><img src="assets/phone/btn-{which}.svg" alt=""></a>')
            elif k == "f" and a.get("nm") == "strip":
                from PIL import Image
                imgs = []
                for f in STRIP + STRIP:  # twice, so the row wraps without a gap
                    iw, ih = Image.open(os.path.join(ROOT, f)).size
                    imgs.append(f'<img src="{f}" alt="" decoding="async" style="height:{n(h)}px;width:{n(iw * h / ih)}px">')
                out.append(f'<div class="pstrip" style="{box(0, y, 390, h)}"><div class="pstrip-in">{"".join(imgs)}</div></div>')
            elif k == "f":
                key = (self.slug, round(x, 1), round(y, 1))
                if ctx.get("top") and key in DROP:
                    continue
                pic = FRAMES.get((self.slug, round(x, 1), round(y, 1))) if ctx.get("top") else None
                if pic and pic.endswith(".svg"):
                    sw, sh = svg_size(pic)
                    vx, vy = svg_origin(pic)
                    # Titles with shadows or blur go out as pictures drawn from the svg (phone browsers draw svg
                    # filters coarsely, which leaves an outline round the letters).
                    src = pic[:-4] + ".webp" if os.path.exists(os.path.join(ROOT, "assets", "phone", pic[:-4] + ".webp")) else pic
                    out.append(f'<img style="{box(x + vx, y + vy, sw, sh)}" src="assets/phone/{src}" alt="">')
                    continue
                st = [box(x, y, w, h)]
                if a.get("clip"):
                    st.append("overflow:hidden")
                if a.get("c"):
                    st.append("background:" + color(a["c"]))
                if a.get("r"):
                    st.append(f"border-radius:{n(a['r'])}px")
                kids = e[6]
                if ctx.get("top") and key in ADD:  # the media replaces the grey placeholder
                    kids = ADD[key] + [c for c in kids if not (c[0] == "r" and c[5].get("c") == "d9d6d4")]
                if ctx.get("top") and key in ADD_TOP:
                    kids = kids + ADD_TOP[key]
                gal = any(c[0] == "i" and "/gal-" in c[5].get("n", "") for c in kids)
                inner = []
                if pic:  # a picture of the frame, then only its buttons on top
                    inner.append(f'<img style="{box(0, 0, w, h)}" src="assets/phone/{pic}" alt="" decoding="async" loading="lazy">')
                    kids = []
                inner += self.render(kids, ax + x, ay + y, {"gal": gal, "baked": bool(pic), "id": id(e)})
                out.append(f'<div class="pf{" pgal" if gal else ""}" style="{";".join(st)}">{"".join(inner)}</div>')
        return out

    def controls(self):
        """Pause, play again and (for a video with sound) sound buttons, in the corners of the video's box: the
        section between the rules above and below it, inside the side rules. Looping gifs get none."""
        rules = sorted(g[1] for g in self.d["grid"] if not g[4] and g[2] >= 300)
        out = []
        for x, y, w, h, i, _, src in self.videos:
            if src in GIFS:
                continue
            cy = y + h / 2
            bottom = min(r for r in rules if r > cy)
            by = bottom - INSET - RING
            spots = [("play", 28 + INSET), ("again", 28 + INSET + RING + GAP)]
            if src in AUDIO:
                spots.append(("mute", 362 - INSET - RING))
            for act, bx in spots:
                out.append(f'<i class="pr" style="{box(bx, by, RING, RING)};background:rgba(54,54,54,0.3);'
                           f'border:0.75px solid #fff;border-radius:50%"></i>')
                out.append(self.icon(act, bx, by))
                label = {"play": "Pause", "again": "Play from the start", "mute": "Sound on"}[act]
                out.append(f'<button type="button" class="pb" data-for="{i}" data-a="{act}" aria-label="{label}" '
                           f'style="{box(bx, by, RING, RING)}"></button>')
        return out

    def icon(self, act, bx, by):
        sid, iw, ih = {"play": ("921:4988", 13.5, 13.5), "again": ("921:4995", 13.5, 13.5), "mute": ("921:3723", 15, 12)}[act]
        svg = re.sub(r'<svg width="[\d.]+" height="[\d.]+"', '<svg aria-hidden="true"', ICONS[sid], count=1)
        if act == "mute":
            paths = svg.split("<path ")
            svg = paths[0] + "<path " + paths[1] + '<path class="mx" ' + paths[2] + '<path class="mw" ' + paths[3]
        return f'<span class="pi" style="{box(bx + (RING - iw) / 2, by + (RING - ih) / 2, iw, ih)}">{svg}</span>'

    def build(self):
        d = self.d
        ch = [e for e in d["ch"] if e[2] + e[4] > TOP + 1]
        body = self.render(ch, 0, 0, {"top": True})
        for x, y, w, h, j in d["grid"]:
            if y < TOP + 0.5:
                continue
            if j:
                body.append(f'<i class="pj" style="{box(x, y, w, h)}"></i>')
            else:
                body.append(f'<i class="pl" style="{box(x, y, w, h)}"></i>')
        for x, y, w, h, href, label in LINKS.get(self.slug, []):
            ext = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
            body.append(f'<a class="plink" href="{html.escape(href)}"{ext} aria-label="{label}" style="{box(x, y, w, h)}"></a>')
        body += self.controls()
        # Each control drives the video it sits on (or the nearest one).
        inner = "".join(body)
        for t, (cx, cy, fid) in enumerate(self.ctrls):
            def dist(v):
                vx, vy, vw, vh, _, vf, _s = v
                return (vf != fid) * 1e9 + max(vx - cx, 0, cx - vx - vw) ** 2 + max(vy - cy, 0, cy - vy - vh) ** 2
            inner = inner.replace(f'"@{t}@"', f'"{min(self.videos, key=dist)[4]}"', 1)
        return (f'<!--ph--><div class="ph" style="height:{n(d["h"] - TOP)}px"><div class="ph-in" '
                f'style="top:{n(-TOP)}px;height:{n(d["h"])}px">{inner}</div></div><!--/ph-->')


def main():
    jobs = [(slug, f"{i + 1:02d}.json", (PAGES[i - 1] + ".html", PAGES[(i + 1) % len(PAGES)] + ".html")) for i, slug in enumerate(PAGES)]
    for slug, fn, nav in jobs + [(slug, fn, None) for slug, fn in EXTRA]:
        data = json.load(open(os.path.join(PH, fn)))
        block = Page(slug, data, nav).build()
        path = os.path.join(ROOT, slug + ".html")
        src = open(path).read()
        src = re.sub(r"<!--ph-->.*?<!--/ph-->", "", src, flags=re.S)
        src, k = re.subn(r'(<div [^>]*class="[^"]*\bframe\b[^"]*"[^>]*>)', lambda m: m.group(1) + block, src, count=1)
        assert k == 1, slug
        open(path, "w").write(src)
        print(slug, len(block))


if __name__ == "__main__":
    main()
