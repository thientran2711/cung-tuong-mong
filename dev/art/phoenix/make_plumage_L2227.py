#!/usr/bin/env python3
"""Phoenix plumage palette (owner L2227 'Ok, làm theo đề xuất', G33 ext.) — THUROOT8, 0 gens.
10 named soft sets (medium-light, never rực/neon/dusty) + gold outline; ONE set per consort, never clashing
with her robe MAIN of any season (Lab dE < CLASH on a chromatic set colour = clash); max CAP per set.
If one season still clashes -> that season uses ALT set (listed). Crown phoenix inlay = same set (G33 L1423)."""
import json, math, pathlib, itertools
R = pathlib.Path(__file__).resolve().parents[3]
SETS = [
 ("ngu_sac_diu", "Ngũ sắc dịu", "soft five-colour", [("soft vermilion", "#E58A6F"), ("jade turquoise", "#6FC1B3"), ("honey gold", "#E9C46A"), ("soft lilac", "#B9A2D8"), ("pale blue", "#A9CBEA")]),
 ("lam_ngoc", "Lam ngọc", "sapphire-blue", [("pale blue", "#A9CBEA"), ("soft turquoise", "#7CC6C9"), ("silver", "#D3D8DE")]),
 ("hoang_hon", "Hoàng hôn", "sunset", [("soft peach", "#F6B99A"), ("coral pink", "#EE8E8E"), ("honey gold", "#E9C46A")]),
 ("tu_dang", "Tử đằng", "wisteria", [("soft lilac", "#C3AEE0"), ("wisteria violet", "#9D8BCF"), ("powder pink", "#F2C4D2")]),
 ("bich_thuy", "Bích thủy", "jade-water", [("jade green", "#79BE9B"), ("fresh-leaf green", "#A9D38A"), ("pale yellow", "#F3E3A0")]),
 ("hong_mai", "Hồng mai", "plum-blossom", [("powder pink", "#F2C4D2"), ("soft vermilion", "#E58A6F"), ("ivory", "#F6F0E1")]),
 ("thanh_thien", "Thanh thiên", "clear-sky", [("pale sky blue", "#B5D6F0"), ("ivory", "#F6F0E1"), ("silver", "#D3D8DE")]),
 ("kim_hong", "Kim hồng", "gold-rose", [("gold", "#E2BC5E"), ("peach pink", "#F4AE9E"), ("light orange", "#F5B97A")]),
 ("luc_bao", "Lục bảo", "emerald", [("pale emerald", "#7FC8A3"), ("soft turquoise", "#7CC6C9"), ("gold", "#E2BC5E")]),
 ("suong_bac", "Sương bạc", "silver-mist", [("ivory", "#F6F0E1"), ("blue-silver grey", "#BFCAD6"), ("very pale lilac", "#DCD2EC")]),
]
SEASONS = ["xuan", "ha", "thu", "dong"]; CLASH = 18.0; CAP = 9
def lab(h):
    r, g, b = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    f = lambda c: c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4
    r, g, b = f(r), f(g), f(b)
    X = (r*.4124 + g*.3576 + b*.1805) / .95047; Y = r*.2126 + g*.7152 + b*.0722; Z = (r*.0193 + g*.1192 + b*.9505) / 1.08883
    t = lambda v: v ** (1/3) if v > .008856 else 7.787 * v + 16/116
    return 116*t(Y) - 16, 500*(t(X) - t(Y)), 200*(t(Y) - t(Z))
def chroma(h): L, a, b = lab(h); return math.hypot(a, b)
def dE(h1, h2): return math.dist(lab(h1), lab(h2))
def clash(s, mh):  # min dE between a chromatic set colour and the robe main
    return min([dE(c, mh) for _, c in SETS[s][3] if chroma(c) > 12] or [99])
def main():
    pal = json.load(open(R / "dev/art/face-common/palettes_season.json"))
    ppl = [k for k, v in pal.items() if isinstance(v, dict) and "group" in v and all(isinstance(v.get(s), dict) for s in SEASONS)]
    mains = {p: {s: pal[p][s]["main_hex"] for s in SEASONS} for p in ppl}
    def cost(p, s):
        m = [clash(s, mains[p][z]) for z in SEASONS]
        return sum(1000 for x in m if x < CLASH) - min(m)   # clashes first, then prefer contrast
    # greedy by difficulty, capacity CAP
    order = sorted(ppl, key=lambda p: -sum(1 for s in range(10) for z in SEASONS if clash(s, mains[p][z]) < CLASH))
    load = [0]*10; out = {}
    for p in order:
        best = min((s for s in range(10) if load[s] < CAP), key=lambda s: (cost(p, s), load[s]))
        load[best] += 1; alt = {}
        for z in SEASONS:
            if clash(best, mains[p][z]) < CLASH:
                a = min((s for s in range(10) if s != best), key=lambda s: -clash(s, mains[p][z])); alt[z] = SETS[a][0]
        out[p] = {"set": SETS[best][0], "set_vi": SETS[best][1], "min_dE": round(min(clash(best, mains[p][z]) for z in SEASONS), 1),
                  "mains": mains[p], **({"alt_by_season": alt} if alt else {})}
    doc = {"_note": "Phoenix plumage sets (owner L2227, G33 ext.): ONE set per consort, feathers + crown phoenix inlay (G33 L1423) + HQP five-colour / HH peacock thread sheen use it; gold-thread outlines always. Only t7/t8, Thái hậu, Nữ đế. alt_by_season = that season's robe main is too close to the set (Lab dE<%g): use the alt set in that season only. THUROOT8, make_plumage_L2227.py." % CLASH,
           "sets": {k: {"vi": vi, "en": en, "colours": [{"name": n, "hex": h} for n, h in cs], "outline": "gold thread"} for k, vi, en, cs in SETS},
           "load": {SETS[i][0]: load[i] for i in range(10)}, "people": dict(sorted(out.items()))}
    (R / "dev/art/phoenix_plumage_L2227.json").write_text(json.dumps(doc, ensure_ascii=False, indent=1) + "\n")
    print(doc["load"], sum(1 for v in out.values() if "alt_by_season" in v), "with alt"); print("s62", out["s62"])
    return doc
if __name__ == "__main__":
    main()
