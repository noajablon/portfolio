#!/usr/bin/env python3
"""Cache-busting: every page links its shared CSS / JS with ?v=<content hash>, so a new deploy is picked up at once.

Usage: python3 tools/stamp.py   (last step, after tools/snap.mjs)
"""
import glob
import hashlib
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSET = re.compile(r'(assets/(?:css|js)/[\w.-]+\.(?:css|js))(\?v=[0-9a-f]+)?"')


def stamp(m):
    path = os.path.join(ROOT, m.group(1))
    if not os.path.exists(path):
        return m.group(0)
    h = hashlib.md5(open(path, "rb").read()).hexdigest()[:8]
    return f'{m.group(1)}?v={h}"'


for f in glob.glob(os.path.join(ROOT, "*.html")):
    src = open(f).read()
    out = ASSET.sub(stamp, src)
    if out != src:
        open(f, "w").write(out)
print("stamped")
