#!/usr/bin/env python3
"""manifest_guard.py: a figure manifest must NEVER shrink (review/fig-rank-match; the live img/FIGURES.json lost its consort t5–t8 entries on 17/11
  while the art was still on the CDN). Compares a NEW manifest with the LIVE one (or with the committed floor dev/site/manifest-floor.json):
  FAIL when (a) any file listed live is missing from the new one, or (b) the count of any (role, tier) is lower, or (c) the new one lists a file
  that is not on the CDN (_index.json), or (d) the total count is lower than the floor.
  usage: python3 dev/site/manifest_guard.py NEW.json [--name FIGURES.json] [--live-file LIVE.json] [--allow-shrink]   exit 1 on FAIL
         python3 dev/site/manifest_guard.py --live-check      (checks the manifests that are live on the CDN against the floor: for quickcheck / nightly)
         python3 dev/site/manifest_guard.py --write-floor     (rewrites the floor from the live CDN; only ever grows: max(old, live))
  cdn_sync.py calls check() before pushing any img/FIGURES*.json (every one, -hd included: is_guarded()) or ACTS/EVENTS; its put() and DELETE refuse an
  unchecked guarded manifest, so a script that imports cdn_sync cannot skip the guard either (cdn-kc-guard 19/11).
  INTENDED SHRINK (cdn-kc-guard 19/11: LV1 removed old kc art on the owner's order with --allow-shrink, but the repo floor stayed at 420 and every branch's
  --live-check failed for hours): `cdn_sync.py --allow-shrink --reason "<owner order>"` records the lowered floor on the CDN in img/_floor-sanctioned.json
  {name: {from: <floor it replaces>, to: <new floor>, reason, at}} and lowers dev/site/manifest-floor.json in that checkout (commit it on your branch).
  Until the repo floor is updated, effective_floor() uses the CDN record while the repo entry still equals its 'from'; --write-floor applies it too."""
import json, os, sys, urllib.request, collections
PUBLIC = os.environ.get("CTM_IMG_BASE") or "https://ctm-img.victoria-tntt.workers.dev/"
HERE = os.path.dirname(os.path.abspath(__file__)); FLOOR = os.path.join(HERE, "manifest-floor.json")
GUARDED = ("FIGURES.json", "FIGURES-servants.json", "FIGURES-others.json", "FIGURES-kids.json", "FIGURES-kc.json", "FIGURES-ty.json", "FIGURES-congtu.json", "FIGURES-huynh.json", "FIGURES-x.json")
# act-pic-match 18/11: img/ACTS.json and img/EVENTS.json were overwritten at 17/11 02:41Z by the same stale-checkout push that shrank FIGURES.json
# (every act without its key showed the kit placeholder, ~130 acts shared pictures). They are DICT manifests: guarded by the size of each section.
DICT_GUARDED = {"ACTS.json": ("acts", "prefix", "log"), "EVENTS.json": ("categories", "events", "stories")}
SANCTIONED = "_floor-sanctioned.json"
def is_guarded(name):
    """every img/FIGURES*.json (the list above + -hd + any new one) and the DICT manifests"""
    return name in DICT_GUARDED or (name.startswith("FIGURES") and name.endswith(".json"))
def sanctioned():
    try:
        j = fetch(SANCTIONED); return j if isinstance(j, dict) else {}
    except Exception: return {}
def effective_floor(floor, sanc=None, note=None):
    """repo floor, with an intended lowering recorded on the CDN applied while the repo entry is still the one it replaced"""
    sanc = sanctioned() if sanc is None else sanc; out = dict(floor)
    for n, r in sanc.items():
        if isinstance(r, dict) and r.get("to") and floor.get(n) in (r.get("from"), r.get("repo")):
            out[n] = r["to"]
            if note is not None: note.append(f"NOTE {n}: floor lowered on the CDN ({r.get('at')}: {r.get('reason')}); repo dev/site/manifest-floor.json still has the old floor -> run --write-floor and commit it")
    return out
def entry(name, j):
    """floor entry {n, by} of a manifest as it is"""
    return {"n": 0, "by": dsec(j, name)} if name in DICT_GUARDED else {"n": len(lst(j)), "by": dict(counts(lst(j)))}
def lowered(old, new):
    """the floor after an intended shrink: every old key down to the new count (keys the old floor did not have stay unfloored)"""
    old = old or {"n": 0, "by": {}}
    return {"n": min(old["n"], new["n"]), "by": {k: min(v, new["by"].get(k, 0)) for k, v in old["by"].items()}}
def dsec(j, name):
    j = j if isinstance(j, dict) else {}
    return {k: len(j.get(k) or []) for k in DICT_GUARDED[name]}
