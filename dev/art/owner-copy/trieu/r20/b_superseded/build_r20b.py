#!/usr/bin/env python3
"""triều phục r20 (FINAL order = owner verdict on r19 via ROOT-48: redo t1, t4, t5, t6 only; t2/t3/t7/t8 kept).
r20a (superseded, a_superseded/): t1-t6 (ROOT-48 full-size look, relayed by ROOT-47): build r20/t1..t6_c06_RAN.txt from r19/tN_c06_RAN.txt.
ADD/REPLACE only: (a) all: hà bí tips join + bí trụy AT THE ANKLES (just above the slippers, level with the robe hem);
(b) t4-t6: ONE added sentence after the builder ankle SLEEVES sentence (builder sentence kept verbatim, Lượt 351/443);
(c) t6: pendant phoenix -> white-jade lotus in gold (no phoenix; phoenix only for Hoàng hậu); under-skirt in the robe colour, no yellow."""
import os
H = os.path.dirname(os.path.abspath(__file__))
R19 = os.path.join(os.path.dirname(H), 'r19')

OLD_HB = ("hang straight down the front of the robe all the way to her ANKLES (the band tips reach the ankle bones, not the shins), "
          "where their two tips meet and join into ONE point")
NEW_HB = ("hang straight down the front of the robe, very long, all the way down to her ANKLES: the two band tips meet and join "
          "into ONE point just above her slippers, level with the bottom border of the robe hem, never at the knee or shin")
OLD_AT = "hanging at ankle level (NOT on the floor)"
NEW_AT = "hanging at her ankles just above the slippers, at the very bottom of the robe (NOT on the floor, NOT at the shin)"
ANK = ("SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve "
       "layer, flowing softly, never stiff.")
ANK_ADD = " The lowest edge of each sleeve reaches down to her ankles, level with the robe hem and the bí trụy, never ending at the shin."
OLD_P6 = "a phoenix-shaped pendant of gold set with pearls, the richest of these pendants"
NEW_P6 = ("a lotus-shaped pendant of white jade framed in gold and set with pearls and small rubies, the richest of these "
          "pendants, NO phoenix")
SKIRT6 = (" The under-skirt showing below the robe at her feet is the same brick-crimson court red as the robe, NOT yellow: "
          "no yellow skirt or yellow hem at the feet (phoenix and imperial yellow skirts belong only to the Empress).")


def rep(t, a, b):
    assert t.count(a) == 1, a[:60]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(R19, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    t = rep(t, OLD_HB, NEW_HB)
    t = rep(t, OLD_AT, NEW_AT)
    if n >= 4:
        t = rep(t, ANK, ANK + ANK_ADD + (SKIRT6 if n == 6 else ''))
    if n == 6:
        t = rep(t, OLD_P6, NEW_P6)
    return t

# --- owner verdict on r19 (ROOT-48 → ROOT-47): ---
TASSEL = ("with no loose tassels at the band ends", "with no loose tassels at the band ends; only a small, soft silk tassel "
          "(tua rua) hangs from the tail of the bí trụy itself, soft and pretty")
LAYER = (" LAYERING: the stiff cầu vai shoulder pieces lie ON TOP of the hà bí where the bands cross the shoulders, covering "
         "the bands there; the hà bí never lies over the cầu vai.")
T1W = ("NARROW bands with a plain, simple edge", "bands of medium width, as wide as the rank-2 and rank-3 bands (never narrow), "
       "with a plain, simple edge")
EMB5 = (" EMBROIDERY (Phi, rank 5): MUCH more embroidery than the lower ranks: rich gold-thread and silk embroidery of "
        "butterflies and flowers covers the WHOLE of both sleeves from shoulder to sleeve hem and much of the robe, never "
        "a small patch; the brocade pattern and the embroidery spread over the full sleeve.")
EMB6 = (" EMBROIDERY (Quý phi, rank 6): a little more gold-thread embroidery over the sleeves and robe than the Phi, "
        "covering the whole sleeve.")
REDO = (1, 4, 5, 6)


def build_final(n):
    t = build(n)
    if n == 6:
        t = rep(t, SKIRT6, '')  # owner: a little yellow is OK (drop the r20a no-yellow skirt sentence)
    t = rep(t, *TASSEL)
    hb_end = TASSEL[1] + '.'
    t = rep(t, hb_end, hb_end + LAYER)
    if n == 1:
        t = rep(t, *T1W)
    if n in (5, 6):
        t = rep(t, hb_end + LAYER, hb_end + LAYER + (EMB5 if n == 5 else EMB6))
    return t


if __name__ == '__main__':
    for n in REDO:
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build_final(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
