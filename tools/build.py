#!/usr/bin/env python3
"""Assembles the static site from the converted Figma fragments.

Usage: python3 tools/build.py
Reads src/fragments/*.html, writes the pages to the repo root.
Images: a fragment's assets/img/<name> is rewritten to the optimized
assets/img/<stem>.webp (or .svg) when it exists, else to assets/src-img/<name>
(the untouched Figma originals, kept out of git; see tools/optimize_images.py).
"""
import json
import os
import re
import sys

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAG = os.path.join(ROOT, "src", "fragments")

# page file, fragment, title, design height, fixed node ids (besides the Marquee)
PAGES = [
    ("index.html", "entrance-main", "Noa Jablon", 2056, []),
    ("portfolio.html", "home-main2", "Portfolio", 2724, [
        "309:400", "309:385", "362:2093", "362:2097", "362:2101", "362:2107", "362:2123", "362:2131",
        "362:2132", "362:2134", "620:13343", "362:2143", "362:2151", "307:528", "362:2109", "362:2116",
        "362:2136", "362:2144", "362:2152", "362:2124", "307:444", "434:575", "286:5229", "301:353",
        "362:2211", "362:2212", "647:1856", "623:873", "623:875", "623:877"]),
    ("about.html", "about-me", "About Me", 820, [
        "580:11865", "580:11869", "580:11873", "580:11876", "580:11877", "580:11878", "580:11879",
        "580:11880", "580:11881", "580:11882", "580:11883", "580:11889", "580:11895", "580:11901",
        "580:11907", "580:11913", "580:11919", "580:11925", "580:11926", "580:11927", "647:1856",
        "623:879", "623:881", "623:883"]),
    ("work-with-me.html", "work-with-me", "Work With Me", 1083, []),
    ("maskit.html", "maskit", "Maskit", 6165, ["462:878"]),
    ("mazor.html", "mazor", "Mazor", 4081, ["462:982"]),
    ("mnemo.html", "mnemo", "Mnemo", 4081, []),
    ("stil.html", "stil", "Stil", 3263, []),
    ("lifta.html", "lifta", "Lifta", 4321, []),
    ("explainer.html", "explainer", "Explainer", 2392, []),
    ("unmask-qatar.html", "unmask-qatar", "Unmask Qatar", 5533, []),
    ("voices-from-the-desert.html", "voices-from-the-desert", "Voices from the Desert", 3377, []),
    ("miansi.html", "miansi", "Miansi", 5703, []),
    ("sorora.html", "sorora", "Sorora", 2334, []),
]
ARTWORKS = ["maskit", "mazor", "mnemo", "stil", "lifta", "explainer", "unmask-qatar",
            "voices-from-the-desert", "miansi", "sorora"]

# Home row anchors -> artwork page
ROWS = {"297:304": "maskit", "298:319": "mazor", "298:345": "mnemo", "683:1767": "stil",
        "298:372": "lifta", "298:397": "explainer", "298:418": "unmask-qatar",
        "298:438": "voices-from-the-desert", "298:458": "miansi", "386:1324": "sorora"}

CONTACT = ["mailto:noajablon@gmail.com", "https://www.behance.net/noajablon",
           "https://www.instagram.com/noaj.creative/", "https://www.linkedin.com/in/noajablon/"]

