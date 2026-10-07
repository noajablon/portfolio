#!/usr/bin/env python3
"""Shrinks the Figma originals (assets/src-img, not in git) into assets/img.

Each bitmap is resized to twice the largest size it is shown at on any page
(tools/img-sizes.json, measured in design pixels) and saved as WebP; SVGs are copied.
"""
import json
import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "src-img")
DST = os.path.join(ROOT, "assets", "img")
sizes = json.load(open(os.path.join(ROOT, "tools", "img-sizes.json")))
Image.MAX_IMAGE_PIXELS = None

for name, (w, h) in sizes.items():
    src = os.path.join(SRC, name)
    if not os.path.exists(src):
        continue
    stem, ext = os.path.splitext(name)
    if ext == ".svg":
        shutil.copy(src, os.path.join(DST, name))
        continue
    out = os.path.join(DST, stem + ".webp")
    im = Image.open(src)
    im.load()
    scale = min(1.0, max(2 * w / im.width, 2 * h / im.height, 0.02))
    if scale < 1:
        im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    im.save(out, "WEBP", quality=82, method=6)
print("done")
