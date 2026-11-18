#!/usr/bin/env python3
"""act-pic-audit.py (review/act-pic-match, owner bug 18/11 "Rất nhiều ảnh đang sai cái ảnh minh họa của từng sự việc").
For EVERY act card name the game resolves (dev/test/pic-dupes.js JSON: name -> key -> picture, incl. how it was matched), list the picture
file really shown, dHash every file on the CDN and flag:
  (a) SHARED   two different act names show the same picture file, or two different files that are near-identical (dHash distance <= NEAR)
  (b) FALLBACK the act has no own picture (kit placeholder ph-*) or is matched only loosely (prefix / startsWith / longer / star / log = another
               act's picture borrowed by name-prefix or by a Tuần lục rule) -> a human LOOKS at these (--sheets)
  (c) MISMATCH is judged by eye from the contact sheets written with --sheets (label = act names that use the picture); the verdict list
               is kept in dev/test/act-pic-verdicts.json {"<act name>": "ok"|"wrong"|"unclear"} and applied here as the count.
usage: python3 dev/test/act-pic-audit.py <pic-dupes.json> [--sheets DIR] [--cache DIR] [--json OUT]
       (pic-dupes.json: ACTS_FILE=<manifest> node dev/test/pic-dupes.js <build url> <out.json> dev/figwork/picdupes/extra.txt)"""
import json, os, sys, urllib.request, io, collections, argparse
from PIL import Image, ImageDraw

BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
NEAR = 8
LOOSE = {"prefix", "startsWith", "longer", "star", "log"}
ap = argparse.ArgumentParser()
ap.add_argument("scan"); ap.add_argument("--sheets"); ap.add_argument("--cache", default="/tmp/act-pic-audit-cache"); ap.add_argument("--json")
ap.add_argument("--verdicts", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "act-pic-verdicts.json"))
a = ap.parse_args()
os.makedirs(a.cache, exist_ok=True)
rows = json.load(open(a.scan, encoding="utf-8"))["acts"]
verd = json.load(open(a.verdicts, encoding="utf-8")) if os.path.exists(a.verdicts) else {}

def fetch(f):
    p = os.path.join(a.cache, f)
    if not os.path.exists(p):
        req = urllib.request.Request(BASE + f, headers={"User-Agent": "ctm-audit"})
        open(p, "wb").write(urllib.request.urlopen(req, timeout=60).read())
    return Image.open(p).convert("RGB")

def dhash(im):
    g = im.convert("L").resize((9, 8), Image.LANCZOS); px = list(g.getdata()); h = 0
    for y in range(8):
        for x in range(8):
            h = (h << 1) | (px[y * 9 + x] > px[y * 9 + x + 1])
    return h

by = collections.defaultdict(list)          # picture file -> [act names]
for r in rows:
    if r["src"]: by[r["src"]].append(r)
H = {}
for f in by:
    try: H[f] = dhash(fetch(f))
    except Exception as e: print("fetch fail", f, e)
files = sorted(H)
near = []
for i, f in enumerate(files):
    for g in files[i + 1:]:
        d = bin(H[f] ^ H[g]).count("1")
        if d <= NEAR: near.append((d, f, g))
shared = {f: [r["name"] for r in L] for f, L in by.items() if len({r["name"] for r in L}) > 1}
ph = [r for r in rows if r.get("ph")]
loose = [r for r in rows if r["mode"] in LOOSE and not r.get("ph")]
wrong = [n for n, v in verd.items() if v == "wrong"]
print(f"acts {len(rows)} | pictures {len(by)} | (a) shared files {len(shared)} (act names on them {sum(len(v) for v in shared.values())}), near-identical file pairs {len(near)}"
      f" | (b) placeholder {len(ph)}, loose-matched {len(loose)} | (c) judged wrong {len(wrong)} of {len(verd)} judged")
for f, n in shared.items(): print("  SHARED", f, n)
for d, f, g in sorted(near): print("  NEAR", d, f, g)
for r in ph: print("  PLACEHOLDER", r["name"], r["ph"])
for r in loose: print("  LOOSE", r["mode"], r["name"], "->", r["src"])
if a.json:
    json.dump({"rows": rows, "shared": shared, "near": near, "placeholder": [r["name"] for r in ph], "loose": [[r["name"], r["mode"], r["src"]] for r in loose]},
              open(a.json, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
if a.sheets:                                   # contact sheets of every flagged picture, label = the act names that use it
    os.makedirs(a.sheets, exist_ok=True)
    flag = sorted({f for f in shared} | {r["src"] for r in loose} | {f for _, f, g in near for f in (f, g)})
    W, Hh, cols = 230, 304, 5
    for s in range(0, len(flag), 15):
        chunk = flag[s:s + 15]; rws = (len(chunk) + cols - 1) // cols
        S = Image.new("RGB", (cols * W, rws * (Hh + 44)), "white"); d = ImageDraw.Draw(S)
        for i, f in enumerate(chunk):
            x, y = (i % cols) * W, (i // cols) * (Hh + 44)
            S.paste(fetch(f).resize((W, Hh)), (x, y + 44))
            names = "; ".join(r["name"] for r in by[f])[:140]
            d.text((x + 2, y + 1), f[4:-5], fill="black"); d.text((x + 2, y + 14), names[:46], fill="blue"); d.text((x + 2, y + 27), names[46:92], fill="blue")
        S.save(os.path.join(a.sheets, f"flag{s // 15 + 1:02d}.jpg"), quality=78)
    print("sheets:", len(flag), "pictures ->", a.sheets)
