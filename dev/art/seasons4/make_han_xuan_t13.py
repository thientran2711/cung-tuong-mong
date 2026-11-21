#!/usr/bin/env python3
"""DESIGN17 (owner L1565 + L1566/L1568 + L1567, via Foreman C #13): XUÂN Hán t1–t3 = s62_t{1,2,3}_HAN_BAC_v2.txt, BUILT, never hand-written.
Owner L1567: 'mọi thứ phải lấy từ cái chung ra' -> base = the STORE prompt (store-all/build_all.py s62 N, a18 = 'about 22', which already
carries the master common block B25, the store rank text, the F2 flower, the new G39 t3 hairpin words). Only these approved deltas are applied
(each asserted to hit exactly once):
  D1 OPEN-NECK first line (Hán set, t4 open5; L1565 wording: open only to the shoulder points)
  D2 B29 fabric: store fabric sentence -> master_common.B29_A_HEAVY (xuân t1–t3 = lụa hoa, owner L1556)
  D3 outfit DESIGN words: store design (from 'a NEW outfit,' up to the store hair-ornament clause) -> Hán zhiju design of L1554/L1555 with the
     L1565 fixes: collar edges AT the shoulder points + described inner robe; embroidery = make_han_bac.DENSE (H6/H12 Tần density, t4 open5 words)
     with the rank size + the store motif, and the store G8 rank clause copied out of the store text itself; G36/G32: no shawl, no signature piece t1–t3.
     The store hair-ornament clause and the store 'her signature colour family' clause stay verbatim.
  D4 xuân palette (B20): ice blue -> peach-blossom pink, #71B5D7 -> #EB8186, mint mist -> ivory white
  D5 COLLAR CUT (flowing) sentence of the Hán set (t4 open5, 'wrap and belt' -> 'wrap and sash': t1–t3 have a sash)
  D6 CAPTION line (G31)
Run from the repo root:  python3 dev/art/seasons4/make_han_xuan_t13.py   (writes the 3 files + prints lengths; gate = check_store + keep_check)."""
import os, re, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D); ROOT = os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); sys.path.insert(0, D)
from master_common import B29_A_HEAVY
# DENSE + CAP copied verbatim from make_han_bac.py (that script writes files at import, so it is not imported); asserted equal below
DENSE = "the robe body densely embroidered ALL OVER (not only the borders) with many {sz} spring flowers spread over the whole garment, clearly more embroidery than any palace maid"
CAP = '\nCAPTION: write this exact Vietnamese caption in LARGE bold letters at the top-left, on the plain background, never over her body: "{}"\n'
_hb = open(os.path.join(D, "make_han_bac.py"), encoding="utf-8").read()
assert 'DENSE = "' + DENSE + '"' in _hb and ("CAP = '" + CAP.replace("\n", "\\n") + "'") in _hb, "DENSE/CAP drifted from make_han_bac.py"

def sw(s, a, b):
    assert s.count(a) == 1, ("delta", a[:90]); return s.replace(a, b, 1)

STORE_FABRIC = ("The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and "
                "trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.")
HEAD = "OPEN-NECK LOOK: collar open OFF the neck to the shoulder points: bare neck and collarbones. "
COLLAR = ("the collar is worn moderately OPEN: its two edges rest exactly ON the shoulder points, shoulders covered (never off the shoulder), "
          "and curve down to cross high above the sash, never a deep low V; INNER ROBE: opaque mint mist, its own neat crossed collar "
          "just inside, crossing higher; its collar edged by {inner} in ice blue and gold; all collar bands lie flat only along those edges; ")
HAN = ("a NEW outfit, a Han-dynasty look in TWO visible layers, LONG garments only: a long floor-length straight-hem robe (zhiju) in ice blue over an inner "
       "robe in mint mist, the front edge falling straight down to an even hem (no wrap spiral, no curved wrap panel, never a short jacket); wide long sleeves "
       "(one single visible sleeve layer, every inner sleeve hidden inside), the sleeve body plain, ending in embroidered mint mist cuff bands; {edge}; "
       "{dense} ({motif} in gold and mint mist); {g8}; {rest}no shawl; ")
