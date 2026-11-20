#!/usr/bin/env python3
"""manifest_rebuild.py (review/fig-rank-match): rebuild img/FIGURES.json (consorts) and img/FIGURES-servants.json (maids) from what is REALLY on the CDN.
  Source of truth for "what exists" = the bucket listing img/_index.json (written by cdn_sync after every push). Every entry of the LIVE manifests is kept
  unchanged (never fewer entries); entries are ADDED for art that exists but is not listed:
    consort  fig-consort-cNN-t1..t8-aAA / -tcold-aAA   -> role consort, tier 1..8 (int) / "cold"
    maid     fig-maid-mNN-t1..t8-aAA / -cold-aAA      -> role maid, tier "t1".."t8" / "cold"   (j88 reads these as consort dress of a promoted maid)
  NOT added (other consumers / art still being produced by Foreman C): tmN rank-dress, tyN, kc, ngheo, eunuch rank, kids.
  usage: python3 dev/site/manifest_rebuild.py --out DIR [--live DIR]   (live manifests + _index.json come from the CDN unless --live DIR holds FIGURES*.json and _index.json)
  Writes DIR/FIGURES.json and DIR/FIGURES-servants.json and prints counts. Nothing is uploaded (cdn_sync does that, guarded by manifest_guard.py)."""
import argparse, json, os, re, sys, urllib.request
PUBLIC = os.environ.get("CTM_IMG_BASE") or "https://ctm-img.victoria-tntt.workers.dev/"
def get(live, name):
    if live:
        return json.load(open(os.path.join(live, name)))
    r = urllib.request.Request(PUBLIC + "img/" + name, headers={"Cache-Control": "no-cache", "User-Agent": "ctm-manifest-rebuild"})
    return json.load(urllib.request.urlopen(r, timeout=60))
def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--out", required=True); ap.add_argument("--live"); a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    keys = {k for k, _, _ in get(a.live, "_index.json")["files"]}
    res = {}
    for name, role, pat in (("FIGURES.json", "consort", r"img/fig-consort-(c\d+)-(t[1-8]|tcold)-a(\d+)\.webp$"),
                            ("FIGURES-servants.json", "maid", r"img/fig-maid-(m\d+)-(t[1-8]|cold)-a(\d+)\.webp$")):
        live = get(a.live, name); have = {f.get("file") for f in live}
        base = {}
        for f in live:                                   # look/palette of an identity, from its first record
            if f.get("role") == role: base.setdefault(f.get("identity"), f)
        add = []
        for k in sorted(keys):
            m = re.match(pat, k)
            if not m or k in have: continue
            ident, t, age = m.group(1), m.group(2), m.group(3)
            tier = ("cold" if t in ("tcold", "cold") else int(t[1:]) if role == "consort" else t)
            b = base.get(ident, {}); por = k.replace("img/fig-", "img/por-", 1)
            e = {"role": role, "identity": ident, "tier": tier, "ageBand": "a" + age, "look": b.get("look"), "file": k}
            if b.get("palette"): e["palette"] = b["palette"]
            if por in keys: e["por"] = por
            add.append(e)
        out = list(live) + add
        json.dump(out, open(os.path.join(a.out, name), "w"), ensure_ascii=False, indent=1)
        res[name] = (len(live), len(out))
        print(f"{name}: live {len(live)} -> new {len(out)} (+{len(add)})")
    return res
if __name__ == "__main__": main()
