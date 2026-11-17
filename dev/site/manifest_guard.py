#!/usr/bin/env python3
"""manifest_guard.py: a figure manifest must NEVER shrink (review/fig-rank-match; the live img/FIGURES.json lost its consort t5–t8 entries on 17/11
  while the art was still on the CDN). Compares a NEW manifest with the LIVE one (or with the committed floor dev/site/manifest-floor.json):
  FAIL when (a) any file listed live is missing from the new one, or (b) the count of any (role, tier) is lower, or (c) the new one lists a file
  that is not on the CDN (_index.json), or (d) the total count is lower than the floor.
  usage: python3 dev/site/manifest_guard.py NEW.json [--name FIGURES.json] [--live-file LIVE.json] [--allow-shrink]   exit 1 on FAIL
         python3 dev/site/manifest_guard.py --live-check      (checks the manifests that are live on the CDN against the floor: for quickcheck / nightly)
         python3 dev/site/manifest_guard.py --write-floor     (rewrites the floor from the live CDN; only ever grows: max(old, live))
  cdn_sync.py calls check() before pushing any img/FIGURES*.json (not -hd); --allow-shrink on cdn_sync passes it through."""
import json, os, sys, urllib.request, collections
PUBLIC = os.environ.get("CTM_IMG_BASE") or "https://ctm-img.victoria-tntt.workers.dev/"
HERE = os.path.dirname(os.path.abspath(__file__)); FLOOR = os.path.join(HERE, "manifest-floor.json")
GUARDED = ("FIGURES.json", "FIGURES-servants.json", "FIGURES-others.json", "FIGURES-kids.json", "FIGURES-kc.json", "FIGURES-ty.json", "FIGURES-congtu.json", "FIGURES-huynh.json")
def lst(j): return j if isinstance(j, list) else (j.get("figures") or j.get("files") or j.get("items") or []) if isinstance(j, dict) else []
def counts(L):
    c = collections.Counter(); [c.update([f"{f.get('role')}|{f.get('tier')}"]) for f in L if isinstance(f, dict)]; return c
def fetch(name):
    r = urllib.request.Request(PUBLIC + "img/" + name, headers={"Cache-Control": "no-cache", "User-Agent": "ctm-manifest-guard"})
    return json.load(urllib.request.urlopen(r, timeout=60))
def check(name, new, live=None, floor=None, index=None):
    """returns a list of problems ([] = ok)"""
    new, bad = lst(new), []
    if live is not None:
        live = lst(live); nf = {f.get("file") for f in new if isinstance(f, dict)}
        gone = [f.get("file") for f in live if isinstance(f, dict) and f.get("file") not in nf]
        if gone: bad.append(f"{name}: {len(gone)} entries of the live manifest are missing in the new one (e.g. {gone[:3]})")
        cn, cl = counts(new), counts(live)
        for k, n in sorted(cl.items()):
            if cn.get(k, 0) < n: bad.append(f"{name}: count {k} shrinks {n} -> {cn.get(k, 0)}")
    if floor and name in floor:
        for k, n in floor[name]["by"].items():
            if counts(new).get(k, 0) < n: bad.append(f"{name}: count {k} below the floor {n} (now {counts(new).get(k, 0)})")
        if len(new) < floor[name]["n"]: bad.append(f"{name}: total {len(new)} below the floor {floor[name]['n']}")
    if index is not None:
        miss = [f.get("file") for f in new if isinstance(f, dict) and f.get("file") and f.get("file") not in index]
        if miss: bad.append(f"{name}: {len(miss)} listed files are not on the CDN (e.g. {miss[:3]})")
    return bad
def load_floor(): return json.load(open(FLOOR)) if os.path.exists(FLOOR) else {}
def main():
    a = sys.argv[1:]; floor = load_floor()
    if "--write-floor" in a:
        for n in GUARDED:
            L = lst(fetch(n)); old = floor.get(n, {"n": 0, "by": {}}); by = dict(counts(L))
            floor[n] = {"n": max(old["n"], len(L)), "by": {k: max(old["by"].get(k, 0), by.get(k, 0)) for k in set(old["by"]) | set(by)}}
        json.dump(floor, open(FLOOR, "w"), indent=1, sort_keys=True); print("floor written", {n: floor[n]["n"] for n in floor}); return
    if "--live-check" in a:
        idx = {k for k, _, _ in fetch("_index.json")["files"]}; bad = []
        for n in GUARDED:
            bad += check(n, fetch(n), floor=floor, index=idx)
        print("\n".join(bad) if bad else "MANIFEST GUARD PASS (live manifests >= floor, every listed file on the CDN)"); sys.exit(1 if bad else 0)
    p = [x for x in a if not x.startswith("--")][0]; name = a[a.index("--name") + 1] if "--name" in a else os.path.basename(p)
    live = json.load(open(a[a.index("--live-file") + 1])) if "--live-file" in a else fetch(name)
    bad = check(name, json.load(open(p)), live=live, floor=floor)
    print("\n".join(bad) if bad else f"MANIFEST GUARD PASS {name}")
    sys.exit(1 if bad and "--allow-shrink" not in a else 0)
if __name__ == "__main__": main()
