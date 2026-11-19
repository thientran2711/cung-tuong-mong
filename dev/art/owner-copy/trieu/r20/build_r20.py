#!/usr/bin/env python3
"""triều phục r20 t1-t6 (ROOT-48 full-size look, relayed by ROOT-47): build r20/t1..t6_c06_RAN.txt from r19/tN_c06_RAN.txt.
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


if __name__ == '__main__':
    for n in range(1, 7):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
