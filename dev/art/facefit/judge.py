#!/usr/bin/env python3
"""face-fit arbiter (review/face-fit): decide BY PIXELS which fit set matches the live picture.
For every entry that differs between two mk-fit sets (A = LIVE CDN, B = repo copy) and every toil-fit2 row that differs, the live picture is measured
afresh with the MediaPipe face mesh (mkfit.detect_free: whole portrait / top 40 % of a figure, no fit row used), then each set is scored against that
measurement: lip centre error (% of picture width/height, hypot) and 60-point RMS error (% of picture width). Smaller = closer = right.
usage: python3 judge.py A_DIR B_DIR toilA.json toilB.json model.task out.json [--jobs 8]
Needs: pip install mediapipe, libegl1 libgles2, face_landmarker.task."""
import json, os, sys, math, re, importlib.util, concurrent.futures as cf
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("mkfit", os.path.join(HERE, "..", "mkfit", "mkfit.py")); mk = importlib.util.module_from_spec(spec); spec.loader.exec_module(mk)
A_DIR, B_DIR, TA, TB, MODEL, OUT = sys.argv[1:7]
JOBS = int(sys.argv[sys.argv.index("--jobs") + 1]) if "--jobs" in sys.argv else 8
def lip(p): return (sum(p[0:24:2]) / 12 / 40, sum(p[1:24:2]) / 12 / 40)  # % of picture
jobs = []  # (kind, file, ptsA, ptsB)
for f in sorted(os.listdir(A_DIR)):
    if not f.endswith(".json") or f == "md5.json" or not os.path.exists(os.path.join(B_DIR, f)): continue
    a = json.load(open(os.path.join(A_DIR, f))); b = json.load(open(os.path.join(B_DIR, f)))
    for k in a:
        if k in b and len(a[k]) >= 60 and len(b[k]) >= 60 and math.hypot(*(np.array(lip(a[k])) - np.array(lip(b[k])))) > 2: jobs.append(("mk", k, a[k], b[k]))
ta = json.load(open(TA)); tb = json.load(open(TB))
for k in ta:
    if k in tb and math.hypot(ta[k][0] - tb[k][0], ta[k][1] - tb[k][1]) > 2: jobs.append(("toil", k, ta[k], tb[k]))
print(len(jobs), "entries to judge", file=sys.stderr)
def work(j):
    kind, k, a, b = j
    try:
        data = mk.get(mk.BASE + k)
        pts, (W, H) = mk.detect_free(MODEL, data)
    except Exception as e:
        return {"kind": kind, "file": k, "err": str(e)[:80]}
    if not pts: return {"kind": kind, "file": k, "err": "no face detected"}
    P = np.array(pts); ref = (float(P[:12, 0].mean() / W * 100), float(P[:12, 1].mean() / H * 100))
    r = {"kind": kind, "file": k, "ref": [round(ref[0], 2), round(ref[1], 2)]}
    for nm, v in (("cdn", a), ("repo", b)):
        la = lip(v) if kind == "mk" else (v[0], v[1])
        r["lip_" + nm] = round(math.hypot(la[0] - ref[0], la[1] - ref[1]), 2)
        if kind == "mk":
            Q = np.array(v, float).reshape(-1, 2) / 40  # % of picture
            R = np.array([(x / W * 100, y / H * 100) for x, y in pts])
            r["rms_" + nm] = round(float(np.sqrt(((Q - R) ** 2).sum(1).mean())), 2)
    return r
res = []
# detection is not thread-safe across one landmarker: download in threads, detect serially
with cf.ThreadPoolExecutor(JOBS) as ex:
    futs = [ex.submit(mk.get, mk.BASE + j[1]) for j in jobs]
    for j, fu in zip(jobs, futs):
        kind, k, a, b = j
        try:
            data = fu.result(); pts, (W, H) = mk.detect_free(MODEL, data)
        except Exception as e:
            res.append({"kind": kind, "file": k, "err": str(e)[:80]}); continue
        if not pts: res.append({"kind": kind, "file": k, "err": "no face detected"}); continue
        P = np.array(pts); ref = (float(P[:12, 0].mean() / W * 100), float(P[:12, 1].mean() / H * 100))
        r = {"kind": kind, "file": k, "ref": [round(ref[0], 2), round(ref[1], 2)]}
        for nm, v in (("cdn", a), ("repo", b)):
            la = lip(v) if kind == "mk" else (v[0], v[1])
            r["lip_" + nm] = round(math.hypot(la[0] - ref[0], la[1] - ref[1]), 2)
            if kind == "mk":
                Q = np.array(v, float).reshape(-1, 2) / 40; R = np.array([(x / W * 100, y / H * 100) for x, y in pts])
                r["rms_" + nm] = round(float(np.sqrt(((Q - R) ** 2).sum(1).mean())), 2)
        res.append(r)
        if len(res) % 100 == 0: print(len(res), file=sys.stderr)
json.dump(res, open(OUT, "w"))
print("done", len(res))
