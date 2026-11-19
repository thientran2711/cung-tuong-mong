#!/usr/bin/env python3
"""triều phục r20 FINAL (owner Lượt 455/456/458 via ROOT-48 → ROOT-47). TRIỀU PHỤC ONLY (no thường phục builder touched).
Redraw ALL t1-t6; t7/t8 = r18 kept. Base = r19/tN_c06_RAN.txt. Replaced/added:
 - HÀ BÍ (Lượt 456): ONE common sentence, identical in t1-t6 except three slot words (band colour, band pattern, pendant
   material); same width/shape/edge/length, tips joined at ankle height, same palm-sized openwork teardrop bí trụy with a
   small soft silk tassel, cầu vai lying over the bands (ROOT-48 sentence (c)). Replaces the r19 per-rank hà bí sentence.
 - SLEEVES (Lượt 455): ONE identical ankle sentence in t1-t6 (the builder t4-t6 sentence); t1-t3 knee sentence replaced.
 - t5/t6: more embroidery over the whole sleeve; t6: a little yellow (store text kept), no phoenix.
Superseded drafts: a_/b_/c_superseded/."""
import os, sys
H = os.path.dirname(os.path.abspath(__file__))
T = os.path.dirname(H)
sys.path.insert(0, os.path.join(T, 'r18')); sys.path.insert(0, os.path.join(T, 'r19'))
import build_r18 as B18  # noqa: E402
import build_r19 as B19  # noqa: E402
R19 = os.path.join(T, 'r19')

COLOUR = B18.DEEP  # (a) band colour slot, deep and saturated as before
PATTERN = {1: 'small florets', 2: 'cloud scrolls', 3: 'twining lotus', 4: 'peonies and butterflies',
           5: 'scrolling vines', 6: 'peonies and clouds'}  # (b) no phoenix
MATERIAL = {1: 'silver', 2: 'ivory', 3: 'jade', 4: 'green jade set in gold', 5: 'gold', 6: 'gold set with pearls'}  # (c)
HABI = ("The TWO VERTICAL RANK-COLOUR BANDS are the hà bí (霞帔) worn as in the Song–Ming dynasties, the SAME on every rank: "
        "two long straight bands of the same width (about a hand wide), the same shape and the same thin gold-thread edge, in "
        "{colour}, a strong, saturated colour so the rank reads at a glance, never pastel, never muted, embroidered along "
        "their whole length with {pattern}; they come from behind the neck over the shoulders and hang straight down the "
        "front of the robe to her ANKLES, where their two tips meet and join into ONE point at ankle height, the same height "
        "on every rank; from that point hangs ONE bí trụy (帔坠) pendant, the same shape and size on every rank: a palm-sized "
        "openwork teardrop of {material}, hanging at ankle level (NOT on the floor), and below the pendant hangs a small, "
        "soft silk tassel, short and graceful. The stiff shoulder piece (cầu vai) lies ON TOP of the hà bí bands at the "
        "shoulders and covers them there; the bands appear from under the shoulder piece.")
KNEE = B18.OLD_SLV
SLEEVE = ("SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve "
          "layer, flowing softly, never stiff.")
EMB5 = (" EMBROIDERY (Phi, rank 5): MUCH more embroidery than the lower ranks: rich gold-thread and silk embroidery of "
        "butterflies and flowers covers the WHOLE of both sleeves from shoulder to sleeve hem and much of the robe, never "
        "a small patch; the brocade pattern and the embroidery spread over the full sleeve.")
EMB6 = (" EMBROIDERY (Quý phi, rank 6): a little more gold-thread embroidery over the sleeves and robe than the Phi, "
        "covering the whole sleeve.")


def rep(t, a, b):
    assert t.count(a) == 1, a[:60]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(R19, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    old = B19.HABI.format(deep=B18.DEEP[n], style=B19.STYLE[n], pend=B19.PEND[n])
    new = HABI.format(colour=COLOUR[n], pattern=PATTERN[n], material=MATERIAL[n])
    t = rep(t, old, new + (EMB5 if n == 5 else EMB6 if n == 6 else ''))
    if n <= 3:
        t = rep(t, KNEE, SLEEVE)
    assert t.count(SLEEVE) == 1 and 'phoenix-shaped' not in t
    return t


if __name__ == '__main__':
    for n in range(1, 7):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