HAIRCL = r"(?=pretty silver hairpins|silver and pearl hairpins|two or three slim pearl hairpins)"
RANK = {
 1: dict(motif="lilac sprays", sz="small-size",
         inner="one narrow band of tiny embroidered lilac sprays",
         edge="ONE narrow plain mint mist collar band along the collar edges with no embroidery on it (the Đáp ứng edge)",
         g8=r"a wide embroidered lilac sprays hem band, small sprays of embroidered lilac sprays on the upper garment",
         rest="a soft narrow mint mist silk sash whose two ends hang down the front; no belt plaque, no pendants, no signature piece; "),
 2: dict(motif="tiger lilies", sz="small-size (a little larger than at the lowest rank)",
         inner="one narrow band of small embroidered tiger lilies",
         edge="TWO stacked NARROW collar bands along the collar edges: a thin mint mist piping inside and a narrow band of small embroidered tiger lilies outside (the Thường tại edge)",
         g8=r"delicate embroidered tiger lilies at the sleeves and hem and a soft silk sash",
         rest="the mint mist sash tied at the waist with ONE small jade disc on a silk cord; no belt plaque, no signature piece; "),
 3: dict(motif="semi-double China roses", sz="small-to-medium-size",
         inner="one slightly wider band of small embroidered semi-double China roses",
         edge="ONE WIDE stiff mint mist collar band embroidered with semi-double China roses sewn flat along the collar edges (the Quý nhân edge)",
         g8=r"wide embroidered semi-double China roses bands at the sleeve ends and the hem",
         rest=("a wide stiff mint mist silk girdle at the natural waist with a long ceremonial jade pendant set on each side down to the knees: small carved jade "
               "plaques linked by strings of pearls, ending in silk tassels; no signature piece; ")),
}
CAPS = {1: "Mùa Xuân · Thiết kế thời Hán · Đáp ứng · Nhu quần hai mảnh, cổ viền trơn",
        2: "Mùa Xuân · Thiết kế thời Hán · Thường tại · Trực cư, cổ viền hai lớp hoa",
        3: "Mùa Xuân · Thiết kế thời Hán · Quý nhân · Trực cư, cổ viền thêu rộng"}
HELD_END = "her secondary colour mint mist."
COLLAR_CUT = (" COLLAR CUT (flowing): the collar lines are soft CURVES, never flat; the robe closes only by its wrap and sash, never buttoned down the front, "
              "graceful (uyển chuyển), never boxy.")

# TRIM (A38: only duplicated boilerplate, each stated elsewhere in the same prompt; the SAME list as DESIGN16's approved-draft trims and
# make_han_bac.TRIM[4]); applied in this order, the same count for all three ranks, just enough for the longest file to fit LIMIT.
LIMIT = 9990
TRIM = [" Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin;",   # = master full-body + skin sentences
        "; face clearly visible, 3/4 or frontal view.",                    # = 'The whole face clearly visible' + ANGLE sentence
        r"; her signature colour family [^.]*? robe(?=\.)",                 # = COLOUR RULE + TWO-COLOUR RULE (make_han_bac.TRIM[4])
        ", never a pair", ", no cluster", ", never back-turned", ", never in profile", " Everyone beautiful at every age."]   # make_han_bac.TRIM[4]
def trim(s, k):
    for i, a in enumerate(TRIM[:k]):
        if i == 2: s, n = re.subn(a, "", s)
        else: n = s.count(a); s = s.replace(a, "." if a.endswith("view.") else "")
        assert n == 1, ("trim", a[:60])
    return s

def build(t):
    r = RANK[t]
    s = subprocess.run([sys.executable, os.path.join(ART, "store-all", "build_all.py"), "s62", str(t)], capture_output=True, text=True, check=True).stdout.strip()
    assert r["g8"] in s, ("store G8 clause not in store text", t)          # the G8 rank clause is copied OUT of the store text, never written here
    s = HEAD + s                                                            # D1
    s = sw(s, STORE_FABRIC, B29_A_HEAVY)                                    # D2
    m = list(re.finditer(r"a NEW outfit, .*?; " + HAIRCL, s)); assert len(m) == 1, ("store design", t)
    design = COLLAR.format(inner=r["inner"]) + HAN.format(edge=r["edge"], dense=DENSE.format(sz=r["sz"]), motif=r["motif"], g8=r["g8"], rest=r["rest"])
    s = s[:m[0].start()] + design + s[m[0].end():]                          # D3
    s = sw(s, HELD_END, HELD_END + COLLAR_CUT)                              # D5
    s = s.replace("ice blue", "peach-blossom pink").replace("#71B5D7", "#EB8186").replace("mint mist", "ivory white")   # D4
    assert "ice blue" not in s and "mint mist" not in s
    return s + "\n" + CAP.format(CAPS[t])                                   # D6

if __name__ == "__main__":
    full = {t: build(t) for t in (1, 2, 3)}
    k = next(k for k in range(len(TRIM) + 1) if max(len(trim(x, k)) for x in full.values()) <= LIMIT)
    print("trims used:", k)
    for t in (1, 2, 3):
        p = os.path.join(D, f"s62_t{t}_HAN_BAC_v2.txt"); s = trim(full[t], k)
        open(p, "w", encoding="utf-8").write(s); print(t, len(s), os.path.relpath(p, ROOT))
