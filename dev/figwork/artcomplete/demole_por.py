#!/usr/bin/env python3
"""demole_por.py - find and remove moles / beads / forehead marks between and above the brows in cut figure and portrait art.

Usage (run from the worktree root; files or globs, quoted globs are expanded here):
  python3 -I dev/figwork/artcomplete/demole_por.py -n 'img/por-consort-c*-kc-a*.webp'          dry run: list hits only
  python3 -I dev/figwork/artcomplete/demole_por.py -n --sheet /tmp/x.jpg 'img/fig-maid-*.webp'  dry run + zoomed contact sheet
                                                                                             of every hit (blue rings) to LOOK at
  python3 -I dev/figwork/artcomplete/demole_por.py img/por-a.webp img/fig-b.webp               fix in place (webp q86)
  python3 -I dev/figwork/artcomplete/demole_por.py img/por-a.webp spot=195,183                 fix one hand-picked spot (file coords;
                                                                                             darkest pixel within 5px, r=3 inpaint)
Options: -n dry run | zone=cheek (search the cheeks instead of the brow strip) | --sheet OUT.jpg (hits only) | th=16 darkness vs local median | DBG=1 env prints the face box.

How it works: haar frontal face (opencv 4.10 from dev/figwork/artcomplete/.cache/pylib, see PROGRESS "NEW CONTAINER NOTE")
-> a central strip of the forehead, x .38-.62 of the face box, from just above the box down to .29h (= the brow line) ->
small compact dark blobs (2px .. 0.4% of face area, aspect <= 2.2) on smooth skin (ring test) -> cv2 inpaint (TELEA).
fig-* files: the top 20% (head) is upscaled x4 for detection, the mask is mapped back.
Tuned on kc por 384x506 / fig x900: real marks sit at dy .24-.27h, dx .46-.52w; brow heads start at .31h.
KNOWN FALSE HITS: hair strands at the hairline when haar boxes the wrong area (seen on figs with big hair / turned heads).
Faint 1px dots can be missed: also look at a plain brow crop of every face (artcomplete/.cache/browsheet.py style).
ALWAYS dry-run with --sheet, look, then fix only the files whose rings sit on a real dot (pass those files explicitly).
"""
import sys, os, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)) + "/.cache/pylib")
import cv2, numpy as np
from PIL import Image, ImageDraw
cc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
A = sys.argv[1:]
DRY = '-n' in A
TH = int(next((x[3:] for x in A if x.startswith("th=")), "16"))
SHEET = A[A.index('--sheet') + 1] if '--sheet' in A else None
ZONE = next((x[5:] for x in A if x.startswith("zone=")), "brow")
SPOTS = [tuple(map(int, x[5:].split(','))) for x in A if x.startswith('spot=')]
files = []
for x in A:
    if x.startswith('-') or '=' in x or x == SHEET: continue
    files += sorted(glob.glob(x)) if any(c in x for c in '*?[') else [x]
