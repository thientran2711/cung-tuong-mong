#!/usr/bin/env python3
"""Independent check of every player-face anchor (owner 17/11 toil-reveal-fix; repeat of OD:L1482): runs the face mesh on the WHOLE picture
(mkfit.detect_free, no toil-fit crop) and compares lips / eyes / brows with the stored img/mk-fit points. A picture whose stored points sit more than
THR eye-distances away from the independent detection is flagged; --fix replaces them by the independent points (when those pass the sanity check).
usage: python3 -I dev/art/mkfit/verify.py [--names a.webp,b.webp (only these; mk-fit read from the CDN when --fit-dir is not given: report only)] --fit-dir DIR (mk-fit json copies) --out DIR [--only consort-c25] [--fix] [--model M] [--jobs 8]
writes OUT/report.json = {file: {d: displacement/eye-dist, state: ok|flag|nofree}} and, with --fix, rewrites the flagged entries in DIR/<face>.json"""
import json, sys, os, re, math, glob, io, concurrent.futures as cf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import mkfit
THR = .10   # review r1 (17/11): .22 let a lips-on-the-chin set through (c07 t3 a18)
def cents(P):
    P = np.asarray(P, float); return [P[0:12].mean(0), P[20:30].mean(0), P[30:40].mean(0), P[40:50].mean(0), P[50:60].mean(0)]
def main():
    a = sys.argv[1:]; g = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    fitdir, out, model, jobs, only, fix = g("--fit-dir"), g("--out"), g("--model", "/home/user/wt/face_landmarker.task"), int(g("--jobs", 6)), g("--only"), "--fix" in a
    nm = g("--names")
    if not out: import tempfile; out = tempfile.mkdtemp(prefix="mkverify")
    os.makedirs(out, exist_ok=True)
    if nm:
        names = [n for n in nm.split(",") if re.match(r"(por|fig)-(consort|player)-.*\.webp$", n)]
        if not fitdir:
            import tempfile; fitdir = tempfile.mkdtemp(prefix="mkfit")
            for gname in {mkfit.face_of(n) for n in names}:
                try: open(os.path.join(fitdir, gname + ".json"), "wb").write(mkfit.get(mkfit.BASE + "mk-fit/" + gname + ".json"))
                except Exception: pass
    else:
        idx = json.loads(mkfit.get(mkfit.BASE + "_index.json")); names = [f[0][4:] for f in idx["files"] if re.match(r"img/(por|fig)-(consort|player)-.*\.webp$", f[0])]
    if only: names = [n for n in names if (mkfit.face_of(n) or "").startswith(only)]
    mk = {}
    for p in glob.glob(os.path.join(fitdir, "*.json")): mk[os.path.basename(p)[:-5]] = json.load(open(p))
    rep = {}; changed = {}
    def work(n):
        try: data = mkfit.get(mkfit.BASE + n)
        except Exception as e: return n, None, str(e)
        try: p, (W, H) = mkfit.detect_free(model, data)
        except Exception as e: return n, None, str(e)
        return n, (p, W, H), None
    todo = [n for n in names if n in mk.get(mkfit.face_of(n), {})]
    for n in names:
        if n not in mk.get(mkfit.face_of(n), {}): rep[n] = {"state": "nodata"}
    with cf.ThreadPoolExecutor(jobs) as ex:
        for k, (n, r, err) in enumerate(ex.map(work, todo)):
            if r is None or r[0] is None: rep[n] = {"state": "nofree", "err": err}; continue
            p, W, H = r; v = mk[mkfit.face_of(n)][n]
            old = [(v[2 * i] / 4000 * W, v[2 * i + 1] / 4000 * H) for i in range(60)]
            co, cn = cents(old), cents(p); ed = math.hypot(*(cn[1] - cn[2])) or 1
            d = max(math.hypot(*(x - y)) for x, y in zip(co, cn)) / ed
            rep[n] = {"d": round(d, 3), "state": "flag" if d > THR else "ok"}
            if d > THR and fix: changed[n] = mkfit.enc(p, W, H)
            if k % 300 == 0: print(k, len(todo), flush=True)
    if fix:
        for n, e in changed.items(): mk[mkfit.face_of(n)][n] = e
        for gname, tab in mk.items(): json.dump(tab, open(os.path.join(fitdir, gname + ".json"), "w"), separators=(",", ":"), sort_keys=True)
    json.dump(rep, open(os.path.join(out, "report.json"), "w"), indent=0)
    import collections; print(collections.Counter(r["state"] for r in rep.values()))
    if nm:
        for n, r in sorted(rep.items()):
            if r["state"] != "ok": print("  ANCHOR CHECK", n, r["state"], r.get("d", ""), "-> run dev/art/mkfit/on-upload.sh (points missing or off the painted face)")
main()