def dcheck(name, new, live=None, floor=None):
    """problems of a DICT manifest push: a section shorter than live / the floor, or an entry of the live one missing (dict sections: key by key)"""
    bad, cn = [], dsec(new, name)
    for sec in DICT_GUARDED[name]:
        if live is not None:
            lv = (live or {}).get(sec) or []
            if cn[sec] < len(lv): bad.append(f"{name}: section '{sec}' shrinks {len(lv)} -> {cn[sec]}")
            if isinstance(lv, dict): gone = [k for k in lv if k not in (new.get(sec) or {})]; bad += [f"{name}: {len(gone)} '{sec}' entries of the live manifest are missing in the new one (e.g. {gone[:3]})"] if gone else []
        if floor and name in floor and cn[sec] < floor[name]["by"].get(sec, 0): bad.append(f"{name}: section '{sec}' {cn[sec]} below the floor {floor[name]['by'].get(sec)}")
    return bad
def lst(j): return j if isinstance(j, list) else (j.get("figures") or j.get("files") or j.get("items") or []) if isinstance(j, dict) else []
def counts(L):
    c = collections.Counter(); [c.update([f"{f.get('role')}|{f.get('tier')}"]) for f in L if isinstance(f, dict)]; return c
def fetch(name):
    r = urllib.request.Request(PUBLIC + "img/" + name, headers={"Cache-Control": "no-cache", "User-Agent": "ctm-manifest-guard"})
    try:
        return json.load(urllib.request.urlopen(r, timeout=60))
    except urllib.error.HTTPError as e:
        if e.code == 404: return []  # a new manifest (e.g. FIGURES-x.json, art-wiring-1119) has no live copy yet
        raise
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
def names_live(idx=None):
    """GUARDED + every other img/FIGURES*.json on the CDN (a new manifest is guarded the day it appears)"""
    idx = idx if idx is not None else {k for k, _, _ in fetch("_index.json")["files"]}
    more = sorted(k[4:] for k in idx if k.count("/") == 1 and is_guarded(k[4:]) and k[4:] not in DICT_GUARDED and k[4:] not in GUARDED)
    return list(GUARDED) + more
def load_floor(): return json.load(open(FLOOR)) if os.path.exists(FLOOR) else {}
def main():
    a = sys.argv[1:]; floor = load_floor()
    if "--write-floor" in a:
        floor = effective_floor(floor)
        for n in names_live():
            L = lst(fetch(n)); old = floor.get(n, {"n": 0, "by": {}}); by = dict(counts(L))
            floor[n] = {"n": max(old["n"], len(L)), "by": {k: max(old["by"].get(k, 0), by.get(k, 0)) for k in set(old["by"]) | set(by)}}
        for n in DICT_GUARDED:
            c = dsec(fetch(n), n); old = floor.get(n, {"n": 0, "by": {}}); floor[n] = {"n": 0, "by": {k: max(old["by"].get(k, 0), c[k]) for k in c}}
        json.dump(floor, open(FLOOR, "w"), indent=1, sort_keys=True); print("floor written", {n: floor[n]["n"] for n in floor}); return
    if "--live-check" in a:
        idx = {k for k, _, _ in fetch("_index.json")["files"]}; bad, notes = [], []; floor = effective_floor(floor, note=notes)
        print("\n".join(notes)) if notes else None
        for n in names_live(idx):
            bad += check(n, fetch(n), floor=floor, index=idx)
        for n in DICT_GUARDED:
            j = fetch(n); bad += dcheck(n, j, floor=floor)
            if n == "ACTS.json" and not j.get("log"): bad.append("ACTS.json: no 'log' rules (the live act table fell back to the 15/11 base)")
            if n == "ACTS.json" and not any(str(v).endswith("-h") for v in (j.get("acts") or {}).values()): bad.append("ACTS.json: no '-h' (hands-only) picture keys")
        print("\n".join(bad) if bad else "MANIFEST GUARD PASS (live manifests >= floor, every listed file on the CDN)"); sys.exit(1 if bad else 0)
    floor = effective_floor(floor)
    p = [x for x in a if not x.startswith("--")][0]; name = a[a.index("--name") + 1] if "--name" in a else os.path.basename(p)
    live = json.load(open(a[a.index("--live-file") + 1])) if "--live-file" in a else fetch(name)
    bad = dcheck(name, json.load(open(p)), live=live, floor=floor) if name in DICT_GUARDED else check(name, json.load(open(p)), live=live, floor=floor)
    print("\n".join(bad) if bad else f"MANIFEST GUARD PASS {name}")
    sys.exit(1 if bad and "--allow-shrink" not in a else 0)
if __name__ == "__main__": main()
