#!/usr/bin/env python3
"""figx_rows.py (review/art-wiring-1119): build img/FIGURES-x.json + the HD rows of img/FIGURES-hd.json for the consort art that has
NO slot in img/FIGURES.json: the Thai hau robe per face (fig-consort-cNN-th-aXX), the a65 age step (fig-consort-cNN-tN-a65) and the
outfit colour variants v1/v2 (fig-consort-cNN-tN-aXX-v1/-v2). The rows come from what is REALLY on the CDN (img/_index.json).

Why a separate manifest: the code that understands these rows (jfigx.js) must be live before the rows are; the old game reads only
FIGURES.json / -servants / -others, so FIGURES-x.json can go to the CDN first without changing any live picture.

  python3 dev/tools/figx_rows.py --index _index.json --hd img/FIGURES-hd.json --out img/FIGURES-x.json   (writes both files)
  Row: {role:"consort", identity:"cNN", tier:"th"|7|8, ageBand:"a36"|..., v:1|2 (variants only), file, por}
  HD widths are read from the first 64 bytes of each webp (HTTP Range), so nothing big is downloaded."""
import argparse, json, re, struct, sys, urllib.request, concurrent.futures as cf

BASE = "https://ctm-img.victoria-tntt.workers.dev/"
PAT = re.compile(r"^img/fig-consort-(c\d\d)-(th|t[78])-(a\d\d)(?:-v([12]))?\.webp$")


def dim(b):
    t = b[12:16]
    if t == b"VP8X":
        return 1 + int.from_bytes(b[24:27], "little"), 1 + int.from_bytes(b[27:30], "little")
    if t == b"VP8 ":
        return struct.unpack("<H", b[26:28])[0] & 0x3FFF, struct.unpack("<H", b[28:30])[0] & 0x3FFF
    if t == b"VP8L":
        v = int.from_bytes(b[21:25], "little")
        return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
    raise ValueError("not a webp")


def width(key):
    for _ in range(4):
        try:
            rq = urllib.request.Request(BASE + key, headers={"Range": "bytes=0-63", "User-Agent": "Mozilla/5.0 figx_rows"})
            with urllib.request.urlopen(rq, timeout=30) as r:
                return dim(r.read(64))[0]
        except Exception:
            pass
    raise SystemExit("cannot read " + key)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--index", required=True)
    ap.add_argument("--hd", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    keys = set(k[0] for k in json.load(open(a.index))["files"])
    rows, hdw = [], []
    for k in sorted(keys):
        m = PAT.match(k)
        if not m:
            continue
        ident, tier, band, v = m.groups()
        if tier != "th" and band != "a65" and not v:
            continue  # the v0 a18..a51 t7/t8 slots are already in FIGURES.json
        por = k.replace("img/fig-", "img/por-")
        if por not in keys:
            sys.exit("missing por for " + k)
        r = {"role": "consort", "identity": ident, "tier": "th" if tier == "th" else int(tier[1]), "ageBand": band}
        if v:
            r["v"] = int(v)
        r.update(file=k, por=por)
        rows.append(r)
        if "img/hd/" + k[4:] in keys:
            hdw.append(k)
    hd = json.load(open(a.hd))
    F = hd["files"]
    todo = [k for k in hdw if k[4:] not in F]
    with cf.ThreadPoolExecutor(8) as ex:
        res = list(ex.map(lambda k: (k, width(k), width("img/hd/" + k[4:])), todo))
    for k, w0, w1 in res:
        F[k[4:]] = [w0, w1]
    json.dump(rows, open(a.out, "w"), ensure_ascii=False, indent=0)
    json.dump(hd, open(a.hd, "w"), ensure_ascii=False, separators=(",", ":"))
    th = sum(1 for r in rows if r["tier"] == "th")
    a65 = sum(1 for r in rows if r["ageBand"] == "a65" and r["tier"] != "th" and "v" not in r)
    print(f"rows {len(rows)} (th {th}, a65 v0 {a65}, v1/v2 {len(rows) - th - a65}); hd twins {len(hdw)}, new hd rows {len(res)}")


if __name__ == "__main__":
    main()
