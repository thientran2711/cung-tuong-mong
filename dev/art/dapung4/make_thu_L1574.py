#!/usr/bin/env python3
"""DESIGN17 JOB L1574 (C #13, CHECK1 faults on the THU s62 finals). A39: only these fixes, every new word copied from a common/store source.
  t1 _v2c -> _v2d : + H6/H12 density sentence (make_han_bac.DENSE, the t4 words, as in make_han_xuan_t13) ; F13 hair flower 'a lilac spray' -> 'a lilac blossom'
  t2 _v2c -> _v2d : + DENSE ; caption 'viền hoa mai 2 lớp' -> 'viền hoa ly hổ 2 lớp' (the real tiger-lily border)
  t3 _v2d -> _v2e : + DENSE ; B29 (t1–t3 nothing stiff, never brocade): 'wide stiff blush band' -> 'wide soft blush band', 'wide stiff blush brocade girdle' -> 'wide soft blush silk girdle' ;
                    F18 pose = store spec5 form 'adjusting a hairpin set in her hair with one raised empty hand, {prop} in the other hand'
  t6 c -> d       : A41 no necklaces ('gold-and-jade necklace and bracelets' -> 'gold-and-jade bracelets') ; G37 one-tier vân kiên = the thu t8 v10 words 'of ONE tier of scalloped cloud-shaped lobes'
  Length: A38 same-prompt-repeat trims only, in the DESIGN17 order, just enough for <= 9990 chars.
Run from the repo root."""
import os, re
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D)
DENSE = "the robe body densely embroidered ALL OVER (not only the borders) with many {sz} spring flowers spread over the whole garment, clearly more embroidery than any palace maid"
assert 'DENSE = "' + DENSE + '"' in open(os.path.join(ART, "seasons4", "make_han_bac.py"), encoding="utf-8").read()
def dense(sz, motif): return DENSE.format(sz=sz) + f" ({motif} in gold and blush); "
LIMIT = 9990
TRIM = [(" Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin;", ""),
        ("; face clearly visible, 3/4 or frontal view.", "."), (", never a pair", ""), (", no cluster", ""), (", never back-turned", ""),
        (", never in profile", ""), (" Everyone beautiful at every age.", ""), ("RX:; her signature colour family [^.]*? robe(?=\\.)", ""),
        (", never copy anything but its colour", "")]
def sw(s, a, b):
    assert s.count(a) == 1, ("fix", a[:80]); return s.replace(a, b, 1)
def fit(s):
    used = []
    for a, b in TRIM:
        if len(s) <= LIMIT: break
        if a.startswith("RX:"):
            s, n = re.subn(a[3:], b, s)
        else:
            n = s.count(a); s = s.replace(a, b)
        if n: used.append(a)
    assert len(s) <= LIMIT, ("too long", len(s)); return s, used
JOBS = {
 "dapung4/s62_t1_COMOI_v2d.txt": ("dapung4/s62_t1_COMOI_v2c.txt", [
    ("small sprays of embroidered lilac sprays on the upper garment; ", "small sprays of embroidered lilac sprays on the upper garment; " + dense("small-size", "lilac sprays")),
    ("a fresh flower (a lilac spray)", "a fresh flower (a lilac blossom)")]),
 "dapung4/s62_t2_COMOI_v2d.txt": ("dapung4/s62_t2_COMOI_v2c.txt", [
    ("delicate embroidered tiger lilies at the sleeves and hem and a soft silk sash; ", "delicate embroidered tiger lilies at the sleeves and hem and a soft silk sash; "
     + dense("small-size (a little larger than at the lowest rank)", "tiger lilies")),
    ("viền hoa mai 2 lớp", "viền hoa ly hổ 2 lớp")]),
 "dapung4/s62_t3_COMOI_v2e.txt": ("dapung4/s62_t3_COMOI_v2d.txt", [
    ("wide embroidered semi-double China roses bands at the sleeve ends and the hem; ", "wide embroidered semi-double China roses bands at the sleeve ends and the hem; "
     + dense("small-to-medium-size", "semi-double China roses")),
    ("a wide stiff blush band embroidered", "a wide soft blush band embroidered"),
    ("a wide stiff blush brocade girdle", "a wide soft blush silk girdle"),
    ("one hand touching her hairpin, a bamboo flute with silver bands in the other hand at her waist",
     "adjusting a hairpin set in her hair with one raised empty hand, a bamboo flute with silver bands in the other hand at her waist")]),
 "thu_comoi/s62_t6_THU_COMOId.txt": ("thu_comoi/s62_t6_THU_COMOIc.txt", [
    ("gold-and-jade necklace and bracelets", "gold-and-jade bracelets"),
    ("an embroidered light plum cloud collar (yunjian) over the shoulders", "an embroidered light plum cloud collar (yunjian) of ONE tier of scalloped cloud-shaped lobes over the shoulders")]),
}
if __name__ == "__main__":
    for out, (src, fixes) in JOBS.items():
        s = open(os.path.join(ART, src), encoding="utf-8").read()
        for a, b in fixes: s = sw(s, a, b)
        s, used = fit(s)
        open(os.path.join(ART, out), "w", encoding="utf-8").write(s); print(len(s), out, "trims:", used)