# Video slots: node id (or data-name) -> ("video", file) or ("poster", file)
V = "assets/video/"
P = "assets/poster/"
MEDIA = {
    "entrance-main": {"331:1393": ("poster", "voices-film2"), "331:1397": ("poster", "sorora-film")},
    "explainer": {"462:5245": ("poster", "explainer-layer9"), "462:5248": ("poster", "explainer-glass"),
                  "486:5257": ("video", "explainer-film"), "462:5246": ("video", "salt-pour")},
    "home-main2": {"name:Artifact 2 3": ("poster", "stil-artifact"),
                   "I298:372;286:5268": ("poster", "lifta-motion"),
                   "I298:397;286:5270": ("poster", "sorora-film"),
                   "I386:1324;408:488": ("poster", "sorora-film"),
                   "I386:1324;608:13277": ("poster", "sorora-film")},
    "maskit": {"414:2087": ("missing", ""), "414:2090": ("missing", ""), "414:2092": ("poster", "maskit-journal")},
    "mazor": {"441:1536": ("video", "mazor-website"), "561:5736": ("poster", "mazor-phone")},
    "mnemo": {"462:1261": ("poster", "mnemo-film")},
    "stil": {"650:15125": ("poster", "stil-film"),
             "name:Artifact 2 3": ("poster", "stil-artifact"), "650:15993": ("poster", "stil-screen1"),
             "650:18218": ("poster", "stil-screen2"), "650:18568": ("poster", "stil-screen3"),
             "650:18573": ("poster", "stil-screen4")},
    "lifta": {"462:2146": ("poster", "lifta-motion")},
    "unmask-qatar": {"414:2503": ("poster", "unmask-film")},
    "voices-from-the-desert": {"462:3407": ("poster", "voices-film1"), "462:3437": ("poster", "voices-film2")},
    "sorora": {"462:2469": ("poster", "sorora-film")},
}

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="Noa Jablon, multidisciplinary designer: branding, UX/UI, typography and illustration.">
<link rel="icon" href="assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Kulim+Park:wght@300;400;600&display=swap">
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.style.setProperty('--z', Math.max(document.documentElement.clientWidth || innerWidth, 320) / 1480);document.documentElement.classList.add('js');if('onpagereveal' in window&&CSS.supports('view-transition-name: a'))document.documentElement.classList.add('vt');</script>
</head>
<body class="page-{slug}" data-page="{slug}">
"""


def cls_add(el, *names):
    el["class"] = list(el.get("class", [])) + list(names)


def find_id(soup, nid):
    if nid.startswith("name:"):
        return soup.find_all(attrs={"data-name": nid[5:]})
    return soup.find_all(attrs={"data-node-id": nid})


FRAME_H = [0]


def single_line(p):
    """True when the Figma text box is only one line tall (so the web font must not wrap it)."""
    if p.find("br") or "\n" in p.get_text().strip():
        return False
    cls = " ".join(p.get("class", []))
    h = re.search(r"(?:^| )h-\[([\d.]+)px\]", cls)
    fs = re.search(r"text-\[([\d.]+)px\]", cls)
    lh = re.search(r"leading-\[([\d.]+)(px)?\]", cls)
    if not h or not fs:
        return False
    line = float(fs.group(1)) * 1.25
    if lh:
        line = float(lh.group(1)) if lh.group(2) else float(lh.group(1)) * float(fs.group(1))
    return float(h.group(1)) < line * 1.6


def mark_fixed(el):
    if "contents" in el.get("class", []):
        for c in el.find_all(recursive=False):
            mark_fixed(c)
        return
    cls_add(el, "fx")
    # Percentage insets refer to the page frame; a fixed element would resolve them
    # against the window, so turn them into the pixel box they describe.
    for c in list(el.get("class", [])):
        m = re.fullmatch(r"inset-\[([\d.]+)%_([\d.]+)%_([\d.]+)%_([\d.]+)%\]", c)
        if m and el.parent is not None and "frame" in el.parent.get("class", []) + ["frame"]:
            t, r, b, l = (float(x) / 100 for x in m.groups())
            H = FRAME_H[0]
            el["class"].remove(c)
            el["style"] = (f"top:{t*H:.2f}px;left:{l*1480:.2f}px;width:{(1-l-r)*1480:.2f}px;"
                           f"height:{(1-t-b)*H:.2f}px;" + el.get("style", ""))


def retag(el, name, **attrs):
    el.name = name
    for k, v in attrs.items():
        el[k] = v


def img_url(src):
    if not src.startswith("assets/img/"):
        return src
    name = src[len("assets/img/"):]
    stem, ext = os.path.splitext(name)
    for cand in (stem + ".webp", name if ext == ".svg" else None):
        if cand and os.path.exists(os.path.join(ROOT, "assets", "img", cand)):
            return "assets/img/" + cand
    return "assets/src-img/" + name


def media_html(soup, kind, name):
    if kind == "video":
        v = soup.new_tag("video", attrs={"class": "media", "src": V + name + ".mp4", "autoplay": "",
                                         "muted": "", "loop": "", "playsinline": "", "preload": "metadata"})
        if os.path.exists(os.path.join(ROOT, "assets", "poster", name + ".webp")):
            v["poster"] = P + name + ".webp"
        return v
    if kind == "poster":
        return soup.new_tag("img", attrs={"class": "media", "src": P + name + ".webp", "alt": "",
                                          "loading": "lazy", "decoding": "async"})
    return soup.new_tag("div", attrs={"class": "media media-missing"})


def build(page):
    fname, slug, title, height, fixed = page
    soup = BeautifulSoup(open(os.path.join(FRAG, slug + ".html")).read(), "html.parser")
    root = soup.find("div")
    root["class"] = [c for c in root["class"] if c != "size-full"] + ["frame"]
    root["style"] = f"height:{height}px"
    FRAME_H[0] = height
    # Never split a word across lines; single words stay on one line.
    for p in soup.find_all("p"):
        p["class"] = [c for c in p.get("class", []) if c != "[word-break:break-word]"]
        tracked = re.search(r"tracking-\[([\d.]+)px\]", " ".join(p.get("class", [])))
        if (len(p.get_text(strip=True).split()) == 1 or p.get_text(strip=True) == "TO TOP" or single_line(p)
                or (tracked and float(tracked.group(1)) >= 3 and len(p.get_text(strip=True).split()) <= 3)):
            cls_add(p, "whitespace-nowrap")

    # Shared marquee: About and Sorora were transcribed with an empty placeholder.
    mq = soup.find(attrs={"data-name": "Marquee"})
    if slug != "entrance-main":
        if mq is not None and not mq.find(attrs={"data-name": "Track"}):
            src = BeautifulSoup(open(os.path.join(FRAG, "maskit.html")).read(), "html.parser")
            new = src.find(attrs={"data-name": "Marquee"})
            new["data-node-id"] = mq.get("data-node-id")
            mq.replace_with(new)
            mq = new
        if mq is not None:
            # On artwork pages the bar scrolls away with the page; elsewhere it stays put.
            if slug not in ARTWORKS:
                mark_fixed(mq)
            cls_add(mq, "marquee")
    for nid in fixed:
        for el in find_id(soup, nid):
            mark_fixed(el)

    # Header: Hit L/M/R become the three main links.
    for hit, href in (("Hit L", "portfolio.html"), ("Hit M", "about.html"), ("Hit R", "work-with-me.html")):
        for el in soup.find_all(attrs={"data-name": hit}):
            retag(el, "a", href=href)
            el["aria-label"] = {"Hit L": "Portfolio", "Hit M": "About me", "Hit R": "Work with me"}[hit]
    hdr = soup.find(attrs={"data-name": "Header Title"})
    if hdr is not None:
        cls_add(hdr, "hdr")

    for el in soup.find_all(attrs={"data-name": "To Main Page"}):
        retag(el, "a", href="portfolio.html")
        el["aria-label"] = "Back to portfolio"
    if slug in ARTWORKS:
        i = ARTWORKS.index(slug)
        for name, j in (("Next Design", i + 1), ("Previous Design", i - 1)):
            for el in soup.find_all(attrs={"data-name": name}):
                retag(el, "a", href=ARTWORKS[j % len(ARTWORKS)] + ".html")
                el["aria-label"] = name
        # The arrow at the top right also goes to the next artwork.
        for el in find_id(soup, "651:888"):
            retag(el, "a", href=ARTWORKS[(i + 1) % len(ARTWORKS)] + ".html")
            el["aria-label"] = "Next artwork"
    for el in soup.find_all(attrs={"data-name": re.compile(r"^To Top")}):
        retag(el, "button", type="button")
        el["aria-label"] = "Back to top"
        cls_add(el, "totop", "totop-float" if "Floating" in el["data-name"] else "totop-end")
    for el in soup.find_all(attrs={"data-name": "See my work button"}):
        retag(el, "a", href="portfolio.html")
        el["aria-label"] = "See my work"
        cls_add(el, "neg-host", "see-work")

    # Home rows
    for nid, target in ROWS.items():
        for el in soup.find_all(attrs={"data-node-id": nid}):
            if el.name in ("a", "button", "div"):
                retag(el, "a", href=target + ".html")
                cls_add(el, "row")
                el["data-row"] = nid

    # Contact buttons, in Figma order: email, Behance, Instagram, LinkedIn.
    for el, href in zip(soup.find_all(attrs={"data-node-id": "647:1856"}), CONTACT):
        retag(el, "a", href=href)
        if not href.startswith("mailto:"):
            el["target"] = "_blank"
            el["rel"] = "noopener"
        el["aria-label"] = href.split("//")[-1].split(".")[1 if "www." in href else 0].capitalize() if "mailto" not in href else "Email"
    for el in soup.find_all(attrs={"data-name": "Hit CV"}):
        el["rel"] = "noopener"

    # Negative hover layers: Figma exports them invisible, so draw them in CSS.
    for el in soup.find_all(attrs={"data-name": "Negative"}):
        for c in el.find_all(True):
            c.decompose()
        cls_add(el, "neg")
        host = el.find_parent(["a", "button"])
        if host is not None:
            cls_add(host, "neg-host")

    # Circle buttons: Figma's own drawing (outlined Gilroy text), so labels sit exactly as designed.
    art = {"Next Design": "btn-next", "Previous Design": "btn-prev",
           "To Top · End": "btn-totop-end", "To Top · Floating": "btn-totop-float"}
    for dn, name in art.items():
        for el in soup.find_all(attrs={"data-name": dn}):
            for c in el.find_all(recursive=False):
                if "neg" not in c.get("class", []):
                    c.decompose()
            el.insert(0, soup.new_tag("img", attrs={"src": f"assets/img/{name}.svg", "alt": "",
                                                    "class": "absolute block inset-0 max-w-none size-full"}))

    # Contact form
    fields = {"Hit field name": ("input", "name", "text", "Name and Surname"),
              "Hit field email": ("input", "email", "email", "Email"),
              "Hit field message": ("textarea", "message", None, "Message")}
    form_els = []
    for dn, (tag, nm, typ, label) in fields.items():
        for el in soup.find_all(attrs={"data-name": dn}):
            el.name = tag
            el["name"] = nm
            el["aria-label"] = label
            el["required"] = ""
            if typ:
                el["type"] = typ
                el["autocomplete"] = "name" if nm == "name" else "email"
            cls_add(el, "field")
            form_els.append(el)
    if form_els:
        form = soup.new_tag("form", attrs={"class": "contact-form", "action": "https://formspree.io/f/mgaoayek",
                                           "method": "POST", "novalidate": ""})
        form_els[0].insert_before(form)
        for el in form_els:
            form.append(el.extract())
        msg = form_els[-1]
        send = soup.new_tag("button", attrs={"type": "submit", "class": "send " + " ".join(
            c for c in msg["class"] if c.startswith(("left-", "top-", "w-", "h-")) or c in ("fx",))})
        span = soup.new_tag("span")
        span.string = "SEND"
        send.append(span)
        form.append(send)
        status = soup.new_tag("p", attrs={"class": "form-status", "aria-live": "polite"})
        form.append(status)

    # Sound buttons: the component root holds Ring/Speaker/Mute X/Hit.
    for hit in soup.find_all(attrs={"data-name": "Hit"}):
        sb = hit.parent
        if sb.find(attrs={"data-name": "Speaker"}, recursive=False):
            retag(sb, "button", type="button")
            sb["aria-label"] = "Sound on/off"
            cls_add(sb, "sound")

    # Videos
    for key, (kind, name) in MEDIA.get(slug, {}).items():
        for el in find_id(soup, key):
            slot = el.find("div", class_="overflow-hidden", recursive=False) or el
            for c in slot.find_all(True):
                c.decompose()
            slot.append(media_html(soup, kind, name))
            cls_add(el, "has-media")

    # Figma served these fills as 32px placeholders; use renders of the layers instead.
    for nid, name in {"462:2894": "unmask-img5105", "462:2920": "unmask-img5063", "462:4735": "miansi-packaging3"}.items():
        for el in soup.find_all(attrs={"data-node-id": nid}):
            for img in el.find_all("img"):
                img["src"] = "assets/img/" + name + ".webp"
                img["class"] = [c for c in img["class"] if c != "object-bottom"] + ["object-cover"]

    # Greeting: Figma's own lettering, split as "HI." / "IM NOA." / the rest so each part arrives on its own.
    for nid, part in (("338:380", "hi"), ("338:376", "name"), ("338:378", "rest")):
        for el in find_id(soup, nid):
            el.clear()
            el["class"] = ["absolute", "left-0", "top-0", "w-[281px]", "h-[280px]"]
            el.append(soup.new_tag("img", attrs={"src": f"assets/img/greet-{part}.svg", "alt": "",
                                                 "class": "absolute block inset-0 max-w-none size-full"}))
    greet = find_id(soup, "338:375")
    if greet:
        greet[0]["aria-label"] = "Hi. I'm Noa. Nice to meet you"

    # Explainer title: the Hebrew display face isn't a web font, so use Figma's render of it.
    for el in find_id(soup, "462:5220"):
        title_img = soup.new_tag("img", attrs={
            "src": "assets/img/explainer-title.webp", "alt": el.get_text(strip=True),
            "class": "absolute block max-w-none", "data-node-id": "462:5220",
            "style": "left:217.66px;top:307.32px;width:570.2px;height:112.04px"})
        el.replace_with(title_img)

    # Images
    for img in soup.find_all("img"):
        img["src"] = img_url(img["src"])
        if not img.find_parent(class_="fx") and "media" not in img.get("class", []):
            img["loading"] = "lazy"
            img["decoding"] = "async"

    if slug == "home-main2":
        add_home_previews(soup)
    if slug == "entrance-main":
        root["style"] = f"height:{height}px"
        cls_add(root, "entrance")

    body = str(soup)
    out = HEAD.format(title=("Noa Jablon · " + title) if title != "Noa Jablon" else "Noa Jablon · Designer", slug=slug)
    if slug == "entrance-main":
        out += '<div id="scrolly"><div id="stage" class="stage sticky">' + body + "</div></div>\n"
    else:
        out += '<div id="stage" class="stage">' + body + "</div>\n"
    out += '<script src="assets/js/site.js" defer></script>\n</body>\n</html>\n'
    with open(os.path.join(ROOT, fname), "w") as f:
        f.write(out)
    print("wrote", fname)


# Preview panel on the portfolio page: one layer per row plus the idle reel.
def crop_style(m):
    (sx, _, tx), (_, sy, ty) = m
    return f"width:{100/sx:.3f}%;height:{100/sy:.3f}%;left:{-tx/sx*100:.3f}%;top:{-ty/sy*100:.3f}%"


PREVIEWS = {
    "297:304": [("img", P + "maskit-journal.webp", "inset:0;width:100%;height:100%;object-fit:cover")],
    "298:319": [("img", "assets/img/preview-mazor.webp", "inset:0;width:100%;height:100%;object-fit:cover")],
    "298:345": [("img", P + "mnemo-reel.webp", "inset:0;width:100%;height:100%;object-fit:cover")],
    "683:1767": [("box", "background:#000"),
                 ("img", P + "stil-artifact.webp", "left:47.9px;top:112px;width:383.5px;height:348.9px;object-fit:cover;transform:rotate(1deg)")],
    "298:372": [("img", P + "lifta-motion.webp", "left:0;top:-21.4px;width:457px;height:615.7px;object-fit:cover")],
    "298:397": [("video", V + "salt-pour.mp4", "inset:0;width:100%;height:100%;object-fit:cover")],
    "298:418": [("img", "assets/img/preview-unmask.webp",
                 crop_style([[0.8828, 0, 0.0843], [0, 0.8878, 0.0525]]))],
    "298:438": [("img", "assets/img/preview-voices.webp",
                 crop_style([[0.9392, 0, 0.0095], [0, 0.8184, 0.0774]]))],
    "298:458": [("img", "assets/img/preview-miansi.webp", "inset:0;width:100%;height:100%;object-fit:cover")],
    "386:1324": [("img", P + "sorora-film.webp", "left:-9.8px;top:0;width:499px;height:573px;object-fit:cover")],
}
REEL = [
    ("img", P + "maskit-journal.webp", "inset:0;width:100%;height:100%;object-fit:cover"),
    ("img", "assets/img/reel-2.webp", "inset:0;width:100%;height:100%;object-fit:cover"),
    ("img", P + "mnemo-reel.webp", "inset:0;width:100%;height:100%;object-fit:cover"),
    ("img", P + "lifta-motion.webp", "right:4.67%;top:-21.36px;width:457px;height:615.7px;object-fit:cover"),
    ("video", V + "salt-pour.mp4", "inset:0;width:100%;height:100%;object-fit:cover"),
    ("img", "assets/img/reel-6.webp", "left:-9.55%;top:-5.91%;width:113.28%;height:112.64%;object-fit:cover"),
    ("img", "assets/img/reel-7.webp", "left:-1.01%;top:-9.45%;width:106.47%;height:122.19%;object-fit:cover"),
    ("img", "assets/img/reel-8.webp", "inset:0;width:100%;height:100%;object-fit:cover"),
    ("img", P + "sorora-film.webp", "left:-9.83px;top:0;width:499.03px;height:100%;object-fit:cover;border-radius:10px"),
]


def layer(soup, parts, cls):
    d = soup.new_tag("div", attrs={"class": cls})
    for p in parts:
        kind, a = p[0], p[1]
        if kind == "box":
            d.append(soup.new_tag("div", attrs={"style": "position:absolute;inset:0;" + a}))
            continue
        style = "position:absolute;max-width:none;" + p[2]
        if kind == "video":
            d.append(soup.new_tag("video", attrs={"src": a, "muted": "", "loop": "", "playsinline": "",
                                                  "preload": "none", "style": style}))
        else:
            d.append(soup.new_tag("img", attrs={"src": a, "alt": "", "decoding": "async", "style": style}))
    return d


def add_home_previews(soup):
    reel = soup.find(attrs={"data-node-id": "635:871"})
    frame = reel.parent
    for c in reel.find_all(True):
        c.decompose()
    cls_add(reel, "reel")
    for i, s in enumerate(REEL):
        reel.append(layer(soup, [s], "slide" + (" on" if i == 0 else "")))
    for nid, parts in PREVIEWS.items():
        l = layer(soup, parts, "pv")
        l["data-for"] = nid
        frame.append(l)


def assets():
    import shutil
    import subprocess
    os.makedirs(os.path.join(ROOT, "assets", "js"), exist_ok=True)
    shutil.copy(os.path.join(ROOT, "src", "js", "site.js"), os.path.join(ROOT, "assets", "js", "site.js"))
    tw = os.environ.get("TAILWIND", os.path.expanduser("~/bin/tailwindcss"))
    subprocess.run([tw, "-i", os.path.join(ROOT, "src", "input.css"), "-o",
                    os.path.join(ROOT, "assets", "css", "site.css"), "--minify"], check=True, cwd=ROOT)


if __name__ == "__main__":
    only = sys.argv[1:]
    for p in PAGES:
        if not only or p[0] in only or p[1] in only:
            build(p)
    assets()
