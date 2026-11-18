#!/usr/bin/env python3
"""look-fx-keepfit-build.py <out keep-fit.json> <eye jsonl ...>: the per-picture keep-out rows (img/keep-fit.json) from the look-fx-eyefit.py measurements.
row = [eye1 u, eye1 v, eye2 u, eye2 v, eye half-width, eye half-height, mouth u, mouth v, mouth half-width, mouth half-height, nose u, nose v] x 1000, veil-row units (BAL.looks.keep.fit, jlooks.js).
A measurement that is not plausible (eyes not side by side above the mouth, sizes outside the painted-face range; the row position itself is free: some por rows sit off the face and the row units still hold) gets NO row (the game keeps the constants) and is listed."""
import sys, json
out = sys.argv[1]; R = {}
for f in sys.argv[2:]:
    for l in open(f): r = json.loads(l); R[r['f']] = r
rows = {}; none = []; bad = []
for k in sorted(R):
    r = R[k]
    if not r['d']: none.append(k); continue
    (a, b), m, n = r['e'], r['m'], r['n']; dx = b[0] - a[0]; ok = .2 < dx < .9 and abs(b[1] - a[1]) < .3 and -.6 < a[1] < 1 and -.6 < b[1] < 1 and m[1] > max(a[1], b[1]) + .1 and .05 < a[2] < .2 and .05 < b[2] < .2 and .006 < a[3] < .09 and .006 < b[3] < .09 and -.5 < m[0] < 1.2
    if not ok: bad.append(k); continue
    rows[k] = [round(v * 1000) for v in (a[0], a[1], b[0], b[1], (a[2] + b[2]) / 2, (a[3] + b[3]) / 2, m[0], m[1], m[2], m[3], n[0], n[1])]
json.dump(rows, open(out, 'w'), separators=(',', ':')); print('rows', len(rows), 'no detection', len(none), 'implausible', len(bad)); print(*(bad[:10] + none[:10]), sep='\n')