tiles = []
for f in files:
    im0 = Image.open(f).convert("RGBA"); FIG = os.path.basename(f).startswith("fig-"); S = 4 if FIG else 1
    if SPOTS:   # manual fix
        arr = np.asarray(im0).copy(); L = arr[..., :3].mean(2); m = np.zeros(L.shape, np.uint8)
        for x, y in SPOTS:
            w = L[y-5:y+6, x-5:x+6]; yy, xx = np.unravel_index(w.argmin(), w.shape); cv2.circle(m, (x-5+int(xx), y-5+int(yy)), 3, 1, -1)
        if not DRY:
            arr[..., :3] = cv2.inpaint(np.ascontiguousarray(arr[..., :3]), m, 3, cv2.INPAINT_TELEA)
            Image.fromarray(arr, "RGBA").save(f, "WEBP", quality=86, method=4)
        print(os.path.basename(f), "manual", SPOTS); continue
    H0 = int(im0.height * .2)
    im = im0.crop((0, 0, im0.width, H0)).resize((im0.width * S, H0 * S), Image.LANCZOS) if FIG else im0   # figs: head area x4
    arr = np.asarray(im).copy(); a = arr[..., 3]; rgb = arr[..., :3].copy()
    bg = rgb.copy(); bg[a < 128] = 200; g = cv2.cvtColor(bg, cv2.COLOR_RGB2GRAY)
    fs = cc.detectMultiScale(g, 1.08, 4, minSize=(max(18, im.width // 12),) * 2)
    if not len(fs): print(f, "NOFACE"); continue
    x, y, w, h = max(fs, key=lambda r: r[2] * r[3])
    if os.environ.get("DBG"): print(x, y, w, h)
    L = g.astype(int); k = max(5, int(w * .12) | 1); med = cv2.medianBlur(g, k).astype(int)
    allow = np.zeros(L.shape, bool)
    if ZONE == 'cheek':   # cheeks under the eyes, beside the nose (zone=cheek; added for the u24 eunuch rank faces)
        allow[y + int(.50*h):y + int(.80*h), x + int(.14*w):x + int(.36*w)] = True; allow[y + int(.50*h):y + int(.80*h), x + int(.64*w):x + int(.86*w)] = True
    else: allow[max(0, y - int(.05*h)):y + int(.29*h), x + int(.38*w):x + int(.62*w)] = True   # central forehead strip down to the brow line
    cand = ((med - L) > TH) & allow & (a > 200)
    n, lab, st, _ = cv2.connectedComponentsWithStats(cand.astype(np.uint8), 8)
    mask = np.zeros(L.shape, np.uint8); hits = []
    for i in range(1, n):
        bx, by, bw, bh, ar = st[i]
        if ar < 2 or ar > max(6, .004*w*w) or max(bw, bh) > max(4, .07*w) or max(bw, bh) > 2.2*min(bw, bh) + 1: continue
        r = max(2, int(.03*w)); ya, yb, xa, xb = max(0, by-r), by+bh+r, max(0, bx-r), bx+bw+r
        blob = (lab[ya:yb, xa:xb] == i).astype(np.uint8); big = cv2.dilate(blob, np.ones((3, 3), np.uint8))
        ring = ~(cv2.dilate(big, np.ones((3, 3), np.uint8)).astype(bool))
        sk = rgb[ya:yb, xa:xb][ring]; ll = L[ya:yb, xa:xb][ring]
        if len(ll) == 0 or ((sk[:, 0] > 170) & (sk[:, 1] > 135) & (sk[:, 2] > 115)).mean() < .95 or ll.std() > 14: continue
        hits.append((int(bx), int(by), int(bw), int(bh))); mask[ya:yb, xa:xb] |= big
    if hits and SHEET:
        v = Image.fromarray(bg); d = ImageDraw.Draw(v)
        for hx, hy, hw, hh in hits: d.ellipse((hx-2*S-4, hy-2*S-4, hx+hw+2*S+4, hy+hh+2*S+4), outline=(0, 160, 255), width=2)
        cx, cy = hits[0][0], hits[0][1]; c = v.crop((cx-38*S, cy-22*S, cx+38*S, cy+28*S)).resize((300, 200))
        t = Image.new('RGB', (300, 216), 'white'); t.paste(c, (0, 16)); ImageDraw.Draw(t).text((3, 2), os.path.basename(f)[:-5], fill=0); tiles.append(t)
    if hits and not DRY:
        Aa = np.asarray(im0).copy(); m = cv2.dilate(mask, np.ones((3, 3), np.uint8))
        if FIG:
            m0 = np.zeros(Aa.shape[:2], np.uint8); mm = cv2.resize(m, (Aa.shape[1], m.shape[0] // S), interpolation=cv2.INTER_AREA)
            m0[:mm.shape[0]] = (mm > 0); m = cv2.dilate(m0, np.ones((2, 2), np.uint8))
        Aa[..., :3] = cv2.inpaint(np.ascontiguousarray(Aa[..., :3]), m, 3, cv2.INPAINT_TELEA)
        Image.fromarray(Aa, "RGBA").save(f, "WEBP", quality=86, method=4)
    print(os.path.basename(f), "spots", len(hits), hits if hits else "")
if SHEET and tiles:
    n = 8; s = Image.new('RGB', (n*302, ((len(tiles)+n-1)//n)*218), 'white')
    for i, t in enumerate(tiles): s.paste(t, ((i % n)*302, (i//n)*218))
    s.save(SHEET, quality=88); print("sheet", SHEET, len(tiles))
